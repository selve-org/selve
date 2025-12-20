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
import aiohttp

logger = logging.getLogger(__name__)


class NotificationService:
    """Service for sending notifications across multiple channels."""
    
    def __init__(self):
        """Initialize notification service with Mailgun config."""
        self.mailgun_api_key = os.getenv('MAILGUN_API_KEY')
        self.mailgun_domain = os.getenv('MAILGUN_DOMAIN', 'mg.selve.me')
        self.mailgun_url = f'https://api.mailgun.net/v3/{self.mailgun_domain}/messages'
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
            # Send email
            await self._send_email_notification(user_email, friend_name)
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
        friend_name: str
    ):
        """
        Send email via Mailgun when friend completes.
        
        Args:
            user_email: User's email address
            friend_name: Name of friend who completed
        """
        subject = "Your friend completed their assessment!"
        
        html_body = f"""
        <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; 
                     line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
                <div style="display: inline-flex; align-items: center; gap: 12px;">
                    <img src="{self.app_url}/logo/selve-logo.png" alt="SELVE" width="40" height="40" style="vertical-align: middle;" />
                    <img src="{self.app_url}/logo/selve-logo-text.svg" alt="SELVE" width="120" height="30" style="vertical-align: middle; filter: brightness(0) invert(1);" />
                </div>
            </div>
            
            <h2 style="color: #667eea; margin-bottom: 20px;">New Friend Insights Available</h2>
            
            <p style="font-size: 16px; margin-bottom: 20px;">Hi there,</p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
                <strong>{friend_name}</strong> just completed their assessment of you.
            </p>
            
            <p style="font-size: 16px; margin-bottom: 30px;">
                We're updating your personality profile with their insights right now.
            </p>
            
            <div style="text-align: center; margin: 40px 0;">
                <a href="{self.app_url}/profile" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                          color: white; padding: 15px 40px; text-decoration: none; 
                          border-radius: 25px; font-size: 16px; font-weight: 600;
                          display: inline-block;">
                    View Your Updated Profile
                </a>
            </div>
            
            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; 
                        border-left: 4px solid #667eea; margin: 30px 0;">
                <p style="margin: 0; font-size: 14px; color: #4a5568;">
                    <strong>Privacy Note:</strong> Individual responses are never revealed. 
                    You'll only see aggregated insights from all your friends.
                </p>
            </div>
            
            <p style="font-size: 16px; margin-top: 30px;">
                Thank you for using SELVE!
            </p>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 40px 0;">
            
            <p style="font-size: 12px; color: #718096; text-align: center;">
                SELVE - Discover Your True Self<br>
                <a href="{self.app_url}/settings" style="color: #667eea;">Manage Preferences</a> | 
                <a href="{self.app_url}/privacy" style="color: #667eea;">Privacy Policy</a>
            </p>
        </body>
        </html>
        """
        
        # Send via Mailgun
        data = {
            'from': f'SELVE <hello@{self.mailgun_domain}>',
            'to': user_email,
            'subject': subject,
            'html': html_body
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.post(
                self.mailgun_url,
                auth=aiohttp.BasicAuth('api', self.mailgun_api_key),
                data=data
            ) as response:
                if response.status != 200:
                    text = await response.text()
                    raise Exception(f"Mailgun error: {response.status} - {text}")
                
                result = await response.json()
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
