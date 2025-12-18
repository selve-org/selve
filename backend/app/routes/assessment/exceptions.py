"""
Assessment Module - Custom Exceptions

Production-grade exception hierarchy with:
- Automatic HTTP status code mapping
- Structured error responses
- Logging integration
- User-friendly messages separate from internal details
"""

from typing import Optional, Dict, Any, List


class AssessmentError(Exception):
    """
    Base exception for all assessment-related errors.
    
    Attributes:
        message: User-friendly error message
        status_code: HTTP status code to return
        error_code: Machine-readable error code for client handling
        details: Additional context for debugging (not exposed to user)
    """
    
    status_code: int = 500
    error_code: str = "ASSESSMENT_ERROR"
    
    def __init__(
        self,
        message: str = "An error occurred during assessment",
        details: Optional[Dict[str, Any]] = None,
        status_code: Optional[int] = None,
        error_code: Optional[str] = None,
    ):
        self.message = message
        self.details = details or {}
        if status_code is not None:
            self.status_code = status_code
        if error_code is not None:
            self.error_code = error_code
        super().__init__(self.message)
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to API response format."""
        return {
            "error": self.error_code,
            "message": self.message,
            "status_code": self.status_code,
        }


# ============================================================================
# Session Errors (404, 409, 410)
# ============================================================================

class SessionNotFoundError(AssessmentError):
    """Session does not exist or has expired."""
    
    status_code = 404
    error_code = "SESSION_NOT_FOUND"
    
    def __init__(self, session_id: str, details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=f"Assessment session not found or expired",
            details={"session_id": session_id, **(details or {})},
        )


class SessionExpiredError(AssessmentError):
    """Session existed but has expired."""
    
    status_code = 410
    error_code = "SESSION_EXPIRED"
    
    def __init__(self, session_id: str, expired_at: Optional[str] = None):
        super().__init__(
            message="Your assessment session has expired. Please start a new assessment.",
            details={"session_id": session_id, "expired_at": expired_at},
        )


class SessionAlreadyExistsError(AssessmentError):
    """Attempted to create session that already exists."""
    
    status_code = 409
    error_code = "SESSION_EXISTS"
    
    def __init__(self, session_id: str):
        super().__init__(
            message="An active assessment session already exists",
            details={"session_id": session_id},
        )


class SessionOwnershipError(AssessmentError):
    """User doesn't own this session."""
    
    status_code = 403
    error_code = "SESSION_OWNERSHIP_ERROR"
    
    def __init__(self, session_id: str, action: str = "access"):
        super().__init__(
            message=f"You don't have permission to {action} this session",
            details={"session_id": session_id, "action": action},
        )


# ============================================================================
# Validation Errors (400, 422)
# ============================================================================

class InvalidResponseError(AssessmentError):
    """Response value is invalid for the question type."""
    
    status_code = 400
    error_code = "INVALID_RESPONSE"
    
    def __init__(
        self,
        question_id: str,
        expected: str,
        received: Any,
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(
            message=f"Invalid response for question. Expected {expected}.",
            details={
                "question_id": question_id,
                "expected": expected,
                "received": str(received)[:100],  # Truncate for safety
                **(details or {}),
            },
        )


class QuestionNotFoundError(AssessmentError):
    """Question ID doesn't exist in the item pool."""
    
    status_code = 400
    error_code = "QUESTION_NOT_FOUND"
    
    def __init__(self, question_id: str):
        super().__init__(
            message="Question not found",
            details={"question_id": question_id},
        )


class AssessmentIncompleteError(AssessmentError):
    """Attempted to get results before completing assessment."""
    
    status_code = 400
    error_code = "ASSESSMENT_INCOMPLETE"
    
    def __init__(self, missing_dimensions: List[str], questions_answered: int):
        super().__init__(
            message="Assessment is not complete. Please answer more questions.",
            details={
                "missing_dimensions": missing_dimensions,
                "questions_answered": questions_answered,
            },
        )


class NavigationError(AssessmentError):
    """Invalid navigation attempt (e.g., going back too far)."""
    
    status_code = 400
    error_code = "NAVIGATION_ERROR"
    
    def __init__(self, reason: str, details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=reason,
            details=details,
        )


# ============================================================================
# Authorization Errors (401, 403)
# ============================================================================

class AuthenticationRequiredError(AssessmentError):
    """Operation requires authentication."""
    
    status_code = 401
    error_code = "AUTH_REQUIRED"
    
    def __init__(self, operation: str = "this operation"):
        super().__init__(
            message=f"Authentication required for {operation}",
            details={"operation": operation},
        )


class SharePermissionError(AssessmentError):
    """User cannot share/unshare this result."""
    
    status_code = 403
    error_code = "SHARE_PERMISSION_DENIED"
    
    def __init__(self, session_id: str):
        super().__init__(
            message="You can only manage sharing for your own results",
            details={"session_id": session_id},
        )


# ============================================================================
# Service Errors (500, 503)
# ============================================================================

class StorageError(AssessmentError):
    """Error with session storage (Redis/Database)."""
    
    status_code = 503
    error_code = "STORAGE_ERROR"
    
    def __init__(self, operation: str, details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message="Temporary storage issue. Please try again.",
            details={"operation": operation, **(details or {})},
        )


class NarrativeGenerationError(AssessmentError):
    """Failed to generate narrative with OpenAI."""
    
    status_code = 500
    error_code = "NARRATIVE_GENERATION_FAILED"
    
    def __init__(self, reason: str, fallback_used: bool = False):
        super().__init__(
            message="Unable to generate personalized narrative" if not fallback_used 
                    else "Generated narrative using fallback method",
            details={"reason": reason, "fallback_used": fallback_used},
        )


class ResultsGenerationInProgressError(AssessmentError):
    """Results are being generated by another request."""
    
    status_code = 503
    error_code = "RESULTS_IN_PROGRESS"
    
    def __init__(self, session_id: str, wait_time: int = 30):
        super().__init__(
            message="Your results are being generated. Please wait a moment and try again.",
            details={"session_id": session_id, "retry_after_seconds": wait_time},
        )


class ExternalServiceError(AssessmentError):
    """External service (OpenAI, etc.) failed."""
    
    status_code = 502
    error_code = "EXTERNAL_SERVICE_ERROR"
    
    def __init__(self, service: str, details: Optional[Dict[str, Any]] = None):
        super().__init__(
            message=f"External service temporarily unavailable",
            details={"service": service, **(details or {})},
        )
