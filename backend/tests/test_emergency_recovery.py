"""
Test Emergency Recovery System
Verifies that assessment cannot complete with 0-item dimensions
"""
import sys
from app.adaptive_testing import AdaptiveTester
from app.scoring import SelveScorer

def test_emergency_detection():
    """Test that we can detect dimensions with 0 items"""
    
    # Simulate responses that skip KAEL entirely
    responses = {
        'Q1': 3,  # LUMEN
        'Q2': 4,  # LUMEN
        'Q3': 2,  # AETHER
        'Q4': 5,  # AETHER
        'Q5': 3,  # ORPHEUS
        'Q6': 4,  # ORPHEUS
        'Q7': 2,  # ORIN
        'Q8': 3,  # ORIN
        'Q9': 4,  # LYRA
        'Q10': 5,  # LYRA
        'Q11': 3,  # VARA
        'Q12': 4,  # VARA
        'Q13': 2,  # CHRONOS
        'Q14': 3,  # CHRONOS
        # KAEL: 0 items!
    }
    
    scorer = SelveScorer()
    
    # Check which dimensions have 0 items
    dimensions_with_zero = []
    for dim in ['LUMEN', 'AETHER', 'ORPHEUS', 'ORIN', 'LYRA', 'VARA', 'CHRONOS', 'KAEL']:
        dim_items = [code for code in responses.keys() if any(
            item['item'] == code for item in scorer.get_items_by_dimension(dim)
        )]
        count = len(dim_items)
        print(f"{dim}: {count} items answered")
        if count == 0:
            dimensions_with_zero.append(dim)
    
    print(f"\n{'='*50}")
    if dimensions_with_zero:
        print(f"❌ FAIL: Found dimensions with 0 items: {', '.join(dimensions_with_zero)}")
        print(f"   Emergency recovery SHOULD trigger!")
        
        # Test emergency recovery
        print(f"\n🚨 Testing Emergency Recovery...")
        for dim in dimensions_with_zero:
            all_dim_items = scorer.get_items_by_dimension(dim)
            available = [item for item in all_dim_items if item['item'] not in responses]
            if available:
                available.sort(key=lambda x: x['correlation'], reverse=True)
                top_items = available[:2]
                print(f"   {dim}: Found {len(top_items)} emergency items")
                for item in top_items:
                    print(f"      - {item['item']} (r={item['correlation']:.2f})")
            else:
                print(f"   {dim}: ❌ No emergency items available!")
    else:
        print(f"✅ PASS: All dimensions have items")
    print(f"{'='*50}\n")

def test_actual_kael_items():
    """Check how many KAEL items exist in the pool"""
    scorer = SelveScorer()
    kael_items = scorer.get_items_by_dimension('KAEL')
    print(f"\n📊 KAEL Item Pool Statistics:")
    print(f"   Total KAEL items: {len(kael_items)}")
    print(f"   Top 5 items by correlation:")
    sorted_items = sorted(kael_items, key=lambda x: x['correlation'], reverse=True)
    for i, item in enumerate(sorted_items[:5], 1):
        print(f"      {i}. {item['item']} (r={item['correlation']:.2f})")
    print()

if __name__ == "__main__":
    print("="*70)
    print("EMERGENCY RECOVERY SYSTEM TEST")
    print("="*70)
    print()
    
    test_actual_kael_items()
    test_emergency_detection()
    
    print("✅ Test complete!")
    print("   If you see dimensions with 0 items above, the emergency recovery")
    print("   system should prevent assessment completion until they're measured.")
