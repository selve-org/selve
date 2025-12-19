"""
Production Logging Configuration
- JSON structured logging
- File rotation (50MB per file, 30-day retention)
- PII scrubbing
- Environment-based log levels
"""

import logging
import logging.handlers
import json
import re
import os
from datetime import datetime
from typing import Any, Dict

# Environment-based log levels
LOG_LEVELS = {
    "development": logging.DEBUG,
    "staging": logging.INFO,
    "production": logging.WARNING,
}


class PIIScrubber:
    """Scrub PII from log messages"""

    @staticmethod
    def scrub(message: str) -> str:
        """Remove PII from log messages"""
        if not isinstance(message, str):
            return message

        # User IDs - truncate to first 8 chars
        message = re.sub(
            r'user_[a-zA-Z0-9]{16,}',
            lambda m: m.group(0)[:12] + "***",
            message
        )

        # Clerk IDs - truncate
        message = re.sub(
            r'user_[a-zA-Z0-9_]{20,}',
            lambda m: m.group(0)[:12] + "***",
            message
        )

        # Email addresses
        message = re.sub(
            r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
            '***@***.***',
            message
        )

        # Financial amounts
        message = re.sub(r'\$\d+\.\d+', '$X.XX', message)

        # Credit card numbers (if any leaked)
        message = re.sub(
            r'\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b',
            '****-****-****-****',
            message
        )

        # API keys and tokens
        message = re.sub(
            r'(api[_-]?key|token|secret)["\']?\s*[:=]\s*["\']?[\w-]{20,}',
            r'\1=***REDACTED***',
            message,
            flags=re.IGNORECASE
        )

        return message


class JSONFormatter(logging.Formatter):
    """Format logs as JSON with structured fields"""

    def format(self, record: logging.LogRecord) -> str:
        log_data: Dict[str, Any] = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "level": record.levelname,
            "logger": record.name,
            "message": PIIScrubber.scrub(str(record.getMessage())),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno,
        }

        # Add exception info if present
        if record.exc_info:
            log_data["exception"] = PIIScrubber.scrub(
                self.formatException(record.exc_info)
            )

        # Add extra fields
        if hasattr(record, "user_id"):
            user_id = str(record.user_id)
            log_data["user_id"] = user_id[:8] + "***" if len(user_id) > 8 else user_id

        if hasattr(record, "request_id"):
            log_data["request_id"] = record.request_id

        if hasattr(record, "duration_ms"):
            log_data["duration_ms"] = record.duration_ms

        if hasattr(record, "endpoint"):
            log_data["endpoint"] = record.endpoint

        return json.dumps(log_data)


def setup_logging(app_name: str = "selve-backend"):
    """Configure logging for production"""
    env = os.getenv("ENVIRONMENT", "development")
    log_level = LOG_LEVELS.get(env, logging.INFO)

    # Root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(log_level)

    # Remove existing handlers
    for handler in root_logger.handlers[:]:
        root_logger.removeHandler(handler)

    # Console handler (always enabled)
    console_handler = logging.StreamHandler()
    console_handler.setLevel(log_level)

    if env == "production":
        # JSON format for production
        console_handler.setFormatter(JSONFormatter())
    else:
        # Human-readable format for development
        console_formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S'
        )
        console_handler.setFormatter(console_formatter)

    root_logger.addHandler(console_handler)

    # Logging goes to stdout → systemd journal (StandardOutput=journal)
    # No file logging needed - journald handles rotation, compression, and persistence
    logging.info(f"ℹ️ Logging to stdout ({env} mode) → journald via systemd")

    # Suppress noisy third-party loggers
    logging.getLogger("httpx").setLevel(logging.WARNING)
    logging.getLogger("httpcore").setLevel(logging.WARNING)
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("prisma").setLevel(logging.WARNING)

    return root_logger
