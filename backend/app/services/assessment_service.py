"""
Assessment Service Layer - Prisma Version
Handles all database operations for the assessment system using Prisma
"""

import logging
from typing import Optional, Dict, List, Any
from datetime import datetime, timezone
from prisma import fields

from app.db import prisma
from app.utils.db_retry import with_db_retry
from app.adaptive_testing import AdaptiveTester
from app.scoring import SelveScorer
from app.response_validator import ResponseValidator


logger = logging.getLogger(__name__)


class AssessmentService:
    """Service for managing assessment sessions and results in database"""
    
    def __init__(self):
        """Initialize service with Prisma client"""
        self.db = prisma
    
    async def create_session(
        self,
        user_id: Optional[str] = None,
        clerk_user_id: Optional[str] = None,
        metadata: Optional[Dict] = None
    ):
        """
        Create a new assessment session in database
        
        Args:
            user_id: Optional custom user ID
            clerk_user_id: Clerk authentication user ID
            metadata: Additional session metadata
            
        Returns:
            AssessmentSession object with ID
        """
        # Mark any existing current sessions as NOT current
        if clerk_user_id:
            await self.db.assessmentsession.update_many(
                where={
                    "clerkUserId": clerk_user_id,
                    "isCurrent": True
                },
                data={
                    "isCurrent": False,
                    "archivedAt": datetime.now(timezone.utc)
                }
            )
        
        session = await self.db.assessmentsession.create(
            data={
                "userId": user_id,
                "clerkUserId": clerk_user_id,
                "status": "in-progress",
                "isCurrent": True,
                "responses": fields.Json({}),
                "demographics": fields.Json({}),
                "pendingQuestions": fields.Json([]),
                "answerHistory": fields.Json([]),
                "backNavigationCount": 0,
                "backNavigationLog": fields.Json([]),
                "metadata": fields.Json(metadata or {}),
            }
        )
        
        return session
    
    async def get_session(self, session_id: str):
        """
        Get session by ID with result relation
        
        Args:
            session_id: Session identifier
            
        Returns:
            AssessmentSession or None if not found
        """
        return await with_db_retry(
            lambda: self.db.assessmentsession.find_unique(
                where={"id": session_id},
                include={"result": True}
            ),
            operation_name="get_session"
        )
    
    async def update_session(
        self,
        session_id: str,
        responses: Optional[Dict] = None,
        demographics: Optional[Dict] = None,
        pending_questions: Optional[List] = None,
        answer_history: Optional[List] = None,
        back_navigation_count: Optional[int] = None,
        back_navigation_log: Optional[List] = None,
        status: Optional[str] = None,
    ):
        """
        Update session fields
        
        Args:
            session_id: Session to update
            responses: Updated personality responses
            demographics: Updated demographic data
            pending_questions: Updated pending questions list
            answer_history: Updated answer history
            back_navigation_count: Updated back navigation count
            back_navigation_log: Updated back navigation log
            status: Updated status
            
        Returns:
            Updated AssessmentSession or None if not found
        """
        # Build update dict - only include provided fields
        update_data = {}
        if responses is not None:
            update_data["responses"] = fields.Json(responses)
        if demographics is not None:
            update_data["demographics"] = fields.Json(demographics)
        if pending_questions is not None:
            update_data["pendingQuestions"] = fields.Json(pending_questions)
        if answer_history is not None:
            update_data["answerHistory"] = fields.Json(answer_history)
        if back_navigation_count is not None:
            update_data["backNavigationCount"] = back_navigation_count
        if back_navigation_log is not None:
            update_data["backNavigationLog"] = fields.Json(back_navigation_log)
        if status is not None:
            update_data["status"] = status
        
        if not update_data:
            return await self.get_session(session_id)
        
        # Add updatedAt timestamp
        update_data["updatedAt"] = datetime.now(timezone.utc)
        
        # Mark as completed if status is completed
        if status == "completed":
            update_data["completedAt"] = datetime.now(timezone.utc)
        
        return await self.db.assessmentsession.update(
            where={"id": session_id},
            data=update_data
        )
    
    async def save_result(
        self,
        session_id: str,
        scores: Dict[str, float],
        narrative: Dict[str, Any],
        archetype: Optional[str] = None,
        profile_pattern: Optional[str] = None,
        consistency_score: Optional[float] = None,
        attention_score: Optional[float] = None,
        validation_flags: Optional[List] = None,
        generation_cost: Optional[float] = None,
        generation_model: Optional[str] = None,
    ):
        """
        Save final assessment results (idempotent)
        
        Args:
            session_id: Session this result belongs to
            scores: Dimension scores dict (LUMEN, AETHER, etc.)
            narrative: Complete narrative structure
            archetype: Primary archetype name
            profile_pattern: Profile pattern description
            consistency_score: Response consistency (0-100)
            attention_score: Attention check score (0-100)
            validation_flags: Quality flags
            generation_cost: OpenAI cost in USD
            generation_model: Model used for generation
            
        Returns:
            AssessmentResult object (existing or newly created)
        """
        # Check if result already exists (idempotency)
        existing_result = await self.get_result(session_id)
        if existing_result:
            print(f"⚠️ Result already exists for session {session_id}, returning existing")
            return existing_result

        # Get session to extract user IDs
        session = await self.get_session(session_id)
        if not session:
            raise ValueError(f"Session {session_id} not found")

        # Mark any existing results for this user as NOT current
        if session.clerkUserId:
            await self.db.assessmentresult.update_many(
                where={
                    "clerkUserId": session.clerkUserId,
                    "isCurrent": True
                },
                data={"isCurrent": False}
            )

        # Create result
        result = await self.db.assessmentresult.create(
            data={
                "session": {"connect": {"id": session_id}},
                "userId": session.userId,
                "clerkUserId": session.clerkUserId,
                "isCurrent": True,
                "scoreLumen": scores.get("LUMEN", 0),
                "scoreAether": scores.get("AETHER", 0),
                "scoreOrpheus": scores.get("ORPHEUS", 0),
                "scoreOrin": scores.get("ORIN", 0),
                "scoreLyra": scores.get("LYRA", 0),
                "scoreVara": scores.get("VARA", 0),
                "scoreChronos": scores.get("CHRONOS", 0),
                "scoreKael": scores.get("KAEL", 0),
                "narrative": fields.Json(narrative),
                "archetype": archetype,
                "profilePattern": profile_pattern,
                "consistencyScore": consistency_score,
                "attentionScore": attention_score,
                "validationFlags": fields.Json(validation_flags) if validation_flags else None,
                "generationCost": generation_cost,
                "generationModel": generation_model,
            }
        )

        # Update session status to completed
        await self.update_session(session_id, status="completed")

        # Send assessment completion email (fire and forget)
        try:
            if session.clerkUserId:
                # Get user info for email
                user = await self.db.user.find_unique(
                    where={"clerkId": session.clerkUserId}
                )
                
                if user and user.email:
                    from app.services.mailgun_service import MailgunService
                    import os
                    
                    base_url = os.getenv("FRONTEND_URL", "https://selve.me")
                    results_url = f"{base_url}/results/{session_id}"
                    
                    mailgun = MailgunService()
                    mailgun.send_assessment_complete_email(
                        to_email=user.email,
                        to_name=user.name or "there",
                        archetype=archetype or "Your Unique Profile",
                        results_url=results_url
                    )
                    logger.info(f"Assessment completion email sent to {user.email}")
        except Exception as email_error:
            # Don't fail result saving if email fails
            logger.warning(f"Failed to send assessment completion email: {email_error}")

        return result
    
    async def get_result(self, session_id: str):
        """
        Get result by session ID
        
        Args:
            session_id: Session identifier
            
        Returns:
            AssessmentResult or None if not found
        """
        return await with_db_retry(
            lambda: self.db.assessmentresult.find_first(
                where={"sessionId": session_id}
            ),
            operation_name="get_result"
        )
    
    async def get_user_sessions(
        self,
        clerk_user_id: str,
        include_completed: bool = True,
        include_in_progress: bool = True,
    ):
        """
        Get all sessions for a user
        
        Args:
            clerk_user_id: Clerk user ID
            include_completed: Include completed sessions
            include_in_progress: Include in-progress sessions
            
        Returns:
            List of AssessmentSession objects
        """
        where_clause = {"clerkUserId": clerk_user_id}
        
        # Filter by status
        if include_completed and not include_in_progress:
            where_clause["status"] = "completed"
        elif include_in_progress and not include_completed:
            where_clause["status"] = "in-progress"
        
        return await self.db.assessmentsession.find_many(
            where=where_clause,
            order={"createdAt": "desc"}
        )
    
    async def transfer_session_to_user(
        self,
        session_id: str,
        clerk_user_id: str
    ):
        """
        Transfer anonymous session to authenticated user
        
        Args:
            session_id: Session to transfer
            clerk_user_id: Clerk user ID to transfer to
            
        Returns:
            Updated AssessmentSession or None if not found
        """
        session = await self.get_session(session_id)
        if not session:
            return None
        
        # Check if already owned
        if session.clerkUserId == clerk_user_id:
            return session
        
        # Prevent stealing other users' sessions
        if session.clerkUserId is not None:
            raise ValueError("Session already belongs to another user")
        
        # Transfer ownership
        return await self.db.assessmentsession.update(
            where={"id": session_id},
            data={
                "clerkUserId": clerk_user_id,
                "updatedAt": datetime.now(timezone.utc),
                "metadata": fields.Json({
                    **(session.metadata or {}),
                    "transferred_at": datetime.now(timezone.utc).isoformat(),
                })
            }
        )
    
    async def abandon_session(self, session_id: str):
        """
        Mark session as abandoned
        
        Args:
            session_id: Session to abandon
            
        Returns:
            Updated AssessmentSession or None if not found
        """
        return await self.update_session(session_id, status="abandoned")
    
    async def archive_current_and_create_new(
        self, 
        clerk_user_id: Optional[str] = None,
        user_id: Optional[str] = None
    ):
        """
        Archive user's current assessment(s) and create a new one.
        
        Args:
            clerk_user_id: Clerk user ID (for authenticated users)
            user_id: Legacy user ID (optional)
            
        Returns:
            Newly created AssessmentSession
        """
        # Archive all current sessions and results for this user
        if clerk_user_id:
            # Mark all current sessions as archived
            await self.db.assessmentsession.update_many(
                where={
                    "clerkUserId": clerk_user_id,
                    "isCurrent": True
                },
                data={
                    "isCurrent": False,
                    "archivedAt": datetime.now(timezone.utc)
                }
            )
            
            # Mark all current results as archived
            await self.db.assessmentresult.update_many(
                where={
                    "clerkUserId": clerk_user_id,
                    "isCurrent": True
                },
                data={"isCurrent": False}
            )
        
        # Create new session (will have isCurrent=True by default)
        return await self.create_session(
            clerk_user_id=clerk_user_id,
            user_id=user_id
        )
    
    async def get_current_session(self, clerk_user_id: str):
        """
        Get user's current (active) assessment session
        
        Args:
            clerk_user_id: Clerk user ID
            
        Returns:
            Current AssessmentSession or None
        """
        return await with_db_retry(
            lambda: self.db.assessmentsession.find_first(
                where={
                    "clerkUserId": clerk_user_id,
                    "isCurrent": True
                },
                order={"createdAt": "desc"}
            ),
            operation_name="get_current_session"
        )
    
    async def get_current_result(self, clerk_user_id: str):
        """
        Get user's current (latest) assessment result
        
        Args:
            clerk_user_id: Clerk user ID
            
        Returns:
            Current AssessmentResult or None
        """
        return await with_db_retry(
            lambda: self.db.assessmentresult.find_first(
                where={
                    "clerkUserId": clerk_user_id,
                    "isCurrent": True
                },
                order={"createdAt": "desc"}
            ),
            operation_name="get_current_result"
        )
    
    async def get_assessment_history(
        self, 
        clerk_user_id: str,
        include_current: bool = True,
        limit: int = 10
    ):
        """
        Get user's assessment history (all past assessments)
        
        Args:
            clerk_user_id: Clerk user ID
            include_current: Whether to include current assessment
            limit: Maximum number of results
            
        Returns:
            List of AssessmentSessions ordered by creation date
        """
        where_clause = {"clerkUserId": clerk_user_id}
        
        if not include_current:
            where_clause["isCurrent"] = False
        
        return await self.db.assessmentsession.find_many(
            where=where_clause,
            order={"createdAt": "desc"},
            take=limit
        )
    
    async def delete_session(self, session_id: str) -> bool:
        """
        Delete session and cascade to results
        
        Args:
            session_id: Session to delete
            
        Returns:
            True if deleted, False if not found
        """
        session = await self.get_session(session_id)
        if not session:
            return False
        
        await self.db.assessmentsession.delete(
            where={"id": session_id}
        )
        
        return True


# Helper functions for backward compatibility
def session_to_state_dict(session) -> Dict:
    """
    Convert database session to in-memory state dict
    """
    return {
        "tester": AdaptiveTester(),
        "scorer": SelveScorer(),
        "validator": ResponseValidator(),
        "responses": session.responses or {},
        "demographics": session.demographics or {},
        "pending_questions": set(session.pendingQuestions or []),
        "current_batch": [],
        "batch_history": [],
        "answer_history": session.answerHistory or [],
        "back_navigation_count": session.backNavigationCount or 0,
        "back_navigation_log": session.backNavigationLog or [],
        "started_at": session.createdAt.isoformat(),
        "user_id": session.clerkUserId,
        "clerk_user": None,
        "metadata": session.metadata or {},
    }


async def update_session_from_state(
    service: AssessmentService,
    session_id: str,
    state: Dict
) -> None:
    """
    Update database session from in-memory state dict
    """
    await service.update_session(
        session_id=session_id,
        responses=state.get("responses"),
        demographics=state.get("demographics"),
        pending_questions=list(state.get("pending_questions", [])),
        answer_history=state.get("answer_history"),
        back_navigation_count=state.get("back_navigation_count"),
        back_navigation_log=state.get("back_navigation_log"),
    )
