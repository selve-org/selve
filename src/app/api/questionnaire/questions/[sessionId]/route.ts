// src/app/api/questionnaire/questions/[sessionId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import * as Sentry from "@sentry/nextjs";

/**
 * GET /api/questionnaire/questions/[sessionId]
 * Get next unanswered question for session (adaptive mode)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    // Get session with answers
    const session = await prisma.questionnaireSession.findUnique({
      where: { id: sessionId },
      include: {
        answers: true,
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    // Get all questions
    const allQuestions = await prisma.questionnaireQuestion.findMany({
      orderBy: { order: "asc" },
      include: {
        section: true,
      },
    });

    const totalQuestions = allQuestions.length;
    const answeredQuestionIds = session.answers.map((a) => a.questionId);

    // Find next unanswered question
    const nextQuestion = allQuestions.find(
      (q) => !answeredQuestionIds.includes(q.id)
    );

    // Calculate progress
    const progress = {
      current: answeredQuestionIds.length,
      total: totalQuestions,
      percentage: Math.round((answeredQuestionIds.length / totalQuestions) * 100),
    };

    // Check if completed
    if (!nextQuestion) {
      // Mark session as completed
      await prisma.questionnaireSession.update({
        where: { id: sessionId },
        data: {
          status: "completed",
          completedAt: new Date(),
        },
      });

      return NextResponse.json({
        done: true,
        progress,
      });
    }

    // Check for checkpoint at section boundary
    let checkpoint = null;
    if (nextQuestion.sectionId) {
      const checkpoints = await prisma.questionnaireCheckpoint.findMany({
        where: { sectionId: nextQuestion.sectionId },
        orderBy: { order: "asc" },
      });

      // Show checkpoint if it's the first question of the section
      const isFirstInSection = allQuestions.find(
        (q) => q.sectionId === nextQuestion.sectionId
      )?.id === nextQuestion.id;

      if (isFirstInSection && checkpoints.length > 0) {
        checkpoint = checkpoints[0];
      }
    }

    return NextResponse.json({
      question: nextQuestion,
      checkpoint,
      progress,
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error fetching next question:", error);
    return NextResponse.json(
      { error: "Failed to fetch question" },
      { status: 500 }
    );
  }
}
