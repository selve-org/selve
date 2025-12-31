"""
Notification Service

Sends multi-channel notifications when friend completes assessment:
- Email via Mailgun
- UI notification records
- Toast trigger flags (Redis or in-memory)
"""

import logging
from typing import Optional
from datetime import datetime, timedelta, timezone
import os

logger = logging.getLogger(__name__)


class NotificationService:
    """Service for sending notifications across multiple channels."""
    
    def __init__(self):
        """Initialize notification service."""
        self.app_url = os.getenv('APP_URL', 'https://selve.me')

        # In-memory toast flags (replace with Redis in production)
        self._toast_flags = {}
    
    async def notify_friend_completed(
        self,
        user_id: str,
        user_email: str,
        friend_name: str,
        invite_code: str,
        db
    ):
        """
        Send all notifications when friend completes assessment.

        Channels:
        - Email (immediate)
        - UI notification (persistent)
        - Toast trigger (one-time flag)

        Args:
            user_id: User ID who created the invite
            user_email: User's email address
            friend_name: Name of friend who completed
            invite_code: Invite code (for tracking)
            db: Database session
        """
        logger.info(f"Sending notifications: user={user_id}, friend={friend_name}")

        try:
            # Get user's actual name from database
            user = await db.user.find_unique(where={"clerkId": user_id})
            user_name = user.name if user and user.name else user_email.split('@')[0].title()

            # Send email
            await self._send_email_notification(user_email, user_name, friend_name)
            logger.info(f"✅ Email sent to {user_email}")
        except Exception as e:
            logger.error(f"❌ Failed to send email: {e}")
        
        try:
            # Create UI notification
            await self._create_ui_notification(user_id, friend_name, db)
            logger.info(f"✅ UI notification created for user {user_id}")
        except Exception as e:
            logger.error(f"❌ Failed to create UI notification: {e}")
        
        try:
            # Set toast flag
            self._set_toast_flag(user_id, friend_name)
            logger.info(f"✅ Toast flag set for user {user_id}")
        except Exception as e:
            logger.error(f"❌ Failed to set toast flag: {e}")
    
    async def _send_email_notification(
        self,
        user_email: str,
        user_name: str,
        friend_name: str
    ):
        """
        Send email via Mailgun when friend completes.
        Uses the professional MailgunService template for consistent branding.

        Args:
            user_email: User's email address
            user_name: User's name
            friend_name: Name of friend who completed
        """
        from app.services.mailgun_service import MailgunService

        # Use professional template from MailgunService
        mailgun = MailgunService()
        result = mailgun.send_completion_notification(
            to_email=user_email,
            to_name=user_name,
            friend_name=friend_name,
            results_url=f"{self.app_url}/profile"
        )

        logger.info(f"Mailgun response: {result}")
    
    async def _create_ui_notification(
        self,
        user_id: str,
        friend_name: str,
        db
    ):
        """
        Create persistent UI notification record.
        
        Args:
            user_id: Clerk user ID
            friend_name: Name of friend who completed
            db: Prisma client instance
        """
        # Get user by clerkId to get internal user ID
        user = await db.user.find_unique(where={"clerkId": user_id})
        if not user:
            logger.warning(f"User not found with clerkId: {user_id}")
            return
        
        # Create notification using Prisma
        await db.notification.create(
            data={
                "userId": user.id,
                "type": "friend_completed",
                "title": f"{friend_name} completed their assessment",
                "message": f"Your profile has been updated with new insights from {friend_name}.",
                "link": "/profile",
                "read": False,
            }
        )
    
    def _set_toast_flag(
        self,
        user_id: str,
        friend_name: str
    ):
        """
        Set toast trigger flag (in-memory, replace with Redis in production).
        
        Args:
            user_id: User ID
            friend_name: Name of friend who completed
        """
        # Store flag with expiration (24 hours)
        self._toast_flags[user_id] = {
            'friend_name': friend_name,
            'expires_at': datetime.now(timezone.utc) + timedelta(hours=24)
        }
    
    def get_toast_flag(self, user_id: str) -> Optional[str]:
        """
        Get and clear toast flag for user.
        
        Args:
            user_id: User ID
        
        Returns:
            Friend name if flag exists and not expired, None otherwise
        """
        if user_id not in self._toast_flags:
            return None
        
        flag_data = self._toast_flags[user_id]
        
        # Check expiration
        if datetime.now(timezone.utc) > flag_data['expires_at']:
            del self._toast_flags[user_id]
            return None
        
        # Return and clear flag
        friend_name = flag_data['friend_name']
        del self._toast_flags[user_id]
        return friend_name
    
    async def get_user_notifications(
        self,
        user_id: str,
        db,
        limit: int = 10,
        unread_only: bool = False
    ) -> list:
        """
        Get user's UI notifications.
        
        Args:
            user_id: Internal user ID
            db: Prisma client instance
            limit: Maximum number of notifications to return
            unread_only: If True, only return unread notifications
        
        Returns:
            List of notification records
        """
        where_clause = {"userId": user_id}
        if unread_only:
            where_clause["read"] = False
        
        notifications = await db.notification.find_many(
            where=where_clause,
            order={"createdAt": "desc"},
            take=limit
        )
        
        return notifications
    
    async def mark_notification_read(
        self,
        notification_id: str,
        db
    ):
        """
        Mark notification as read.
        
        Args:
            notification_id: Notification ID
            db: Prisma client instance
        """
        await db.notification.update(
            where={"id": notification_id},
            data={
                "read": True,
                "readAt": datetime.now(timezone.utc)
            }
        )
