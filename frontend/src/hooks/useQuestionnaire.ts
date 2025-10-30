// src/hooks/useQuestionnaire.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import * as Sentry from "@sentry/nextjs";
import type {
  QuestionnaireSession,
  QuestionnaireQuestion,
  QuestionnaireCheckpoint,
  WizardState,
} from "@/types/questionnaire";

// API base URL - defaults to localhost for development
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * useQuestionnaire Hook
 * 
 * Manages the complete questionnaire state including:
 * - Session creation and management via SELVE backend
 * - Adaptive question fetching
 * - Answer submission
 * - Progress tracking
 * - Automatic completion and redirect to results
 * 
 * Connected to SELVE Backend API:
 * - POST /api/assessment/start - Initialize session
 * - POST /api/assessment/answer - Submit answers
 * - Adaptive testing automatically selects next questions
 */
export function useQuestionnaire() {
  const [state, setState] = useState<WizardState>({
    session: null,
    currentQuestion: null,
    answers: new Map(),
    checkpoints: [],
    isLoading: true,
    error: null,
    progress: {
      current: 0,
      total: 0,
      percentage: 0,
    },
  });

  const [showCheckpoint, setShowCheckpoint] = useState<QuestionnaireCheckpoint | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questionQueue, setQuestionQueue] = useState<QuestionnaireQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  /**
   * Initialize session and fetch first questions from SELVE backend
   */
  const initializeSession = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Start assessment with SELVE backend
      const response = await fetch(`${API_BASE}/api/assessment/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: null, // Could be set from auth context
          metadata: { source: "web" },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start assessment");
      }

      const data = await response.json();
      const { session_id, questions, total_questions, progress } = data;

      // Store session ID
      setSessionId(session_id);

      // Convert backend questions to frontend format
      const formattedQuestions: QuestionnaireQuestion[] = questions.map((q: any) => ({
        id: q.id,
        text: q.text,
        type: q.type || "scale-slider", // Use backend type or default to scale-slider
        section: q.dimension,
        subsection: q.dimension,
        isRequired: q.isRequired,
        renderConfig: q.renderConfig || {
          min: 1,
          max: 5,
          step: 1,
          labels: {
            1: "Strongly Disagree",
            2: "Disagree",
            3: "Neutral",
            4: "Agree",
            5: "Strongly Agree"
          }
        },
      }));

      setQuestionQueue(formattedQuestions);
      setCurrentQuestionIndex(0);

      setState((prev) => ({
        ...prev,
        session: { id: session_id, createdAt: new Date().toISOString() } as QuestionnaireSession,
        currentQuestion: formattedQuestions[0] || null,
        isLoading: false,
        progress: {
          current: 0,
          total: total_questions,
          percentage: progress,
        },
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to initialize";
      Sentry.captureException(error);
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  }, []);

  /**
   * Submit an answer and get next adaptive questions from backend
   */
  const submitAnswer = useCallback(
    async (questionId: string, answer: unknown) => {
      if (!sessionId) {
        setState((prev) => ({ ...prev, error: "No active session" }));
        return;
      }

      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        // Submit answer to SELVE backend
        const response = await fetch(`${API_BASE}/api/assessment/answer`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionId,
            question_id: questionId,
            response: answer as number, // 1-5 scale
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit answer");
        }

        const data = await response.json();
        const { next_questions, is_complete, progress, questions_answered, total_questions } = data;

        // Update local answers map
        const newAnswers = new Map(state.answers);
        newAnswers.set(questionId, answer);

        setState((prev) => ({
          ...prev,
          answers: newAnswers,
          progress: {
            current: questions_answered,
            total: total_questions,
            percentage: progress,
          },
        }));

        // Check if assessment is complete
        if (is_complete) {
          setIsComplete(true);
          setState((prev) => ({ ...prev, isLoading: false }));
          
          // Redirect to results page after short delay
          setTimeout(() => {
            window.location.href = `/results/${sessionId}`;
          }, 1500);
          return;
        }

        // Add next adaptive questions to queue
        if (next_questions && next_questions.length > 0) {
          const formattedQuestions: QuestionnaireQuestion[] = next_questions.map((q: any) => ({
            id: q.id,
            text: q.text,
            type: q.type || "scale-slider", // Use backend type or default to scale-slider
            section: q.dimension,
            subsection: q.dimension,
            isRequired: q.isRequired,
            renderConfig: q.renderConfig || {
              min: 1,
              max: 5,
              step: 1,
              labels: {
                1: "Strongly Disagree",
                2: "Disagree",
                3: "Neutral",
                4: "Agree",
                5: "Strongly Agree"
              }
            },
          }));

          setQuestionQueue((prev) => [...prev, ...formattedQuestions]);
        }

        // Move to next question in queue
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);

        setState((prev) => ({
          ...prev,
          currentQuestion: questionQueue[nextIndex] || null,
          isLoading: false,
        }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to submit answer";
        Sentry.captureException(error);
        setState((prev) => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
        }));
      }
    },
    [sessionId, state.answers, currentQuestionIndex, questionQueue]
  );

  /**
   * Go back to previous question (if supported)
   * TODO: Implement navigation history for going back
   */
  const goBack = useCallback(() => {
    // This would require storing question history
    console.log("Go back - not yet implemented");
  }, []);

  /**
   * Skip current question (if allowed)
   */
  const skipQuestion = useCallback(async () => {
    if (!state.currentQuestion || !state.session) return;

    // Submit null/empty answer
    await submitAnswer(state.currentQuestion.id, null);
  }, [state.currentQuestion, state.session, submitAnswer]);

  /**
   * Continue from checkpoint
   */
  const continueFromCheckpoint = useCallback(() => {
    setShowCheckpoint(null);
  }, []);

  /**
   * Validate answer before submission
   */
  const validateAnswer = useCallback(
    (answer: unknown): { isValid: boolean; error?: string } => {
      if (!state.currentQuestion) {
        return { isValid: false, error: "No current question" };
      }

      const { isRequired, validation = [] } = state.currentQuestion;

      // Check if required
      if (isRequired) {
        if (answer === null || answer === undefined || answer === "") {
          return { isValid: false, error: "This field is required" };
        }

        // Check for empty arrays
        if (Array.isArray(answer) && answer.length === 0) {
          return { isValid: false, error: "Please select at least one option" };
        }
      }

      // Run validation rules
      for (const rule of validation) {
        switch (rule.type) {
          case "minLength":
            if (typeof answer === "string" && answer.length < (rule.value as number)) {
              return {
                isValid: false,
                error: rule.message || `Minimum length is ${rule.value}`,
              };
            }
            break;

          case "maxLength":
            if (typeof answer === "string" && answer.length > (rule.value as number)) {
              return {
                isValid: false,
                error: rule.message || `Maximum length is ${rule.value}`,
              };
            }
            break;

          case "min":
            if (typeof answer === "number" && answer < (rule.value as number)) {
              return {
                isValid: false,
                error: rule.message || `Minimum value is ${rule.value}`,
              };
            }
            break;

          case "max":
            if (typeof answer === "number" && answer > (rule.value as number)) {
              return {
                isValid: false,
                error: rule.message || `Maximum value is ${rule.value}`,
              };
            }
            break;

          case "pattern":
            if (typeof answer === "string" && rule.value) {
              const regex = new RegExp(rule.value as string);
              if (!regex.test(answer)) {
                return {
                  isValid: false,
                  error: rule.message || "Invalid format",
                };
              }
            }
            break;

          case "email":
            if (typeof answer === "string") {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(answer)) {
                return {
                  isValid: false,
                  error: rule.message || "Invalid email address",
                };
              }
            }
            break;
        }
      }

      return { isValid: true };
    },
    [state.currentQuestion]
  );

  // Initialize on mount
  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  return {
    // State
    session: state.session,
    currentQuestion: state.currentQuestion,
    answers: state.answers,
    isLoading: state.isLoading,
    error: state.error,
    progress: state.progress,
    showCheckpoint,
    isComplete,

    // Actions
    submitAnswer,
    goBack,
    skipQuestion,
    continueFromCheckpoint,
    validateAnswer,

    // Utilities
    getAnswer: (questionId: string) => state.answers.get(questionId),
  };
}
