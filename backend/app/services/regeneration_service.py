"""
Profile Regeneration Service

Regenerates user personality profiles incorporating friend insights.
Calculates quality-weighted friend scores, identifies blind spots,
and regenerates narrative with friend data.
"""

import logging
from typing import Dict, List, Any
from datetime import datetime
from app.scoring import SelveScorer
from app.narratives.integrated_generator import IntegratedNarrativeGenerator
from app.services.quality_scoring import QualityScoringService

logger = logging.getLogger(__name__)


class BlindSpot:
    """Represents a discrepancy between self and friend perceptions."""
    
    def __init__(
        self,
        dimension: str,
        self_score: float,
        friend_score: float,
        difference: float,
        spot_type: str
    ):
        self.dimension = dimension
        self.self_score = self_score
        self.friend_score = friend_score
        self.difference = difference
        self.type = spot_type  # 'overestimate' or 'underestimate'
    
    def to_dict(self) -> Dict:
        return {
            'dimension': self.dimension,
            'self_score': round(self.self_score, 1),
            'friend_score': round(self.friend_score, 1),
            'difference': round(self.difference, 1),
            'type': self.type
        }


class RegenerationService:
    """Service for regenerating profiles with friend insights."""
    
    BLIND_SPOT_THRESHOLD = 15.0  # 15-point difference threshold
    
    def __init__(
        self,
        friend_pool_path: str = 'app/data/selve_friend_item_pool.json',
        main_pool_path: str = 'app/data/selve_item_pool_expanded.json'
    ):
        """Initialize with both item pools."""
        self.friend_scorer = SelveScorer(item_pool_path=friend_pool_path)
        self.main_scorer = SelveScorer(item_pool_path=main_pool_path)
        self.quality_service = QualityScoringService(item_pool_path=friend_pool_path)
        self.narrative_generator = IntegratedNarrativeGenerator(use_llm=True)
    
    async def regenerate_profile_with_friend_data(
        self,
        user_id: str,
        self_responses: Dict[str, int],
        friend_responses: List[Dict],
        db
    ) -> Dict[str, Any]:
        """
        Regenerate user's personality profile incorporating friend insights.
        
        Args:
            user_id: User ID
            self_responses: User's self-assessment responses {item_code: score}
            friend_responses: List of friend response records from database
            db: Database session
        
        Returns:
            Dictionary with updated profile data
        """
        logger.info(f"Regenerating profile for user {user_id}")
        logger.info(f"Self responses: {len(self_responses)} items")
        logger.info(f"Friend responses: {len(friend_responses)} friends")
        
        # Step 1: Calculate self scores
        self_profile = self.main_scorer.score_responses(self_responses, validate=True)
        self_scores = {
            'LUMEN': self_profile.lumen.normalized_score,
            'AETHER': self_profile.aether.normalized_score,
            'ORPHEUS': self_profile.orpheus.normalized_score,
            'ORIN': self_profile.orin.normalized_score,
            'LYRA': self_profile.lyra.normalized_score,
            'VARA': self_profile.vara.normalized_score,
            'CHRONOS': self_profile.chronos.normalized_score,
            'KAEL': self_profile.kael.normalized_score
        }
        
        logger.info(f"Self scores: {self_scores}")
        
        # Step 2: Calculate quality-weighted friend scores per dimension
        friend_scores = self._calculate_friend_scores(friend_responses)
        
        logger.info(f"Friend scores: {friend_scores}")
        
        # Step 3: Identify blind spots
        blind_spots = self._identify_blind_spots(self_scores, friend_scores)
        
        logger.info(f"Blind spots: {len(blind_spots)}")
        for spot in blind_spots:
            logger.info(f"  - {spot.dimension}: self={spot.self_score:.1f}, "
                       f"friend={spot.friend_score:.1f}, diff={spot.difference:.1f}, "
                       f"type={spot.type}")
        
        # Step 4: Generate enhanced narrative
        narrative_data = self._generate_narrative_with_insights(
            self_scores=self_scores,
            friend_scores=friend_scores,
            blind_spots=blind_spots,
            n_friends=len(friend_responses)
        )
        
        # Step 5: Prepare result
        result = {
            'self_scores': self_scores,
            'friend_scores': friend_scores,
            'blind_spots': [spot.to_dict() for spot in blind_spots],
            'narrative': narrative_data,
            'n_friends': len(friend_responses),
            'updated_at': datetime.utcnow().isoformat()
        }
        
        logger.info("Profile regeneration complete")
        return result
    
    def _calculate_friend_scores(
        self,
        friend_responses: List[Dict]
    ) -> Dict[str, float]:
        """
        Calculate quality-weighted friend scores for each dimension.
        
        Args:
            friend_responses: List of friend response records with:
                - responses: JSON array of {item_id, value, not_sure, response_time}
                - quality_score: Float 0-100
        
        Returns:
            Dictionary of dimension -> weighted average score
        """
        dimensions = ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']
        friend_scores = {}
        
        for dimension in dimensions:
            weighted_sum = 0.0
            total_weight = 0.0
            
            for friend_resp in friend_responses:
                # Get quality weight
                weight = self.quality_service.get_quality_weight(
                    friend_resp['quality_score']
                )
                
                # Convert friend responses to dict format
                response_dict = {}
                for resp in friend_resp['responses']:
                    if not resp['not_sure']:  # Skip "not sure" responses
                        response_dict[resp['item_id']] = resp['value']
                
                # Calculate friend's score for this dimension
                if response_dict:
                    friend_profile = self.friend_scorer.score_responses(
                        response_dict,
                        validate=False
                    )
                    
                    # Get dimension score
                    dim_score = getattr(
                        friend_profile,
                        dimension.lower()
                    ).normalized_score
                    
                    weighted_sum += dim_score * weight
                    total_weight += weight
            
            # Calculate weighted average
            if total_weight > 0:
                friend_scores[dimension] = weighted_sum / total_weight
            else:
                friend_scores[dimension] = None
        
        return friend_scores
    
    def _identify_blind_spots(
        self,
        self_scores: Dict[str, float],
        friend_scores: Dict[str, float]
    ) -> List[BlindSpot]:
        """
        Identify blind spots where self-perception differs significantly from friends.
        
        Args:
            self_scores: Self-assessment dimension scores
            friend_scores: Friend-assessment dimension scores
        
        Returns:
            List of BlindSpot objects
        """
        blind_spots = []
        
        for dimension in self_scores.keys():
            if friend_scores.get(dimension) is None:
                continue  # No friend data for this dimension
            
            self_score = self_scores[dimension]
            friend_score = friend_scores[dimension]
            difference = friend_score - self_score
            
            if abs(difference) >= self.BLIND_SPOT_THRESHOLD:
                spot_type = 'underestimate' if difference > 0 else 'overestimate'
                
                blind_spot = BlindSpot(
                    dimension=dimension,
                    self_score=self_score,
                    friend_score=friend_score,
                    difference=difference,
                    spot_type=spot_type
                )
                blind_spots.append(blind_spot)
        
        return blind_spots
    
    def _generate_narrative_with_insights(
        self,
        self_scores: Dict[str, float],
        friend_scores: Dict[str, float],
        blind_spots: List[BlindSpot],
        n_friends: int
    ) -> Dict[str, Any]:
        """
        Generate enhanced narrative with friend insights.
        
        Args:
            self_scores: Self-assessment scores
            friend_scores: Friend-assessment scores
            blind_spots: List of blind spots
            n_friends: Number of friends who responded
        
        Returns:
            Complete narrative data with friend insights
        """
        # Generate base narrative from self scores
        # Convert float scores to int for narrative generator
        int_scores = {k: int(round(v)) for k, v in self_scores.items()}
        narrative = self.narrative_generator.generate_narrative(int_scores)
        
        # Add friend insights section if we have friend data
        if n_friends > 0 and any(s is not None for s in friend_scores.values()):
            friend_insights = self._generate_friend_insights_section(
                self_scores=self_scores,
                friend_scores=friend_scores,
                blind_spots=blind_spots,
                n_friends=n_friends
            )
            narrative['friend_insights'] = friend_insights
        
        return narrative
    
    def _generate_friend_insights_section(
        self,
        self_scores: Dict[str, float],
        friend_scores: Dict[str, float],
        blind_spots: List[BlindSpot],
        n_friends: int
    ) -> Dict[str, Any]:
        """
        Generate friend insights section for narrative.
        
        Args:
            self_scores: Self-assessment scores
            friend_scores: Friend-assessment scores
            blind_spots: List of blind spots
            n_friends: Number of friends
        
        Returns:
            Friend insights section data
        """
        # Calculate quality tier distribution (would need to pass this in from caller)
        # For now, just provide summary
        
        insights = {
            'summary': f'{n_friends} friend{"s" if n_friends != 1 else ""} provided insights',
            'blind_spots': [spot.to_dict() for spot in blind_spots],
            'comparison': []
        }
        
        # Add dimension comparisons
        for dimension in self_scores.keys():
            if friend_scores.get(dimension) is not None:
                insights['comparison'].append({
                    'dimension': dimension,
                    'self_score': round(self_scores[dimension], 1),
                    'friend_score': round(friend_scores[dimension], 1),
                    'difference': round(friend_scores[dimension] - self_scores[dimension], 1)
                })
        
        return insights
