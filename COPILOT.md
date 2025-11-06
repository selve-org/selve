# COPILOT.md - SELVE Development Journey

> **Purpose**: Single source of truth for project context, decisions, and next steps.  
> **Updated**: November 6, 2025  
> **Status**: Active Development - OpenAI Narrative Integration Complete

---

## 🎯 Project Overview

**SELVE** is a personality assessment platform using 8 custom dimensions (LUMEN, AETHER, ORPHEUS, ORIN, LYRA, VARA, CHRONOS, KAEL) based on Big-5/HEXACO research. The goal is to give users clear, honest, conversational personality feedback without psychometric jargon.

### Core Principles
1. **Conversational tone** - Talk like a real person, not a textbook
2. **No jargon** - Never mention dimension names (LUMEN, AETHER, etc.) in narratives
3. **Brutally honest** - Tim LaHaye confrontational style, but in everyday language
4. **Practical** - Tell people what matters for real life, not abstract concepts
5. **Integrated narrative** - One flowing story, not 8 separate dimension reports

---

## 🛠️ Technical Stack

### Backend
- **Framework**: FastAPI (Python 3.11)
- **Item Pool**: 1,247 psychometric questions
- **Scoring**: IRT-based adaptive testing
- **Narrative**: OpenAI GPT-5 Nano (with template fallback)
- **Key Files**:
  - `app/adaptive_testing.py` - Adaptive question selection
  - `app/scoring.py` - IRT scoring engine
  - `app/narratives/integrated_generator.py` - OpenAI narrative generation
  - `app/narratives/openai_generator.py` - GPT-5/GPT-4 API wrapper
  - `app/api/routes/assessment.py` - Results API with emergency recovery

### Frontend
- **Framework**: Next.js 14 (TypeScript)
- **Styling**: Tailwind CSS
- **Key Files**:
  - `src/app/(wizard)/results/[sessionId]/page.tsx` - Results display
  - `src/components/wizard/` - Assessment wizard components

---

## 📅 Journey Timeline

### Phase 1: Foundation (Early Development)
- Built adaptive testing engine with IRT
- Created 35 hand-written LaHaye-style dimension templates
- Implemented cultural context filtering (driving, credit cards, yards)

### Phase 2: Bug Fixes (Mid-Development)
- **KAEL=0 Bug**: Emergency recovery when context filters removed all questions for a dimension
  - Added `is_emergency_mode` flag to bypass filters
  - Ensures minimum 2 items per dimension before completing
  
### Phase 3: Narrative UX Problem (Recent)
- **User Feedback**: "Feels like talking to 8 different people"
- **Root Cause**: 8 separate dimension templates created disjointed experience
- **Solution**: Integrated narrative system with OpenAI

### Phase 4: OpenAI Integration (Current - Nov 6, 2025)
- **Problem**: Local Llama 3 8B took hours and never completed
- **Solution**: GPT-5 Nano (2-3 seconds, $0.002 per report)
- **Architecture**:
  - `OpenAIConfig` - Model-aware configuration (GPT-5 vs GPT-4 parameters)
  - `OpenAIGenerator` - Dual API support (Responses API vs Chat Completions)
  - `IntegratedNarrativeGenerator` - Orchestrates 7 sections
  - `NarrativePromptBuilder` - Builds conversational prompts

**7 Narrative Sections**:
1. Core Identity
2. Motivations
3. Conflicts
4. Strengths
5. Growth Areas
6. Relationships
7. Work Style

**Key Discovery**: GPT-5 models use different API:
- ✅ GPT-5: `/v1/responses` with `reasoning.effort` and `text.verbosity`
- ❌ GPT-5: Does NOT support `temperature`, `top_p`, `logprobs`
- ✅ GPT-4: `/v1/chat/completions` with traditional parameters

---

## ⚠️ Critical Notes & Gotchas

### 1. **Never Mention Dimension Names in Narratives**
❌ BAD: "Your LUMEN score is 50, which means..."  
✅ GOOD: "You're moderately social—not the life of the party, but not a loner either."

**Why**: Users don't care about internal variables. They want to know WHO THEY ARE.

### 2. **Keep Language Conversational**
❌ BAD: "Your propensity for abstract ideation..."  
✅ GOOD: "You like big ideas that aren't tied to real-world limits."

**Rule**: If you wouldn't say it to a friend at a coffee shop, don't write it.

### 3. **Emergency Recovery System**
- Context filtering can remove ALL questions for a dimension
- Emergency mode bypasses filters to force 2 minimum items
- Log shows: `🚨 EMERGENCY MODE: Bypassing cultural filters`
- This is EXPECTED behavior, not a bug

### 4. **OpenAI API Key Management**
- Must be in `/backend/.env` as `OPENAI_API_KEY=sk-...`
- Backend loads with `load_dotenv()` in `assessment.py`
- Falls back to templates if API fails (no user-facing error)

### 5. **Cost Tracking**
- GPT-5 Nano: $0.05 input / $0.40 output per 1M tokens
- Average report: ~$0.002 (0.2 cents)
- $5 budget = ~2,500 reports
- Cost returned in API response: `narrative.generation_cost`

### 6. **Sentry Errors** (Current Issue)
- Frontend shows: `Failed to proxy ... sentry.io EAI_AGAIN`
- **Cause**: Network/DNS issue with Sentry error tracking
- **Impact**: None - errors are cosmetic, app works fine
- **Fix**: Can be disabled in `next.config.ts` if annoying

### 7. **Webpack vs Turbopack Warning**
- Next.js warning about Webpack config with Turbopack
- **Impact**: None - just a compatibility heads-up
- **Fix**: Can be addressed by migrating config to Turbopack format

---

## 🚨 Current Issues to Fix

### Issue 1: Repetitive Opposite Questions
**Problem**: Questions like:
- Q2: "I am not interested in abstract ideas"
- Q15: "I am interested in abstract ideas"

**User Feedback**: "I get the idea, but change the wording"

**Fix Needed**:
1. Find all question pairs that are direct opposites
2. Rephrase second occurrence to be more nuanced:
   - ❌ "I am interested in abstract ideas"
   - ✅ "I'm drawn to ideas that are vague or only exist in theory"
3. Space them out (minimum 10-15 questions apart)
4. Use layman's language in rephrasing

**Files to Update**:
- `backend/data/selve_item_pool_expanded.json`
- Look for items with similar `text` content

### Issue 2: Results Page Formatting
**Problem**: "Looks like a newspaper" - too dense, needs better visual hierarchy

**Current Format**: Wall of text with minimal spacing

**Desired Format**:
- More whitespace between sections
- Better typography (larger headers, readable body text)
- Visual separation (cards, borders, backgrounds)
- Progressive disclosure (show summaries, expand for details)

**Files to Update**:
- `frontend/src/app/(wizard)/results/[sessionId]/page.tsx`

**Specific Improvements**:
1. Add more padding/margin between sections
2. Use accordion/collapsible sections for detailed content
3. Add visual icons/graphics
4. Improve mobile responsiveness
5. Add "Read More" buttons for long sections

### Issue 3: Dimension Name References in Narrative
**Problem**: Backend logs show prompts still reference dimension names

**Current**: Prompts say "Your ORPHEUS score..." or "LUMEN sits at..."

**Fix**: Update all prompts in `synthesizer.py` to:
1. Never mention dimension names
2. Use conversational descriptions instead
3. Focus on behaviors, not scores

---

## ✅ Recent Wins

1. **OpenAI Integration Complete** (Nov 6)
   - Backend API integrated
   - Frontend displays 7 sections
   - Cost tracking working
   - Fallback to templates functional

2. **Emergency Recovery System** (Nov 5)
   - Fixed KAEL=0 bug
   - Prevents premature completion
   - Bypasses filters when critical

3. **Conversational Tone Achieved**
   - System message updated: "Talk like a friend who tells you the truth"
   - Removed dramatic/literary language
   - Simplified complex sentences

---

## 📋 Next Steps (Priority Order)

### Immediate (This Session)
1. ✅ Create COPILOT.md (this file)
2. ⏳ Fix repetitive question pairs
3. ⏳ Remove dimension name references from prompts
4. ⏳ Improve results page formatting/spacing

### Short-term (Next 1-2 Sessions)
1. **Database Caching**
   - Cache generated narratives (avoid regeneration on refresh)
   - Store in database with session_id
   - Add cache invalidation logic

2. **Admin Dashboard**
   - Track API costs per day/week/month
   - Monitor generation failures
   - View average response quality metrics

3. **Question Pool Refinement**
   - Review all question pairs for opposites
   - Ensure cultural relevance
   - Add more scenario-based items

4. **Results Export**
   - PDF generation with proper formatting
   - Email delivery option
   - Social sharing (privacy-aware)

### Medium-term (Next Few Weeks)
1. **A/B Testing**
   - Compare OpenAI vs template satisfaction
   - Test different prompt styles
   - Measure completion rates

2. **Response Validation**
   - Detect random/inconsistent answers
   - Flag suspicious patterns
   - Adaptive question difficulty

3. **Multi-language Support**
   - Translate item pool
   - Generate narratives in user's language
   - Cultural adaptation of scenarios

### Long-term (Next Month+)
1. **Peer Assessment**
   - Friends rate each other
   - Compare self vs peer perceptions
   - Blind spot analysis

2. **Longitudinal Tracking**
   - Re-test after 3/6/12 months
   - Track personality changes
   - Growth visualization

3. **Integration Features**
   - Career recommendations
   - Relationship compatibility
   - Team dynamics analysis

---

## 🔑 Key Files Reference

### Backend Critical Files
```
backend/
├── .env                                    # OpenAI API key
├── app/
│   ├── adaptive_testing.py                 # Adaptive question selection
│   ├── scoring.py                          # IRT scoring
│   ├── response_validator.py              # Answer consistency checks
│   └── api/routes/assessment.py           # Results API + emergency recovery
│   └── narratives/
│       ├── integrated_generator.py         # Main narrative orchestrator
│       ├── openai_generator.py            # GPT-5/GPT-4 API wrapper
│       ├── openai_config.py               # Model configuration
│       ├── synthesizer.py                 # Prompt builder + personality analyzer
│       └── dimensions/                     # 35 LaHaye templates (fallback)
└── data/
    └── selve_item_pool_expanded.json      # 1,247 questions
```

### Frontend Critical Files
```
frontend/
└── src/
    └── app/
        └── (wizard)/
            ├── wizard/page.tsx             # Assessment wizard
            └── results/[sessionId]/
                └── page.tsx                # Results display
```

---

## 💡 Development Guidelines

### When Adding New Features
1. Always consider mobile UX first
2. Add proper error handling (log, don't crash)
3. Include fallback behavior
4. Test with edge cases (0 scores, max scores, missing data)
5. Update this COPILOT.md file

### When Modifying Narratives
1. Read it out loud - does it sound natural?
2. Remove any dimension names (LUMEN, AETHER, etc.)
3. Avoid abstract language
4. Be specific and practical
5. Use examples when possible

### When Debugging
1. Check backend logs for emergency mode triggers
2. Verify API key is loaded (`os.getenv('OPENAI_API_KEY')`)
3. Check generation_cost in response (0.0 = fallback mode)
4. Look for `metadata.generation_method` (openai vs template)

---

## 🤔 Open Questions

1. Should we show users their raw dimension scores?
   - Pro: Transparency
   - Con: Might focus on numbers vs narrative

2. How much should a single narrative cost?
   - Current: $0.002 (0.2 cents)
   - Target: < $0.01 per user

3. When should we invalidate cached narratives?
   - After user changes answers?
   - After X days?
   - Never (immutable)?

---

## 📚 Resources

- **OpenAI GPT-5 Docs**: https://platform.openai.com/docs/models/gpt-5-nano
- **GPT-5 Usage Guide**: https://platform.openai.com/docs/guides/latest-model
- **IRT Resources**: (add links as needed)
- **Big-5/HEXACO**: (add research papers)

---

## 🎓 Lessons Learned

1. **Local LLMs for production = bad idea**
   - Too slow (hours vs seconds)
   - Unpredictable quality
   - API services are cheap enough to justify

2. **Different model families = different APIs**
   - Can't assume all OpenAI models work the same
   - GPT-5 broke our GPT-4 code
   - Always check model-specific docs

3. **Template fallbacks are essential**
   - API can fail
   - Users should never see errors
   - Graceful degradation > perfection

4. **Context filtering needs emergency recovery**
   - Cultural relevance filtering can be too aggressive
   - Always ensure minimum data per dimension
   - Log when emergency mode triggers

5. **Conversational ≠ Casual**
   - Be direct and honest
   - Use everyday language
   - But stay professional

---

**End of COPILOT.md** | Updated: November 6, 2025
