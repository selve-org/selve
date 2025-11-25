"""
Mailgun Email Service - Transactional emails for SELVE

This service handles sending invitation emails using Mailgun API.
Uses the production domain mg.selve.me for authenticated emails.

Environment Variables Required:
- MAILGUN_API_KEY: API key for Mailgun
- MAILGUN_DOMAIN: mg.selve.me (production) or sandbox for testing
- MAILGUN_BASE_URL: https://api.mailgun.net (US) or https://api.eu.mailgun.net (EU)
"""

import os
import requests
from typing import Optional, Dict, Any
from datetime import datetime


class MailgunService:
    """Service for sending transactional emails via Mailgun"""

    def __init__(self):
        """Initialize Mailgun service with configuration"""
        self.api_key = os.getenv('MAILGUN_API_KEY')
        if not self.api_key:
            raise ValueError("MAILGUN_API_KEY environment variable is required")

        # Environment configuration
        self.environment = os.getenv('ENVIRONMENT', 'development')
        self.is_production = self.environment == 'production'

        # Use production domain when ready, sandbox for testing
        self.domain = os.getenv('MAILGUN_DOMAIN', 'sandboxd8f97eaf0d0047738c071c1b4975ee4f.mailgun.org')

        self.base_url = os.getenv('MAILGUN_BASE_URL', 'https://api.mailgun.net')

        # Production domain for reference
        self.prod_domain = 'mg.selve.me'

        # Frontend URL (for invite links)
        self.frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:3000')

        # Logo URLs - Always use Cloudinary for email compatibility (works in all email clients)
        # These are publicly accessible and don't depend on localhost or production server
        self.logo_icon_url = "https://res.cloudinary.com/dbjsmvbkl/image/upload/v1763536804/selve-logo_mjr8it.png"
        self.logo_text_url = "https://res.cloudinary.com/dbjsmvbkl/image/upload/v1732536849/selve-logo-text_fb3k38.png"
        
    def _get_endpoint(self) -> str:
        """Get the full API endpoint for sending messages"""
        return f"{self.base_url}/v3/{self.domain}/messages"
    
    def send_invite_email(
        self,
        to_email: str,
        to_name: str,
        inviter_name: str,
        invite_code: str,
        relationship_type: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Send a friend assessment invite email
        
        Args:
            to_email: Friend's email address
            to_name: Friend's name (or email if name not provided)
            inviter_name: Name of person sending invite
            invite_code: Unique invite code (28-char NanoID)
            relationship_type: Optional relationship type for personalization
            
        Returns:
            Mailgun API response dict
            
        Raises:
            requests.HTTPError: If email sending fails
        """
        # Construct invite URL (environment-aware)
        base_url = "https://selve.me" if self.is_production else self.frontend_url
        invite_url = f"{base_url}/invite/{invite_code}"
        
        # Personalize greeting based on relationship
        relationship_context = ""
        if relationship_type:
            type_map = {
                "friend": "friend",
                "sibling": "sibling",
                "parent": "parent",
                "partner": "partner",
                "coworker": "colleague"
            }
            rel_word = type_map.get(relationship_type, "someone you know")
            relationship_context = f"Your {rel_word}, "
        
        # Email subject
        subject = f"{inviter_name} invited you to help build their SELVE personality profile"
        
        # HTML email body (production-ready template)
        html_body = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SELVE Invite</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px; text-align: center;">
                            <a href="{base_url}" style="text-decoration: none;">
                                <table cellpadding="0" cellspacing="0" style="display: inline-table;">
                                    <tr>
                                        <td style="vertical-align: middle; padding-right: 8px;">
                                            <img src="{self.logo_icon_url}" alt="" width="32" height="32" style="display: block;" />
                                        </td>
                                        <td style="vertical-align: middle;">
                                            <img src="{self.logo_text_url}" alt="SELVE" height="24" style="display: block;" />
                                        </td>
                                    </tr>
                                </table>
                            </a>
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td style="padding: 20px 40px 40px;">
                            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                                Hey there! 👋
                            </p>
                            
                            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                                {relationship_context}<strong>{inviter_name}</strong> is building their SELVE personality profile and has invited you to answer a short questionnaire about them.
                            </p>
                            
                            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                                Your perspective helps create a more accurate, 360° understanding of their personality — highlighting strengths, patterns, and blind spots.
                            </p>
                            
                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <a href="{invite_url}" 
                                           style="display: inline-block; padding: 14px 32px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 500;">
                                            Start the Assessment →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 20px 0 0; text-align: center;">
                                Takes 11-17 minutes · Your answers stay private · No account needed
                            </p>
                            
                            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
                            
                            <p style="color: #999; font-size: 13px; line-height: 1.5; margin: 0;">
                                If you weren't expecting this email, you can safely ignore it. 
                                This invite link expires in 7 days.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 40px; background-color: #f9f9f9; border-top: 1px solid #e5e5e5; border-radius: 0 0 8px 8px;">
                            <p style="color: #999; font-size: 12px; line-height: 1.5; margin: 0; text-align: center;">
                                Thanks for helping them out 💛<br>
                                — The SELVE Team
                            </p>
                        </td>
                    </tr>
                </table>

                <!-- Unsubscribe footer -->
                <p style="color: #999; font-size: 11px; margin: 20px 0 0; text-align: center;">
                    SELVE · Personality Assessment Platform<br>
                    <a href="{base_url}" style="color: #999;">{base_url.replace('http://', '').replace('https://', '')}</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
        """

        # Plain text fallback
        text_body = f"""
Hey there!

{relationship_context}{inviter_name} is building their SELVE personality profile and has invited you to answer a short questionnaire about them.

Your perspective helps create a more accurate, 360° understanding of their personality — highlighting strengths, patterns, and blind spots.

Click here to start:
{invite_url}

Takes 11-17 minutes. Your answers stay private. No account needed.

If you weren't expecting this email, you can safely ignore it. This invite link expires in 7 days.

Thanks for helping them out 💛
— The SELVE Team

SELVE · Personality Assessment Platform
{base_url}
        """
        
        # Prepare request data
        data = {
            "from": f"SELVE <hello@{self.prod_domain if self.domain == self.prod_domain else self.domain}>",
            "to": f"{to_name} <{to_email}>",
            "subject": subject,
            "text": text_body,
            "html": html_body,
            "o:tracking": "yes",  # Enable open/click tracking
            "o:tracking-clicks": "yes",
            "o:tracking-opens": "yes",
            "o:tag": ["friend-invite", f"inviter:{inviter_name}"],  # For analytics
        }
        
        # Send email via Mailgun API
        response = requests.post(
            self._get_endpoint(),
            auth=("api", self.api_key),
            data=data
        )
        
        # Raise exception if failed
        response.raise_for_status()
        
        return response.json()
    
    def send_completion_notification(
        self,
        to_email: str,
        to_name: str,
        friend_name: str,
        results_url: str
    ) -> Dict[str, Any]:
        """
        Notify user when a friend completes their assessment
        
        Args:
            to_email: User's email
            to_name: User's name
            friend_name: Name of friend who completed assessment
            results_url: URL to view updated results
            
        Returns:
            Mailgun API response dict
        """
        subject = f"{friend_name} completed your SELVE friend assessment!"
        
        html_body = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px; text-align: center;">
                            <a href="https://selve.me" style="text-decoration: none;">
                                <table cellpadding="0" cellspacing="0" style="display: inline-table;">
                                    <tr>
                                        <td style="vertical-align: middle; padding-right: 8px;">
                                            <img src="{self.logo_icon_url}" alt="" width="32" height="32" style="display: block;" />
                                        </td>
                                        <td style="vertical-align: middle;">
                                            <img src="{self.logo_text_url}" alt="SELVE" height="24" style="display: block;" />
                                        </td>
                                    </tr>
                                </table>
                            </a>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="padding: 20px 40px 40px;">
                            <h1 style="color: #1a1a1a; font-size: 24px; margin: 0 0 20px;">Great news, {to_name}! 🎉</h1>
                            
                            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                                <strong>{friend_name}</strong> just completed their assessment about you.
                            </p>
                            
                            <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                                Your friend insights have been updated with their perspective. Check out how they see you!
                            </p>
                            
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center">
                                        <a href="{results_url}" 
                                           style="display: inline-block; padding: 14px 32px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 500;">
                                            View Your Results →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="padding: 20px 40px; background-color: #f9f9f9; border-radius: 0 0 8px 8px;">
                            <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
                                — The SELVE Team
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        """
        
        text_body = f"""
Great news, {to_name}! 🎉

{friend_name} just completed their assessment about you.

Your friend insights have been updated with their perspective. Check out how they see you!

View your results: {results_url}

— The SELVE Team
        """
        
        data = {
            "from": f"SELVE <hello@{self.prod_domain if self.domain == self.prod_domain else self.domain}>",
            "to": f"{to_name} <{to_email}>",
            "subject": subject,
            "text": text_body,
            "html": html_body,
            "o:tracking": "yes",
            "o:tag": ["completion-notification"],
        }
        
        response = requests.post(
            self._get_endpoint(),
            auth=("api", self.api_key),
            data=data
        )
        
        response.raise_for_status()
        return response.json()


# Convenience function for use in API endpoints
async def send_friend_invite_email(
    friend_email: str,
    friend_name: str,
    inviter_name: str,
    invite_code: str,
    relationship_type: Optional[str] = None
) -> bool:
    """
    Send friend assessment invite email
    
    Args:
        friend_email: Friend's email address
        friend_name: Friend's name
        inviter_name: Name of person sending invite
        invite_code: Unique invite code
        relationship_type: Optional relationship type
        
    Returns:
        True if sent successfully, False otherwise
    """
    try:
        service = MailgunService()
        result = service.send_invite_email(
            to_email=friend_email,
            to_name=friend_name,
            inviter_name=inviter_name,
            invite_code=invite_code,
            relationship_type=relationship_type
        )
        
        # Log the message ID for tracking
        print(f"Email sent successfully. Message ID: {result.get('id')}")
        return True
        
    except Exception as e:
        # Log error but don't fail the invite creation
        print(f"Failed to send email: {str(e)}")
        return False
