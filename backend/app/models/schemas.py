"""
Pydantic models for API request/response validation
These define the contract between Next.js frontend and FastAPI backend
"""

from pydantic import BaseModel, Field
from typing import Optional, List, Any
from datetime import datetime
from enum import Enum


class QuestionType(str, Enum):
    """Question types - determines processing logic"""
    DEMOGRAPHIC = "demographic"  # Simple sequential (name, DOB, etc.)
    PSYCHOLOGICAL = "psychological"  # Adaptive algorithm (trait questions)
    TEXT = "text"
    MULTIPLE_CHOICE = "multiple_choice"
    PILL_SELECT = "pill_select"
    DATE = "date"
    TEXTAREA = "textarea"


class QuestionResponse(BaseModel):
    """Response schema for a single question"""
    id: str
    text: str
    type: str  # matches QuestionRenderer input types
    questionType: QuestionType  # demographic vs psychological
    options: Optional[List[str]] = None
    placeholder: Optional[str] = None
    required: bool = True
    order: int
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "q1",
                "text": "What is your first name?",
                "type": "text",
                "questionType": "demographic",
                "required": True,
                "order": 1,
            }
        }


class NextQuestionRequest(BaseModel):
    """Request to get the next question in the flow"""
    sessionId: str = Field(..., description="Questionnaire session ID")


class AnswerValue(BaseModel):
    """Flexible answer value - can be string, number, list, etc."""
    value: Any


class AnswerRequest(BaseModel):
    """Request to save an answer"""
    sessionId: str
    questionId: str
    answer: Any  # Flexible: string, number, list, date, etc.
    
    class Config:
        json_schema_extra = {
            "example": {
                "sessionId": "session_123",
                "questionId": "q1",
                "answer": "John Doe",
            }
        }


class TraitScore(BaseModel):
    """Individual trait score"""
    trait: str  # e.g., "openness", "conscientiousness"
    score: float  # 0-100
    confidence: float  # 0-1 (how certain we are)


class PersonalityProfileResponse(BaseModel):
    """Complete personality analysis result"""
    sessionId: str
    userId: Optional[str] = None
    archetype: Optional[str] = None  # Lion, Owl, Dove, etc.
    traitScores: List[TraitScore]
    summary: Optional[str] = None
    completedAt: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "sessionId": "session_123",
                "userId": "user_456",
                "archetype": "Lion",
                "traitScores": [
                    {"trait": "openness", "score": 78.5, "confidence": 0.92},
                    {"trait": "conscientiousness", "score": 65.2, "confidence": 0.88},
                ],
                "summary": "You exhibit strong leadership qualities...",
                "completedAt": "2025-10-25T12:00:00Z",
            }
        }


class AnalysisRequest(BaseModel):
    """Request to trigger personality analysis"""
    sessionId: str = Field(..., description="Completed questionnaire session")
    generateReport: bool = Field(True, description="Whether to generate AI report")


class ErrorResponse(BaseModel):
    """Standard error response"""
    error: str
    detail: Optional[str] = None
    code: Optional[str] = None
