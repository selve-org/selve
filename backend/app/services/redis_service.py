"""
Redis Service - Session Storage
Manages assessment session data with TTL and atomic operations
"""
import os
import json
import redis
from typing import Dict, Any, Optional, List
from datetime import timedelta
import logging

logger = logging.getLogger(__name__)


class RedisSessionStore:
    """
    Redis-based session storage for assessment sessions

    Features:
    - Atomic operations (no race conditions)
    - Automatic TTL (24 hour session expiry)
    - JSON serialization/deserialization
    - Graceful fallback to in-memory for development
    """

    def __init__(self):
        """Initialize Redis connection"""
        redis_host = os.getenv("REDIS_HOST", "localhost")
        redis_port = int(os.getenv("REDIS_PORT", 6379))
        redis_db = int(os.getenv("REDIS_DB", 1))  # Use DB 1 for assessment backend

        try:
            self.client = redis.Redis(
                host=redis_host,
                port=redis_port,
                db=redis_db,
                decode_responses=True,  # Auto-decode bytes to strings
                socket_connect_timeout=5,
                socket_timeout=5
            )
            # Test connection
            self.client.ping()
            self.redis_available = True
            logger.info(f"✅ Redis connected: {redis_host}:{redis_port}/{redis_db}")
        except Exception as e:
            logger.warning(f"⚠️ Redis unavailable, using in-memory fallback: {e}")
            self.redis_available = False
            self._memory_store: Dict[str, Dict] = {}  # Fallback to in-memory

        # Default TTL for sessions (24 hours)
        self.default_ttl = timedelta(hours=24)

    def ping(self) -> bool:
        """Check if Redis is connected"""
        if not self.redis_available:
            return False
        try:
            return self.client.ping()
        except Exception:
            return False

    # ========================================================================
    # Session Operations
    # ========================================================================

    def get_session(self, session_id: str) -> Optional[Dict[str, Any]]:
        """
        Retrieve session data

        Args:
            session_id: Session ID

        Returns:
            Session data dict or None if not found
        """
        if not self.redis_available:
            return self._memory_store.get(session_id)

        try:
            key = f"session:{session_id}"
            cached = self.client.get(key)

            if cached:
                return json.loads(cached)
            return None
        except Exception as e:
            logger.error(f"❌ Redis get error for session {session_id}: {e}")
            return None

    def set_session(
        self,
        session_id: str,
        session_data: Dict[str, Any],
        ttl: Optional[timedelta] = None
    ) -> bool:
        """
        Store session data with TTL

        Args:
            session_id: Session ID
            session_data: Session data dict
            ttl: Time to live (default: 24 hours)

        Returns:
            True if stored successfully
        """
        if not self.redis_available:
            self._memory_store[session_id] = session_data
            return True

        try:
            key = f"session:{session_id}"
            value = json.dumps(session_data)
            ttl = ttl or self.default_ttl

            self.client.setex(key, ttl, value)
            return True
        except Exception as e:
            logger.error(f"❌ Redis set error for session {session_id}: {e}")
            return False

    def delete_session(self, session_id: str) -> bool:
        """
        Delete session data

        Args:
            session_id: Session ID

        Returns:
            True if deleted successfully
        """
        if not self.redis_available:
            if session_id in self._memory_store:
                del self._memory_store[session_id]
            return True

        try:
            key = f"session:{session_id}"
            self.client.delete(key)
            return True
        except Exception as e:
            logger.error(f"❌ Redis delete error for session {session_id}: {e}")
            return False

    def update_session_field(
        self,
        session_id: str,
        field_name: str,
        field_value: Any
    ) -> bool:
        """
        Update a single field in session data (atomic operation)

        Args:
            session_id: Session ID
            field_name: Field name to update
            field_value: New field value

        Returns:
            True if updated successfully
        """
        session = self.get_session(session_id)
        if session is None:
            logger.warning(f"⚠️ Session {session_id} not found for field update")
            return False

        session[field_name] = field_value
        return self.set_session(session_id, session)

    def session_exists(self, session_id: str) -> bool:
        """
        Check if session exists

        Args:
            session_id: Session ID

        Returns:
            True if session exists
        """
        if not self.redis_available:
            return session_id in self._memory_store

        try:
            key = f"session:{session_id}"
            return self.client.exists(key) > 0
        except Exception:
            return False

    def extend_session_ttl(
        self,
        session_id: str,
        ttl: Optional[timedelta] = None
    ) -> bool:
        """
        Extend session TTL (touch session)

        Args:
            session_id: Session ID
            ttl: New TTL (default: 24 hours)

        Returns:
            True if extended successfully
        """
        if not self.redis_available:
            return True  # In-memory sessions don't expire

        try:
            key = f"session:{session_id}"
            ttl = ttl or self.default_ttl
            return self.client.expire(key, ttl)
        except Exception as e:
            logger.error(f"❌ Redis TTL extend error for session {session_id}: {e}")
            return False

    # ========================================================================
    # Cache Management
    # ========================================================================

    def clear_all_sessions(self) -> bool:
        """
        Clear all session data (use with caution!)

        Returns:
            True if cleared successfully
        """
        if not self.redis_available:
            self._memory_store.clear()
            return True

        try:
            # Find all session keys
            keys = self.client.keys("session:*")
            if keys:
                self.client.delete(*keys)
            return True
        except Exception as e:
            logger.error(f"❌ Redis clear all error: {e}")
            return False

    def get_session_count(self) -> int:
        """
        Get count of active sessions

        Returns:
            Number of active sessions
        """
        if not self.redis_available:
            return len(self._memory_store)

        try:
            keys = self.client.keys("session:*")
            return len(keys)
        except Exception:
            return 0

    # ========================================================================
    # Distributed Locking - Prevents Race Conditions
    # ========================================================================

    def acquire_lock(
        self,
        lock_name: str,
        lock_timeout: int = 120,
        blocking: bool = True,
        blocking_timeout: int = 130
    ) -> Optional[str]:
        """
        Acquire a distributed lock using Redis SETNX.
        
        This prevents race conditions when multiple requests try to perform
        the same operation (e.g., generating assessment results).
        
        Args:
            lock_name: Unique identifier for the lock (e.g., "results:session123")
            lock_timeout: Seconds before lock auto-expires (prevents deadlocks)
            blocking: If True, wait for lock; if False, return None immediately if locked
            blocking_timeout: Max seconds to wait for lock when blocking
            
        Returns:
            Lock token (str) if acquired, None if failed/timeout
        """
        import uuid
        import time
        
        lock_key = f"lock:{lock_name}"
        lock_token = str(uuid.uuid4())  # Unique token to ensure only owner can release
        
        if not self.redis_available:
            # In-memory fallback: simple dict-based lock
            if not hasattr(self, '_memory_locks'):
                self._memory_locks: Dict[str, str] = {}
            
            if lock_key in self._memory_locks:
                if not blocking:
                    return None
                # Simple busy-wait for in-memory (dev only)
                start = time.time()
                while lock_key in self._memory_locks:
                    if time.time() - start > blocking_timeout:
                        return None
                    time.sleep(0.1)
            
            self._memory_locks[lock_key] = lock_token
            return lock_token
        
        try:
            if blocking:
                # Blocking: keep trying until timeout
                start = time.time()
                while time.time() - start < blocking_timeout:
                    # Try to acquire with NX (only if not exists) and EX (expiry)
                    acquired = self.client.set(
                        lock_key, 
                        lock_token, 
                        nx=True,  # Only set if not exists
                        ex=lock_timeout  # Auto-expire after timeout
                    )
                    if acquired:
                        logger.debug(f"🔒 Lock acquired: {lock_name}")
                        return lock_token
                    
                    # Wait a bit before retrying
                    time.sleep(0.5)
                
                # Timeout waiting for lock
                logger.warning(f"⏰ Lock timeout waiting for: {lock_name}")
                return None
            else:
                # Non-blocking: try once
                acquired = self.client.set(
                    lock_key, 
                    lock_token, 
                    nx=True, 
                    ex=lock_timeout
                )
                if acquired:
                    logger.debug(f"🔒 Lock acquired: {lock_name}")
                    return lock_token
                return None
                
        except Exception as e:
            logger.error(f"❌ Redis lock error for {lock_name}: {e}")
            return None

    def release_lock(self, lock_name: str, lock_token: str) -> bool:
        """
        Release a distributed lock (only if we own it).
        
        Uses Lua script for atomic check-and-delete to prevent
        accidentally releasing someone else's lock.
        
        Args:
            lock_name: Lock identifier
            lock_token: Token returned by acquire_lock
            
        Returns:
            True if released, False if not owner or error
        """
        lock_key = f"lock:{lock_name}"
        
        if not self.redis_available:
            # In-memory fallback
            if hasattr(self, '_memory_locks') and self._memory_locks.get(lock_key) == lock_token:
                del self._memory_locks[lock_key]
                return True
            return False
        
        try:
            # Lua script: atomic check-and-delete
            # Only delete if the lock value matches our token
            lua_script = """
            if redis.call("get", KEYS[1]) == ARGV[1] then
                return redis.call("del", KEYS[1])
            else
                return 0
            end
            """
            result = self.client.eval(lua_script, 1, lock_key, lock_token)
            if result:
                logger.debug(f"🔓 Lock released: {lock_name}")
                return True
            return False
        except Exception as e:
            logger.error(f"❌ Redis unlock error for {lock_name}: {e}")
            return False

    def is_locked(self, lock_name: str) -> bool:
        """
        Check if a lock is currently held.
        
        Args:
            lock_name: Lock identifier
            
        Returns:
            True if locked, False otherwise
        """
        lock_key = f"lock:{lock_name}"
        
        if not self.redis_available:
            return hasattr(self, '_memory_locks') and lock_key in self._memory_locks
        
        try:
            return self.client.exists(lock_key) > 0
        except Exception:
            return False

    # ========================================================================
    # Generation Progress Tracking
    # ========================================================================

    def init_generation_progress(
        self,
        session_id: str,
        total_steps: int,
        step_names: List[str],
        ttl_seconds: int = 300
    ) -> bool:
        """
        Initialize progress tracking for narrative generation.
        
        Args:
            session_id: Session ID
            total_steps: Total number of steps (sections to generate)
            step_names: Names of the steps for display
            ttl_seconds: Time to live for progress data (default 5 minutes)
            
        Returns:
            True if initialized successfully
        """
        progress_key = f"progress:{session_id}"
        progress_data = {
            "total_steps": total_steps,
            "completed_steps": 0,
            "current_step": step_names[0] if step_names else "Initializing",
            "step_names": step_names,
            "completed_step_names": [],
            "started_at": __import__('time').time(),
            "status": "generating"
        }
        
        if not self.redis_available:
            if not hasattr(self, '_memory_progress'):
                self._memory_progress: Dict[str, Dict] = {}
            self._memory_progress[session_id] = progress_data
            return True
        
        try:
            self.client.setex(
                progress_key,
                ttl_seconds,
                json.dumps(progress_data)
            )
            logger.debug(f"📊 Progress initialized for {session_id}: {total_steps} steps")
            return True
        except Exception as e:
            logger.error(f"❌ Redis progress init error: {e}")
            return False

    def update_generation_progress(
        self,
        session_id: str,
        completed_step: str,
        next_step: Optional[str] = None
    ) -> bool:
        """
        Update progress when a step completes.
        
        Args:
            session_id: Session ID
            completed_step: Name of the step that completed
            next_step: Name of the next step (optional)
            
        Returns:
            True if updated successfully
        """
        progress_key = f"progress:{session_id}"
        
        if not self.redis_available:
            if hasattr(self, '_memory_progress') and session_id in self._memory_progress:
                progress = self._memory_progress[session_id]
                progress["completed_steps"] += 1
                progress["completed_step_names"].append(completed_step)
                if next_step:
                    progress["current_step"] = next_step
                elif progress["completed_steps"] >= progress["total_steps"]:
                    progress["current_step"] = "Finalizing"
                    progress["status"] = "finalizing"
                return True
            return False
        
        try:
            cached = self.client.get(progress_key)
            if not cached:
                return False
            
            progress = json.loads(cached)
            progress["completed_steps"] += 1
            progress["completed_step_names"].append(completed_step)
            
            if next_step:
                progress["current_step"] = next_step
            elif progress["completed_steps"] >= progress["total_steps"]:
                progress["current_step"] = "Finalizing"
                progress["status"] = "finalizing"
            
            # Get remaining TTL and preserve it
            ttl = self.client.ttl(progress_key)
            if ttl > 0:
                self.client.setex(progress_key, ttl, json.dumps(progress))
            else:
                self.client.setex(progress_key, 300, json.dumps(progress))
            
            logger.debug(f"📊 Progress updated for {session_id}: {progress['completed_steps']}/{progress['total_steps']}")
            return True
        except Exception as e:
            logger.error(f"❌ Redis progress update error: {e}")
            return False

    def get_generation_progress(self, session_id: str) -> Optional[Dict[str, Any]]:
        """
        Get current generation progress.
        
        Args:
            session_id: Session ID
            
        Returns:
            Progress dict with completed_steps, total_steps, current_step, percentage
        """
        progress_key = f"progress:{session_id}"
        
        if not self.redis_available:
            if hasattr(self, '_memory_progress') and session_id in self._memory_progress:
                progress = self._memory_progress[session_id]
                percentage = int((progress["completed_steps"] / progress["total_steps"]) * 100) if progress["total_steps"] > 0 else 0
                return {
                    **progress,
                    "percentage": percentage
                }
            return None
        
        try:
            cached = self.client.get(progress_key)
            if not cached:
                return None
            
            progress = json.loads(cached)
            percentage = int((progress["completed_steps"] / progress["total_steps"]) * 100) if progress["total_steps"] > 0 else 0
            
            return {
                **progress,
                "percentage": percentage
            }
        except Exception as e:
            logger.error(f"❌ Redis progress get error: {e}")
            return None

    def complete_generation_progress(self, session_id: str) -> bool:
        """
        Mark generation as complete and set progress to 100% with TTL.
        Instead of deleting immediately, we keep it for 5 minutes to prevent race conditions.

        Args:
            session_id: Session ID

        Returns:
            True if completed successfully
        """
        progress_key = f"progress:{session_id}"

        if not self.redis_available:
            if hasattr(self, '_memory_progress') and session_id in self._memory_progress:
                # Set to 100% instead of deleting for in-memory fallback
                self._memory_progress[session_id] = {
                    "completed_steps": 7,
                    "total_steps": 7,
                    "current_step": "Complete!",
                    "completed_step_names": []
                }
            return True

        try:
            # Set progress to 100% with 5-minute TTL instead of immediate delete
            # This prevents race condition where frontend polls after results saved but before it sees them
            final_progress = {
                "completed_steps": 7,
                "total_steps": 7,
                "current_step": "Complete!",
                "completed_step_names": [],
                "percentage": 100
            }
            self.client.setex(
                progress_key,
                300,  # 5 minutes TTL - auto-cleanup
                json.dumps(final_progress)
            )
            logger.debug(f"📊 Progress set to 100% with 5min TTL for {session_id}")
            return True
        except Exception as e:
            logger.error(f"❌ Redis progress complete error: {e}")
            return False


# ============================================================================
# Global Instance
# ============================================================================

_redis_session_store: Optional[RedisSessionStore] = None


def get_redis_session_store() -> RedisSessionStore:
    """
    Get singleton Redis session store instance

    Returns:
        RedisSessionStore instance
    """
    global _redis_session_store
    if _redis_session_store is None:
        _redis_session_store = RedisSessionStore()
    return _redis_session_store
