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
from fastapi import APIRouter, HTTPException
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

router = APIRouter()

# In-memory session storage (replace with Redis/DB in production)
sessions: Dict[str, Dict] = {}


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
async def start_assessment(request: StartAssessmentRequest):
    """
    Start a new adaptive assessment.
    
    Returns:
    - session_id: Unique session identifier
    - questions: Initial quick screen questions (16 items)
    - total_questions: Estimated total (30-54 items including demographics)
    - progress: Initial progress (0.0)
    """
    # Generate session ID
    session_id = f"session_{datetime.now().timestamp()}"
    
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
            "id": "demo_age",
            "text": "How old are you?",
            "type": "number-input",
            "dimension": "demographics",
            "isRequired": True,
            "renderConfig": {
                "min": 13,
                "max": 120,
                "placeholder": "Enter your age",
                "helpText": "Must be 13 or older to take this assessment"
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
    
    # Store session
    sessions[session_id] = {
        "tester": tester,
        "scorer": SelveScorer(),
        "validator": ResponseValidator(),
        "responses": {},
        "demographics": {},
        "pending_questions": set(),  # Track questions sent to user to avoid duplicates
        "current_batch": [],  # Current batch of questions (for back navigation)
        "batch_history": [],  # History of all batches sent
        "back_navigation_count": 0,  # Track how many times user went back
        "back_navigation_log": [],  # Detailed log: [{question_id, from_value, to_value, timestamp}]
        "started_at": datetime.now().isoformat(),
        "user_id": request.user_id,
        "metadata": request.metadata or {},
    }
    
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
async def submit_answer(request: SubmitAnswerRequest):
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
    # Get session
    session = sessions.get(request.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
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
        
        # All demographics complete! Generate first personality batch with cultural filtering
        print(f"\n✅ All demographics complete! Generating first personality batch...")
        # Skip the personality response storage - this is still a demographic
        # Fall through to batch generation, but DON'T store this as a personality response
        skip_personality_storage = True
    else:
        skip_personality_storage = False
    
    # Check if user is updating after going back (track this behavior)
    if not skip_personality_storage and request.is_going_back and request.question_id in responses:
        # User went back and changed their answer
        old_value = responses[request.question_id]
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
        responses[request.question_id] = request.response
        pending_questions.discard(request.question_id)  # Remove from pending set
        
        # Log adaptive decision-making
        print(f"\n{'='*70}")
        print(f"📊 ADAPTIVE TESTING - Question #{len(responses)} answered")
        print(f"{'='*70}")
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
    
    next_items = tester.select_next_items_excluding(responses, all_exclusions, max_items=3)
    
    # Replace one item with consistency check if we have one
    if consistency_item and next_items:
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
            
            # Emergency fallback: Get ANY item for dimensions with 0 items
            # BUT: Skip items that will be filtered by demographics
            # ALSO: Skip items that are already pending (user hasn't answered them yet)
            emergency_items = []
            for dim in dimensions_with_zero_items:
                all_dim_items = tester.scorer.get_items_by_dimension(dim)
                # Get items NOT yet answered AND NOT excluded by demographics AND NOT already pending
                available = [
                    item for item in all_dim_items 
                    if item['item'] not in responses 
                    and item['item'] not in demographic_exclusions
                    and item['item'] not in pending_questions  # Don't re-add pending questions
                ]
                if available:
                    # Take top 2 highest correlation items
                    available.sort(key=lambda x: x['correlation'], reverse=True)
                    for item in available[:2]:
                        # Ensure dimension field is present
                        if 'dimension' not in item:
                            item['dimension'] = dim
                        emergency_items.append(item)
                    print(f"   Added {len(available[:2])} emergency items for {dim} (excluding demographic-filtered and already-pending items)")
                else:
                    print(f"   ⚠️ No non-demographic/non-pending items available for {dim} - using already-pending items if any exist")
            
            if emergency_items:
                # Use emergency items - these won't be filtered by demographics
                next_items = emergency_items
                is_emergency_mode = True
                print(f"   ✅ Recovered {len(next_items)} emergency questions")
                print(f"   These items are safe from demographic filtering")
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
    
    # Format questions
    next_questions = [
        {
            "id": q["item"],  # Use "item" field as the ID
            "text": q["text"],
            "dimension": q["dimension"],
            "type": "scale-slider",  # SELVE uses Likert scale (1-5)
            "isRequired": True,
            "renderConfig": {
                "min": 1,
                "max": 5,
                "step": 1,
                "labels": {
                    "1": "Strongly Disagree",
                    "2": "Disagree",
                    "3": "Neutral",
                    "4": "Agree",
                    "5": "Strongly Agree"
                }
            }
        }
        for q in next_items
    ]
    
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
    
    return SubmitAnswerResponse(
        next_questions=next_questions if next_questions else None,
        is_complete=len(next_questions) == 0,
        progress=progress,
        questions_answered=questions_answered,
        total_questions=estimated_total,
        can_go_back=len(responses) > 0,  # Can go back if answered any personality questions
    )


@router.post("/assessment/back", response_model=GetPreviousQuestionResponse)
async def go_back(request: GetPreviousQuestionRequest):
    """
    Go back to previous question in current batch.
    
    Allows users to review and edit their most recent answer within the current batch.
    Once they proceed to next batch, previous answers are locked.
    
    ⚠️ Warning shown: Going back may affect results accuracy
    """
    # Get session
    session = sessions.get(request.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    responses: Dict = session["responses"]
    current_batch: List = session.get("current_batch", [])
    tester: AdaptiveTester = session["tester"]
    
    # Can only go back within current batch
    if not responses:
        return GetPreviousQuestionResponse(
            question=None,
            current_answer=None,
            can_go_back=False,
            warning="No questions answered yet"
        )
    
    # Get the most recent answered question
    # Sort by the order they appear in current_batch
    answered_in_batch = [q_id for q_id in current_batch if q_id in responses]
    
    if not answered_in_batch:
        # They've moved to a new batch - can't go back
        return GetPreviousQuestionResponse(
            question=None,
            current_answer=None,
            can_go_back=False,
            warning="Previous batch locked. You can only edit questions in your current set."
        )
    
    # Get last answered question
    last_question_id = answered_in_batch[-1]
    current_answer = responses[last_question_id]
    
    # Find the full question object
    question_obj = None
    for dim in ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']:
        dim_items = tester.scorer.get_items_by_dimension(dim)
        for item in dim_items:
            if item['item'] == last_question_id:
                question_obj = {
                    "id": item["item"],
                    "text": item["text"],
                    "dimension": item["dimension"],
                    "type": "scale-slider",
                    "isRequired": True,
                    "renderConfig": {
                        "min": 1,
                        "max": 5,
                        "step": 1,
                        "labels": {
                            "1": "Strongly Disagree",
                            "2": "Disagree",
                            "3": "Neutral",
                            "4": "Agree",
                            "5": "Strongly Agree"
                        }
                    }
                }
                break
        if question_obj:
            break
    
    print(f"\n⬅️  BACK NAVIGATION - User reviewing question {last_question_id}")
    
    return GetPreviousQuestionResponse(
        question=question_obj,
        current_answer=current_answer,
        can_go_back=True,
        warning="⚠️ Changing previous answers may affect your results accuracy and consistency score."
    )


@router.get("/assessment/{session_id}/results", response_model=GetResultsResponse)
async def get_results(session_id: str):
    """
    Get complete assessment results with narrative.
    
    Returns:
    - scores: Dimension scores (0-100)
    - narrative: Complete psychological narrative
      - archetype: Personality archetype with personalized greeting
      - dimensions: Detailed dimension narratives
      - summary: Executive summary
    """
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
    
    # Score responses
    profile = scorer.score_responses(responses)
    
    # Get response validation
    validator: ResponseValidator = session.get("validator")
    validation_result = None
    if validator:
        validation_result = validator.validate_responses(responses)
    
    # Generate narrative using integrated OpenAI generator
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


@router.delete("/assessment/{session_id}")
async def delete_session(session_id: str):
    """
    Delete assessment session.
    
    Use after:
    - User completes assessment
    - Session expires
    - User wants to restart
    """
    if session_id in sessions:
        del sessions[session_id]
        return {"message": "Session deleted"}
    
    raise HTTPException(status_code=404, detail="Session not found")
