"""
Assessment Module - FastAPI Dependencies

Dependency injection functions for route handlers.

Benefits:
- Clean separation of concerns
- Easy testing (can mock dependencies)
- Consistent error handling
- Automatic resource cleanup
"""

import logging
from typing import Optional, Dict, Any, Tuple
from fastapi import Depends, HTTPException, Request

from app.auth import get_current_user
from app.services.assessment_service import AssessmentService

from .session_manager import get_session_manager, SessionManager
from .question_engine import QuestionEngine
from .exceptions import (
    SessionNotFoundError,
    AuthenticationRequiredError,
    SessionOwnershipError,
    AssessmentError,
)

logger = logging.getLogger(__name__)


# ============================================================================
# Service Dependencies
# ============================================================================

async def get_assessment_service() -> AssessmentService:
    """Get AssessmentService instance."""
    return AssessmentService()


def get_session_mgr() -> SessionManager:
    """Get SessionManager singleton."""
    return get_session_manager()


# ============================================================================
# Authentication Dependencies
# ============================================================================

async def get_optional_user(
    user: Optional[dict] = Depends(get_current_user)
) -> Optional[dict]:
    """
    Get current user if authenticated, None otherwise.
    
    Use this for endpoints that support both anonymous and authenticated users.
    """
    return user


async def get_required_user(
    user: Optional[dict] = Depends(get_current_user)
) -> dict:
    """
    Get current user, raising error if not authenticated.
    
    Use this for endpoints that require authentication.
    """
    if not user:
        raise AuthenticationRequiredError("this operation")
    return user


def get_clerk_user_id(user: Optional[dict]) -> Optional[str]:
    """Extract Clerk user ID from user dict."""
    if user:
        return user.get("sub")
    return None


# ============================================================================
# Session Dependencies
# ============================================================================

async def get_session_from_request(
    session_id: str,
    session_mgr: SessionManager = Depends(get_session_mgr),
) -> Dict[str, Any]:
    """
    Get session by ID with database fallback.
    
    Raises:
        SessionNotFoundError: If session doesn't exist
    """
    session = await session_mgr.get_session_with_db_fallback(
        session_id, 
        raise_if_missing=True
    )
    return session


async def get_session_with_ownership_check(
    session_id: str,
    user: dict = Depends(get_required_user),
    service: AssessmentService = Depends(get_assessment_service),
) -> Tuple[Dict[str, Any], str]:
    """
    Get session and verify ownership.
    
    Returns:
        Tuple of (session_dict, clerk_user_id)
        
    Raises:
        SessionNotFoundError: If session doesn't exist
        SessionOwnershipError: If user doesn't own session
    """
    clerk_user_id = get_clerk_user_id(user)
    
    # Get session from database to check ownership
    db_session = await service.get_session(session_id)
    if not db_session:
        raise SessionNotFoundError(session_id)
    
    # Verify ownership
    if db_session.clerkUserId != clerk_user_id:
        raise SessionOwnershipError(session_id, "access")
    
    # Get full session from manager
    session_mgr = get_session_manager()
    session = await session_mgr.get_session_with_db_fallback(session_id)
    
    return session, clerk_user_id


# ============================================================================
# Question Engine Dependency
# ============================================================================

def get_question_engine_from_session(session: Dict[str, Any]) -> QuestionEngine:
    """
    Create QuestionEngine from session's tester and scorer.
    
    Args:
        session: Session dict with tester and scorer
        
    Returns:
        Configured QuestionEngine
    """
    return QuestionEngine(
        tester=session["tester"],
        scorer=session["scorer"],
    )


# ============================================================================
# Exception Handler
# ============================================================================

async def handle_assessment_exception(request: Request, exc: AssessmentError):
    """
    Convert AssessmentError to HTTPException with proper formatting.
    
    This is registered as an exception handler in the router.
    """
    logger.warning(
        f"Assessment error: {exc.error_code} - {exc.message}",
        extra={"details": exc.details}
    )
    
    raise HTTPException(
        status_code=exc.status_code,
        detail={
            "error": exc.error_code,
            "message": exc.message,
        }
    )


# ============================================================================
# Validation Helpers
# ============================================================================

def validate_clerk_user_id(clerk_user_id: Optional[str]) -> str:
    """
    Validate Clerk user ID format.
    
    Raises:
        HTTPException: If invalid format
    """
    if not clerk_user_id:
        raise HTTPException(
            status_code=400,
            detail="clerk_user_id is required"
        )
    
    if not clerk_user_id.startswith("user_"):
        raise HTTPException(
            status_code=400,
            detail="Invalid Clerk user ID format"
        )
    
    return clerk_user_id


def validate_session_id(session_id: str) -> str:
    """
    Validate session ID format.
    
    Raises:
        HTTPException: If invalid format
    """
    if not session_id or len(session_id) > 100:
        raise HTTPException(
            status_code=400,
            detail="Invalid session ID"
        )
    
    # Check for suspicious characters
    suspicious = ['<', '>', '"', "'", ';', '--', '/*', '*/']
    if any(s in session_id for s in suspicious):
        raise HTTPException(
            status_code=400,
            detail="Invalid session ID format"
        )
    
    return session_id
