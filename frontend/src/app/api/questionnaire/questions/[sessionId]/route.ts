// src/app/api/questionnaire/questions/[sessionId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

const FASTAPI_URL = process.env.FASTAPI_URL || "http://localhost:8000";

/**
 * GET /api/questionnaire/questions/[sessionId]
 * Get next question from FastAPI backend (adaptive mode)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    // Call FastAPI backend for next question
    const response = await fetch(
      `${FASTAPI_URL}/api/next-question?sessionId=${sessionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(10000), // 10 second timeout
      }
    );

    if (!response.ok) {
      throw new Error(`FastAPI returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Transform FastAPI response to match frontend expectations
    // FastAPI returns: { id, text, type, options?, questionType, metadata?, placeholder?, required? }
    // Frontend expects: { question, checkpoint?, progress }
    
    // Map backend type to frontend QuestionInputType
    const mapType = (backendType: string): string => {
      const typeMap: Record<string, string> = {
        'text': 'text-input',
        'email': 'email-input',
        'phone': 'phone-input',
        'date': 'date-input',
        'time': 'time-input',
        'datetime': 'datetime-input',
        'number': 'number-input',
        'scale': 'scale-slider',
        'pill': 'pill-select',
      };
      return typeMap[backendType] || backendType;
    };
    
    return NextResponse.json({
      question: {
        id: data.id,
        text: data.text,
        type: mapType(data.type),
        description: data.description || undefined,
        isRequired: data.required || false,
        order: data.order || 0,
        renderConfig: {
          placeholder: data.placeholder || undefined,
          options: data.options || undefined,
          tooltip: data.tooltip || undefined,
        },
      },
      checkpoint: null, // TODO: Add checkpoint support in Phase 2
      progress: {
        current: 0, // TODO: Track in backend
        total: 10, // TODO: Get from backend
        percentage: 0,
      },
    });
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error fetching next question from FastAPI:", error);

    // Fallback: Return error response
    return NextResponse.json(
      { 
        error: "Failed to fetch question from backend",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
