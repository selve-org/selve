"""
Assessment API Routes

Handles the complete assessment flow:
1. Start assessment
2. Get adaptive questions
3. Submit answers
4. Generate narrative results
"""

import os
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Any
from datetime import datetime

# Load environment variables for OpenAI
load_dotenv()

from app.adaptive_testing import AdaptiveTester
from app.scoring import SelveScorer
from app.narratives import generate_narrative
from app.narratives.integrated_generator import generate_integrated_narrative
from app.response_validator import ResponseValidator
from app.auth import get_current_user
from app.services.assessment_service import AssessmentService, session_to_state_dict, update_session_from_state
from app.services.redis_service import get_redis_session_store
from app.db import prisma

router = APIRouter()

# Redis session store (replaces in-memory dict to fix race conditions)
redis_store = get_redis_session_store()

# DEPRECATED: Legacy in-memory sessions dict (kept for backward compatibility during migration)
# TODO: Remove this once all code is migrated to use redis_store directly
sessions: Dict[str, Dict] = {}


# ============================================================================
# Session Storage Helper Functions
# ============================================================================

def serialize_session_for_redis(session: Dict) -> Dict:
    """
    Extract serializable data from session dict (exclude tester/scorer/validator objects)

    Args:
        session: Full session dict with objects

    Returns:
        Serializable dict for Redis storage
    """
    # Convert set to list for JSON serialization
    pending_questions = session.get("pending_questions", set())
    if isinstance(pending_questions, set):
        pending_questions = list(pending_questions)

    return {
        "responses": session.get("responses", {}),
        "demographics": session.get("demographics", {}),
        "pending_questions": pending_questions,
        "current_batch": session.get("current_batch", []),
        "batch_history": session.get("batch_history", []),
        "answer_history": session.get("answer_history", []),
        "back_navigation_count": session.get("back_navigation_count", 0),
        "back_navigation_log": session.get("back_navigation_log", []),
        "started_at": session.get("started_at"),
        "user_id": session.get("user_id"),
        "clerk_user": session.get("clerk_user"),  # May be None for anonymous
        "metadata": session.get("metadata", {}),
        "db_session_id": session.get("db_session_id"),
    }


def deserialize_session_from_redis(redis_data: Dict) -> Dict:
    """
    Reconstruct full session dict from Redis data (recreate tester/scorer/validator)

    Args:
        redis_data: Serialized data from Redis

    Returns:
        Full session dict with helper objects
    """
    # Convert list back to set
    pending_questions = redis_data.get("pending_questions", [])
    if isinstance(pending_questions, list):
        pending_questions = set(pending_questions)

    return {
        "tester": AdaptiveTester(),  # Recreate stateless helper
        "scorer": SelveScorer(),  # Recreate stateless helper
        "validator": ResponseValidator(),  # Recreate stateless helper
        "responses": redis_data.get("responses", {}),
        "demographics": redis_data.get("demographics", {}),
        "pending_questions": pending_questions,
        "current_batch": redis_data.get("current_batch", []),
        "batch_history": redis_data.get("batch_history", []),
        "answer_history": redis_data.get("answer_history", []),
        "back_navigation_count": redis_data.get("back_navigation_count", 0),
        "back_navigation_log": redis_data.get("back_navigation_log", []),
        "started_at": redis_data.get("started_at"),
        "user_id": redis_data.get("user_id"),
        "clerk_user": redis_data.get("clerk_user"),
        "metadata": redis_data.get("metadata", {}),
        "db_session_id": redis_data.get("db_session_id"),
    }


def get_session_from_storage(session_id: str) -> Optional[Dict]:
    """
    Get session from Redis (or fallback to database)

    Args:
        session_id: Session ID

    Returns:
        Full session dict with helper objects, or None if not found
    """
    # Try Redis first
    redis_data = redis_store.get_session(session_id)
    if redis_data:
        return deserialize_session_from_redis(redis_data)

    # Fallback to database (for backward compatibility)
    return None  # Will be handled by calling code


def save_session_to_storage(session_id: str, session: Dict) -> bool:
    """
    Save session to Redis

    Args:
        session_id: Session ID
        session: Full session dict

    Returns:
        True if saved successfully
    """
    serialized = serialize_session_for_redis(session)
    return redis_store.set_session(session_id, serialized)


# ============================================================================
# Dual-Write Wrapper Functions (PHASE 1: Migration Safety Layer)
# ============================================================================

def _get_session_dual_write(session_id: str) -> Optional[Dict]:
    """
    Get session from memory first, fall back to Redis.
    DUAL-WRITE PHASE: Memory is source of truth during migration.

    Args:
        session_id: Session ID

    Returns:
        Full session dict with helper objects, or None if not found
    """
    # Try memory first (faster, current source of truth)
    if session_id in sessions:
        session = sessions[session_id]
        # Ensure it's also in Redis (sync if missing)
        if not redis_store.session_exists(session_id):
            save_session_to_storage(session_id, session)
        return session

    # Try Redis next (fallback after restart or memory eviction)
    redis_session = get_session_from_storage(session_id)
    if redis_session:
        # Restore to memory for backward compatibility
        sessions[session_id] = redis_session
        return redis_session

    return None


def _save_session_dual_write(session_id: str, session: Dict) -> bool:
    """
    Save to both memory and Redis during dual-write phase.

    Args:
        session_id: Session ID
        session: Full session dict

    Returns:
        True if saved to both stores successfully
    """
    # Write to memory first (ensures immediate availability)
    sessions[session_id] = session

    # Write to Redis (ensures persistence and race condition safety)
    redis_success = save_session_to_storage(session_id, session)

    # Extend TTL on update
    if redis_success:
        redis_store.extend_session_ttl(session_id)

    return redis_success


def _delete_session_dual_write(session_id: str) -> bool:
    """
    Delete from both memory and Redis.

    Args:
        session_id: Session ID

    Returns:
        True if deleted successfully
    """
    # Delete from memory
    if session_id in sessions:
        del sessions[session_id]

    # Delete from Redis
    redis_store.delete_session(session_id)

    return True


# ============================================================================
# Helper Functions
# ============================================================================

def get_question_type_and_config(item_code: str) -> tuple[str, Dict]:
    """
    Generate question type and renderConfig based on item code's scale range.
    
    Big Five items (E, N, A, C, O + digit): 1-5 scale (horizontal slider)
    16PF Dominance items (D + digit): 1-5 scale (horizontal slider)
    HEXACO items (all others): 1-7 scale (vertical radio buttons for better UI)
    
    Returns:
        (question_type, renderConfig) tuple
    """
    # 16PF Dominance items (D): 1-5 scale - horizontal slider
    if item_code.startswith('D') and item_code[1:].isdigit():
        return ("scale-slider", {
            "min": 1,
            "max": 5,
            "step": 1,
            "labels": {
                1: "Strongly Disagree",
                2: "Disagree",
                3: "Neutral",
                4: "Agree",
                5: "Strongly Agree"
            }
        })
    # Big Five items (E, N, A, C, O - single letter + digit): 1-5 scale - horizontal slider
    elif len(item_code) >= 2 and item_code[0] in ['E', 'N', 'A', 'C', 'O'] and item_code[1:].isdigit():
        return ("scale-slider", {
            "min": 1,
            "max": 5,
            "step": 1,
            "labels": {
                1: "Strongly Disagree",
                2: "Disagree",
                3: "Neutral",
                4: "Agree",
                5: "Strongly Agree"
            }
        })
    # HEXACO items: 1-7 scale - vertical radio buttons (better for 7 options)
    else:
        return ("radio", {
            "options": [
                {"value": 1, "label": "That is definitely NOT me!"},
                {"value": 2, "label": "Disagree"},
                {"value": 3, "label": "Somewhat Disagree"},
                {"value": 4, "label": "Neutral"},
                {"value": 5, "label": "Somewhat Agree"},
                {"value": 6, "label": "Agree"},
                {"value": 7, "label": "That IS definitely me!"}
            ]
        })


# ============================================================================
# Request/Response Models
# ============================================================================

class StartAssessmentRequest(BaseModel):
    """Request to start a new assessment"""
    user_id: Optional[str] = Field(None, description="Optional user identifier")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Optional metadata")


class StartAssessmentResponse(BaseModel):
    """Response when starting assessment"""
    session_id: str
    questions: List[Dict]
    total_questions: int
    progress: float


class SubmitAnswerRequest(BaseModel):
    """Request to submit an answer"""
    session_id: str
    question_id: str
    response: Any = Field(..., description="Response value (varies by question type)")
    is_going_back: Optional[bool] = False  # Flag if user is updating after going back


class SubmitAnswerResponse(BaseModel):
    """Response after submitting answer"""
    next_questions: Optional[List[Dict]] = None
    is_complete: bool
    progress: float
    questions_answered: int
    total_questions: int
    can_go_back: Optional[bool] = True  # Whether back button should be enabled


class GetPreviousQuestionRequest(BaseModel):
    """Request to go back to previous question"""
    session_id: str


class GetPreviousQuestionResponse(BaseModel):
    """Response with previous question to review/edit"""
    question: Optional[Dict] = None
    current_answer: Any = None
    can_go_back: bool = True
    warning: Optional[str] = None


class GetResultsResponse(BaseModel):
    """Complete assessment results with narrative"""
    session_id: str
    scores: Dict[str, float]
    narrative: Dict[str, Any]
    completed_at: str
    demographics: Optional[Dict[str, Any]] = None
    validation: Optional[Dict[str, Any]] = None  # Response consistency validation


# ============================================================================
# Endpoints
# ============================================================================

@router.post("/assessment/start", response_model=StartAssessmentResponse)
async def start_assessment(
    request: StartAssessmentRequest,
    user: Optional[dict] = Depends(get_current_user)
):
    """
    Start a new adaptive assessment.
    
    Supports both authenticated and anonymous users.
    If user is authenticated, session will be linked to their Clerk ID.
    
    Returns:
    - session_id: Unique session identifier
    - questions: Initial quick screen questions (16 items)
    - total_questions: Estimated total (30-54 items including demographics)
    - progress: Initial progress (0.0)
    """
    # Get user ID from authentication or request
    user_id = None
    clerk_user_id = None
    if user:
        clerk_user_id = user.get("sub")  # Clerk user ID (e.g., "user_xxx")
        user_id = clerk_user_id
    elif request.user_id:
        user_id = request.user_id
    
    # Create database session
    service = AssessmentService()
    db_session = await service.create_session(
        user_id=user_id,
        clerk_user_id=clerk_user_id,
        metadata=request.metadata
    )
    
    session_id = db_session.id
    
    # Initialize adaptive tester
    tester = AdaptiveTester()
    
    # Get initial quick screen questions
    personality_questions = tester.get_quick_screen()
    
    # Create demographic questions (first 4 questions)
    demographic_questions = [
        {
            "id": "demo_name",
            "text": "What's your name?",
            "type": "text-input",
            "dimension": "demographics",
            "isRequired": True,
            "renderConfig": {
                "placeholder": "Enter your full name",
                "helpText": "We'll use this to personalize your results"
            }
        },
        {
            "id": "demo_dob",
            "text": "What's your date of birth?",
            "type": "date-input",
            "dimension": "demographics",
            "isRequired": True,
            "renderConfig": {
                "placeholder": "Select your birth date",
                "helpText": "Must be 13 or older to take this assessment",
                "maxDate": "today",  # Can't select future dates
                "yearRange": [1900, 2012]  # Born between 1900 and 2012 (13+ years old)
            }
        },
        {
            "id": "demo_gender",
            "text": "What's your gender?",
            "type": "pill-select",
            "dimension": "demographics",
            "isRequired": False,
            "renderConfig": {
                "options": [
                    {"label": "Male", "value": "male"},
                    {"label": "Female", "value": "female"},
                    {"label": "Non-binary", "value": "non_binary"},
                    {"label": "Prefer not to say", "value": "prefer_not_to_say"}
                ]
            }
        },
        {
            "id": "demo_country",
            "text": "Which country do you live in?",
            "type": "country-select",
            "dimension": "demographics",
            "isRequired": True,
            "renderConfig": {
                "placeholder": "Start typing your country...",
                "helpText": "This helps us provide culturally relevant questions"
            }
        },
        {
            "id": "demo_drives",
            "text": "Do you drive a car regularly?",
            "type": "radio",
            "dimension": "demographics",
            "isRequired": False,
            "renderConfig": {
                "options": [
                    {"value": "yes", "label": "Yes"},
                    {"value": "no", "label": "No"}
                ]
            }
        },
        {
            "id": "demo_credit_cards",
            "text": "Do you use credit cards?",
            "type": "radio",
            "dimension": "demographics",
            "isRequired": False,
            "renderConfig": {
                "options": [
                    {"value": "yes", "label": "Yes"},
                    {"value": "no", "label": "No"}
                ]
            }
        },
        {
            "id": "demo_has_yard",
            "text": "Do you have a yard or garden at home?",
            "type": "radio",
            "dimension": "demographics",
            "isRequired": False,
            "renderConfig": {
                "options": [
                    {"value": "yes", "label": "Yes"},
                    {"value": "no", "label": "No"}
                ]
            }
        }
    ]
    
    # Create session dict with all required fields
    session_data = {
        "tester": tester,
        "scorer": SelveScorer(),
        "validator": ResponseValidator(),
        "responses": {},
        "demographics": {},
        "pending_questions": set(),  # Track questions sent to user to avoid duplicates
        "current_batch": [],  # Current batch of questions (for back navigation)
        "batch_history": [],  # History of all batches sent
        "answer_history": [],  # Ordered list of question IDs as they were answered
        "back_navigation_count": 0,  # Track how many times user went back
        "back_navigation_log": [],  # Detailed log: [{question_id, from_value, to_value, timestamp}]
        "started_at": datetime.now().isoformat(),
        "user_id": clerk_user_id,  # Clerk ID if authenticated, None if anonymous
        "clerk_user": user,  # Store full Clerk user data if authenticated
        "metadata": request.metadata or {},
        "db_session_id": session_id,  # Link to database session
    }

    # DUAL-WRITE: Save to both memory and Redis (Phase 1: Redis migration)
    # This fixes race condition RC-1 by ensuring sessions are persisted in Redis
    _save_session_dual_write(session_id, session_data)
    
    # DON'T send personality questions initially!
    # They will be generated AFTER demographics are complete,
    # so cultural filtering can be applied from the start.
    
    return StartAssessmentResponse(
        session_id=session_id,
        questions=demographic_questions,  # Only demographics initially
        total_questions=44,  # 4 demographics + ~40 personality average
        progress=0.0,
    )


@router.post("/assessment/answer", response_model=SubmitAnswerResponse)
async def submit_answer(
    request: SubmitAnswerRequest
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
    """
    # Get session from memory first (faster)
    session = sessions.get(request.session_id)
    if not session:
        # Try to load from database if not in memory
        service = AssessmentService()
        db_session = await service.get_session(request.session_id)
        if not db_session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Reconstruct in-memory session from database
        session = session_to_state_dict(db_session)
        sessions[request.session_id] = session
    
    # Debug: Log session state at start
    pending_questions = session["pending_questions"]
    print(f"\n🔍 DEBUG - Session {request.session_id[-8:]}")
    print(f"   Question: {request.question_id}")
    print(f"   Pending count: {len(pending_questions)}")
    if "KAEL_SC1" in pending_questions:
        print(f"   ⚠️ WARNING: KAEL_SC1 (driving question) is in pending_questions!")
    
    tester: AdaptiveTester = session["tester"]
    responses: Dict = session["responses"]
    demographics: Dict = session["demographics"]
    pending_questions: set = session["pending_questions"]
    
    # Check if this is a demographic question
    if request.question_id.startswith("demo_"):
        # Store demographic info (keep full ID for consistency)
        demographics[request.question_id] = request.response
        
        # Track demographic answer in history for back navigation
        answer_history: List = session.get("answer_history", [])
        if not request.is_going_back:
            # New answer - add to history
            answer_history.append(request.question_id)
        
        # Check if ALL demographics are now complete
        all_demographics_complete = len(demographics) >= 7
        
        if not all_demographics_complete:
            # Still collecting demographics - don't send personality questions yet
            return SubmitAnswerResponse(
                next_questions=None,
                is_complete=False,
                progress=len(demographics) / 44.0,  # 7 demos out of ~44 total
                questions_answered=len(demographics),
                total_questions=44,
            )
        
        # All demographics complete! Check if this is first time or going back
        if responses or pending_questions:
            # Personality questions already exist - user is going back through demographics
            print(f"\n🔄 All demographics complete, but personality questions already exist (going back)")
            # Don't regenerate - just continue with normal flow
            skip_personality_storage = False  # Allow normal personality storage
        else:
            # First time completing demographics - generate personality questions
            print(f"\n✅ All demographics complete! Generating first personality batch...")
            # Skip the personality response storage - this is still a demographic
            # Fall through to batch generation, but DON'T store this as a personality response
            skip_personality_storage = True
    else:
        skip_personality_storage = False
    
    # Check if user is updating after going back (track this behavior)
    if request.is_going_back:
        # Track back navigation for both demographics and personality questions
        if request.question_id.startswith("demo_"):
            # Demographic question
            old_value = demographics.get(request.question_id)
        else:
            # Personality question
            old_value = responses.get(request.question_id)
        
        if old_value is not None:
            new_value = request.response
            
            session["back_navigation_count"] += 1
            session["back_navigation_log"].append({
                "question_id": request.question_id,
                "from_value": old_value,
                "to_value": new_value,
                "timestamp": datetime.now().isoformat(),
            })
            
            print(f"\n🔄 BACK NAVIGATION - User changed answer")
            print(f"   Question: {request.question_id}")
            print(f"   Old: {old_value} → New: {new_value}")
            print(f"   Total backs: {session['back_navigation_count']}")
    
    # Store personality response (skip if this was the last demographic triggering first batch)
    if not skip_personality_storage:
        # Only store personality questions in responses, not demographics
        if not request.question_id.startswith("demo_"):
            try:
                # Personality questions must be numeric (1-7 scale)
                response_value = int(request.response) if isinstance(request.response, str) else request.response
                responses[request.question_id] = response_value
            except (ValueError, TypeError):
                raise HTTPException(status_code=400, detail=f"Personality question responses must be numeric (1-7). Got: {request.response}")
            
            pending_questions.discard(request.question_id)  # Remove from pending set
            
            # Track answer order for back navigation
            answer_history: List = session.get("answer_history", [])
            if not request.is_going_back:
                # New answer - add to history
                answer_history.append(request.question_id)
            # If going back, the question is already in history, don't add again
            
            # Log adaptive decision-making
            print(f"\n{'='*70}")
            print(f"📊 ADAPTIVE TESTING - Question #{len(responses)} answered")
            print(f"{'='*70}")
        # If it's a demographic question and skip_personality_storage = False,
        # it means we're going back through demographics - they're already stored in demographics dict
    else:
        # Demographics just completed - this is the first personality batch
        print(f"\n{'='*70}")
        print(f"📊 ADAPTIVE TESTING - Starting personality questions")
        print(f"{'='*70}")
    
    # Check if we should continue testing (or start if responses empty)
    if len(responses) == 0:
        # First batch - always continue
        should_continue = True
        reason = "Starting assessment"
    else:
        should_continue, reason = tester.should_continue_testing(responses)
    
    print(f"\n🤔 Decision: {'CONTINUE' if should_continue else 'STOP'}")
    print(f"   Reason: {reason}")
    
    # Log dimension uncertainties
    if should_continue:
        dimensions = ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']
        print(f"\n📈 Dimension Analysis:")
        for dim in dimensions:
            uncertainty = tester.calculate_dimension_uncertainty(responses, dim)
            status = "🔴 NEEDS MORE" if uncertainty.needs_more_items else "✅ CONFIDENT"
            print(f"   {status} {dim:8s} | Uncertainty: {uncertainty.uncertainty_score:.2f} | Items: {uncertainty.n_items_answered} | Recommended: +{uncertainty.recommended_additional_items}")
    
    # CRITICAL: Override stop decision if any dimension has 0 items
    # This prevents completing with dimensions that have no data (would show 0/100)
    if not should_continue:
        dimensions_with_zero = []
        for dim in ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']:
            dim_items = [code for code in responses.keys() if any(
                item['item'] == code for item in tester.scorer.get_items_by_dimension(dim)
            )]
            if len(dim_items) == 0:
                dimensions_with_zero.append(dim)
        
        if dimensions_with_zero:
            print(f"\n⚠️  OVERRIDE STOP: Cannot complete with 0-item dimensions!")
            print(f"   Dimensions with 0 items: {', '.join(dimensions_with_zero)}")
            print(f"   Forcing continuation to collect minimum data...")
            should_continue = True
            reason = f"0-item dimensions need data: {', '.join(dimensions_with_zero)}"
    
    if not should_continue:
        # Assessment complete
        print(f"\n✅ Assessment Complete! Total items: {len(responses)}")
        print(f"{'='*70}\n")
        return SubmitAnswerResponse(
            next_questions=None,
            is_complete=True,
            progress=1.0,
            questions_answered=len(demographics) + len(responses),
            total_questions=len(demographics) + len(responses),
        )
    
    # Get next adaptive questions (exclude already answered AND pending questions)
    all_seen_questions = set(responses.keys()) | pending_questions
    
    # OPTIMIZATION: Identify dimensions with 0 items answered
    # If any dimension has 0 items, hard-prioritize it to avoid the emergency bloat
    dimensions_with_zero = []
    for dim in ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']:
        dim_items = [code for code in responses.keys() if any(
            item['item'] == code for item in tester.scorer.get_items_by_dimension(dim)
        )]
        if len(dim_items) == 0:
            dimensions_with_zero.append(dim)
    
    # Build exclusion list based on user context
    context_exclusions = []
    
    # Debug: Log demographics
    print(f"\n🔍 Demographics for filtering: {demographics}")
    
    # Exclude driving scenarios if user doesn't drive
    if demographics.get("demo_drives") == "no":
        context_exclusions.extend([
            "LUMEN_SC2",  # "When driving, you find yourself wanting to look at..."
            "KAEL_SC1",   # "You're a daring driver who darts in and out of traffic..."
            "CHRONOS_SC2" # "You're the last one to leave an intersection..."
        ])
        print(f"   ⛔ User doesn't drive - excluding {len([x for x in context_exclusions])} driving scenarios")
    
    # Exclude credit card scenarios if user doesn't use them
    if demographics.get("demo_credit_cards") == "no":
        context_exclusions.extend([
            "AETHER_SC2",  # "You pride yourself on having a triple 'A' credit rating..."
            "AETHER_SC4"   # "You balance your checkbook to the penny..."
        ])
    
    # Exclude yard work scenarios if user doesn't have a yard
    if demographics.get("demo_has_yard") == "no":
        context_exclusions.extend([
            "LUMEN_SC3",  # "You start yard work with great enthusiasm..."
            "ORIN_SC5"    # "You can be found on your hands and knees, 'manicuring' your lawn..."
        ])
    
    # Dedupe similar questions (keep highest correlation, exclude lower ones)
    # STRATEGY: Maximum 2 similar questions per cluster for consistency checking
    # Never show 3+ identical questions - that's exhausting for users
    dedupe_rules = {
        # Anger/Irritability cluster - only allow 2 of these 3
        "APati8": ["N9"],          # "irritated easily" - keep APati8 (0.72), exclude N9 (0.64)
        "APati7": ["APati6"],      # "angry easily" vs "annoyed easily" - keep APati7 (0.73)
        
        # If both APati8 AND APati7 answered, exclude APati6 (no need for 3rd anger question)
    }
    
    # If we've used the preferred item, exclude its duplicates
    for preferred, duplicates in dedupe_rules.items():
        if preferred in responses or preferred in pending_questions:
            context_exclusions.extend(duplicates)
    
    # Smart dedupe: If 2 anger questions already answered, block the 3rd
    anger_items = ["APati7", "APati6", "APati8", "N9"]
    anger_answered = [item for item in anger_items if item in responses or item in pending_questions]
    if len(anger_answered) >= 2:
        # Already have 2 anger questions - block remaining ones
        for item in anger_items:
            if item not in anger_answered:
                context_exclusions.append(item)
    
    # Combine all exclusions
    all_exclusions = all_seen_questions | set(context_exclusions)
    
    if context_exclusions:
        print(f"\n🌍 Context-Aware Filtering:")
        print(f"   Excluded {len(context_exclusions)} culturally-irrelevant items")
        if demographics.get("demo_drives") == "no":
            print(f"   ⛔ No driving scenarios (user doesn't drive)")
        if demographics.get("demo_credit_cards") == "no":
            print(f"   ⛔ No credit card scenarios (user doesn't use them)")
        if demographics.get("demo_has_yard") == "no":
            print(f"   ⛔ No yard work scenarios (user doesn't have a yard)")
    
    # Get validator from session
    validator = session.get("validator")
    
    # Check response consistency (every 10 questions)
    if validator and len(responses) % 10 == 0 and len(responses) >= 10:
        validation_result = validator.validate_responses(responses)
        
        print(f"\n🎯 Response Validation Check:")
        print(f"   Consistency Score: {validation_result['consistency_score']:.1f}%")
        print(f"   Attention Score: {validation_result['attention_score']:.1f}%")
        
        if validation_result['flags']:
            print(f"   ⚠️  Flags: {', '.join(validation_result['flags'])}")
        
        # Show consistency details
        for check in validation_result['details']['consistency_checks']:
            status = "✅" if check['is_consistent'] else "⚠️"
            print(f"   {status} {check['concept']}: {check['consistency_pct']:.0f}% consistent")
    
    # Check if we should inject a consistency-check question
    consistency_item = None
    if validator and len(responses) >= 15:  # Only after 15+ responses
        consistency_item = validator.should_show_consistency_question(responses, pending_questions)
        if consistency_item:
            print(f"\n🔍 Injecting consistency-check question: {consistency_item}")
    
    # OPTIMIZATION: If any dimension has 0 items, hard-prioritize it
    # This prevents the emergency bloat where we queue pending items for 27 more questions
    # Instead, we aggressively pull in items from uncovered dimensions NOW
    if dimensions_with_zero:
        print(f"\n🎯 HARD-PRIORITY MODE: Uncovered dimensions detected!")
        print(f"   Dimensions with 0 items: {', '.join(dimensions_with_zero)}")
        print(f"   Will prioritize items from these dimensions...")
        
        # Build a list of items ONLY from zero-item dimensions
        # that haven't been answered or demographically excluded
        zero_dim_items = []
        demographic_exclusions = []
        if demographics.get("demo_drives") == "no":
            demographic_exclusions.extend(["LUMEN_SC2", "KAEL_SC1", "CHRONOS_SC2"])
        if demographics.get("demo_credit_cards") == "no":
            demographic_exclusions.extend(["AETHER_SC2", "AETHER_SC4"])
        if demographics.get("demo_has_yard") == "no":
            demographic_exclusions.extend(["LUMEN_SC3", "ORIN_SC5"])
        
        for dim in dimensions_with_zero:
            dim_items = tester.scorer.get_items_by_dimension(dim)
            for item in dim_items:
                if (item['item'] not in responses 
                    and item['item'] not in all_exclusions
                    and item['item'] not in demographic_exclusions):
                    zero_dim_items.append(item)
        
        # If we have items from zero dimensions, use them exclusively
        # (don't mix with normal selection)
        if zero_dim_items:
            zero_dim_items.sort(key=lambda x: x['correlation'], reverse=True)
            next_items = []
            for item in zero_dim_items[:3]:  # Take top 3 by correlation
                if 'dimension' not in item:
                    # Infer dimension from item code
                    for dim in dimensions_with_zero:
                        if any(i['item'] == item['item'] for i in tester.scorer.get_items_by_dimension(dim)):
                            item['dimension'] = dim
                            break
                next_items.append(item)
            
            print(f"   ✅ Selected {len(next_items)} items from zero-item dimensions (hard-priority)")
            # Don't use consistency check in hard-priority mode - keep focused on coverage
            consistency_item = None
        else:
            # No items available from zero dimensions (all demographically excluded)
            # Fall back to normal selection
            print(f"   ⚠️  No items available from zero-item dimensions (all excluded)")
            print(f"   Falling back to normal adaptive selection...")
            next_items = tester.select_next_items_excluding(responses, all_exclusions, max_items=3)
    else:
        # Normal path: no zero-item dimensions, proceed with adaptive selection
        next_items = tester.select_next_items_excluding(responses, all_exclusions, max_items=3)
    
    # Replace one item with consistency check if we have one (only if not in hard-priority mode)
    if consistency_item and next_items and not dimensions_with_zero:
        # Need to get the full item object for the consistency check
        # Find it in the scorer's item pool
        consistency_item_obj = None
        found_dimension = None
        for dim in ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']:
            dim_items = tester.scorer.get_items_by_dimension(dim)
            for item in dim_items:
                if item['item'] == consistency_item:
                    consistency_item_obj = item.copy()  # Make a copy to avoid modifying original
                    found_dimension = dim
                    break
            if consistency_item_obj:
                break
        
        if consistency_item_obj:
            # Add the dimension field if it's missing
            if 'dimension' not in consistency_item_obj:
                consistency_item_obj['dimension'] = found_dimension
            
            # Replace the last (lowest priority) item with consistency check
            next_items[-1] = consistency_item_obj
            print(f"   Replaced last item with consistency check: {consistency_item}")
        else:
            print(f"   ⚠️ Could not find consistency item {consistency_item} in pool")

    
    # CRITICAL BUG FIX: Check if any dimensions have 0 items before stopping
    # This prevents premature completion when context filtering exhausts questions
    is_emergency_mode = False  # Track if we're in emergency recovery
    if not next_items:
        # Check dimension coverage
        dimensions_with_zero_items = []
        for dim in ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']:
            dim_items = [code for code in responses.keys() if any(
                item['item'] == code for item in tester.scorer.get_items_by_dimension(dim)
            )]
            if len(dim_items) == 0:
                dimensions_with_zero_items.append(dim)
        
        if dimensions_with_zero_items:
            # CRITICAL ERROR: Some dimensions have 0 items!
            print(f"\n🚨 CRITICAL ERROR: Cannot complete with 0-item dimensions!")
            print(f"   Dimensions with 0 items: {', '.join(dimensions_with_zero_items)}")
            print(f"   This indicates context filtering removed too many questions.")
            print(f"   Forcing inclusion of minimum items for each dimension...")
            
            # Build demographic exclusion list to avoid adding items that will be filtered
            demographic_exclusions = []
            if demographics.get("demo_drives") == "no":
                demographic_exclusions.extend(["LUMEN_SC2", "KAEL_SC1", "CHRONOS_SC2"])
            if demographics.get("demo_credit_cards") == "no":
                demographic_exclusions.extend(["AETHER_SC2", "AETHER_SC4"])
            if demographics.get("demo_has_yard") == "no":
                demographic_exclusions.extend(["LUMEN_SC3", "ORIN_SC5"])
            
            # Emergency fallback: Get ANY item for dimensions with 0 ANSWERED items
            # Priority 1: Items not yet seen (not answered, not pending)
            # Priority 2: Items that are pending but never shown to user (promote to front)
            # Skip: Items that will be filtered by demographics (user can't answer them anyway)
            emergency_items = []
            for dim in dimensions_with_zero_items:
                all_dim_items = tester.scorer.get_items_by_dimension(dim)
                
                # First try: Get items NOT answered AND NOT pending AND NOT demographically excluded
                never_seen = [
                    item for item in all_dim_items 
                    if item['item'] not in responses 
                    and item['item'] not in demographic_exclusions
                    and item['item'] not in pending_questions
                ]
                
                if never_seen:
                    # Perfect - we found items that haven't been queued yet
                    never_seen.sort(key=lambda x: x['correlation'], reverse=True)
                    for item in never_seen[:2]:
                        if 'dimension' not in item:
                            item['dimension'] = dim
                        emergency_items.append(item)
                    print(f"   Added {len(never_seen[:2])} fresh emergency items for {dim}")
                else:
                    # All non-demographic items are already pending - promote them to front of queue!
                    # This happens when questions were added to END of queue but never shown
                    pending_for_dim = [
                        item for item in all_dim_items
                        if item['item'] in pending_questions
                        and item['item'] not in demographic_exclusions
                    ]
                    if pending_for_dim:
                        pending_for_dim.sort(key=lambda x: x['correlation'], reverse=True)
                        for item in pending_for_dim[:2]:
                            if 'dimension' not in item:
                                item['dimension'] = dim
                            emergency_items.append(item)
                        print(f"   ⚠️  Promoted {len(pending_for_dim[:2])} pending items for {dim} to FRONT of queue")
                    else:
                        print(f"   ❌ No items available for {dim} - all are demographically excluded")
            
            if emergency_items:
                # Use emergency items - these OVERRIDE pending questions
                # Clear pending items for these dimensions since we're sending them now
                emergency_item_codes = {item['item'] for item in emergency_items}
                pending_questions -= emergency_item_codes  # Remove from pending
                
                next_items = emergency_items
                is_emergency_mode = True
                print(f"   ✅ Recovered {len(next_items)} emergency questions")
                print(f"   These items are safe from demographic filtering")
                print(f"   Cleared {len(emergency_item_codes)} items from pending queue")
            else:
                # Truly no items left - this shouldn't happen but handle gracefully
                print(f"   ⚠️  No emergency items available - completing anyway")
        
        # If still no items after emergency recovery, complete
        if not next_items:
            print(f"\n✅ Assessment Complete! No more questions available.")
            print(f"   Total items answered: {len(responses)}")
            print(f"   Pending questions: {len(pending_questions)}")
            print(f"{'='*70}\n")
            return SubmitAnswerResponse(
                next_questions=None,
                is_complete=True,
                progress=1.0,
                questions_answered=len(demographics) + len(responses),
                total_questions=len(demographics) + len(responses),
            )
    
    # FINAL FILTER: Remove culturally-irrelevant questions from this batch
    # (in case they were selected before demographics were complete)
    # NOTE: Emergency mode items are already pre-filtered for demographics
    if not is_emergency_mode:
        final_exclusions = []
        if demographics.get("demo_drives") == "no":
            final_exclusions.extend(["LUMEN_SC2", "KAEL_SC1", "CHRONOS_SC2"])
        if demographics.get("demo_credit_cards") == "no":
            final_exclusions.extend(["AETHER_SC2", "AETHER_SC4"])
        if demographics.get("demo_has_yard") == "no":
            final_exclusions.extend(["LUMEN_SC3", "ORIN_SC5"])
        
        # Filter out excluded items from current batch
        if final_exclusions:
            next_items = [item for item in next_items if item.get("item") not in final_exclusions]
            if len(next_items) < len([item for item in next_items if item.get("item") not in final_exclusions]):
                print(f"   🧹 Filtered out culturally-irrelevant items from batch")
        
        # Check if we filtered everything out
        if not next_items:
            print(f"\n⚠️ All questions filtered out - requesting more items")
            # Try to get more items to replace the filtered ones
            next_items = tester.select_next_items(responses, n_items=3, exclude_items=all_seen_questions | set(final_exclusions))
            # Filter again just in case
            if final_exclusions:
                next_items = [item for item in next_items if item.get("item") not in final_exclusions]
    else:
        print(f"   ✅ Emergency mode: Items pre-filtered for demographics, no additional filtering needed")
    
    print(f"\n📋 Next Questions ({len(next_items)} items):")
    for item in next_items:
        if all(k in item for k in ['dimension', 'item', 'correlation', 'text']):
            print(f"   • {item['dimension']:8s} | {item['item']} | r={item['correlation']:.2f} | {item['text'][:50]}...")
        else:
            print(f"   • Invalid item structure: {item}")
    print(f"{'='*70}\n")
    
    # Format questions with correct type and config based on scale
    next_questions = []
    for q in next_items:
        question_type, render_config = get_question_type_and_config(q["item"])
        next_questions.append({
            "id": q["item"],
            "text": q["text"],
            "dimension": q["dimension"],
            "type": question_type,  # Use correct type (slider for 5-point, radio for 7-point)
            "isRequired": True,
            "renderConfig": render_config
        })
    
    # Mark new questions as pending
    for q in next_questions:
        pending_questions.add(q["id"])
    
    # Store current batch for back navigation
    session["current_batch"] = [q["id"] for q in next_questions]
    session["batch_history"].append({
        "batch": [q["id"] for q in next_questions],
        "timestamp": datetime.now().isoformat(),
    })
    
    # Calculate progress (estimate based on typical completion)
    questions_answered = len(demographics) + len(responses)
    estimated_total = 44  # 4 demographics + ~40 personality average
    progress = min(questions_answered / estimated_total, 0.95)  # Cap at 95% until done
    
    # 💾 Persist session state to database
    service = AssessmentService()
    await update_session_from_state(service, request.session_id, session)
    
    return SubmitAnswerResponse(
        next_questions=next_questions if next_questions else None,
        is_complete=len(next_questions) == 0,
        progress=progress,
        questions_answered=questions_answered,
        total_questions=estimated_total,
        can_go_back=len(responses) > 0,  # Can go back if answered any personality questions
    )


@router.post("/assessment/can-go-back", response_model=GetPreviousQuestionResponse)
async def check_can_go_back(request: GetPreviousQuestionRequest):
    """
    Check if user can go back without actually going back.
    
    Returns:
    - can_go_back: True if user can navigate back to previous question
    - warning: Message explaining why they can't go back (if applicable)
    
    Users can edit their last 10 answers to prevent disrupting the adaptive flow too much.
    """
    # Get session
    session = sessions.get(request.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    responses: Dict = session["responses"]
    demographics: Dict = session["demographics"]
    answer_history: List = session.get("answer_history", [])
    
    print(f"\n🔍 CHECK CAN GO BACK:")
    print(f"   Total responses: {len(responses)}")
    print(f"   Total demographics: {len(demographics)}")
    print(f"   Answer history length: {len(answer_history)}")
    
    # Need at least one answer to go back (either demographic or personality)
    if not answer_history:
        return GetPreviousQuestionResponse(
            question=None,
            current_answer=None,
            can_go_back=False,
            warning="No questions answered yet"
        )
    
    # Allow going back to last 10 answers
    MAX_BACK_DEPTH = 10
    if len(answer_history) <= MAX_BACK_DEPTH:
        # Can go back - still within the allowed window
        print(f"   ✅ Can go back ({len(answer_history)} answers, within {MAX_BACK_DEPTH} limit)")
        return GetPreviousQuestionResponse(
            question=None,
            current_answer=None,
            can_go_back=True,
            warning=None
        )
    else:
        # Too many answers ago - locked
        print(f"   ❌ Cannot go back ({len(answer_history)} answers, exceeds {MAX_BACK_DEPTH} limit)")
        return GetPreviousQuestionResponse(
            question=None,
            current_answer=None,
            can_go_back=False,
            warning="You can only edit your last 10 answers. Continue forward with the assessment."
        )


@router.post("/assessment/back", response_model=GetPreviousQuestionResponse)
async def go_back(request: GetPreviousQuestionRequest):
    """
    Go back to previous question.
    
    Allows users to review and edit their most recent answer (up to last 10 answers).
    This prevents disrupting the adaptive flow while still allowing minor corrections.
    
    ⚠️ Warning shown: Going back may affect results accuracy
    """
    # Get session
    session = sessions.get(request.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    responses: Dict = session["responses"]
    answer_history: List = session.get("answer_history", [])
    tester: AdaptiveTester = session["tester"]
    
    # Need at least one answer to go back
    if not answer_history:
        return GetPreviousQuestionResponse(
            question=None,
            current_answer=None,
            can_go_back=False,
            warning="No questions answered yet"
        )
    
    # Check if within allowed depth (last 10 answers)
    MAX_BACK_DEPTH = 10
    if len(answer_history) > MAX_BACK_DEPTH:
        return GetPreviousQuestionResponse(
            question=None,
            current_answer=None,
            can_go_back=False,
            warning="You can only edit your last 10 answers. Continue forward with the assessment."
        )
    
    # Get the last answered question from history
    last_question_id = answer_history[-1]
    
    # Get current answer from appropriate storage
    if last_question_id.startswith("demo_"):
        # Demographic question - get from demographics
        demographics: Dict = session["demographics"]
        current_answer = demographics[last_question_id]
    else:
        # Personality question - get from responses
        current_answer = responses[last_question_id]
    
    # Remove this question from history (will be re-added when they submit)
    answer_history.pop()
    
    # Find the full question object
    question_obj = None
    
    # Check if it's a demographic question first
    if last_question_id.startswith("demo_"):
        # Handle demographic questions - construct them manually
        demographic_questions = {
            "demo_name": {
                "id": "demo_name",
                "text": "What's your name?",
                "type": "text-input",
                "dimension": "demographics",
                "isRequired": True,
                "renderConfig": {
                    "placeholder": "Enter your name",
                    "helpText": "Used for personalization in your results"
                }
            },
            "demo_dob": {
                "id": "demo_dob",
                "text": "What's your date of birth?",
                "type": "date-input",
                "dimension": "demographics",
                "isRequired": True,
                "renderConfig": {
                    "placeholder": "Select your birth date",
                    "helpText": "Must be 13 or older to take this assessment",
                    "maxDate": "today",
                    "yearRange": [1900, 2012]
                }
            },
            "demo_gender": {
                "id": "demo_gender",
                "text": "What's your gender?",
                "type": "pill-select",
                "dimension": "demographics",
                "isRequired": False,
                "renderConfig": {
                    "options": [
                        {"label": "Male", "value": "male"},
                        {"label": "Female", "value": "female"},
                        {"label": "Non-binary", "value": "non_binary"},
                        {"label": "Prefer not to say", "value": "prefer_not_to_say"}
                    ]
                }
            },
            "demo_country": {
                "id": "demo_country",
                "text": "Which country do you live in?",
                "type": "country-select",
                "dimension": "demographics",
                "isRequired": True,
                "renderConfig": {
                    "placeholder": "Start typing your country...",
                    "helpText": "This helps us provide culturally relevant questions"
                }
            },
            "demo_drives": {
                "id": "demo_drives",
                "text": "Do you drive a car regularly?",
                "type": "radio",
                "dimension": "demographics",
                "isRequired": False,
                "renderConfig": {
                    "options": [
                        {"value": "yes", "label": "Yes"},
                        {"value": "no", "label": "No"}
                    ]
                }
            },
            "demo_credit_cards": {
                "id": "demo_credit_cards",
                "text": "Do you use credit cards?",
                "type": "radio",
                "dimension": "demographics",
                "isRequired": False,
                "renderConfig": {
                    "options": [
                        {"value": "yes", "label": "Yes"},
                        {"value": "no", "label": "No"}
                    ]
                }
            },
            "demo_has_yard": {
                "id": "demo_has_yard",
                "text": "Do you have a yard or garden?",
                "type": "radio",
                "dimension": "demographics",
                "isRequired": False,
                "renderConfig": {
                    "options": [
                        {"value": "yes", "label": "Yes"},
                        {"value": "no", "label": "No"}
                    ]
                }
            }
        }
        question_obj = demographic_questions.get(last_question_id)
    else:
        # Personality question - look in the scorer's item pool
        for dim in ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']:
            dim_items = tester.scorer.get_items_by_dimension(dim)
            for item in dim_items:
                if item['item'] == last_question_id:
                    question_type, render_config = get_question_type_and_config(item["item"])
                    question_obj = {
                        "id": item["item"],
                        "text": item["text"],
                        "dimension": item.get("dimension", dim),
                        "type": question_type,  # Use correct type (slider for 5-point, radio for 7-point)
                        "isRequired": True,
                        "renderConfig": render_config
                    }
                    break
            if question_obj:
                break
    
    print(f"\n⬅️  BACK NAVIGATION - User reviewing question {last_question_id} ({len(answer_history)} answers deep)")
    
    return GetPreviousQuestionResponse(
        question=question_obj,
        current_answer=current_answer,
        can_go_back=len(answer_history) > 1,  # Can still go back if more than 1 answer
        warning="Changing previous answers may affect your results accuracy and consistency score."
    )


@router.get("/assessment/{session_id}/results", response_model=GetResultsResponse)
async def get_results(session_id: str):
    """
    Get complete assessment results with narrative.
    
    ✅ BEST PRACTICE: Results are cached in database
    - First request: Generates narrative with OpenAI (~$0.002) → Saves to database
    - All subsequent requests: Fetches from database (FREE, instant!)
    - Prevents duplicate OpenAI calls on page refresh
    - Idempotent: Safe to call multiple times
    
    Returns:
    - scores: Dimension scores (0-100)
    - narrative: Complete psychological narrative
      - archetype: Personality archetype with personalized greeting
      - dimensions: Detailed dimension narratives
      - summary: Executive summary
    """
    # 🔍 STEP 1: Check database FIRST for existing results (caching layer)
    service = AssessmentService()
    existing_result = await service.get_result(session_id)
    
    if existing_result:
        # ✅ Results already generated - return cached from database (NO OpenAI call)
        print(f"\n📊 Returning existing results from database for session {session_id}")
        
        # Load session for demographics
        db_session = await service.get_session(session_id)
        demographics = db_session.demographics if db_session else {}
        
        # Build validation data if available
        validation_data = None
        if existing_result.consistencyScore is not None:
            validation_data = {
                "consistency_score": existing_result.consistencyScore,
                "attention_score": existing_result.attentionScore,
                "flags": existing_result.validationFlags or [],
            }
        
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
    
    # No existing results - generate new ones
    # Get session
    session = sessions.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    responses = session["responses"]
    demographics = session.get("demographics", {})
    scorer: SelveScorer = session["scorer"]
    
    # Check if complete - be more lenient for results endpoint
    # If they have at least minimum responses per dimension, allow results
    tester: AdaptiveTester = session["tester"]
    
    # Count items per dimension
    dimension_counts = {}
    for question_id in responses.keys():
        # Find which dimension this question belongs to
        for dim in ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']:
            dim_items = tester.scorer.get_items_by_dimension(dim)
            if any(item['item'] == question_id for item in dim_items):
                dimension_counts[dim] = dimension_counts.get(dim, 0) + 1
                break
    
    # Require at least 2 items per dimension (original quick screen minimum)
    min_items = 2
    incomplete_dims = [dim for dim in ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL'] 
                       if dimension_counts.get(dim, 0) < min_items]
    
    if incomplete_dims and len(responses) < 16:
        raise HTTPException(
            status_code=400,
            detail=f"Assessment not complete. Need more responses for: {', '.join(incomplete_dims)}",
        )
    
    # ⚠️ STEP 2: No existing results - generate new ones (costs money via OpenAI)
    # This only runs ONCE per session (first time results requested)
    # All subsequent requests return cached result from STEP 1
    
    # Score responses
    profile = scorer.score_responses(responses)
    
    # Get response validation
    validator: ResponseValidator = session.get("validator")
    validation_result = None
    if validator:
        validation_result = validator.validate_responses(responses)
    
    # 🤖 Generate narrative using OpenAI (EXPENSIVE - only runs once!)
    # Convert float scores to int for the generator
    int_scores = {dim: int(score) for dim, score in profile.dimension_scores.items()}
    
    try:
        # Try OpenAI integrated narrative first
        integrated_narrative = generate_integrated_narrative(int_scores, use_llm=True)
        
        # Build narrative structure compatible with frontend
        narrative_dict = {
            'profile_pattern': integrated_narrative['profile_pattern'],
            'sections': integrated_narrative['sections'],
            'scores': integrated_narrative['scores'],
            'generation_cost': integrated_narrative.get('generation_cost', 0.0),
            'metadata': integrated_narrative.get('metadata', {}),
        }
        
        print(f"\n✅ Generated integrated narrative with OpenAI")
        print(f"   Cost: ${integrated_narrative.get('generation_cost', 0):.4f}")
        print(f"   Model: {integrated_narrative.get('metadata', {}).get('model', 'unknown')}")
        
    except Exception as e:
        # Fallback to template-based narrative
        print(f"\n⚠️ OpenAI narrative failed, falling back to templates: {e}")
        narrative = generate_narrative(profile.dimension_scores)
        
        # Convert old format to new format
        narrative_dict = {
            'profile_pattern': {
                'pattern': 'Generated Profile',
                'description': narrative.summary
            },
            'sections': {
                'core_identity': narrative.summary,
                'archetype': {
                    'name': narrative.archetype.name,
                    'description': narrative.archetype.description,
                    'core_traits': narrative.archetype.core_traits,
                    'strengths': narrative.archetype.strengths,
                    'challenges': narrative.archetype.challenges,
                }
            },
            'scores': profile.dimension_scores,
            'generation_cost': 0.0,
            'metadata': {
                'generation_method': 'template'
            }
        }
    
    # Personalize with name if available
    if "demo_name" in demographics and demographics["demo_name"]:
        name = demographics["demo_name"].split()[0]  # Use first name
        # Prepend greeting to core identity section
        if 'core_identity' in narrative_dict['sections']:
            narrative_dict['sections']['core_identity'] = f"Hi {name}! " + narrative_dict['sections']['core_identity']
    
    # Mark session as completed
    session["completed_at"] = datetime.now().isoformat()
    
    # 💾 Save results to database for future requests (caching)
    # This enables instant, free retrieval on page refresh (STEP 1 above)
    archetype_name = None
    profile_pattern = None
    if 'sections' in narrative_dict and 'archetype' in narrative_dict['sections']:
        archetype_name = narrative_dict['sections']['archetype'].get('name')
    if 'profile_pattern' in narrative_dict:
        profile_pattern = narrative_dict['profile_pattern'].get('pattern')
    
    validation_flags = validation_result.get('flags', []) if validation_result else None
    
    # save_result() is idempotent - if called twice concurrently, returns existing
    await service.save_result(
        session_id=session_id,
        scores=profile.dimension_scores,
        narrative=narrative_dict,
        archetype=archetype_name,
        profile_pattern=profile_pattern,
        consistency_score=validation_result.get('consistency_score') if validation_result else None,
        attention_score=validation_result.get('attention_score') if validation_result else None,
        validation_flags=validation_flags,
        generation_cost=narrative_dict.get('generation_cost', 0.0),
        generation_model=narrative_dict.get('metadata', {}).get('model'),
    )
    
    print(f"\n💾 Results saved to database for session {session_id}")
    
    # Prepare response
    response_data = {
        "session_id": session_id,
        "scores": profile.dimension_scores,
        "narrative": narrative_dict,
        "completed_at": session["completed_at"],
        "demographics": demographics,
    }
    
    # Add validation results if available
    if validation_result:
        # Add back navigation behavior analysis
        back_nav_analysis = None
        back_count = session.get("back_navigation_count", 0)
        
        if back_count > 0:
            # Interpret back navigation behavior
            if back_count >= 10:
                back_nav_analysis = "High back-navigation (10+ times) may indicate perfectionism, anxiety, or indecisiveness"
            elif back_count >= 5:
                back_nav_analysis = "Moderate back-navigation (5-9 times) suggests thoughtful consideration or some uncertainty"
            else:
                back_nav_analysis = f"Low back-navigation ({back_count} times) indicates confidence in responses"
        
        response_data["validation"] = {
            "consistency_score": validation_result["consistency_score"],
            "attention_score": validation_result["attention_score"],
            "flags": validation_result["flags"],
            "consistency_report": validator.get_consistency_report(responses),
            "back_navigation_count": back_count,
            "back_navigation_analysis": back_nav_analysis,
        }
        
        # Log validation results
        print(f"\n📊 Final Validation Results:")
        print(f"   Consistency: {validation_result['consistency_score']:.1f}%")
        print(f"   Attention: {validation_result['attention_score']:.1f}%")
        print(f"   Back Navigation: {back_count} times")
        if back_nav_analysis:
            print(f"   Analysis: {back_nav_analysis}")
        if validation_result['flags']:
            print(f"   Flags: {', '.join(validation_result['flags'])}")
    
    return GetResultsResponse(**response_data)


@router.get("/assessment/{session_id}/progress")
async def get_progress(session_id: str):
    """
    Get current assessment progress.
    
    Useful for:
    - Showing progress bars
    - Estimating completion time
    - Debugging
    """
    session = sessions.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    responses = session["responses"]
    tester: AdaptiveTester = session["tester"]
    
    should_continue, reason = tester.should_continue_testing(responses)
    
    # Calculate dimension-level progress
    dimension_counts = {}
    for question_id in responses.keys():
        item = tester.item_pool.get(question_id)
        if item:
            dim = item["dimension"]
            dimension_counts[dim] = dimension_counts.get(dim, 0) + 1
    
    return {
        "session_id": session_id,
        "questions_answered": len(responses),
        "is_complete": not should_continue,
        "completion_reason": reason if not should_continue else None,
        "dimension_progress": dimension_counts,
        "started_at": session["started_at"],
    }


class TransferSessionRequest(BaseModel):
    """Request to transfer anonymous session to authenticated user"""
    session_id: str
    

@router.post("/assessment/transfer-session")
async def transfer_session(
    request: TransferSessionRequest,
    user: dict = Depends(get_current_user)
):
    """
    Transfer an anonymous session to an authenticated user.
    
    This endpoint is called when a user signs in after starting
    an assessment anonymously. It links the session to their Clerk ID
    so results are saved to their account.
    
    Security:
    - Requires authentication (user must be signed in)
    - Only works on sessions that don't already have a user_id
    - Cannot steal other users' sessions
    
    Robustness:
    - Checks database first, then falls back to in-memory cache
    - Creates new session if old one was deleted
    - Handles server restarts gracefully
    """
    if not user:
        raise HTTPException(
            status_code=401, 
            detail="Authentication required to transfer session"
        )
    
    clerk_user_id = user.get("sub")
    
    # Try database transfer first
    service = AssessmentService()
    try:
        db_session = await service.transfer_session_to_user(
            session_id=request.session_id,
            clerk_user_id=clerk_user_id
        )
        
        if db_session:
            # Success - update in-memory cache if exists
            if request.session_id in sessions:
                sessions[request.session_id]["user_id"] = clerk_user_id
                sessions[request.session_id]["clerk_user"] = user
            
            print(f"✅ Session {request.session_id} transferred to user {clerk_user_id}")
            
            return {
                "success": True,
                "message": "Session transferred successfully",
                "session_id": request.session_id,
                "user_id": clerk_user_id,
            }
    except ValueError as e:
        # Session already owned by another user
        raise HTTPException(status_code=403, detail=str(e))
    
    # Database session not found - check in-memory cache
    if request.session_id in sessions:
        print(f"⚠️ Session {request.session_id} found in memory but not in database")
        print(f"   Creating new database session for user {clerk_user_id}")
        
        # Create new session in database linked to user
        # This handles cases where database was cleared but frontend has old session
        new_session = await service.create_session(
            clerk_user_id=clerk_user_id,
            metadata={"transferred_from_memory": True}
        )
        
        # Update in-memory cache to use new session ID
        memory_session = sessions[request.session_id]
        memory_session["user_id"] = clerk_user_id
        memory_session["clerk_user"] = user
        sessions[new_session.id] = memory_session
        del sessions[request.session_id]  # Remove old session
        
        print(f"✅ Created new session {new_session.id} for user {clerk_user_id}")
        
        return {
            "success": True,
            "message": "New session created (old session not found in database)",
            "session_id": new_session.id,
            "user_id": clerk_user_id,
            "note": "Your progress will continue in the new session"
        }
    
    # Session not found anywhere - this means user has no active session
    # Don't error - just create a fresh session for them
    print(f"⚠️ Session {request.session_id} not found anywhere")
    print(f"   Creating fresh session for user {clerk_user_id}")
    
    new_session = await service.create_session(
        clerk_user_id=clerk_user_id,
        metadata={"created_on_transfer": True}
    )
    
    return {
        "success": True,
        "message": "Fresh session created (previous session not found)",
        "session_id": new_session.id,
        "user_id": clerk_user_id,
        "note": "Starting fresh assessment"
    }


@router.delete("/assessment/{session_id}")
async def delete_session(session_id: str):
    """
    Delete assessment session.
    
    Use after:
    - User completes assessment
    - Session expires
    - User wants to restart
    """
    service = AssessmentService()
    deleted = await service.delete_session(session_id)
    
    # Also remove from memory cache
    if session_id in sessions:
        del sessions[session_id]
    
    if not deleted:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return {"message": "Session deleted"}


@router.get("/assessment/session/{session_id}")
async def get_session_state(session_id: str):
    """
    Get current session state for recovery/resumption.
    
    Allows users to resume incomplete assessments after:
    - Page refresh
    - Browser restart  
    - Backend restart
    
    Returns:
    - session_id: Session identifier
    - status: "in-progress", "completed", or "abandoned"
    - progress: Current progress (0.0 - 1.0)
    - questions_answered: Number of questions answered
    - can_resume: Whether session can be resumed
    """
    service = AssessmentService()
    db_session = await service.get_session(session_id)
    
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Calculate progress
    responses = db_session.responses or {}
    demographics = db_session.demographics or {}
    questions_answered = len(demographics) + len(responses)
    estimated_total = 44
    progress = min(questions_answered / estimated_total, 0.95)
    
    # Load into memory cache if not already there
    if session_id not in sessions:
        sessions[session_id] = session_to_state_dict(db_session)
        print(f"♻️  Restored session {session_id} from database to memory")
    
    # Get pending questions from memory if available
    pending_questions_list = []
    pending_questions_details = []
    if session_id in sessions:
        pending_set = sessions[session_id].get("pending_questions", set())
        pending_questions_list = list(pending_set)
        
        # Load item pool to get full question details
        if pending_questions_list:
            tester = sessions[session_id]["tester"]
            item_pool = tester.scorer.item_pool
            
            # item_pool is a dict with dimensions as keys, need to flatten
            all_items = []
            for dimension, items in item_pool.items():
                for item in items:
                    item["dimension"] = dimension  # Ensure dimension is set
                    all_items.append(item)
            
            for question_id in pending_questions_list:
                # Find question in flattened item pool
                matching_items = [item for item in all_items if item["item"] == question_id]
                if matching_items:
                    item = matching_items[0]
                    question_type, render_config = get_question_type_and_config(item["item"])
                    pending_questions_details.append({
                        "id": item["item"],
                        "text": item["text"],
                        "dimension": item.get("dimension", "UNKNOWN"),
                        "type": question_type,  # Use correct type (slider for 5-point, radio for 7-point)
                        "isRequired": True,
                        "renderConfig": render_config
                    })
    
    return {
        "session_id": session_id,
        "status": db_session.status,
        "progress": progress,
        "questions_answered": questions_answered,
        "total_questions": estimated_total,
        "can_resume": db_session.status == "in-progress",
        "created_at": db_session.createdAt.isoformat(),
        "updated_at": db_session.updatedAt.isoformat() if db_session.updatedAt else None,
        "completed_at": db_session.completedAt.isoformat() if db_session.completedAt else None,
        # Include actual response data for session restoration
        "responses": responses,
        "demographics": demographics,
        # Include user ID to detect anonymous vs authenticated sessions
        "clerk_user_id": db_session.clerkUserId,
        # Include pending questions with full details for continuation
        "pending_questions": pending_questions_details,
    }


# ============================================================================
# ASSESSMENT ARCHIVING & RETAKE
# ============================================================================

@router.post("/assessment/archive-and-restart")
async def archive_and_restart_assessment(
    clerk_user_id: Optional[str] = None
):
    """
    Archive user's current assessment(s) and create a new one.
    
    This endpoint:
    1. Marks all current sessions as archived (isCurrent=False, sets archivedAt)
    2. Marks all current results as archived (isCurrent=False)
    3. Creates a brand new session for the user
    
    All previous assessment data is preserved for historical tracking.
    
    Args:
        clerk_user_id: Clerk user ID (from auth or request body)
        
    Returns:
        - new_session_id: ID of the newly created session
        - archived_count: Number of previous sessions archived
        - message: Success message
    """
    if not clerk_user_id:
        raise HTTPException(
            status_code=400, 
            detail="clerk_user_id is required for authenticated users"
        )
    
    try:
        service = AssessmentService()
        
        # Get count of current sessions before archiving
        current_sessions = await prisma.assessmentsession.count(
            where={
                "clerkUserId": clerk_user_id,
                "isCurrent": True
            }
        )
        archived_count = current_sessions or 0
        
        # Archive current and create new
        new_session = await service.archive_current_and_create_new(
            clerk_user_id=clerk_user_id
        )
        
        return {
            "new_session_id": new_session.id,
            "archived_count": archived_count,
            "message": f"Successfully archived {archived_count} previous assessment(s) and created new session",
            "created_at": new_session.createdAt.isoformat(),
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to archive and restart: {str(e)}")


@router.get("/assessment/history/{clerk_user_id}")
async def get_assessment_history(
    clerk_user_id: str,
    include_current: bool = True,
    limit: int = 10
):
    """
    Get user's assessment history (all assessments, past and present)
    
    Args:
        clerk_user_id: Clerk user ID
        include_current: Whether to include current assessment (default: True)
        limit: Maximum number of results (default: 10)
        
    Returns:
        List of assessment sessions with metadata, ordered by date (newest first)
    """
    service = AssessmentService()
    
    try:
        sessions = await service.get_assessment_history(
            clerk_user_id=clerk_user_id,
            include_current=include_current,
            limit=limit
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
        raise HTTPException(status_code=500, detail=f"Failed to fetch history: {str(e)}")


@router.get("/assessment/current/{clerk_user_id}")
async def get_current_assessment(
    clerk_user_id: str
):
    """
    Get user's current (active) assessment
    
    Args:
        clerk_user_id: Clerk user ID
        
    Returns:
        Current assessment session details or null if no current assessment
        
    Note:
        Returns null if session exists but has 0 answers (user started but never submitted anything)
    """
    service = AssessmentService()
    
    try:
        session = await service.get_current_session(clerk_user_id)
        
        if not session:
            return {"current_assessment": None}
        
        # Count total answers (demographics + personality responses)
        questions_answered = len(session.responses or {}) + len(session.demographics or {})
        
        # If user started wizard but never submitted ANY answer, treat as no session
        # This prevents showing "Continue Assessment" for empty sessions
        if questions_answered == 0:
            print(f"⚠️  Session {session.id} has 0 answers - treating as no current session")
            return {"current_assessment": None}
        
        return {
            "current_assessment": {
                "session_id": session.id,
                "status": session.status,
                "created_at": session.createdAt.isoformat(),
                "completed_at": session.completedAt.isoformat() if session.completedAt else None,
                "questions_answered": questions_answered,
                "progress": min(
                    questions_answered / 44, 
                    0.95
                ),
                # Include actual response data for session restoration
                "responses": session.responses or {},
                "demographics": session.demographics or {},
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch current assessment: {str(e)}")


@router.get("/assessment/current-result/{clerk_user_id}")
async def get_current_result(
    clerk_user_id: str
):
    """
    Get user's current (latest) assessment result
    
    This returns only the most recent result marked as isCurrent=True.
    Use this when you want to display "your current personality profile".
    
    Args:
        clerk_user_id: Clerk user ID
        
    Returns:
        Current result with scores and narrative, or null if no current result
    """
    service = AssessmentService()
    
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
        raise HTTPException(status_code=500, detail=f"Failed to fetch current result: {str(e)}")


@router.get("/assessment/{session_id}/friend-insights")
async def get_friend_insights(
    session_id: str
):
    """
    Get friend insights for a completed assessment session
    
    Returns:
        - friendResponses: List of friend responses with quality scores
        - aggregatedScores: Average scores from friends per dimension
        - narrativeSummary: AI-generated narrative (or null if unavailable)
        - narrativeGeneratedAt: When the narrative was generated
        - narrativeFriendCount: Number of friends included in narrative
        - narrativeError: Error message if generation failed
        - lastRegeneration: When profile was last updated with friend data
    """
    from app.db import prisma
    from app.services.friend_insights_service import FriendInsightsService, get_fallback_message
    
    try:
        # Get the session to find the user
        session = await prisma.assessmentsession.find_unique(
            where={"id": session_id}
        )
        
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # We need the User record to get invites (invites are linked via User.id, not clerkUserId)
        user = None
        if session.clerkUserId:
            user = await prisma.user.find_unique(
                where={"clerkId": session.clerkUserId}
            )
        
        if not user:
            # No user found - return empty response (user may not have linked account)
            return {
                "friendResponses": [],
                "aggregatedScores": {},
                "narrativeSummary": None,
                "narrativeGeneratedAt": None,
                "narrativeFriendCount": 0,
                "narrativeError": None,
                "lastRegeneration": None
            }
        
        # Get all friend responses for this user's invites (using correct model name)
        invites = await prisma.invitelink.find_many(
            where={"inviterId": user.id},
            include={"friendResponse": True}
        )
        
        # Filter to completed invites only (relation name is friendResponse, not response)
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
                    "completedAt": invite.friendResponse.completedAt.isoformat()
                })
                friend_response_ids.append(invite.friendResponse.id)
        
        # Calculate aggregated scores if we have friend responses
        aggregated_scores = {}
        if friend_responses:
            # Get the friend item pool to map questions to dimensions
            import json
            # Path to data folder is at project root, not in backend
            item_pool_path = os.path.join(
                os.path.dirname(__file__), 
                "../../../../data/selve_friend_item_pool.json"
            )
            
            try:
                with open(item_pool_path, "r") as f:
                    friend_items_by_dim = json.load(f)
            except FileNotFoundError:
                print(f"⚠️ Friend item pool not found at: {item_pool_path}")
                friend_items_by_dim = {}
            
            # Flatten the structure and map item_id to dimensions
            item_to_dim = {}
            for dimension, items in friend_items_by_dim.items():
                for item in items:
                    item_to_dim[item["item_id"]] = dimension
            
            # Aggregate scores by dimension
            dimension_scores = {}
            dimension_counts = {}
            
            for response in friend_responses:
                quality_weight = 1.0
                if response["qualityScore"] >= 70:
                    quality_weight = 1.0
                elif response["qualityScore"] >= 50:
                    quality_weight = 0.5
                else:
                    quality_weight = 0.1
                
                # responses is a list of {item_id, value, ...} objects
                responses_list = response["responses"]
                if isinstance(responses_list, list):
                    for item in responses_list:
                        item_id = item.get("item_id", "")
                        value = item.get("value")
                        
                        if isinstance(value, (int, float)):
                            # Extract dimension from item_id prefix (e.g., "lumen_1" -> "LUMEN")
                            dim = item_id.split("_")[0].upper() if "_" in item_id else None
                            
                            # Also check the item pool mapping for original format items
                            if not dim and item_id in item_to_dim:
                                dim = item_to_dim[item_id]
                            
                            if dim:
                                if dim not in dimension_scores:
                                    dimension_scores[dim] = 0
                                    dimension_counts[dim] = 0
                                
                                # Convert 1-5 scale to 0-100 (like self-assessment)
                                normalized_score = ((value - 1) / 4) * 100
                                
                                dimension_scores[dim] += normalized_score * quality_weight
                                dimension_counts[dim] += quality_weight
                else:
                    # Legacy format: dict of {item_code: value}
                    for item_code, value in responses_list.items():
                        if isinstance(value, (int, float)) and item_code in item_to_dim:
                            dim = item_to_dim[item_code]
                            
                            if dim not in dimension_scores:
                                dimension_scores[dim] = 0
                                dimension_counts[dim] = 0
                            
                            # Convert 1-5 scale to 0-100 (like self-assessment)
                            normalized_score = ((value - 1) / 4) * 100
                            
                            dimension_scores[dim] += normalized_score * quality_weight
                            dimension_counts[dim] += quality_weight
            
            # Calculate averages
            for dim in dimension_scores:
                if dimension_counts[dim] > 0:
                    aggregated_scores[dim] = dimension_scores[dim] / dimension_counts[dim]
        
        # Get last regeneration timestamp (from AssessmentResult table)
        last_result = await prisma.assessmentresult.find_first(
            where={"sessionId": session_id},
            order={"createdAt": "desc"}
        )
        
        # Generate or retrieve narrative if we have friend responses
        narrative_summary = None
        narrative_generated_at = None
        narrative_friend_count = 0
        narrative_error = None
        
        if friend_responses and aggregated_scores:
            # Get self scores from the result
            self_scores = {}
            if last_result:
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
            
            if self_scores:
                try:
                    # Use the friend insights service
                    insights_service = FriendInsightsService(prisma)
                    result = await insights_service.get_or_generate_narrative(
                        session_id=session_id,
                        self_scores=self_scores,
                        friend_scores=aggregated_scores,
                        friend_response_ids=friend_response_ids
                    )
                    
                    narrative_summary = result.get("narrative")
                    narrative_generated_at = result.get("generatedAt")
                    narrative_friend_count = result.get("friendCount", len(friend_responses))
                    
                    if result.get("hasError"):
                        narrative_error = get_fallback_message("error")
                        
                except Exception as e:
                    print(f"⚠️ Failed to generate friend insights narrative: {e}")
                    narrative_error = get_fallback_message("error")
        
        return {
            "friendResponses": friend_responses,
            "aggregatedScores": aggregated_scores,
            "narrativeSummary": narrative_summary,
            "narrativeGeneratedAt": narrative_generated_at,
            "narrativeFriendCount": narrative_friend_count,
            "narrativeError": narrative_error,
            "lastRegeneration": last_result.createdAt.isoformat() if last_result else None
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch friend insights: {str(e)}")


# ============================================================================
# Results Privacy & Sharing
# ============================================================================

@router.get("/assessment/{session_id}/results/check-access")
async def check_results_access(session_id: str, clerk_user_id: Optional[str] = None):
    """
    Check if a user has access to view results.
    
    Returns:
        - hasAccess: Whether the user can view these results
        - isOwner: Whether this is the user's own results
        - isPublic: Whether the results are publicly shared
    """
    service = AssessmentService()
    
    # Get the result
    result = await service.get_result(session_id)
    if not result:
        raise HTTPException(status_code=404, detail="Results not found")
    
    # Get the session to check ownership
    db_session = await service.get_session(session_id)
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    is_owner = clerk_user_id and db_session.clerkUserId == clerk_user_id
    is_public = result.isPublic
    
    return {
        "hasAccess": is_owner or is_public,
        "isOwner": is_owner,
        "isPublic": is_public,
        "publicShareId": result.publicShareId if is_public else None
    }


@router.post("/assessment/{session_id}/share")
async def create_share_link(session_id: str, clerk_user_id: str):
    """
    Generate a public share link for assessment results.
    Only the owner can create a share link.
    
    Returns:
        - shareId: The public share ID for the URL
        - shareUrl: The full shareable URL path
    """
    import secrets
    from datetime import datetime
    
    service = AssessmentService()
    
    # Get the session to verify ownership
    db_session = await service.get_session(session_id)
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    if db_session.clerkUserId != clerk_user_id:
        raise HTTPException(status_code=403, detail="You can only share your own results")
    
    # Get the result
    result = await service.get_result(session_id)
    if not result:
        raise HTTPException(status_code=404, detail="Results not found")
    
    # If already has a share link, return it
    if result.publicShareId:
        return {
            "shareId": result.publicShareId,
            "shareUrl": f"/share/{result.publicShareId}",
            "isNew": False
        }
    
    # Generate a new share ID (URL-safe, 16 chars)
    share_id = secrets.token_urlsafe(12)  # 16 characters
    
    # Update the result with sharing enabled
    await prisma.assessmentresult.update(
        where={"id": result.id},
        data={
            "isPublic": True,
            "publicShareId": share_id,
            "sharedAt": datetime.utcnow()
        }
    )
    
    return {
        "shareId": share_id,
        "shareUrl": f"/share/{share_id}",
        "isNew": True
    }


@router.delete("/assessment/{session_id}/share")
async def revoke_share_link(session_id: str, clerk_user_id: str):
    """
    Revoke public sharing for assessment results.
    Only the owner can revoke sharing.
    """
    service = AssessmentService()
    
    # Get the session to verify ownership
    db_session = await service.get_session(session_id)
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    if db_session.clerkUserId != clerk_user_id:
        raise HTTPException(status_code=403, detail="You can only manage your own results")
    
    # Get the result
    result = await service.get_result(session_id)
    if not result:
        raise HTTPException(status_code=404, detail="Results not found")
    
    # Disable sharing (keep the shareId for potential re-enable)
    await prisma.assessmentresult.update(
        where={"id": result.id},
        data={"isPublic": False}
    )
    
    return {"success": True, "message": "Share link revoked"}


@router.get("/share/{share_id}/results")
async def get_shared_results(share_id: str):
    """
    Get publicly shared assessment results.
    Anyone with the share link can view these results.
    
    Returns the same format as get_results but for public shared results.
    """
    # Find the result by share ID
    result = await prisma.assessmentresult.find_first(
        where={
            "publicShareId": share_id,
            "isPublic": True
        }
    )
    
    if not result:
        raise HTTPException(
            status_code=404, 
            detail="Shared results not found or sharing has been disabled"
        )
    
    # Get session for demographics (but don't expose user identity)
    service = AssessmentService()
    db_session = await service.get_session(result.sessionId)
    demographics = db_session.demographics if db_session else {}
    
    # Remove identifying info from demographics for public view
    safe_demographics = {
        k: v for k, v in (demographics or {}).items() 
        if k not in ['email', 'full_name', 'name']
    }
    
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
        "is_shared": True
    }


@router.post("/assessment/{session_id}/share/toggle")
async def toggle_share(session_id: str, clerk_user_id: str, enable: bool):
    """
    Toggle sharing on/off without regenerating the share ID.
    Useful for temporarily disabling then re-enabling sharing.
    """
    service = AssessmentService()
    
    # Verify ownership
    db_session = await service.get_session(session_id)
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    if db_session.clerkUserId != clerk_user_id:
        raise HTTPException(status_code=403, detail="You can only manage your own results")
    
    result = await service.get_result(session_id)
    if not result:
        raise HTTPException(status_code=404, detail="Results not found")
    
    # If enabling and no share ID exists, create one
    if enable and not result.publicShareId:
        import secrets
        from datetime import datetime
        share_id = secrets.token_urlsafe(12)
        await prisma.assessmentresult.update(
            where={"id": result.id},
            data={
                "isPublic": True,
                "publicShareId": share_id,
                "sharedAt": datetime.utcnow()
            }
        )
        return {"isPublic": True, "shareId": share_id}
    
    # Toggle existing share
    await prisma.assessmentresult.update(
        where={"id": result.id},
        data={"isPublic": enable}
    )
    
    return {
        "isPublic": enable,
        "shareId": result.publicShareId if enable else None
    }