"""
Test the archetype matching system with various profiles.
"""

from app.narratives.archetypes import match_archetype, ARCHETYPES, BALANCED_ARCHETYPE

# Test cases representing different personality profiles
test_profiles = [
    {
        "name": "Strong Luminary",
        "scores": {
            "LUMEN": 85, "AETHER": 70, "ORPHEUS": 45, "ORIN": 50,
            "LYRA": 55, "VARA": 75, "CHRONOS": 50, "KAEL": 40
        },
        "expected": "The Luminary"
    },
    {
        "name": "Strong Healer",
        "scores": {
            "LUMEN": 40, "AETHER": 30, "ORPHEUS": 90, "ORIN": 45,
            "LYRA": 50, "VARA": 55, "CHRONOS": 85, "KAEL": 35
        },
        "expected": "The Healer"
    },
    {
        "name": "Strong Architect",
        "scores": {
            "LUMEN": 45, "AETHER": 65, "ORPHEUS": 35, "ORIN": 85,
            "LYRA": 75, "VARA": 50, "CHRONOS": 55, "KAEL": 45
        },
        "expected": "The Architect"
    },
    {
        "name": "Strong Maverick",
        "scores": {
            "LUMEN": 55, "AETHER": 60, "ORPHEUS": 45, "ORIN": 35,
            "LYRA": 80, "VARA": 50, "CHRONOS": 30, "KAEL": 90
        },
        "expected": "The Maverick"
    },
    {
        "name": "Balanced Profile",
        "scores": {
            "LUMEN": 50, "AETHER": 48, "ORPHEUS": 52, "ORIN": 51,
            "LYRA": 49, "VARA": 53, "CHRONOS": 50, "KAEL": 48
        },
        "expected": "The Renaissance Soul"  # Fallback
    },
    {
        "name": "Strong Guardian",
        "scores": {
            "LUMEN": 50, "AETHER": 55, "ORPHEUS": 60, "ORIN": 50,
            "LYRA": 45, "VARA": 85, "CHRONOS": 82, "KAEL": 25
        },
        "expected": "The Guardian"
    },
    {
        "name": "Strong Performer",
        "scores": {
            "LUMEN": 88, "AETHER": 50, "ORPHEUS": 55, "ORIN": 40,
            "LYRA": 45, "VARA": 52, "CHRONOS": 48, "KAEL": 75
        },
        "expected": "The Performer"
    },
]

def main():
    print("\n" + "=" * 70)
    print("ARCHETYPE MATCHING TEST SUITE")
    print("=" * 70)
    print(f"\nTotal archetypes defined: {len(ARCHETYPES)}")
    print(f"Fallback archetype: {BALANCED_ARCHETYPE.name}")
    
    print("\n" + "-" * 70)
    print("Testing individual profiles...")
    print("-" * 70)
    
    passed = 0
    failed = 0
    
    for i, profile in enumerate(test_profiles, 1):
        print(f"\n{i}. Testing: {profile['name']}")
        print(f"   Expected: {profile['expected']}")
        
        result = match_archetype(profile['scores'])
        print(f"   Got: {result.name}")
        
        if result.name == profile['expected']:
            print("   ✅ PASS")
            passed += 1
        else:
            print("   ❌ FAIL")
            failed += 1
    
    print("\n" + "=" * 70)
    print(f"RESULTS: {passed} passed, {failed} failed out of {len(test_profiles)} tests")
    print("=" * 70)
    
    if failed == 0:
        print("\n🎉 All tests passed!")
    else:
        print(f"\n⚠️  {failed} test(s) failed - review matching algorithm")

if __name__ == "__main__":
    main()
