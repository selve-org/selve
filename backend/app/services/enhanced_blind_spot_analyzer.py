"""
Enhanced Blind Spot Analyzer

Advanced friend insights analysis that discovers deep patterns in how users
perceive themselves vs. how others perceive them.

Analyzes:
- Item-level discrepancies (which specific questions show biggest gaps)
- Friend consensus vs. divergence (do all friends agree?)
- Response pattern biases (systematic self-doubt, etc.)
- Quality-weighted insights (trust high-quality observers more)
- Cross-dimensional correlations (hidden patterns)

Production-grade, DRY, robust implementation.
"""

import logging
from typing import Dict, List, Optional, Tuple, Any
from dataclasses import dataclass, field
from statistics import stdev, mean
from collections import defaultdict

from app.scoring import SelveScorer
from app.services.quality_scoring import QualityScoringService

logger = logging.getLogger(__name__)


@dataclass
class ItemDiscrepancy:
    """Represents a discrepancy on a single assessment item."""
    item_id: str
    item_text: str
    dimension: str
    self_response: int
    friend_avg_response: float
    friend_responses: List[int]
    gap: float  # Absolute difference
    self_tendency: str  # 'lower', 'higher', or 'aligned'

    def to_dict(self) -> Dict:
        return {
            'item_id': self.item_id,
            'item_text': self.item_text,
            'dimension': self.dimension,
            'self_response': self.self_response,
            'friend_avg': round(self.friend_avg_response, 2),
            'friend_responses': self.friend_responses,
            'gap': round(self.gap, 2),
            'tendency': self.self_tendency,
        }


@dataclass
class FriendConsensus:
    """Analyzes whether friends agree or disagree on a dimension."""
    dimension: str
    friend_scores: List[float]
    mean_score: float
    std_dev: float
    agreement_level: str  # 'strong', 'moderate', 'weak', 'split'
    range_span: float
    confidence: str  # 'high', 'medium', 'low'

    def to_dict(self) -> Dict:
        return {
            'dimension': self.dimension,
            'friend_scores': [round(s, 1) for s in self.friend_scores],
            'mean': round(self.mean_score, 1),
            'std_dev': round(self.std_dev, 2),
            'agreement_level': self.agreement_level,
            'range_span': round(self.range_span, 1),
            'confidence': self.confidence,
        }


@dataclass
class ResponsePatternBias:
    """Detects systematic patterns in how user responds."""
    bias_type: str  # 'systematic_low', 'systematic_high', 'extreme_choices', 'middle_preference'
    severity: str  # 'strong', 'moderate', 'mild'
    evidence: str  # Human-readable explanation
    affected_dimensions: List[str]

    def to_dict(self) -> Dict:
        return {
            'type': self.bias_type,
            'severity': self.severity,
            'evidence': self.evidence,
            'dimensions': self.affected_dimensions,
        }


@dataclass
class EnhancedBlindSpot:
    """Enhanced blind spot with rich context."""
    dimension: str
    self_score: float
    friend_mean_score: float
    difference: float
    type: str  # 'underestimate' or 'overestimate'

    # Enhanced context
    friend_consensus: FriendConsensus
    top_item_discrepancies: List[ItemDiscrepancy] = field(default_factory=list)
    quality_weighted_score: float = 0.0
    confidence: str = 'medium'  # 'high', 'medium', 'low'

    def to_dict(self) -> Dict:
        return {
            'dimension': self.dimension,
            'self_score': round(self.self_score, 1),
            'friend_score': round(self.friend_mean_score, 1),
            'difference': round(self.difference, 1),
            'type': self.type,
            'consensus': self.friend_consensus.to_dict(),
            'top_item_gaps': [d.to_dict() for d in self.top_item_discrepancies[:3]],  # Top 3
            'quality_weighted_score': round(self.quality_weighted_score, 1),
            'confidence': self.confidence,
        }


class EnhancedBlindSpotAnalyzer:
    """
    Production-grade analyzer for deep blind spot discovery.

    Replaces simple score comparison with multi-layered analysis.
    """

    BLIND_SPOT_THRESHOLD = 15.0  # Points difference to qualify as blind spot
    STRONG_CONSENSUS_THRESHOLD = 5.0  # Std dev < 5 = strong agreement
    MODERATE_CONSENSUS_THRESHOLD = 10.0  # Std dev < 10 = moderate agreement

    def __init__(
        self,
        friend_pool_path: str = 'app/data/selve_friend_item_pool.json',
        main_pool_path: str = 'app/data/selve_item_pool_expanded.json'
    ):
        """Initialize with item pools."""
        self.friend_scorer = SelveScorer(item_pool_path=friend_pool_path)
        self.main_scorer = SelveScorer(item_pool_path=main_pool_path)
        self.quality_service = QualityScoringService(item_pool_path=friend_pool_path)

        # Load item pool for metadata
        self.item_pool = self.friend_scorer.item_pool

    def analyze(
        self,
        self_responses: Dict[str, int],
        friend_responses: List[Dict[str, Any]],
        self_scores: Dict[str, float]
    ) -> Dict[str, Any]:
        """
        Perform comprehensive blind spot analysis.

        Args:
            self_responses: User's responses {item_id: value}
            friend_responses: List of friend response dicts with:
                - responses: List of {item_id, value, not_sure}
                - quality_score: Float 0-100
            self_scores: Pre-calculated self dimension scores

        Returns:
            Comprehensive analysis dict with:
                - enhanced_blind_spots: List[EnhancedBlindSpot]
                - item_discrepancies: List[ItemDiscrepancy]
                - consensus_analysis: Dict[dimension -> FriendConsensus]
                - response_biases: List[ResponsePatternBias]
                - summary: High-level insights
        """
        logger.info(f"🔬 Starting enhanced blind spot analysis: {len(friend_responses)} friends")

        # Step 1: Calculate individual friend scores per dimension
        individual_friend_scores = self._calculate_individual_friend_scores(friend_responses)

        # Step 2: Analyze item-level discrepancies
        item_discrepancies = self._analyze_item_discrepancies(
            self_responses,
            friend_responses
        )

        # Step 3: Detect friend consensus/divergence per dimension
        consensus_analysis = self._analyze_friend_consensus(individual_friend_scores)

        # Step 4: Detect response pattern biases
        response_biases = self._detect_response_biases(
            self_responses,
            friend_responses,
            self_scores,
            individual_friend_scores
        )

        # Step 5: Build enhanced blind spots
        enhanced_blind_spots = self._build_enhanced_blind_spots(
            self_scores,
            individual_friend_scores,
            consensus_analysis,
            item_discrepancies,
            friend_responses
        )

        # Step 6: Generate summary insights
        summary = self._generate_summary(
            enhanced_blind_spots,
            response_biases,
            len(friend_responses)
        )

        logger.info(f"✅ Found {len(enhanced_blind_spots)} enhanced blind spots, "
                   f"{len(item_discrepancies)} item gaps, {len(response_biases)} biases")

        return {
            'enhanced_blind_spots': [bs.to_dict() for bs in enhanced_blind_spots],
            'item_discrepancies': [d.to_dict() for d in item_discrepancies[:20]],  # Top 20
            'consensus_analysis': {dim: c.to_dict() for dim, c in consensus_analysis.items()},
            'response_biases': [b.to_dict() for b in response_biases],
            'summary': summary,
            'metadata': {
                'friend_count': len(friend_responses),
                'total_item_gaps': len(item_discrepancies),
                'blind_spot_count': len(enhanced_blind_spots),
            }
        }

    def _calculate_individual_friend_scores(
        self,
        friend_responses: List[Dict[str, Any]]
    ) -> Dict[str, List[Tuple[float, float]]]:  # dimension -> [(score, quality_weight), ...]
        """
        Calculate each friend's score per dimension (not aggregated).

        Returns:
            Dict of dimension -> List of (score, quality_weight) tuples
        """
        dimensions = ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']
        individual_scores = {dim: [] for dim in dimensions}

        for friend_resp in friend_responses:
            # Get quality weight
            quality_weight = self.quality_service.get_quality_weight(
                friend_resp.get('quality_score', 50.0)
            )

            # Convert responses to dict
            response_dict = {}
            for resp in friend_resp.get('responses', []):
                if not resp.get('not_sure', False):
                    response_dict[resp['item_id']] = resp['value']

            if not response_dict:
                continue

            # Score this friend's responses
            try:
                friend_profile = self.friend_scorer.score_responses(
                    response_dict,
                    validate=False
                )

                # Store score for each dimension
                for dimension in dimensions:
                    dim_score = getattr(
                        friend_profile,
                        dimension.lower()
                    ).normalized_score

                    individual_scores[dimension].append((dim_score, quality_weight))

            except Exception as e:
                logger.warning(f"Failed to score friend responses: {e}")
                continue

        return individual_scores

    def _analyze_item_discrepancies(
        self,
        self_responses: Dict[str, int],
        friend_responses: List[Dict[str, Any]]
    ) -> List[ItemDiscrepancy]:
        """
        Find items where self vs friend responses differ significantly.

        Returns:
            List of ItemDiscrepancy objects, sorted by gap size
        """
        # Collect friend responses per item
        friend_item_responses = defaultdict(list)

        for friend_resp in friend_responses:
            for resp in friend_resp.get('responses', []):
                if not resp.get('not_sure', False):
                    item_id = resp['item_id']
                    value = resp['value']
                    friend_item_responses[item_id].append(value)

        # Calculate discrepancies
        discrepancies = []

        for item_id, self_value in self_responses.items():
            if item_id not in friend_item_responses:
                continue

            friend_values = friend_item_responses[item_id]
            if not friend_values:
                continue

            friend_avg = mean(friend_values)
            gap = abs(friend_avg - self_value)

            # Only track significant gaps (>= 1.5 points on 1-5 scale)
            if gap >= 1.5:
                # Get item metadata
                item = self.item_pool.get_item_by_code(item_id)
                item_text = item.text if item else item_id
                dimension = item.dimension if item else "Unknown"

                tendency = 'lower' if self_value < friend_avg else 'higher' if self_value > friend_avg else 'aligned'

                discrepancies.append(ItemDiscrepancy(
                    item_id=item_id,
                    item_text=item_text,
                    dimension=dimension,
                    self_response=self_value,
                    friend_avg_response=friend_avg,
                    friend_responses=friend_values,
                    gap=gap,
                    self_tendency=tendency
                ))

        # Sort by gap size (biggest first)
        discrepancies.sort(key=lambda d: d.gap, reverse=True)

        return discrepancies

    def _analyze_friend_consensus(
        self,
        individual_friend_scores: Dict[str, List[Tuple[float, float]]]
    ) -> Dict[str, FriendConsensus]:
        """
        Analyze whether friends agree or disagree on each dimension.

        Returns:
            Dict of dimension -> FriendConsensus
        """
        consensus = {}

        for dimension, scores_and_weights in individual_friend_scores.items():
            if not scores_and_weights:
                continue

            scores = [s for s, w in scores_and_weights]

            if len(scores) < 2:
                # Can't measure consensus with 1 friend
                consensus[dimension] = FriendConsensus(
                    dimension=dimension,
                    friend_scores=scores,
                    mean_score=scores[0],
                    std_dev=0.0,
                    agreement_level='single_friend',
                    range_span=0.0,
                    confidence='low'
                )
                continue

            mean_score = mean(scores)
            std_deviation = stdev(scores)
            range_span = max(scores) - min(scores)

            # Classify agreement level
            if std_deviation < self.STRONG_CONSENSUS_THRESHOLD:
                agreement = 'strong'
                confidence = 'high'
            elif std_deviation < self.MODERATE_CONSENSUS_THRESHOLD:
                agreement = 'moderate'
                confidence = 'medium'
            elif range_span > 30:  # Very wide range = split opinion
                agreement = 'split'
                confidence = 'low'
            else:
                agreement = 'weak'
                confidence = 'low'

            consensus[dimension] = FriendConsensus(
                dimension=dimension,
                friend_scores=scores,
                mean_score=mean_score,
                std_dev=std_deviation,
                agreement_level=agreement,
                range_span=range_span,
                confidence=confidence
            )

        return consensus

    def _detect_response_biases(
        self,
        self_responses: Dict[str, int],
        friend_responses: List[Dict[str, Any]],
        self_scores: Dict[str, float],
        individual_friend_scores: Dict[str, List[Tuple[float, float]]]
    ) -> List[ResponsePatternBias]:
        """
        Detect systematic biases in how user responds.

        Returns:
            List of detected biases
        """
        biases = []

        # Bias 1: Systematic low self-rating
        dimensions_where_friends_higher = []
        for dimension, scores_and_weights in individual_friend_scores.items():
            if not scores_and_weights:
                continue

            scores = [s for s, w in scores_and_weights]
            friend_mean = mean(scores)
            self_score = self_scores.get(dimension, friend_mean)

            if friend_mean > self_score + 10:  # Friends see 10+ points higher
                dimensions_where_friends_higher.append(dimension)

        if len(dimensions_where_friends_higher) >= 4:  # At least half of dimensions
            severity = 'strong' if len(dimensions_where_friends_higher) >= 6 else 'moderate'
            biases.append(ResponsePatternBias(
                bias_type='systematic_underestimation',
                severity=severity,
                evidence=f"Friends consistently rate you higher across {len(dimensions_where_friends_higher)} dimensions. "
                         f"You systematically underestimate yourself.",
                affected_dimensions=dimensions_where_friends_higher
            ))

        # Bias 2: Extreme choice preference (always 1 or 5, never middle)
        self_values = list(self_responses.values())
        extreme_count = sum(1 for v in self_values if v in [1, 5])
        extreme_ratio = extreme_count / len(self_values) if self_values else 0

        if extreme_ratio > 0.6:  # More than 60% extreme choices
            biases.append(ResponsePatternBias(
                bias_type='extreme_response_style',
                severity='strong' if extreme_ratio > 0.75 else 'moderate',
                evidence=f"{int(extreme_ratio*100)}% of your responses were extreme (Strongly Agree/Disagree). "
                         f"This black-and-white thinking style may obscure nuances in your self-perception.",
                affected_dimensions=list(self_scores.keys())
            ))

        # Bias 3: Systematic overestimation (opposite of #1)
        dimensions_where_self_higher = []
        for dimension, scores_and_weights in individual_friend_scores.items():
            if not scores_and_weights:
                continue

            scores = [s for s, w in scores_and_weights]
            friend_mean = mean(scores)
            self_score = self_scores.get(dimension, friend_mean)

            if self_score > friend_mean + 10:
                dimensions_where_self_higher.append(dimension)

        if len(dimensions_where_self_higher) >= 3:
            severity = 'strong' if len(dimensions_where_self_higher) >= 5 else 'moderate'
            biases.append(ResponsePatternBias(
                bias_type='systematic_overestimation',
                severity=severity,
                evidence=f"You rate yourself higher than friends see you across {len(dimensions_where_self_higher)} dimensions. "
                         f"You may overestimate certain traits or come across differently than intended.",
                affected_dimensions=dimensions_where_self_higher
            ))

        return biases

    def _build_enhanced_blind_spots(
        self,
        self_scores: Dict[str, float],
        individual_friend_scores: Dict[str, List[Tuple[float, float]]],
        consensus_analysis: Dict[str, FriendConsensus],
        item_discrepancies: List[ItemDiscrepancy],
        friend_responses: List[Dict[str, Any]]
    ) -> List[EnhancedBlindSpot]:
        """
        Build enhanced blind spots with full context.

        Returns:
            List of EnhancedBlindSpot objects
        """
        blind_spots = []

        for dimension, scores_and_weights in individual_friend_scores.items():
            if not scores_and_weights:
                continue

            # Calculate quality-weighted friend score
            total_weight = sum(w for s, w in scores_and_weights)
            weighted_sum = sum(s * w for s, w in scores_and_weights)
            quality_weighted_score = weighted_sum / total_weight if total_weight > 0 else 0

            # Get unweighted mean for comparison
            scores = [s for s, w in scores_and_weights]
            friend_mean = mean(scores)

            self_score = self_scores.get(dimension, friend_mean)
            difference = quality_weighted_score - self_score

            # Check if it's a blind spot
            if abs(difference) < self.BLIND_SPOT_THRESHOLD:
                continue

            spot_type = 'underestimate' if difference > 0 else 'overestimate'

            # Get consensus data
            consensus = consensus_analysis.get(dimension)
            if not consensus:
                continue

            # Get top item discrepancies for this dimension
            dimension_items = [
                d for d in item_discrepancies
                if d.dimension == dimension
            ][:3]  # Top 3

            # Determine confidence based on consensus
            confidence = consensus.confidence

            blind_spot = EnhancedBlindSpot(
                dimension=dimension,
                self_score=self_score,
                friend_mean_score=friend_mean,
                difference=difference,
                type=spot_type,
                friend_consensus=consensus,
                top_item_discrepancies=dimension_items,
                quality_weighted_score=quality_weighted_score,
                confidence=confidence
            )

            blind_spots.append(blind_spot)

        # Sort by absolute difference (biggest gaps first)
        blind_spots.sort(key=lambda bs: abs(bs.difference), reverse=True)

        return blind_spots

    def _generate_summary(
        self,
        blind_spots: List[EnhancedBlindSpot],
        biases: List[ResponsePatternBias],
        friend_count: int
    ) -> Dict[str, Any]:
        """
        Generate high-level summary of findings.

        Returns:
            Summary dict with key insights
        """
        if not blind_spots:
            return {
                'headline': 'Strong self-awareness',
                'description': 'Your self-perception aligns well with how friends see you.',
                'friend_count': friend_count,
                'blind_spot_count': 0,
            }

        # Find biggest blind spot
        biggest = blind_spots[0]

        # Count high-confidence blind spots
        high_confidence_count = sum(1 for bs in blind_spots if bs.confidence == 'high')

        # Check for systematic biases
        has_systematic_bias = any(b.bias_type.startswith('systematic') for b in biases)

        return {
            'headline': f"{len(blind_spots)} significant blind spots found",
            'biggest_gap': {
                'dimension': biggest.dimension,
                'difference': round(biggest.difference, 1),
                'type': biggest.type,
                'confidence': biggest.confidence,
            },
            'high_confidence_count': high_confidence_count,
            'friend_count': friend_count,
            'has_systematic_bias': has_systematic_bias,
            'bias_summary': biases[0].evidence if biases else None,
        }


# Factory function for easy instantiation
def create_enhanced_analyzer(
    friend_pool_path: str = 'app/data/selve_friend_item_pool.json',
    main_pool_path: str = 'app/data/selve_item_pool_expanded.json'
) -> EnhancedBlindSpotAnalyzer:
    """Create an instance of the enhanced blind spot analyzer."""
    return EnhancedBlindSpotAnalyzer(
        friend_pool_path=friend_pool_path,
        main_pool_path=main_pool_path
    )
