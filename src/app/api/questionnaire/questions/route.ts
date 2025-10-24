// src/app/api/questionnaire/questions/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import * as Sentry from "@sentry/nextjs";

/**
 * GET /api/questionnaire/questions
 * Get all questions (batch mode)
 */
export async function GET() {
  try {
    const questions = await prisma.questionnaireQuestion.findMany({
      orderBy: { order: "asc" },
      include: {
        section: true,
      },
    });

    const sections = await prisma.questionnaireSection.findMany({
      orderBy: { order: "asc" },
    });

    const checkpoints = await prisma.questionnaireCheckpoint.findMany({
      orderBy: { order: "asc" },
      include: {
        section: true,
      },
    });

    return NextResponse.json({
      questions,
      sections,
      checkpoints,
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}
