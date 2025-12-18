"""
Tests for Newsletter API routes

Tests subscription, unsubscription, and stats functionality

Note: These tests use sync test functions with TestClient (which handles
async internally) and apply patches using decorators to ensure the mocks
are active before the TestClient makes requests.
"""

import pytest
from unittest.mock import patch, MagicMock, AsyncMock
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture
def client():
    """Create test client for API testing."""
    return TestClient(app)


class TestNewsletterSubscribe:
    """Test newsletter subscription endpoint"""

    def test_new_subscription_success(self, client):
        """Test successful new subscription"""
        with patch('app.api.routes.newsletter.prisma') as mock_prisma, \
             patch('app.api.routes.newsletter.MailgunService') as mock_mailgun:
            
            mock_prisma.newslettersubscriber.find_unique = AsyncMock(return_value=None)
            mock_prisma.user.find_first = AsyncMock(return_value=None)
            mock_prisma.newslettersubscriber.create = AsyncMock(return_value=MagicMock(id="sub_123"))
            
            mock_mailgun_instance = MagicMock()
            mock_mailgun.return_value = mock_mailgun_instance
            
            response = client.post(
                "/api/newsletter/subscribe",
                json={"email": "test@example.com", "source": "website"}
            )
            
            assert response.status_code == 200
            data = response.json()
            assert data["success"] is True
            assert data["status"] == "subscribed"
            assert "You're in!" in data["message"]

    def test_already_subscribed(self, client):
        """Test subscription when already subscribed"""
        with patch('app.api.routes.newsletter.prisma') as mock_prisma:
            mock_prisma.newslettersubscriber.find_unique = AsyncMock(return_value=MagicMock(
                status="active",
                email="test@example.com"
            ))
            
            response = client.post(
                "/api/newsletter/subscribe",
                json={"email": "test@example.com"}
            )
            
            assert response.status_code == 200
            data = response.json()
            assert data["success"] is True
            assert data["status"] == "already_subscribed"

    def test_resubscribe(self, client):
        """Test re-subscription after unsubscribing"""
        with patch('app.api.routes.newsletter.prisma') as mock_prisma, \
             patch('app.api.routes.newsletter.MailgunService') as mock_mailgun:
            
            mock_prisma.newslettersubscriber.find_unique = AsyncMock(return_value=MagicMock(
                status="unsubscribed",
                email="test@example.com"
            ))
            mock_prisma.newslettersubscriber.update = AsyncMock(return_value=MagicMock())
            
            mock_mailgun_instance = MagicMock()
            mock_mailgun.return_value = mock_mailgun_instance
            
            response = client.post(
                "/api/newsletter/subscribe",
                json={"email": "test@example.com"}
            )
            
            assert response.status_code == 200
            data = response.json()
            assert data["success"] is True
            assert data["status"] == "resubscribed"


class TestNewsletterUnsubscribe:
    """Test newsletter unsubscription endpoint"""

    def test_unsubscribe_success(self, client):
        """Test successful unsubscription"""
        with patch('app.api.routes.newsletter.prisma') as mock_prisma:
            mock_prisma.newslettersubscriber.find_unique = AsyncMock(return_value=MagicMock(
                status="active",
                email="test@example.com"
            ))
            mock_prisma.newslettersubscriber.update = AsyncMock(return_value=MagicMock())
            
            response = client.post(
                "/api/newsletter/unsubscribe",
                json={"email": "test@example.com"}
            )
            
            assert response.status_code == 200
            data = response.json()
            assert data["success"] is True
            assert "unsubscribed" in data["message"].lower()

    def test_unsubscribe_not_found(self, client):
        """Test unsubscription when email not found"""
        with patch('app.api.routes.newsletter.prisma') as mock_prisma:
            mock_prisma.newslettersubscriber.find_unique = AsyncMock(return_value=None)
            
            response = client.post(
                "/api/newsletter/unsubscribe",
                json={"email": "unknown@example.com"}
            )
            
            assert response.status_code == 200
            data = response.json()
            assert data["success"] is True
            assert "not found" in data["message"].lower()


class TestNewsletterStats:
    """Test newsletter statistics endpoint"""

    def test_subscriber_count(self, client):
        """Test getting subscriber count"""
        with patch('app.api.routes.stats.prisma') as mock_prisma:
            mock_prisma.newslettersubscriber.count = AsyncMock(return_value=150)
            
            response = client.get("/api/stats/subscribers")
            
            assert response.status_code == 200
            data = response.json()
            assert data["count"] == 150

    def test_subscriber_count_error(self, client):
        """Test subscriber count returns 0 on error"""
        with patch('app.api.routes.stats.prisma') as mock_prisma:
            mock_prisma.newslettersubscriber.count = AsyncMock(side_effect=Exception("DB error"))
            
            response = client.get("/api/stats/subscribers")
            
            assert response.status_code == 200
            data = response.json()
            assert data["count"] == 0
