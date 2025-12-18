"""
Assessment Module - Session Manager

Handles all session storage operations with:
- Redis as primary store (persistence, race condition safety)
- In-memory cache for fast access
- Automatic failover and recovery
- Memory management with LRU eviction
- Distributed locking for results generation

This abstracts away the complexity of dual-write storage from the route handlers.
"""

import logging
from typing import Dict, Optional, Any, Tuple
from datetime import datetime
from collections import OrderedDict
import threading

from app.adaptive_testing import AdaptiveTester
from app.scoring import SelveScorer
from app.response_validator import ResponseValidator
from app.services.redis_service import get_redis_session_store
from app.services.assessment_service import AssessmentService, session_to_state_dict

from .constants import AssessmentConfig
from .exceptions import (
    SessionNotFoundError,
    SessionExpiredError,
    StorageError,
    ResultsGenerationInProgressError,
)

logger = logging.getLogger(__name__)


class LRUSessionCache:
    """
    Thread-safe LRU cache for sessions with size limit.
    
    Prevents unbounded memory growth while keeping hot sessions fast.
    """
    
    def __init__(self, max_size: int = AssessmentConfig.MAX_MEMORY_SESSIONS):
        self._cache: OrderedDict[str, Dict] = OrderedDict()
        self._max_size = max_size
        self._lock = threading.RLock()
        self._hits = 0
        self._misses = 0
    
    def get(self, key: str) -> Optional[Dict]:
        """Get session, moving it to end (most recently used)."""
        with self._lock:
            if key in self._cache:
                self._cache.move_to_end(key)
                self._hits += 1
                return self._cache[key]
            self._misses += 1
            return None
    
    def set(self, key: str, value: Dict) -> None:
        """Set session, evicting oldest if at capacity."""
        with self._lock:
            if key in self._cache:
                self._cache.move_to_end(key)
            else:
                if len(self._cache) >= self._max_size:
                    # Evict oldest (first) item
                    evicted_key, _ = self._cache.popitem(last=False)
                    logger.debug(f"Evicted session {evicted_key[:8]}... from memory cache")
            self._cache[key] = value
    
    def delete(self, key: str) -> bool:
        """Delete session from cache."""
        with self._lock:
            if key in self._cache:
                del self._cache[key]
                return True
            return False
    
    def contains(self, key: str) -> bool:
        """Check if key exists without affecting LRU order."""
        with self._lock:
            return key in self._cache
    
    def stats(self) -> Dict[str, Any]:
        """Get cache statistics."""
        with self._lock:
            total = self._hits + self._misses
            hit_rate = (self._hits / total * 100) if total > 0 else 0
            return {
                "size": len(self._cache),
                "max_size": self._max_size,
                "hits": self._hits,
                "misses": self._misses,
                "hit_rate_percent": round(hit_rate, 2),
            }


class SessionManager:
    """
    Manages assessment session lifecycle with dual-write storage.
    
    Storage Strategy:
    1. Memory cache (LRU) - Fast reads, limited size
    2. Redis - Persistent, handles race conditions
    3. Database - Long-term storage, recovery fallback
    
    Read Path:  Memory -> Redis -> Database
    Write Path: Memory + Redis (dual-write), periodic DB sync
    """
    
    def __init__(self):
        self._cache = LRUSessionCache()
        self._redis = get_redis_session_store()
        self._service = AssessmentService()
    
    # ========================================================================
    # Core Session Operations
    # ========================================================================
    
    def get_session(self, session_id: str, raise_if_missing: bool = True) -> Optional[Dict]:
        """
        Get session from storage hierarchy.
        
        Args:
            session_id: Session identifier
            raise_if_missing: Whether to raise SessionNotFoundError if not found
            
        Returns:
            Session dict with tester/scorer/validator objects, or None
            
        Raises:
            SessionNotFoundError: If session not found and raise_if_missing=True
        """
        # 1. Try memory cache first (fastest)
        session = self._cache.get(session_id)
        if session:
            logger.debug(f"Session {session_id[:8]}... found in memory cache")
            # Ensure Redis has it too (sync if missing)
            if not self._redis.session_exists(session_id):
                self._save_to_redis(session_id, session)
            return session
        
        # 2. Try Redis (persistent store)
        session = self._load_from_redis(session_id)
        if session:
            logger.debug(f"Session {session_id[:8]}... restored from Redis")
            # Populate memory cache
            self._cache.set(session_id, session)
            return session
        
        # 3. Session not in hot storage
        if raise_if_missing:
            raise SessionNotFoundError(session_id)
        return None
    
    async def get_session_with_db_fallback(
        self, 
        session_id: str,
        raise_if_missing: bool = True
    ) -> Optional[Dict]:
        """
        Get session with database fallback for recovery scenarios.
        
        Use this when you need to recover sessions after server restart.
        
        Args:
            session_id: Session identifier
            raise_if_missing: Whether to raise if not found anywhere
            
        Returns:
            Session dict or None
        """
        # Try hot storage first
        session = self.get_session(session_id, raise_if_missing=False)
        if session:
            return session
        
        # Fallback to database
        try:
            db_session = await self._service.get_session(session_id)
            if db_session:
                logger.info(f"Session {session_id[:8]}... recovered from database")
                session = session_to_state_dict(db_session)
                # Populate caches
                self._cache.set(session_id, session)
                self._save_to_redis(session_id, session)
                return session
        except Exception as e:
            logger.error(f"Database fallback failed for session {session_id[:8]}...: {e}")
        
        if raise_if_missing:
            raise SessionNotFoundError(session_id)
        return None
    
    def save_session(self, session_id: str, session: Dict) -> bool:
        """
        Save session to both memory and Redis (dual-write).
        
        Args:
            session_id: Session identifier
            session: Session dict to save
            
        Returns:
            True if saved successfully to both stores
        """
        # Write to memory (always succeeds)
        self._cache.set(session_id, session)
        
        # Write to Redis
        redis_success = self._save_to_redis(session_id, session)
        
        if not redis_success:
            logger.warning(f"Redis write failed for session {session_id[:8]}..., memory-only")
        
        return redis_success
    
    def delete_session(self, session_id: str) -> bool:
        """
        Delete session from all storage layers.
        
        Args:
            session_id: Session identifier
            
        Returns:
            True if deleted from at least one store
        """
        memory_deleted = self._cache.delete(session_id)
        redis_deleted = self._redis.delete_session(session_id)
        
        deleted = memory_deleted or redis_deleted
        if deleted:
            logger.info(f"Session {session_id[:8]}... deleted")
        
        return deleted
    
    def session_exists(self, session_id: str) -> bool:
        """Check if session exists in any storage layer."""
        return (
            self._cache.contains(session_id) or 
            self._redis.session_exists(session_id)
        )
    
    # ========================================================================
    # Session Creation
    # ========================================================================
    
    def create_session_dict(
        self,
        session_id: str,
        clerk_user_id: Optional[str] = None,
        clerk_user: Optional[Dict] = None,
        metadata: Optional[Dict] = None,
    ) -> Dict:
        """
        Create a new session dictionary with all required fields.
        
        Args:
            session_id: Unique session ID (from database)
            clerk_user_id: Authenticated user's Clerk ID
            clerk_user: Full Clerk user data
            metadata: Optional metadata
            
        Returns:
            Initialized session dict
        """
        return {
            # Helper objects (recreated on deserialization)
            "tester": AdaptiveTester(),
            "scorer": SelveScorer(),
            "validator": ResponseValidator(),
            
            # Response data
            "responses": {},
            "demographics": {},
            
            # Question tracking
            "pending_questions": set(),
            "current_batch": [],
            "batch_history": [],
            "answer_history": [],
            
            # Navigation tracking
            "back_navigation_count": 0,
            "back_navigation_log": [],
            
            # Metadata
            "started_at": datetime.now().isoformat(),
            "user_id": clerk_user_id,
            "clerk_user": clerk_user,
            "metadata": metadata or {},
            "db_session_id": session_id,
        }
    
    # ========================================================================
    # Distributed Locking (for results generation)
    # ========================================================================
    
    def acquire_results_lock(
        self, 
        session_id: str,
        timeout: int = AssessmentConfig.NARRATIVE_GENERATION_TIMEOUT,
        blocking_timeout: int = AssessmentConfig.LOCK_BLOCKING_TIMEOUT,
    ) -> Optional[str]:
        """
        Acquire distributed lock for results generation.
        
        Prevents duplicate OpenAI calls when multiple requests hit simultaneously.
        
        Args:
            session_id: Session to lock
            timeout: Lock expiration (seconds)
            blocking_timeout: Max time to wait for lock
            
        Returns:
            Lock token if acquired, None if failed
            
        Raises:
            ResultsGenerationInProgressError: If lock unavailable after timeout
        """
        lock_name = f"results:{session_id}"
        
        token = self._redis.acquire_lock(
            lock_name=lock_name,
            lock_timeout=timeout,
            blocking=True,
            blocking_timeout=blocking_timeout,
        )
        
        if token is None:
            raise ResultsGenerationInProgressError(
                session_id, 
                wait_time=30
            )
        
        logger.debug(f"Acquired results lock for session {session_id[:8]}...")
        return token
    
    def release_results_lock(self, session_id: str, token: str) -> None:
        """Release distributed lock for results generation."""
        lock_name = f"results:{session_id}"
        self._redis.release_lock(lock_name, token)
        logger.debug(f"Released results lock for session {session_id[:8]}...")
    
    # ========================================================================
    # Internal Storage Methods
    # ========================================================================
    
    def _serialize_for_redis(self, session: Dict) -> Dict:
        """
        Extract serializable data from session dict.
        
        Excludes non-serializable objects (tester, scorer, validator).
        """
        # Convert set to list for JSON
        pending = session.get("pending_questions", set())
        if isinstance(pending, set):
            pending = list(pending)
        
        return {
            "responses": session.get("responses", {}),
            "demographics": session.get("demographics", {}),
            "pending_questions": pending,
            "current_batch": session.get("current_batch", []),
            "batch_history": session.get("batch_history", []),
            "answer_history": session.get("answer_history", []),
            "back_navigation_count": session.get("back_navigation_count", 0),
            "back_navigation_log": session.get("back_navigation_log", []),
            "started_at": session.get("started_at"),
            "user_id": session.get("user_id"),
            "clerk_user": session.get("clerk_user"),
            "metadata": session.get("metadata", {}),
            "db_session_id": session.get("db_session_id"),
        }
    
    def _deserialize_from_redis(self, redis_data: Dict) -> Dict:
        """
        Reconstruct full session dict from Redis data.
        
        Recreates stateless helper objects.
        """
        # Convert list back to set
        pending = redis_data.get("pending_questions", [])
        if isinstance(pending, list):
            pending = set(pending)
        
        return {
            # Recreate stateless helpers
            "tester": AdaptiveTester(),
            "scorer": SelveScorer(),
            "validator": ResponseValidator(),
            
            # Restore data
            "responses": redis_data.get("responses", {}),
            "demographics": redis_data.get("demographics", {}),
            "pending_questions": pending,
            "current_batch": redis_data.get("current_batch", []),
            "batch_history": redis_data.get("batch_history", []),
            "answer_history": redis_data.get("answer_history", []),
            "back_navigation_count": redis_data.get("back_navigation_count", 0),
            "back_navigation_log": redis_data.get("back_navigation_log", []),
            "started_at": redis_data.get("started_at"),
            "user_id": redis_data.get("user_id"),
            "clerk_user": redis_data.get("clerk_user"),
            "metadata": redis_data.get("metadata", {}),
            "db_session_id": redis_data.get("db_session_id"),
        }
    
    def _load_from_redis(self, session_id: str) -> Optional[Dict]:
        """Load and deserialize session from Redis."""
        try:
            redis_data = self._redis.get_session(session_id)
            if redis_data:
                return self._deserialize_from_redis(redis_data)
        except Exception as e:
            logger.error(f"Redis read error for session {session_id[:8]}...: {e}")
        return None
    
    def _save_to_redis(self, session_id: str, session: Dict) -> bool:
        """Serialize and save session to Redis."""
        try:
            serialized = self._serialize_for_redis(session)
            success = self._redis.set_session(session_id, serialized)
            if success:
                self._redis.extend_session_ttl(session_id)
            return success
        except Exception as e:
            logger.error(f"Redis write error for session {session_id[:8]}...: {e}")
            return False
    
    # ========================================================================
    # Diagnostics
    # ========================================================================
    
    def get_stats(self) -> Dict[str, Any]:
        """Get storage statistics for monitoring."""
        return {
            "memory_cache": self._cache.stats(),
            "redis_available": self._redis is not None,
        }


# Singleton instance
_session_manager: Optional[SessionManager] = None


def get_session_manager() -> SessionManager:
    """Get or create the singleton SessionManager instance."""
    global _session_manager
    if _session_manager is None:
        _session_manager = SessionManager()
    return _session_manager
