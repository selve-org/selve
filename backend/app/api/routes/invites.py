"""
Friend Assessment Invite API Routes
Handles creating, managing, and tracking friend assessment invites
"""

import os
from datetime import datetime, timedelta
from typing import Optional
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, EmailStr, Field
from prisma import Prisma
from prisma.errors import PrismaError

# Import services
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../../..'))
from app.services.tier_service import TierService, enforce_invite_limits
from app.services.mailgun_service import MailgunService

router = APIRouter(prefix="/invites", tags=["invites"])

# Get Prisma client (shared global instance)
prisma = Prisma()


class CreateInviteRequest(BaseModel):
    """Request model for creating a friend invite"""
    friend_email: EmailStr = Field(..., description="Friend's email address")
    friend_nickname: Optional[str] = Field(None, max_length=100, description="Friend's nickname (optional)")
    relationship_type: str = Field(..., description="Relationship type: friend, sibling, parent, partner, coworker")

    class Config:
        json_schema_extra = {
            "example": {
                "friend_email": "jane@example.com",
                "friend_nickname": "Jane",
                "relationship_type": "friend"
            }
        }


class CreateInviteResponse(BaseModel):
    """Response model for created invite"""
    invite_code: str
    invite_url: str
    expires_at: datetime
    remaining_invites: int
    email_sent: bool
    message: str


def get_client_ip(request: Request) -> str:
    """Extract client IP address from request"""
    # Check for X-Forwarded-For header (when behind proxy)
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        # Take the first IP in the chain
        return forwarded_for.split(",")[0].strip()
    
    # Check for X-Real-IP header
    real_ip = request.headers.get("X-Real-IP")
    if real_ip:
        return real_ip.strip()
    
    # Fallback to direct client host
    if request.client:
        return request.client.host
    
    return "unknown"


def generate_invite_code() -> str:
    """
    Generate a secure 28-character invite code
    Uses NanoID algorithm for URL-safe random strings
    """
    from nanoid import generate
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'
    return generate(alphabet, 28)


@router.get("")
async def list_invites(request: Request):
    """
    List all invites for authenticated user with remaining count

    **Headers Required**:
    - X-User-ID: User's Clerk ID

    **Returns**:
    - invites: List of invite objects (ordered by createdAt desc)
    - remaining_invites: Number of remaining invites in user's quota
    - tier: User's current tier (free or premium)
    """
    # Get user ID from header
    user_id = request.headers.get("X-User-ID")
    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Authentication required. Please sign in to view invites."
        )

    try:
        # Get user from database to verify they exist
        user = await prisma.user.find_unique(where={"clerkId": user_id})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Fetch user's invites
        invites = await prisma.invitelink.find_many(
            where={"inviterId": user.id},
            order={"createdAt": "desc"}
        )

        # Calculate remaining invites using TierService
        tier_service = TierService(prisma)
        tier = await tier_service.get_user_tier(user.id)
        remaining = await tier_service.get_remaining_invites(user.id)

        return {
            "invites": invites,
            "remaining_invites": remaining,
            "tier": tier
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching invites: {str(e)}"
        )


@router.post("/create", response_model=CreateInviteResponse)
async def create_invite(
    request: Request,
    invite_data: CreateInviteRequest
):
    """
    Create a new friend assessment invite
    
    **Security Features**:
    - Tier-based limits (Free: 3 invites, Premium: 999 invites)
    - Rate limiting (Free: 5/hour, Premium: 20/hour)
    - IP abuse detection (20 invites/24hrs)
    - Duplicate email checking
    - Self-invite prevention
    - 7-day automatic expiration
    
    **Email Integration**:
    - Sends HTML invite email via Mailgun
    - Non-blocking (invite succeeds even if email fails)
    - Tracking: opens, clicks, analytics
    
    **Returns**:
    - invite_code: 28-character secure code
    - invite_url: Full URL for sharing
    - expires_at: Expiration timestamp
    - remaining_invites: Remaining quota
    - email_sent: Whether email was delivered
    """
    
    # Get user ID from header (passed by Next.js API route)
    user_id = request.headers.get("X-User-ID")
    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Authentication required. Please sign in to send invites."
        )
    
    # Get client IP and user agent
    client_ip = get_client_ip(request)
    user_agent = request.headers.get("User-Agent", "unknown")
    
    # Get user info from database
    try:
        user = await prisma.user.find_unique(where={"id": user_id})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
    except PrismaError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    
    # Prevent self-invite
    if invite_data.friend_email.lower() == user.email.lower():
        raise HTTPException(
            status_code=400,
            detail="You cannot invite yourself. Please enter a different email address."
        )
    
    # Validate relationship type
    valid_relationships = ["friend", "sibling", "parent", "partner", "coworker"]
    if invite_data.relationship_type not in valid_relationships:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid relationship type. Must be one of: {', '.join(valid_relationships)}"
        )
    
    # Initialize services
    tier_service = TierService(prisma)
    mailgun_service = MailgunService()
    
    # Check all invite limits (tier quota, rate limiting, IP abuse)
    try:
        limits_check = await enforce_invite_limits(
            prisma=prisma,
            user_id=user_id,
            friend_email=invite_data.friend_email,
            ip_address=client_ip
        )
        
        # Handle different limit violations
        if not limits_check["allowed"]:
            if "tier limit" in limits_check["reason"].lower():
                raise HTTPException(
                    status_code=403,
                    detail=limits_check["reason"] + " Upgrade to Premium for unlimited invites."
                )
            elif "rate limit" in limits_check["reason"].lower():
                raise HTTPException(
                    status_code=429,
                    detail=limits_check["reason"]
                )
            elif "ip address" in limits_check["reason"].lower():
                raise HTTPException(
                    status_code=429,
                    detail=limits_check["reason"] + " Please try again later."
                )
            elif "duplicate" in limits_check["reason"].lower():
                # Return existing invite code
                existing_invite = limits_check.get("existing_invite")
                if existing_invite:
                    invite_url = f"https://selve.me/invite/{existing_invite.inviteCode}"
                    return CreateInviteResponse(
                        invite_code=existing_invite.inviteCode,
                        invite_url=invite_url,
                        expires_at=existing_invite.expiresAt,
                        remaining_invites=limits_check.get("remaining_invites", 0),
                        email_sent=False,
                        message="You've already invited this person. Here's the existing invite link."
                    )
            else:
                raise HTTPException(status_code=403, detail=limits_check["reason"])
                
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Error checking limits: {str(e)}")
    
    # Generate invite code
    invite_code = generate_invite_code()
    
    # Set expiration (7 days from now)
    expires_at = datetime.utcnow() + timedelta(days=7)
    
    # Create invite record in database
    try:
        invite = await prisma.invitelink.create(
            data={
                "inviteCode": invite_code,
                "inviterId": user_id,
                "friendEmail": invite_data.friend_email,
                "friendNickname": invite_data.friend_nickname,
                "relationshipType": invite_data.relationship_type,
                "status": "pending",
                "expiresAt": expires_at,
                "ipAddress": client_ip,
                "userAgent": user_agent,
                "createdAt": datetime.utcnow(),
            }
        )
    except PrismaError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create invite: {str(e)}"
        )
    
    # Construct invite URL
    invite_url = f"https://selve.me/invite/{invite_code}"
    
    # Send email (non-blocking - don't fail if email fails)
    email_sent = False
    try:
        result = mailgun_service.send_invite_email(
            to_email=invite_data.friend_email,
            to_name=invite_data.friend_nickname or invite_data.friend_email,
            inviter_name=user.name or user.email,
            invite_code=invite_code,
            relationship_type=invite_data.relationship_type
        )
        email_sent = True
        print(f"✅ Email sent successfully. Message ID: {result.get('id')}")
    except Exception as e:
        print(f"⚠️  Email failed to send: {str(e)}")
        print("Invite created successfully, but email delivery failed.")
        print("User can still copy and share the invite link manually.")
    
    # Get remaining invites
    remaining_invites = limits_check.get("remaining_invites", 0)
    
    # Return response
    return CreateInviteResponse(
        invite_code=invite_code,
        invite_url=invite_url,
        expires_at=expires_at,
        remaining_invites=remaining_invites,
        email_sent=email_sent,
        message="Invite created successfully!" if email_sent else "Invite created. Email failed - please share the link manually."
    )


@router.get("/{invite_code}")
async def get_invite(invite_code: str):
    """
    Get invite details (for preamble page)
    
    **Validates**:
    - Invite code exists
    - Not expired
    - Not already completed
    - Not revoked
    """
    try:
        invite = await prisma.invitelink.find_unique(
            where={"inviteCode": invite_code},
            include={"inviter": True}
        )
        
        if not invite:
            raise HTTPException(status_code=404, detail="Invite not found")
        
        # Check if expired
        if invite.expiresAt < datetime.utcnow():
            raise HTTPException(status_code=410, detail="This invite has expired")
        
        # Check if already completed
        if invite.status == "completed":
            raise HTTPException(status_code=410, detail="This invite has already been completed")
        
        # Check if revoked
        if invite.status == "revoked":
            raise HTTPException(status_code=410, detail="This invite has been revoked")
        
        # Return invite details
        return {
            "inviter_name": invite.inviter.name or invite.inviter.email,
            "relationship_type": invite.relationshipType,
            "status": invite.status,
            "expires_at": invite.expiresAt,
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching invite: {str(e)}")


@router.post("/{invite_code}/mark-opened")
async def mark_invite_opened(invite_code: str, request: Request):
    """
    Mark invite as opened (analytics tracking)
    Called when friend visits the preamble page
    """
    client_ip = get_client_ip(request)
    device_type = "mobile" if "mobile" in request.headers.get("User-Agent", "").lower() else "desktop"
    
    try:
        await prisma.invitelink.update(
            where={"inviteCode": invite_code},
            data={
                "openedAt": datetime.utcnow(),
                "deviceType": device_type,
            }
        )
        return {"message": "Invite marked as opened"}
    except PrismaError as e:
        raise HTTPException(status_code=500, detail=f"Error updating invite: {str(e)}")


@router.post("/{invite_code}/mark-started")
async def mark_invite_started(invite_code: str):
    """
    Mark invite as started (analytics tracking)
    Called when friend clicks "Start Assessment"
    """
    try:
        await prisma.invitelink.update(
            where={"inviteCode": invite_code},
            data={"startedAt": datetime.utcnow()}
        )
        return {"message": "Invite marked as started"}
    except PrismaError as e:
        raise HTTPException(status_code=500, detail=f"Error updating invite: {str(e)}")


@router.post("/{invite_code}/mark-completed")
async def mark_invite_completed(invite_code: str):
    """
    Mark invite as completed
    Called when friend finishes assessment
    Triggers completion notification email to inviter
    """
    try:
        # Get invite with inviter info
        invite = await prisma.invitelink.find_unique(
            where={"inviteCode": invite_code},
            include={"inviter": True}
        )
        
        if not invite:
            raise HTTPException(status_code=404, detail="Invite not found")
        
        # Update invite status
        await prisma.invitelink.update(
            where={"inviteCode": invite_code},
            data={
                "completedAt": datetime.utcnow(),
                "status": "completed"
            }
        )
        
        # Send completion notification email
        try:
            mailgun_service = MailgunService()
            friend_name = invite.friendNickname or invite.friendEmail or "Your friend"
            results_url = "https://selve.me/dashboard"  # TODO: Link to specific results page
            
            mailgun_service.send_completion_notification(
                to_email=invite.inviter.email,
                to_name=invite.inviter.name or invite.inviter.email,
                friend_name=friend_name,
                results_url=results_url
            )
            print(f"✅ Completion notification sent to {invite.inviter.email}")
        except Exception as e:
            print(f"⚠️  Failed to send completion notification: {str(e)}")
        
        return {"message": "Invite marked as completed"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error completing invite: {str(e)}")
