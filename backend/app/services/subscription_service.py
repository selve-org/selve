"""
Subscription Service - Manage user subscriptions and Clerk integration

This service handles:
- Subscription plan management (free vs pro)
- Clerk webhook processing
- Plan upgrades and downgrades
- Subscription status tracking
"""

from datetime import datetime, timezone
from typing import Dict, Literal, Optional, Any
import logging

logger = logging.getLogger(__name__)

# Subscription Configuration
SUBSCRIPTION_PLANS = {
    "free": {
        "name": "Free",
        "price": 0,
        "chatbot_daily_limit": 1.00,  # $1 per day
        "features": [
            "$1 worth of chatbot usage per day",
            "Basic personality insights",
            "3 friend assessments"
        ]
    },
    "pro": {
        "name": "Pro",
        "price": 9.99,
        "chatbot_daily_limit": None,  # Unlimited
        "features": [
            "Unlimited chatbot conversations",
            "Advanced personality insights",
            "Unlimited friend assessments",
            "Priority support"
        ]
    }
}

SubscriptionPlan = Literal["free", "pro"]
SubscriptionStatus = Literal["active", "cancelled", "past_due", "trialing"]


class SubscriptionService:
    """Service for managing user subscriptions"""

    def __init__(self, db_session):
        """
        Initialize SubscriptionService

        Args:
            db_session: Prisma database session
        """
        self.db = db_session

    async def get_user_plan(self, user_id: str) -> SubscriptionPlan:
        """
        Get the subscription plan for a user

        Args:
            user_id: User's database ID (not Clerk ID)

        Returns:
            "free" or "pro"
        """
        user = await self.db.user.find_unique(
            where={"id": user_id}
        )

        if not user:
            logger.warning(f"User not found: {user_id}")
            return "free"

        return user.subscriptionPlan or "free"

    async def get_user_plan_by_clerk_id(self, clerk_user_id: str) -> SubscriptionPlan:
        """
        Get the subscription plan for a user by Clerk ID

        Args:
            clerk_user_id: Clerk user ID

        Returns:
            "free" or "pro"
        """
        user = await self.db.user.find_unique(
            where={"clerkId": clerk_user_id}
        )

        if not user:
            logger.warning(f"User not found with Clerk ID: {clerk_user_id}")
            return "free"

        return user.subscriptionPlan or "free"

    async def get_subscription_details(self, user_id: str) -> Dict[str, Any]:
        """
        Get detailed subscription information for a user

        Args:
            user_id: User's database ID

        Returns:
            Dictionary with subscription details
        """
        user = await self.db.user.find_unique(
            where={"id": user_id}
        )

        if not user:
            raise ValueError(f"User not found: {user_id}")

        plan = user.subscriptionPlan or "free"
        plan_config = SUBSCRIPTION_PLANS[plan]

        return {
            "plan": plan,
            "plan_name": plan_config["name"],
            "price": plan_config["price"],
            "status": user.subscriptionStatus,
            "features": plan_config["features"],
            "chatbot_daily_limit": plan_config["chatbot_daily_limit"],
            "subscription_id": user.subscriptionId,
            "clerk_customer_id": user.clerkCustomerId,
            "plan_start_date": user.planStartDate.isoformat() if user.planStartDate else None,
            "plan_end_date": user.planEndDate.isoformat() if user.planEndDate else None
        }

    async def upgrade_to_pro(
        self,
        user_id: str,
        clerk_subscription_id: str,
        clerk_customer_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Upgrade user to Pro plan

        Args:
            user_id: User's database ID
            clerk_subscription_id: Clerk subscription ID
            clerk_customer_id: Clerk customer ID (optional)

        Returns:
            Updated subscription details
        """
        now = datetime.now(timezone.utc)

        user = await self.db.user.update(
            where={"id": user_id},
            data={
                "subscriptionPlan": "pro",
                "subscriptionStatus": "active",
                "subscriptionId": clerk_subscription_id,
                "clerkCustomerId": clerk_customer_id,
                "planStartDate": now,
                "planEndDate": None,  # Pro is monthly recurring, no end date
                # Reset usage when upgrading
                "currentPeriodCost": 0.0,
                "currentPeriodStart": now,
                "currentPeriodEnd": None  # No limit for pro users
            }
        )

        logger.info(f"User {user_id} upgraded to Pro plan")

        return await self.get_subscription_details(user_id)

    async def downgrade_to_free(
        self,
        user_id: str,
        reason: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Downgrade user to Free plan

        Args:
            user_id: User's database ID
            reason: Optional reason for downgrade (e.g., "cancelled", "payment_failed")

        Returns:
            Updated subscription details
        """
        now = datetime.now(timezone.utc)

        user = await self.db.user.update(
            where={"id": user_id},
            data={
                "subscriptionPlan": "free",
                "subscriptionStatus": "cancelled" if reason == "cancelled" else None,
                "subscriptionId": None,
                "planEndDate": now,
                # Reset usage period for free tier
                "currentPeriodCost": 0.0,
                "currentPeriodStart": now,
                "currentPeriodEnd": None  # Will be calculated as 24h window
            }
        )

        logger.info(f"User {user_id} downgraded to Free plan. Reason: {reason}")

        return await self.get_subscription_details(user_id)

    async def handle_subscription_created(
        self,
        clerk_user_id: str,
        subscription_id: str,
        customer_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Handle Clerk subscription.created webhook event

        Args:
            clerk_user_id: Clerk user ID
            subscription_id: Clerk subscription ID
            customer_id: Clerk customer ID

        Returns:
            Updated subscription details
        """
        user = await self.db.user.find_unique(
            where={"clerkId": clerk_user_id}
        )

        if not user:
            raise ValueError(f"User not found with Clerk ID: {clerk_user_id}")

        logger.info(f"Processing subscription.created for user {user.id}")

        return await self.upgrade_to_pro(
            user_id=user.id,
            clerk_subscription_id=subscription_id,
            clerk_customer_id=customer_id
        )

    async def handle_subscription_updated(
        self,
        clerk_user_id: str,
        subscription_id: str,
        status: str
    ) -> Dict[str, Any]:
        """
        Handle Clerk subscription.updated webhook event (ATOMIC)

        Uses transaction to ensure atomicity - prevents partial updates
        if subscription status changes and downgrade operations fail.

        Args:
            clerk_user_id: Clerk user ID
            subscription_id: Clerk subscription ID
            status: New subscription status

        Returns:
            Updated subscription details
        """
        # Use transaction for atomicity
        async with self.db.tx() as transaction:
            user = await transaction.user.find_unique(
                where={"clerkId": clerk_user_id}
            )

            if not user:
                raise ValueError(f"User not found with Clerk ID: {clerk_user_id}")

            logger.info(f"Processing subscription.updated for user {user.id}: status={status}")

            # Update subscription status
            updated_user = await transaction.user.update(
                where={"id": user.id},
                data={
                    "subscriptionStatus": status
                }
            )

            # If status is past_due or cancelled, downgrade within transaction
            if status in ["cancelled", "incomplete_expired"]:
                now = datetime.now(timezone.utc)
                updated_user = await transaction.user.update(
                    where={"id": user.id},
                    data={
                        "subscriptionPlan": "free",
                        "subscriptionStatus": "cancelled" if status == "cancelled" else None,
                        "subscriptionId": None,
                        "planEndDate": now,
                        "currentPeriodCost": 0.0,
                        "currentPeriodStart": now,
                        "currentPeriodEnd": None
                    }
                )
                logger.info(f"User {user.id} downgraded to Free plan. Reason: {status}")

        # Transaction committed - now fetch details
        return await self.get_subscription_details(user.id)

    async def handle_subscription_deleted(
        self,
        clerk_user_id: str
    ) -> Dict[str, Any]:
        """
        Handle Clerk subscription.deleted webhook event

        Args:
            clerk_user_id: Clerk user ID

        Returns:
            Updated subscription details
        """
        user = await self.db.user.find_unique(
            where={"clerkId": clerk_user_id}
        )

        if not user:
            raise ValueError(f"User not found with Clerk ID: {clerk_user_id}")

        logger.info(f"Processing subscription.deleted for user {user.id}")

        return await self.downgrade_to_free(user.id, reason="cancelled")

    async def handle_payment_succeeded(
        self,
        clerk_user_id: str,
        subscription_id: str
    ) -> None:
        """
        Handle successful payment webhook

        Args:
            clerk_user_id: Clerk user ID
            subscription_id: Clerk subscription ID
        """
        user = await self.db.user.find_unique(
            where={"clerkId": clerk_user_id}
        )

        if not user:
            logger.warning(f"User not found for payment success: {clerk_user_id}")
            return

        # Ensure subscription is active
        await self.db.user.update(
            where={"id": user.id},
            data={
                "subscriptionStatus": "active"
            }
        )

        logger.info(f"Payment succeeded for user {user.id}")

    async def handle_payment_failed(
        self,
        clerk_user_id: str,
        subscription_id: str
    ) -> None:
        """
        Handle failed payment webhook

        Args:
            clerk_user_id: Clerk user ID
            subscription_id: Clerk subscription ID
        """
        user = await self.db.user.find_unique(
            where={"clerkId": clerk_user_id}
        )

        if not user:
            logger.warning(f"User not found for payment failure: {clerk_user_id}")
            return

        # Mark subscription as past_due
        await self.db.user.update(
            where={"id": user.id},
            data={
                "subscriptionStatus": "past_due"
            }
        )

        logger.warning(f"Payment failed for user {user.id}")

        # TODO: Send notification to user about failed payment
        # await notification_service.send_payment_failed_notification(user.id)


# Convenience function for API endpoints
async def get_plan_features(plan: SubscriptionPlan) -> Dict[str, Any]:
    """
    Get features for a subscription plan

    Args:
        plan: Subscription plan ("free" or "pro")

    Returns:
        Dictionary with plan configuration
    """
    if plan not in SUBSCRIPTION_PLANS:
        raise ValueError(f"Invalid plan: {plan}")

    return SUBSCRIPTION_PLANS[plan]
