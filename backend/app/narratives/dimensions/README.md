# SELVE Dimension Templates

This directory contains narrative templates for all 8 SELVE dimensions across 5 score levels each (35 templates total).

## Structure

Each dimension has its own file:

- `base.py` - DimensionTemplate class definition
- `lumen.py` - LUMEN (Social Energy) - 3/5 complete
- `aether.py` - AETHER (Emotional Stability) - **5/5 COMPLETE ✅**
- `orpheus.py` - ORPHEUS (Empathy) - 0/5 TODO
- `orin.py` - ORIN (Organization) - 0/5 TODO
- `lyra.py` - LYRA (Creativity) - 0/5 TODO
- `vara.py` - VARA (Honesty) - 0/5 TODO
- `chronos.py` - CHRONOS (Patience) - 0/5 TODO
- `kael.py` - KAEL (Assertiveness) - 0/5 TODO
- `__init__.py` - Aggregates all templates into DIMENSION_TEMPLATES dict

## Writing New Templates

### 1. Choose a dimension file

Open the relevant `.py` file (e.g., `orin.py` for Organization templates).

### 2. Use AETHER as reference

`aether.py` contains all 5 levels complete. Copy the structure.

### 3. Write using LaHaye patterns

See `/home/chris/selve/LAHAYE_WRITING_PATTERNS.md` for the 7 core patterns:

1. Specific behavioral predictions
2. Uncomfortable exposure
3. Predictive scenarios
4. Paradox reveals
5. Physical/environmental tells
6. Relationship impact
7. Vocational patterns

### 4. Fill all 13 fields

Each DimensionTemplate requires:

- `title` - 3-5 words, memorable archetype name
- `core_nature` - WHO they are, 2-3 sentences
- `description` - Expanded core nature, 3-4 sentences
- `inner_world` - Internal dialogue, what they think
- `motivations` - List of 4-6 drives
- `fears` - List of 4-6 fears
- `strengths` - List of 4-6 strengths
- `shadows` - List of 4-6 negative patterns
- `in_relationships` - How they show up with partners, specific predictions
- `at_work` - Vocational patterns, specific behaviors
- `under_stress` - What happens when overwhelmed
- `at_best` - When they're functioning optimally
- `growth_path` - What they need to develop

### 5. Quality standards

Every template must pass the "gut-punch test":

- ✅ "How did they KNOW?!" reaction
- ✅ Uncomfortably accurate predictions
- ✅ Spouse/friend would nod reading this
- ✅ Can see themselves doing these specific things

### 6. Add to package

After writing templates:

1. Uncomment the import in `__init__.py`
2. Add dimension to DIMENSION_TEMPLATES dict
3. Add template exports to **all** list

### 7. Test

```python
from app.narratives import DIMENSION_TEMPLATES, NarrativeGenerator

# Check templates loaded
print(DIMENSION_TEMPLATES['ORIN'].keys())  # Should show all 5 levels

# Generate narrative with test score
gen = NarrativeGenerator()
narrative = gen.generate_complete_narrative({'ORIN': 55})
print(narrative.dimension_narratives[0].template.title)
```

## Score-to-Level Mapping

- **75-100**: `very_high`
- **60-74**: `high`
- **40-59**: `moderate`
- **25-39**: `low`
- **0-24**: `very_low`

## Examples

### Good (from AETHER_LOW):

> "Your mind is a pinball machine and every thought is a ball ricocheting at high speed. You've cried in the bathroom more than once. Your partner loves you but is tired."

Specific, physical, uncomfortable, relationship impact. ✅

### Bad (generic Big5 style):

> "You may experience stress more intensely than others and can benefit from developing coping strategies."

Vague, therapeutic, no predictions, no specific behaviors. ❌

## Reference Documents

- `/home/chris/selve/LAHAYE_WRITING_PATTERNS.md` - LaHaye's 7 writing patterns
- `/home/chris/selve/BIG5_MBTI_NARRATIVE_ANALYSIS.md` - What competitors say vs. what we say
- `/home/chris/selve/TEMPLATE_WRITING_PROGRESS.md` - Overall progress tracking
- `/home/chris/selve/QUICK_START_NEXT_TEMPLATES.md` - Step-by-step guide

## Progress Tracking

**Total:** 13/35 templates complete (37%)
**Completed dimensions:** AETHER (5/5) ✅
**Partial dimensions:** LUMEN (3/5)
**Remaining:** 22 templates across 6 dimensions
