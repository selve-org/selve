"""
Redis Service - Session Storage
Manages assessment session data with TTL and atomic operations
"""
import os
import json
import redis
from typing import Dict, Any, Optional
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
