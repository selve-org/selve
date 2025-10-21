# 🚀 Quick Start Guide

## Prerequisites
- Database connection working (Neon PostgreSQL)
- Node.js and pnpm installed
- Project cloned and dependencies installed

## Step-by-Step Setup

### 1. Run Database Migration

\`\`\`bash
cd "c:\Users\Admin\OneDrive\Documents\Christopher-BYUI\Personal Projects\SELVE\selve"
npx prisma migrate dev --name add_questionnaire_system
\`\`\`

This will:
- Create all questionnaire tables
- Update the Prisma client
- Keep existing tables intact

### 2. Generate Prisma Client

\`\`\`bash
npx prisma generate
\`\`\`

This regenerates the TypeScript types for the database.

### 3. Install ts-node (for seeding)

\`\`\`bash
pnpm install -D ts-node
\`\`\`

### 4. Seed Sample Questions

\`\`\`bash
npx prisma db seed
\`\`\`

You should see:
\`\`\`
🌱 Starting seed...
✅ Created sections
✅ Created checkpoints
✅ Created questions

✨ Seed completed!
   - 3 sections
   - 2 checkpoints
   - 11 questions
\`\`\`

### 5. Start Development Server

\`\`\`bash
pnpm dev
\`\`\`

### 6. Test the Wizard

Open your browser and navigate to:
\`\`\`
http://localhost:3000/assessment/wizard
\`\`\`

You should see:
1. **Split screen** on desktop (canvas left, form right)
2. **First question** loads automatically
3. **Progress bar** at the top
4. **Next button** to proceed
5. **Checkpoint** after completing first section

## Troubleshooting

### Database Connection Issues

If you get "Can't reach database server":
- Check your `.env` file has correct `DATABASE_URL`
- Ensure Neon database is running
- Check network connection

### Migration Already Applied

If migration already exists:
\`\`\`bash
npx prisma migrate resolve --applied add_questionnaire_system
npx prisma generate
\`\`\`

### TypeScript Errors in API Routes

If you see Prisma type errors:
\`\`\`bash
npx prisma generate
\`\`\`

This regenerates the client with new models.

### Seed Already Applied

If you want to re-seed:
\`\`\`bash
npx prisma migrate reset
npx prisma db seed
\`\`\`

**Warning**: This deletes all data!

## Verify Installation

### Check Tables Exist

\`\`\`bash
npx prisma studio
\`\`\`

You should see:
- QuestionnaireQuestion
- QuestionnaireSession
- QuestionnaireAnswer
- QuestionnaireSection
- QuestionnaireCheckpoint

### Check Questions Loaded

In Prisma Studio:
1. Click "QuestionnaireQuestion"
2. Should see 11 questions
3. Click "QuestionnaireSection"
4. Should see 3 sections

### Test API Endpoints

**Create Session:**
\`\`\`bash
curl -X POST http://localhost:3000/api/questionnaire/sessions
\`\`\`

**Get Questions:**
\`\`\`bash
curl http://localhost:3000/api/questionnaire/questions
\`\`\`

## Common Issues

### 1. "Property 'questionnaireSession' does not exist"

**Solution**: Run `npx prisma generate`

### 2. "No questions found"

**Solution**: Run `npx prisma db seed`

### 3. Canvas not showing

**Solution**: 
- Canvas only shows on screens > 1024px
- Resize browser to desktop size
- Check browser console for errors

### 4. Images not loading in canvas

**Solution**:
- Images are in `/public/artistico/`
- Canvas shows pattern by default
- Images rotate in randomly

## Next Steps

1. ✅ Test the wizard flow
2. ✅ Add more questions via Prisma Studio or API
3. ✅ Customize styling if needed
4. ✅ Add remaining input components as needed
5. ✅ Integrate with your authentication system
6. ✅ Connect to profile generation backend

## Support

If you encounter any issues:
1. Check browser console for errors
2. Check terminal for server errors
3. Check Sentry for error logs
4. Review the WIZARD_README.md for detailed docs

---

**You're all set!** 🎉
