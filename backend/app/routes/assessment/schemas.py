"""
Assessment Module - Pydantic Schemas

Request and response models with comprehensive validation.

Features:
- Input sanitization and validation
- Clear documentation via Field descriptions
- Consistent response formats
- Type-safe serialization
"""

from pydantic import BaseModel, Field, field_validator, model_validator
from typing import Dict, List, Optional, Any, Union
from datetime import datetime
import json

from .constants import ValidationLimits


# ============================================================================
# Request Models
# ============================================================================

class StartAssessmentRequest(BaseModel):
    """Request to start a new assessment session."""
    
    user_id: Optional[str] = Field(
        None, 
        description="Optional user identifier for anonymous users"
    )
    metadata: Optional[Dict[str, Any]] = Field(
        None, 
        description="Optional metadata to attach to the session"
    )
    
    @field_validator('metadata')
    @classmethod
    def validate_metadata_size(cls, v: Optional[Dict]) -> Optional[Dict]:
        """Prevent oversized metadata."""
        if v is not None:
            size = len(json.dumps(v))
            if size > ValidationLimits.MAX_JSON_SIZE:
                raise ValueError(f"Metadata too large (max {ValidationLimits.MAX_JSON_SIZE} bytes)")
        return v


class SubmitAnswerRequest(BaseModel):
    """
    Request to submit an answer.
    
    Includes comprehensive input validation to prevent:
    - Injection attacks
    - DoS via oversized payloads
    - Invalid data types
    """
    
    session_id: str = Field(..., description="Assessment session ID")
    question_id: str = Field(..., description="Question being answered")
    response: Any = Field(..., description="Response value (varies by question type)")
    is_going_back: bool = Field(
        False, 
        description="True if user is updating a previous answer"
    )
    
    @field_validator('session_id', 'question_id')
    @classmethod
    def validate_ids(cls, v: str) -> str:
        """Validate ID format and length."""
        if not v or len(v) > 100:
            raise ValueError("Invalid ID format")
        # Reject suspicious characters
        if any(c in v for c in ['<', '>', '"', "'", ';', '--']):
            raise ValueError("Invalid characters in ID")
        return v.strip()
    
    @field_validator('response')
    @classmethod
    def validate_response(cls, v: Any) -> Any:
        """
        Validate response input for security and data integrity.
        
        Security checks:
        - Limit string length (DoS protection)
        - Reject null bytes and control characters
        - Validate numeric ranges
        - Limit complex object sizes
        """
        # String responses (demographics/text)
        if isinstance(v, str):
            if len(v) > ValidationLimits.MAX_TEXT_LENGTH:
                raise ValueError(
                    f"Response too long (max {ValidationLimits.MAX_TEXT_LENGTH} characters)"
                )
            
            # Reject null bytes and dangerous control characters
            if '\x00' in v or any(ord(c) < 32 and c not in '\n\r\t' for c in v):
                raise ValueError("Invalid characters in response")
            
            return v.strip()
        
        # Numeric responses (rating questions)
        if isinstance(v, (int, float)):
            if not (ValidationLimits.MIN_NUMERIC_VALUE <= v <= ValidationLimits.MAX_NUMERIC_VALUE):
                raise ValueError("Numeric response out of valid range")
            return v
        
        # Complex responses (dict/list)
        if isinstance(v, (dict, list)):
            size = len(json.dumps(v))
            if size > ValidationLimits.MAX_JSON_SIZE:
                raise ValueError("Response data too large")
            return v
        
        # Allow None for optional questions
        if v is None:
            return v
        
        # Reject unexpected types
        raise ValueError(f"Unexpected response type: {type(v).__name__}")


class GetPreviousQuestionRequest(BaseModel):
    """Request to navigate back to previous question."""
    
    session_id: str = Field(..., description="Assessment session ID")
    
    @field_validator('session_id')
    @classmethod
    def validate_session_id(cls, v: str) -> str:
        if not v or len(v) > 100:
            raise ValueError("Invalid session ID")
        return v.strip()


class TransferSessionRequest(BaseModel):
    """Request to transfer anonymous session to authenticated user."""
    
    session_id: str = Field(..., description="Session ID to transfer")
    
    @field_validator('session_id')
    @classmethod
    def validate_session_id(cls, v: str) -> str:
        if not v or len(v) > 100:
            raise ValueError("Invalid session ID")
        return v.strip()


class ArchiveAndRestartRequest(BaseModel):
    """Request to archive current assessment and start fresh."""
    
    clerk_user_id: str = Field(..., description="Clerk user ID")
    
    @field_validator('clerk_user_id')
    @classmethod
    def validate_clerk_id(cls, v: str) -> str:
        if not v or not v.startswith('user_'):
            raise ValueError("Invalid Clerk user ID format")
        return v


class ShareToggleRequest(BaseModel):
    """Request to toggle result sharing."""
    
    enable: bool = Field(..., description="Whether to enable sharing")


# ============================================================================
# Response Models
# ============================================================================

class QuestionResponse(BaseModel):
    """A single question to display to the user."""
    
    id: str = Field(..., description="Unique question identifier")
    text: str = Field(..., description="Question text to display")
    type: str = Field(..., description="Input type (scale-slider, radio, text-input, etc.)")
    dimension: str = Field(..., description="Personality dimension or 'demographics'")
    isRequired: bool = Field(True, description="Whether answer is required")
    renderConfig: Dict[str, Any] = Field(
        default_factory=dict, 
        description="UI rendering configuration"
    )


class StartAssessmentResponse(BaseModel):
    """Response when starting a new assessment."""
    
    session_id: str = Field(..., description="Unique session identifier")
    questions: List[QuestionResponse] = Field(
        ..., 
        description="Initial questions (demographics)"
    )
    total_questions: int = Field(
        ..., 
        description="Estimated total questions"
    )
    progress: float = Field(
        0.0, 
        description="Initial progress (0.0)",
        ge=0.0,
        le=1.0
    )


class SubmitAnswerResponse(BaseModel):
    """Response after submitting an answer."""
    
    next_questions: Optional[List[QuestionResponse]] = Field(
        None, 
        description="Next questions to answer (null if complete)"
    )
    is_complete: bool = Field(..., description="Whether assessment is finished")
    progress: float = Field(
        ..., 
        description="Current progress (0.0 - 1.0)",
        ge=0.0,
        le=1.0
    )
    questions_answered: int = Field(..., description="Total questions answered")
    total_questions: int = Field(..., description="Estimated total questions")
    can_go_back: bool = Field(
        True, 
        description="Whether back navigation is enabled"
    )


class GetPreviousQuestionResponse(BaseModel):
    """Response when navigating back."""
    
    question: Optional[QuestionResponse] = Field(
        None, 
        description="Previous question to review"
    )
    current_answer: Any = Field(
        None, 
        description="User's current answer for this question"
    )
    can_go_back: bool = Field(
        True, 
        description="Whether user can go back further"
    )
    warning: Optional[str] = Field(
        None, 
        description="Warning message about going back"
    )


class ValidationResult(BaseModel):
    """Response validation metrics."""
    
    consistency_score: float = Field(..., description="Response consistency (0-100)")
    attention_score: float = Field(default=100.0, description="Attention/engagement score (0-100)")
    flags: List[str] = Field(default_factory=list, description="Warning flags")
    consistency_report: Optional[Dict[str, Any]] = Field(
        default=None, 
        description="Detailed consistency breakdown as dictionary"
    )
    back_navigation_count: int = Field(default=0, description="Times user went back")
    back_navigation_analysis: Optional[str] = Field(
        default=None, 
        description="Interpretation of back navigation behavior"
    )
    
    @field_validator('consistency_report', mode='before')
    @classmethod
    def ensure_dict_or_none(cls, v: Any) -> Optional[Dict[str, Any]]:
        """
        Ensure consistency_report is a dict or None.
        
        Handles legacy string values by wrapping them in a dict.
        This provides backwards compatibility if old code still passes strings.
        """
        if v is None:
            return None
        if isinstance(v, dict):
            return v
        if isinstance(v, str):
            # Legacy string format - wrap in dict for backwards compatibility
            return {"message": v}
        # For any other type, try to convert or return None
        try:
            return dict(v)
        except (TypeError, ValueError):
            return None


class DimensionScores(BaseModel):
    """Scores for all personality dimensions."""
    
    LUMEN: float = Field(..., ge=0, le=100)
    AETHER: float = Field(..., ge=0, le=100)
    ORPHEUS: float = Field(..., ge=0, le=100)
    ORIN: float = Field(..., ge=0, le=100)
    LYRA: float = Field(..., ge=0, le=100)
    VARA: float = Field(..., ge=0, le=100)
    CHRONOS: float = Field(..., ge=0, le=100)
    KAEL: float = Field(..., ge=0, le=100)


class GetResultsResponse(BaseModel):
    """Complete assessment results with narrative."""
    
    session_id: str = Field(..., description="Session identifier")
    scores: Dict[str, float] = Field(..., description="Dimension scores (0-100)")
    narrative: Dict[str, Any] = Field(..., description="Generated narrative content")
    completed_at: str = Field(..., description="ISO timestamp of completion")
    demographics: Optional[Dict[str, Any]] = Field(
        default=None, 
        description="User demographics (sanitized)"
    )
    validation: Optional[ValidationResult] = Field(
        default=None, 
        description="Response validation metrics"
    )
    is_shared: bool = Field(default=False, description="Whether viewing shared results")


class ProgressResponse(BaseModel):
    """Current assessment progress."""
    
    session_id: str
    questions_answered: int
    is_complete: bool
    completion_reason: Optional[str] = None
    dimension_progress: Dict[str, int] = Field(
        default_factory=dict,
        description="Questions answered per dimension"
    )
    started_at: str


class SessionStateResponse(BaseModel):
    """Full session state for recovery/resumption."""
    
    session_id: str
    status: str = Field(..., description="in-progress, completed, or abandoned")
    progress: float
    questions_answered: int
    total_questions: int
    can_resume: bool
    created_at: str
    updated_at: Optional[str] = None
    completed_at: Optional[str] = None
    responses: Dict[str, Any] = Field(default_factory=dict)
    demographics: Dict[str, Any] = Field(default_factory=dict)
    clerk_user_id: Optional[str] = None
    pending_questions: List[QuestionResponse] = Field(default_factory=list)


class AssessmentHistoryItem(BaseModel):
    """Single assessment in user's history."""
    
    session_id: str
    status: str
    is_current: bool
    created_at: str
    completed_at: Optional[str] = None
    archived_at: Optional[str] = None
    questions_answered: int


class AssessmentHistoryResponse(BaseModel):
    """User's assessment history."""
    
    total: int
    assessments: List[AssessmentHistoryItem]


class CurrentAssessmentResponse(BaseModel):
    """User's current active assessment."""
    
    current_assessment: Optional[Dict[str, Any]] = None


class CurrentResultResponse(BaseModel):
    """User's current assessment result."""
    
    current_result: Optional[Dict[str, Any]] = None


class ShareLinkResponse(BaseModel):
    """Response when creating/managing share link."""
    
    shareId: Optional[str] = None
    shareUrl: Optional[str] = None
    isNew: bool = False
    isPublic: bool = False


class AccessCheckResponse(BaseModel):
    """Response for checking results access."""
    
    hasAccess: bool
    isOwner: bool
    isPublic: bool
    publicShareId: Optional[str] = None


class FriendInsightsResponse(BaseModel):
    """Friend insights for assessment."""
    
    friendResponses: List[Dict[str, Any]] = Field(default_factory=list)
    aggregatedScores: Dict[str, float] = Field(default_factory=dict)
    narrativeSummary: Optional[str] = None
    narrativeGeneratedAt: Optional[str] = None
    narrativeFriendCount: int = 0
    narrativeError: Optional[str] = None
    lastRegeneration: Optional[str] = None


# ============================================================================
# Error Response Model
# ============================================================================

class ErrorResponse(BaseModel):
    """Standardized error response."""
    
    error: str = Field(..., description="Machine-readable error code")
    message: str = Field(..., description="Human-readable error message")
    status_code: int = Field(..., description="HTTP status code")
    details: Optional[Dict[str, Any]] = Field(
        default=None, 
        description="Additional error context (debug only)"
    )
