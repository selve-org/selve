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
import logging
from typing import TypeVar, Callable, Awaitable
from prisma.errors import DataError, PrismaError

logger = logging.getLogger(__name__)

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
    Execute a database operation with retry logic for transient errors (ROB-2).

    Improvements:
    - Exponential backoff with configurable base delay
    - Handles multiple Prisma error types (connection pool, network, etc.)
    - Proper logging instead of print statements
    - Jitter to prevent thundering herd

    Args:
        operation: Async callable that performs the database operation
        max_retries: Maximum number of attempts (default: 3)
        base_delay: Base delay in seconds for exponential backoff (default: 0.5)
        operation_name: Name for logging purposes

    Returns:
        Result of the operation

    Raises:
        PrismaError: If all retries are exhausted
    """
    import random

    for attempt in range(1, max_retries + 1):
        try:
            return await operation()

        except (DataError, PrismaError) as e:
            error_msg = str(e)

            # Check if this is a transient error that should be retried
            is_transient = any([
                "connection pool" in error_msg.lower(),
                "timed out" in error_msg.lower(),
                "connection refused" in error_msg.lower(),
                "temporarily unavailable" in error_msg.lower(),
                "deadlock" in error_msg.lower(),
            ])

            if is_transient and attempt < max_retries:
                # Exponential backoff with jitter to prevent thundering herd
                wait = base_delay * (2 ** (attempt - 1))
                jitter = random.uniform(0, wait * 0.1)  # Add up to 10% jitter
                total_wait = wait + jitter

                logger.warning(
                    f"Transient database error on {operation_name} "
                    f"(attempt {attempt}/{max_retries}) - retrying in {total_wait:.2f}s: "
                    f"{error_msg[:150]}"
                )
                await asyncio.sleep(total_wait)
                continue

            # Re-raise if not a transient error or if retries exhausted
            if attempt >= max_retries:
                logger.error(
                    f"Database operation {operation_name} failed after {max_retries} retries: "
                    f"{error_msg[:150]}"
                )
            raise

    # This should never be reached, but satisfies type checker
    raise RuntimeError("Unexpected end of retry loop")
