"""
Newsletter API Routes

Handles newsletter subscriptions with:
- Subscribe (with duplicate detection)
- Unsubscribe
- Auto-linking to registered users
"""

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

from app.db import prisma
from app.services.mailgun_service import MailgunService

router = APIRouter(prefix="/api/newsletter", tags=["newsletter"])


class SubscribeRequest(BaseModel):
    """Request body for newsletter subscription"""
    email: EmailStr
    source: Optional[str] = "website"


class SubscribeResponse(BaseModel):
    """Response for subscription attempt"""
    success: bool
    message: str
    status: str  # "subscribed" | "already_subscribed" | "resubscribed" | "error"


class UnsubscribeRequest(BaseModel):
    """Request body for unsubscribe"""
    email: EmailStr


@router.post("/subscribe", response_model=SubscribeResponse)
async def subscribe_to_newsletter(request: Request, body: SubscribeRequest):
    """
    Subscribe to the SELVE newsletter
    
    Handles:
    - New subscriptions
    - Already subscribed (returns friendly message)
    - Re-subscriptions (previously unsubscribed)
    - Auto-links to existing user account by email
    """
    try:
        # Get client IP for tracking
        client_ip = request.client.host if request.client else None
        
        # Check if email already exists
        existing = await prisma.newslettersubscriber.find_unique(
            where={"email": body.email}
        )
        
        if existing:
            # Already subscribed and active
            if existing.status == "active":
                return SubscribeResponse(
                    success=True,
                    message="You're already subscribed! Check your inbox for our latest insights.",
                    status="already_subscribed"
                )
            
            # Previously unsubscribed - reactivate
            await prisma.newslettersubscriber.update(
                where={"email": body.email},
                data={
                    "status": "active",
                    "unsubscribedAt": None,
                    "subscribedAt": datetime.utcnow(),
                    "source": body.source,
                    "ipAddress": client_ip,
                }
            )
            
            # Send welcome back email
            try:
                mailgun = MailgunService()
                mailgun.send_newsletter_welcome_email(
                    to_email=body.email,
                    is_resubscribe=True
                )
            except Exception as e:
                print(f"Failed to send welcome back email: {e}")
            
            return SubscribeResponse(
                success=True,
                message="Welcome back! You've been resubscribed to our newsletter.",
                status="resubscribed"
            )
        
        # Check if this email belongs to an existing user
        user = await prisma.user.find_first(
            where={"email": body.email}
        )
        clerk_user_id = user.clerkId if user else None
        
        # Create new subscription
        await prisma.newslettersubscriber.create(
            data={
                "email": body.email,
                "clerkUserId": clerk_user_id,
                "status": "active",
                "source": body.source,
                "ipAddress": client_ip,
            }
        )
        
        # Send welcome email
        try:
            mailgun = MailgunService()
            mailgun.send_newsletter_welcome_email(
                to_email=body.email,
                is_resubscribe=False
            )
        except Exception as e:
            print(f"Failed to send newsletter welcome email: {e}")
        
        return SubscribeResponse(
            success=True,
            message="You're in! Check your inbox for a confirmation email.",
            status="subscribed"
        )
        
    except Exception as e:
        print(f"Newsletter subscription error: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to subscribe. Please try again later."
        )


@router.post("/unsubscribe")
async def unsubscribe_from_newsletter(body: UnsubscribeRequest):
    """
    Unsubscribe from the newsletter
    """
    try:
        existing = await prisma.newslettersubscriber.find_unique(
            where={"email": body.email}
        )
        
        if not existing:
            return {
                "success": True,
                "message": "Email not found in our list."
            }
        
        if existing.status == "unsubscribed":
            return {
                "success": True,
                "message": "You're already unsubscribed."
            }
        
        await prisma.newslettersubscriber.update(
            where={"email": body.email},
            data={
                "status": "unsubscribed",
                "unsubscribedAt": datetime.utcnow(),
            }
        )
        
        return {
            "success": True,
            "message": "You've been unsubscribed. We're sorry to see you go!"
        }
        
    except Exception as e:
        print(f"Newsletter unsubscribe error: {e}")
        raise HTTPException(
            status_code=500,
            detail="Failed to unsubscribe. Please try again later."
        )


async def link_user_to_newsletter(clerk_user_id: str, email: str):
    """
    Link a newly registered user to their newsletter subscription (if exists)
    
    Called when a user registers to connect their account to any existing
    newsletter subscription.
    
    Args:
        clerk_user_id: Clerk user ID
        email: User's email address
    """
    try:
        # Check if they're already subscribed
        existing = await prisma.newslettersubscriber.find_unique(
            where={"email": email}
        )
        
        if existing and not existing.clerkUserId:
            # Link the account
            await prisma.newslettersubscriber.update(
                where={"email": email},
                data={"clerkUserId": clerk_user_id}
            )
            print(f"Linked newsletter subscription to user: {clerk_user_id}")
            
    except Exception as e:
        print(f"Failed to link newsletter subscription: {e}")
        # Non-critical, don't raise


async def auto_subscribe_user(clerk_user_id: str, email: str, source: str = "signup"):
    """
    Auto-subscribe a new user to the newsletter
    
    Called during user registration. Users can unsubscribe later.
    
    Args:
        clerk_user_id: Clerk user ID
        email: User's email address
        source: Subscription source (e.g., "signup")
    """
    try:
        # Check if already subscribed
        existing = await prisma.newslettersubscriber.find_unique(
            where={"email": email}
        )
        
        if existing:
            # Just link the account if not already linked
            if not existing.clerkUserId:
                await prisma.newslettersubscriber.update(
                    where={"email": email},
                    data={"clerkUserId": clerk_user_id}
                )
            return
        
        # Create new subscription
        await prisma.newslettersubscriber.create(
            data={
                "email": email,
                "clerkUserId": clerk_user_id,
                "status": "active",
                "source": source,
            }
        )
        print(f"Auto-subscribed new user to newsletter: {email}")
        
    except Exception as e:
        print(f"Failed to auto-subscribe user: {e}")
        # Non-critical, don't raise
