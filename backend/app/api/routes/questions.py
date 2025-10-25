"""
Questions API routes
Handles adaptive questionnaire logic and question delivery
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.database import get_db
from app.models.schemas import (
    QuestionResponse,
    NextQuestionRequest,
    QuestionType,
)
from typing import Optional

router = APIRouter()


@router.get("/next-question")
async def get_next_question(
    sessionId: str,
    # db: AsyncSession = Depends(get_db)  # TODO: Uncomment when database tables are ready
) -> QuestionResponse:
    """
    Get the next question for a session using smart routing:
    - Demographic questions: Simple sequential order (fast)
    - Psychological questions: Adaptive algorithm (processes answers)
    """
    
    # TODO: PLACEHOLDER - Remove after implementing real logic
    # This is a simple test to verify the API works without database
    
    # Step 1: Get all answers for this session
    # TODO: Uncomment when QuestionnaireAnswer table exists
    # result = await db.execute(
    #     text("""
    #         SELECT "questionId", answer 
    #         FROM "QuestionnaireAnswer" 
    #         WHERE "sessionId" = :sessionId
    #         ORDER BY "createdAt" ASC
    #     """),
    #     {"sessionId": sessionId}
    # )
    # answered_questions = [row[0] for row in result.fetchall()]
    
    # For now, simulate no answered questions (fresh session)
    answered_questions = []
    answer_count = len(answered_questions)
    
    # Step 2: Simple placeholder logic - return next question in sequence
    # TODO: Replace this with actual database queries and adaptive logic
    
    placeholder_questions = [
        {
            "id": "q1_name",
            "text": "What is your first name?",
            "type": "text",
            "questionType": QuestionType.DEMOGRAPHIC,
            "placeholder": "Enter your first name",
            "required": True,
            "order": 1,
        },
        {
            "id": "q2_dob",
            "text": "What is your date of birth?",
            "type": "date",
            "questionType": QuestionType.DEMOGRAPHIC,
            "required": True,
            "order": 2,
        },
        {
            "id": "q3_email",
            "text": "What is your email address?",
            "type": "text",
            "questionType": QuestionType.DEMOGRAPHIC,
            "placeholder": "your@email.com",
            "required": True,
            "order": 3,
        },
        # Psychological questions start here - these will use adaptive logic
        {
            "id": "q4_social",
            "text": "I enjoy spending time in large social gatherings",
            "type": "pill_select",
            "questionType": QuestionType.PSYCHOLOGICAL,
            "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            "required": True,
            "order": 4,
        },
        {
            "id": "q5_routine",
            "text": "I prefer to have a structured daily routine",
            "type": "pill_select",
            "questionType": QuestionType.PSYCHOLOGICAL,
            "options": ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            "required": True,
            "order": 5,
        },
    ]
    
    # Find first unanswered question
    for question in placeholder_questions:
        if question["id"] not in answered_questions:
            # For demographic questions: return immediately (no processing)
            if question["questionType"] == QuestionType.DEMOGRAPHIC:
                return QuestionResponse(**question)
            
            # For psychological questions: run adaptive algorithm
            # TODO: Implement trait scoring and IRT-based question selection
            else:
                # Placeholder: just return the next question for now
                # Later: analyze previous answers, calculate trait scores, select optimal question
                return QuestionResponse(**question)
    
    # All questions answered
    raise HTTPException(
        status_code=404,
        detail="No more questions available for this session"
    )


@router.post("/answer")
async def save_answer(
    sessionId: str,
    questionId: str,
    answer: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Save an answer to the database
    Note: This might be handled by Next.js, but keeping it here for flexibility
    """
    
    # Save answer to database
    await db.execute(
        text("""
            INSERT INTO "QuestionnaireAnswer" ("sessionId", "questionId", "answer", "createdAt")
            VALUES (:sessionId, :questionId, :answer, NOW())
        """),
        {
            "sessionId": sessionId,
            "questionId": questionId,
            "answer": answer,
        }
    )
    await db.commit()
    
    return {"success": True, "message": "Answer saved"}
