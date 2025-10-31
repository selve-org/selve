"""
SELVE Adaptive Testing Algorithm

This module implements intelligent question selection to reduce assessment time
by 40-60% while maintaining accuracy. It uses uncertainty-based selection to
identify which dimensions need more items.

Strategy:
1. Start with quick screen (2 items per dimension = 16 items)
2. Calculate uncertainty/variance for each dimension
3. Identify dimensions needing more items (high variance, contradictory responses)
4. Select follow-up items from remaining pool (prioritize high correlation)
5. Continue until confidence threshold met or max items reached

Author: SELVE Team
"""

import json
from typing import Dict, List, Tuple, Optional, Set
from dataclasses import dataclass
import statistics
from pathlib import Path

from app.scoring import SelveScorer, SelveProfile


@dataclass
class DimensionUncertainty:
    """Uncertainty metrics for a dimension."""
    dimension: str
    uncertainty_score: float  # 0-1 scale, higher = more uncertain
    n_items_answered: int
    variance: float
    needs_more_items: bool
    recommended_additional_items: int


class AdaptiveTester:
    """
    Adaptive testing engine for SELVE personality assessment.
    
    Reduces assessment time while maintaining accuracy by intelligently
    selecting which questions to ask based on response patterns.
    """
    
    def __init__(self, item_pool_path: str = None):
        """
        Initialize adaptive tester.
        
        Args:
            item_pool_path: Path to item pool JSON file
        """
        if item_pool_path is None:
            # Default to expanded item pool in app/data
            item_pool_path = str(Path(__file__).parent / 'data' / 'selve_item_pool_expanded.json')
        
        self.scorer = SelveScorer(item_pool_path)
        self.item_pool_path = item_pool_path
        
        # Load item pool for adaptive selection
        with open(item_pool_path, 'r') as f:
            self.item_pool = json.load(f)
        
        # Adaptive testing parameters
        self.UNCERTAINTY_THRESHOLD = 0.5  # Above this = needs more items (lowered from 0.6)
        self.MIN_ITEMS_PER_DIMENSION = 4  # Quick screen minimum (increased from 2 to ensure follow-ups)
        self.MAX_ITEMS_PER_DIMENSION = 12  # Maximum items to ask
        self.TARGET_TOTAL_ITEMS = 50  # Target for standard assessment
        self.MAX_TOTAL_ITEMS = 70  # Absolute maximum
    
    def get_quick_screen(self) -> List[Dict]:
        """
        Get items for quick screening phase.
        
        Returns 2 highest-quality items per dimension (16 total).
        
        Returns:
            List of item dicts with dimension added
        """
        return self.scorer.get_quick_screen_items(n_per_dimension=2)
    
    def calculate_dimension_uncertainty(
        self, 
        responses: Dict[str, int],
        dimension: str
    ) -> DimensionUncertainty:
        """
        Calculate uncertainty for a specific dimension.
        
        Uncertainty is based on:
        1. Response variance (contradictory answers = high uncertainty)
        2. Score proximity to midpoint (scores near 50 = uncertain)
        3. Number of items answered (fewer items = higher uncertainty)
        
        Args:
            responses: Dict of item_code -> response value
            dimension: Dimension name (e.g., 'LUMEN')
        
        Returns:
            DimensionUncertainty object with metrics
        """
        # Get dimension items
        dim_items = self.scorer.get_items_by_dimension(dimension)
        dim_item_codes = [item['item'] for item in dim_items]
        
        # Get responses for this dimension
        dim_responses = {
            code: val for code, val in responses.items() 
            if code in dim_item_codes
        }
        
        n_answered = len(dim_responses)
        
        if n_answered == 0:
            # No items answered - maximum uncertainty
            return DimensionUncertainty(
                dimension=dimension,
                uncertainty_score=1.0,
                n_items_answered=0,
                variance=0.0,
                needs_more_items=True,
                recommended_additional_items=self.MIN_ITEMS_PER_DIMENSION
            )
        
        # Score current responses
        profile = self.scorer.score_responses(responses, validate=True)
        dim_score = getattr(profile, dimension.lower())
        
        # Calculate response variance (contradictory answers)
        # First, normalize all responses to same scale
        normalized_responses = []
        for item_code, response in dim_responses.items():
            # Get item details
            item_detail = next((i for i in dim_items if i['item'] == item_code), None)
            if not item_detail:
                continue
            
            # Detect scale
            scale_min, scale_max = self.scorer._get_scale_range(item_code)
            
            # Normalize to 0-1
            normalized = (response - scale_min) / (scale_max - scale_min)
            
            # Apply reverse scoring if needed
            if item_detail.get('reversed', False):
                normalized = 1 - normalized
            
            normalized_responses.append(normalized)
        
        # Calculate variance
        if len(normalized_responses) > 1:
            variance = statistics.variance(normalized_responses)
        else:
            variance = 0.0
        
        # Calculate uncertainty components
        
        # 1. Variance component (0-1 scale)
        # High variance (> 0.15 on 0-1 scale) = uncertain
        variance_component = min(variance / 0.15, 1.0)
        
        # 2. Midpoint proximity component (0-1 scale)
        # Scores near 50 (40-60 range) = uncertain
        distance_from_50 = abs(dim_score.normalized_score - 50)
        midpoint_component = max(0, (20 - distance_from_50) / 20)
        
        # 3. Sample size component (0-1 scale)
        # Fewer items = more uncertain
        min_confident_items = 5  # Need at least 5 items to be confident
        sample_component = max(0, (min_confident_items - n_answered) / min_confident_items)
        
        # Combined uncertainty score (weighted average)
        uncertainty_score = (
            0.35 * variance_component +      # 35% weight on variance
            0.35 * midpoint_component +      # 35% weight on midpoint proximity
            0.30 * sample_component          # 30% weight on sample size
        )
        
        # Determine if needs more items
        needs_more = (
            uncertainty_score > self.UNCERTAINTY_THRESHOLD or
            n_answered < self.MIN_ITEMS_PER_DIMENSION
        )
        
        # Calculate recommended additional items
        if not needs_more:
            recommended_additional = 0
        elif uncertainty_score > 0.8:
            # Very uncertain - ask 4 more
            recommended_additional = min(4, self.MAX_ITEMS_PER_DIMENSION - n_answered)
        elif uncertainty_score > 0.7:
            # Quite uncertain - ask 3 more
            recommended_additional = min(3, self.MAX_ITEMS_PER_DIMENSION - n_answered)
        else:
            # Somewhat uncertain - ask 2 more
            recommended_additional = min(2, self.MAX_ITEMS_PER_DIMENSION - n_answered)
        
        return DimensionUncertainty(
            dimension=dimension,
            uncertainty_score=uncertainty_score,
            n_items_answered=n_answered,
            variance=variance,
            needs_more_items=needs_more,
            recommended_additional_items=recommended_additional
        )
    
    def select_next_items(
        self,
        responses: Dict[str, int],
        max_items: int = 10
    ) -> List[Dict]:
        """
        Select next items to ask based on current responses.
        
        Prioritizes dimensions with highest uncertainty and selects
        items with highest correlations.
        
        Args:
            responses: Dict of item_code -> response value
            max_items: Maximum number of items to return
        
        Returns:
            List of item dicts to ask next
        """
        return self.select_next_items_excluding(responses, set(responses.keys()), max_items)
    
    def select_next_items_excluding(
        self,
        responses: Dict[str, int],
        exclude_items: Set[str],
        max_items: int = 10
    ) -> List[Dict]:
        """
        Select next items to ask, excluding specific item codes.
        
        This is used to avoid re-suggesting questions that are pending
        (sent to user but not yet answered).
        
        Args:
            responses: Dict of item_code -> response value
            exclude_items: Set of item codes to exclude (answered + pending)
            max_items: Maximum number of items to return
        
        Returns:
            List of item dicts to ask next
        """
        # Calculate uncertainty for all dimensions
        dimensions = ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']
        uncertainties = []
        
        for dim in dimensions:
            uncertainty = self.calculate_dimension_uncertainty(responses, dim)
            if uncertainty.needs_more_items:
                uncertainties.append(uncertainty)
        
        # Sort by uncertainty score (highest first)
        uncertainties.sort(key=lambda u: u.uncertainty_score, reverse=True)
        
        # Select items for uncertain dimensions
        next_items = []
        
        for uncertainty in uncertainties:
            if len(next_items) >= max_items:
                break
            
            # Get all items for this dimension
            dim_items = self.scorer.get_items_by_dimension(uncertainty.dimension)
            
            # Filter out excluded items (answered + pending)
            available_items = [
                item for item in dim_items 
                if item['item'] not in exclude_items
            ]
            
            # Sort by correlation (highest first)
            available_items.sort(key=lambda x: x['correlation'], reverse=True)
            
            # Select top N items
            n_to_select = min(
                uncertainty.recommended_additional_items,
                len(available_items),
                max_items - len(next_items)
            )
            
            # Add dimension field to items
            selected = []
            for item in available_items[:n_to_select]:
                item_copy = item.copy()
                item_copy['dimension'] = uncertainty.dimension
                selected.append(item_copy)
            
            next_items.extend(selected)
        
        return next_items[:max_items]
    
    def should_continue_testing(
        self,
        responses: Dict[str, int]
    ) -> Tuple[bool, str]:
        """
        Determine if testing should continue or stop.
        
        Stopping criteria:
        1. All dimensions have low uncertainty
        2. Maximum items reached
        3. No more available items
        
        Args:
            responses: Dict of item_code -> response value
        
        Returns:
            Tuple of (should_continue, reason)
        """
        n_responses = len(responses)
        
        # Check max items
        if n_responses >= self.MAX_TOTAL_ITEMS:
            return False, f"Maximum items reached ({self.MAX_TOTAL_ITEMS})"
        
        # Calculate uncertainties
        dimensions = ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']
        uncertainties = [
            self.calculate_dimension_uncertainty(responses, dim)
            for dim in dimensions
        ]
        
        # Check if any dimension needs more items
        uncertain_dims = [u for u in uncertainties if u.needs_more_items]
        
        if not uncertain_dims:
            return False, "All dimensions have sufficient confidence"
        
        # Check if we have available items for uncertain dimensions
        answered_codes = set(responses.keys())
        has_available_items = False
        
        for uncertainty in uncertain_dims:
            dim_items = self.scorer.get_items_by_dimension(uncertainty.dimension)
            available = [
                item for item in dim_items 
                if item['item'] not in answered_codes
            ]
            if available:
                has_available_items = True
                break
        
        if not has_available_items:
            return False, "No more available items for uncertain dimensions"
        
        # Continue testing
        avg_uncertainty = statistics.mean(u.uncertainty_score for u in uncertainties)
        return True, f"{len(uncertain_dims)} dimensions uncertain (avg uncertainty: {avg_uncertainty:.2f})"
    
    def run_adaptive_assessment(
        self,
        response_collector,
        verbose: bool = True
    ) -> SelveProfile:
        """
        Run complete adaptive assessment.
        
        This is the main method for conducting an adaptive assessment.
        It manages the entire flow from quick screen to completion.
        
        Args:
            response_collector: Callable that takes list of items and returns
                               dict of responses. Signature: (List[Dict]) -> Dict[str, int]
            verbose: Whether to print progress messages
        
        Returns:
            Final SelveProfile
        """
        responses = {}
        round_num = 1
        
        if verbose:
            print("\n" + "="*60)
            print("SELVE ADAPTIVE ASSESSMENT")
            print("="*60)
        
        # Phase 1: Quick Screen
        if verbose:
            print(f"\n📋 Round {round_num}: Quick Screen (16 items)")
        
        quick_items = self.get_quick_screen()
        new_responses = response_collector(quick_items)
        responses.update(new_responses)
        
        if verbose:
            print(f"   Collected {len(new_responses)} responses")
        
        # Phase 2: Adaptive Follow-ups
        while True:
            round_num += 1
            
            # Check if should continue
            should_continue, reason = self.should_continue_testing(responses)
            
            if not should_continue:
                if verbose:
                    print(f"\n✅ Assessment Complete: {reason}")
                break
            
            # Select next items
            next_items = self.select_next_items(
                responses,
                max_items=min(10, self.MAX_TOTAL_ITEMS - len(responses))
            )
            
            if not next_items:
                if verbose:
                    print("\n✅ Assessment Complete: No more items to ask")
                break
            
            if verbose:
                print(f"\n📋 Round {round_num}: Adaptive Follow-up ({len(next_items)} items)")
                print(f"   Reason: {reason}")
            
            # Collect responses
            new_responses = response_collector(next_items)
            responses.update(new_responses)
            
            if verbose:
                print(f"   Collected {len(new_responses)} responses")
        
        # Final scoring
        if verbose:
            print(f"\n📊 Final Results ({len(responses)} total items)")
            print("="*60)
        
        profile = self.scorer.score_responses(responses)
        
        if verbose:
            # Print summary
            for dim in ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']:
                dim_score = getattr(profile, dim.lower())
                uncertainty = self.calculate_dimension_uncertainty(responses, dim)
                
                emoji = {
                    'LUMEN': '✨', 'AETHER': '🌫️', 'ORPHEUS': '🎵', 'ORIN': '🧭',
                    'LYRA': '🦋', 'VARA': '⚖️', 'CHRONOS': '⏳', 'KAEL': '🔥'
                }[dim]
                
                print(f"\n{emoji} {dim}")
                print(f"   Score: {dim_score.normalized_score:.1f}/100")
                print(f"   Items: {dim_score.n_items}")
                print(f"   Confidence: {100 - uncertainty.uncertainty_score * 100:.1f}%")
        
        return profile


def simulate_responses(items: List[Dict]) -> Dict[str, int]:
    """
    Simulate user responses for testing.
    
    This is a helper function for testing the adaptive algorithm.
    In production, replace with actual user input.
    
    Args:
        items: List of items to respond to
    
    Returns:
        Dict of item_code -> simulated response
    """
    import random
    
    responses = {}
    for item in items:
        # Simulate somewhat consistent responses
        # (real users would have patterns, not pure randomness)
        scale_max = 7 if item['item'][0] in 'HXA' and len(item['item']) > 2 else 5
        responses[item['item']] = random.randint(1, scale_max)
    
    return responses


if __name__ == '__main__':
    """
    Example usage and testing of adaptive algorithm.
    """
    print("\n" + "="*70)
    print("SELVE ADAPTIVE TESTING - DEMONSTRATION")
    print("="*70)
    
    # Initialize adaptive tester
    tester = AdaptiveTester()
    
    # Run adaptive assessment with simulated responses
    print("\nRunning adaptive assessment with simulated responses...")
    profile = tester.run_adaptive_assessment(
        response_collector=simulate_responses,
        verbose=True
    )
    
    print("\n" + "="*70)
    print("ASSESSMENT EFFICIENCY")
    print("="*70)
    print(f"Full assessment: 98 items (20-25 minutes)")
    print(f"This assessment: {sum(getattr(profile, d.lower()).n_items for d in ['lumen', 'aether', 'orpheus', 'orin', 'lyra', 'vara', 'chronos', 'kael'])} items")
    print(f"Time saved: ~{100 - (sum(getattr(profile, d.lower()).n_items for d in ['lumen', 'aether', 'orpheus', 'orin', 'lyra', 'vara', 'chronos', 'kael']) / 98 * 100):.0f}%")
