"""
Profile Regeneration Service

Regenerates user personality profiles incorporating friend insights.
Uses enhanced blind spot analysis to discover deep patterns.

UPDATED: Now uses EnhancedBlindSpotAnalyzer for comprehensive analysis.
"""

import logging
from typing import Dict, List, Any
from datetime import datetime
from app.scoring import SelveScorer
from app.narratives.integrated_generator import IntegratedNarrativeGenerator
from app.narratives.friend_insights_generator import generate_friend_insights_narrative
from app.services.quality_scoring import QualityScoringService
from app.services.enhanced_blind_spot_analyzer import EnhancedBlindSpotAnalyzer

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
    """
    Service for regenerating profiles with friend insights.

    UPDATED: Now uses EnhancedBlindSpotAnalyzer for deep pattern discovery.
    """

    BLIND_SPOT_THRESHOLD = 15.0  # 15-point difference threshold (kept for backward compatibility)

    def __init__(
        self,
        friend_pool_path: str = 'app/data/selve_friend_item_pool.json',
        main_pool_path: str = 'app/data/selve_item_pool_expanded.json'
    ):
        """Initialize with both item pools and enhanced analyzer."""
        self.friend_scorer = SelveScorer(item_pool_path=friend_pool_path)
        self.main_scorer = SelveScorer(item_pool_path=main_pool_path)
        self.quality_service = QualityScoringService(item_pool_path=friend_pool_path)
        self.narrative_generator = IntegratedNarrativeGenerator(use_llm=True)
        self.enhanced_analyzer = EnhancedBlindSpotAnalyzer(
            friend_pool_path=friend_pool_path,
            main_pool_path=main_pool_path
        )
    
    async def regenerate_profile_with_friend_data(
        self,
        user_id: str,
        self_responses: Dict[str, int],
        friend_responses: List[Dict],
        db
    ) -> Dict[str, Any]:
        """
        Regenerate user's personality profile incorporating friend insights.

        UPDATED: Now uses EnhancedBlindSpotAnalyzer for comprehensive analysis.

        Args:
            user_id: User ID
            self_responses: User's self-assessment responses {item_code: score}
            friend_responses: List of friend response records from database
            db: Database session

        Returns:
            Dictionary with:
                - full_profile_narrative: Complete personality profile
                - friend_insights_narrative: Separate friend section (220-350 words)
                - enhanced_analysis: Deep blind spot analysis
                - self_scores, friend_scores, blind_spots (backward compatibility)
        """
        logger.info(f"🔄 Regenerating profile for user {user_id}")
        logger.info(f"   Self responses: {len(self_responses)} items")
        logger.info(f"   Friend responses: {len(friend_responses)} friends")

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

        logger.info(f"✅ Self scores calculated: {list(self_scores.keys())}")

        # Step 2: Run enhanced blind spot analysis
        enhanced_analysis = self.enhanced_analyzer.analyze(
            self_responses=self_responses,
            friend_responses=friend_responses,
            self_scores=self_scores
        )

        logger.info(f"✅ Enhanced analysis complete:")
        logger.info(f"   - {len(enhanced_analysis['enhanced_blind_spots'])} enhanced blind spots")
        logger.info(f"   - {len(enhanced_analysis['item_discrepancies'])} item-level gaps")
        logger.info(f"   - {len(enhanced_analysis['response_biases'])} detected biases")

        # Step 3: Calculate legacy friend scores (for backward compatibility)
        friend_scores = self._calculate_friend_scores(friend_responses)

        # Step 4: Extract simple blind spots for legacy support
        simple_blind_spots = []
        for ebs in enhanced_analysis['enhanced_blind_spots']:
            simple_blind_spots.append({
                'dimension': ebs['dimension'],
                'self_score': ebs['self_score'],
                'friend_score': ebs['friend_score'],
                'difference': ebs['difference'],
                'type': ebs['type']
            })

        logger.info(f"✅ Legacy blind spots extracted: {len(simple_blind_spots)}")

        # Step 5: Generate full profile narrative (includes friend context)
        full_profile_narrative = self._generate_full_profile(
            self_scores=self_scores,
            enhanced_analysis=enhanced_analysis
        )

        logger.info(f"✅ Full profile narrative generated")

        # Step 6: Generate separate friend insights narrative (220-350 words)
        friend_insights_narrative = self._generate_friend_insights_narrative(
            enhanced_analysis=enhanced_analysis,
            friend_count=len(friend_responses)
        )

        logger.info(f"✅ Friend insights narrative generated")

        # Step 7: Prepare result
        result = {
            # New enhanced format
            'full_profile_narrative': full_profile_narrative,
            'friend_insights_narrative': friend_insights_narrative,
            'enhanced_analysis': enhanced_analysis,

            # Legacy format (backward compatibility)
            'self_scores': self_scores,
            'friend_scores': friend_scores,
            'blind_spots': simple_blind_spots,
            'narrative': full_profile_narrative,  # Backward compat
            'n_friends': len(friend_responses),
            'updated_at': datetime.utcnow().isoformat()
        }

        logger.info("✅ Profile regeneration complete")
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

    def _generate_full_profile(
        self,
        self_scores: Dict[str, float],
        enhanced_analysis: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Generate full personality profile narrative.

        This is the main profile that includes all 7 sections.
        It subtly incorporates friend insights context.

        Args:
            self_scores: User's dimension scores
            enhanced_analysis: Enhanced blind spot analysis results

        Returns:
            Complete narrative dict with all sections
        """
        # Generate base narrative from self scores
        int_scores = {k: int(round(v)) for k, v in self_scores.items()}
        narrative = self.narrative_generator.generate_narrative(int_scores)

        # TODO: Future enhancement - pass enhanced_analysis to narrative generator
        # so it can subtly weave in friend context throughout the profile

        return narrative

    def _generate_friend_insights_narrative(
        self,
        enhanced_analysis: Dict[str, Any],
        friend_count: int
    ) -> Dict[str, Any]:
        """
        Generate SHORT friend insights narrative (220-350 words).

        This is the "What Your Friends See" section.

        Args:
            enhanced_analysis: Enhanced blind spot analysis
            friend_count: Number of friends

        Returns:
            Dict with friend insights narrative and metadata
        """
        # Extract data from enhanced analysis
        enhanced_blind_spots = enhanced_analysis.get('enhanced_blind_spots', [])
        consensus_analysis = enhanced_analysis.get('consensus_analysis', {})
        biases = enhanced_analysis.get('response_biases', [])
        summary = enhanced_analysis.get('summary', {})

        # Convert enhanced blind spots to simple format for generator
        simple_blind_spots = []
        for ebs in enhanced_blind_spots:
            simple_blind_spots.append({
                'dimension': ebs['dimension'],
                'selfScore': ebs['self_score'],
                'friendScore': ebs['friend_score'],
                'diff': ebs['difference'],
                'type': ebs['type']
            })

        # Build self and friend scores dicts
        self_scores = {}
        friend_scores = {}
        for ebs in enhanced_blind_spots:
            dim = ebs['dimension']
            self_scores[dim] = ebs['self_score']
            friend_scores[dim] = ebs['friend_score']

        # Generate narrative using existing friend insights generator
        result = generate_friend_insights_narrative(
            self_scores=self_scores,
            friend_scores=friend_scores,
            blind_spots=simple_blind_spots,
            friend_count=friend_count
        )

        return {
            'narrative': result.get('narrative'),
            'model': result.get('model'),
            'cost': result.get('cost'),
            'promptTokens': result.get('promptTokens'),
            'completionTokens': result.get('completionTokens'),
            'error': result.get('error'),
            'violations': result.get('violations', []),
            # Add enhanced context for future use
            'enhanced_context': {
                'consensus_insights': self._format_consensus_insights(consensus_analysis),
                'pattern_biases': [b['evidence'] for b in biases if 'evidence' in b],
                'confidence_level': summary.get('high_confidence_count', 0)
            }
        }

    def _format_consensus_insights(
        self,
        consensus_analysis: Dict[str, Dict]
    ) -> List[str]:
        """
        Format consensus analysis into human-readable insights.

        Args:
            consensus_analysis: Dict of dimension -> consensus data

        Returns:
            List of insight strings
        """
        insights = []

        for dim, consensus in consensus_analysis.items():
            agreement = consensus.get('agreement_level', 'unknown')
            confidence = consensus.get('confidence', 'unknown')

            if agreement == 'strong' and confidence == 'high':
                insights.append(f"All friends strongly agree on your {dim} score")
            elif agreement == 'split':
                insights.append(f"Friends have mixed views on your {dim} - may be context-dependent")

        return insights
