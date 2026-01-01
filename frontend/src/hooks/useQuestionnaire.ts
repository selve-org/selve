// src/hooks/useQuestionnaire.ts
"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import * as Sentry from "@sentry/nextjs";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { useAssessmentProgress } from "@/contexts/AssessmentSessionContext";
import type {
  QuestionnaireSession,
  QuestionnaireQuestion,
  QuestionnaireCheckpoint,
  WizardState,
} from "@/lib/types/questionnaire";

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
export function useQuestionnaire(inviteCode?: string) {
  const { updateProgress, currentProgress } = useAssessmentProgress();
  const { getToken } = useAuth();

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

  // Keep the latest queue/index/back-state available synchronously.
  // This avoids stale closures when users answer quickly after a back.
  const questionQueueRef = useRef<QuestionnaireQuestion[]>([]);
  const currentQuestionIndexRef = useRef(0);
  const isGoingBackRef = useRef(false);

  useEffect(() => {
    questionQueueRef.current = questionQueue;
  }, [questionQueue]);

  useEffect(() => {
    currentQuestionIndexRef.current = currentQuestionIndex;
  }, [currentQuestionIndex]);

  useEffect(() => {
    isGoingBackRef.current = isGoingBack;
  }, [isGoingBack]);

  /**
   * Get or create a device fingerprint for this browser
   * Used to detect if sync is happening on same device vs different device
   * Memoized to prevent recreating on every render
   */
  const deviceFingerprint = useMemo(() => {
    if (typeof window === 'undefined') return null;
    
    const FINGERPRINT_KEY = 'selve_device_fp';
    let fingerprint = localStorage.getItem(FINGERPRINT_KEY);
    
    if (!fingerprint) {
      // Create a simple fingerprint from browser info + random ID
      const browserInfo = `${navigator.userAgent}_${screen.width}x${screen.height}`;
      const randomId = Math.random().toString(36).substring(2, 15);
      fingerprint = btoa(`${browserInfo}_${randomId}`).substring(0, 32);
      localStorage.setItem(FINGERPRINT_KEY, fingerprint);
    }
    
    return fingerprint;
  }, []); // Empty deps - only run once

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

      // Track restored session data
      let restoredSessionData: any = null;

      // Check if we have existing session to restore
      if (existingSessionId) {
        console.log("📦 Attempting to restore session:", existingSessionId);
        
        try {
          // Get auth token if user is signed in
          const token = await getToken();
          const headers: Record<string, string> = {
            "Content-Type": "application/json",
          };
          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }
          
          // Try to restore session from backend
          const restoreResponse = await fetch(
            `${API_BASE}/api/assessment/session/${existingSessionId}`,
            { headers }
          );

          if (restoreResponse.ok) {
            const sessionData = await restoreResponse.json();
            
            // Check if session can be resumed
            if (sessionData.can_resume && sessionData.status === "in-progress") {
              console.log("✅ Session restored successfully:", {
                progress: sessionData.progress,
                questionsAnswered: sessionData.questions_answered,
              });
              
              setSessionId(existingSessionId);
              restoredSessionData = sessionData; // Store for later use
              
              // Continue with normal initialization using existing session
              setState((prev) => ({
                ...prev,
                progress: {
                  current: sessionData.questions_answered || 0,
                  total: sessionData.total_questions || 44,
                  percentage: sessionData.progress || 0,
                },
              }));
            } else {
              console.log("⚠️ Session exists but is completed or abandoned, starting new session");
              // Session is complete/abandoned - start a new one
              updateProgress({ sessionId: undefined });
            }
          } else {
            console.log("⚠️ Session not found in database, starting new session");
            // Session doesn't exist - start new one
            updateProgress({ sessionId: undefined });
          }
        } catch (restoreError) {
          console.warn("Failed to restore session, starting new:", restoreError);
          // If restore fails, proceed with new session
          updateProgress({ sessionId: undefined });
        }
      }

      // If we have a restored session with answers, DON'T call /start (would break adaptive flow)
      // Instead, use pending questions from the restored session
      let session_id, questions, total_questions, progress;
      
      if (restoredSessionData && restoredSessionData.questions_answered > 0) {
        // Session is being restored - use pending questions from backend
        console.log("♻️ Restored session detected - using pending questions to preserve adaptive flow");
        
        session_id = existingSessionId;
        // Use pending questions from restored session data
        questions = restoredSessionData.pending_questions || [];
        total_questions = restoredSessionData.total_questions || 44;
        progress = restoredSessionData.progress || 0;
        
        setSessionId(session_id);
        
        console.log(`📋 Loaded ${questions.length} pending questions from backend`);
      } else {
        // New session - call /start to initialize
        const token = await getToken();
        
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        
        const response = await fetch(`${API_BASE}/api/assessment/start`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            user_id: null, // Clerk ID will be extracted from token on backend
            metadata: {
              source: "web",
              restored_session: false,
              invite_code: inviteCode || null,
            },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to start assessment");
        }

        const data = await response.json();
        session_id = data.session_id;
        questions = data.questions;
        total_questions = data.total_questions;
        progress = data.progress;

        setSessionId(session_id);
        updateProgress({ sessionId: session_id });
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
      
      // Restore previous answers from backend if available
      const restoredAnswers = new Map();
      if (restoredSessionData) {
        // Load demographics into answers map
        const demographics = restoredSessionData.demographics || {};
        Object.entries(demographics).forEach(([key, value]) => {
          restoredAnswers.set(key, value);
        });
        
        // Load personality responses into answers map
        const responses = restoredSessionData.responses || {};
        Object.entries(responses).forEach(([key, value]) => {
          restoredAnswers.set(key, value);
        });
        
        console.log(`✅ Restored ${restoredAnswers.size} previous answers from backend`);
      }
      
      // Calculate which question to show based on already answered questions
      // If restoring session, skip to first unanswered question
      let startIndex = 0;
      if (restoredSessionData) {
        // Count how many questions have been answered
        const answeredCount = restoredSessionData.questions_answered || 0;
        startIndex = Math.min(answeredCount, formattedQuestions.length - 1);
        console.log(`📍 Resuming from question ${startIndex + 1} (${answeredCount} already answered)`);
      }
      
      setCurrentQuestionIndex(startIndex);

      setState((prev) => ({
        ...prev,
        session: {
          id: session_id,
          createdAt: new Date().toISOString(),
        } as QuestionnaireSession,
        currentQuestion: formattedQuestions[startIndex] || null,
        answers: restoredAnswers, // Load restored answers into state
        isLoading: false,
        progress: {
          current: restoredSessionData?.questions_answered || 0,
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

      // Use refs to avoid stale values immediately after goBack() updates.
      const effectiveIsGoingBack = isGoingBackRef.current;
      const effectiveCurrentQuestionIndex = currentQuestionIndexRef.current;
      const effectiveQuestionQueue = questionQueueRef.current;

      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        // Get auth token if user is signed in
        const token = await getToken();
        
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // Submit answer to SELVE backend
        const response = await fetch(`${API_BASE}/api/assessment/answer`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            session_id: sessionId,
            question_id: questionId,
            response: answer as number, // 1-5 scale
            is_going_back: effectiveIsGoingBack, // Flag if this is a resubmission after going back
            current_question_index: effectiveCurrentQuestionIndex, // Send current position for sync check
            device_fingerprint: deviceFingerprint, // Track which device submitted this answer
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          
          // Check if this is a sync conflict (409 Conflict)
          if (response.status === 409 || errorData.sync_conflict) {
            const backendIndex = errorData.current_question_index || 0;
            const pendingQuestions = errorData.pending_questions || [];
            const answeredQuestions = errorData.answered_questions || [];
            
            // Check if this is a resync required error (frontend out of sync)
            if (errorData.resync_required) {
              console.warn("🔄 Frontend out of sync with backend, performing resync", {
                backendIndex,
                pendingQuestions,
                answeredQuestions,
              });
              
              toast.warning("Sync required", {
                description: "Questionnaire state was out of sync. Resetting to correct state.",
                duration: 5000,
              });
              
              // If backend provides pending questions, use them to reset queue
              if (pendingQuestions.length > 0) {
                // We need to get the full question details for pending questions
                // For now, we'll fetch the session state to get full questions
                try {
                  const token = await getToken();
                  const headers: Record<string, string> = {
                    "Content-Type": "application/json",
                  };
                  if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                  }
                  
                  const sessionResponse = await fetch(
                    `${API_BASE}/api/assessment/session/${sessionId}`,
                    { headers }
                  );
                  
                  if (sessionResponse.ok) {
                    const sessionData = await sessionResponse.json();
                    const pendingQuestionDetails = sessionData.pending_questions || [];
                    
                    // Convert to frontend format
                    const formattedQuestions: QuestionnaireQuestion[] = pendingQuestionDetails.map(
                      (q: any) => ({
                        id: q.id,
                        text: q.text,
                        type: q.type || "scale-slider",
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
                    
                    // Reset queue to backend's pending questions
                    setQuestionQueue(formattedQuestions);
                    questionQueueRef.current = formattedQuestions;
                    
                    // Set current index to 0 (first pending question)
                    const newIndex = 0;
                    setCurrentQuestionIndex(newIndex);
                    currentQuestionIndexRef.current = newIndex;
                    
                    setState((prev) => ({
                      ...prev,
                      currentQuestion: formattedQuestions[newIndex] || null,
                      isLoading: false,
                    }));
                    
                    console.log("✅ Resynced frontend queue with backend pending questions");
                    return;
                  }
                } catch (fetchError) {
                  console.error("Failed to fetch session for resync:", fetchError);
                }
              }
              
              // Fallback: sync to the correct question index
              if (backendIndex < effectiveQuestionQueue.length) {
                setCurrentQuestionIndex(backendIndex);
                setState((prev) => ({
                  ...prev,
                  currentQuestion: effectiveQuestionQueue[backendIndex],
                  isLoading: false,
                }));
              } else {
                // If index is out of bounds, go to last question
                const lastIndex = Math.max(0, effectiveQuestionQueue.length - 1);
                setCurrentQuestionIndex(lastIndex);
                setState((prev) => ({
                  ...prev,
                  currentQuestion: effectiveQuestionQueue[lastIndex] || null,
                  isLoading: false,
                }));
              }
            } else {
              // Regular sync conflict (another device)
              toast.warning("Question already answered", {
                description: "This question was already answered. Moving to the next question.",
                duration: 5000,
              });

              // Sync to the correct question
              if (backendIndex < effectiveQuestionQueue.length) {
                setCurrentQuestionIndex(backendIndex);
                setState((prev) => ({
                  ...prev,
                  currentQuestion: effectiveQuestionQueue[backendIndex],
                  isLoading: false,
                }));
              }
            }

            // Mark state as ready after resync
            setState((prev) => ({ ...prev, isLoading: false }));

            // Throw error to prevent calling code from continuing
            throw new Error("SYNC_CONFLICT_RESOLVED");
          }
          
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
        isGoingBackRef.current = false;

        // Update local answers map
        const newAnswers = new Map(state.answers);
        newAnswers.set(questionId, answer);

        // Save progress to session context
        updateProgress({
          sessionId: sessionId,
          lastQuestionIndex: effectiveCurrentQuestionIndex,
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

          // Mark invite as completed if this was from an invite
          if (inviteCode) {
            try {
              await fetch(`${API_BASE}/api/invites/${inviteCode}/mark-completed`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
              });
            } catch (error) {
              console.error("Failed to mark invite as completed:", error);
              // Don't block completion if this fails
            }
          }

          // Redirect to results page immediately
          // Results page handles waiting for narrative generation with polling
          window.location.href = `/results/${sessionId}`;
          return;
        }

        // Add next adaptive questions to queue.
        // IMPORTANT: Only truncate the "future" queue when re-answering after a back.
        // The backend can legitimately return `next_questions=[]` while there are still
        // pending questions already sent to the client. In that case the UI must keep
        // and continue through the existing queue.
        let questionIndexInQueue = effectiveCurrentQuestionIndex;
        const foundIndex = effectiveQuestionQueue.findIndex((q) => q.id === questionId);
        if (foundIndex !== -1) {
          questionIndexInQueue = foundIndex;
        }

        let updatedQueue = effectiveQuestionQueue;
        if (effectiveIsGoingBack) {
          updatedQueue = effectiveQuestionQueue.slice(0, questionIndexInQueue + 1);
        }
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

          const existingIds = new Set(updatedQueue.map((q) => q.id));
          const dedupedNext = formattedQuestions.filter((q) => !existingIds.has(q.id));
          updatedQueue = [...updatedQueue, ...dedupedNext];
        }

        setQuestionQueue(updatedQueue);
        questionQueueRef.current = updatedQueue;

        // Always advance to the next question after submission.
        // (After a back/resubmit, the backend returns the correct next_questions.)
        const nextIndex = questionIndexInQueue + 1;
        const nextQuestion = updatedQueue[nextIndex];
        if (nextQuestion) {
          setCurrentQuestionIndex(nextIndex);
          currentQuestionIndexRef.current = nextIndex;
          setState((prev) => ({
            ...prev,
            currentQuestion: nextQuestion,
            isLoading: false,
          }));
        } else {
          // No next question available yet; keep currentQuestion in place.
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
    [sessionId, state.answers, currentQuestionIndex, questionQueue, isGoingBack, deviceFingerprint, getToken, updateProgress, setState, setIsComplete]
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
      const { question, current_answer, can_go_back, warning, pending_questions_cleared } = data;

      // Update states
      setCanGoBack(can_go_back);
      setWarningMessage(warning || null);
      setIsGoingBack(true); // Set flag so next submission knows it's a resubmission
      isGoingBackRef.current = true;

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

      // Keep frontend queue in lockstep with backend after a back navigation.
      // Always rebuild the queue to start with the returned question so the
      // next submission advances to the correct next item.
      if (pending_questions_cleared) {
        console.log("🧹 Backend cleared pending questions - resetting frontend question queue");
        setQuestionQueue([formattedQuestion]);
        questionQueueRef.current = [formattedQuestion];
        setCurrentQuestionIndex(0);
        currentQuestionIndexRef.current = 0;
      } else {
        // Best-effort: keep the index aligned with the question the backend returned.
        const currentQueue = questionQueueRef.current;
        const foundBackIndex = currentQueue.findIndex((q) => q.id === formattedQuestion.id);
        const newIndex =
          foundBackIndex !== -1
            ? foundBackIndex
            : Math.max(currentQuestionIndexRef.current - 1, 0);
        setCurrentQuestionIndex(newIndex);
        currentQuestionIndexRef.current = newIndex;
      }

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

  /**
   * Poll for session updates from other devices
   * This prevents conflicts when user is taking assessment on multiple devices
   */
  useEffect(() => {
    if (!sessionId || isComplete || isInitializing) return;

    // Track the last known question index to detect changes
    const lastKnownIndexRef = { current: currentQuestionIndex };
    const hasShownSyncToastRef = { current: false }; // Prevent duplicate toasts
    const currentDeviceFP = deviceFingerprint;
    
    const checkForUpdates = async () => {
      try {
        const token = await getToken();
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(
          `${API_BASE}/api/assessment/session/${sessionId}`,
          { headers }
        );

        if (response.ok) {
          const sessionData = await response.json();
          const backendQuestionsAnswered = sessionData.questions_answered || 0;
          const localQuestionsAnswered = currentQuestionIndex;
          const lastDeviceFP = sessionData.last_device_fingerprint; // Backend should return this

          // Check if backend has more answers than our local state
          // AND we haven't just initialized (to avoid showing message on page load)
          if (backendQuestionsAnswered > localQuestionsAnswered && 
              backendQuestionsAnswered > lastKnownIndexRef.current &&
              !hasShownSyncToastRef.current) { // Only show toast once
            
            // Determine if this is from another device or same device
            const isDifferentDevice = lastDeviceFP && lastDeviceFP !== currentDeviceFP;
            
            // Only show notification if we've been on the page for a bit
            // (to avoid showing on initial page load/resume)
            const timeSinceInit = Date.now() - (state.session?.createdAt ? new Date(state.session.createdAt).getTime() : 0);
            const isLikelyPageRefresh = timeSinceInit < 5000; // Less than 5 seconds since init
            
            if (!isLikelyPageRefresh) {
              if (isDifferentDevice) {
                // Actually from another device - show warning
                toast.warning("Active on another device", {
                  description: `Progress detected from another device. Syncing to question ${backendQuestionsAnswered + 1}.`,
                  duration: 6000,
                });
              } else {
                // Same device, just resuming - gentle info message
                toast.info("Progress synced", {
                  description: `Continuing from question ${backendQuestionsAnswered + 1}.`,
                  duration: 3000,
                });
              }
              hasShownSyncToastRef.current = true; // Mark as shown
            }

            // Update to the correct question
            if (backendQuestionsAnswered < questionQueue.length) {
              setCurrentQuestionIndex(backendQuestionsAnswered);
              setState((prev) => ({
                ...prev,
                currentQuestion: questionQueue[backendQuestionsAnswered],
                progress: {
                  current: backendQuestionsAnswered,
                  total: prev.progress.total,
                  percentage: sessionData.progress || 0,
                },
              }));
              lastKnownIndexRef.current = backendQuestionsAnswered;
            }
          } else if (backendQuestionsAnswered === localQuestionsAnswered) {
            // Reset toast flag when we're in sync
            hasShownSyncToastRef.current = false;
          }
        }
      } catch (error) {
        // Silent fail - don't disrupt user experience
        console.warn("Failed to check for session updates:", error);
      }
    };

    // Poll every 10 seconds
    const interval = setInterval(checkForUpdates, 10000);

    return () => clearInterval(interval);
  }, [sessionId, isComplete, isInitializing, currentQuestionIndex, questionQueue, getToken, setState, state.session?.createdAt, deviceFingerprint]);

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