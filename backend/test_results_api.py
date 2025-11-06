"""
Test Results API with Integrated Narrative
"""
import requests
import json

BASE_URL = "http://localhost:8000"

# Test scores (same as our test)
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

def test_create_session_and_get_results():
    """Test creating a session and getting results with integrated narrative"""
    
    print("=" * 80)
    print("TESTING RESULTS API WITH INTEGRATED NARRATIVE")
    print("=" * 80)
    
    # 1. Start assessment
    print("\n1. Starting assessment...")
    response = requests.post(f"{BASE_URL}/api/assessment/start", json={
        "demographics": {
            "demo_name": "Chris",
            "demo_age": 30,
            "demo_gender": "male"
        }
    })
    
    if response.status_code != 200:
        print(f"❌ Failed to start assessment: {response.text}")
        return
    
    session_id = response.json()["session_id"]
    print(f"✅ Session created: {session_id}")
    
    # 2. Submit some answers (we'll submit answers for our test scores)
    print("\n2. Submitting answers...")
    
    # We need to get questions first and answer them
    # For now, let's just try to get results directly (it will fail, but shows the flow)
    
    print("\n3. Getting results...")
    response = requests.get(f"{BASE_URL}/api/assessment/{session_id}/results")
    
    if response.status_code == 200:
        data = response.json()
        
        print("\n✅ SUCCESS! Got integrated narrative")
        print(f"\nScores: {json.dumps(data['scores'], indent=2)}")
        print(f"\nProfile Pattern: {data['narrative']['profile_pattern']['pattern']}")
        print(f"\nCore Identity (first 200 chars):")
        print(data['narrative']['sections']['core_identity'][:200] + "...")
        
        if 'generation_cost' in data['narrative']:
            print(f"\n💰 Generation Cost: ${data['narrative']['generation_cost']:.4f}")
        
        if 'metadata' in data['narrative']:
            print(f"Model: {data['narrative']['metadata'].get('model', 'unknown')}")
            print(f"Method: {data['narrative']['metadata'].get('generation_method', 'unknown')}")
    
    else:
        print(f"❌ Failed to get results: {response.status_code}")
        print(response.text)


if __name__ == "__main__":
    try:
        test_create_session_and_get_results()
    except requests.exceptions.ConnectionError:
        print("\n❌ Could not connect to backend. Make sure it's running:")
        print("   cd /home/chris/selve/backend")
        print("   make dev")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
