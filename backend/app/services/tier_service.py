"""
Tier Service - Manage user subscription tiers and invite limits

This service handles:
- Tier detection (free vs premium)
- Invite limit enforcement
- Rate limiting (abuse prevention)
- Invite quota tracking
"""

from datetime import datetime, timedelta, timezone
from typing import Dict, Literal, Optional, Tuple

# Tier Configuration
TIERS = {
    "free": {
        "max_invites": 15,  # Updated from 3 to 15
        "rate_limit_per_hour": 10,  # Increased rate limit proportionally
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
        """
        # TODO: Re-enable when pricing is implemented
        # For now, everyone is on free tier since there's no pricing system yet
        return "free"

        # Query user's subscription plan from database
        # user = await self.db.user.find_unique(
        #     where={"id": user_id},
        #     select={"subscriptionPlan": True}
        # )
        #
        # if not user:
        #     return "free"
        #
        # # Map subscription plans: "pro" -> "premium", "free" -> "free"
        # subscription_plan = user.subscriptionPlan or "free"
        #
        # if subscription_plan == "pro":
        #     return "premium"
        # else:
        #     return "free"
    
    async def get_invite_count(self, user_id: str) -> int:
        """
        Get total number of invites sent by user (all time)

        Args:
            user_id: User's ID

        Returns:
            Total invite count
        """
        count = await self.db.invitelink.count(
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
        one_hour_ago = datetime.now(timezone.utc) - timedelta(hours=1)

        count = await self.db.invitelink.count(
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
        cutoff_time = datetime.now(timezone.utc) - timedelta(hours=time_window_hours)

        count = await self.db.invitelink.count(
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

        # Find existing invite that's not expired
        existing = await self.db.invitelink.find_first(
            where={
                "inviterId": user_id,
                "friendEmail": friend_email,
                "status": {"in": ["pending", "completed"]},
                "expiresAt": {"gt": datetime.now(timezone.utc)}
            },
            order={"createdAt": "desc"}
        )

        if existing:
            return existing.inviteCode

        return None


# Convenience function for use in API endpoints
async def enforce_invite_limits(
    prisma,
    user_id: str,
    friend_email: Optional[str],
    ip_address: str
) -> Dict:
    """
    Enforce all invite limits and checks

    Args:
        prisma: Prisma database client
        user_id: User's database ID (not Clerk ID)
        friend_email: Friend's email (optional)
        ip_address: Request IP address

    Returns:
        Dictionary with:
        - allowed: bool - Whether invite creation is allowed
        - reason: Optional[str] - Error message if not allowed
        - existing_invite: Optional[InviteLink] - Existing invite if duplicate
        - remaining_invites: int - Number of remaining invites in quota
    """
    service = TierService(prisma)

    # Check for duplicate invite first
    existing_code = await service.check_duplicate_invite(user_id, friend_email)
    if existing_code:
        # Get the existing invite object
        existing_invite = await prisma.invitelink.find_unique(
            where={"inviteCode": existing_code}
        )
        remaining = await service.get_remaining_invites(user_id)
        return {
            "allowed": False,
            "reason": "You've already invited this person",
            "existing_invite": existing_invite,
            "remaining_invites": remaining
        }

    # Check IP abuse
    is_abuse = await service.check_ip_abuse(ip_address)
    if is_abuse:
        remaining = await service.get_remaining_invites(user_id)
        return {
            "allowed": False,
            "reason": "Too many invites from this IP address",
            "remaining_invites": remaining
        }

    # Check user tier limits
    can_send, error_msg = await service.can_send_invite(user_id)
    if not can_send:
        remaining = await service.get_remaining_invites(user_id)
        return {
            "allowed": False,
            "reason": error_msg,
            "remaining_invites": remaining
        }

    # All checks passed
    remaining = await service.get_remaining_invites(user_id) - 1  # Account for the invite about to be created
    return {
        "allowed": True,
        "reason": None,
        "remaining_invites": remaining
    }
