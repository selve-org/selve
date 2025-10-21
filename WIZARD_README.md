# Questionnaire Wizard System

A comprehensive, production-ready questionnaire/wizard system for the SELVE psychological profiling application.

## 🎯 Overview

This wizard system provides a flexible, adaptive questionnaire interface with:

- **Split-screen layout**: Artistic canvas (left) + Question form (right)
- **Adaptive mode**: Backend controls question flow and branching
- **Batch mode**: All questions loaded at once (optional)
- **Dynamic rendering**: Backend instructs frontend how to render each question
- **Beautiful UI**: Smooth animations, progress tracking, and checkpoints
- **Fully responsive**: Mobile-first design with tablet/desktop optimization
- **Type-safe**: Complete TypeScript coverage
- **Production-ready**: Error handling, validation, and Sentry integration

## 📁 Structure

```
src/
├── types/
│   └── questionnaire.ts          # Complete type definitions
├── components/
│   └── wizard/
│       ├── ArtisticCanvas.tsx    # Left side artistic background
│       ├── QuestionRenderer.tsx   # Dynamic question renderer
│       ├── ProgressBar.tsx        # Progress indicator
│       ├── Checkpoint.tsx         # Milestone celebrations
│       └── inputs/
│           ├── PillSelect.tsx     # Pill-shaped option buttons
│           ├── TextInput.tsx      # Text input field
│           ├── Textarea.tsx       # Multi-line text input
│           ├── DateInput.tsx      # Date picker
│           ├── ScaleSlider.tsx    # Numeric scale/slider
│           └── index.ts           # Input component exports
├── hooks/
│   └── useQuestionnaire.ts       # Main wizard state management
├── app/
│   ├── (wizard)/
│   │   └── assessment/
│   │       └── wizard/
│   │           ├── page.tsx       # Main wizard page
│   │           └── layout.tsx     # Wizard layout (no header/footer)
│   └── api/
│       └── questionnaire/
│           ├── sessions/
│           │   └── route.ts       # Session management API
│           ├── questions/
│           │   ├── route.ts       # Batch mode - all questions
│           │   └── [sessionId]/
│           │       └── route.ts   # Adaptive mode - next question
│           └── answers/
│               └── route.ts       # Answer submission API
└── prisma/
    ├── schema.prisma              # Database models
    └── seed.ts                    # Sample questions for testing
```

## 🚀 Setup & Installation

### 1. Database Migration

The questionnaire system has been added to the Prisma schema. Run the migration when your database is accessible:

\`\`\`bash
npx prisma migrate dev --name add_questionnaire_system
\`\`\`

### 2. Generate Prisma Client

\`\`\`bash
npx prisma generate
\`\`\`

### 3. Seed Sample Data

Install ts-node first (if not already installed):

\`\`\`bash
pnpm install -D ts-node
\`\`\`

Then seed the database with sample questions:

\`\`\`bash
npx prisma db seed
\`\`\`

This creates:
- 3 sections (Personal Information, Behavioral Patterns, Social Preferences)
- 2 checkpoints
- 11 sample questions with various input types

### 4. Start Development Server

\`\`\`bash
pnpm dev
\`\`\`

Visit: `http://localhost:3000/assessment/wizard`

## 🎨 Features

### Artistic Canvas

- **Automatic rotation**: Changes every random <60 seconds
- **Pattern generation**: Gradients, geometric, abstract, waves, particles
- **Image display**: Rotates through `/public/artistico/` images
- **Fallback handling**: Pattern shows if image fails to load
- **100vh height**: Non-scrollable, always fills viewport
- **Responsive**: Hidden on mobile/tablet, visible on desktop

### Question Types

The system supports multiple input types (backend instructs frontend):

- ✅ `pill-select` - Pill-shaped buttons (single or multiple)
- ✅ `text-input` - Standard text input
- ✅ `textarea` - Multi-line text
- ✅ `date-input` - Date picker
- ✅ `scale-slider` - Numeric scale (e.g., 1-10)
- 🚧 `number-input` - Numeric input
- 🚧 `email-input` - Email validation
- 🚧 `phone-input` - Phone number
- 🚧 `checkbox` - Checkboxes
- 🚧 `radio` - Radio buttons
- 🚧 `dropdown` - Select dropdown
- 🚧 `rating` - Star/emoji rating
- 🚧 `toggle` - Toggle switch
- 🚧 `file-upload` - File upload

✅ = Implemented | 🚧 = TODO (easy to add)

### Backend-Frontend Communication

The backend acts as the "customer" and the frontend as the "waiter":

**Backend sends:**
\`\`\`json
{
  "id": "q1",
  "text": "How do you handle stress?",
  "type": "pill-select",
  "renderConfig": {
    "options": [
      { "label": "Stay calm", "value": "calm" },
      { "label": "Get anxious", "value": "anxious" }
    ],
    "style": {
      "layout": "vertical",
      "spacing": "normal"
    }
  },
  "isRequired": true
}
\`\`\`

**Frontend renders:**
- Interprets the `type` and `renderConfig`
- Selects appropriate input component
- Applies styling and layout instructions
- Validates based on `isRequired` and validation rules

### Progress Tracking

- Visual progress bar with percentage
- "Question X of Y" indicator
- Smooth animations on progress updates
- Shimmer effect for visual appeal

### Checkpoints

- Milestone celebrations between sections
- Configurable title, description, and icon
- "Continue" or "Skip" options
- Tree visualization (as per Figma design)

### Validation

- Required field validation
- Min/max length checks
- Pattern matching (regex)
- Email validation
- Custom validators (extensible)
- Real-time error messages

## 📡 API Endpoints

### Create Session
\`\`\`
POST /api/questionnaire/sessions
Body: { userId?: string, metadata?: object }
Response: { sessionId: string, session: QuestionnaireSession }
\`\`\`

### Get Next Question (Adaptive)
\`\`\`
GET /api/questionnaire/questions/[sessionId]
Response: {
  question?: QuestionnaireQuestion,
  checkpoint?: QuestionnaireCheckpoint,
  done?: boolean,
  progress: { current: number, total: number, percentage: number }
}
\`\`\`

### Get All Questions (Batch)
\`\`\`
GET /api/questionnaire/questions
Response: {
  questions: QuestionnaireQuestion[],
  sections: QuestionnaireSection[],
  checkpoints: QuestionnaireCheckpoint[]
}
\`\`\`

### Submit Answer
\`\`\`
POST /api/questionnaire/answers
Body: { sessionId: string, questionId: string, answer: any }
Response: { success: boolean, answer: QuestionnaireAnswer }
\`\`\`

### Get Session
\`\`\`
GET /api/questionnaire/sessions?sessionId=xxx
Response: { session: QuestionnaireSession }
\`\`\`

### Update Session
\`\`\`
PATCH /api/questionnaire/sessions
Body: { sessionId: string, status?: string, currentStep?: number }
Response: { session: QuestionnaireSession }
\`\`\`

## 🎯 Usage Example

### Basic Usage

The wizard is already integrated in `/assessment/wizard`. Just navigate to the route and it works!

### Custom Question

To add a new question via the backend:

\`\`\`typescript
await prisma.questionnaireQuestion.create({
  data: {
    text: "What's your favorite color?",
    type: "pill-select",
    renderConfig: {
      options: [
        { label: "Red", value: "red" },
        { label: "Blue", value: "blue" },
        { label: "Green", value: "green" }
      ],
      style: {
        layout: "horizontal",
        spacing: "normal"
      }
    },
    order: 1,
    isRequired: true
  }
});
\`\`\`

The frontend will automatically render it correctly!

## 🔄 Adaptive vs Batch Mode

### Adaptive Mode (Default)
- Questions fetched one at a time
- Backend decides next question based on answers
- Supports conditional logic and branching
- Better for complex, personalized flows

### Batch Mode
- All questions loaded at once
- User can navigate freely
- Faster initial load
- Better for simple, linear questionnaires

## 📱 Responsive Design

- **Mobile (< 768px)**: Form only, no canvas
- **Tablet (768px - 1024px)**: Form only, no canvas
- **Desktop (> 1024px)**: Split screen (canvas + form)

## 🚧 TODO / Future Enhancements

- [ ] Add remaining input components (checkbox, radio, dropdown, etc.)
- [ ] Implement "Go Back" functionality
- [ ] Add question navigation history
- [ ] Support for conditional question rendering
- [ ] Multi-language support
- [ ] Auto-save drafts
- [ ] Authentication integration (Clerk)
- [ ] Export answers as PDF
- [ ] Analytics tracking (PostHog events)
- [ ] A/B testing for question variations
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)

## 🤝 Contributing

When adding new input types:

1. Create component in `src/components/wizard/inputs/`
2. Export from `src/components/wizard/inputs/index.ts`
3. Add type to `QuestionInputType` in `src/types/questionnaire.ts`
4. Update `QuestionRenderer.tsx` to handle the new type
5. Test with sample question

## 📝 Notes

- All components are client-side (`"use client"`) for interactivity
- Uses Framer Motion for smooth animations
- Integrates with Sentry for error tracking
- Follows existing codebase patterns and styling
- DRY principles applied throughout
- Fully typed with TypeScript
- Production-ready with proper error handling

## 🎉 Credits

Built with ❤️ for SELVE - Discover your true self like never before.
