"""
Assessment Module

Production-grade assessment API for SELVE personality profiling.

Architecture:
- router.py: FastAPI endpoints
- schemas.py: Pydantic request/response models
- session_manager.py: Session storage (Redis + memory)
- question_engine.py: Question selection and formatting
- dependencies.py: FastAPI dependency injection
- constants.py: Configuration and constants
- exceptions.py: Custom exception hierarchy
- utils.py: Helper functions

Usage:
    from app.routes.assessment import router
    app.include_router(router)

Features:
- Adaptive personality testing with 8 SELVE dimensions
- Dual-write session storage (Redis + memory) for reliability
- Context-aware question filtering (demographics-based)
- Response validation and consistency checking
- OpenAI-powered narrative generation with caching
- Distributed locking for concurrent request handling
- Comprehensive error handling with structured responses
- Result sharing with privacy controls
- Friend insights integration

Security:
- Input validation and sanitization
- Session ownership verification
- Rate limiting via Redis locks
- SQL injection prevention (Prisma)
- XSS prevention (Pydantic validation)
"""

from .router import router
from .schemas import (
    StartAssessmentRequest,
    StartAssessmentResponse,
    SubmitAnswerRequest,
    SubmitAnswerResponse,
    GetPreviousQuestionRequest,
    GetPreviousQuestionResponse,
    GetResultsResponse,
    TransferSessionRequest,
    QuestionResponse,
    ValidationResult,
    ErrorResponse,
)
from .session_manager import SessionManager, get_session_manager
from .question_engine import QuestionEngine
from .exceptions import (
    AssessmentError,
    SessionNotFoundError,
    SessionExpiredError,
    SessionAlreadyExistsError,
    SessionOwnershipError,
    InvalidResponseError,
    QuestionNotFoundError,
    AssessmentIncompleteError,
    NavigationError,
    AuthenticationRequiredError,
    SharePermissionError,
    StorageError,
    NarrativeGenerationError,
    ResultsGenerationInProgressError,
    ExternalServiceError,
)
from .constants import (
    DIMENSIONS,
    DEMOGRAPHIC_QUESTIONS,
    DEMOGRAPHIC_QUESTION_ORDER,
    AssessmentConfig,
    Dimension,
)

__all__ = [
    # Router
    "router",
    
    # Schemas
    "StartAssessmentRequest",
    "StartAssessmentResponse",
    "SubmitAnswerRequest",
    "SubmitAnswerResponse",
    "GetPreviousQuestionRequest",
    "GetPreviousQuestionResponse",
    "GetResultsResponse",
    "TransferSessionRequest",
    "QuestionResponse",
    "ValidationResult",
    "ErrorResponse",
    
    # Managers
    "SessionManager",
    "get_session_manager",
    "QuestionEngine",
    
    # Exceptions
    "AssessmentError",
    "SessionNotFoundError",
    "SessionExpiredError",
    "SessionAlreadyExistsError",
    "SessionOwnershipError",
    "InvalidResponseError",
    "QuestionNotFoundError",
    "AssessmentIncompleteError",
    "NavigationError",
    "AuthenticationRequiredError",
    "SharePermissionError",
    "StorageError",
    "NarrativeGenerationError",
    "ResultsGenerationInProgressError",
    "ExternalServiceError",
    
    # Constants
    "DIMENSIONS",
    "DEMOGRAPHIC_QUESTIONS",
    "DEMOGRAPHIC_QUESTION_ORDER",
    "AssessmentConfig",
    "Dimension",
]
