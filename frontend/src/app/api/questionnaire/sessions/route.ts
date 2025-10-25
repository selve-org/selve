// src/app/api/questionnaire/sessions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import * as Sentry from "@sentry/nextjs";

/**
 * POST /api/questionnaire/sessions
 * Create a new questionnaire session
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, metadata } = body;

    const session = await prisma.questionnaireSession.create({
      data: {
        userId,
        metadata,
        status: "in-progress",
        currentStep: 0,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      session,
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/questionnaire/sessions?sessionId=xxx
 * Get session details
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

    const session = await prisma.questionnaireSession.findUnique({
      where: { id: sessionId },
      include: {
        questionnaireAnswers: {
          include: {
            question: true,
          },
        },
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ session });
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error fetching session:", error);
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/questionnaire/sessions
 * Update session status or progress
 */
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, status, currentStep, metadata } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (currentStep !== undefined) updateData.currentStep = currentStep;
    if (metadata) updateData.metadata = metadata;
    if (status === "completed") updateData.completedAt = new Date();

    const session = await prisma.questionnaireSession.update({
      where: { id: sessionId },
      data: updateData,
    });

    return NextResponse.json({ session });
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error updating session:", error);
    return NextResponse.json(
      { error: "Failed to update session" },
      { status: 500 }
    );
  }
}
