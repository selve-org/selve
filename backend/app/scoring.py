"""
SELVE Scoring Algorithm
=======================
Core personality profiling engine that transforms user responses into SELVE dimension scores.

Features:
- Loads item pool from JSON
- Handles reverse scoring automatically
- Calculates raw and normalized scores (0-100)
- Supports multiple scale types (5-point, 7-point)
- Generates complete personality profile
- Validates responses and handles missing data

Usage:
    scorer = SelveScorer()
    profile = scorer.score_responses(user_responses)
    print(profile)
"""

import json
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, asdict
import numpy as np


@dataclass
class DimensionScore:
    """Represents a score for a single SELVE dimension."""
    dimension: str
    raw_score: float
    normalized_score: float  # 0-100 scale
    percentile: Optional[float] = None
    n_items: int = 0
    interpretation: str = ""
    
    def to_dict(self):
        return asdict(self)


@dataclass
class SelveProfile:
    """Complete SELVE personality profile."""
    lumen: DimensionScore
    aether: DimensionScore
    orpheus: DimensionScore
    orin: DimensionScore
    lyra: DimensionScore
    vara: DimensionScore
    chronos: DimensionScore
    kael: DimensionScore
    
    def to_dict(self):
        return {
            'LUMEN': self.lumen.to_dict(),
            'AETHER': self.aether.to_dict(),
            'ORPHEUS': self.orpheus.to_dict(),
            'ORIN': self.orin.to_dict(),
            'LYRA': self.lyra.to_dict(),
            'VARA': self.vara.to_dict(),
            'CHRONOS': self.chronos.to_dict(),
            'KAEL': self.kael.to_dict()
        }
    
    def get_top_dimensions(self, n: int = 3) -> List[str]:
        """Get the top N strongest dimensions."""
        scores = [
            ('LUMEN', self.lumen.normalized_score),
            ('AETHER', self.aether.normalized_score),
            ('ORPHEUS', self.orpheus.normalized_score),
            ('ORIN', self.orin.normalized_score),
            ('LYRA', self.lyra.normalized_score),
            ('VARA', self.vara.normalized_score),
            ('CHRONOS', self.chronos.normalized_score),
            ('KAEL', self.kael.normalized_score)
        ]
        return [dim for dim, score in sorted(scores, key=lambda x: x[1], reverse=True)[:n]]


class SelveScorer:
    """
    SELVE personality assessment scorer.
    
    Handles:
    - Loading item pool
    - Reverse scoring
    - Raw score calculation
    - Normalization (0-100)
    - Profile generation
    """
    
    # Dimension symbols and colors for visualization
    DIMENSION_INFO = {
        'LUMEN': {'symbol': '✨', 'color': '#FFD700', 'name': 'Social Energy'},
        'AETHER': {'symbol': '🌫️', 'color': '#E6E6FA', 'name': 'Emotional Stability'},
        'ORPHEUS': {'symbol': '🎵', 'color': '#DDA0DD', 'name': 'Empathy'},
        'ORIN': {'symbol': '🧭', 'color': '#4682B4', 'name': 'Organization'},
        'LYRA': {'symbol': '🦋', 'color': '#98FB98', 'name': 'Openness'},
        'VARA': {'symbol': '⚖️', 'color': '#F0E68C', 'name': 'Honesty'},
        'CHRONOS': {'symbol': '⏳', 'color': '#E8B4F0', 'name': 'Patience'},
        'KAEL': {'symbol': '🔥', 'color': '#FF6347', 'name': 'Assertiveness'}
    }
    
    def __init__(self, item_pool_path: Optional[str] = None):
        """
        Initialize scorer with item pool.
        
        Args:
            item_pool_path: Path to selve_item_pool_expanded.json
        """
        if item_pool_path is None:
            item_pool_path = Path(__file__).parent / "data" / "selve_item_pool_expanded.json"
        
        self.item_pool_path = Path(item_pool_path)
        self.item_pool = self._load_item_pool()
        self.dimension_items = self._organize_items_by_dimension()
        
    def _load_item_pool(self) -> Dict:
        """Load item pool from JSON file."""
        with open(self.item_pool_path, 'r') as f:
            return json.load(f)
    
    def _organize_items_by_dimension(self) -> Dict[str, List[Dict]]:
        """Organize items by dimension for efficient lookup."""
        return {
            dimension: items 
            for dimension, items in self.item_pool.items()
        }
    
    def _get_scale_range(self, item_code: str) -> Tuple[int, int]:
        """
        Determine scale range based on item source.
        
        Returns:
            (min_value, max_value) tuple
        """
        # 16PF Dominance items (D): 1-5 scale
        if item_code.startswith('D') and item_code[1:].isdigit():
            return (1, 5)
        # Big Five items (E, N, A, C, O - single letter + digit): 1-5 scale
        elif len(item_code) >= 2 and item_code[0] in ['E', 'N', 'A', 'C', 'O'] and item_code[1:].isdigit():
            return (1, 5)
        # HEXACO items (H, X, AForg, AGent, AFlex, APati): 1-7 scale
        else:
            return (1, 7)
    
    def _apply_reverse_scoring(self, response: float, is_reversed: bool, scale_max: int) -> float:
        """
        Apply reverse scoring if needed.
        
        Args:
            response: User's response value
            is_reversed: Whether item is reverse-scored
            scale_max: Maximum value of the scale
            
        Returns:
            Scored response value
        """
        if is_reversed:
            return (scale_max + 1) - response
        return response
    
    def _calculate_dimension_score(
        self, 
        dimension: str, 
        responses: Dict[str, float]
    ) -> DimensionScore:
        """
        Calculate score for a single dimension.
        
        Args:
            dimension: Dimension name (e.g., 'LUMEN')
            responses: Dict mapping item codes to response values
            
        Returns:
            DimensionScore object
        """
        items = self.dimension_items[dimension]
        scored_responses = []
        
        for item_info in items:
            item_code = item_info['item']
            
            # Skip if user didn't respond to this item
            if item_code not in responses:
                continue
            
            response = responses[item_code]
            is_reversed = item_info['reversed']
            _, scale_max = self._get_scale_range(item_code)
            
            # Apply reverse scoring if needed
            scored_value = self._apply_reverse_scoring(response, is_reversed, scale_max)
            scored_responses.append(scored_value)
        
        # Calculate raw score (mean of scored responses)
        if not scored_responses:
            raw_score = 0.0
            normalized_score = 0.0
        else:
            raw_score = np.mean(scored_responses)
            
            # Normalize to 0-100 scale
            # For mixed scales, assume 7-point scale as reference (most items)
            reference_scale_max = 7
            normalized_score = ((raw_score - 1) / (reference_scale_max - 1)) * 100
        
        # Generate interpretation
        interpretation = self._interpret_score(dimension, normalized_score)
        
        return DimensionScore(
            dimension=dimension,
            raw_score=round(raw_score, 3),
            normalized_score=round(normalized_score, 2),
            n_items=len(scored_responses),
            interpretation=interpretation
        )
    
    def _interpret_score(self, dimension: str, normalized_score: float) -> str:
        """
        Generate text interpretation of score.
        
        Args:
            dimension: Dimension name
            normalized_score: Score on 0-100 scale
            
        Returns:
            Interpretation string
        """
        if normalized_score >= 75:
            level = "Very High"
        elif normalized_score >= 60:
            level = "High"
        elif normalized_score >= 40:
            level = "Moderate"
        elif normalized_score >= 25:
            level = "Low"
        else:
            level = "Very Low"
        
        return f"{level} {self.DIMENSION_INFO[dimension]['name']}"
    
    def score_responses(
        self, 
        responses: Dict[str, float],
        validate: bool = True
    ) -> SelveProfile:
        """
        Score user responses and generate complete SELVE profile.
        
        Args:
            responses: Dict mapping item codes to response values
                      e.g., {'E1': 4, 'E2': 2, 'N1': 3, ...}
            validate: Whether to validate responses before scoring
            
        Returns:
            SelveProfile object with all dimension scores
            
        Raises:
            ValueError: If responses are invalid
        """
        if validate:
            self._validate_responses(responses)
        
        # Calculate scores for each dimension
        lumen_score = self._calculate_dimension_score('LUMEN', responses)
        aether_score = self._calculate_dimension_score('AETHER', responses)
        orpheus_score = self._calculate_dimension_score('ORPHEUS', responses)
        orin_score = self._calculate_dimension_score('ORIN', responses)
        lyra_score = self._calculate_dimension_score('LYRA', responses)
        vara_score = self._calculate_dimension_score('VARA', responses)
        chronos_score = self._calculate_dimension_score('CHRONOS', responses)
        kael_score = self._calculate_dimension_score('KAEL', responses)
        
        return SelveProfile(
            lumen=lumen_score,
            aether=aether_score,
            orpheus=orpheus_score,
            orin=orin_score,
            lyra=lyra_score,
            vara=vara_score,
            chronos=chronos_score,
            kael=kael_score
        )
    
    def _validate_responses(self, responses: Dict[str, float]):
        """
        Validate user responses.
        
        Args:
            responses: Dict mapping item codes to response values
            
        Raises:
            ValueError: If responses are invalid
        """
        for item_code, response in responses.items():
            min_val, max_val = self._get_scale_range(item_code)
            
            if not isinstance(response, (int, float)):
                raise ValueError(f"Response for {item_code} must be numeric")
            
            if response < min_val or response > max_val:
                raise ValueError(
                    f"Response for {item_code} ({response}) must be between {min_val} and {max_val}"
                )
    
    def get_all_items(self) -> List[Dict]:
        """
        Get all items from the pool in a flat list.
        
        Returns:
            List of item dicts with dimension added
        """
        all_items = []
        for dimension, items in self.dimension_items.items():
            for item in items:
                item_copy = item.copy()
                item_copy['dimension'] = dimension
                all_items.append(item_copy)
        return all_items
    
    def get_items_by_dimension(self, dimension: str) -> List[Dict]:
        """Get all items for a specific dimension."""
        return self.dimension_items.get(dimension, [])
    
    def get_quick_screen_items(self, n_per_dimension: int = 2) -> List[Dict]:
        """
        Get items for quick screening (highest correlation per dimension).
        
        Args:
            n_per_dimension: Number of items per dimension
            
        Returns:
            List of selected items
        """
        quick_items = []
        for dimension, items in self.dimension_items.items():
            # Sort by correlation (descending) and take top n
            sorted_items = sorted(items, key=lambda x: x['correlation'], reverse=True)
            selected = sorted_items[:n_per_dimension]
            
            for item in selected:
                item_copy = item.copy()
                item_copy['dimension'] = dimension
                quick_items.append(item_copy)
        
        return quick_items


def example_usage():
    """Example of how to use the SELVE scorer."""
    
    # Initialize scorer
    scorer = SelveScorer('/home/chris/selve/data/selve_item_pool_expanded.json')
    
    # Example responses (in practice, these come from user assessment)
    # Using actual item codes from the expanded pool
    example_responses = {
        # LUMEN items (5-point scale: 1-5)
        'E5': 4,  # I start conversations
        'E7': 5,  # I talk to a lot of different people at parties
        'E4': 2,  # I keep in the background [R]
        'E3': 4,  # I feel comfortable around people
        
        # AETHER items (5-point scale: 1-5)
        'N6': 2,  # I get upset easily [R]
        'N8': 2,  # I have frequent mood swings [R]
        'N7': 3,  # I change my mood a lot [R]
        
        # ORPHEUS items (5-point scale: 1-5)
        'A4': 5,  # I sympathize with others' feelings
        'A9': 4,  # I feel others' emotions
        
        # ORIN items (5-point scale: 1-5)
        'C6': 2,  # I often forget to put things back [R]
        'C5': 4,  # I get chores done right away
        
        # LYRA items (5-point scale: 1-5)
        'O10': 5,  # I am full of ideas
        'O1': 4,   # I have a rich vocabulary
        
        # VARA items (7-point scale: 1-7)
        'HMode10': 2,  # I boast about my virtues [R]
        'HFair1': 6,   # I would never take things that aren't mine
        
        # CHRONOS items (7-point scale: 1-7)
        'APati3': 6,  # I am usually a patient person
        'APati1': 5,  # It takes a lot to make me angry
        
        # KAEL items (5-point scale: 1-5)
        'D6': 4,  # I know how to captivate people
        'D4': 4,  # I have leadership abilities
    }
    
    # Score responses
    profile = scorer.score_responses(example_responses)
    
    # Display results
    print("=" * 60)
    print("SELVE PERSONALITY PROFILE")
    print("=" * 60)
    
    for dimension in ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']:
        score_obj = getattr(profile, dimension.lower())
        info = scorer.DIMENSION_INFO[dimension]
        
        print(f"\n{info['symbol']} {dimension} - {info['name']}")
        print(f"   Score: {score_obj.normalized_score:.1f}/100")
        print(f"   Level: {score_obj.interpretation}")
        print(f"   Items: {score_obj.n_items}")
    
    print("\n" + "=" * 60)
    print(f"Top 3 Dimensions: {', '.join(profile.get_top_dimensions(3))}")
    print("=" * 60)
    
    # Export to JSON
    profile_json = json.dumps(profile.to_dict(), indent=2)
    print("\nJSON Export:")
    print(profile_json)


if __name__ == "__main__":
    example_usage()
