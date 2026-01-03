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

// =============================================================================
// CONFIGURATION CONSTANTS
// =============================================================================
const CONFIG = {
  POLLING_INTERVAL_MS: 10000,           // Session sync polling interval
  HEARTBEAT_INTERVAL_MS: 30000,         // Keep-alive ping interval
  MIN_LOADING_TIME_MS: 800,             // Minimum loading time to prevent flash
  RETRY_ATTEMPTS: 3,                    // Max retry attempts for failed requests
  RETRY_DELAY_MS: 1000,                 // Base delay between retries
  REQUEST_TIMEOUT_MS: 30000,            // Request timeout
} as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Retry a function with exponential backoff
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  attempts: number = CONFIG.RETRY_ATTEMPTS,
  delay: number = CONFIG.RETRY_DELAY_MS
): Promise<T> {
  let lastError: Error;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < attempts - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  throw lastError!;
}

/**
 * Fetch with timeout
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number = CONFIG.REQUEST_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Format question from backend to frontend format
 */
function formatQuestionFromBackend(q: any): QuestionnaireQuestion {
  return {
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
  };
}

// =============================================================================
// MAIN HOOK
// =============================================================================

/**
 * useQuestionnaire Hook
 *
 * Manages the complete questionnaire state including:
 * - Session creation and management via SELVE backend
 * - Adaptive question fetching
 * - Answer submission with sync conflict resolution
 * - Progress tracking
 * - Automatic completion and redirect to results
 * - Heartbeat keep-alive for production stability
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
  
  // ==========================================================================
  // STATE
  // ==========================================================================
  
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
  const [isInitializing, setIsInitializing] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questionQueue, setQuestionQueue] = useState<QuestionnaireQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isGoingBack, setIsGoingBack] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  
  // ==========================================================================
  // REFS - Used to avoid stale closures in async operations
  // ==========================================================================
  
  // Track initialization to prevent multiple calls
  const initializationAttempted = useRef(false);
  const isMountedRef = useRef(true);
  
  // Use refs for values that need to be accessed in async callbacks
  // These are updated synchronously with state to avoid stale closures
  const questionQueueRef = useRef<QuestionnaireQuestion[]>([]);
  const currentQuestionIndexRef = useRef(0);
  const isGoingBackRef = useRef(false);
  const sessionIdRef = useRef<string | null>(null);
  const answersRef = useRef<Map<string, unknown>>(new Map());
  
  // Keep refs in sync with state - use useLayoutEffect for synchronous updates
  useEffect(() => {
    questionQueueRef.current = questionQueue;
  }, [questionQueue]);

  useEffect(() => {
    currentQuestionIndexRef.current = currentQuestionIndex;
  }, [currentQuestionIndex]);

  useEffect(() => {
    isGoingBackRef.current = isGoingBack;
  }, [isGoingBack]);
  
  useEffect(() => {
    sessionIdRef.current = sessionId;
  }, [sessionId]);
  
  useEffect(() => {
    answersRef.current = state.answers;
  }, [state.answers]);

  // ==========================================================================
  // DEVICE FINGERPRINT - Memoized for consistent identification
  // ==========================================================================
  
  const deviceFingerprint = useMemo(() => {
    if (typeof window === 'undefined') return null;
    
    const FINGERPRINT_KEY = 'selve_device_fp';
    let fingerprint = localStorage.getItem(FINGERPRINT_KEY);
    
    if (!fingerprint) {
      const browserInfo = `${navigator.userAgent}_${screen.width}x${screen.height}`;
      const randomId = Math.random().toString(36).substring(2, 15);
      fingerprint = btoa(`${browserInfo}_${randomId}`).substring(0, 32);
      localStorage.setItem(FINGERPRINT_KEY, fingerprint);
    }
    
    return fingerprint;
  }, []);

  // ==========================================================================
  // HELPER: Get Auth Headers
  // ==========================================================================
  
  const getAuthHeaders = useCallback(async (): Promise<Record<string, string>> => {
    const token = await getToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }, [getToken]);

  // ==========================================================================
  // HELPER: Rebuild Question Queue from Backend
  // ==========================================================================
  
  const rebuildQueueFromBackend = useCallback(async (sessionIdToUse: string): Promise<{
    queue: QuestionnaireQuestion[];
    currentIndex: number;
    answers: Map<string, unknown>;
  }> => {
    const headers = await getAuthHeaders();
    
    const response = await fetchWithTimeout(
      `${API_BASE}/api/assessment/session/${sessionIdToUse}`,
      { headers }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch session: ${response.status}`);
    }
    
    const sessionData = await response.json();
    
    // Build answers map from backend data
    const restoredAnswers = new Map<string, unknown>();
    
    // Load demographics
    const demographics = sessionData.demographics || {};
    Object.entries(demographics).forEach(([key, value]) => {
      restoredAnswers.set(key, value);
    });
    
    // Load personality responses
    const responses = sessionData.responses || {};
    Object.entries(responses).forEach(([key, value]) => {
      restoredAnswers.set(key, value);
    });
    
    // Format pending questions
    const pendingQuestions = (sessionData.pending_questions || []).map(formatQuestionFromBackend);
    
    // The queue is the pending questions
    // Current index is 0 since pending questions are the ones we need to answer
    return {
      queue: pendingQuestions,
      currentIndex: 0,
      answers: restoredAnswers,
    };
  }, [getAuthHeaders]);

  // ==========================================================================
  // INITIALIZE SESSION
  // ==========================================================================
  
  const initializeSession = useCallback(async () => {
    if (initializationAttempted.current) {
      return;
    }
    initializationAttempted.current = true;

    try {
      setIsInitializing(true);
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const minLoadingTime = new Promise(resolve => setTimeout(resolve, CONFIG.MIN_LOADING_TIME_MS));
      let restoredSessionData: any = null;

      // Check if we have existing session to restore
      if (existingSessionId) {
        console.log("📦 Attempting to restore session:", existingSessionId);
        
        try {
          const headers = await getAuthHeaders();
          
          const restoreResponse = await withRetry(() => 
            fetchWithTimeout(
              `${API_BASE}/api/assessment/session/${existingSessionId}`,
              { headers }
            )
          );

          if (restoreResponse.ok) {
            const sessionData = await restoreResponse.json();
            
            if (sessionData.can_resume && sessionData.status === "in-progress") {
              console.log("✅ Session restored successfully:", {
                progress: sessionData.progress,
                questionsAnswered: sessionData.questions_answered,
              });
              
              setSessionId(existingSessionId);
              restoredSessionData = sessionData;
              
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
              updateProgress({ sessionId: undefined });
            }
          } else {
            console.log("⚠️ Session not found in database, starting new session");
            updateProgress({ sessionId: undefined });
          }
        } catch (restoreError) {
          console.warn("Failed to restore session, starting new:", restoreError);
          updateProgress({ sessionId: undefined });
        }
      }

      // Determine whether to use restored session or start new
      let session_id: string;
      let questions: any[];
      let total_questions: number;
      let progress: number;
      
      if (restoredSessionData && restoredSessionData.questions_answered > 0) {
        console.log("♻️ Restored session detected - using pending questions to preserve adaptive flow");
        
        session_id = existingSessionId!;
        questions = restoredSessionData.pending_questions || [];
        total_questions = restoredSessionData.total_questions || 44;
        progress = restoredSessionData.progress || 0;
        
        setSessionId(session_id);
        console.log(`📋 Loaded ${questions.length} pending questions from backend`);
      } else {
        // New session - call /start
        const headers = await getAuthHeaders();
        
        const response = await withRetry(() =>
          fetchWithTimeout(`${API_BASE}/api/assessment/start`, {
            method: "POST",
            headers,
            body: JSON.stringify({
              user_id: null,
              metadata: {
                source: "web",
                restored_session: false,
                invite_code: inviteCode || null,
              },
            }),
          })
        );

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

      // Format questions
      const formattedQuestions: QuestionnaireQuestion[] = questions.map(formatQuestionFromBackend);

      setQuestionQueue(formattedQuestions);
      questionQueueRef.current = formattedQuestions;
      
      // Restore previous answers
      const restoredAnswers = new Map<string, unknown>();
      if (restoredSessionData) {
        const demographics = restoredSessionData.demographics || {};
        Object.entries(demographics).forEach(([key, value]) => {
          restoredAnswers.set(key, value);
        });
        
        const responses = restoredSessionData.responses || {};
        Object.entries(responses).forEach(([key, value]) => {
          restoredAnswers.set(key, value);
        });
        
        console.log(`✅ Restored ${restoredAnswers.size} previous answers from backend`);
      }
      
      // Calculate start index
      let startIndex = 0;
      if (restoredSessionData && formattedQuestions.length > 0) {
        startIndex = 0; // Always start from first pending question
        console.log(`📍 Starting from first pending question`);
      }
      
      setCurrentQuestionIndex(startIndex);
      currentQuestionIndexRef.current = startIndex;

      setState((prev) => ({
        ...prev,
        session: {
          id: session_id,
          createdAt: new Date().toISOString(),
        } as QuestionnaireSession,
        currentQuestion: formattedQuestions[startIndex] || null,
        answers: restoredAnswers,
        isLoading: false,
        progress: {
          current: restoredSessionData?.questions_answered || 0,
          total: total_questions,
          percentage: progress,
        },
      }));
      
      await minLoadingTime;
      setIsInitializing(false);
      
    } catch (error) {
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, CONFIG.MIN_LOADING_TIME_MS));
      await minLoadingTime;
      
      const errorMessage = error instanceof Error ? error.message : "Failed to initialize";
      Sentry.captureException(error);
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      setIsInitializing(false);
      initializationAttempted.current = false;
    }
  }, [existingSessionId, updateProgress, getAuthHeaders, inviteCode]);

  // ==========================================================================
  // SUBMIT ANSWER - The core answer submission logic with robust sync handling
  // ==========================================================================
  
  const submitAnswer = useCallback(
    async (questionId: string, answer: unknown) => {
      const currentSessionId = sessionIdRef.current;
      
      if (!currentSessionId) {
        setState((prev) => ({ ...prev, error: "No active session" }));
        return;
      }

      // Capture current state via refs to avoid stale closures
      const effectiveIsGoingBack = isGoingBackRef.current;
      const effectiveCurrentQuestionIndex = currentQuestionIndexRef.current;
      const effectiveQuestionQueue = [...questionQueueRef.current]; // Clone to avoid mutation issues

      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        const headers = await getAuthHeaders();

        const response = await withRetry(() =>
          fetchWithTimeout(`${API_BASE}/api/assessment/answer`, {
            method: "POST",
            headers,
            body: JSON.stringify({
              session_id: currentSessionId,
              question_id: questionId,
              response: answer as number,
              is_going_back: effectiveIsGoingBack,
              current_question_index: effectiveCurrentQuestionIndex,
              device_fingerprint: deviceFingerprint,
            }),
          })
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          
          // Handle sync conflict (409)
          if (response.status === 409 || errorData.sync_conflict) {
            console.warn("🔄 Sync conflict detected, recovering...");
            
            // Show user-friendly message
            toast.warning("Syncing your progress...", {
              description: "Your session is being synchronized. This may take a moment.",
              duration: 3000,
            });
            
            try {
              // Rebuild queue from backend - this is the source of truth
              const { queue, currentIndex, answers } = await rebuildQueueFromBackend(currentSessionId);
              
              if (!isMountedRef.current) return;
              
              // Update all state atomically
              setQuestionQueue(queue);
              questionQueueRef.current = queue;
              setCurrentQuestionIndex(currentIndex);
              currentQuestionIndexRef.current = currentIndex;
              setIsGoingBack(false);
              isGoingBackRef.current = false;
              
              setState((prev) => ({
                ...prev,
                answers: answers,
                currentQuestion: queue[currentIndex] || null,
                isLoading: false,
                error: null,
              }));
              
              toast.success("Sync complete!", {
                description: "Continuing from where you left off.",
                duration: 2000,
              });
              
              console.log("✅ Recovered from sync conflict successfully");
              return; // Exit without throwing - we've recovered
              
            } catch (recoveryError) {
              console.error("Failed to recover from sync conflict:", recoveryError);
              Sentry.captureException(recoveryError);
              
              // If recovery fails, show error and let user retry
              setState((prev) => ({
                ...prev,
                isLoading: false,
                error: "Failed to sync. Please refresh the page.",
              }));
              return;
            }
          }
          
          throw new Error(errorData.detail || "Failed to submit answer");
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

        if (!isMountedRef.current) return;

        // Update navigation state
        if (can_go_back !== undefined) {
          setCanGoBack(can_go_back);
        }
        if (warning_message) {
          setWarningMessage(warning_message);
        }

        // Reset going back flag
        setIsGoingBack(false);
        isGoingBackRef.current = false;

        // Update answers map
        const newAnswers = new Map(answersRef.current);
        newAnswers.set(questionId, answer);

        // Save progress
        updateProgress({
          sessionId: currentSessionId,
          lastQuestionIndex: effectiveCurrentQuestionIndex,
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

        // Check completion
        if (is_complete) {
          setIsComplete(true);
          setState((prev) => ({ ...prev, isLoading: false }));

          // Mark invite as completed if applicable
          if (inviteCode) {
            try {
              await fetch(`${API_BASE}/api/invites/${inviteCode}/mark-completed`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
              });
            } catch (error) {
              console.error("Failed to mark invite as completed:", error);
            }
          }

          // Redirect to results
          window.location.href = `/results/${currentSessionId}`;
          return;
        }

        // Build updated queue
        let questionIndexInQueue = effectiveCurrentQuestionIndex;
        const foundIndex = effectiveQuestionQueue.findIndex((q) => q.id === questionId);
        if (foundIndex !== -1) {
          questionIndexInQueue = foundIndex;
        }

        let updatedQueue = effectiveQuestionQueue;
        if (effectiveIsGoingBack) {
          // Truncate future questions when re-answering after back
          updatedQueue = effectiveQuestionQueue.slice(0, questionIndexInQueue + 1);
        }
        
        // Add new questions from backend
        if (next_questions && next_questions.length > 0) {
          const formattedQuestions = next_questions.map(formatQuestionFromBackend);

          const existingIds = new Set(updatedQueue.map((q) => q.id));
          const dedupedNext = formattedQuestions.filter((q) => !existingIds.has(q.id));
          updatedQueue = [...updatedQueue, ...dedupedNext];
        }

        // Update queue
        setQuestionQueue(updatedQueue);
        questionQueueRef.current = updatedQueue;

        // Advance to next question
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
        } else if (updatedQueue.length > 0) {
          // No next question but queue not empty - might need to refresh
          console.warn("No next question available, attempting to refresh from backend");
          
          try {
            const { queue, currentIndex } = await rebuildQueueFromBackend(currentSessionId);
            if (queue.length > 0 && isMountedRef.current) {
              setQuestionQueue(queue);
              questionQueueRef.current = queue;
              setCurrentQuestionIndex(currentIndex);
              currentQuestionIndexRef.current = currentIndex;
              setState((prev) => ({
                ...prev,
                currentQuestion: queue[currentIndex] || null,
                isLoading: false,
              }));
            } else {
              setState((prev) => ({ ...prev, isLoading: false }));
            }
          } catch (refreshError) {
            console.error("Failed to refresh queue:", refreshError);
            setState((prev) => ({ ...prev, isLoading: false }));
          }
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
        
      } catch (error) {
        if (!isMountedRef.current) return;
        
        const errorMessage = error instanceof Error ? error.message : "Failed to submit answer";
        Sentry.captureException(error);
        setState((prev) => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
        }));
      }
    },
    [getAuthHeaders, deviceFingerprint, updateProgress, rebuildQueueFromBackend, inviteCode]
  );

  // ==========================================================================
  // BACK NAVIGATION
  // ==========================================================================
  
  const checkCanGoBack = useCallback(async (): Promise<{
    canGoBack: boolean;
    warning: string | null;
  }> => {
    const currentSessionId = sessionIdRef.current;
    
    if (!currentSessionId) {
      return { canGoBack: false, warning: "No active session" };
    }

    try {
      const response = await fetchWithTimeout(
        `${API_BASE}/api/assessment/can-go-back`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: currentSessionId }),
        }
      );

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
  }, []);

  const goBack = useCallback(async () => {
    const currentSessionId = sessionIdRef.current;
    
    if (!currentSessionId || !canGoBack) {
      console.log("Cannot go back:", { sessionId: currentSessionId, canGoBack });
      return;
    }

    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await fetchWithTimeout(
        `${API_BASE}/api/assessment/back`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: currentSessionId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to go back");
      }

      const data = await response.json();
      const { question, current_answer, can_go_back, warning, pending_questions_cleared } = data;

      if (!isMountedRef.current) return;

      setCanGoBack(can_go_back);
      setWarningMessage(warning || null);
      setIsGoingBack(true);
      isGoingBackRef.current = true;

      if (!question) {
        setState((prev) => ({
          ...prev,
          error: warning || "Cannot go back",
          isLoading: false,
        }));
        return;
      }

      const formattedQuestion = formatQuestionFromBackend(question);

      // Reset queue if backend cleared pending questions
      if (pending_questions_cleared) {
        console.log("🧹 Backend cleared pending questions - resetting frontend queue");
        setQuestionQueue([formattedQuestion]);
        questionQueueRef.current = [formattedQuestion];
        setCurrentQuestionIndex(0);
        currentQuestionIndexRef.current = 0;
      } else {
        const currentQueue = questionQueueRef.current;
        const foundBackIndex = currentQueue.findIndex((q) => q.id === formattedQuestion.id);
        const newIndex = foundBackIndex !== -1 ? foundBackIndex : Math.max(currentQuestionIndexRef.current - 1, 0);
        setCurrentQuestionIndex(newIndex);
        currentQuestionIndexRef.current = newIndex;
      }

      setState((prev) => ({
        ...prev,
        currentQuestion: formattedQuestion,
        isLoading: false,
      }));
      
    } catch (error) {
      if (!isMountedRef.current) return;
      
      const errorMessage = error instanceof Error ? error.message : "Failed to go back";
      Sentry.captureException(error);
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  }, [canGoBack]);

  // ==========================================================================
  // OTHER ACTIONS
  // ==========================================================================

  const skipQuestion = useCallback(async () => {
    if (!state.currentQuestion || !state.session) return;
    await submitAnswer(state.currentQuestion.id, null);
  }, [state.currentQuestion, state.session, submitAnswer]);

  const continueFromCheckpoint = useCallback(() => {
    setShowCheckpoint(null);
  }, []);

  const validateAnswer = useCallback(
    (answer: unknown): { isValid: boolean; error?: string } => {
      if (!state.currentQuestion) {
        return { isValid: false, error: "No current question" };
      }

      const { isRequired, validation = [] } = state.currentQuestion;

      if (isRequired) {
        if (answer === null || answer === undefined || answer === "") {
          return { isValid: false, error: "This field is required" };
        }
        if (Array.isArray(answer) && answer.length === 0) {
          return { isValid: false, error: "Please select at least one option" };
        }
      }

      for (const rule of validation) {
        switch (rule.type) {
          case "minLength":
            if (typeof answer === "string" && answer.length < (rule.value as number)) {
              return { isValid: false, error: rule.message || `Minimum length is ${rule.value}` };
            }
            break;
          case "maxLength":
            if (typeof answer === "string" && answer.length > (rule.value as number)) {
              return { isValid: false, error: rule.message || `Maximum length is ${rule.value}` };
            }
            break;
          case "min":
            if (typeof answer === "number" && answer < (rule.value as number)) {
              return { isValid: false, error: rule.message || `Minimum value is ${rule.value}` };
            }
            break;
          case "max":
            if (typeof answer === "number" && answer > (rule.value as number)) {
              return { isValid: false, error: rule.message || `Maximum value is ${rule.value}` };
            }
            break;
          case "pattern":
            if (typeof answer === "string" && rule.value) {
              const regex = new RegExp(rule.value as string);
              if (!regex.test(answer)) {
                return { isValid: false, error: rule.message || "Invalid format" };
              }
            }
            break;
          case "email":
            if (typeof answer === "string") {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(answer)) {
                return { isValid: false, error: rule.message || "Invalid email address" };
              }
            }
            break;
        }
      }

      return { isValid: true };
    },
    [state.currentQuestion]
  );

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  
  useEffect(() => {
    isMountedRef.current = true;
    initializeSession();
    
    return () => {
      isMountedRef.current = false;
    };
  }, [initializeSession]);

  // ==========================================================================
  // HEARTBEAT / KEEP-ALIVE - Prevents session timeout on production
  // ==========================================================================
  
  useEffect(() => {
    const currentSessionId = sessionIdRef.current;
    if (!currentSessionId || isComplete || isInitializing) return;
    
    const sendHeartbeat = async () => {
      try {
        // Simple ping to keep session alive
        await fetch(`${API_BASE}/api/assessment/session/${currentSessionId}`, {
          method: 'HEAD',
          headers: { 'X-Heartbeat': 'true' },
        });
      } catch (error) {
        // Silent fail - don't disrupt user experience
        console.debug('Heartbeat failed (non-critical):', error);
      }
    };
    
    const heartbeatInterval = setInterval(sendHeartbeat, CONFIG.HEARTBEAT_INTERVAL_MS);
    
    return () => clearInterval(heartbeatInterval);
  }, [sessionId, isComplete, isInitializing]);

  // ==========================================================================
  // SESSION SYNC POLLING - Detects updates from other devices
  // ==========================================================================
  
  useEffect(() => {
    const currentSessionId = sessionIdRef.current;
    if (!currentSessionId || isComplete || isInitializing) return;

    let lastKnownIndex = currentQuestionIndexRef.current;
    let hasShownSyncToast = false;
    const currentDeviceFP = deviceFingerprint;
    const sessionStartTime = Date.now();
    
    const checkForUpdates = async () => {
      try {
        const headers = await getAuthHeaders();

        const response = await fetch(
          `${API_BASE}/api/assessment/session/${currentSessionId}`,
          { headers }
        );

        if (!response.ok || !isMountedRef.current) return;

        const sessionData = await response.json();
        const backendQuestionsAnswered = sessionData.questions_answered || 0;
        const localQuestionsAnswered = currentQuestionIndexRef.current;
        const lastDeviceFP = sessionData.last_device_fingerprint;

        // Check if backend has more progress than local
        if (
          backendQuestionsAnswered > localQuestionsAnswered &&
          backendQuestionsAnswered > lastKnownIndex &&
          !hasShownSyncToast
        ) {
          const isDifferentDevice = lastDeviceFP && lastDeviceFP !== currentDeviceFP;
          const isRecentInit = Date.now() - sessionStartTime < 5000;
          
          if (!isRecentInit) {
            if (isDifferentDevice) {
              toast.warning("Progress from another device detected", {
                description: `Syncing to question ${backendQuestionsAnswered + 1}.`,
                duration: 4000,
              });
            } else {
              toast.info("Progress synced", {
                description: `Continuing from question ${backendQuestionsAnswered + 1}.`,
                duration: 2000,
              });
            }
            hasShownSyncToast = true;
          }

          // Rebuild queue from backend
          try {
            const { queue, currentIndex } = await rebuildQueueFromBackend(currentSessionId);
            if (queue.length > 0 && isMountedRef.current) {
              setQuestionQueue(queue);
              questionQueueRef.current = queue;
              setCurrentQuestionIndex(currentIndex);
              currentQuestionIndexRef.current = currentIndex;
              setState((prev) => ({
                ...prev,
                currentQuestion: queue[currentIndex] || null,
                progress: {
                  ...prev.progress,
                  current: backendQuestionsAnswered,
                  percentage: sessionData.progress || 0,
                },
              }));
              lastKnownIndex = backendQuestionsAnswered;
            }
          } catch (rebuildError) {
            console.warn("Failed to rebuild queue during sync:", rebuildError);
          }
        } else if (backendQuestionsAnswered === localQuestionsAnswered) {
          hasShownSyncToast = false; // Reset for future conflicts
        }
      } catch (error) {
        console.debug("Session sync check failed (non-critical):", error);
      }
    };

    const interval = setInterval(checkForUpdates, CONFIG.POLLING_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [sessionId, isComplete, isInitializing, getAuthHeaders, deviceFingerprint, rebuildQueueFromBackend]);

  // ==========================================================================
  // RETURN PUBLIC API
  // ==========================================================================
  
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
