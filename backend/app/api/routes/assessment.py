"""
Assessment API Routes

Handles the complete assessment flow:
1. Start assessment
2. Get adaptive questions
3. Submit answers
4. Generate narrative results
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Any
from datetime import datetime

from app.adaptive_testing import AdaptiveTester
from app.scoring import SelveScorer
from app.narratives import generate_narrative

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
    response: int = Field(..., ge=1, le=5, description="Response value 1-5")


class SubmitAnswerResponse(BaseModel):
    """Response after submitting answer"""
    next_questions: Optional[List[Dict]] = None
    is_complete: bool
    progress: float
    questions_answered: int
    total_questions: int


class GetResultsResponse(BaseModel):
    """Complete assessment results with narrative"""
    session_id: str
    scores: Dict[str, float]
    narrative: Dict[str, Any]
    completed_at: str


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
    - total_questions: Estimated total (26-50 items)
    - progress: Initial progress (0.0)
    """
    # Generate session ID
    session_id = f"session_{datetime.now().timestamp()}"
    
    # Initialize adaptive tester
    tester = AdaptiveTester()
    
    # Get initial quick screen questions
    initial_questions = tester.quick_screen()
    
    # Store session
    sessions[session_id] = {
        "tester": tester,
        "scorer": SelveScorer(),
        "responses": {},
        "started_at": datetime.now().isoformat(),
        "user_id": request.user_id,
        "metadata": request.metadata or {},
    }
    
    # Format questions for frontend
    questions = [
        {
            "id": q["id"],
            "text": q["text"],
            "dimension": q["dimension"],
            "isRequired": True,
        }
        for q in initial_questions
    ]
    
    return StartAssessmentResponse(
        session_id=session_id,
        questions=questions,
        total_questions=50,  # Maximum possible
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
    
    tester: AdaptiveTester = session["tester"]
    responses: Dict = session["responses"]
    
    # Store response
    responses[request.question_id] = request.response
    
    # Check if we should continue testing
    should_continue, reason = tester.should_continue_testing(responses)
    
    if not should_continue:
        # Assessment complete
        return SubmitAnswerResponse(
            next_questions=None,
            is_complete=True,
            progress=1.0,
            questions_answered=len(responses),
            total_questions=len(responses),
        )
    
    # Get next adaptive questions
    next_items = tester.select_next_items(responses, max_items=3)
    
    # Format questions
    next_questions = [
        {
            "id": q["id"],
            "text": q["text"],
            "dimension": q["dimension"],
            "isRequired": True,
        }
        for q in next_items
    ]
    
    # Calculate progress (estimate based on typical completion)
    questions_answered = len(responses)
    estimated_total = 40  # Average completion point
    progress = min(questions_answered / estimated_total, 0.95)  # Cap at 95% until done
    
    return SubmitAnswerResponse(
        next_questions=next_questions if next_questions else None,
        is_complete=len(next_questions) == 0,
        progress=progress,
        questions_answered=questions_answered,
        total_questions=estimated_total,
    )


@router.get("/assessment/{session_id}/results", response_model=GetResultsResponse)
async def get_results(session_id: str):
    """
    Get complete assessment results with narrative.
    
    Returns:
    - scores: Dimension scores (0-100)
    - narrative: Complete psychological narrative
      - archetype: Personality archetype
      - dimensions: Detailed dimension narratives
      - summary: Executive summary
    """
    # Get session
    session = sessions.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    responses = session["responses"]
    scorer: SelveScorer = session["scorer"]
    
    # Check if complete
    tester: AdaptiveTester = session["tester"]
    should_continue, _ = tester.should_continue_testing(responses)
    
    if should_continue:
        raise HTTPException(
            status_code=400,
            detail="Assessment not complete. Continue answering questions.",
        )
    
    # Score responses
    profile = scorer.score_responses(responses)
    
    # Generate narrative
    narrative = generate_narrative(profile.dimension_scores)
    
    # Mark session as completed
    session["completed_at"] = datetime.now().isoformat()
    
    return GetResultsResponse(
        session_id=session_id,
        scores=profile.dimension_scores,
        narrative=narrative.to_dict(),
        completed_at=session["completed_at"],
    )


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
