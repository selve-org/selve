// prisma/seed.ts
/**
 * Prisma Seed File
 * 
 * Seeds the database with sample questionnaire data for testing
 * Run with: npx prisma db seed
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create sections
  const personalInfoSection = await prisma.questionnaireSection.create({
    data: {
      title: "Personal Information",
      description: "Let's start with some basic information about you",
      order: 1,
    },
  });

  const behaviorSection = await prisma.questionnaireSection.create({
    data: {
      title: "Behavioral Patterns",
      description: "Help us understand your typical behaviors and responses",
      order: 2,
    },
  });

  const socialSection = await prisma.questionnaireSection.create({
    data: {
      title: "Social Preferences",
      description: "Tell us about your social interactions and preferences",
      order: 3,
    },
  });

  console.log("✅ Created sections");

  // Create checkpoint for first section
  await prisma.questionnaireCheckpoint.create({
    data: {
      sectionId: personalInfoSection.id,
      title: "Getting Started",
      description: "Let's begin your psychological profile assessment",
      order: 1,
      iconType: "start",
    },
  });

  await prisma.questionnaireCheckpoint.create({
    data: {
      sectionId: behaviorSection.id,
      title: "Great Progress!",
      description: "You've completed the personal information section. Now let's explore your behavioral patterns.",
      order: 2,
      iconType: "progress",
    },
  });

  console.log("✅ Created checkpoints");

  // Create questions for Personal Information section
  await prisma.questionnaireQuestion.createMany({
    data: [
      {
        text: "What is your first name?",
        description: "This helps us personalize your experience",
        type: "text-input",
        renderConfig: {
          placeholder: "Enter your first name",
          maxLength: 50,
          style: {
            size: "lg",
          },
          helpText: "We'll use this to address you throughout the assessment",
        },
        order: 1,
        isRequired: true,
        sectionId: personalInfoSection.id,
      },
      {
        text: "What is your date of birth?",
        description: "This helps us provide age-appropriate insights",
        type: "date-input",
        renderConfig: {
          style: {
            size: "md",
          },
          helpText: "Your information is private and secure",
        },
        order: 2,
        isRequired: true,
        sectionId: personalInfoSection.id,
      },
      {
        text: "What is your gender?",
        type: "pill-select",
        renderConfig: {
          options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Non-binary", value: "non-binary" },
            { label: "Prefer not to say", value: "prefer-not-to-say" },
          ],
          style: {
            layout: "horizontal",
            spacing: "normal",
          },
        },
        order: 3,
        isRequired: true,
        sectionId: personalInfoSection.id,
      },
      {
        text: "What are your main interests?",
        description: "Select all that apply",
        type: "pill-select",
        renderConfig: {
          options: [
            { label: "Art", value: "art" },
            { label: "Music", value: "music" },
            { label: "Sports", value: "sports" },
            { label: "Technology", value: "technology" },
            { label: "Reading", value: "reading" },
            { label: "Travel", value: "travel" },
            { label: "Cooking", value: "cooking" },
            { label: "Gaming", value: "gaming" },
          ],
          multiple: true,
          style: {
            layout: "grid",
            gridColumns: 3,
            spacing: "normal",
          },
          helpText: "This helps us understand your personality better",
        },
        order: 4,
        isRequired: false,
        sectionId: personalInfoSection.id,
      },
    ],
  });

  // Create questions for Behavioral Patterns section
  await prisma.questionnaireQuestion.createMany({
    data: [
      {
        text: "How do you typically handle stress?",
        type: "pill-select",
        renderConfig: {
          options: [
            { label: "Stay calm and think through it", value: "calm" },
            { label: "Talk to someone about it", value: "talk" },
            { label: "Take action immediately", value: "action" },
            { label: "Need time alone to process", value: "alone" },
            { label: "Get anxious and worried", value: "anxious" },
          ],
          style: {
            layout: "vertical",
            spacing: "relaxed",
          },
        },
        order: 5,
        isRequired: true,
        sectionId: behaviorSection.id,
      },
      {
        text: "On a scale of 1-10, how organized are you?",
        description: "1 = Very disorganized, 10 = Extremely organized",
        type: "scale-slider",
        renderConfig: {
          min: 1,
          max: 10,
          step: 1,
          showValue: true,
          labels: {
            1: "Messy",
            5: "Moderate",
            10: "Perfectionist",
          },
          helpText: "Think about your daily routines and living space",
        },
        order: 6,
        isRequired: true,
        sectionId: behaviorSection.id,
      },
      {
        text: "How do you make important decisions?",
        type: "pill-select",
        renderConfig: {
          options: [
            { label: "Logic and analysis", value: "logical" },
            { label: "Gut feeling", value: "intuition" },
            { label: "Ask others for advice", value: "advice" },
            { label: "Mix of logic and emotion", value: "balanced" },
            { label: "Avoid deciding", value: "avoid" },
          ],
          style: {
            layout: "vertical",
            spacing: "normal",
          },
        },
        order: 7,
        isRequired: true,
        sectionId: behaviorSection.id,
      },
      {
        text: "Describe a recent challenge you faced and how you handled it",
        description: "This helps us understand your problem-solving approach",
        type: "textarea",
        renderConfig: {
          placeholder: "Share your experience...",
          rows: 5,
          maxLength: 500,
          style: {
            size: "md",
          },
          helpText: "Be honest and specific. There are no wrong answers.",
        },
        order: 8,
        isRequired: false,
        sectionId: behaviorSection.id,
      },
    ],
  });

  // Create questions for Social Preferences section
  await prisma.questionnaireQuestion.createMany({
    data: [
      {
        text: "How do you prefer to spend your free time?",
        type: "pill-select",
        renderConfig: {
          options: [
            { label: "With large groups", value: "large-groups" },
            { label: "With close friends", value: "close-friends" },
            { label: "One-on-one", value: "one-on-one" },
            { label: "Alone", value: "alone" },
            { label: "Mix of social and alone time", value: "mixed" },
          ],
          style: {
            layout: "vertical",
            spacing: "normal",
          },
        },
        order: 9,
        isRequired: true,
        sectionId: socialSection.id,
      },
      {
        text: "Rate your comfort level with public speaking",
        description: "1 = Very uncomfortable, 10 = Love it",
        type: "scale-slider",
        renderConfig: {
          min: 1,
          max: 10,
          step: 1,
          showValue: true,
          labels: {
            1: "Terrified",
            10: "Confident",
          },
        },
        order: 10,
        isRequired: true,
        sectionId: socialSection.id,
      },
      {
        text: "Do you prefer working alone or in a team?",
        type: "pill-select",
        renderConfig: {
          options: [
            { label: "Strongly prefer alone", value: "strongly-alone" },
            { label: "Prefer alone", value: "prefer-alone" },
            { label: "No preference", value: "neutral" },
            { label: "Prefer team", value: "prefer-team" },
            { label: "Strongly prefer team", value: "strongly-team" },
          ],
          style: {
            layout: "horizontal",
            spacing: "tight",
          },
        },
        order: 11,
        isRequired: true,
        sectionId: socialSection.id,
      },
    ],
  });

  console.log("✅ Created questions");

  const questionCount = await prisma.questionnaireQuestion.count();
  const sectionCount = await prisma.questionnaireSection.count();
  const checkpointCount = await prisma.questionnaireCheckpoint.count();

  console.log(`\n✨ Seed completed!`);
  console.log(`   - ${sectionCount} sections`);
  console.log(`   - ${checkpointCount} checkpoints`);
  console.log(`   - ${questionCount} questions`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
