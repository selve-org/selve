"""
Integration Tests for Friend Response Submission Flow

Tests the complete flow:
1. Load friend item pool
2. Simulate friend responses
3. Calculate quality score
4. Validate response submission format
5. Test different quality scenarios
"""

import json
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app.services.quality_scoring import QualityScoringService


def test_friend_item_pool_loading():
    """Test that friend item pool loads correctly."""
    print("=" * 80)
    print("TEST 1: Friend Item Pool Loading")
    print("=" * 80)
    
    try:
        with open('app/data/selve_friend_item_pool.json', 'r') as f:
            item_pool = json.load(f)
        
        # Validate structure
        assert isinstance(item_pool, dict), "Item pool should be a dictionary"
        
        dimensions = ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']
        for dim in dimensions:
            assert dim in item_pool, f"Missing dimension: {dim}"
        
        # Count total items
        total_items = sum(len(items) for items in item_pool.values())
        assert total_items == 27, f"Expected 27 items, got {total_items}"
        
        # Validate item structure
        for dimension, items in item_pool.items():
            for item in items:
                assert 'item' in item, f"Missing 'item' field in {dimension}"
                assert 'text' in item, f"Missing 'text' field in {dimension}"
                assert 'dimension' in item, f"Missing 'dimension' field in {dimension}"
                assert 'reversed' in item, f"Missing 'reversed' field in {dimension}"
                assert 'correlation' in item, f"Missing 'correlation' field in {dimension}"
                assert '{Name}' in item['text'], f"Missing {{Name}} placeholder in {dimension}"
        
        print(f"✅ Item pool loaded: {total_items} items across {len(dimensions)} dimensions")
        return True
        
    except Exception as e:
        print(f"❌ Failed to load item pool: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_quality_scoring_high_quality():
    """Test quality scoring with high-quality responses."""
    print("\n" + "=" * 80)
    print("TEST 2: Quality Scoring - High Quality Responses")
    print("=" * 80)
    
    try:
        service = QualityScoringService()
        
        # Simulate high-quality responses
        # - Good response times (5-10 seconds each)
        # - Varied responses (no straightlining)
        # - Reasonable not-sure usage (15%)
        responses = [
            {'item_id': 'lumen_1', 'value': 4, 'not_sure': False, 'response_time': 6200},
            {'item_id': 'lumen_2', 'value': 2, 'not_sure': False, 'response_time': 7100},
            {'item_id': 'aether_1', 'value': 5, 'not_sure': False, 'response_time': 5800},
            {'item_id': 'aether_2', 'value': 3, 'not_sure': False, 'response_time': 6500},
            {'item_id': 'orpheus_1', 'value': 4, 'not_sure': False, 'response_time': 7200},
            {'item_id': 'orpheus_2', 'value': 2, 'not_sure': True, 'response_time': 4500},  # Not sure
            {'item_id': 'orin_1', 'value': 5, 'not_sure': False, 'response_time': 6800},
            {'item_id': 'orin_2', 'value': 3, 'not_sure': False, 'response_time': 5900},
            {'item_id': 'lyra_1', 'value': 4, 'not_sure': False, 'response_time': 6300},
            {'item_id': 'lyra_2', 'value': 2, 'not_sure': False, 'response_time': 7400},
        ]
        
        total_time = sum(r['response_time'] for r in responses)
        quality_score = service.calculate_quality_score(responses, total_time)
        
        print(f"Quality score: {quality_score}")
        print(f"Total time: {total_time / 1000:.1f} seconds")
        print(f"Avg time per question: {total_time / len(responses) / 1000:.1f} seconds")
        print(f"Not-sure count: {sum(1 for r in responses if r['not_sure'])} / {len(responses)}")
        
        assert quality_score >= 70, f"Expected high quality (≥70), got {quality_score}"
        print(f"✅ High quality detected: {quality_score}/100")
        
        return True
        
    except Exception as e:
        print(f"❌ Quality scoring failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_quality_scoring_low_quality():
    """Test quality scoring with low-quality responses (too fast, straightlining)."""
    print("\n" + "=" * 80)
    print("TEST 3: Quality Scoring - Low Quality Responses")
    print("=" * 80)
    
    try:
        service = QualityScoringService()
        
        # Simulate low-quality responses
        # - Too fast (< 3 seconds each)
        # - Straightlining (all same value)
        # - No not-sure responses (overconfident)
        responses = [
            {'item_id': 'lumen_1', 'value': 3, 'not_sure': False, 'response_time': 1200},
            {'item_id': 'lumen_2', 'value': 3, 'not_sure': False, 'response_time': 1100},
            {'item_id': 'aether_1', 'value': 3, 'not_sure': False, 'response_time': 1300},
            {'item_id': 'aether_2', 'value': 3, 'not_sure': False, 'response_time': 1000},
            {'item_id': 'orpheus_1', 'value': 3, 'not_sure': False, 'response_time': 1400},
            {'item_id': 'orpheus_2', 'value': 3, 'not_sure': False, 'response_time': 1200},
            {'item_id': 'orin_1', 'value': 3, 'not_sure': False, 'response_time': 1100},
            {'item_id': 'orin_2', 'value': 3, 'not_sure': False, 'response_time': 1300},
            {'item_id': 'lyra_1', 'value': 3, 'not_sure': False, 'response_time': 1000},
            {'item_id': 'lyra_2', 'value': 3, 'not_sure': False, 'response_time': 1200},
        ]
        
        total_time = sum(r['response_time'] for r in responses)
        quality_score = service.calculate_quality_score(responses, total_time)
        
        print(f"Quality score: {quality_score}")
        print(f"Total time: {total_time / 1000:.1f} seconds")
        print(f"Avg time per question: {total_time / len(responses) / 1000:.1f} seconds")
        print(f"Not-sure count: {sum(1 for r in responses if r['not_sure'])} / {len(responses)}")
        
        assert quality_score < 50, f"Expected low quality (<50), got {quality_score}"
        print(f"✅ Low quality detected: {quality_score}/100")
        
        return True
        
    except Exception as e:
        print(f"❌ Quality scoring failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_quality_scoring_medium_quality():
    """Test quality scoring with medium-quality responses."""
    print("\n" + "=" * 80)
    print("TEST 4: Quality Scoring - Medium Quality Responses")
    print("=" * 80)
    
    try:
        service = QualityScoringService()
        
        # Simulate medium-quality responses
        # - Moderate response times (4-6 seconds)
        # - Some variance but not great
        # - Too many not-sure responses (40%)
        responses = [
            {'item_id': 'lumen_1', 'value': 4, 'not_sure': False, 'response_time': 4200},
            {'item_id': 'lumen_2', 'value': 3, 'not_sure': True, 'response_time': 3100},
            {'item_id': 'aether_1', 'value': 4, 'not_sure': False, 'response_time': 4800},
            {'item_id': 'aether_2', 'value': 3, 'not_sure': True, 'response_time': 3500},
            {'item_id': 'orpheus_1', 'value': 4, 'not_sure': False, 'response_time': 4200},
            {'item_id': 'orpheus_2', 'value': 2, 'not_sure': True, 'response_time': 3500},
            {'item_id': 'orin_1', 'value': 3, 'not_sure': False, 'response_time': 4800},
            {'item_id': 'orin_2', 'value': 4, 'not_sure': True, 'response_time': 3900},
            {'item_id': 'lyra_1', 'value': 3, 'not_sure': False, 'response_time': 4300},
            {'item_id': 'lyra_2', 'value': 4, 'not_sure': False, 'response_time': 4400},
        ]
        
        total_time = sum(r['response_time'] for r in responses)
        quality_score = service.calculate_quality_score(responses, total_time)
        
        print(f"Quality score: {quality_score}")
        print(f"Total time: {total_time / 1000:.1f} seconds")
        print(f"Avg time per question: {total_time / len(responses) / 1000:.1f} seconds")
        print(f"Not-sure count: {sum(1 for r in responses if r['not_sure'])} / {len(responses)}")
        
        assert 50 <= quality_score < 70, f"Expected medium quality (50-69), got {quality_score}"
        print(f"✅ Medium quality detected: {quality_score}/100")
        
        return True
        
    except Exception as e:
        print(f"❌ Quality scoring failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_response_submission_format():
    """Test response submission format matches API expectations."""
    print("\n" + "=" * 80)
    print("TEST 5: Response Submission Format Validation")
    print("=" * 80)
    
    try:
        # Load friend item pool
        with open('app/data/selve_friend_item_pool.json', 'r') as f:
            item_pool = json.load(f)
        
        # Create sample submission (all 27 questions)
        responses = []
        for dimension, items in item_pool.items():
            for item in items:
                responses.append({
                    'item_id': item['item'],
                    'value': 4,  # Sample response
                    'not_sure': False,
                    'response_time': 5000  # 5 seconds
                })
        
        submission = {
            'responses': responses,
            'total_time': len(responses) * 5000,  # 135 seconds
            'privacy_accepted': True
        }
        
        # Validate format
        assert 'responses' in submission
        assert 'total_time' in submission
        assert 'privacy_accepted' in submission
        assert isinstance(submission['responses'], list)
        assert len(submission['responses']) == 27
        
        # Validate each response
        for response in submission['responses']:
            assert 'item_id' in response
            assert 'value' in response
            assert 'not_sure' in response
            assert 'response_time' in response
            assert 1 <= response['value'] <= 5
            assert isinstance(response['not_sure'], bool)
            assert response['response_time'] > 0
        
        print(f"✅ Submission format validated")
        print(f"   - {len(submission['responses'])} responses")
        print(f"   - Total time: {submission['total_time'] / 1000:.1f} seconds")
        print(f"   - Privacy accepted: {submission['privacy_accepted']}")
        
        return True
        
    except Exception as e:
        print(f"❌ Format validation failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    """Run all integration tests."""
    print("\n")
    print("🧪 FRIEND RESPONSE FLOW INTEGRATION TESTS")
    print("=" * 80)
    print()
    
    tests = [
        test_friend_item_pool_loading,
        test_quality_scoring_high_quality,
        test_quality_scoring_low_quality,
        test_quality_scoring_medium_quality,
        test_response_submission_format,
    ]
    
    results = []
    for test in tests:
        try:
            result = test()
            results.append(result)
        except Exception as e:
            print(f"❌ Test failed with exception: {e}")
            results.append(False)
    
    # Print summary
    print("\n" + "=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    passed = sum(results)
    total = len(results)
    print(f"Passed: {passed}/{total}")
    
    if passed == total:
        print("✅ ALL TESTS PASSED")
        return 0
    else:
        print(f"❌ {total - passed} TEST(S) FAILED")
        return 1


if __name__ == "__main__":
    sys.exit(main())
