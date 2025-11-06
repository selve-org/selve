# SELVE Template Writing Progress

**Goal:** Create 35 confrontational, LaHaye-style psychological templates (7 dimensions × 5 levels) that make users think "How did they KNOW?!"

**Status as of Session:** 3/7 dimensions complete (13 templates written)

**✅ CODE REFACTORED (Nov 4, 2025):** Templates now in per-dimension files at `/backend/app/narratives/dimensions/`

---

## Code Organization

**NEW STRUCTURE (✅ Completed):**
```
backend/app/narratives/dimensions/
├── base.py              # DimensionTemplate class
├── lumen.py             # LUMEN templates (3/5 complete)
├── aether.py            # AETHER templates (5/5 COMPLETE ✅)
├── orpheus.py           # ORPHEUS templates (0/5 - TODO)
├── orin.py              # ORIN templates (0/5 - TODO)
├── lyra.py              # LYRA templates (0/5 - TODO)
├── vara.py              # VARA templates (0/5 - TODO)
├── chronos.py           # CHRONOS templates (0/5 - TODO)
├── kael.py              # KAEL templates (0/5 - TODO)
└── __init__.py          # Aggregates into DIMENSION_TEMPLATES dict
```

**Benefits:**
- ✅ Easier parallel writing (one file per dimension)
- ✅ Smaller files, fewer merge conflicts
- ✅ Clear ownership per dimension
- ✅ Simpler testing (test one dimension at a time)
- ✅ Better git history and code review

**How to Add Templates:**
1. Open dimension file (e.g., `orin.py`)
2. Copy DimensionTemplate structure from `aether.py`
3. Write all 13 fields using LaHaye patterns (see LAHAYE_WRITING_PATTERNS.md)
4. Uncomment import in `dimensions/__init__.py`
5. Test with: `python -c "from app.narratives import DIMENSION_TEMPLATES; print(DIMENSION_TEMPLATES['ORIN'])"`

---

## ✅ COMPLETED TEMPLATES

### 1. LUMEN (Social Energy / Extraversion) - 3/5 levels ✅

- ✅ Very High: "The Radiant Socialite"
- ✅ High: "The Confident Connector"
- ✅ Moderate: "The Situational Socializer"
- ⏳ Low: Need to write
- ⏳ Very Low: Need to write

**Quality:** Excellent. Sets the standard. "No one can love you more nor forget you faster."

**File:** `/backend/app/narratives/dimensions/lumen.py`

### 2. AETHER (Emotional Stability / Honesty-Humility) - 5/5 levels ✅

- ✅ Very High: "The Unshakeable" - Calm in crisis, may seem cold
- ✅ High: "The Steady Rock" - Balanced resilience
- ✅ Moderate: "The Emotional Weather System" - Context-dependent (Chris's score: 50/100)
- ✅ Low: "The Live Wire" - Everything feels catastrophic
- ✅ Very Low: "The Emotional Supernova" - Consumed by overwhelm

**Quality:** Confrontational, specific, uncomfortable. Tested with Chris's actual score. "Your partner has learned to check the weather report before asking difficult questions."

**File:** `/backend/app/narratives/dimensions/aether.py`

---

## ⏳ REMAINING TEMPLATES (30 templates, 6 dimensions)

### 3. ORPHEUS/AMARA (Empathy) - 0/5 levels

- ⏳ Very High: "The Emotional Sponge" (?)
- ⏳ High: "The Natural Caregiver" (?)
- ⏳ Moderate: "The Selective Empath" (?)
- ⏳ Low: "The Logical Islander" (?)
- ⏳ Very Low: "The Emotional Fortress" (?)

**LaHaye Reference:** Sanguines feel others' pain genuinely but forget quickly. Cholerics "can cause pain to others and enjoy it." Phlegmatics are sympathetic but "seldom conveys true feelings."

**Key Patterns to Include:**

- How they respond when someone cries
- Whether they take on others' emotions
- Relationship toll of too much/too little empathy
- The "I told you so" temptation vs. genuine comfort

### 4. ORIN (Organization / Conscientiousness) - 0/5 levels

- ⏳ Very High: "The Control Perfectionist" (?)
- ⏳ High: "The Disciplined Achiever" (?)
- ⏳ Moderate: "The Situational Organizer" (?)
- ⏳ Low: "The Creative Chaos" (?)
- ⏳ Very Low: "The Disaster Zone" (?)

**LaHaye Reference:** Melancholies have "color-coded everything," work until they collapse. Sanguines have "disaster areas" for garages/offices, can't remember where they put contracts.

**Key Patterns to Include:**

- State of their desk/closet/car
- How they handle deadlines
- The typo at 3am that wakes them up
- "Paperwork is the bane of my life" vs. "I made a to-do list for my to-do lists"

### 5. LYRA (Creativity / Openness) - 0/5 levels

- ⏳ Very High: "The Idea Fountain" (?)
- ⏳ High: "The Curious Explorer" (?)
- ⏳ Moderate: "The Practical Dreamer" (?)
- ⏳ Low: "The Tried & True" (?)
- ⏳ Very Low: "The Concrete Thinker" (?)

**LaHaye Reference:** Melancholies are "genius-prone" with "emotional peaks that launch creative productions." Cholerics are practical and utilitarian. Phlegmatics stick with what works.

**Key Patterns to Include:**

- Eleven unfinished projects in the garage
- "Exploring possibilities" vs. "expensive hobbies"
- The 3am brainstorm that ruins sleep
- Comfort with ambiguity vs. need for clear answers

### 6. VARA (Honesty-Humility / Integrity) - 0/5 levels

- ⏳ Very High: "The Transparent Soul" (?)
- ⏳ High: "The Honest Broker" (?)
- ⏳ Moderate: "The Strategic Truth-Teller" (?)
- ⏳ Low: "The Flexible Ethicist" (?)
- ⏳ Very Low: "The Masterful Manipulator" (?)

**LaHaye Reference:** Sanguines "bend the truth until any similarity between his story and the facts is totally coincidental." Cholerics are "crafty if necessary to get his own way." Melancholies demand truth.

**Key Patterns to Include:**

- The "little white lie" comfort level
- Whether they keep others' secrets
- How they handle moral gray areas
- "The end justifies the means" vs. "I can't lie even to be polite"

### 7. SERA/CHRONOS (Patience / Agreeableness) - 0/5 levels

- ⏳ Very High: "The Infinite Calm" (?)
- ⏳ High: "The Patient Peacemaker" (?)
- ⏳ Moderate: "The Conditional Patience" (?)
- ⏳ Low: "The Impatient Driver" (?)
- ⏳ Very Low: "The Ticking Time Bomb" (?)

**LaHaye Reference:** Phlegmatics have "serene patience," will "drag their feet and not budge." Cholerics are "door slammers, table pounders, horn blowers."

**Key Patterns to Include:**

- Driving behavior (horn usage)
- How they handle slow people
- Forgiveness vs. grudge patterns
- "I haven't argued with anyone in five years but I've mentally written off seven people"

### 8. KAEL (Confidence / Assertiveness) - 0/5 levels

- ⏳ Very High: "The Unstoppable Force" (?)
- ⏳ High: "The Natural Leader" (?)
- ⏳ Moderate: "The Context-Dependent Assertor" (?)
- ⏳ Low: "The Reluctant Voice" (?)
- ⏳ Very Low: "The Invisible Presence" (?)

**LaHaye Reference:** Cholerics "walk over people and sleep soundly." Phlegmatics "reluctant leaders" who are capable when forced. Melancholies "rarely push forward to meet people."

**Key Patterns to Include:**

- How they enter rooms
- Whether they speak up in meetings
- "You get promoted; they get therapy"
- The fear of being "too much" vs. "if people don't like it, too bad"

---

## QUALITY STANDARDS (Based on AETHER Templates)

### ✅ EACH TEMPLATE MUST INCLUDE:

1. **Specific Behavioral Predictions**

   - Example: "You've rewritten the same email six times"
   - Not: "You care about communication"

2. **Uncomfortable Exposure**

   - Example: "No one can love you more nor forget you faster"
   - Not: "You sometimes forget people"

3. **Physical/Environmental Tells**

   - Example: "Your closet is organized by season, then color, then frequency"
   - Not: "You're organized"

4. **Relationship Impact**

   - Example: "Your partner has learned to check the weather report before asking difficult questions"
   - Not: "Your moods affect relationships"

5. **Vocational Patterns**

   - Example: "People three cubicles away know you've arrived"
   - Not: "You're energetic at work"

6. **Predictive Scenarios**

   - Example: "When stressed, you'll book three social events for tonight"
   - Not: "You handle stress in various ways"

7. **The Paradox**
   - Example: "You're the loudest person in the room and the most terrified someone will discover you're faking it"
   - Not: "You have some insecurities"

### ✅ GUT-PUNCH TEST:

Does the user think:

- "How did they KNOW?!" ✅
- "This is uncomfortably accurate" ✅
- "My spouse would nod reading this" ✅
- "I can see myself doing exactly this" ✅

If ANY answer is no → Rewrite with MORE specificity

---

## WRITING RESOURCES CREATED

1. **LAHAYE_WRITING_PATTERNS.md** - 7 core patterns extracted from Tim LaHaye's work
2. **BIG5_MBTI_NARRATIVE_ANALYSIS.md** - How competitors fail (and how we'll succeed)
3. **more-lahaye.md** - Additional LaHaye temperament descriptions (vocational, relationship patterns)
4. **lahaye-narrator.md** - Original LaHaye character descriptions

---

## NEXT STEPS

### Immediate (This Week):

1. ✅ Complete LUMEN templates (Low, Very Low) - 2 templates
2. Write ORIN templates (all 5 levels) - 5 templates
3. Write KAEL templates (all 5 levels) - 5 templates

**Rationale:** Chris scored highest on CHRONOS (81), moderate on ORIN (55) and KAEL (45). Writing these will give him comprehensive feedback on his top patterns.

### Short-term (Next 1-2 Weeks):

4. Write ORPHEUS/AMARA templates (all 5 levels) - 5 templates
5. Write LYRA templates (all 5 levels) - 5 templates
6. Write VARA templates (all 5 levels) - 5 templates
7. Write SERA/CHRONOS templates (all 5 levels) - 5 templates

### Quality Assurance:

- Test each dimension with actual user scores
- Verify "gut-punch factor" with Chris
- Have spouse/friends read and confirm accuracy
- Iterate based on feedback

---

## TECHNICAL STATUS

### ✅ Working:

- Template structure (DimensionTemplate class with 13 fields)
- Generator correctly maps scores to levels (75+=very_high, 60+=high, etc.)
- Templates load and display properly
- LUMEN templates (3/5) functional
- AETHER templates (5/5) functional and tested

### ⏳ Pending:

- Response pattern analysis (detects contradictions, response bias)
- Fix scorer to not fabricate scores for insufficient data
- Frontend fix verification (need fresh test session)

---

## ESTIMATED COMPLETION

- **Current Progress:** 13/35 templates (37%)
- **Templates Remaining:** 22 templates
- **At 2-3 templates/day:** 7-11 days
- **At 1 template/day:** 22 days
- **Realistic with iterations:** 2-3 weeks

**Goal:** Complete all 35 templates by mid-November, then comprehensive testing phase.

---

## MOTIVATIONAL REMINDER

**16Personalities makes you feel good.**
**LaHaye makes you feel seen.**
**SELVE makes you feel exposed - in the best way.**

We're not here to flatter. We're here to reveal.

Every template should make the user think: **"How did they KNOW?!"**

That's the standard. Don't settle for less.
