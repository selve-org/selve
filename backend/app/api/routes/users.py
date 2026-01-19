"""
User API Routes
Handles user sync, profile management, and Clerk webhooks
"""

import os
from typing import Optional, Dict, Any
from datetime import datetime
from fastapi import APIRouter, HTTPException, Request, UploadFile, File
from pydantic import BaseModel, EmailStr, Field
from svix.webhooks import Webhook, WebhookVerificationError
import hashlib
import uuid
from vercel_blob import put
import httpx

import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../../..'))
from app.db import prisma
from app.services.user_service import UserService
from app.services.subscription_service import SubscriptionService, get_plan_features

router = APIRouter(prefix="/users", tags=["users"])
webhooks_router = APIRouter(prefix="/webhooks", tags=["webhooks"])


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


# Helper function to sync user data to chat backend
async def sync_to_chat_backend(clerk_id: str, name: Optional[str] = None, profile_picture: Optional[str] = None):
    """
    Sync user data to the chat backend database
    
    Args:
        clerk_id: Clerk user ID
        name: Updated name (optional)
        profile_picture: Updated profile picture URL (optional)
    """
    try:
        chat_backend_url = os.getenv("CHAT_BACKEND_URL", "http://localhost:9000")
        
        # Prepare update data
        update_data = {}
        if name is not None:
            update_data["name"] = name
        if profile_picture is not None:
            update_data["profile_picture"] = profile_picture
        
        if not update_data:
            return  # Nothing to sync
        
        # Send sync request to chat backend
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.post(
                f"{chat_backend_url}/api/users/sync",
                json={
                    "clerk_id": clerk_id,
                    **update_data
                },
                headers={"X-User-ID": clerk_id}
            )
            
            if response.status_code != 200:
                print(f"Warning: Failed to sync to chat backend: {response.status_code}")
                
    except Exception as e:
        # Log but don't fail the main operation
        print(f"Warning: Failed to sync to chat backend: {str(e)}")


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


@router.get("/theme")
async def get_theme_preference(request: Request):
    """
    Get user's theme preference

    **Headers Required**:
    - X-User-ID: Clerk user ID (for authentication)

    **Returns**:
    - theme: "light" | "dark" | "system" | null
    """
    user_id = get_user_id(request)

    try:
        user = await prisma.user.find_unique(
            where={"clerkId": user_id},
            include={"profile": False}
        )

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        return {"theme": user.themePreference}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching theme preference: {str(e)}"
        )


@router.put("/theme")
async def update_theme_preference(request: Request):
    """
    Update user's theme preference

    **Headers Required**:
    - X-User-ID: Clerk user ID (for authentication)

    **Request Body**:
    - theme: "light" | "dark" | "system"

    **Returns**:
    - theme: Updated theme preference
    """
    user_id = get_user_id(request)

    try:
        body = await request.json()
        theme = body.get("theme")

        if theme not in ["light", "dark", "system", None]:
            raise HTTPException(
                status_code=400,
                detail="Invalid theme. Must be 'light', 'dark', or 'system'"
            )

        user = await prisma.user.update(
            where={"clerkId": user_id},
            data={"themePreference": theme}
        )

        return {"theme": user.themePreference}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error updating theme preference: {str(e)}"
        )


@router.put("/name")
async def update_name(request: Request):
    """
    Update user's name with audit trail
    
    **Headers Required**:
    - X-User-ID: Clerk user ID (for authentication)
    
    **Request Body**:
    - name: New name (1-100 characters)
    
    **Returns**:
    - name: Updated name
    - success: Whether operation succeeded
    """
    user_id = get_user_id(request)
    
    try:
        body = await request.json()
        new_name = body.get("name", "").strip()
        
        # Validate name
        if not new_name:
            raise HTTPException(
                status_code=400,
                detail="Name cannot be empty"
            )
        
        if len(new_name) > 100:
            raise HTTPException(
                status_code=400,
                detail="Name must be 100 characters or less"
            )
        
        # Get current user
        user = await prisma.user.find_unique(
            where={"clerkId": user_id}
        )
        
        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )
        
        # Get IP and user agent for audit
        ip_address = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")
        
        # Create audit record
        await prisma.namechangeaudit.create(
            data={
                "userId": user.id,
                "oldName": user.name,
                "newName": new_name,
                "ipAddress": ip_address,
                "userAgent": user_agent
            }
        )
        
        # Update user name
        updated_user = await prisma.user.update(
            where={"clerkId": user_id},
            data={"name": new_name}
        )
        
        # Update Clerk user metadata
        clerk_secret_key = os.environ.get("CLERK_SECRET_KEY")
        if clerk_secret_key:
            try:
                # Split name into first and last name
                name_parts = new_name.strip().split(maxsplit=1)
                first_name = name_parts[0] if name_parts else new_name
                last_name = name_parts[1] if len(name_parts) > 1 else ""
                
                async with httpx.AsyncClient() as client:
                    clerk_response = await client.patch(
                        f"https://api.clerk.com/v1/users/{user_id}",
                        headers={
                            "Authorization": f"Bearer {clerk_secret_key}",
                            "Content-Type": "application/json"
                        },
                        json={
                            "first_name": first_name,
                            "last_name": last_name
                        }
                    )
                    if not clerk_response.is_success:
                        print(f"Warning: Failed to update Clerk name: {clerk_response.text}")
            except Exception as e:
                print(f"Warning: Error updating Clerk name: {e}")
        
        # Sync to chat backend
        await sync_to_chat_backend(user_id, name=new_name)
        
        return {
            "success": True,
            "name": updated_user.name
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error updating name: {str(e)}"
        )


@router.get("/name-history")
async def get_name_history(request: Request):
    """
    Get user's name change history
    
    **Headers Required**:
    - X-User-ID: Clerk user ID (for authentication)
    
    **Returns**:
    - List of name changes with timestamps and values
    """
    user_id = get_user_id(request)
    
    try:
        # Get current user
        user = await prisma.user.find_unique(
            where={"clerkId": user_id}
        )
        
        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )
        
        # Get name change history
        history = await prisma.namechangeaudit.find_many(
            where={"userId": user.id},
            order={"changedAt": "desc"}
        )
        
        return {
            "currentName": user.name,
            "totalChanges": len(history),
            "history": [
                {
                    "id": record.id,
                    "oldName": record.oldName,
                    "newName": record.newName,
                    "changedAt": record.changedAt.isoformat()
                }
                for record in history
            ]
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching name history: {str(e)}"
        )


@router.post("/profile-picture")
async def upload_profile_picture(
    request: Request,
    file: UploadFile = File(...)
):
    """
    Upload user's profile picture to Vercel Blob
    
    **Headers Required**:
    - X-User-ID: Clerk user ID (for authentication)
    
    **File Requirements**:
    - Format: JPEG, PNG, WebP, or GIF
    - Max size: 5MB
    
    **Returns**:
    - profilePicture: URL to uploaded image (CDN URL)
    - success: Whether operation succeeded
    """
    user_id = get_user_id(request)
    
    try:
        # Validate file type
        allowed_types = ["image/jpeg", "image/png", "image/webp", "image/gif"]
        if file.content_type not in allowed_types:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid file type. Allowed: {', '.join(allowed_types)}"
            )
        
        # Read file content
        content = await file.read()
        
        # Validate file size (5MB max)
        max_size = 5 * 1024 * 1024  # 5MB
        if len(content) > max_size:
            raise HTTPException(
                status_code=400,
                detail="File size must be less than 5MB"
            )
        
        # Get current user
        user = await prisma.user.find_unique(
            where={"clerkId": user_id}
        )
        
        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )
        
        # Delete old profile picture from Blob if exists
        if user.profilePicture and user.profilePicture.startswith("https://"):
            try:
                from vercel_blob import delete
                delete(user.profilePicture)
            except Exception as e:
                # Log but don't fail if old image deletion fails
                print(f"Warning: Failed to delete old profile picture: {e}")
        
        # Generate unique filename with timestamp
        file_extension = file.filename.split(".")[-1] if "." in file.filename else "jpg"
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        pathname = f"profile-pictures/{user.id}_{timestamp}.{file_extension}"
        
        # Upload to Vercel Blob
        # Token is auto-injected by Vercel in production via BLOB_READ_WRITE_TOKEN
        blob_response = put(
            path=pathname,
            data=content,
            options={
                "addRandomSuffix": "false",
            }
        )
        
        # Get CDN URL from response
        profile_picture_url = blob_response["url"]

        # Update Clerk user profile picture
        clerk_secret_key = os.environ.get("CLERK_SECRET_KEY")
        if clerk_secret_key:
            try:
                async with httpx.AsyncClient() as client:
                    clerk_response = await client.patch(
                        f"https://api.clerk.com/v1/users/{user_id}",
                        headers={
                            "Authorization": f"Bearer {clerk_secret_key}",
                            "Content-Type": "application/json"
                        },
                        json={"profile_image_url": profile_picture_url}
                    )
                    if not clerk_response.is_success:
                        print(f"Warning: Failed to update Clerk profile picture: {clerk_response.text}")
            except Exception as e:
                print(f"Warning: Error updating Clerk profile picture: {e}")

        # Update user
        updated_user = await prisma.user.update(
            where={"clerkId": user_id},
            data={"profilePicture": profile_picture_url}
        )
        
        # Sync to chat backend
        await sync_to_chat_backend(user_id, profile_picture=profile_picture_url)

        return {
            "success": True,
            "profilePicture": updated_user.profilePicture
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error uploading profile picture: {str(e)}"
        )


@router.delete("/profile-picture")
async def delete_profile_picture(request: Request):
    """
    Delete user's profile picture from Vercel Blob
    
    **Headers Required**:
    - X-User-ID: Clerk user ID (for authentication)
    
    **Returns**:
    - success: Whether operation succeeded
    """
    user_id = get_user_id(request)
    
    try:
        # Get current user
        user = await prisma.user.find_unique(
            where={"clerkId": user_id}
        )
        
        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )
        
        # Delete from Vercel Blob if it's a Blob URL
        if user.profilePicture and user.profilePicture.startswith("https://"):
            try:
                from vercel_blob import delete
                delete(user.profilePicture)
            except Exception as e:
                # Log but don't fail
                print(f"Warning: Failed to delete from Blob: {e}")
        
        # Update user
        await prisma.user.update(
            where={"clerkId": user_id},
            data={"profilePicture": None}
        )
        
        # Sync to chat backend
        await sync_to_chat_backend(user_id, profile_picture=None)
        
        return {"success": True}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error deleting profile picture: {str(e)}"
        )


@router.get("/subscription")
async def get_subscription(request: Request):
    """
    Get user's subscription details

    **Headers Required**:
    - X-User-ID: Clerk user ID (for authentication)

    **Returns**:
    - Subscription plan details including features and status
    """
    user_id = get_user_id(request)

    subscription_service = SubscriptionService(prisma)

    try:
        # Get user by Clerk ID first
        user = await prisma.user.find_unique(
            where={"clerkId": user_id}
        )

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        # Get subscription details
        subscription = await subscription_service.get_subscription_details(
            user_id=user.id
        )

        return subscription

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching subscription: {str(e)}"
        )


@router.get("/subscription/plans")
async def get_subscription_plans():
    """
    Get available subscription plans and features

    **Returns**:
    - List of available subscription plans with pricing and features
    """
    try:
        return {
            "plans": {
                "free": await get_plan_features("free"),
                "pro": await get_plan_features("pro")
            }
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching plans: {str(e)}"
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

            # Handle missing email (common in test events)
            if not primary_email:
                # For test events or users without email, use placeholder
                email = f"user_{clerk_id}@placeholder.selve.me"
                print(f"⚠️ No email in webhook data, using placeholder: {email}")
            else:
                email = primary_email.get("email_address")

            result = await service.handle_user_created(
                clerk_id=clerk_id,
                email=email,
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

            # Handle missing email (common in test events)
            if not primary_email:
                # For test events, use placeholder
                email = f"user_{clerk_id}@placeholder.selve.me"
                print(f"⚠️ No email in webhook data, using placeholder: {email}")
            else:
                email = primary_email.get("email_address")

            result = await service.handle_user_updated(
                clerk_id=clerk_id,
                email=email,
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
