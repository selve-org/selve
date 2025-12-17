"""Request logging middleware with tracing"""

import logging
import time
import uuid
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

logger = logging.getLogger(__name__)


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    """Log all requests with unique trace IDs"""

    async def dispatch(self, request: Request, call_next):
        # Generate unique request ID
        request_id = str(uuid.uuid4())
        request.state.request_id = request_id

        # Start timer
        start_time = time.time()

        # Log request
        user_id = request.headers.get("X-User-ID", "anonymous")
        logger.info(
            f"Request started: {request.method} {request.url.path}",
            extra={
                "request_id": request_id,
                "user_id": user_id,
                "method": request.method,
                "endpoint": request.url.path,
            }
        )

        # Process request
        try:
            response = await call_next(request)
            duration_ms = (time.time() - start_time) * 1000

            # Log response
            logger.info(
                f"Request completed: {request.method} {request.url.path} - {response.status_code}",
                extra={
                    "request_id": request_id,
                    "user_id": user_id,
                    "status_code": response.status_code,
                    "duration_ms": round(duration_ms, 2),
                    "endpoint": request.url.path,
                }
            )

            # Warn on slow requests (> 2 seconds)
            if duration_ms > 2000:
                logger.warning(
                    f"Slow request detected: {duration_ms:.2f}ms for {request.url.path}",
                    extra={
                        "request_id": request_id,
                        "duration_ms": round(duration_ms, 2),
                        "endpoint": request.url.path,
                    }
                )

            # Add request ID to response headers for tracing
            response.headers["X-Request-ID"] = request_id
            return response

        except Exception as e:
            duration_ms = (time.time() - start_time) * 1000
            logger.error(
                f"Request failed: {request.method} {request.url.path} - {str(e)}",
                exc_info=True,
                extra={
                    "request_id": request_id,
                    "user_id": user_id,
                    "duration_ms": round(duration_ms, 2),
                    "endpoint": request.url.path,
                }
            )
            raise
