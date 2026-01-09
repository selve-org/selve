"""
Email Template Service - Load and render email templates

This service handles loading HTML and text email templates from files
and rendering them with dynamic data using simple string replacement.

Templates use {{variable}} syntax for placeholders.
"""

import os
from typing import Dict, Any
from pathlib import Path


class EmailTemplateService:
    """Service for loading and rendering email templates"""

    def __init__(self):
        """Initialize template service with template directory path"""
        # Get the directory where this file is located
        current_dir = Path(__file__).parent.parent
        self.template_dir = current_dir / "email_templates"

        # Verify template directory exists
        if not self.template_dir.exists():
            raise ValueError(f"Email templates directory not found: {self.template_dir}")

    def _load_template(self, template_name: str) -> str:
        """
        Load template file contents

        Args:
            template_name: Name of template file (e.g., "welcome_email.html")

        Returns:
            Template file contents as string

        Raises:
            FileNotFoundError: If template file doesn't exist
        """
        template_path = self.template_dir / template_name

        if not template_path.exists():
            raise FileNotFoundError(f"Template not found: {template_path}")

        with open(template_path, 'r', encoding='utf-8') as f:
            return f.read()

    def _render_template(self, template: str, variables: Dict[str, Any]) -> str:
        """
        Render template by replacing {{variable}} placeholders

        Args:
            template: Template string with {{placeholders}}
            variables: Dictionary of variable names and values

        Returns:
            Rendered template with variables replaced
        """
        rendered = template

        # Replace each variable
        for key, value in variables.items():
            placeholder = f"{{{{{key}}}}}"
            # Convert value to string, handle None
            str_value = str(value) if value is not None else ""
            rendered = rendered.replace(placeholder, str_value)

        return rendered

    def render_welcome_email(
        self,
        first_name: str,
        base_url: str,
        base_url_display: str,
        chatbot_url: str,
        logo_icon_url: str,
        logo_text_url: str
    ) -> tuple[str, str]:
        """
        Render welcome email templates (HTML and text)

        Args:
            first_name: User's first name
            base_url: Frontend base URL
            base_url_display: Display version of base URL (without protocol)
            chatbot_url: SELVE-Chat URL
            logo_icon_url: URL to logo icon image
            logo_text_url: URL to logo text image

        Returns:
            Tuple of (html_content, text_content)
        """
        variables = {
            "first_name": first_name,
            "base_url": base_url,
            "base_url_display": base_url_display,
            "chatbot_url": chatbot_url,
            "logo_icon_url": logo_icon_url,
            "logo_text_url": logo_text_url,
        }

        # Load and render both templates
        html_template = self._load_template("welcome_email.html")
        text_template = self._load_template("welcome_email.txt")

        html_content = self._render_template(html_template, variables)
        text_content = self._render_template(text_template, variables)

        return html_content, text_content

    def render_friend_completion_email(
        self,
        to_name: str,
        friend_name: str,
        results_url: str,
        base_url: str,
        base_url_display: str,
        logo_icon_url: str,
        logo_text_url: str
    ) -> tuple[str, str]:
        """
        Render friend completion notification email templates (HTML and text)

        Args:
            to_name: User's name (recipient)
            friend_name: Name of friend who completed assessment
            results_url: URL to view updated results
            base_url: Frontend base URL
            base_url_display: Display version of base URL (without protocol)
            logo_icon_url: URL to logo icon image
            logo_text_url: URL to logo text image

        Returns:
            Tuple of (html_content, text_content)
        """
        variables = {
            "to_name": to_name,
            "friend_name": friend_name,
            "results_url": results_url,
            "base_url": base_url,
            "base_url_display": base_url_display,
            "logo_icon_url": logo_icon_url,
            "logo_text_url": logo_text_url,
        }

        # Load and render both templates
        html_template = self._load_template("friend_completion.html")
        text_template = self._load_template("friend_completion.txt")

        html_content = self._render_template(html_template, variables)
        text_content = self._render_template(text_template, variables)

        return html_content, text_content

    def render_friend_thank_you_email(
        self,
        friend_name: str,
        inviter_name: str,
        signup_url: str,
        base_url: str,
        base_url_display: str,
        logo_icon_url: str,
        logo_text_url: str
    ) -> tuple[str, str]:
        """
        Render friend thank you email templates (HTML and text)

        Args:
            friend_name: Name of the friend who completed the assessment
            inviter_name: Name of the person who invited them
            signup_url: URL for friend to sign up and start their own assessment
            base_url: Frontend base URL
            base_url_display: Display version of base URL (without protocol)
            logo_icon_url: URL to logo icon image
            logo_text_url: URL to logo text image

        Returns:
            Tuple of (html_content, text_content)
        """
        variables = {
            "friend_name": friend_name,
            "inviter_name": inviter_name,
            "signup_url": signup_url,
            "base_url": base_url,
            "base_url_display": base_url_display,
            "logo_icon_url": logo_icon_url,
            "logo_text_url": logo_text_url,
        }

        # Load and render both templates
        html_template = self._load_template("friend_thank_you.html")
        text_template = self._load_template("friend_thank_you.txt")

        html_content = self._render_template(html_template, variables)
        text_content = self._render_template(text_template, variables)

        return html_content, text_content
