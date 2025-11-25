"""
Friend Insights Service

Business logic for generating, caching, and retrieving friend insights narratives.
Handles change detection via inputHash to avoid unnecessary regenerations.
"""
import hashlib
import json
import logging
from datetime import datetime
from typing import Dict, List, Optional, Any

from app.narratives.friend_insights_generator import generate_friend_insights_narrative

logger = logging.getLogger(__name__)


class FriendInsightsService:
    """Service for managing friend insights narratives."""
    
    BLIND_SPOT_THRESHOLD = 15.0  # Points difference to qualify as blind spot
    
    def __init__(self, prisma_client):
        """
        Initialize service.
        
        Args:
            prisma_client: Prisma database client
        """
        self.db = prisma_client
    
    def compute_input_hash(
        self,
        friend_response_ids: List[str],
        self_scores: Dict[str, float],
        friend_scores: Dict[str, float]
    ) -> str:
        """
        Compute a stable hash of inputs to detect changes.
        
        Args:
            friend_response_ids: List of FriendResponse IDs
            self_scores: Self-assessment scores
            friend_scores: Aggregated friend scores
            
        Returns:
            SHA256 hash string
        """
        # Sort everything for stability
        sorted_ids = sorted(friend_response_ids)
        sorted_self = json.dumps(dict(sorted(self_scores.items())), sort_keys=True)
        sorted_friend = json.dumps(dict(sorted(friend_scores.items())), sort_keys=True)
        
        # Combine into single string
        combined = f"{sorted_ids}|{sorted_self}|{sorted_friend}"
        
        # Return SHA256 hash
        return hashlib.sha256(combined.encode()).hexdigest()
    
    def identify_blind_spots(
        self,
        self_scores: Dict[str, float],
        friend_scores: Dict[str, float]
    ) -> List[Dict]:
        """
        Identify blind spots where self-perception differs significantly from friends.
        
        Args:
            self_scores: Self-assessment scores
            friend_scores: Aggregated friend scores
            
        Returns:
            List of blind spot dicts with dimension, selfScore, friendScore, diff
        """
        blind_spots = []
        
        for dimension in self_scores:
            if dimension not in friend_scores or friend_scores[dimension] is None:
                continue
            
            self_score = self_scores[dimension]
            friend_score = friend_scores[dimension]
            diff = friend_score - self_score
            
            if abs(diff) >= self.BLIND_SPOT_THRESHOLD:
                blind_spots.append({
                    "dimension": dimension,
                    "selfScore": round(self_score, 1),
                    "friendScore": round(friend_score, 1),
                    "diff": round(diff, 1),
                    "type": "underestimate" if diff > 0 else "overestimate"
                })
        
        # Sort by absolute difference (biggest gaps first)
        blind_spots.sort(key=lambda x: abs(x["diff"]), reverse=True)
        
        return blind_spots
    
    async def get_current_narrative(self, session_id: str) -> Optional[Dict]:
        """
        Get the current narrative for a session if it exists.
        
        Args:
            session_id: Assessment session ID
            
        Returns:
            Dict with narrative data, or None if no current narrative
        """
        generation = await self.db.friendinsightgeneration.find_first(
            where={
                "sessionId": session_id,
                "isCurrent": True
            },
            order={"createdAt": "desc"}
        )
        
        if generation:
            return {
                "narrative": generation.narrative,
                "generatedAt": generation.createdAt.isoformat(),
                "friendCount": generation.friendCount,
                "hasError": generation.generationError is not None,
                "error": generation.generationError,
            }
        
        return None
    
    async def should_regenerate(
        self,
        session_id: str,
        new_input_hash: str
    ) -> tuple[bool, str]:
        """
        Check if we need to regenerate the narrative.
        
        Args:
            session_id: Assessment session ID
            new_input_hash: Hash of current inputs
            
        Returns:
            Tuple of (should_regenerate, reason)
        """
        # Find current generation
        current = await self.db.friendinsightgeneration.find_first(
            where={
                "sessionId": session_id,
                "isCurrent": True
            }
        )
        
        if not current:
            return True, "initial"
        
        if current.inputHash != new_input_hash:
            return True, "new-friend-response"
        
        # Check if current generation failed
        if current.narrative is None and current.generationError:
            return True, "retry-failed"
        
        return False, "no-change"
    
    async def generate_and_store(
        self,
        session_id: str,
        self_scores: Dict[str, float],
        friend_scores: Dict[str, float],
        friend_response_ids: List[str],
        regenerated_because: str = "initial"
    ) -> Dict[str, Any]:
        """
        Generate a new narrative and store it.
        
        Args:
            session_id: Assessment session ID
            self_scores: User's self-assessment scores
            friend_scores: Aggregated friend scores
            friend_response_ids: List of FriendResponse IDs used
            regenerated_because: Reason for regeneration
            
        Returns:
            Dict with narrative and metadata
        """
        logger.info(f"Generating friend insights for session {session_id}")
        
        # Compute hash and blind spots
        input_hash = self.compute_input_hash(
            friend_response_ids=friend_response_ids,
            self_scores=self_scores,
            friend_scores=friend_scores
        )
        
        blind_spots = self.identify_blind_spots(
            self_scores=self_scores,
            friend_scores=friend_scores
        )
        
        friend_count = len(friend_response_ids)
        now = datetime.utcnow()
        
        # Generate narrative
        result = generate_friend_insights_narrative(
            self_scores=self_scores,
            friend_scores=friend_scores,
            blind_spots=blind_spots,
            friend_count=friend_count
        )
        
        # Mark old generations as not current
        await self.db.friendinsightgeneration.update_many(
            where={
                "sessionId": session_id,
                "isCurrent": True
            },
            data={"isCurrent": False}
        )
        
        # Store new generation
        generation = await self.db.friendinsightgeneration.create(
            data={
                "sessionId": session_id,
                "selfScores": json.dumps(self_scores),
                "friendScores": json.dumps(friend_scores),
                "blindSpots": json.dumps(blind_spots),
                "friendCount": friend_count,
                "friendResponseIds": friend_response_ids,
                "inputHash": input_hash,
                "selfScoresFrozenAt": now,
                "friendScoresFrozenAt": now,
                "narrative": result.get("narrative"),
                "generationModel": result.get("model"),
                "promptTokens": result.get("promptTokens"),
                "completionTokens": result.get("completionTokens"),
                "generationCost": result.get("cost"),
                "generationError": result.get("error"),
                "regeneratedBecause": regenerated_because,
                "tone": "friendly",
                "isCurrent": True,
            }
        )
        
        # Log any violations for monitoring
        violations = result.get("violations", [])
        if violations:
            logger.warning(f"Narrative for session {session_id} contains forbidden words: {violations}")
        
        logger.info(f"Stored friend insight generation {generation.id} for session {session_id}")
        
        return {
            "narrative": result.get("narrative"),
            "generatedAt": generation.createdAt.isoformat(),
            "friendCount": friend_count,
            "hasError": result.get("error") is not None,
            "error": result.get("error"),
            "blindSpots": blind_spots,
            "cost": result.get("cost"),
        }
    
    async def get_or_generate_narrative(
        self,
        session_id: str,
        self_scores: Dict[str, float],
        friend_scores: Dict[str, float],
        friend_response_ids: List[str]
    ) -> Dict[str, Any]:
        """
        Get existing narrative or generate a new one if needed.
        
        This is the main entry point for the service.
        
        Args:
            session_id: Assessment session ID
            self_scores: User's self-assessment scores
            friend_scores: Aggregated friend scores
            friend_response_ids: List of FriendResponse IDs used
            
        Returns:
            Dict with narrative and metadata
        """
        # Compute current hash
        current_hash = self.compute_input_hash(
            friend_response_ids=friend_response_ids,
            self_scores=self_scores,
            friend_scores=friend_scores
        )
        
        # Check if regeneration needed
        needs_regeneration, reason = await self.should_regenerate(
            session_id=session_id,
            new_input_hash=current_hash
        )
        
        if needs_regeneration:
            logger.info(f"Regenerating narrative for session {session_id}: {reason}")
            return await self.generate_and_store(
                session_id=session_id,
                self_scores=self_scores,
                friend_scores=friend_scores,
                friend_response_ids=friend_response_ids,
                regenerated_because=reason
            )
        
        # Return existing narrative
        current = await self.get_current_narrative(session_id)
        
        if current:
            # Add blind spots to response
            blind_spots = self.identify_blind_spots(self_scores, friend_scores)
            current["blindSpots"] = blind_spots
            return current
        
        # Shouldn't get here, but handle it
        return await self.generate_and_store(
            session_id=session_id,
            self_scores=self_scores,
            friend_scores=friend_scores,
            friend_response_ids=friend_response_ids,
            regenerated_because="fallback"
        )


# Fallback messages when generation fails
FALLBACK_MESSAGES = {
    "generating": "Your friend insights summary is being generated. Check back in a moment!",
    "error": "We're having trouble generating your summary right now. Your friend comparison data is still available above.",
    "no_friends": "Invite friends to complete your assessment to see how their perception compares to yours!",
}


def get_fallback_message(error_type: str = "error") -> str:
    """Get a user-friendly fallback message."""
    return FALLBACK_MESSAGES.get(error_type, FALLBACK_MESSAGES["error"])


__all__ = [
    "FriendInsightsService",
    "FALLBACK_MESSAGES",
    "get_fallback_message",
]
