"""
Assessment Service Layer
Handles all database operations for the assessment system
"""

from typing import Optional, Dict, List, Any
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from sqlalchemy.orm import selectinload

from app.models.assessment import AssessmentSession, AssessmentResult
from app.adaptive_testing import AdaptiveTester
from app.scoring import SelveScorer
from app.response_validator import ResponseValidator


class AssessmentService:
    """Service for managing assessment sessions and results in database"""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def create_session(
        self,
        user_id: Optional[str] = None,
        clerk_user_id: Optional[str] = None,
        metadata: Optional[Dict] = None
    ) -> AssessmentSession:
        """
        Create a new assessment session in database
        
        Args:
            user_id: Optional custom user ID
            clerk_user_id: Clerk authentication user ID
            metadata: Additional session metadata
            
        Returns:
            AssessmentSession object with ID
        """
        # 🔄 For authenticated users, mark any existing current sessions as NOT current
        # This ensures only ONE session is current at a time
        if clerk_user_id:
            await self.db.execute(
                update(AssessmentSession)
                .where(AssessmentSession.clerkUserId == clerk_user_id)
                .where(AssessmentSession.isCurrent == True)
                .values(isCurrent=False, archivedAt=datetime.utcnow())
            )
        
        session = AssessmentSession(
            userId=user_id,
            clerkUserId=clerk_user_id,
            status="in-progress",
            isCurrent=True,  # Explicitly mark as current
            responses={},
            demographics={},
            pendingQuestions=[],
            answerHistory=[],
            backNavigationCount=0,
            backNavigationLog=[],
            sessionData=metadata or {},
        )
        
        self.db.add(session)
        await self.db.commit()
        await self.db.refresh(session)
        
        return session
    
    async def get_session(self, session_id: str) -> Optional[AssessmentSession]:
        """
        Get session by ID with eager loading of result
        
        Args:
            session_id: Session identifier
            
        Returns:
            AssessmentSession or None if not found
        """
        result = await self.db.execute(
            select(AssessmentSession)
            .options(selectinload(AssessmentSession.result))
            .where(AssessmentSession.id == session_id)
        )
        return result.scalar_one_or_none()
    
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
    ) -> Optional[AssessmentSession]:
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
            update_data["responses"] = responses
        if demographics is not None:
            update_data["demographics"] = demographics
        if pending_questions is not None:
            update_data["pendingQuestions"] = pending_questions
        if answer_history is not None:
            update_data["answerHistory"] = answer_history
        if back_navigation_count is not None:
            update_data["backNavigationCount"] = back_navigation_count
        if back_navigation_log is not None:
            update_data["backNavigationLog"] = back_navigation_log
        if status is not None:
            update_data["status"] = status
        
        if not update_data:
            return await self.get_session(session_id)
        
        # Add updatedAt timestamp
        update_data["updatedAt"] = datetime.utcnow()
        
        # Mark as completed if status is completed
        if status == "completed":
            update_data["completedAt"] = datetime.utcnow()
        
        await self.db.execute(
            update(AssessmentSession)
            .where(AssessmentSession.id == session_id)
            .values(**update_data)
        )
        await self.db.commit()
        
        return await self.get_session(session_id)
    
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
    ) -> AssessmentResult:
        """
        Save final assessment results
        
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
            AssessmentResult object
        """
        # Get session to extract user IDs
        session = await self.get_session(session_id)
        if not session:
            raise ValueError(f"Session {session_id} not found")
        
        # 🔄 Mark any existing results for this user as NOT current
        if session.clerkUserId:
            await self.db.execute(
                update(AssessmentResult)
                .where(AssessmentResult.clerkUserId == session.clerkUserId)
                .where(AssessmentResult.isCurrent == True)
                .values(isCurrent=False)
            )
        
        # Create result (will have isCurrent=True by default from schema)
        result = AssessmentResult(
            sessionId=session_id,
            userId=session.userId,
            clerkUserId=session.clerkUserId,
            isCurrent=True,  # Explicitly set as current
            scoreLumen=scores.get("LUMEN", 0),
            scoreAether=scores.get("AETHER", 0),
            scoreOrpheus=scores.get("ORPHEUS", 0),
            scoreOrin=scores.get("ORIN", 0),
            scoreLyra=scores.get("LYRA", 0),
            scoreVara=scores.get("VARA", 0),
            scoreChronos=scores.get("CHRONOS", 0),
            scoreKael=scores.get("KAEL", 0),
            narrative=narrative,
            archetype=archetype,
            profilePattern=profile_pattern,
            consistencyScore=consistency_score,
            attentionScore=attention_score,
            validationFlags=validation_flags,
            generationCost=generation_cost,
            generationModel=generation_model,
        )
        
        self.db.add(result)
        
        # Update session status to completed
        await self.update_session(session_id, status="completed")
        
        await self.db.commit()
        await self.db.refresh(result)
        
        return result
    
    async def get_result(self, session_id: str) -> Optional[AssessmentResult]:
        """
        Get result by session ID
        
        Args:
            session_id: Session identifier
            
        Returns:
            AssessmentResult or None if not found
        """
        result = await self.db.execute(
            select(AssessmentResult)
            .where(AssessmentResult.sessionId == session_id)
        )
        return result.scalar_one_or_none()
    
    async def get_user_sessions(
        self,
        clerk_user_id: str,
        include_completed: bool = True,
        include_in_progress: bool = True,
    ) -> List[AssessmentSession]:
        """
        Get all sessions for a user
        
        Args:
            clerk_user_id: Clerk user ID
            include_completed: Include completed sessions
            include_in_progress: Include in-progress sessions
            
        Returns:
            List of AssessmentSession objects
        """
        query = select(AssessmentSession).where(
            AssessmentSession.clerkUserId == clerk_user_id
        )
        
        # Filter by status
        if include_completed and not include_in_progress:
            query = query.where(AssessmentSession.status == "completed")
        elif include_in_progress and not include_completed:
            query = query.where(AssessmentSession.status == "in-progress")
        
        query = query.order_by(AssessmentSession.createdAt.desc())
        
        result = await self.db.execute(query)
        return result.scalars().all()
    
    async def transfer_session_to_user(
        self,
        session_id: str,
        clerk_user_id: str
    ) -> Optional[AssessmentSession]:
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
        await self.db.execute(
            update(AssessmentSession)
            .where(AssessmentSession.id == session_id)
            .values(
                clerkUserId=clerk_user_id,
                updatedAt=datetime.utcnow(),
                sessionData={
                    **(session.sessionData or {}),
                    "transferred_at": datetime.utcnow().isoformat(),
                }
            )
        )
        await self.db.commit()
        
        return await self.get_session(session_id)
    
    async def abandon_session(self, session_id: str) -> Optional[AssessmentSession]:
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
    ) -> AssessmentSession:
        """
        Archive user's current assessment(s) and create a new one.
        This preserves all previous assessment data while starting fresh.
        
        Args:
            clerk_user_id: Clerk user ID (for authenticated users)
            user_id: Legacy user ID (optional)
            
        Returns:
            Newly created AssessmentSession
            
        Raises:
            Exception if database operations fail
        """
        try:
            # Archive all current sessions and results for this user
            if clerk_user_id:
                # Mark all current sessions as archived
                await self.db.execute(
                    update(AssessmentSession)
                    .where(AssessmentSession.clerkUserId == clerk_user_id)
                    .where(AssessmentSession.isCurrent == True)
                    .values(isCurrent=False, archivedAt=datetime.utcnow())
                )
                
                # Mark all current results as archived
                await self.db.execute(
                    update(AssessmentResult)
                    .where(AssessmentResult.clerkUserId == clerk_user_id)
                    .where(AssessmentResult.isCurrent == True)
                    .values(isCurrent=False)
                )
                
                await self.db.commit()
            
            # Create new session (will have isCurrent=True by default)
            new_session = await self.create_session(
                clerk_user_id=clerk_user_id,
                user_id=user_id
            )
            
            return new_session
            
        except Exception as e:
            await self.db.rollback()
            raise Exception(f"Failed to archive and create new session: {str(e)}")
    
    async def get_current_session(
        self, 
        clerk_user_id: str
    ) -> Optional[AssessmentSession]:
        """
        Get user's current (active) assessment session
        
        Args:
            clerk_user_id: Clerk user ID
            
        Returns:
            Current AssessmentSession or None if no current session exists
        """
        result = await self.db.execute(
            select(AssessmentSession)
            .where(AssessmentSession.clerkUserId == clerk_user_id)
            .where(AssessmentSession.isCurrent == True)
            .order_by(AssessmentSession.createdAt.desc())
        )
        return result.scalar_one_or_none()
    
    async def get_current_result(
        self, 
        clerk_user_id: str
    ) -> Optional[AssessmentResult]:
        """
        Get user's current (latest) assessment result
        
        Args:
            clerk_user_id: Clerk user ID
            
        Returns:
            Current AssessmentResult or None if no current result exists
        """
        result = await self.db.execute(
            select(AssessmentResult)
            .where(AssessmentResult.clerkUserId == clerk_user_id)
            .where(AssessmentResult.isCurrent == True)
            .order_by(AssessmentResult.createdAt.desc())
        )
        return result.scalar_one_or_none()
    
    async def get_assessment_history(
        self, 
        clerk_user_id: str,
        include_current: bool = True,
        limit: int = 10
    ) -> List[AssessmentSession]:
        """
        Get user's assessment history (all past assessments)
        
        Args:
            clerk_user_id: Clerk user ID
            include_current: Whether to include current assessment
            limit: Maximum number of results
            
        Returns:
            List of AssessmentSessions ordered by creation date (newest first)
        """
        query = select(AssessmentSession).where(
            AssessmentSession.clerkUserId == clerk_user_id
        )
        
        if not include_current:
            query = query.where(AssessmentSession.isCurrent == False)
        
        query = query.order_by(AssessmentSession.createdAt.desc()).limit(limit)
        
        result = await self.db.execute(query)
        return list(result.scalars().all())
    
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
        
        await self.db.delete(session)
        await self.db.commit()
        
        return True


# Helper to create session state dict compatible with existing code
def session_to_state_dict(session: AssessmentSession) -> Dict:
    """
    Convert database session to in-memory state dict
    Used for backward compatibility with existing route code
    
    Args:
        session: Database session object
        
    Returns:
        State dict with tester, scorer, validator instances
    """
    return {
        "tester": AdaptiveTester(),
        "scorer": SelveScorer(),
        "validator": ResponseValidator(),
        "responses": session.responses or {},
        "demographics": session.demographics or {},
        "pending_questions": set(session.pendingQuestions or []),
        "current_batch": [],  # Will be populated on next question
        "batch_history": [],  # Could reconstruct from answer_history if needed
        "answer_history": session.answerHistory or [],
        "back_navigation_count": session.backNavigationCount or 0,
        "back_navigation_log": session.backNavigationLog or [],
        "started_at": session.createdAt.isoformat(),
        "user_id": session.clerkUserId,
        "clerk_user": None,  # Not stored in DB
        "metadata": session.sessionData or {},
    }


# Helper to update database from state dict
async def update_session_from_state(
    service: AssessmentService,
    session_id: str,
    state: Dict
) -> None:
    """
    Update database session from in-memory state dict
    
    Args:
        service: AssessmentService instance
        session_id: Session ID to update
        state: State dict from route handler
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
