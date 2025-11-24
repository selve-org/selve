"""
Friend Assessment Invite API Routes
Handles creating, managing, and tracking friend assessment invites
"""

import os
import json
from datetime import datetime, timedelta, timezone
from typing import Optional, List
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, EmailStr, Field
from prisma.errors import PrismaError

# Import services
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../../..'))
from app.db import prisma
from app.services.tier_service import TierService, enforce_invite_limits
from app.services.mailgun_service import MailgunService
from app.services.quality_scoring import QualityScoringService
from app.services.regeneration_service import RegenerationService
from app.services.notification_service import NotificationService

router = APIRouter(prefix="/invites", tags=["invites"])

# Initialize services
quality_service = QualityScoringService()
regeneration_service = RegenerationService()
notification_service = NotificationService()


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
        user = await prisma.user.find_unique(where={"clerkId": user_id})
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
            user_id=user.id,
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
                    # Use environment-aware URL
                    environment = os.getenv('ENVIRONMENT', 'development')
                    is_production = environment == 'production'
                    frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:3000')
                    base_url = "https://selve.me" if is_production else frontend_url
                    invite_url = f"{base_url}/invite/{existing_invite.inviteCode}"
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
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    
    # Create invite record in database
    try:
        invite = await prisma.invitelink.create(
            data={
                "inviteCode": invite_code,
                "inviterId": user.id,
                "friendEmail": invite_data.friend_email,
                "friendNickname": invite_data.friend_nickname,
                "relationshipType": invite_data.relationship_type,
                "status": "pending",
                "expiresAt": expires_at,
                "ipAddress": client_ip,
                "userAgent": user_agent,
                "createdAt": datetime.now(timezone.utc),
            }
        )
    except PrismaError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create invite: {str(e)}"
        )
    
    # Construct invite URL (environment-aware)
    environment = os.getenv('ENVIRONMENT', 'development')
    is_production = environment == 'production'
    frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:3000')
    base_url = "https://selve.me" if is_production else frontend_url
    invite_url = f"{base_url}/invite/{invite_code}"
    
    # Send email (non-blocking - don't fail if email fails)
    email_sent = False
    try:
        # Use nickname if provided and not empty, otherwise use email
        friend_display_name = (invite_data.friend_nickname.strip()
                               if invite_data.friend_nickname and invite_data.friend_nickname.strip()
                               else invite_data.friend_email)

        result = mailgun_service.send_invite_email(
            to_email=invite_data.friend_email,
            to_name=friend_display_name,
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
        if invite.expiresAt < datetime.now(timezone.utc):
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
                "openedAt": datetime.now(timezone.utc),
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
            data={"startedAt": datetime.now(timezone.utc)}
        )
        return {"message": "Invite marked as started"}
    except PrismaError as e:
        raise HTTPException(status_code=500, detail=f"Error updating invite: {str(e)}")


@router.get("/{invite_code}/questions")
async def get_friend_questions(invite_code: str):
    """
    Get friend assessment questions for a specific invite.
    Substitutes {Name} placeholder with inviter's name.
    
    **Returns**:
    - questions: List of questions with {Name} substituted
    - inviter_name: Name of person being assessed
    """
    try:
        # Get invite with inviter info
        invite = await prisma.invitelink.find_unique(
            where={"inviteCode": invite_code},
            include={"inviter": True}
        )
        
        if not invite:
            raise HTTPException(status_code=404, detail="Invite not found")
        
        # Validate invite status
        if invite.expiresAt < datetime.now(timezone.utc):
            raise HTTPException(status_code=410, detail="This invite has expired")
        
        if invite.status == "completed":
            raise HTTPException(status_code=410, detail="This invite has already been completed")
        
        # Load friend item pool
        with open('app/data/selve_friend_item_pool.json', 'r') as f:
            item_pool = json.load(f)
        
        # Get inviter's name
        inviter_name = invite.inviter.name or "your friend"
        
        # Flatten and substitute {Name}
        questions = []
        for dimension, items in item_pool.items():
            for item in items:
                # Replace {Name} with inviter name
                text = item['text'].replace('{Name}', inviter_name)
                # Capitalize first letter if sentence starts with "your friend"
                if text.startswith('your friend'):
                    text = 'Your friend' + text[11:]
                
                question = {
                    'item_id': item['item'],
                    'text': text,
                    'dimension': item['dimension'],
                    'reversed': item['reversed']
                }
                questions.append(question)
        
        return {
            'questions': questions,
            'inviter_name': inviter_name,
            'total_questions': len(questions)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading questions: {str(e)}")


class FriendResponseItem(BaseModel):
    """Single response item"""
    item_id: str
    value: int  # 1-5 Likert scale
    not_sure: bool = False
    response_time: int  # milliseconds


class FriendResponseSubmission(BaseModel):
    """Complete friend response submission"""
    responses: List[FriendResponseItem]
    total_time: int  # Total completion time in milliseconds
    privacy_accepted: bool = True
    
    class Config:
        json_schema_extra = {
            "example": {
                "responses": [
                    {"item_id": "lumen_1", "value": 4, "not_sure": False, "response_time": 5200},
                    {"item_id": "aether_1", "value": 3, "not_sure": False, "response_time": 4800}
                ],
                "total_time": 180000,
                "privacy_accepted": True
            }
        }


@router.post("/{invite_code}/responses")
async def submit_friend_responses(
    invite_code: str,
    submission: FriendResponseSubmission,
    request: Request
):
    """
    Submit friend assessment responses.
    
    **Process**:
    1. Validate invite (exists, not expired, not completed)
    2. Calculate quality score
    3. Store responses in database
    4. Update invite status
    5. Trigger profile regeneration
    6. Send notifications
    
    **Returns**:
    - success: Boolean
    - quality_score: Quality score (0-100)
    - message: Success message
    """
    try:
        # Get invite with inviter info
        invite = await prisma.invitelink.find_unique(
            where={"inviteCode": invite_code},
            include={"inviter": True}
        )
        
        if not invite:
            raise HTTPException(status_code=404, detail="Invite not found")
        
        # Validate invite status
        if invite.expiresAt < datetime.now(timezone.utc):
            raise HTTPException(status_code=410, detail="This invite has expired")
        
        if invite.status == "completed":
            raise HTTPException(
                status_code=409,
                detail="This invite has already been completed"
            )
        
        # Validate privacy acceptance
        if not submission.privacy_accepted:
            raise HTTPException(
                status_code=400,
                detail="Privacy policy must be accepted"
            )
        
        # Convert responses to dict format for quality scoring
        response_dicts = [
            {
                'item_id': r.item_id,
                'value': r.value,
                'not_sure': r.not_sure,
                'response_time': r.response_time
            }
            for r in submission.responses
        ]
        
        # Calculate quality score
        quality_score = quality_service.calculate_quality_score(
            responses=response_dicts,
            total_time=submission.total_time
        )
        
        print(f"✅ Quality score calculated: {quality_score}")
        
        # Get client metadata
        client_ip = get_client_ip(request)
        user_agent = request.headers.get("User-Agent", "unknown")
        
        # Store responses in database
        friend_response = await prisma.friendresponse.create(
            data={
                "inviteId": invite.id,
                "responses": response_dicts,  # Store as JSON
                "qualityScore": quality_score,
                "totalTime": submission.total_time,
                "completedAt": datetime.now(timezone.utc),
                "ipAddress": client_ip,
                "userAgent": user_agent
            }
        )
        
        print(f"✅ Friend response stored: {friend_response.id}")
        
        # Update invite status
        await prisma.invitelink.update(
            where={"inviteCode": invite_code},
            data={
                "completedAt": datetime.now(timezone.utc),
                "status": "completed"
            }
        )
        
        print(f"✅ Invite marked as completed")
        
        # Trigger profile regeneration (async, non-blocking)
        try:
            # Get user's self-assessment responses
            # TODO: Implement fetching user's assessment session responses
            # For now, we'll skip regeneration if no self-assessment exists
            print("⚠️  Profile regeneration: Fetching user assessment...")
            
            # Get user's assessment results
            user_assessment = await prisma.assessmentresult.find_first(
                where={
                    "clerkUserId": invite.inviter.clerkId,
                    "isCurrent": True
                },
                include={"session": True}
            )
            
            if user_assessment and user_assessment.session:
                # Get all friend responses for this user
                all_friend_responses = await prisma.friendresponse.find_many(
                    where={"invite": {"inviterId": invite.inviterId}},
                    include={"invite": True}
                )
                
                # Convert to format expected by regeneration service
                friend_response_data = [
                    {
                        'responses': fr.responses,
                        'quality_score': fr.qualityScore
                    }
                    for fr in all_friend_responses
                ]
                
                # Regenerate profile
                print(f"✅ Regenerating profile with {len(friend_response_data)} friend responses...")
                # TODO: Implement profile regeneration
                # await regeneration_service.regenerate_profile_with_friend_data(...)
                
            else:
                print("⚠️  User has not completed self-assessment yet. Skipping profile regeneration.")
        
        except Exception as e:
            print(f"⚠️  Profile regeneration failed: {str(e)}")
            # Don't fail the request if regeneration fails
        
        # Send notifications
        try:
            friend_name = invite.friendNickname or invite.friendEmail or "Your friend"
            await notification_service.notify_friend_completed(
                user_id=invite.inviter.clerkId,
                user_email=invite.inviter.email,
                friend_name=friend_name,
                invite_code=invite_code,
                db=prisma
            )
            print(f"✅ Notifications sent")
        except Exception as e:
            print(f"⚠️  Failed to send notifications: {str(e)}")
        
        return {
            "success": True,
            "quality_score": quality_score,
            "message": "Thank you for completing the assessment! Your responses have been recorded."
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error submitting friend responses: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Error submitting responses: {str(e)}"
        )


@router.post("/{invite_code}/mark-completed")
async def mark_invite_completed(invite_code: str):
    """
    DEPRECATED: Use POST /{invite_code}/responses instead.
    
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
                "completedAt": datetime.now(timezone.utc),
                "status": "completed"
            }
        )
        
        # Send completion notification email
        try:
            mailgun_service = MailgunService()
            friend_name = invite.friendNickname or invite.friendEmail or "Your friend"

            # Use environment-aware URL
            environment = os.getenv('ENVIRONMENT', 'development')
            is_production = environment == 'production'
            frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:3000')
            base_url = "https://selve.me" if is_production else frontend_url
            results_url = f"{base_url}/dashboard"  # TODO: Link to specific results page

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
