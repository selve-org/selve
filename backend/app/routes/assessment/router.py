"""
Assessment Module - Main Router

FastAPI router with all assessment endpoints.

This file contains the endpoint definitions. Business logic is delegated to:
- SessionManager: Session storage operations
- QuestionEngine: Question selection and formatting
- AssessmentService: Database operations
- Utils: Common helper functions
"""

import os
import logging
from datetime import datetime
from typing import Optional, Dict, Any, List
from html import escape

from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse

from app.auth import get_current_user
from app.scoring import SelveScorer
from app.narratives import generate_narrative
from app.narratives.integrated_generator import (
    generate_integrated_narrative,
    generate_integrated_narrative_async,
)
from app.response_validator import ResponseValidator
from app.services.assessment_service import (
    AssessmentService, 
    session_to_state_dict,
    update_session_from_state,
)
from app.db import prisma

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
)
from .session_manager import get_session_manager, SessionManager
from .question_engine import QuestionEngine
from .dependencies import (
    get_assessment_service,
    get_optional_user,
    get_required_user,
    get_clerk_user_id,
    validate_clerk_user_id,
    validate_session_id,
)
from .constants import (
    DIMENSIONS,
    DEMOGRAPHIC_QUESTIONS,
    DEMOGRAPHIC_QUESTION_ORDER,
    AssessmentConfig,
    ShareConfig,
)
from .utils import (
    calculate_progress,
    get_dimension_counts,
    analyze_back_navigation,
    log_back_navigation,
    build_validation_response,
    should_run_validation_check,
    personalize_narrative,
    build_fallback_narrative,
    generate_share_id,
    sanitize_demographics_for_sharing,
    build_share_url,
    ensure_numeric_response,
    log_adaptive_decision,
    log_question_selection,
)
from .exceptions import (
    AssessmentError,
    SessionNotFoundError,
    SessionOwnershipError,
    AuthenticationRequiredError,
    InvalidResponseError,
    AssessmentIncompleteError,
    NavigationError,
    StorageError,
    NarrativeGenerationError,
    SharePermissionError,
)

logger = logging.getLogger(__name__)

router = APIRouter(tags=["assessment"])


# ============================================================================
# Core Assessment Flow
# ============================================================================

@router.post("/assessment/start", response_model=StartAssessmentResponse)
async def start_assessment(
    request: StartAssessmentRequest,
    user: Optional[dict] = Depends(get_optional_user),
    service: AssessmentService = Depends(get_assessment_service),
):
    """
    Start a new adaptive assessment.
    
    Supports both authenticated and anonymous users.
    If user is authenticated, session will be linked to their Clerk ID.
    
    Returns:
    - session_id: Unique session identifier
    - questions: Initial demographic questions
    - total_questions: Estimated total (44 items)
    - progress: Initial progress (0.0)
    """
    # Extract user info
    clerk_user_id = get_clerk_user_id(user) if user else None
    user_id = clerk_user_id or request.user_id
    
    try:
        # Create database session
        db_session = await service.create_session(
            user_id=user_id,
            clerk_user_id=clerk_user_id,
            metadata=request.metadata,
        )
        session_id = db_session.id
        
        logger.info(
            f"Started assessment session {session_id[:8]}... "
            f"for user {clerk_user_id or 'anonymous'}"
        )
        
        # Create in-memory session
        session_mgr = get_session_manager()
        session = session_mgr.create_session_dict(
            session_id=session_id,
            clerk_user_id=clerk_user_id,
            clerk_user=user,
            metadata=request.metadata,
        )
        
        # Save to storage
        session_mgr.save_session(session_id, session)
        
        # Get demographic questions
        demographic_questions = [
            QuestionResponse(**DEMOGRAPHIC_QUESTIONS[q_id])
            for q_id in DEMOGRAPHIC_QUESTION_ORDER
        ]
        
        return StartAssessmentResponse(
            session_id=session_id,
            questions=demographic_questions,
            total_questions=AssessmentConfig.ESTIMATED_TOTAL_QUESTIONS,
            progress=0.0,
        )
        
    except Exception as e:
        logger.error(f"Failed to start assessment: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to start assessment")


def sanitize_text_input(text: str, max_length: int = 500) -> str:
    """
    Sanitize user text input to prevent XSS attacks.

    Removes control characters, truncates to max length, and escapes HTML entities.

    Args:
        text: The input text to sanitize
        max_length: Maximum allowed length (default: 500)

    Returns:
        Sanitized and escaped text
    """
    if not isinstance(text, str):
        return ""

    # Remove control characters (keep newlines and tabs)
    text = ''.join(char for char in text if ord(char) >= 32 or char in '\n\t')

    # Truncate to max length
    text = text[:max_length]

    # Escape HTML entities to prevent XSS
    text = escape(text)

    return text.strip()


@router.post("/assessment/answer", response_model=SubmitAnswerResponse)
async def submit_answer(
    request: SubmitAnswerRequest,
    service: AssessmentService = Depends(get_assessment_service),
):
    """
    Submit an answer and get next question(s).

    The adaptive algorithm determines:
    - Whether more questions are needed
    - Which dimension needs more clarity
    - When assessment is complete

    Returns:
    - next_questions: Next adaptive questions (if not complete)
    - is_complete: Whether assessment is finished
    - progress: Current progress (0.0 - 1.0)

    Race condition protection:
    - Uses distributed locking to prevent concurrent modifications
    - Ensures consistency when multiple requests arrive simultaneously
    """
    session_id = validate_session_id(request.session_id)
    session_mgr = get_session_manager()

    # Acquire distributed lock for this session to prevent race conditions
    lock_token = None
    try:
        lock_token = session_mgr._redis.acquire_lock(
            lock_name=f"answer:{session_id}",
            lock_timeout=30,  # 30s max for answer processing
            blocking=True,
            blocking_timeout=35
        )

        if lock_token is None:
            raise HTTPException(
                status_code=503,
                detail="Answer submission in progress. Please wait and try again."
            )

        # Get session with database fallback
        session = await session_mgr.get_session_with_db_fallback(session_id, raise_if_missing=False)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")

        # Extract session components
        tester = session["tester"]
        responses: Dict = session["responses"]
        demographics: Dict = session["demographics"]
        pending_questions: set = session["pending_questions"]
        answer_history: List = session.get("answer_history", [])
        validator = session.get("validator")

        question_id = request.question_id
        is_demographic = question_id.startswith("demo_")

        # Handle back navigation tracking
        if request.is_going_back:
            old_value = demographics.get(question_id) if is_demographic else responses.get(question_id)
            if old_value is not None:
                log_back_navigation(session, question_id, old_value, request.response)

        # Store response based on type
        if is_demographic:
            # Sanitize text input to prevent XSS attacks
            if isinstance(request.response, str):
                max_length = 1000 if question_id == 'demo_name' else 500
                demographics[question_id] = sanitize_text_input(request.response, max_length=max_length)
            else:
                demographics[question_id] = request.response

            # Track in history (avoid duplicates)
            if not request.is_going_back and question_id not in answer_history:
                answer_history.append(question_id)

            # Check if all demographics complete
            all_demographics_complete = len(demographics) >= len(DEMOGRAPHIC_QUESTION_ORDER)

            if not all_demographics_complete:
                # Still collecting demographics
                progress = calculate_progress(len(demographics), 0)
                session_mgr.save_session(session_id, session)

                return SubmitAnswerResponse(
                    next_questions=None,
                    is_complete=False,
                    progress=progress,
                    questions_answered=len(demographics),
                    total_questions=AssessmentConfig.ESTIMATED_TOTAL_QUESTIONS,
                    can_go_back=len(answer_history) > 0,
                )

            # Demographics complete - check if we already have personality questions
            if responses or pending_questions:
                # User went back through demographics - don't regenerate
                logger.debug("Demographics re-completed, personality questions exist")

        else:
            # Personality question - must be numeric
            try:
                response_value = ensure_numeric_response(request.response, question_id)
                responses[question_id] = response_value
                logger.debug(f"✓ Stored response: {question_id} = {response_value}")
            except ValueError as e:
                raise HTTPException(status_code=400, detail=str(e))

            # Remove from pending and add to history
            was_pending = question_id in pending_questions
            pending_questions.discard(question_id)
            logger.debug(f"✓ Removed from pending: {question_id} (was_pending={was_pending})")
            
            # STALE PENDING CLEANUP: If user answered a question that wasn't pending,
            # it means frontend state is out of sync (page refresh, browser back, etc.)
            # Clear all pending items to allow fresh question selection
            if not was_pending and pending_questions:
                stale_count = len(pending_questions)
                stale_items = list(pending_questions)
                pending_questions.clear()
                logger.warning(
                    f"Stale pending cleanup: Cleared {stale_count} items {stale_items} "
                    f"(frontend out of sync - answered {question_id} which wasn't pending)"
                )
            
            if not request.is_going_back and question_id not in answer_history:
                answer_history.append(question_id)

            # Run periodic validation
            if should_run_validation_check(len(responses)) and validator:
                validation_result = validator.validate_responses(responses)
                logger.info(
                    f"Validation check: consistency={validation_result['consistency_score']:.1f}%, "
                    f"attention={validation_result['attention_score']:.1f}%"
                )

        # Create question engine
        question_engine = QuestionEngine(tester, session["scorer"])

        # Check if we should continue testing
        should_continue, reason = question_engine.should_continue_testing(responses)
        log_adaptive_decision(len(responses), should_continue, reason)

        if not should_continue:
            # Assessment complete
            logger.info(f"Assessment complete! Total items: {len(responses)}")
            session_mgr.save_session(session_id, session)

            # Persist to database
            await update_session_from_state(service, session_id, session)

            return SubmitAnswerResponse(
                next_questions=None,
                is_complete=True,
                progress=1.0,
                questions_answered=len(demographics) + len(responses),
                total_questions=len(demographics) + len(responses),
                can_go_back=True,
            )

        # Get next questions
        next_items = question_engine.select_next_questions(
            responses=responses,
            demographics=demographics,
            pending_questions=pending_questions,
            max_items=AssessmentConfig.DEFAULT_BATCH_SIZE,
        )

        if not next_items:
            # No more questions available
            logger.info("No more questions available, completing assessment")
            session_mgr.save_session(session_id, session)
            await update_session_from_state(service, session_id, session)

            return SubmitAnswerResponse(
                next_questions=None,
                is_complete=True,
                progress=1.0,
                questions_answered=len(demographics) + len(responses),
                total_questions=len(demographics) + len(responses),
                can_go_back=True,
            )

        log_question_selection(next_items)

        # Format questions for response
        next_questions = question_engine.format_questions(next_items)

        # Mark as pending
        # Frontend appends questions to queue, so backend must track all pending items
        for q in next_questions:
            pending_questions.add(q.id)
            logger.debug(f"✓ Added to pending: {q.id}")

        # Update batch tracking
        session["current_batch"] = [q.id for q in next_questions]
        session["batch_history"].append({
            "batch": [q.id for q in next_questions],
            "timestamp": datetime.now().isoformat(),
        })

        # Calculate progress
        questions_answered = len(demographics) + len(responses)
        progress = calculate_progress(len(demographics), len(responses))

        # Save session
        session_mgr.save_session(session_id, session)
        await update_session_from_state(service, session_id, session)

        return SubmitAnswerResponse(
            next_questions=next_questions,
            is_complete=False,
            progress=progress,
            questions_answered=questions_answered,
            total_questions=AssessmentConfig.ESTIMATED_TOTAL_QUESTIONS,
            can_go_back=len(responses) > 0,
        )

    finally:
        # Always release lock, even if error occurred
        if lock_token:
            session_mgr._redis.release_lock(f"answer:{session_id}", lock_token)


@router.post("/assessment/can-go-back", response_model=GetPreviousQuestionResponse)
async def check_can_go_back(request: GetPreviousQuestionRequest):
    """
    Check if user can go back without actually going back.
    
    Users can edit their last 10 answers to prevent disrupting adaptive flow.
    """
    session_id = validate_session_id(request.session_id)
    session_mgr = get_session_manager()
    
    session = await session_mgr.get_session_with_db_fallback(session_id, raise_if_missing=False)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    answer_history: List = session.get("answer_history", [])
    
    if not answer_history:
        return GetPreviousQuestionResponse(
            question=None,
            current_answer=None,
            can_go_back=False,
            warning="No questions answered yet",
        )
    
    if len(answer_history) > AssessmentConfig.MAX_BACK_DEPTH:
        return GetPreviousQuestionResponse(
            question=None,
            current_answer=None,
            can_go_back=False,
            warning=f"You can only edit your last {AssessmentConfig.MAX_BACK_DEPTH} answers.",
        )
    
    return GetPreviousQuestionResponse(
        question=None,
        current_answer=None,
        can_go_back=True,
        warning=None,
    )


@router.post("/assessment/back", response_model=GetPreviousQuestionResponse)
async def go_back(request: GetPreviousQuestionRequest):
    """
    Go back to previous question.
    
    Allows users to review and edit their most recent answer (up to last 10).
    """
    session_id = validate_session_id(request.session_id)
    session_mgr = get_session_manager()
    
    session = await session_mgr.get_session_with_db_fallback(session_id, raise_if_missing=False)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    responses: Dict = session["responses"]
    demographics: Dict = session["demographics"]
    answer_history: List = session.get("answer_history", [])
    
    if not answer_history:
        return GetPreviousQuestionResponse(
            question=None,
            current_answer=None,
            can_go_back=False,
            warning="No questions answered yet",
        )
    
    if len(answer_history) > AssessmentConfig.MAX_BACK_DEPTH:
        return GetPreviousQuestionResponse(
            question=None,
            current_answer=None,
            can_go_back=False,
            warning=f"You can only edit your last {AssessmentConfig.MAX_BACK_DEPTH} answers.",
        )
    
    # Get last question
    last_question_id = answer_history[-1]
    is_demographic = last_question_id.startswith("demo_")
    
    # Get current answer
    current_answer = demographics.get(last_question_id) if is_demographic else responses.get(last_question_id)
    
    # Remove from history (will be re-added on submit)
    answer_history.pop()
    
    # Get question details
    question_engine = QuestionEngine(session["tester"], session["scorer"])
    question = question_engine.get_question_for_back_navigation(last_question_id)
    
    # Save session
    session_mgr.save_session(session_id, session)
    
    logger.info(f"Back navigation to question {last_question_id}")
    
    return GetPreviousQuestionResponse(
        question=question,
        current_answer=current_answer,
        can_go_back=len(answer_history) > 0,
        warning="Changing previous answers may affect your results accuracy.",
    )


# ============================================================================
# Results
# ============================================================================

@router.get("/assessment/{session_id}/results", response_model=GetResultsResponse)
async def get_results(
    session_id: str,
    service: AssessmentService = Depends(get_assessment_service),
):
    """
    Get complete assessment results with narrative.
    
    Results are cached in database:
    - First request: Generates narrative with OpenAI (~$0.002) → Saves to database
    - Subsequent requests: Fetches from database (FREE, instant!)
    
    Uses distributed lock to prevent duplicate OpenAI calls on concurrent requests.
    """
    session_id = validate_session_id(session_id)
    session_mgr = get_session_manager()
    
    # Check for existing results first (cache hit)
    existing_result = await service.get_result(session_id)
    
    if existing_result:
        logger.info(f"Returning cached results for session {session_id[:8]}...")
        
        db_session = await service.get_session(session_id)
        demographics = db_session.demographics if db_session else {}
        
        validation_data = None
        if existing_result.consistencyScore is not None:
            validation_data = ValidationResult(
                consistency_score=existing_result.consistencyScore,
                attention_score=existing_result.attentionScore or 0,
                flags=existing_result.validationFlags or [],
            )
        
        return GetResultsResponse(
            session_id=session_id,
            scores={
                "LUMEN": existing_result.scoreLumen,
                "AETHER": existing_result.scoreAether,
                "ORPHEUS": existing_result.scoreOrpheus,
                "ORIN": existing_result.scoreOrin,
                "LYRA": existing_result.scoreLyra,
                "VARA": existing_result.scoreVara,
                "CHRONOS": existing_result.scoreChronos,
                "KAEL": existing_result.scoreKael,
            },
            narrative=existing_result.narrative,
            completed_at=existing_result.createdAt.isoformat(),
            demographics=demographics,
            validation=validation_data,
        )
    
    # No cached results - need to generate
    # Acquire distributed lock to prevent duplicate generation
    lock_token = None
    try:
        lock_token = session_mgr.acquire_results_lock(session_id)
        
        # Double-check after acquiring lock (another request may have completed)
        existing_result = await service.get_result(session_id)
        if existing_result:
            return await get_results(session_id, service)  # Recursive call will hit cache
        
        # Get session
        session = await session_mgr.get_session_with_db_fallback(session_id, raise_if_missing=False)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        responses = session["responses"]
        demographics = session.get("demographics", {})
        scorer: SelveScorer = session["scorer"]
        validator = session.get("validator")
        
        # Check minimum coverage
        question_engine = QuestionEngine(session["tester"], scorer)
        is_valid, incomplete_dims = question_engine.check_minimum_coverage(responses)
        
        if not is_valid and len(responses) < AssessmentConfig.QUICK_SCREEN_ITEMS:
            raise HTTPException(
                status_code=400,
                detail=f"Assessment incomplete. Need more responses for: {', '.join(incomplete_dims)}",
            )
        
        # Score responses
        profile = scorer.score_responses(responses)
        
        # Get validation results
        validation_result = None
        if validator:
            validation_result = validator.validate_responses(responses)
        
        # Generate narrative (using async for parallel OpenAI calls - ~3-4x faster)
        int_scores = {dim: int(score) for dim, score in profile.dimension_scores.items()}
        
        try:
            integrated_narrative = await generate_integrated_narrative_async(int_scores, use_llm=True)
            
            narrative_dict = {
                'profile_pattern': integrated_narrative['profile_pattern'],
                'sections': integrated_narrative['sections'],
                'scores': integrated_narrative['scores'],
                'generation_cost': integrated_narrative.get('generation_cost', 0.0),
                'metadata': integrated_narrative.get('metadata', {}),
            }
            
            logger.info(
                f"Generated narrative with OpenAI. "
                f"Cost: ${integrated_narrative.get('generation_cost', 0):.4f}"
            )
            
        except Exception as e:
            logger.warning(f"OpenAI narrative failed, using fallback: {e}")
            
            narrative = generate_narrative(profile.dimension_scores)
            narrative_dict = build_fallback_narrative(profile, narrative)
        
        # Personalize with name
        narrative_dict = personalize_narrative(narrative_dict, demographics)
        
        # Mark session complete
        session["completed_at"] = datetime.now().isoformat()
        
        # Extract archetype info
        archetype_name = None
        profile_pattern = None
        if 'sections' in narrative_dict and 'archetype' in narrative_dict['sections']:
            archetype_name = narrative_dict['sections']['archetype'].get('name')
        if 'profile_pattern' in narrative_dict:
            profile_pattern = narrative_dict['profile_pattern'].get('pattern')
        
        # Save to database
        await service.save_result(
            session_id=session_id,
            scores=profile.dimension_scores,
            narrative=narrative_dict,
            archetype=archetype_name,
            profile_pattern=profile_pattern,
            consistency_score=validation_result.get('consistency_score') if validation_result else None,
            attention_score=validation_result.get('attention_score') if validation_result else None,
            validation_flags=validation_result.get('flags', []) if validation_result else None,
            generation_cost=narrative_dict.get('generation_cost', 0.0),
            generation_model=narrative_dict.get('metadata', {}).get('model'),
        )
        
        logger.info(f"Results saved to database for session {session_id[:8]}...")
        
        # Build validation response
        validation_data = None
        if validation_result:
            back_count = session.get("back_navigation_count", 0)
            validation_data = ValidationResult(
                consistency_score=validation_result["consistency_score"],
                attention_score=validation_result["attention_score"],
                flags=validation_result["flags"],
                consistency_report=validator.get_consistency_report(responses) if validator else None,
                back_navigation_count=back_count,
                back_navigation_analysis=analyze_back_navigation(back_count),
            )
        
        return GetResultsResponse(
            session_id=session_id,
            scores=profile.dimension_scores,
            narrative=narrative_dict,
            completed_at=session["completed_at"],
            demographics=demographics,
            validation=validation_data,
        )
        
    finally:
        if lock_token:
            session_mgr.release_results_lock(session_id, lock_token)


@router.get("/assessment/{session_id}/results/status")
async def get_results_status(
    session_id: str,
    service: AssessmentService = Depends(get_assessment_service),
):
    """
    Check if assessment results are ready.

    Returns:
        - status: "generating" | "ready" | "error" | "not_found" | "pending"
        - progress: Optional progress percentage
        - estimated_time: Seconds remaining
    """
    session_id = validate_session_id(session_id)
    session_mgr = get_session_manager()

    # Check if results exist in database (cache hit)
    existing_result = await service.get_result(session_id)
    if existing_result:
        return {
            "status": "ready",
            "session_id": session_id,
            "completed_at": existing_result.createdAt.isoformat(),
        }

    # Check if generation is in progress (lock exists)
    lock_name = f"results:{session_id}"
    is_generating = session_mgr._redis.is_locked(lock_name)

    if is_generating:
        return {
            "status": "generating",
            "session_id": session_id,
            "estimated_time": 180,  # Max timeout
            "message": "Generating your personality narrative. This may take up to 3 minutes.",
        }

    # Check if session exists
    session = await session_mgr.get_session_with_db_fallback(
        session_id, raise_if_missing=False
    )

    if not session:
        return {
            "status": "not_found",
            "session_id": session_id,
            "error_message": "Session not found or expired",
        }

    # Session exists but results not ready
    return {
        "status": "pending",
        "session_id": session_id,
        "message": "Assessment incomplete or results not yet generated",
    }


@router.get("/assessment/{session_id}/progress")
async def get_progress(session_id: str):
    """Get current assessment progress."""
    session_id = validate_session_id(session_id)
    session_mgr = get_session_manager()
    
    session = await session_mgr.get_session_with_db_fallback(session_id, raise_if_missing=False)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    responses = session["responses"]
    tester = session["tester"]
    
    should_continue, reason = tester.should_continue_testing(responses)
    dimension_counts = get_dimension_counts(responses, session["scorer"])
    
    return {
        "session_id": session_id,
        "questions_answered": len(responses),
        "is_complete": not should_continue,
        "completion_reason": reason if not should_continue else None,
        "dimension_progress": dimension_counts,
        "started_at": session["started_at"],
    }


# ============================================================================
# Session Management
# ============================================================================

@router.get("/assessment/session/{session_id}")
async def get_session_state(
    session_id: str,
    service: AssessmentService = Depends(get_assessment_service),
):
    """Get current session state for recovery/resumption."""
    session_id = validate_session_id(session_id)
    
    db_session = await service.get_session(session_id)
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    responses = db_session.responses or {}
    demographics = db_session.demographics or {}
    questions_answered = len(demographics) + len(responses)
    progress = calculate_progress(len(demographics), len(responses))
    
    # Restore to memory if needed
    session_mgr = get_session_manager()
    session = await session_mgr.get_session_with_db_fallback(session_id, raise_if_missing=False)
    
    # Get pending questions
    pending_questions_details = []
    if session:
        pending_set = session.get("pending_questions", set())
        if pending_set:
            question_engine = QuestionEngine(session["tester"], session["scorer"])
            for q_id in pending_set:
                q = question_engine.get_question_for_back_navigation(q_id)
                if q:
                    pending_questions_details.append(q)
    
    return {
        "session_id": session_id,
        "status": db_session.status,
        "progress": progress,
        "questions_answered": questions_answered,
        "total_questions": AssessmentConfig.ESTIMATED_TOTAL_QUESTIONS,
        "can_resume": db_session.status == "in-progress",
        "created_at": db_session.createdAt.isoformat(),
        "updated_at": db_session.updatedAt.isoformat() if db_session.updatedAt else None,
        "completed_at": db_session.completedAt.isoformat() if db_session.completedAt else None,
        "responses": responses,
        "demographics": demographics,
        "clerk_user_id": db_session.clerkUserId,
        "pending_questions": pending_questions_details,
    }


@router.post("/assessment/transfer-session")
async def transfer_session(
    request: TransferSessionRequest,
    user: dict = Depends(get_required_user),
    service: AssessmentService = Depends(get_assessment_service),
):
    """Transfer anonymous session to authenticated user."""
    session_id = validate_session_id(request.session_id)
    clerk_user_id = get_clerk_user_id(user)
    
    if not clerk_user_id:
        raise HTTPException(status_code=401, detail="Authentication required")
    
    try:
        db_session = await service.transfer_session_to_user(
            session_id=session_id,
            clerk_user_id=clerk_user_id,
        )
        
        if db_session:
            # Update memory cache
            session_mgr = get_session_manager()
            session = session_mgr.get_session(session_id, raise_if_missing=False)
            if session:
                session["user_id"] = clerk_user_id
                session["clerk_user"] = user
                session_mgr.save_session(session_id, session)
            
            logger.info(f"Session {session_id[:8]}... transferred to user {clerk_user_id}")
            
            return {
                "success": True,
                "message": "Session transferred successfully",
                "session_id": session_id,
                "user_id": clerk_user_id,
            }
            
    except ValueError as e:
        raise HTTPException(status_code=403, detail=str(e))
    
    # Session not found - create new one
    logger.warning(f"Session {session_id[:8]}... not found, creating new")
    
    new_session = await service.create_session(clerk_user_id=clerk_user_id)
    
    return {
        "success": True,
        "message": "New session created (previous not found)",
        "session_id": new_session.id,
        "user_id": clerk_user_id,
    }


@router.delete("/assessment/{session_id}")
async def delete_session(
    session_id: str,
    service: AssessmentService = Depends(get_assessment_service),
):
    """Delete assessment session."""
    session_id = validate_session_id(session_id)
    
    deleted = await service.delete_session(session_id)
    
    # Remove from memory
    session_mgr = get_session_manager()
    session_mgr.delete_session(session_id)
    
    if not deleted:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return {"message": "Session deleted"}


# ============================================================================
# Assessment History & Archiving
# ============================================================================

@router.post("/assessment/archive-and-restart")
async def archive_and_restart_assessment(
    clerk_user_id: Optional[str] = None,
    service: AssessmentService = Depends(get_assessment_service),
):
    """Archive user's current assessment(s) and create a new one."""
    clerk_user_id = validate_clerk_user_id(clerk_user_id)
    
    try:
        # Count current sessions
        current_count = await prisma.assessmentsession.count(
            where={"clerkUserId": clerk_user_id, "isCurrent": True}
        )
        
        # Archive and create new
        new_session = await service.archive_current_and_create_new(
            clerk_user_id=clerk_user_id
        )
        
        return {
            "new_session_id": new_session.id,
            "archived_count": current_count or 0,
            "message": f"Archived {current_count or 0} assessment(s) and created new session",
            "created_at": new_session.createdAt.isoformat(),
        }
        
    except Exception as e:
        logger.error(f"Failed to archive and restart: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to archive and restart")


@router.get("/assessment/history/{clerk_user_id}")
async def get_assessment_history(
    clerk_user_id: str,
    include_current: bool = True,
    limit: int = 10,
    service: AssessmentService = Depends(get_assessment_service),
):
    """Get user's assessment history."""
    clerk_user_id = validate_clerk_user_id(clerk_user_id)
    
    try:
        sessions = await service.get_assessment_history(
            clerk_user_id=clerk_user_id,
            include_current=include_current,
            limit=limit,
        )
        
        return {
            "total": len(sessions),
            "assessments": [
                {
                    "session_id": s.id,
                    "status": s.status,
                    "is_current": s.isCurrent,
                    "created_at": s.createdAt.isoformat(),
                    "completed_at": s.completedAt.isoformat() if s.completedAt else None,
                    "archived_at": s.archivedAt.isoformat() if s.archivedAt else None,
                    "questions_answered": len(s.responses or {}) + len(s.demographics or {}),
                }
                for s in sessions
            ]
        }
        
    except Exception as e:
        logger.error(f"Failed to fetch history: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to fetch history")


@router.get("/assessment/current/{clerk_user_id}")
async def get_current_assessment(
    clerk_user_id: str,
    service: AssessmentService = Depends(get_assessment_service),
):
    """Get user's current (active) assessment."""
    clerk_user_id = validate_clerk_user_id(clerk_user_id)
    
    try:
        session = await service.get_current_session(clerk_user_id)
        
        if not session:
            return {"current_assessment": None}
        
        questions_answered = len(session.responses or {}) + len(session.demographics or {})
        
        # Treat empty sessions as no session
        if questions_answered == 0:
            return {"current_assessment": None}
        
        return {
            "current_assessment": {
                "session_id": session.id,
                "status": session.status,
                "created_at": session.createdAt.isoformat(),
                "completed_at": session.completedAt.isoformat() if session.completedAt else None,
                "questions_answered": questions_answered,
                "progress": calculate_progress(
                    len(session.demographics or {}),
                    len(session.responses or {}),
                ),
                "responses": session.responses or {},
                "demographics": session.demographics or {},
            }
        }
        
    except Exception as e:
        logger.error(f"Failed to fetch current assessment: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to fetch current assessment")


@router.get("/assessment/current-result/{clerk_user_id}")
async def get_current_result(
    clerk_user_id: str,
    service: AssessmentService = Depends(get_assessment_service),
):
    """Get user's current (latest) assessment result."""
    clerk_user_id = validate_clerk_user_id(clerk_user_id)
    
    try:
        result = await service.get_current_result(clerk_user_id)
        
        if not result:
            return {"current_result": None}
        
        return {
            "current_result": {
                "session_id": result.sessionId,
                "scores": {
                    "LUMEN": result.scoreLumen,
                    "AETHER": result.scoreAether,
                    "ORPHEUS": result.scoreOrpheus,
                    "ORIN": result.scoreOrin,
                    "LYRA": result.scoreLyra,
                    "VARA": result.scoreVara,
                    "CHRONOS": result.scoreChronos,
                    "KAEL": result.scoreKael,
                },
                "archetype": result.archetype,
                "profile_pattern": result.profilePattern,
                "created_at": result.createdAt.isoformat(),
                "consistency_score": result.consistencyScore,
                "attention_score": result.attentionScore,
            }
        }
        
    except Exception as e:
        logger.error(f"Failed to fetch current result: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to fetch current result")


# ============================================================================
# Sharing
# ============================================================================

@router.get("/assessment/{session_id}/results/check-access")
async def check_results_access(
    session_id: str,
    clerk_user_id: Optional[str] = None,
    service: AssessmentService = Depends(get_assessment_service),
):
    """Check if a user has access to view results."""
    session_id = validate_session_id(session_id)
    
    result = await service.get_result(session_id)
    if not result:
        raise HTTPException(status_code=404, detail="Results not found")
    
    db_session = await service.get_session(session_id)
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    is_owner = clerk_user_id and db_session.clerkUserId == clerk_user_id
    is_public = result.isPublic
    
    return {
        "hasAccess": is_owner or is_public,
        "isOwner": is_owner,
        "isPublic": is_public,
        "publicShareId": result.publicShareId if is_public else None,
    }


@router.post("/assessment/{session_id}/share")
async def create_share_link(
    session_id: str,
    clerk_user_id: str,
    service: AssessmentService = Depends(get_assessment_service),
):
    """Generate a public share link for assessment results."""
    session_id = validate_session_id(session_id)
    clerk_user_id = validate_clerk_user_id(clerk_user_id)
    
    # Verify ownership
    db_session = await service.get_session(session_id)
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    if db_session.clerkUserId != clerk_user_id:
        raise HTTPException(status_code=403, detail="You can only share your own results")
    
    result = await service.get_result(session_id)
    if not result:
        raise HTTPException(status_code=404, detail="Results not found")
    
    # Return existing share link if available
    if result.publicShareId:
        return {
            "shareId": result.publicShareId,
            "shareUrl": build_share_url(result.publicShareId),
            "isNew": False,
        }
    
    # Generate new share ID
    share_id = generate_share_id()
    
    await prisma.assessmentresult.update(
        where={"id": result.id},
        data={
            "isPublic": True,
            "publicShareId": share_id,
            "sharedAt": datetime.utcnow(),
        }
    )
    
    return {
        "shareId": share_id,
        "shareUrl": build_share_url(share_id),
        "isNew": True,
    }


@router.delete("/assessment/{session_id}/share")
async def revoke_share_link(
    session_id: str,
    clerk_user_id: str,
    service: AssessmentService = Depends(get_assessment_service),
):
    """Revoke public sharing for assessment results."""
    session_id = validate_session_id(session_id)
    clerk_user_id = validate_clerk_user_id(clerk_user_id)
    
    db_session = await service.get_session(session_id)
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    if db_session.clerkUserId != clerk_user_id:
        raise HTTPException(status_code=403, detail="You can only manage your own results")
    
    result = await service.get_result(session_id)
    if not result:
        raise HTTPException(status_code=404, detail="Results not found")
    
    await prisma.assessmentresult.update(
        where={"id": result.id},
        data={"isPublic": False}
    )
    
    return {"success": True, "message": "Share link revoked"}


@router.get("/share/{share_id}/results")
async def get_shared_results(
    share_id: str,
    service: AssessmentService = Depends(get_assessment_service),
):
    """Get publicly shared assessment results."""
    result = await prisma.assessmentresult.find_first(
        where={"publicShareId": share_id, "isPublic": True}
    )
    
    if not result:
        raise HTTPException(
            status_code=404,
            detail="Shared results not found or sharing has been disabled",
        )
    
    db_session = await service.get_session(result.sessionId)
    demographics = db_session.demographics if db_session else {}
    
    # Sanitize demographics for public view
    safe_demographics = sanitize_demographics_for_sharing(demographics)
    
    return {
        "session_id": result.sessionId,
        "scores": {
            "LUMEN": result.scoreLumen,
            "AETHER": result.scoreAether,
            "ORPHEUS": result.scoreOrpheus,
            "ORIN": result.scoreOrin,
            "LYRA": result.scoreLyra,
            "VARA": result.scoreVara,
            "CHRONOS": result.scoreChronos,
            "KAEL": result.scoreKael,
        },
        "narrative": result.narrative,
        "completed_at": result.createdAt.isoformat(),
        "demographics": safe_demographics,
        "profile_pattern": result.profilePattern,
        "archetype": result.archetype,
        "is_shared": True,
    }


@router.post("/assessment/{session_id}/share/toggle")
async def toggle_share(
    session_id: str,
    clerk_user_id: str,
    enable: bool,
    service: AssessmentService = Depends(get_assessment_service),
):
    """Toggle sharing on/off without regenerating share ID."""
    session_id = validate_session_id(session_id)
    clerk_user_id = validate_clerk_user_id(clerk_user_id)
    
    db_session = await service.get_session(session_id)
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    if db_session.clerkUserId != clerk_user_id:
        raise HTTPException(status_code=403, detail="You can only manage your own results")
    
    result = await service.get_result(session_id)
    if not result:
        raise HTTPException(status_code=404, detail="Results not found")
    
    # Create share ID if enabling and none exists
    if enable and not result.publicShareId:
        share_id = generate_share_id()
        await prisma.assessmentresult.update(
            where={"id": result.id},
            data={
                "isPublic": True,
                "publicShareId": share_id,
                "sharedAt": datetime.utcnow(),
            }
        )
        return {"isPublic": True, "shareId": share_id}
    
    # Toggle existing
    await prisma.assessmentresult.update(
        where={"id": result.id},
        data={"isPublic": enable}
    )
    
    return {
        "isPublic": enable,
        "shareId": result.publicShareId if enable else None,
    }


# ============================================================================
# Friend Insights
# ============================================================================

@router.get("/assessment/{session_id}/friend-insights")
async def get_friend_insights(
    session_id: str,
    service: AssessmentService = Depends(get_assessment_service),
):
    """Get friend insights for a completed assessment session."""
    import json
    from app.services.friend_insights_service import FriendInsightsService, get_fallback_message
    
    session_id = validate_session_id(session_id)
    
    try:
        session = await prisma.assessmentsession.find_unique(where={"id": session_id})
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Get user record
        user = None
        if session.clerkUserId:
            user = await prisma.user.find_unique(where={"clerkId": session.clerkUserId})
        
        if not user:
            return {
                "friendResponses": [],
                "aggregatedScores": {},
                "narrativeSummary": None,
                "narrativeGeneratedAt": None,
                "narrativeFriendCount": 0,
                "narrativeError": None,
                "lastRegeneration": None,
            }
        
        # Get friend responses
        invites = await prisma.invitelink.find_many(
            where={"inviterId": user.id},
            include={"friendResponse": True},
        )
        
        friend_responses = []
        friend_response_ids = []
        
        for invite in invites:
            if invite.friendResponse:
                friend_responses.append({
                    "id": invite.friendResponse.id,
                    "inviteId": invite.friendResponse.inviteId,
                    "responses": invite.friendResponse.responses,
                    "qualityScore": invite.friendResponse.qualityScore,
                    "totalTime": invite.friendResponse.totalTime,
                    "completedAt": invite.friendResponse.completedAt.isoformat(),
                })
                friend_response_ids.append(invite.friendResponse.id)
        
        # Calculate aggregated scores
        aggregated_scores = {}
        if friend_responses:
            aggregated_scores = _calculate_aggregated_scores(friend_responses)
        
        # Get last result
        last_result = await prisma.assessmentresult.find_first(
            where={"sessionId": session_id},
            order={"createdAt": "desc"},
        )
        
        # Generate narrative if we have friend data
        narrative_summary = None
        narrative_generated_at = None
        narrative_friend_count = 0
        narrative_error = None
        
        if friend_responses and aggregated_scores and last_result:
            self_scores = {
                "LUMEN": last_result.scoreLumen,
                "AETHER": last_result.scoreAether,
                "ORPHEUS": last_result.scoreOrpheus,
                "ORIN": last_result.scoreOrin,
                "LYRA": last_result.scoreLyra,
                "VARA": last_result.scoreVara,
                "CHRONOS": last_result.scoreChronos,
                "KAEL": last_result.scoreKael,
            }
            
            try:
                insights_service = FriendInsightsService(prisma)
                result = await insights_service.get_or_generate_narrative(
                    session_id=session_id,
                    self_scores=self_scores,
                    friend_scores=aggregated_scores,
                    friend_response_ids=friend_response_ids,
                )
                
                narrative_summary = result.get("narrative")
                narrative_generated_at = result.get("generatedAt")
                narrative_friend_count = result.get("friendCount", len(friend_responses))
                
                if result.get("hasError"):
                    narrative_error = get_fallback_message("error")
                    
            except Exception as e:
                logger.warning(f"Failed to generate friend insights: {e}")
                narrative_error = get_fallback_message("error")
        
        return {
            "friendResponses": friend_responses,
            "aggregatedScores": aggregated_scores,
            "narrativeSummary": narrative_summary,
            "narrativeGeneratedAt": narrative_generated_at,
            "narrativeFriendCount": narrative_friend_count,
            "narrativeError": narrative_error,
            "lastRegeneration": last_result.createdAt.isoformat() if last_result else None,
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to fetch friend insights: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to fetch friend insights")


def _calculate_aggregated_scores(friend_responses: List[Dict]) -> Dict[str, float]:
    """Calculate aggregated scores from friend responses."""
    dimension_scores = {}
    dimension_counts = {}
    
    for response in friend_responses:
        quality_weight = 1.0
        quality = response.get("qualityScore", 50)
        
        if quality >= 70:
            quality_weight = 1.0
        elif quality >= 50:
            quality_weight = 0.5
        else:
            quality_weight = 0.1
        
        responses_list = response.get("responses", [])
        
        if isinstance(responses_list, list):
            for item in responses_list:
                item_id = item.get("item_id", "")
                value = item.get("value")
                
                if isinstance(value, (int, float)):
                    # Extract dimension from item_id
                    dim = item_id.split("_")[0].upper() if "_" in item_id else None
                    
                    if dim and dim in DIMENSIONS:
                        if dim not in dimension_scores:
                            dimension_scores[dim] = 0
                            dimension_counts[dim] = 0
                        
                        # Convert 1-5 to 0-100
                        normalized = ((value - 1) / 4) * 100
                        dimension_scores[dim] += normalized * quality_weight
                        dimension_counts[dim] += quality_weight
    
    # Calculate averages
    aggregated = {}
    for dim in dimension_scores:
        if dimension_counts[dim] > 0:
            aggregated[dim] = dimension_scores[dim] / dimension_counts[dim]
    
    return aggregated
