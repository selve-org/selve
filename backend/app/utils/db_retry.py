"""
Database retry utilities for handling transient Prisma connection pool errors.

Usage:
    from app.utils.db_retry import with_db_retry

    result = await with_db_retry(
        lambda: prisma.user.find_unique(where={"id": user_id})
    )
"""

import asyncio
import os
from typing import TypeVar, Callable, Awaitable
from prisma.errors import DataError

T = TypeVar('T')

# Configuration via environment variables
DEFAULT_MAX_RETRIES = int(os.getenv('DB_RETRY_MAX_ATTEMPTS', '3'))
DEFAULT_BASE_DELAY = float(os.getenv('DB_RETRY_BASE_DELAY', '0.5'))


async def with_db_retry(
    operation: Callable[[], Awaitable[T]],
    max_retries: int = DEFAULT_MAX_RETRIES,
    base_delay: float = DEFAULT_BASE_DELAY,
    operation_name: str = "db_operation"
) -> T:
    """
    Execute a database operation with retry logic for transient errors.
    
    Handles Prisma DataError (connection pool timeouts, etc.) with exponential backoff.
    
    Args:
        operation: Async callable that performs the database operation
        max_retries: Maximum number of attempts (default: 3)
        base_delay: Base delay in seconds for exponential backoff (default: 0.5)
        operation_name: Name for logging purposes
        
    Returns:
        Result of the operation
        
    Raises:
        DataError: If all retries are exhausted
    """
    for attempt in range(1, max_retries + 1):
        try:
            return await operation()
        except DataError as e:
            error_msg = str(e)
            is_pool_timeout = "connection pool" in error_msg.lower() or "timed out" in error_msg.lower()
            
            if is_pool_timeout and attempt < max_retries:
                wait = base_delay * (2 ** (attempt - 1))
                print(f"⚠️  Prisma DataError on {operation_name} (attempt {attempt}/{max_retries}) - retrying in {wait}s: {error_msg[:100]}")
                await asyncio.sleep(wait)
                continue
            
            # Re-raise if not a pool timeout or if retries exhausted
            if attempt >= max_retries:
                print(f"❌ Prisma DataError on {operation_name} - exhausted {max_retries} retries: {error_msg[:100]}")
            raise
    
    # This should never be reached, but satisfies type checker
    raise RuntimeError("Unexpected end of retry loop")
