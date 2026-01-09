"""
Internal API Routes
Endpoints for service-to-service communication (e.g., chat backend -> main backend)
Authenticated via X-Internal-Secret header
"""

import os
from typing import Optional
from fastapi import APIRouter, HTTPException, Header

import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../../..'))
from app.db import prisma

router = APIRouter(prefix="/internal", tags=["internal"])

INTERNAL_API_SECRET = os.getenv("INTERNAL_API_SECRET")


def verify_internal_secret(x_internal_secret: Optional[str] = Header(None)):
    """Verify the internal API secret header"""
    if not INTERNAL_API_SECRET:
        raise HTTPException(
            status_code=500,
            detail="Internal API not configured"
        )
    
    if not x_internal_secret or x_internal_secret != INTERNAL_API_SECRET:
        raise HTTPException(
            status_code=403,
            detail="Invalid or missing internal API secret"
        )


@router.get("/users/{clerk_user_id}")
async def get_user_internal(
    clerk_user_id: str,
    x_internal_secret: Optional[str] = Header(None)
):
    """
    Get user data for internal service communication
    
    **Headers Required**:
    - X-Internal-Secret: Internal API secret
    
    **Returns**:
    - User data including subscription info
    """
    verify_internal_secret(x_internal_secret)
    
    try:
        # Fetch user with profile
        user = await prisma.user.find_unique(
            where={"clerkId": clerk_user_id},
            include={"profile": True}
        )
        
        if not user:
            raise HTTPException(
                status_code=404,
                detail=f"User not found: {clerk_user_id}"
            )
        
        return {
            "clerkId": user.clerkId,
            "email": user.email,
            "name": user.name,
            "subscriptionPlan": user.subscriptionPlan or "free",
            "hasCompletedAssessment": user.profile is not None,
            "createdAt": user.createdAt.isoformat() if user.createdAt else None,
            "updatedAt": user.updatedAt.isoformat() if user.updatedAt else None,
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching user: {str(e)}"
        )
