"""
Stats API Routes

Public statistics endpoints for:
- Subscriber counts (newsletter)
- User counts
- Assessment counts
"""

from fastapi import APIRouter
from app.db import prisma

router = APIRouter(prefix="/api/stats", tags=["stats"])


@router.get("/subscribers")
async def get_subscriber_count():
    """
    Get newsletter subscriber count for social proof
    
    Returns count of active subscribers
    """
    try:
        count = await prisma.newslettersubscriber.count(
            where={"status": "active"}
        )
        
        return {"count": count}
        
    except Exception as e:
        print(f"Stats error: {e}")
        return {"count": 0}


@router.get("/users")
async def get_user_count():
    """
    Get total registered user count
    """
    try:
        count = await prisma.user.count(
            where={"isArchived": False}
        )
        
        return {"count": count}
        
    except Exception as e:
        print(f"Stats error: {e}")
        return {"count": 0}


@router.get("/assessments")
async def get_assessment_count():
    """
    Get total completed assessments count
    """
    try:
        count = await prisma.assessmentsession.count(
            where={"status": "completed"}
        )
        
        return {"count": count}
        
    except Exception as e:
        print(f"Stats error: {e}")
        return {"count": 0}
