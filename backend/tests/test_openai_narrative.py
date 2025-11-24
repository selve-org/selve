"""
Test OpenAI Integrated Narrative Generation
"""
import sys
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

sys.path.insert(0, '/home/chris/selve/backend')

from app.narratives.integrated_generator import generate_integrated_narrative
from app.narratives.openai_config import OpenAIConfig
import json

# Your actual scores from the assessment
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

print("="*80)
print("OPENAI INTEGRATED NARRATIVE TEST")
print("="*80)

api_key = os.getenv('OPENAI_API_KEY')
model = os.getenv('OPENAI_MODEL', 'gpt-5-nano')

if not api_key or api_key == '<YOUR_API_KEY_HERE>':
    print("\n❌ ERROR: Set OPENAI_API_KEY in .env file")
    sys.exit(1)

print(f"\n✅ Model: {model}")
print(f"Scores: {test_scores}\n")

try:
    narrative = generate_integrated_narrative(test_scores, use_llm=True)
    
    print("\n✅ SUCCESS!\n")
    
    sections = [
        ('CORE IDENTITY', 'core_identity'),
        ('MOTIVATIONS', 'motivations'),
        ('CONFLICTS', 'conflicts'),
        ('STRENGTHS', 'strengths'),
        ('GROWTH AREAS', 'growth_areas'),
        ('RELATIONSHIPS', 'relationships'),
        ('WORK STYLE', 'work_style')
    ]
    
    for title, key in sections:
        if key in narrative['sections']:
            print("="*80)
            print(title)
            print("="*80)
            print(narrative['sections'][key])
            print()
    
    print(f"💰 Total Cost: ${narrative['generation_cost']:.4f}")
    
except Exception as e:
    print(f"\n❌ Error: {e}")
    import traceback
    traceback.print_exc()
