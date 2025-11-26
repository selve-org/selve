"""
Tests for Newsletter API routes

Tests subscription, unsubscription, and stats functionality
"""

import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient


class TestNewsletterSubscribe:
    """Test newsletter subscription endpoint"""

    @pytest.fixture
    def mock_prisma(self):
        """Mock Prisma client"""
        with patch('app.api.routes.newsletter.prisma') as mock:
            yield mock

    @pytest.fixture
    def mock_mailgun(self):
        """Mock MailgunService"""
        with patch('app.api.routes.newsletter.MailgunService') as mock:
            yield mock

    @pytest.mark.asyncio
    async def test_new_subscription_success(self, mock_prisma, mock_mailgun, client):
        """Test successful new subscription"""
        mock_prisma.newslettersubscriber.find_unique.return_value = None
        mock_prisma.user.find_first.return_value = None
        mock_prisma.newslettersubscriber.create.return_value = MagicMock(id="sub_123")
        
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

    @pytest.mark.asyncio
    async def test_already_subscribed(self, mock_prisma, client):
        """Test subscription when already subscribed"""
        mock_prisma.newslettersubscriber.find_unique.return_value = MagicMock(
            status="active",
            email="test@example.com"
        )
        
        response = client.post(
            "/api/newsletter/subscribe",
            json={"email": "test@example.com"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["status"] == "already_subscribed"

    @pytest.mark.asyncio
    async def test_resubscribe(self, mock_prisma, mock_mailgun, client):
        """Test re-subscription after unsubscribing"""
        mock_prisma.newslettersubscriber.find_unique.return_value = MagicMock(
            status="unsubscribed",
            email="test@example.com"
        )
        mock_prisma.newslettersubscriber.update.return_value = MagicMock()
        
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

    @pytest.fixture
    def mock_prisma(self):
        """Mock Prisma client"""
        with patch('app.api.routes.newsletter.prisma') as mock:
            yield mock

    @pytest.mark.asyncio
    async def test_unsubscribe_success(self, mock_prisma, client):
        """Test successful unsubscription"""
        mock_prisma.newslettersubscriber.find_unique.return_value = MagicMock(
            status="active",
            email="test@example.com"
        )
        mock_prisma.newslettersubscriber.update.return_value = MagicMock()
        
        response = client.post(
            "/api/newsletter/unsubscribe",
            json={"email": "test@example.com"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "unsubscribed" in data["message"].lower()

    @pytest.mark.asyncio
    async def test_unsubscribe_not_found(self, mock_prisma, client):
        """Test unsubscription when email not found"""
        mock_prisma.newslettersubscriber.find_unique.return_value = None
        
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

    @pytest.fixture
    def mock_prisma(self):
        """Mock Prisma client"""
        with patch('app.api.routes.stats.prisma') as mock:
            yield mock

    @pytest.mark.asyncio
    async def test_subscriber_count(self, mock_prisma, client):
        """Test getting subscriber count"""
        mock_prisma.newslettersubscriber.count.return_value = 150
        
        response = client.get("/api/stats/subscribers")
        
        assert response.status_code == 200
        data = response.json()
        assert data["count"] == 150

    @pytest.mark.asyncio
    async def test_subscriber_count_error(self, mock_prisma, client):
        """Test subscriber count returns 0 on error"""
        mock_prisma.newslettersubscriber.count.side_effect = Exception("DB error")
        
        response = client.get("/api/stats/subscribers")
        
        assert response.status_code == 200
        data = response.json()
        assert data["count"] == 0
