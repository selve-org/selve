"""
SELVE Scoring Algorithm - Test Suite
=====================================
Comprehensive tests for the scoring engine.
"""

import pytest
from app.scoring import SelveScorer, DimensionScore, SelveProfile


class TestSelveScorer:
    """Test suite for SELVE scoring algorithm."""
    
    @pytest.fixture
    def scorer(self):
        """Create scorer instance for tests."""
        return SelveScorer('app/data/selve_item_pool_expanded.json')
    
    def test_scorer_initialization(self, scorer):
        """Test scorer loads item pool correctly."""
        assert scorer.item_pool is not None
        assert len(scorer.dimension_items) == 8
        assert 'LUMEN' in scorer.dimension_items
        assert 'VARA' in scorer.dimension_items
    
    def test_scale_detection(self, scorer):
        """Test scale range detection for different item types."""
        # Big Five items: 1-5 scale
        assert scorer._get_scale_range('E1') == (1, 5)
        assert scorer._get_scale_range('N10') == (1, 5)
        assert scorer._get_scale_range('A5') == (1, 5)
        assert scorer._get_scale_range('C3') == (1, 5)
        assert scorer._get_scale_range('O8') == (1, 5)
        
        # 16PF Dominance: 1-5 scale
        assert scorer._get_scale_range('D1') == (1, 5)
        assert scorer._get_scale_range('D10') == (1, 5)
        
        # HEXACO items: 1-7 scale
        assert scorer._get_scale_range('HMode1') == (1, 7)
        assert scorer._get_scale_range('HSinc5') == (1, 7)
        assert scorer._get_scale_range('APati3') == (1, 7)
        assert scorer._get_scale_range('AForg2') == (1, 7)
        assert scorer._get_scale_range('XExpr1') == (1, 7)
    
    def test_reverse_scoring(self, scorer):
        """Test reverse scoring logic."""
        # 5-point scale
        assert scorer._apply_reverse_scoring(1, True, 5) == 5
        assert scorer._apply_reverse_scoring(5, True, 5) == 1
        assert scorer._apply_reverse_scoring(3, True, 5) == 3
        assert scorer._apply_reverse_scoring(4, False, 5) == 4
        
        # 7-point scale
        assert scorer._apply_reverse_scoring(1, True, 7) == 7
        assert scorer._apply_reverse_scoring(7, True, 7) == 1
        assert scorer._apply_reverse_scoring(4, True, 7) == 4
        assert scorer._apply_reverse_scoring(6, False, 7) == 6
    
    def test_full_response_scoring(self, scorer):
        """Test complete scoring with valid responses."""
        responses = {
            'E1': 5, 'E5': 4, 'E7': 5,  # LUMEN
            'N1': 2, 'N6': 2,  # AETHER
            'A4': 5, 'A9': 4,  # ORPHEUS
            'C5': 4, 'C1': 5,  # ORIN
            'O10': 5, 'O1': 4,  # LYRA
            'HMode10': 2, 'HFair1': 6,  # VARA
            'APati3': 6, 'APati1': 5,  # CHRONOS
            'D4': 4, 'D6': 4,  # KAEL
        }
        
        profile = scorer.score_responses(responses)
        
        # Check profile structure
        assert isinstance(profile, SelveProfile)
        assert isinstance(profile.lumen, DimensionScore)
        
        # Check all dimensions have scores
        assert profile.lumen.normalized_score > 0
        assert profile.aether.normalized_score > 0
        assert profile.orpheus.normalized_score > 0
        assert profile.orin.normalized_score > 0
        assert profile.lyra.normalized_score > 0
        assert profile.vara.normalized_score > 0
        assert profile.chronos.normalized_score > 0
        assert profile.kael.normalized_score > 0
        
        # Check score ranges (0-100)
        for dim in ['lumen', 'aether', 'orpheus', 'orin', 'lyra', 'vara', 'chronos', 'kael']:
            score = getattr(profile, dim).normalized_score
            assert 0 <= score <= 100
    
    def test_invalid_response_validation(self, scorer):
        """Test that invalid responses raise errors."""
        # Out of range for 5-point scale
        with pytest.raises(ValueError):
            scorer.score_responses({'E1': 6})
        
        # Out of range for 7-point scale
        with pytest.raises(ValueError):
            scorer.score_responses({'HMode1': 8})
        
        # Negative value
        with pytest.raises(ValueError):
            scorer.score_responses({'E1': -1})
        
        # Non-numeric value
        with pytest.raises(ValueError):
            scorer.score_responses({'E1': 'high'})
    
    def test_partial_responses(self, scorer):
        """Test scoring with incomplete responses."""
        # Only answer a few items
        partial_responses = {
            'E1': 5,
            'E5': 4,
            'A4': 5,
        }
        
        profile = scorer.score_responses(partial_responses, validate=False)
        
        # LUMEN should have 2 items
        assert profile.lumen.n_items == 2
        
        # ORPHEUS should have 1 item
        assert profile.orpheus.n_items == 1
        
        # AETHER should have 0 items (no responses)
        assert profile.aether.n_items == 0
        assert profile.aether.normalized_score == 0
    
    def test_quick_screen_items(self, scorer):
        """Test quick screening item selection."""
        quick_items = scorer.get_quick_screen_items(n_per_dimension=2)
        
        # Should have 2 items per dimension (8 dimensions = 16 items)
        assert len(quick_items) == 16
        
        # Check each dimension is represented
        dimensions = [item['dimension'] for item in quick_items]
        for dim in ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']:
            assert dimensions.count(dim) == 2
        
        # Check items are sorted by correlation (highest first)
        for dim in ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']:
            dim_items = [item for item in quick_items if item['dimension'] == dim]
            correlations = [item['correlation'] for item in dim_items]
            assert correlations == sorted(correlations, reverse=True)
    
    def test_top_dimensions(self, scorer):
        """Test getting top dimensions from profile."""
        responses = {
            'E1': 5, 'E5': 5, 'E7': 5,  # LUMEN: very high
            'N1': 1, 'N6': 1,  # AETHER: very high (reversed)
            'A4': 3, 'A9': 3,  # ORPHEUS: moderate
            'C5': 2, 'C1': 2,  # ORIN: low
            'O10': 3, 'O1': 3,  # LYRA: moderate
            'HMode10': 1, 'HFair1': 7,  # VARA: very high
            'APati3': 4, 'APati1': 4,  # CHRONOS: moderate
            'D4': 2, 'D6': 2,  # KAEL: low
        }
        
        profile = scorer.score_responses(responses)
        top_3 = profile.get_top_dimensions(3)
        
        assert len(top_3) == 3
        # Should include high scorers: LUMEN, AETHER, VARA
        assert 'LUMEN' in top_3 or 'AETHER' in top_3 or 'VARA' in top_3
    
    def test_json_export(self, scorer):
        """Test profile can be exported to JSON."""
        responses = {
            'E1': 4,
            'N1': 3,
            'A4': 5,
            'C5': 4,
            'O10': 5,
            'HMode1': 6,
            'APati3': 5,
            'D4': 4,
        }
        
        profile = scorer.score_responses(responses, validate=False)
        profile_dict = profile.to_dict()
        
        assert isinstance(profile_dict, dict)
        assert 'LUMEN' in profile_dict
        assert 'normalized_score' in profile_dict['LUMEN']
        assert 'interpretation' in profile_dict['LUMEN']
    
    def test_interpretation_levels(self, scorer):
        """Test score interpretation levels."""
        # Very High (>= 75)
        assert "Very High" in scorer._interpret_score('LUMEN', 80)
        
        # High (60-74)
        assert "High" in scorer._interpret_score('LUMEN', 65)
        
        # Moderate (40-59)
        assert "Moderate" in scorer._interpret_score('LUMEN', 50)
        
        # Low (25-39)
        assert "Low" in scorer._interpret_score('LUMEN', 30)
        
        # Very Low (< 25)
        assert "Very Low" in scorer._interpret_score('LUMEN', 20)


if __name__ == "__main__":
    # Run tests with pytest
    pytest.main([__file__, '-v'])
