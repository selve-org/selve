"""
Test API Integration - Direct Function Call
"""
import sys
sys.path.insert(0, '/home/chris/selve/backend')

from app.narratives.integrated_generator import generate_integrated_narrative

# Test scores
test_scores = {
    'LUMEN': 50,
    'AETHER': 37,
    'ORPHEUS': 40,
    'ORIN': 40,
    'LYRA': 41,
    'VARA': 57,
    'CHRONOS': 50,
    'KAEL': 0
}

print("=" * 80)
print("TESTING INTEGRATED NARRATIVE FOR API")
print("=" * 80)

try:
    narrative = generate_integrated_narrative(test_scores, use_llm=True)
    
    print("\n✅ SUCCESS - Narrative Generated!\n")
    
    # Check structure
    print("Structure Check:")
    print(f"  - profile_pattern: {narrative.get('profile_pattern', {}).get('pattern')}")
    print(f"  - sections: {list(narrative.get('sections', {}).keys())}")
    print(f"  - generation_cost: ${narrative.get('generation_cost', 0):.4f}")
    print(f"  - model: {narrative.get('metadata', {}).get('model')}")
    print(f"  - method: {narrative.get('metadata', {}).get('generation_method')}")
    
    # Show first section
    print("\n" + "=" * 80)
    print("CORE IDENTITY (first 300 chars)")
    print("=" * 80)
    print(narrative['sections']['core_identity'][:300] + "...")
    
    print("\n✅ API-ready format confirmed!")
    
except Exception as e:
    print(f"\n❌ Error: {e}")
    import traceback
    traceback.print_exc()
