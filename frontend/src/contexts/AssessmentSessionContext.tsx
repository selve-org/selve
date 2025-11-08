"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

// TODO: Future database integration for logged-in users
// - Store session state in database for authenticated users
// - Sync local storage with user account
// - Handle session migration when user logs in mid-assessment
// - Implement session cleanup/expiry policies

interface AssessmentSession {
  sessionId: string | null;
  hasStartedAssessment: boolean;
  lastQuestionIndex: number;
  responses: Record<string, any>;
  demographics: Record<string, any>;
  startedAt: string | null;
  lastActiveAt: string | null;
}

interface AssessmentSessionContextType {
  session: AssessmentSession;
  startAssessment: () => void;
  saveProgress: (data: Partial<AssessmentSession>) => void;
  clearSession: () => void;
  canAccessWizard: boolean;
}

const AssessmentSessionContext = createContext<AssessmentSessionContextType | null>(null);

const STORAGE_KEY = "selve_assessment_session";
const SESSION_EXPIRY_HOURS = 24; // Sessions expire after 24 hours

function getStoredSession(): AssessmentSession {
  if (typeof window === "undefined") return getDefaultSession();
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultSession();
    
    const session = JSON.parse(stored) as AssessmentSession;
    
    // Check if session has expired
    if (session.lastActiveAt) {
      const lastActive = new Date(session.lastActiveAt);
      const now = new Date();
      const hoursSinceActive = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceActive > SESSION_EXPIRY_HOURS) {
        console.log("📅 Session expired, clearing...");
        localStorage.removeItem(STORAGE_KEY);
        return getDefaultSession();
      }
    }
    
    // Update last active time
    session.lastActiveAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    
    return session;
  } catch (error) {
    console.error("Error loading session:", error);
    return getDefaultSession();
  }
}

function getDefaultSession(): AssessmentSession {
  return {
    sessionId: null,
    hasStartedAssessment: false,
    lastQuestionIndex: 0,
    responses: {},
    demographics: {},
    startedAt: null,
    lastActiveAt: null,
  };
}

function saveSessionToStorage(session: AssessmentSession) {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch (error) {
    console.error("Error saving session:", error);
    // TODO: Fallback to sessionStorage or show user warning about storage issues
  }
}

interface AssessmentSessionProviderProps {
  children: ReactNode;
}

export function AssessmentSessionProvider({ children }: AssessmentSessionProviderProps) {
  const [session, setSession] = useState<AssessmentSession>(getDefaultSession);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Hydrate from localStorage on mount (client-side only)
  useEffect(() => {
    setSession(getStoredSession());
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever session changes
  useEffect(() => {
    if (isHydrated) {
      saveSessionToStorage(session);
    }
  }, [session, isHydrated]);

  // Route protection: redirect to /assessment if trying to access wizard without starting
  useEffect(() => {
    if (!isHydrated) return; // Wait for hydration
    
    const isWizardRoute = pathname?.includes("/assessment/wizard");
    const isResultsRoute = pathname?.includes("/results");
    
    if (isWizardRoute && !session.hasStartedAssessment) {
      console.log("🚫 Wizard access blocked - redirecting to assessment start");
      router.replace("/assessment");
    }
    
    // Don't protect results route - users might have direct links to their results
  }, [pathname, session.hasStartedAssessment, router, isHydrated]);

  // Prevent page unload for anonymous users with progress
  useEffect(() => {
    if (!isHydrated) return;
    
    // Only show warning for anonymous users with progress
    // TODO: Skip this for logged-in users (their progress is saved in database)
    const shouldWarnBeforeUnload = 
      session.hasStartedAssessment && 
      session.sessionId && 
      (Object.keys(session.responses).length > 0 || Object.keys(session.demographics).length > 0);

    if (!shouldWarnBeforeUnload) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Modern browsers show their own message, but we can still trigger the dialog
      event.preventDefault();
      event.returnValue = "You have unsaved assessment progress. Are you sure you want to leave?";
      return event.returnValue;
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Save progress when tab becomes hidden (user switching tabs)
        saveProgress({ lastActiveAt: new Date().toISOString() });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [session, isHydrated]);

  const startAssessment = useCallback(() => {
    setSession(prev => ({
      ...prev,
      hasStartedAssessment: true,
      startedAt: prev.startedAt || new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    }));
  }, []);

  const saveProgress = useCallback((data: Partial<AssessmentSession>) => {
    setSession(prev => ({
      ...prev,
      ...data,
      lastActiveAt: new Date().toISOString(),
    }));
  }, []);

  const clearSession = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    setSession(getDefaultSession());
  }, []);

  const canAccessWizard = session.hasStartedAssessment;

  const contextValue: AssessmentSessionContextType = {
    session,
    startAssessment,
    saveProgress,
    clearSession,
    canAccessWizard,
  };

  // Don't render children until hydrated to prevent SSR mismatch
  if (!isHydrated) {
    return <div className="min-h-screen bg-white dark:bg-[#0c0c0c] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>;
  }

  return (
    <AssessmentSessionContext.Provider value={contextValue}>
      {children}
    </AssessmentSessionContext.Provider>
  );
}

export function useAssessmentSession() {
  const context = useContext(AssessmentSessionContext);
  if (!context) {
    throw new Error("useAssessmentSession must be used within AssessmentSessionProvider");
  }
  return context;
}

// Utility hook for components that need to save progress
export function useAssessmentProgress() {
  const { saveProgress, session } = useAssessmentSession();
  
  const updateProgress = useCallback((updates: {
    sessionId?: string;
    responses?: Record<string, any>;
    demographics?: Record<string, any>;
    lastQuestionIndex?: number;
  }) => {
    saveProgress(updates);
  }, [saveProgress]);
  
  return {
    updateProgress,
    currentProgress: session,
  };
}