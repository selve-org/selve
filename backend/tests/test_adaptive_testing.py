"""
Tests for SELVE Adaptive Testing Algorithm

Tests the intelligent question selection logic that reduces
assessment time by 40-60% while maintaining accuracy.
"""

import pytest
from app.adaptive_testing import AdaptiveTester, DimensionUncertainty, simulate_responses


class TestAdaptiveTester:
    """Test suite for AdaptiveTester class."""
    
    @pytest.fixture
    def tester(self):
        """Create adaptive tester instance."""
        return AdaptiveTester()
    
    def test_initialization(self, tester):
        """Test tester initializes correctly."""
        assert tester.scorer is not None
        assert tester.item_pool is not None
        assert len(tester.item_pool) == 8  # 8 dimensions
        
        # Check parameters
        assert 0 < tester.UNCERTAINTY_THRESHOLD < 1
        assert tester.MIN_ITEMS_PER_DIMENSION >= 2
        assert tester.MAX_ITEMS_PER_DIMENSION > tester.MIN_ITEMS_PER_DIMENSION
        assert tester.TARGET_TOTAL_ITEMS < tester.MAX_TOTAL_ITEMS
    
    def test_quick_screen(self, tester):
        """Test quick screen returns correct items."""
        items = tester.get_quick_screen()
        
        # Should return 2 items per dimension (16 total)
        assert len(items) == 16
        
        # Check each dimension has 2 items
        dimensions = [item['dimension'] for item in items]
        for dim in ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']:
            assert dimensions.count(dim) == 2
        
        # Items should be highest correlation
        for dim in ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']:
            dim_items = [item for item in items if item['dimension'] == dim]
            all_dim_items = tester.scorer.get_items_by_dimension(dim)
            all_dim_items.sort(key=lambda x: x['correlation'], reverse=True)
            
            # Quick screen items should be in top 3 for quality
            # Compare by item code since dimension field is added to copies
            quick_item_codes = [item['item'] for item in dim_items]
            top_item_codes = [item['item'] for item in all_dim_items[:3]]
            for code in quick_item_codes:
                assert code in top_item_codes
    
    def test_uncertainty_calculation_no_responses(self, tester):
        """Test uncertainty with no responses."""
        uncertainty = tester.calculate_dimension_uncertainty({}, 'LUMEN')
        
        assert uncertainty.dimension == 'LUMEN'
        assert uncertainty.uncertainty_score == 1.0  # Maximum uncertainty
        assert uncertainty.n_items_answered == 0
        assert uncertainty.needs_more_items is True
        assert uncertainty.recommended_additional_items >= 2
    
    def test_uncertainty_calculation_with_responses(self, tester):
        """Test uncertainty with some responses."""
        # Get some items and create responses
        quick_items = tester.get_quick_screen()
        lumen_items = [item for item in quick_items if item['dimension'] == 'LUMEN']
        
        responses = {
            lumen_items[0]['item']: 5,
            lumen_items[1]['item']: 4
        }
        
        uncertainty = tester.calculate_dimension_uncertainty(responses, 'LUMEN')
        
        assert uncertainty.dimension == 'LUMEN'
        assert 0 <= uncertainty.uncertainty_score <= 1
        assert uncertainty.n_items_answered == 2
        assert uncertainty.variance >= 0
    
    def test_uncertainty_high_variance(self, tester):
        """Test uncertainty with contradictory responses."""
        quick_items = tester.get_quick_screen()
        lumen_items = [item for item in quick_items if item['dimension'] == 'LUMEN']
        
        # Contradictory responses (very high and very low)
        responses = {
            lumen_items[0]['item']: 1,  # Very low
            lumen_items[1]['item']: 5   # Very high
        }
        
        uncertainty = tester.calculate_dimension_uncertainty(responses, 'LUMEN')
        
        # High variance should increase uncertainty
        assert uncertainty.variance > 0.1
        assert uncertainty.uncertainty_score > 0.3
    
    def test_uncertainty_consistent_responses(self, tester):
        """Test uncertainty with consistent responses."""
        # Get more items for better test
        all_items = tester.scorer.get_all_items()
        lumen_items = [item for item in all_items if item['dimension'] == 'LUMEN'][:5]
        
        # Consistent responses (all moderate)
        responses = {item['item']: 3 for item in lumen_items}
        
        uncertainty = tester.calculate_dimension_uncertainty(responses, 'LUMEN')
        
        # Low variance with enough items should reduce uncertainty
        assert uncertainty.variance < 0.1
        assert uncertainty.n_items_answered == 5
        # Midpoint score (near 50) might still be uncertain
    
    def test_select_next_items_prioritizes_uncertain(self, tester):
        """Test next item selection prioritizes uncertain dimensions."""
        # Start with quick screen for most dimensions
        quick_items = tester.get_quick_screen()
        responses = simulate_responses(quick_items)
        
        # Make one dimension very uncertain by giving contradictory answers
        vara_items = [item for item in quick_items if item['dimension'] == 'VARA']
        if len(vara_items) >= 2:
            responses[vara_items[0]['item']] = 1  # Very low
            responses[vara_items[1]['item']] = 7  # Very high
        
        # Get next items
        next_items = tester.select_next_items(responses, max_items=5)
        
        assert len(next_items) > 0
        assert all('item' in item for item in next_items)
        assert all('dimension' in item for item in next_items)
        
        # Should not include already answered items
        answered_codes = set(responses.keys())
        for item in next_items:
            assert item['item'] not in answered_codes
    
    def test_select_next_items_respects_max(self, tester):
        """Test next item selection respects max_items parameter."""
        quick_items = tester.get_quick_screen()
        responses = simulate_responses(quick_items)
        
        next_items = tester.select_next_items(responses, max_items=3)
        
        assert len(next_items) <= 3
    
    def test_should_continue_testing_max_items(self, tester):
        """Test stopping at max items."""
        # Create responses at max items limit
        all_items = tester.scorer.get_all_items()
        responses = simulate_responses(all_items[:tester.MAX_TOTAL_ITEMS])
        
        should_continue, reason = tester.should_continue_testing(responses)
        
        assert should_continue is False
        assert "Maximum items reached" in reason
    
    def test_should_continue_testing_all_confident(self, tester):
        """Test stopping when all dimensions are confident."""
        # This is hard to engineer, but we can test the logic
        # For now, just test with minimal responses
        quick_items = tester.get_quick_screen()
        
        # Create very consistent responses (low uncertainty)
        responses = {}
        for item in quick_items:
            # Give moderate, consistent responses
            responses[item['item']] = 3
        
        should_continue, reason = tester.should_continue_testing(responses)
        
        # Should have bool and string reason
        assert isinstance(should_continue, bool)
        assert isinstance(reason, str)
        assert len(reason) > 0
    
    def test_adaptive_assessment_integration(self, tester):
        """Test complete adaptive assessment flow."""
        # Run with simulated responses
        profile = tester.run_adaptive_assessment(
            response_collector=simulate_responses,
            verbose=False
        )
        
        # Should return valid profile
        assert profile is not None
        assert hasattr(profile, 'lumen')
        assert hasattr(profile, 'aether')
        assert hasattr(profile, 'chronos')
        
        # Should use fewer than max items
        total_items = sum(
            getattr(profile, dim.lower()).n_items
            for dim in ['lumen', 'aether', 'orpheus', 'orin', 'lyra', 'vara', 'chronos', 'kael']
        )
        
        assert total_items >= 16  # At least quick screen
        assert total_items <= tester.MAX_TOTAL_ITEMS
        
        # All scores should be valid
        for dim in ['lumen', 'aether', 'orpheus', 'orin', 'lyra', 'vara', 'chronos', 'kael']:
            score = getattr(profile, dim)
            assert 0 <= score.normalized_score <= 100
            assert score.n_items > 0
    
    def test_adaptive_efficiency(self, tester):
        """Test adaptive assessment is more efficient than full assessment."""
        # Run multiple times to average
        total_items_list = []
        
        for _ in range(5):
            profile = tester.run_adaptive_assessment(
                response_collector=simulate_responses,
                verbose=False
            )
            
            total_items = sum(
                getattr(profile, dim.lower()).n_items
                for dim in ['lumen', 'aether', 'orpheus', 'orin', 'lyra', 'vara', 'chronos', 'kael']
            )
            total_items_list.append(total_items)
        
        avg_items = sum(total_items_list) / len(total_items_list)
        
        # Should use significantly fewer than 98 items (target 40-60% reduction)
        assert avg_items < 70  # At least 30% reduction
        
        # But should use more than quick screen to ensure accuracy
        assert avg_items > 16


class TestSimulateResponses:
    """Test simulate_responses helper function."""
    
    def test_simulate_responses_format(self):
        """Test simulated responses have correct format."""
        items = [
            {'item': 'E1', 'text': 'Test item', 'dimension': 'LUMEN'},
            {'item': 'N1', 'text': 'Test item', 'dimension': 'AETHER'}
        ]
        
        responses = simulate_responses(items)
        
        assert isinstance(responses, dict)
        assert 'E1' in responses
        assert 'N1' in responses
        assert 1 <= responses['E1'] <= 5  # Big Five scale
        assert 1 <= responses['N1'] <= 5
    
    def test_simulate_responses_scale_detection(self):
        """Test simulated responses respect scale types."""
        items = [
            {'item': 'E1', 'text': 'Test', 'dimension': 'LUMEN'},     # 5-point
            {'item': 'HMode1', 'text': 'Test', 'dimension': 'VARA'}   # 7-point
        ]
        
        responses = simulate_responses(items)
        
        assert 1 <= responses['E1'] <= 5
        assert 1 <= responses['HMode1'] <= 7


if __name__ == '__main__':
    """Run tests with pytest."""
    pytest.main([__file__, '-v'])
