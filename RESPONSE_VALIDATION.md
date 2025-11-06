# Response Validation & Consistency Tracking

## Overview

The assessment now tracks response consistency and attention patterns to ensure high-quality data and catch issues like random clicking or fatigue.

## Features Implemented

### 1. **Response Consistency Tracking**

The system monitors how consistently users answer similar questions:

**Question Clusters Tracked:**

- **Anger/Irritability**: "I get angry easily" vs "I am easily annoyed" vs "I get irritated easily"
  - Maximum 2 of these shown per assessment (never 3+)
  - Consistency score calculated if both answered
- **Extraversion**: "Life of the party" variations
- **Conscientiousness**: "Being prepared/organized" variations

**Consistency Scoring:**

- 100% = Perfectly consistent (0-1 point difference)
- 75% = Moderate consistency (1-2 point difference)
- 50% = Low consistency (2-3 point difference)
- 0% = Completely contradictory (4 point difference on 1-5 scale)

### 2. **Attention Pattern Detection**

Flags suspicious response patterns:

- **Straight-lining**: All responses the same value (e.g., all 3s)
- **High-frequency single value**: 90%+ responses are one number
- **Perfect zigzag**: Alternating extremes (1,5,1,5,1,5...)
- **Recent fatigue**: Last 10 responses all identical

### 3. **Smart Question Deduplication**

**Rules:**

1. **Never show 3+ identical questions** - Maximum 2 per cluster
2. **Prefer higher correlation items** - Use research-validated phrasing
3. **Block after 2 answered** - If 2 anger questions already answered, exclude remaining variants

**Example:**

- If user answered "I get angry easily" (APati7) and "I get irritated easily" (APati8)
- System automatically blocks "I am easily annoyed" (APati6) and duplicate "irritated" (N9)
- This prevents exhausting users with 3-4 nearly-identical questions

### 4. **Cultural Context Filtering**

**Demographic Context Questions:**

1. "Do you drive a car regularly?" → Excludes driving scenarios if No
2. "Do you use credit cards?" → Excludes credit rating scenarios if No
3. "Do you have a yard or garden?" → Excludes yard work scenarios if No

**Filtered Scenarios:**

- **Driving**: "You're a daring driver...", "When driving, you find yourself..."
- **Credit Cards**: "You pride yourself on having a triple 'A' credit rating..."
- **Yard Work**: "You start yard work with great enthusiasm..."

### 5. **Validation Logging**

**Every 10 Questions:**

```
🎯 Response Validation Check:
   Consistency Score: 85.5%
   Attention Score: 100.0%
   ✅ Gets angry/annoyed easily: 100% consistent
   ⚠️  Low consistency on similar questions
```

**Final Results:**

```
📊 Final Validation Results:
   Consistency: 85.5%
   Attention: 100.0%
   Flags: Minor variations on similar questions
```

### 6. **Results Page Display**

Users see their consistency report:

- ✅ "Highly consistent responses - you paid close attention!" (90%+)
- ⚠️ "Mostly consistent - minor variations on similar questions" (70-89%)
- ❌ "Inconsistent responses detected - results may be less accurate" (<70%)

## Technical Implementation

### Files Modified:

1. **`/backend/app/response_validator.py`** (NEW)

   - `ResponseValidator` class
   - `validate_responses()` - Main validation logic
   - `should_show_consistency_question()` - Smart injection after 15+ responses
   - `get_consistency_report()` - Human-readable summary

2. **`/backend/app/api/routes/assessment.py`**
   - Added 3 demographic context questions (drives, credit cards, yard)
   - Integrated `ResponseValidator` into sessions
   - Smart deduplication with 2-question-max rule
   - Context-aware filtering based on demographics
   - Validation logging every 10 questions
   - Consistency report in results endpoint

### Response Model Updated:

```python
class GetResultsResponse(BaseModel):
    session_id: str
    scores: Dict[str, float]
    narrative: Dict[str, Any]
    completed_at: str
    demographics: Optional[Dict[str, Any]] = None
    validation: Optional[Dict[str, Any]] = None  # NEW
```

## User Experience Improvements

### Before:

- ❌ Same 3-4 questions about anger/irritability
- ❌ Nigerian user gets credit card questions
- ❌ Non-driver gets multiple driving scenarios
- ❌ No way to detect random clicking
- ❌ No consistency checking

### After:

- ✅ Maximum 2 similar questions (intentional consistency check)
- ✅ Cultural context questions filter irrelevant scenarios
- ✅ Smart deduplication prevents exhaustion
- ✅ Active monitoring for attention patterns
- ✅ Consistency score shown in results
- ✅ Clear validation feedback

## Why 2 Similar Questions (Not 0 or 3+)?

### Why Not 0 (Eliminate All Duplicates)?

- **Consistency checking is valuable** - Detects random clickers
- **Emotional stability signal** - How much someone contradicts themselves
- **Research standard** - Most validated assessments use this

### Why Not 3+ Similar Questions?

- **User fatigue** - "Didn't I just answer this?"
- **Feels repetitive** - Damages trust in assessment quality
- **Diminishing returns** - 2 questions enough for consistency check

### The Sweet Spot: Exactly 2

- **One intentional consistency pair** per major trait cluster
- **Feels less repetitive** - Spaced apart in the flow
- **Still catches issues** - Can detect 4-point contradictions
- **Respects user time** - Not exhausting

## Example Flow

**Question 12:** "I get angry easily." → User answers 2 (Disagree)

_[25 other questions about different traits...]_

**Question 37:** "I get irritated easily." → User answers 2 (Disagree)

**System calculates:**

- Difference: 0 points
- Consistency: 100%
- ✅ User is paying attention and consistent

**System blocks:**

- "I am easily annoyed" (would be 3rd anger question)
- Never shows again for this user

## Testing Recommendations

1. **Take assessment honestly** - See your real consistency score
2. **Try random clicking** - System should detect and flag
3. **Answer from Nigeria** - Should NOT see credit card questions if you say you don't use them
4. **Answer as non-driver** - Should NOT see driving scenarios
5. **Watch logs** - See context filtering in action

## Future Enhancements

- [ ] Weight results by consistency score (low consistency = less confident results)
- [ ] Add more question clusters (social anxiety, work ethic, etc.)
- [ ] Adaptive consistency checking (show more pairs if user inconsistent)
- [ ] Country-specific exclusion rules (automatic based on country selected)
- [ ] Real-time consistency warning ("This contradicts your earlier answer - are you sure?")
