"""
Tier Service - Manage user subscription tiers and invite limits

This service handles:
- Tier detection (free vs premium)
- Invite limit enforcement
- Rate limiting (abuse prevention)
- Invite quota tracking
"""

from datetime import datetime, timedelta
from typing import Dict, Literal, Optional, Tuple
from fastapi import HTTPException

# Tier Configuration
TIERS = {
    "free": {
        "max_invites": 3,
        "rate_limit_per_hour": 5,
        "name": "Free"
    },
    "premium": {
        "max_invites": 999,  # Effectively unlimited
        "rate_limit_per_hour": 20,
        "name": "Premium"
    }
}

TierType = Literal["free", "premium"]


class TierService:
    """Service for managing user tiers and invite limits"""
    
    def __init__(self, db_session):
        """
        Initialize TierService
        
        Args:
            db_session: SQLAlchemy database session
        """
        self.db = db_session
    
    async def get_user_tier(self, user_id: str) -> TierType:
        """
        Get the tier for a user
        
        Args:
            user_id: User's ID
            
        Returns:
            "free" or "premium"
            
        TODO: Integrate with actual subscription system (Stripe, Paddle, etc.)
        For now, all users are on free tier
        """
        # TODO: Query subscription database
        # For now, return free tier for everyone
        return "free"
    
    async def get_invite_count(self, user_id: str) -> int:
        """
        Get total number of invites sent by user (all time)
        
        Args:
            user_id: User's ID
            
        Returns:
            Total invite count
        """
        from prisma.models import InviteLink
        
        count = await InviteLink.prisma().count(
            where={"inviterId": user_id}
        )
        
        return count
    
    async def get_invites_last_hour(self, user_id: str) -> int:
        """
        Get number of invites sent in the last hour (rate limiting)
        
        Args:
            user_id: User's ID
            
        Returns:
            Invite count in last hour
        """
        from prisma.models import InviteLink
        
        one_hour_ago = datetime.utcnow() - timedelta(hours=1)
        
        count = await InviteLink.prisma().count(
            where={
                "inviterId": user_id,
                "createdAt": {"gte": one_hour_ago}
            }
        )
        
        return count
    
    async def can_send_invite(
        self, 
        user_id: str, 
        check_rate_limit: bool = True
    ) -> Tuple[bool, Optional[str]]:
        """
        Check if user can send another invite
        
        Args:
            user_id: User's ID
            check_rate_limit: Whether to enforce rate limiting
            
        Returns:
            Tuple of (can_send, error_message)
            - (True, None) if allowed
            - (False, "error message") if blocked
        """
        tier = await self.get_user_tier(user_id)
        tier_config = TIERS[tier]
        
        # Check total invite limit
        total_invites = await self.get_invite_count(user_id)
        
        if total_invites >= tier_config["max_invites"]:
            if tier == "free":
                return (
                    False, 
                    f"You've reached your {tier_config['max_invites']} invite limit. "
                    "Upgrade to Premium for unlimited invites."
                )
            else:
                # Should never happen for premium, but safety check
                return (False, "Invite limit reached. Please contact support.")
        
        # Check rate limiting (abuse prevention)
        if check_rate_limit:
            invites_last_hour = await self.get_invites_last_hour(user_id)
            
            if invites_last_hour >= tier_config["rate_limit_per_hour"]:
                return (
                    False,
                    f"Rate limit exceeded. You can send up to "
                    f"{tier_config['rate_limit_per_hour']} invites per hour. "
                    "Please try again later."
                )
        
        return (True, None)
    
    async def get_remaining_invites(self, user_id: str) -> int:
        """
        Get number of invites remaining in user's quota
        
        Args:
            user_id: User's ID
            
        Returns:
            Number of remaining invites
        """
        tier = await self.get_user_tier(user_id)
        tier_config = TIERS[tier]
        
        total_sent = await self.get_invite_count(user_id)
        remaining = tier_config["max_invites"] - total_sent
        
        return max(0, remaining)
    
    async def check_ip_abuse(
        self, 
        ip_address: str, 
        time_window_hours: int = 24,
        max_invites: int = 20
    ) -> bool:
        """
        Check if an IP address is creating too many invites (abuse detection)
        
        Args:
            ip_address: IP address to check
            time_window_hours: Time window to check (default 24 hours)
            max_invites: Maximum allowed invites in window
            
        Returns:
            True if abuse detected, False otherwise
        """
        from prisma.models import InviteLink
        
        cutoff_time = datetime.utcnow() - timedelta(hours=time_window_hours)
        
        count = await InviteLink.prisma().count(
            where={
                "ipAddress": ip_address,
                "createdAt": {"gte": cutoff_time}
            }
        )
        
        return count >= max_invites
    
    async def check_duplicate_invite(
        self, 
        user_id: str, 
        friend_email: Optional[str]
    ) -> Optional[str]:
        """
        Check if user already invited this email
        
        Args:
            user_id: User's ID
            friend_email: Friend's email address
            
        Returns:
            Existing invite code if found, None otherwise
        """
        if not friend_email:
            return None
        
        from prisma.models import InviteLink
        
        # Find existing invite that's not expired
        existing = await InviteLink.prisma().find_first(
            where={
                "inviterId": user_id,
                "friendEmail": friend_email,
                "status": {"in": ["pending", "completed"]},
                "expiresAt": {"gt": datetime.utcnow()}
            },
            order={"createdAt": "desc"}
        )
        
        if existing:
            return existing.inviteCode
        
        return None


# Convenience function for use in API endpoints
async def enforce_invite_limits(
    user_id: str,
    friend_email: Optional[str],
    ip_address: str,
    db_session
) -> Tuple[bool, Optional[str], Optional[str]]:
    """
    Enforce all invite limits and checks
    
    Args:
        user_id: User's ID
        friend_email: Friend's email (optional)
        ip_address: Request IP address
        db_session: Database session
        
    Returns:
        Tuple of (allowed, error_message, existing_code)
        - If existing_code is set, return that instead of creating new
        - If allowed is False, raise error with error_message
    """
    service = TierService(db_session)
    
    # Check for duplicate invite
    existing_code = await service.check_duplicate_invite(user_id, friend_email)
    if existing_code:
        return (True, None, existing_code)
    
    # Check IP abuse
    is_abuse = await service.check_ip_abuse(ip_address)
    if is_abuse:
        return (
            False,
            "Too many invites from this network. Please try again later.",
            None
        )
    
    # Check user tier limits
    can_send, error_msg = await service.can_send_invite(user_id)
    if not can_send:
        return (False, error_msg, None)
    
    return (True, None, None)
