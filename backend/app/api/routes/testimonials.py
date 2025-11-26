"""
Testimonials API Routes
Handles "Share Your Story" feature for user testimonials
"""

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime
from app.db import prisma

# Simple sentiment analysis using textblob (lighter than full sentiment package)
# Falls back to basic keyword matching if textblob not available
try:
    from textblob import TextBlob
    HAS_TEXTBLOB = True
except ImportError:
    HAS_TEXTBLOB = False

router = APIRouter()


# ============================================================================
# Pydantic Models
# ============================================================================

class TestimonialCreate(BaseModel):
    """Request model for creating a testimonial"""
    firstName: str = Field(..., min_length=1, max_length=50, description="First name (required)")
    lastName: Optional[str] = Field(None, max_length=50, description="Last name (optional)")
    message: str = Field(..., min_length=20, max_length=1000, description="Testimonial message (required)")
    role: Optional[str] = Field(None, max_length=100, description="Job role (optional)")
    company: Optional[str] = Field(None, max_length=100, description="Company name (optional)")
    email: Optional[str] = Field(None, max_length=255, description="Email for follow-up (optional)")
    rating: Optional[int] = Field(None, ge=1, le=5, description="Rating 1-5 (optional)")
    userId: Optional[str] = Field(None, description="Clerk user ID if authenticated")

    @validator('firstName', 'lastName', 'role', 'company')
    def strip_whitespace(cls, v):
        if v:
            return v.strip()
        return v

    @validator('message')
    def validate_message(cls, v):
        if v:
            v = v.strip()
            if len(v) < 20:
                raise ValueError('Message must be at least 20 characters')
        return v


class TestimonialResponse(BaseModel):
    """Response model for a testimonial"""
    id: str
    firstName: str
    lastInitial: Optional[str]  # Only show initial of last name
    displayRole: Optional[str]  # Combined role + company
    message: str
    rating: Optional[int]
    createdAt: datetime


class TestimonialsListResponse(BaseModel):
    """Response model for list of testimonials"""
    testimonials: List[TestimonialResponse]
    total: int
    hasRealTestimonials: bool  # Frontend uses this to know if placeholders should hide


# ============================================================================
# Sentiment Analysis
# ============================================================================

def analyze_sentiment(text: str) -> tuple[float, str]:
    """
    Analyze sentiment of text.
    Returns (score, label) where:
    - score: -1.0 to 1.0 (negative to positive)
    - label: "positive" | "neutral" | "negative"
    """
    if HAS_TEXTBLOB:
        blob = TextBlob(text)
        score = blob.sentiment.polarity  # -1 to 1
        
        if score > 0.1:
            label = "positive"
        elif score < -0.1:
            label = "negative"
        else:
            label = "neutral"
        
        return score, label
    
    # Fallback: Simple keyword-based sentiment
    positive_words = [
        'great', 'amazing', 'love', 'excellent', 'helpful', 'insightful', 
        'accurate', 'fantastic', 'wonderful', 'best', 'recommend', 'changed',
        'game-changer', 'eye-opening', 'revealing', 'enlightening', 'powerful',
        'awesome', 'incredible', 'perfect', 'useful', 'valuable'
    ]
    negative_words = [
        'bad', 'terrible', 'awful', 'useless', 'waste', 'disappointed',
        'inaccurate', 'wrong', 'poor', 'horrible', 'worst', 'hate'
    ]
    
    text_lower = text.lower()
    positive_count = sum(1 for word in positive_words if word in text_lower)
    negative_count = sum(1 for word in negative_words if word in text_lower)
    
    if positive_count > negative_count:
        score = min(1.0, positive_count * 0.2)
        label = "positive"
    elif negative_count > positive_count:
        score = max(-1.0, -negative_count * 0.2)
        label = "negative"
    else:
        score = 0.0
        label = "neutral"
    
    return score, label


def format_display_role(role: Optional[str], company: Optional[str]) -> Optional[str]:
    """Format role and company for display"""
    if role and company:
        return f"{role} at {company}"
    elif role:
        return role
    elif company:
        return f"at {company}"
    return None


# ============================================================================
# API Endpoints
# ============================================================================

@router.post("/testimonials", response_model=dict)
async def create_testimonial(data: TestimonialCreate):
    """
    Submit a new testimonial.
    Testimonials are NOT automatically approved - they need manual review.
    Positive sentiment testimonials may be auto-approved in the future.
    """
    # Analyze sentiment
    sentiment_score, sentiment_label = analyze_sentiment(data.message)
    
    # Auto-approve only clearly positive testimonials (score > 0.3)
    # This is a simple heuristic - can be adjusted or made manual-only
    auto_approve = sentiment_label == "positive" and sentiment_score > 0.3
    
    try:
        testimonial = await prisma.testimonial.create(
            data={
                "firstName": data.firstName,
                "lastName": data.lastName,
                "message": data.message,
                "role": data.role,
                "company": data.company,
                "email": data.email,
                "rating": data.rating,
                "userId": data.userId,
                "sentimentScore": sentiment_score,
                "sentimentLabel": sentiment_label,
                "isApproved": auto_approve,
                "isPlaceholder": False,
            }
        )
        
        return {
            "success": True,
            "id": testimonial.id,
            "isAutoApproved": auto_approve,
            "message": "Thank you for sharing your story!" if auto_approve 
                       else "Thank you! Your story will appear after review."
        }
        
    except Exception as e:
        print(f"Error creating testimonial: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit testimonial")


@router.get("/testimonials", response_model=TestimonialsListResponse)
async def get_testimonials(
    limit: int = Query(default=10, ge=1, le=50, description="Number of testimonials to return"),
    include_placeholders: bool = Query(default=True, description="Include placeholder testimonials")
):
    """
    Get approved testimonials for display on homepage.
    Returns real testimonials first, then placeholders if needed.
    """
    try:
        # First, get count of real (non-placeholder) approved testimonials
        real_count = await prisma.testimonial.count(
            where={
                "isApproved": True,
                "isPlaceholder": False,
            }
        )
        
        # Build query conditions
        where_clause = {"isApproved": True}
        
        # If we have real testimonials and don't want placeholders, exclude them
        if not include_placeholders and real_count > 0:
            where_clause["isPlaceholder"] = False
        
        # Fetch testimonials, prioritizing real ones
        testimonials = await prisma.testimonial.find_many(
            where=where_clause,
            order=[
                {"isPlaceholder": "asc"},  # Real testimonials first
                {"createdAt": "desc"},      # Newest first
            ],
            take=limit,
        )
        
        # If we have real testimonials, limit placeholders
        # Only show placeholders to fill up to desired count
        if real_count > 0 and include_placeholders:
            # Keep only real ones + enough placeholders to reach limit
            real_testimonials = [t for t in testimonials if not t.isPlaceholder]
            placeholder_testimonials = [t for t in testimonials if t.isPlaceholder]
            
            # How many placeholders do we need?
            placeholders_needed = max(0, limit - len(real_testimonials))
            testimonials = real_testimonials + placeholder_testimonials[:placeholders_needed]
        
        # Format response
        formatted = []
        for t in testimonials:
            formatted.append(TestimonialResponse(
                id=t.id,
                firstName=t.firstName,
                lastInitial=t.lastName[0].upper() if t.lastName else None,
                displayRole=format_display_role(t.role, t.company),
                message=t.message,
                rating=t.rating,
                createdAt=t.createdAt,
            ))
        
        return TestimonialsListResponse(
            testimonials=formatted,
            total=len(formatted),
            hasRealTestimonials=real_count > 0,
        )
        
    except Exception as e:
        print(f"Error fetching testimonials: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch testimonials")


@router.get("/testimonials/seed-placeholders")
async def seed_placeholder_testimonials():
    """
    Seed placeholder testimonials for initial display.
    Only works if no testimonials exist yet.
    """
    # Check if we already have testimonials
    count = await prisma.testimonial.count()
    if count > 0:
        return {"message": f"Testimonials already exist ({count} total)", "seeded": False}
    
    placeholders = [
        {
            "firstName": "Alex",
            "lastName": "Rodriguez",
            "message": "SELVE felt like talking to a wise friend who also happened to be a data scientist. The triangulation of feedback from my peers was a game-changer for my self-awareness.",
            "role": "Product Manager",
            "company": None,
            "sentimentScore": 0.8,
            "sentimentLabel": "positive",
            "isPlaceholder": True,
            "isApproved": True,
        },
        {
            "firstName": "Jordan",
            "lastName": "Thompson",
            "message": "I've tried every personality test out there. SELVE is the first one that felt dynamic and truly personalized. It's less about putting you in a box and more about giving you a compass.",
            "role": "UX Designer",
            "company": None,
            "sentimentScore": 0.7,
            "sentimentLabel": "positive",
            "isPlaceholder": True,
            "isApproved": True,
        },
    ]
    
    created = []
    for placeholder in placeholders:
        testimonial = await prisma.testimonial.create(data=placeholder)
        created.append(testimonial.id)
    
    return {
        "message": f"Seeded {len(created)} placeholder testimonials",
        "seeded": True,
        "ids": created,
    }
