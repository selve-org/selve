# SELVE Narrative System

**Deep psychological narratives that reveal who users truly are.**

## Overview

The SELVE Narrative System transforms dimension scores into comprehensive psychological profiles. It goes beyond surface descriptions to reveal:

- **Core nature** - WHO they are at their essence
- **Inner world** - HOW they think internally
- **Motivations** - WHAT drives them
- **Fears** - WHAT they avoid
- **Strengths & Shadows** - Their gifts and blind spots
- **Contextual patterns** - How they show up in relationships, work, stress
- **Growth paths** - Where they're headed and how to get there

## Architecture

The system is modular and scalable:

```
app/narratives/
├── __init__.py              # Package exports
├── dimension_templates.py   # 40 psychological templates (3 complete, 37 planned)
├── archetypes.py           # 20 personality patterns (5 complete, 15 planned)
└── generator.py            # Core generation engine
```

### Design Philosophy

**Psychological Depth Over Generic Descriptions**

Each template reveals the person completely:

- Not just "you're social" but "You are ALIVE in the presence of others. Social connection is oxygen."
- Not just "strengths" but specific gifts: "Magnetic charisma that draws people in"
- Not just "challenges" but real fears: "Being alone, forgotten, or invisible"
- Growth that's actionable: "Learn to befriend solitude. Your depth exists - you just need quiet to hear it."

**Modular & Maintainable**

- Separation of concerns: templates, archetypes, generation logic
- Easy to add new templates or archetypes
- Each component independently testable
- No monolithic god files

## Components

### 1. Dimension Templates (`dimension_templates.py`)

Comprehensive psychological profiles for each dimension at all 5 levels.

**Template Structure:**

```python
DimensionTemplate(
    title="The Radiant Socialite",           # Profile name
    core_nature="You are ALIVE...",           # Their essence
    description="Your energy flows...",       # Detailed overview
    inner_world="Inside, you're thinking...", # Thought patterns
    motivations=[...],                        # What drives them (list)
    fears=[...],                              # What they avoid (list)
    strengths=[...],                          # Gifts (list)
    shadows=[...],                            # Blind spots (list)
    in_relationships="You need a partner...", # Relationship patterns
    at_work="You excel in roles...",          # Work behavior
    under_stress="You seek MORE people...",   # Stress responses
    at_best="When balanced, you're...",       # Optimal functioning
    growth_path="Learn to befriend..."        # Development guidance
)
```

**Current Status:**

- ✅ **LUMEN** (Social Energy): 3/5 levels complete

  - very_high: "The Radiant Socialite"
  - high: "The Confident Connector"
  - moderate: "The Situational Socializer"
  - ⏳ low: "The Selective Socializer" (planned)
  - ⏳ very_low: "The Solitary Soul" (planned)

- ⏳ **AETHER** (Honesty-Humility): 0/5 levels (planned)
- ⏳ **ORPHEUS** (Empathy): 0/5 levels (planned)
- ⏳ **ORIN** (Curiosity): 0/5 levels (planned)
- ⏳ **LYRA** (Creativity): 0/5 levels (planned)
- ⏳ **VARA** (Agreeableness): 0/5 levels (planned)
- ⏳ **CHRONOS** (Patience): 0/5 levels (planned)
- ⏳ **KAEL** (Confidence): 0/5 levels (planned)

**Total:** 3/40 templates complete

### 2. Archetypes (`archetypes.py`)

Rich personality patterns based on dimension combinations.

**Archetype Structure:**

```python
Archetype(
    name="The Luminary",
    essence="Radiant leader who illuminates and inspires",
    description="You are a natural beacon...",
    pattern={'LUMEN': 'very_high', 'VARA': 'high', 'AETHER': 'high'},
    core_traits=['Charismatic', 'Trustworthy', 'Inspiring', ...],
    strengths=[...],
    challenges=[...],
    life_purpose="To elevate humanity...",
    relationships="You attract admirers...",
    career_paths=['CEO/Founder', 'Inspirational Speaker', ...],
    famous_examples=['Nelson Mandela', 'Barack Obama', ...],
    growth_direction="Learn that darkness isn't enemy..."
)
```

**Current Archetypes:**

1. ✅ **The Luminary** - Charismatic ethical leader (high LUMEN + VARA + AETHER)
2. ✅ **The Healer** - Compassionate wounded healer (very_high ORPHEUS + CHRONOS, low AETHER)
3. ✅ **The Architect** - Systematic builder (very_high ORIN + high LYRA, low ORPHEUS)
4. ✅ **The Maverick** - Bold disruptor (very_high KAEL + LYRA, low ORIN + CHRONOS)
5. ✅ **The Sage** - Wise observer (very_high LYRA + high AETHER, low LUMEN)

**Planned:** 15 more archetypes to cover personality space comprehensively

### 3. Generator (`generator.py`)

Core engine that creates complete narratives.

**Key Classes:**

**`NarrativeGenerator`**

- Main generation engine
- Maps scores to templates
- Identifies best-fit archetype
- Assembles complete narrative

**`PersonalityNarrative`**

- Complete personality profile
- Includes archetype, dimensions, summary
- JSON-serializable for API delivery

**`DimensionNarrative`**

- Single dimension profile
- Includes all psychological depth fields

## Usage

### Basic Usage

```python
from app.narratives import generate_narrative

# User's dimension scores (0-100)
scores = {
    'LUMEN': 85,
    'AETHER': 72,
    'ORPHEUS': 68,
    'ORIN': 55,
    'LYRA': 62,
    'VARA': 78,
    'CHRONOS': 81,
    'KAEL': 45
}

# Generate complete narrative
narrative = generate_narrative(scores)

# Access components
print(narrative.archetype.name)  # "The Luminary"
print(narrative.summary)          # Executive summary
print(narrative.archetype.life_purpose)  # Life purpose

# Get dimension details
for dim_narrative in narrative.dimension_narratives:
    print(f"{dim_narrative.template.title}")
    print(f"Core Nature: {dim_narrative.template.core_nature}")
    print(f"Fears: {dim_narrative.template.fears}")
    # ... all 13 fields available

# Export to JSON for API
json_data = narrative.to_dict()
```

### Advanced Usage

```python
from app.narratives import NarrativeGenerator, match_archetype, get_all_archetypes

# Custom generator instance
generator = NarrativeGenerator()

# Generate single dimension narrative
lumen_narrative = generator.generate_dimension_narrative('LUMEN', 85)

# Direct archetype matching
archetype = match_archetype(scores)

# Get all available archetypes
all_archetypes = get_all_archetypes()
```

## API Integration

Perfect for FastAPI endpoints:

```python
from fastapi import FastAPI
from app.narratives import generate_narrative

app = FastAPI()

@app.post("/api/narrative")
async def create_narrative(scores: dict):
    """Generate personality narrative from scores."""
    narrative = generate_narrative(scores)
    return narrative.to_dict()
```

Returns comprehensive JSON:

```json
{
  "archetype": {
    "name": "The Luminary",
    "essence": "Radiant leader who illuminates...",
    "life_purpose": "To elevate humanity...",
    "strengths": [...],
    "career_paths": [...]
  },
  "dimensions": [
    {
      "dimension": "LUMEN",
      "score": 85,
      "title": "The Radiant Socialite",
      "core_nature": "You are ALIVE in the presence...",
      "motivations": [...],
      "fears": [...],
      "growth_path": "Learn to befriend solitude..."
    }
  ],
  "summary": "You are best described as **The Luminary**..."
}
```

## Testing

Comprehensive test suite: **13 tests, 100% passing**

```bash
cd backend
python -m pytest tests/test_narratives.py -v
```

**Test Coverage:**

- ✅ Score to level mapping
- ✅ Dimension narrative generation
- ✅ Complete narrative generation
- ✅ JSON serialization
- ✅ Archetype matching (3 patterns tested)
- ✅ Template completeness validation
- ✅ Psychological depth validation

## Current Status

### ✅ Complete & Working

- Modular package structure
- Core generation engine
- 3 psychologically rich LUMEN templates
- 5 comprehensive archetypes
- JSON export functionality
- Full test suite (13 tests passing)
- Integration with scoring system

### ⏳ In Progress

- **37 more dimension templates** needed (3/40 complete)
  - Each requires deep psychological content
  - 13 fields per template
  - Total: ~30,000 words of psychological insight
- **15 more archetypes** planned (5/20 complete)
  - Cover full personality space
  - Account for all dimension combinations

## Next Steps

### Option A: Batch Template Generation

Use LLM assistance to generate remaining 37 templates following established pattern:

1. Create prompt template with examples
2. Generate templates for each dimension × level
3. Review and integrate

### Option B: Progressive Expansion

1. Complete 2 templates per dimension (very_high + very_low) = 16 total
2. Test with users
3. Fill in middle levels based on feedback

### Option C: Test First, Then Scale

1. Use current system (3 templates, 5 archetypes)
2. Validate it meets "100% decipher" goal with users
3. Expand based on actual needs

## Design Principles

1. **Psychological Truth** - Reveal WHO they are, not just WHAT they do
2. **No Generic Fluff** - Every sentence must be specific, insightful, actionable
3. **Embrace Complexity** - People are paradoxes; show the nuance
4. **Compassionate Honesty** - Show shadows without shame, strengths without inflation
5. **Growth-Oriented** - Always include path forward, never just diagnosis

## Contributing

When adding templates or archetypes:

1. **Follow the structure** - Use all 13 fields for templates, all 11 for archetypes
2. **Write from inside** - Use "you" voice, as if speaking to them
3. **Be specific** - Avoid generic statements that could apply to anyone
4. **Include shadows** - Growth comes from seeing blind spots
5. **Make it actionable** - Growth paths should be concrete, not vague

## Example Output

See `generator.py` main block for full example output. Key excerpt:

```
You are best described as **The Luminary**. Radiant leader who illuminates
and inspires. Your personality is most defined by your social energy
(score: 85/100), patience (score: 81/100), and agreeableness (score: 78/100).

**Your Life Purpose:**
To elevate humanity - inspire people to their highest potential while
maintaining unwavering ethical standards. You're here to show that
leadership can be both powerful and principled.

**Core Nature:**
You are ALIVE in the presence of others. Social connection isn't just
enjoyable - it's oxygen to you...

**What You Fear:**
• Being alone, forgotten, or invisible
• Missing out on experiences (FOMO)
• Silence and its accompanying self-doubt

**Growth Path:**
Learn to befriend solitude. Your depth exists - you just need quiet to hear it.
```

## Integration Points

- ✅ **Scoring System** (`app/scoring.py`) - Receives dimension scores
- ✅ **Adaptive Testing** (`app/adaptive_testing.py`) - Gets scores from adaptive test
- ⏳ **API Endpoints** (planned) - Serves narratives to frontend
- ⏳ **Results Dashboard** (planned) - Displays narratives beautifully

---

**Built with the goal: "Decipher users from head to toe, back and forth 100%"**

The system doesn't just describe personality - it reveals who people truly are.
