# Temporary Changes for Placeholder Mode

This document tracks all temporary changes made to support placeholder questions from FastAPI backend during Phase 1-2 testing.

## Overview

During placeholder mode, the FastAPI backend sends questions that don't exist in the database yet. To prevent foreign key constraint errors, we've temporarily disabled some database constraints.

## Changes to Restore After Phase 2

### 1. Prisma Schema (`/frontend/prisma/schema.prisma`)

**Location:** `QuestionnaireAnswer` model

- **Changed:** Removed foreign key relation to `QuestionnaireQuestion`
- **Reason:** Placeholder questions from backend don't exist in DB → P2003 error
- **Restore:** Uncomment the line:
  ```prisma
  question   QuestionnaireQuestion @relation(fields: [questionId], references: [id])
  ```

**Location:** `QuestionnaireQuestion` model

- **Changed:** Removed reverse relation `answers` field
- **Reason:** Required because we removed the foreign key above
- **Restore:** Uncomment the line:
  ```prisma
  answers      QuestionnaireAnswer[]
  ```

### 2. Answer API Route (`/frontend/src/app/api/questionnaire/answers/route.ts`)

**Location:** GET endpoint, line ~70

- **Changed:** Removed `include: { question: true }` from Prisma query
- **Reason:** Can't include question relation since foreign key is removed
- **Restore:** Uncomment the include block:
  ```typescript
  include: {
    question: true,
  },
  ```

### 3. TypeScript Types (`/frontend/src/types/questionnaire.ts`)

**Location:** `QuestionnaireQuestion` interface

- **Changed:** Made `renderConfig` and `isRequired` optional
- **Reason:** Backend placeholder questions don't send full `renderConfig` object
- **Consideration:** May want to keep these optional for flexibility, or enforce strict types

## Search Pattern to Find All Changes

```bash
# Find all TODO comments related to Phase 2 restoration
grep -r "TODO: RESTORE AFTER PHASE 2" frontend/
```

## When to Restore

**Phase 2:** After creating and seeding real questions in the database

- Create seed script with demographic + psychological questions
- Run seed to populate `QuestionnaireQuestion` table
- Update FastAPI backend to query questions from DB instead of using placeholders
- Restore all commented relations above
- Run `pnpm prisma db push` to apply schema changes
- Regenerate Prisma client: `pnpm prisma generate`

## Testing After Restoration

1. Verify foreign key constraint works: Try to create answer with non-existent questionId → should fail
2. Verify relations work: GET /api/questionnaire/answers should include question data
3. End-to-end test: Complete full questionnaire flow with real DB questions
