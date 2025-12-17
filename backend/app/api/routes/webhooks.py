"""
Clerk Webhook Routes
Handles subscription events from Clerk
"""

import os
import logging
from typing import Dict, Any
from fastapi import APIRouter, HTTPException, Request, status
from svix.webhooks import Webhook, WebhookVerificationError

import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../../..'))
from app.db import prisma
from app.services.subscription_service import SubscriptionService

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/webhooks", tags=["webhooks"])

# Clerk webhook secret from environment
# Note: This is validated at startup - app won't start if missing
CLERK_WEBHOOK_SECRET = os.getenv("CLERK_WEBHOOK_SECRET")


@router.post("/clerk/subscriptions")
async def handle_clerk_subscription_webhook(request: Request):
    """
    Handle Clerk subscription webhook events

    **Security**: Webhook secret validated at application startup.
    Invalid signatures are rejected with 400 Bad Request.

    Supported events:
    - subscription.created: User subscribes to Pro plan
    - subscription.updated: Subscription status changes
    - subscription.deleted: User cancels subscription
    - invoice.payment_succeeded: Payment successful
    - invoice.payment_failed: Payment failed

    Returns:
        Success message
    """
    try:
        # Get webhook payload and headers
        payload = await request.body()
        headers = dict(request.headers)

        # Verify webhook signature using Svix
        try:
            wh = Webhook(CLERK_WEBHOOK_SECRET)
            evt = wh.verify(payload, headers)
        except WebhookVerificationError as e:
            logger.error(f"Webhook verification failed: {e}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid webhook signature"
            )

        # Extract event data
        event_type = evt.get("type")
        event_data = evt.get("data", {})

        logger.info(f"Received Clerk webhook: {event_type}")

        # Initialize subscription service
        subscription_service = SubscriptionService(prisma)

        # Route to appropriate handler based on event type
        if event_type == "subscription.created":
            await handle_subscription_created(event_data, subscription_service)

        elif event_type == "subscription.updated":
            await handle_subscription_updated(event_data, subscription_service)

        elif event_type == "subscription.deleted":
            await handle_subscription_deleted(event_data, subscription_service)

        elif event_type == "invoice.payment_succeeded":
            await handle_payment_succeeded(event_data, subscription_service)

        elif event_type == "invoice.payment_failed":
            await handle_payment_failed(event_data, subscription_service)

        else:
            logger.warning(f"Unhandled webhook event type: {event_type}")

        return {"status": "success", "event_type": event_type}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing Clerk webhook: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing webhook: {str(e)}"
        )


async def handle_subscription_created(
    event_data: Dict[str, Any],
    subscription_service: SubscriptionService
):
    """
    Handle subscription.created event

    Args:
        event_data: Event payload from Clerk
        subscription_service: SubscriptionService instance
    """
    try:
        # Extract relevant data
        user_id = event_data.get("user_id") or event_data.get("userId")
        subscription_id = event_data.get("id")
        customer_id = event_data.get("customer_id") or event_data.get("customerId")

        if not user_id or not subscription_id:
            raise ValueError("Missing required fields: user_id or subscription_id")

        logger.info(f"Creating subscription for user {user_id}")

        # Create subscription using service
        result = await subscription_service.handle_subscription_created(
            clerk_user_id=user_id,
            subscription_id=subscription_id,
            customer_id=customer_id
        )

        logger.info(f"Subscription created successfully: {result}")

    except Exception as e:
        logger.error(f"Error handling subscription.created: {e}", exc_info=True)
        raise


async def handle_subscription_updated(
    event_data: Dict[str, Any],
    subscription_service: SubscriptionService
):
    """
    Handle subscription.updated event

    Args:
        event_data: Event payload from Clerk
        subscription_service: SubscriptionService instance
    """
    try:
        user_id = event_data.get("user_id") or event_data.get("userId")
        subscription_id = event_data.get("id")
        subscription_status = event_data.get("status")

        if not user_id or not subscription_id:
            raise ValueError("Missing required fields: user_id or subscription_id")

        logger.info(f"Updating subscription for user {user_id}: status={subscription_status}")

        # Update subscription using service
        result = await subscription_service.handle_subscription_updated(
            clerk_user_id=user_id,
            subscription_id=subscription_id,
            status=subscription_status
        )

        logger.info(f"Subscription updated successfully: {result}")

    except Exception as e:
        logger.error(f"Error handling subscription.updated: {e}", exc_info=True)
        raise


async def handle_subscription_deleted(
    event_data: Dict[str, Any],
    subscription_service: SubscriptionService
):
    """
    Handle subscription.deleted event

    Args:
        event_data: Event payload from Clerk
        subscription_service: SubscriptionService instance
    """
    try:
        user_id = event_data.get("user_id") or event_data.get("userId")

        if not user_id:
            raise ValueError("Missing required field: user_id")

        logger.info(f"Deleting subscription for user {user_id}")

        # Delete subscription using service
        result = await subscription_service.handle_subscription_deleted(
            clerk_user_id=user_id
        )

        logger.info(f"Subscription deleted successfully: {result}")

    except Exception as e:
        logger.error(f"Error handling subscription.deleted: {e}", exc_info=True)
        raise


async def handle_payment_succeeded(
    event_data: Dict[str, Any],
    subscription_service: SubscriptionService
):
    """
    Handle invoice.payment_succeeded event

    Args:
        event_data: Event payload from Clerk
        subscription_service: SubscriptionService instance
    """
    try:
        user_id = event_data.get("user_id") or event_data.get("userId")
        subscription_id = event_data.get("subscription_id") or event_data.get("subscriptionId")

        if not user_id:
            raise ValueError("Missing required field: user_id")

        logger.info(f"Payment succeeded for user {user_id}")

        # Handle payment success
        await subscription_service.handle_payment_succeeded(
            clerk_user_id=user_id,
            subscription_id=subscription_id
        )

    except Exception as e:
        logger.error(f"Error handling invoice.payment_succeeded: {e}", exc_info=True)
        raise


async def handle_payment_failed(
    event_data: Dict[str, Any],
    subscription_service: SubscriptionService
):
    """
    Handle invoice.payment_failed event

    Args:
        event_data: Event payload from Clerk
        subscription_service: SubscriptionService instance
    """
    try:
        user_id = event_data.get("user_id") or event_data.get("userId")
        subscription_id = event_data.get("subscription_id") or event_data.get("subscriptionId")

        if not user_id:
            raise ValueError("Missing required field: user_id")

        logger.warning(f"Payment failed for user {user_id}")

        # Handle payment failure
        await subscription_service.handle_payment_failed(
            clerk_user_id=user_id,
            subscription_id=subscription_id
        )

    except Exception as e:
        logger.error(f"Error handling invoice.payment_failed: {e}", exc_info=True)
        raise
