"""
Notifications API Routes
Handles UI notifications and toast triggers
"""

from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '../../..'))
from app.db import prisma
from app.services.notification_service import NotificationService

router = APIRouter(prefix="/notifications", tags=["notifications"])
notification_service = NotificationService()


class NotificationResponse(BaseModel):
    """Single notification response"""
    id: str
    type: str
    title: str
    message: str
    link: Optional[str]
    read: bool
    readAt: Optional[datetime] = None
    createdAt: datetime
    
    class Config:
        populate_by_name = True


@router.get("", response_model=List[NotificationResponse])
async def get_notifications(
    request: Request,
    limit: int = 10,
    unread_only: bool = False
):
    """
    Get user's notifications.
    
    **Headers Required**:
    - X-User-ID: User's Clerk ID
    
    **Query Parameters**:
    - limit: Maximum number of notifications (default: 10)
    - unread_only: Only return unread notifications (default: false)
    
    **Returns**:
    - List of notifications ordered by creation date (newest first)
    """
    # Get user ID from header
    user_id = request.headers.get("X-User-ID")
    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Authentication required"
        )
    
    try:
        # Get user from database
        user = await prisma.user.find_unique(where={"clerkId": user_id})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Get notifications
        notifications = await notification_service.get_user_notifications(
            user_id=user.id,
            db=prisma,
            limit=limit,
            unread_only=unread_only
        )
        
        return [
            NotificationResponse(
                id=n.id,
                type=n.type,
                title=n.title,
                message=n.message,
                link=n.link,
                read=n.read,
                readAt=n.readAt,
                createdAt=n.createdAt
            )
            for n in notifications
        ]
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching notifications: {str(e)}"
        )


@router.get("/unread-count")
async def get_unread_count(request: Request):
    """
    Get count of unread notifications.
    
    **Headers Required**:
    - X-User-ID: User's Clerk ID
    
    **Returns**:
    - count: Number of unread notifications
    - has_unread: Boolean indicating if any unread notifications exist
    """
    # Get user ID from header
    user_id = request.headers.get("X-User-ID")
    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Authentication required"
        )
    
    try:
        # Get user from database
        user = await prisma.user.find_unique(where={"clerkId": user_id})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Count unread notifications
        count = await prisma.notification.count(
            where={
                "userId": user.id,
                "read": False
            }
        )
        
        return {
            "count": count,
            "has_unread": count > 0
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error counting notifications: {str(e)}"
        )


@router.post("/{notification_id}/mark-read")
async def mark_notification_read(
    notification_id: str,
    request: Request
):
    """
    Mark a notification as read.
    
    **Headers Required**:
    - X-User-ID: User's Clerk ID
    """
    # Get user ID from header
    user_id = request.headers.get("X-User-ID")
    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Authentication required"
        )
    
    try:
        # Get user from database
        user = await prisma.user.find_unique(where={"clerkId": user_id})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Get notification to verify ownership
        notification = await prisma.notification.find_unique(
            where={"id": notification_id}
        )
        
        if not notification:
            raise HTTPException(status_code=404, detail="Notification not found")
        
        if notification.userId != user.id:
            raise HTTPException(
                status_code=403,
                detail="Not authorized to modify this notification"
            )
        
        # Mark as read
        await notification_service.mark_notification_read(
            notification_id=notification_id,
            db=prisma
        )
        
        return {"message": "Notification marked as read"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error marking notification as read: {str(e)}"
        )


@router.get("/toast-flag")
async def get_toast_flag(request: Request):
    """
    Get toast trigger flag for user.
    Flag is automatically cleared after retrieval.
    
    **Headers Required**:
    - X-User-ID: User's Clerk ID
    
    **Returns**:
    - should_show_toast: Boolean
    - friend_name: Name of friend (if flag exists)
    """
    # Get user ID from header
    user_id = request.headers.get("X-User-ID")
    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Authentication required"
        )
    
    try:
        # Get toast flag (automatically clears after retrieval)
        friend_name = notification_service.get_toast_flag(user_id)
        
        if friend_name:
            return {
                "should_show_toast": True,
                "friend_name": friend_name
            }
        else:
            return {
                "should_show_toast": False,
                "friend_name": None
            }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error getting toast flag: {str(e)}"
        )


@router.delete("/toast-flag")
async def clear_toast_flag(request: Request):
    """
    Clear toast trigger flag for user (manual clear).
    Usually called automatically by GET /toast-flag.
    
    **Headers Required**:
    - X-User-ID: User's Clerk ID
    """
    # Get user ID from header
    user_id = request.headers.get("X-User-ID")
    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Authentication required"
        )
    
    try:
        # Clear flag by getting it (which auto-clears)
        notification_service.get_toast_flag(user_id)
        
        return {"message": "Toast flag cleared"}
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error clearing toast flag: {str(e)}"
        )
