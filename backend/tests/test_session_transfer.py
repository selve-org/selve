"""
Test: Session Transfer Updates Both Session and Result

This test verifies that when a guest (anonymous) assessment session is transferred
to an authenticated user, BOTH the AssessmentSession AND AssessmentResult records
are updated with the user's clerkUserId.

This fixes the bug where guest users complete the assessment, login, and then
see "Complete Your Assessment First" on the Invites page.
"""

import pytest
from datetime import datetime, timezone
from unittest.mock import AsyncMock, MagicMock, patch
from app.services.assessment_service import AssessmentService


class TestSessionTransfer:
    """Test suite for session transfer functionality."""
    
    @pytest.fixture
    def mock_db(self):
        """Create a mock database client."""
        return MagicMock()
    
    @pytest.fixture
    def service(self, mock_db):
        """Create an AssessmentService with mocked DB."""
        service = AssessmentService()
        service.db = mock_db
        return service

    @pytest.mark.asyncio
    async def test_transfer_session_updates_assessment_result(self, service, mock_db):
        """
        When a guest session is transferred to an authenticated user,
        both AssessmentSession AND AssessmentResult should be updated.
        """
        # Arrange
        session_id = "test_session_123"
        clerk_user_id = "user_clerk_abc"
        
        # Mock session data (anonymous session)
        mock_session = MagicMock()
        mock_session.id = session_id
        mock_session.clerkUserId = None  # Anonymous session
        mock_session.createdAt = datetime.now(timezone.utc)  # Recent session
        mock_session.metadata = {}
        mock_session.result = None
        
        # Mock existing result for the session
        mock_result = MagicMock()
        mock_result.id = "result_123"
        mock_result.sessionId = session_id
        mock_result.clerkUserId = None  # Not linked to any user
        
        # Setup mock returns
        mock_db.assessmentsession.find_unique = AsyncMock(return_value=mock_session)
        mock_db.assessmentsession.update_many = AsyncMock(return_value=None)
        mock_db.assessmentresult.update_many = AsyncMock(return_value=None)
        mock_db.assessmentsession.update = AsyncMock(return_value=mock_session)
        mock_db.assessmentresult.find_first = AsyncMock(return_value=mock_result)
        mock_db.assessmentresult.update = AsyncMock(return_value=mock_result)
        
        # Act
        result = await service.transfer_session_to_user(session_id, clerk_user_id)
        
        # Assert - Session was updated
        mock_db.assessmentsession.update.assert_called_once()
        session_update_call = mock_db.assessmentsession.update.call_args
        assert session_update_call.kwargs["where"]["id"] == session_id
        assert session_update_call.kwargs["data"]["clerkUserId"] == clerk_user_id
        assert session_update_call.kwargs["data"]["isCurrent"] == True
        
        # Assert - Result was found and updated
        mock_db.assessmentresult.find_first.assert_called_once()
        result_find_call = mock_db.assessmentresult.find_first.call_args
        assert result_find_call.kwargs["where"]["sessionId"] == session_id
        
        mock_db.assessmentresult.update.assert_called_once()
        result_update_call = mock_db.assessmentresult.update.call_args
        assert result_update_call.kwargs["where"]["id"] == mock_result.id
        assert result_update_call.kwargs["data"]["clerkUserId"] == clerk_user_id
        assert result_update_call.kwargs["data"]["isCurrent"] == True

    @pytest.mark.asyncio
    async def test_transfer_archives_existing_user_results(self, service, mock_db):
        """
        When transferring a session, any existing current results for the user
        should be archived (isCurrent=False).
        """
        # Arrange
        session_id = "test_session_new"
        clerk_user_id = "user_existing_123"
        
        mock_session = MagicMock()
        mock_session.id = session_id
        mock_session.clerkUserId = None
        mock_session.createdAt = datetime.now(timezone.utc)
        mock_session.metadata = {}
        
        mock_db.assessmentsession.find_unique = AsyncMock(return_value=mock_session)
        mock_db.assessmentsession.update_many = AsyncMock(return_value=None)
        mock_db.assessmentresult.update_many = AsyncMock(return_value=None)
        mock_db.assessmentsession.update = AsyncMock(return_value=mock_session)
        mock_db.assessmentresult.find_first = AsyncMock(return_value=None)
        
        # Act
        await service.transfer_session_to_user(session_id, clerk_user_id)
        
        # Assert - Existing sessions were archived
        mock_db.assessmentsession.update_many.assert_called_once()
        session_archive_call = mock_db.assessmentsession.update_many.call_args
        assert session_archive_call.kwargs["where"]["clerkUserId"] == clerk_user_id
        assert session_archive_call.kwargs["where"]["isCurrent"] == True
        assert session_archive_call.kwargs["data"]["isCurrent"] == False
        
        # Assert - Existing results were archived
        mock_db.assessmentresult.update_many.assert_called_once()
        result_archive_call = mock_db.assessmentresult.update_many.call_args
        assert result_archive_call.kwargs["where"]["clerkUserId"] == clerk_user_id
        assert result_archive_call.kwargs["where"]["isCurrent"] == True
        assert result_archive_call.kwargs["data"]["isCurrent"] == False

    @pytest.mark.asyncio
    async def test_transfer_handles_no_result(self, service, mock_db):
        """
        Transfer should succeed even if the session has no AssessmentResult yet.
        (User may transfer before completing the assessment)
        """
        # Arrange
        session_id = "test_session_incomplete"
        clerk_user_id = "user_incomplete_123"
        
        mock_session = MagicMock()
        mock_session.id = session_id
        mock_session.clerkUserId = None
        mock_session.createdAt = datetime.now(timezone.utc)
        mock_session.metadata = {}
        
        mock_db.assessmentsession.find_unique = AsyncMock(return_value=mock_session)
        mock_db.assessmentsession.update_many = AsyncMock(return_value=None)
        mock_db.assessmentresult.update_many = AsyncMock(return_value=None)
        mock_db.assessmentsession.update = AsyncMock(return_value=mock_session)
        mock_db.assessmentresult.find_first = AsyncMock(return_value=None)  # No result
        
        # Act
        result = await service.transfer_session_to_user(session_id, clerk_user_id)
        
        # Assert - Should still succeed
        assert result is not None
        mock_db.assessmentsession.update.assert_called_once()
        # Result update should NOT be called since there's no result
        mock_db.assessmentresult.update.assert_not_called()

    @pytest.mark.asyncio
    async def test_transfer_rejects_other_user_session(self, service, mock_db):
        """
        Should not allow transferring a session that already belongs to another user.
        """
        # Arrange
        session_id = "test_session_owned"
        new_user = "user_attacker"
        
        mock_session = MagicMock()
        mock_session.id = session_id
        mock_session.clerkUserId = "user_original_owner"  # Already owned!
        mock_session.createdAt = datetime.now(timezone.utc)
        
        mock_db.assessmentsession.find_unique = AsyncMock(return_value=mock_session)
        
        # Act & Assert
        with pytest.raises(ValueError, match="Session already belongs to another user"):
            await service.transfer_session_to_user(session_id, new_user)
