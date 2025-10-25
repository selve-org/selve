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

/**
 * useQuestionnaire Hook
 * 
 * Manages the complete questionnaire state including:
 * - Session creation and management
 * - Question fetching (adaptive mode)
 * - Answer submission
 * - Progress tracking
 * - Checkpoint handling
 * 
 * This is the main state management for the wizard
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

  /**
   * Initialize session and fetch first question
   */
  const initializeSession = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Create new session
      const sessionResponse = await fetch("/api/questionnaire/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!sessionResponse.ok) {
        throw new Error("Failed to create session");
      }

      const { session } = await sessionResponse.json();

      setState((prev) => ({
        ...prev,
        session,
      }));

      // Fetch first question
      await fetchNextQuestion(session.id);
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
   * Fetch the next question for the session
   */
  const fetchNextQuestion = useCallback(async (sessionId: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      const response = await fetch(`/api/questionnaire/questions/${sessionId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch question");
      }

      const data = await response.json();

      // Check if questionnaire is complete
      if (data.done) {
        setIsComplete(true);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          progress: data.progress || prev.progress,
        }));
        return;
      }

      // Check if there's a checkpoint to show
      if (data.checkpoint) {
        setShowCheckpoint(data.checkpoint);
      }

      setState((prev) => ({
        ...prev,
        currentQuestion: data.question || null,
        isLoading: false,
        progress: data.progress || prev.progress,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch question";
      Sentry.captureException(error);
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  }, []);

  /**
   * Submit an answer and move to next question
   */
  const submitAnswer = useCallback(
    async (questionId: string, answer: unknown) => {
      if (!state.session) {
        setState((prev) => ({ ...prev, error: "No active session" }));
        return;
      }

      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        const response = await fetch("/api/questionnaire/answers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: state.session.id,
            questionId,
            answer,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit answer");
        }

        // Update local answers map
        const newAnswers = new Map(state.answers);
        newAnswers.set(questionId, answer);

        setState((prev) => ({
          ...prev,
          answers: newAnswers,
        }));

        // Fetch next question
        await fetchNextQuestion(state.session.id);
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
    [state.session, state.answers, fetchNextQuestion]
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
