"""
User API Routes
Handles user sync, profile management, and Clerk webhooks
"""

import os
from typing import Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Request, Header
from pydantic import BaseModel, EmailStr, Field
from prisma import Prisma
from svix.webhooks import Webhook, WebhookVerificationError

import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../../..'))
from app.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["users"])
webhooks_router = APIRouter(prefix="/webhooks", tags=["webhooks"])

# Get Prisma client (shared global instance)
prisma = Prisma()


# Request/Response Models
class SyncUserRequest(BaseModel):
    """Request model for syncing a user"""
    clerkId: str = Field(..., description="Clerk user ID")
    email: EmailStr = Field(..., description="User's email address")
    name: Optional[str] = Field(None, description="User's full name")


class UpdateProfileRequest(BaseModel):
    """Request model for updating user profile"""
    demographics: Dict[str, Any] = Field(..., description="Demographic data")
    scores: Dict[str, float] = Field(..., description="Personality scores")
    narrative: Dict[str, Any] = Field(..., description="Generated narrative")


# Helper function to get user ID from header
def get_user_id(request: Request) -> str:
    """Extract user ID from request headers"""
    user_id = request.headers.get("X-User-ID")
    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Authentication required. Missing X-User-ID header."
        )
    return user_id


# API Endpoints
@router.post("/sync")
async def sync_user(
    request: Request,
    user_data: SyncUserRequest
):
    """
    Sync user from Clerk to database

    Creates a new user if they don't exist, or returns existing user.
    Idempotent operation - safe to call multiple times.

    **Headers Required**:
    - X-User-ID: Clerk user ID (for authentication)

    **Returns**:
    - success: Whether operation succeeded
    - user: User object
    - created: Whether a new user was created (true) or existing returned (false)
    """
    user_id = get_user_id(request)

    # Verify the requesting user matches the user being synced
    if user_id != user_data.clerkId:
        raise HTTPException(
            status_code=403,
            detail="Cannot sync a different user's account"
        )

    service = UserService(prisma)

    try:
        result = await service.sync_user_from_clerk(
            clerk_id=user_data.clerkId,
            email=user_data.email,
            name=user_data.name
        )
        return result

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error syncing user: {str(e)}"
        )


@router.get("/profile")
async def get_profile(request: Request):
    """
    Get user profile by Clerk ID

    **Headers Required**:
    - X-User-ID: Clerk user ID (for authentication)

    **Returns**:
    - User data with profile (if exists)
    """
    user_id = get_user_id(request)

    service = UserService(prisma)

    try:
        profile = await service.get_user_profile(clerk_id=user_id)

        if not profile:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        return profile

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching profile: {str(e)}"
        )


@router.put("/profile")
async def update_profile(
    request: Request,
    profile_data: UpdateProfileRequest
):
    """
    Update user profile after assessment completion

    **Headers Required**:
    - X-User-ID: Clerk user ID (for authentication)

    **Request Body**:
    - demographics: Demographic data (name, age, gender, country, dob)
    - scores: Personality dimension scores
    - narrative: Generated narrative content

    **Returns**:
    - success: Whether operation succeeded
    - profile: Updated profile data
    """
    user_id = get_user_id(request)

    service = UserService(prisma)

    try:
        result = await service.update_user_profile(
            clerk_id=user_id,
            demographics=profile_data.demographics,
            scores=profile_data.scores,
            narrative=profile_data.narrative
        )
        return result

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error updating profile: {str(e)}"
        )


@webhooks_router.post("/clerk")
async def clerk_webhook(request: Request):
    """
    Handle Clerk webhook events

    **Supported Events**:
    - user.created: Create new user in database
    - user.updated: Update user information
    - user.deleted: Delete user and cascade to related records

    **Security**:
    - Verifies webhook signature using Svix
    - Requires CLERK_WEBHOOK_SECRET environment variable

    **Idempotent**:
    - Safe to receive duplicate webhooks
    - Returns 200 for already processed events
    """
    # Get webhook secret from environment
    webhook_secret = os.getenv("CLERK_WEBHOOK_SECRET")

    if not webhook_secret:
        raise HTTPException(
            status_code=500,
            detail="CLERK_WEBHOOK_SECRET not configured"
        )

    # Get Svix headers
    svix_id = request.headers.get("svix-id")
    svix_timestamp = request.headers.get("svix-timestamp")
    svix_signature = request.headers.get("svix-signature")

    if not svix_id or not svix_timestamp or not svix_signature:
        raise HTTPException(
            status_code=400,
            detail="Missing svix headers"
        )

    # Get request body
    body_bytes = await request.body()
    body = body_bytes.decode("utf-8")

    # Verify webhook signature
    wh = Webhook(webhook_secret)

    try:
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        })
    except WebhookVerificationError as e:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid webhook signature: {str(e)}"
        )

    # Process webhook event
    event_type = evt.get("type")
    event_data = evt.get("data", {})

    service = UserService(prisma)

    try:
        if event_type == "user.created":
            # Extract user data
            clerk_id = event_data.get("id")
            email_addresses = event_data.get("email_addresses", [])

            # Get primary email
            primary_email_id = event_data.get("primary_email_address_id")
            primary_email = next(
                (e for e in email_addresses if e.get("id") == primary_email_id),
                None
            )

            if not primary_email:
                raise HTTPException(
                    status_code=400,
                    detail="No primary email found"
                )

            result = await service.handle_user_created(
                clerk_id=clerk_id,
                email=primary_email.get("email_address"),
                first_name=event_data.get("first_name"),
                last_name=event_data.get("last_name"),
                image_url=event_data.get("image_url")
            )

            print(f"✅ Clerk webhook: User created - {clerk_id}")
            return result

        elif event_type == "user.updated":
            # Extract user data
            clerk_id = event_data.get("id")
            email_addresses = event_data.get("email_addresses", [])

            # Get primary email
            primary_email_id = event_data.get("primary_email_address_id")
            primary_email = next(
                (e for e in email_addresses if e.get("id") == primary_email_id),
                None
            )

            if not primary_email:
                raise HTTPException(
                    status_code=400,
                    detail="No primary email found"
                )

            result = await service.handle_user_updated(
                clerk_id=clerk_id,
                email=primary_email.get("email_address"),
                first_name=event_data.get("first_name"),
                last_name=event_data.get("last_name"),
                image_url=event_data.get("image_url")
            )

            print(f"✅ Clerk webhook: User updated - {clerk_id}")
            return result

        elif event_type == "user.deleted":
            clerk_id = event_data.get("id")

            if not clerk_id:
                raise HTTPException(
                    status_code=400,
                    detail="No user ID in delete event"
                )

            result = await service.handle_user_deleted(clerk_id=clerk_id)

            print(f"✅ Clerk webhook: User deleted - {clerk_id}")
            return result

        else:
            # Unhandled event type - return success to prevent retries
            print(f"ℹ️ Unhandled webhook event: {event_type}")
            return {
                "success": True,
                "message": f"Unhandled event type: {event_type}"
            }

    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error processing webhook {event_type}: {str(e)}")

        # Return 200 for duplicate/constraint errors to prevent retries
        if "Unique constraint" in str(e) or "P2002" in str(e):
            print("ℹ️ Duplicate webhook - already processed")
            return {
                "success": True,
                "message": "Already processed"
            }

        # Return 500 for other errors to trigger retry
        raise HTTPException(
            status_code=500,
            detail=f"Error processing webhook: {str(e)}"
        )
