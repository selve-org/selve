// src/app/api/questionnaire/answers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import * as Sentry from "@sentry/nextjs";

/**
 * POST /api/questionnaire/answers
 * Submit an answer
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, questionId, answer } = body;

    if (!sessionId || !questionId) {
      return NextResponse.json(
        { error: "Session ID and Question ID are required" },
        { status: 400 }
      );
    }

    // Upsert answer (update if exists, create if not)
    const savedAnswer = await prisma.questionnaireAnswer.upsert({
      where: {
        sessionId_questionId: {
          sessionId,
          questionId,
        },
      },
      update: {
        answer,
        updatedAt: new Date(),
      },
      create: {
        sessionId,
        questionId,
        answer,
      },
    });

    // Update session currentStep
    const answerCount = await prisma.questionnaireAnswer.count({
      where: { sessionId },
    });

    await prisma.questionnaireSession.update({
      where: { id: sessionId },
      data: { currentStep: answerCount },
    });

    return NextResponse.json({
      success: true,
      answer: savedAnswer,
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error saving answer:", error);
    return NextResponse.json(
      { error: "Failed to save answer" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/questionnaire/answers?sessionId=xxx
 * Get all answers for a session
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const answers = await prisma.questionnaireAnswer.findMany({
      where: { sessionId },
      // TODO: RESTORE AFTER PHASE 2 - Re-enable when foreign key is restored
      // include: {
      //   question: true,
      // },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ answers });
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error fetching answers:", error);
    return NextResponse.json(
      { error: "Failed to fetch answers" },
      { status: 500 }
    );
  }
}
