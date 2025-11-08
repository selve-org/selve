// src/hooks/useQuestionnaire.ts
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import * as Sentry from "@sentry/nextjs";
import { useAssessmentProgress } from "@/contexts/AssessmentSessionContext";
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
  const { updateProgress, currentProgress } = useAssessmentProgress();
  
  // Extract only the sessionId to prevent infinite re-renders
  const existingSessionId = currentProgress.sessionId;
  
  // Track initialization to prevent multiple calls
  const initializationAttempted = useRef(false);
  
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

  const [showCheckpoint, setShowCheckpoint] =
    useState<QuestionnaireCheckpoint | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questionQueue, setQuestionQueue] = useState<QuestionnaireQuestion[]>(
    []
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isGoingBack, setIsGoingBack] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  /**
   * Initialize session and fetch first questions from SELVE backend
   */
  const initializeSession = useCallback(async () => {
    // Prevent multiple initialization attempts
    if (initializationAttempted.current) {
      return;
    }
    initializationAttempted.current = true;

    try {
      setIsInitializing(true);
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Minimum loading time to prevent flash
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, 800));

      // Check if we have existing session to restore
      if (existingSessionId) {
        console.log("📦 Restoring existing session:", existingSessionId);
        setSessionId(existingSessionId);
        
        // TODO: Add API endpoint to restore session state from backend
        // For now, we'll continue with existing session ID and let the frontend rebuild state
      }

      // Start assessment with SELVE backend
      const response = await fetch(`${API_BASE}/api/assessment/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: null, // Could be set from auth context
          metadata: { source: "web", restored_session: !!existingSessionId },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start assessment");
      }

      const data = await response.json();
      const { session_id, questions, total_questions, progress } = data;

      // Store session ID (use existing one if we're restoring, or new one)
      const finalSessionId = existingSessionId || session_id;
      setSessionId(finalSessionId);
      
      // Update progress with session ID if it's new
      if (!existingSessionId) {
        updateProgress({ sessionId: finalSessionId });
      }

      // Convert backend questions to frontend format
      const formattedQuestions: QuestionnaireQuestion[] = questions.map(
        (q: any) => ({
          id: q.id,
          text: q.text,
          type: q.type || "scale-slider", // Use backend type or default to scale-slider
          sectionId: q.dimension,
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
              5: "Strongly Agree",
            },
          },
        })
      );

      setQuestionQueue(formattedQuestions);
      setCurrentQuestionIndex(0);

      setState((prev) => ({
        ...prev,
        session: {
          id: session_id,
          createdAt: new Date().toISOString(),
        } as QuestionnaireSession,
        currentQuestion: formattedQuestions[0] || null,
        isLoading: false,
        progress: {
          current: 0,
          total: total_questions,
          percentage: progress,
        },
      }));
      
      // Wait for minimum loading time before clearing initializing state
      await minLoadingTime;
      
      // Clear initializing state
      setIsInitializing(false);
    } catch (error) {
      // Ensure minimum loading time even on error
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, 800));
      await minLoadingTime;
      
      const errorMessage =
        error instanceof Error ? error.message : "Failed to initialize";
      Sentry.captureException(error);
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      // Clear initializing state on error
      setIsInitializing(false);
      // Reset initialization flag on error to allow retry
      initializationAttempted.current = false;
    }
  }, [existingSessionId, updateProgress]);

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
            is_going_back: isGoingBack, // Flag if this is a resubmission after going back
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit answer");
        }

        const data = await response.json();
        const {
          next_questions,
          is_complete,
          progress,
          questions_answered,
          total_questions,
          can_go_back,
          warning_message,
        } = data;

        // Update can_go_back state from backend
        if (can_go_back !== undefined) {
          setCanGoBack(can_go_back);
        }
        if (warning_message) {
          setWarningMessage(warning_message);
        }

        // Reset going back flag after submission
        setIsGoingBack(false);

        // Update local answers map
        const newAnswers = new Map(state.answers);
        newAnswers.set(questionId, answer);

        // Save progress to session context
        updateProgress({
          sessionId: sessionId,
          lastQuestionIndex: currentQuestionIndex,
          // Convert Map to object for storage
          responses: Object.fromEntries(newAnswers),
        });

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

          // Redirect to results page after showing all loading stages (~5.5 seconds)
          setTimeout(() => {
            window.location.href = `/results/${sessionId}`;
          }, 5500);
          return;
        }

        // Add next adaptive questions to queue
        let updatedQueue = questionQueue;
        if (next_questions && next_questions.length > 0) {
          const formattedQuestions: QuestionnaireQuestion[] =
            next_questions.map((q: any) => ({
              id: q.id,
              text: q.text,
              type: q.type || "scale-slider", // Use backend type or default to scale-slider
              sectionId: q.dimension,
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
                  5: "Strongly Agree",
                },
              },
            }));

          updatedQueue = [...questionQueue, ...formattedQuestions];
          setQuestionQueue(updatedQueue);
        }

        // Move to next question in queue (unless we went back)
        if (!isGoingBack) {
          const nextIndex = currentQuestionIndex + 1;
          setCurrentQuestionIndex(nextIndex);

          setState((prev) => ({
            ...prev,
            currentQuestion: updatedQueue[nextIndex] || null,
            isLoading: false,
          }));
        } else {
          // Stay on current question after resubmitting
          setState((prev) => ({
            ...prev,
            isLoading: false,
          }));
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to submit answer";
        Sentry.captureException(error);
        setState((prev) => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
        }));
      }
    },
    [sessionId, state.answers, currentQuestionIndex, questionQueue, isGoingBack]
  );

  /**
   * Check if user can go back to previous question
   * Returns: { canGoBack: boolean, warning: string | null }
   */
  const checkCanGoBack = useCallback(async (): Promise<{
    canGoBack: boolean;
    warning: string | null;
  }> => {
    if (!sessionId) {
      return { canGoBack: false, warning: "No active session" };
    }

    try {
      const response = await fetch(`${API_BASE}/api/assessment/can-go-back`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to check back status");
      }

      const data = await response.json();
      return {
        canGoBack: data.can_go_back,
        warning: data.warning,
      };
    } catch (error) {
      console.error("Error checking back status:", error);
      Sentry.captureException(error);
      return { canGoBack: false, warning: "Unable to check back status" };
    }
  }, [sessionId]);

  /**
   * Go back to previous question (if supported)
   * Calls backend /assessment/back endpoint and loads the previous question
   */
  const goBack = useCallback(async () => {
    if (!sessionId || !canGoBack) {
      console.log("Cannot go back: ", { sessionId, canGoBack });
      return;
    }

    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Call backend to go back
      const response = await fetch(`${API_BASE}/api/assessment/back`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to go back");
      }

      const data = await response.json();
      const { question, current_answer, can_go_back, warning } = data;

      // Update states
      setCanGoBack(can_go_back);
      setWarningMessage(warning || null);
      setIsGoingBack(true); // Set flag so next submission knows it's a resubmission

      // Check if we have a question to go back to
      if (!question) {
        setState((prev) => ({
          ...prev,
          error: warning || "Cannot go back",
          isLoading: false,
        }));
        return;
      }

      // Format the previous question
      const formattedQuestion: QuestionnaireQuestion = {
        id: question.id,
        text: question.text,
        type: question.type || "scale-slider",
        sectionId: question.dimension,
        isRequired: question.isRequired,
        renderConfig: question.renderConfig || {
          min: 1,
          max: 5,
          step: 1,
          labels: {
            1: "Strongly Disagree",
            2: "Disagree",
            3: "Neutral",
            4: "Agree",
            5: "Strongly Agree",
          },
        },
      };

      // Update current question
      setState((prev) => ({
        ...prev,
        currentQuestion: formattedQuestion,
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to go back";
      Sentry.captureException(error);
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  }, [sessionId, canGoBack]);

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
            if (
              typeof answer === "string" &&
              answer.length < (rule.value as number)
            ) {
              return {
                isValid: false,
                error: rule.message || `Minimum length is ${rule.value}`,
              };
            }
            break;

          case "maxLength":
            if (
              typeof answer === "string" &&
              answer.length > (rule.value as number)
            ) {
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
    isInitializing,
    error: state.error,
    progress: state.progress,
    showCheckpoint,
    isComplete,
    canGoBack,
    warningMessage,

    // Actions
    submitAnswer,
    goBack,
    checkCanGoBack,
    skipQuestion,
    continueFromCheckpoint,
    validateAnswer,

    // Utilities
    getAnswer: (questionId: string) => state.answers.get(questionId),
  };
}
