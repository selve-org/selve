"""
Friend Response Quality Scoring Service

Calculates quality scores (0-100) for friend assessment responses based on:
- Response time validity (30%): Are responses thoughtful?
- Consistency (40%): Do reversed items correlate?
- Not-sure appropriateness (20%): Healthy 10-30% range?
- Response variance (10%): Detect straightlining

Quality tiers:
- High (≥70%): Full weight in profile regeneration (1.0)
- Medium (50-69%): Half weight (0.5)
- Low (<50%): Minimal weight (0.1)
"""

import statistics
from typing import List, Dict
import json


class ResponseItem:
    """Single response item with timing and metadata."""
    
    def __init__(self, item_id: str, value: int, not_sure: bool, response_time: int):
        self.item_id = item_id
        self.value = value
        self.not_sure = not_sure
        self.response_time = response_time  # milliseconds


class QualityScoringService:
    """Service for calculating quality scores on friend responses."""
    
    def __init__(self, item_pool_path: str = 'app/data/selve_friend_item_pool.json'):
        """Initialize with friend item pool for reversed item detection."""
        with open(item_pool_path, 'r') as f:
            self.item_pool = json.load(f)
        
        # Build reversed item lookup
        self.reversed_items = set()
        for dimension, items in self.item_pool.items():
            for item in items:
                if item.get('reversed', False):
                    self.reversed_items.add(item['item'])
    
    def calculate_quality_score(
        self,
        responses: List[Dict],
        total_time: int
    ) -> float:
        """
        Calculate quality score (0-100) based on response patterns.
        
        Args:
            responses: List of {item_id, value, not_sure, response_time}
            total_time: Total completion time in milliseconds
        
        Returns:
            Quality score (0-100)
        """
        if not responses:
            return 0.0
        
        # Convert to ResponseItem objects
        response_items = [
            ResponseItem(
                item_id=r['item_id'],
                value=r['value'],
                not_sure=r['not_sure'],
                response_time=r['response_time']
            )
            for r in responses
        ]
        
        # Calculate components
        time_score = self._calculate_time_score(response_items)
        consistency_score = self._calculate_consistency_score(response_items)
        not_sure_score = self._calculate_not_sure_score(response_items)
        variance_score = self._calculate_variance_score(response_items)
        
        # Weighted total
        quality = (
            time_score * 0.30 +
            consistency_score * 0.30 +
            not_sure_score * 0.15 +
            variance_score * 0.25  # Increased weight for straightlining detection
        )
        
        return round(quality * 100, 2)
    
    def _calculate_time_score(self, responses: List[ResponseItem]) -> float:
        """
        Calculate time component (30% weight).
        
        Flags:
        - Too fast: < 2 sec median = 0.0 (straightlining/bot)
        - Very fast: 2-3 sec median = 0.2 (rushing)
        - Fast: 3-4 sec median = 0.5 (minimal thought)
        - Good: 4-6 sec median = 0.8 (reasonable)
        - Thoughtful: > 6 sec median = 1.0 (careful consideration)
        """
        response_times = [r.response_time for r in responses]
        median_time = statistics.median(response_times)
        
        if median_time < 2000:  # < 2 seconds
            return 0.0  # Straightlining/bot
        elif median_time < 3000:  # 2-3 seconds
            return 0.2  # Rushing
        elif median_time < 4000:  # 3-4 seconds
            return 0.5  # Minimal thought
        elif median_time < 6000:  # 4-6 seconds
            return 0.8  # Reasonable
        else:
            return 1.0  # Thoughtful
    
    def _calculate_consistency_score(self, responses: List[ResponseItem]) -> float:
        """
        Calculate consistency component (40% weight).
        
        Check if reversed items correlate negatively with normal items.
        High correlation = likely not reading carefully.
        """
        # Separate reversed vs normal items
        reversed_responses = []
        normal_responses = []
        
        for r in responses:
            if r.not_sure:
                continue  # Skip "not sure" responses
            
            if r.item_id in self.reversed_items:
                # Invert reversed items for comparison (5->1, 4->2, 3->3, 2->4, 1->5)
                inverted_value = 6 - r.value
                reversed_responses.append(inverted_value)
            else:
                normal_responses.append(r.value)
        
        # Need at least 2 of each type to calculate correlation
        if len(reversed_responses) < 2 or len(normal_responses) < 2:
            return 0.7  # Default to medium if can't calculate
        
        # Calculate means
        reversed_mean = statistics.mean(reversed_responses)
        normal_mean = statistics.mean(normal_responses)
        
        # If reversed items (after inversion) are close to normal items = consistent
        difference = abs(reversed_mean - normal_mean)
        
        if difference < 0.5:
            return 1.0  # Highly consistent
        elif difference < 1.0:
            return 0.8  # Moderately consistent
        elif difference < 1.5:
            return 0.6  # Somewhat inconsistent
        else:
            return 0.3  # Inconsistent (likely not reading)
    
    def _calculate_not_sure_score(self, responses: List[ResponseItem]) -> float:
        """
        Calculate not-sure component (20% weight).
        
        Optimal range: 10-30% not sure (shows honesty).
        - Too confident (<10%): Might be guessing
        - Too unsure (>50%): Doesn't know person well
        """
        not_sure_count = sum(1 for r in responses if r.not_sure)
        not_sure_pct = not_sure_count / len(responses)
        
        if 0.10 <= not_sure_pct <= 0.30:
            return 1.0  # Optimal range
        elif not_sure_pct < 0.10:
            return 0.7  # Too confident
        elif not_sure_pct > 0.50:
            return 0.3  # Too many unsure
        else:
            return 0.5  # Moderate
    
    def _calculate_variance_score(self, responses: List[ResponseItem]) -> float:
        """
        Calculate variance component (10% weight).
        
        Detect straightlining (all same answers).
        Low variance = likely not reading carefully.
        """
        response_values = [r.value for r in responses if not r.not_sure]
        
        if len(response_values) < 2:
            return 0.5  # Can't calculate variance
        
        variance = statistics.variance(response_values)
        
        if variance < 0.3:
            return 0.0  # Complete straightlining
        elif variance < 0.5:
            return 0.2  # Near straightlining detected
        elif variance < 1.0:
            return 0.6  # Low variance
        else:
            return 1.0  # Good variance
    
    def get_quality_weight(self, quality_score: float) -> float:
        """
        Get weight for profile regeneration based on quality score.
        
        Args:
            quality_score: Quality score (0-100)
        
        Returns:
            Weight for aggregation (0.1, 0.5, or 1.0)
        """
        if quality_score >= 70:
            return 1.0  # High quality - full weight
        elif quality_score >= 50:
            return 0.5  # Medium quality - half weight
        else:
            return 0.1  # Low quality - minimal weight
