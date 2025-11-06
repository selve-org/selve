# Back Navigation & Behavioral Tracking

## Overview

Users can now go back to review and edit their previous answers **within the current question batch**. This feature balances UX flexibility with test integrity, while also providing valuable personality insights through behavioral tracking.

## ✅ What's Implemented

### 1. **Back Navigation (Option A - Within Current Batch)**

**How It Works:**

- ✅ User can go back through questions **in current batch only**
- ✅ Once they hit "Continue" and get new questions, previous batch is **locked**
- ✅ Demographics always editable (they don't affect adaptive path)
- ⚠️ Warning shown: "Changing previous answers may affect your results accuracy and consistency score"

**Example Flow:**

```
Questions 1-3 (Batch 1):
✓ Q1: "I talk a lot" → Answer: 5
✓ Q2: "I keep quiet" → Answer: 2
✓ Q3: "I'm shy" → Answer: 3

[User clicks Back] ← Can review Q3, Q2, Q1
[User changes Q2 from 2 → 1]
[User clicks Continue] → Batch 1 LOCKED

Questions 4-6 (Batch 2):
◯ Q4: "I like parties"
[User clicks Back] ← Cannot go back to Q1-Q3 (locked)
```

### 2. **Comprehensive Behavior Tracking**

**What We Track:**

```python
{
    "back_navigation_count": 7,  # Total times user went back
    "back_navigation_log": [
        {
            "question_id": "E2",
            "from_value": 2,
            "to_value": 1,
            "timestamp": "2025-10-30T14:23:15"
        },
        # ... more changes
    ]
}
```

**Personality Insights from Back Behavior:**

| Back Count    | Interpretation                       | Likely Traits                                             |
| ------------- | ------------------------------------ | --------------------------------------------------------- |
| **0 times**   | Confident, decisive, impulsive       | Low Neuroticism, High Extraversion, Low Conscientiousness |
| **1-4 times** | Normal, thoughtful review            | Balanced profile                                          |
| **5-9 times** | Thoughtful, careful, uncertain       | Moderate Conscientiousness, Some Neuroticism              |
| **10+ times** | Perfectionistic, anxious, indecisive | High Neuroticism, High Conscientiousness, Perfectionism   |

**Additional Insights:**

- **Which questions triggered back?** → Emotional sensitivity points
- **How much did they change answers?** → Internal conflict level
- **Pattern of changes** → Response stability vs volatility

### 3. **Validation Integration**

**In Results:**

```json
{
  "validation": {
    "consistency_score": 85.5,
    "attention_score": 100.0,
    "back_navigation_count": 7,
    "back_navigation_analysis": "Moderate back-navigation (5-9 times) suggests thoughtful consideration or some uncertainty",
    "flags": []
  }
}
```

**Analysis Thresholds:**

- **High** (10+): "May indicate perfectionism, anxiety, or indecisiveness"
- **Moderate** (5-9): "Suggests thoughtful consideration or some uncertainty"
- **Low** (1-4): "Indicates confidence in responses"
- **Zero** (0): "High confidence or low reflection" (could be good or bad!)

## 🎯 Why This Approach?

### Benefits:

1. ✅ **User Satisfaction** - Feels natural, reduces test anxiety
2. ✅ **Test Integrity** - Locks previous batches (can't see future then change past)
3. ✅ **Personality Data** - Back behavior reveals traits we couldn't measure otherwise
4. ✅ **Consistency Checks** - Can detect when users contradict themselves after reflection
5. ✅ **Fair Warning** - Users know going back might affect accuracy

### Why NOT Full Back Navigation?

- ❌ **Adaptive contamination** - If you see Q10, go back and change Q3, Q4-Q9 might be "wrong" questions
- ❌ **Session complexity** - Would need to recalculate entire adaptive path
- ❌ **Clinical standards** - Most validated tests lock answers for good reason

## 🔧 Technical Implementation

### Backend Changes:

**New Session Fields:**

```python
{
    "current_batch": ["E1", "E2", "E3"],  # Current question batch
    "batch_history": [
        {"batch": ["E1", "E2", "E3"], "timestamp": "..."},
        {"batch": ["N1", "N2", "N3"], "timestamp": "..."}
    ],
    "back_navigation_count": 0,
    "back_navigation_log": []
}
```

**New Endpoints:**

1. **POST `/assessment/back`**

   - Request: `{session_id}`
   - Response: Previous question + current answer + warning
   - Returns error if trying to go back to locked batch

2. **POST `/assessment/answer` (Enhanced)**
   - New field: `is_going_back: bool`
   - Tracks if answer is being changed after back navigation
   - Logs old value → new value

**Response Updates:**

```python
SubmitAnswerResponse:
    can_go_back: bool  # Should back button be enabled?
```

### Frontend Integration Needed:

**1. Add Back Button Component:**

```tsx
<button onClick={handleBack} disabled={!canGoBack} className="back-button">
  ← Review Previous Answer
</button>
```

**2. Show Warning Modal:**

```tsx
{
  showBackWarning && (
    <Modal>
      ⚠️ Changing previous answers may affect: - Your consistency score -
      Results accuracy - Test validity Continue anyway? [Yes, Go Back] [Stay
      Here]
    </Modal>
  );
}
```

**3. Handle Back Response:**

```tsx
const handleBack = async () => {
  const response = await fetch("/api/assessment/back", {
    method: "POST",
    body: JSON.stringify({ session_id }),
  });

  const data = await response.json();

  if (data.can_go_back) {
    // Show previous question with current answer pre-filled
    setCurrentQuestion(data.question);
    setCurrentAnswer(data.current_answer);
    setIsEditingPrevious(true); // Flag for when they resubmit
  } else {
    // Show error: "Previous batch locked"
    alert(data.warning);
  }
};
```

**4. Submit with Flag:**

```tsx
const handleSubmit = async (answer) => {
  await fetch("/api/assessment/answer", {
    method: "POST",
    body: JSON.stringify({
      session_id,
      question_id,
      response: answer,
      is_going_back: isEditingPrevious, // Track if this is a back-edit
    }),
  });
};
```

## 📊 Results Display

**Show in Results Page:**

```tsx
<div className="validation-metrics">
  <h3>Assessment Validity</h3>

  <div className="metric">
    <span>Consistency Score</span>
    <strong>85.5%</strong> ✅ Highly consistent
  </div>

  <div className="metric">
    <span>Attention Score</span>
    <strong>100%</strong> ✅ Fully attentive
  </div>

  <div className="metric">
    <span>Answer Changes</span>
    <strong>7 edits</strong>
    <p className="analysis">
      Moderate back-navigation suggests thoughtful consideration or some
      uncertainty
    </p>
  </div>
</div>
```

## 🧠 Psychological Interpretation

### High Back Navigation (10+)

**Possible Traits:**

- **Conscientiousness** (High) - Detail-oriented, perfectionistic
- **Neuroticism** (High) - Anxious, second-guessing, insecure
- **Agreeableness** (Variable) - Wanting to present "correctly"
- **Openness** (Variable) - Overthinking nuance vs rigid thinking

**Clinical Considerations:**

- May indicate test-taking anxiety
- Could be OCD tendencies (need for perfection)
- Might be high social desirability bias

### Zero Back Navigation

**Possible Traits:**

- **Extraversion** (High) - Impulsive, spontaneous
- **Conscientiousness** (Low) - Not detail-oriented
- **Neuroticism** (Low) - Confident, secure
- **Agreeableness** (Low) - Don't care what others think

**Clinical Considerations:**

- Could be good (high confidence)
- Could be bad (not paying attention, random clicking)
- Need to check consistency scores to differentiate

### Optimal Range: 1-4 Changes

- Shows engaged, thoughtful responses
- Appropriate self-reflection
- Healthy balance of confidence and care

## 🔬 Research Questions

**Future Studies:**

1. Does back-navigation correlate with established Neuroticism scales?
2. Do people with clinical anxiety go back more?
3. Does time-to-answer + back-navigation predict Conscientiousness better?
4. Cultural differences in back-navigation behavior?

## 🚀 Future Enhancements

- [ ] **Time tracking** - How long before they go back? (Immediate vs delayed doubt)
- [ ] **Question-specific patterns** - Which questions trigger most backs?
- [ ] **Cluster analysis** - Group users by back-navigation patterns
- [ ] **Adaptive warning** - If user goes back 5+ times, show "Take your time" message
- [ ] **Smart locking** - Lock demographic section once personality starts
- [ ] **Undo button** - One-click undo instead of full back navigation
- [ ] **Review summary** - Before results, show "You changed 7 answers - review?"

## ⚠️ Important Notes

**Don't Over-Interpret:**

- Back navigation is **one data point** among many
- Always consider in context with consistency, attention, and dimension scores
- Cultural factors may affect behavior (some cultures emphasize carefulness)

**Test Integrity:**

- Once user sees batch N+1, batch N is **permanently locked**
- This prevents "seeing the pattern" and gaming the test
- Maintains clinical validity while improving UX

**User Communication:**

- Always show warning before allowing back navigation
- Be transparent about how it affects results
- Don't shame users for going back (it's valuable data!)
