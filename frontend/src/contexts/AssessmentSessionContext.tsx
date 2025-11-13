"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

// Session state will be stored in:
// - localStorage for anonymous users (temporary, 24hr expiry)
// - Database for authenticated users (permanent, linked to Clerk ID)
// - When user signs in, anonymous session is transferred to their account

interface AssessmentSession {
  sessionId: string | null;
  hasStartedAssessment: boolean;
  lastQuestionIndex: number;
  responses: Record<string, any>;
  demographics: Record<string, any>;
  startedAt: string | null;
  lastActiveAt: string | null;
  status: "in-progress" | "completed" | "abandoned";
  completedAt: string | null;
}

interface AssessmentSessionContextType {
  session: AssessmentSession;
  startAssessment: () => void;
  saveProgress: (data: Partial<AssessmentSession>) => void;
  clearSession: () => void;
  archiveAndRestart: () => Promise<string | null>; // Returns new session ID or null on error
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
    status: "in-progress",
    completedAt: null,
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

async function transferSessionToUser(
  sessionId: string, 
  userId: string,
  getToken: () => Promise<string | null>
): Promise<void> {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  
  const token = await getToken();
  
  const response = await fetch(`${API_BASE}/api/assessment/transfer-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` }),
    },
    body: JSON.stringify({ session_id: sessionId }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to transfer session: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data;
}

async function fetchSessionStatus(sessionId: string): Promise<{ 
  status: string; 
  completedAt: string | null;
  questions_answered: number;
} | null> {
  if (!sessionId) {
    console.warn("⚠️ fetchSessionStatus called with empty sessionId");
    return null;
  }
  
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  
  try {
    const response = await fetch(`${API_BASE}/api/assessment/session/${sessionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log("📭 Session not found in database (might be anonymous or expired)");
        return null;
      }
      
      const errorText = await response.text();
      console.error(`❌ Failed to fetch session status: ${response.status} ${errorText}`);
      return null;
    }
    
    const data = await response.json();
    return {
      status: data.status || "in-progress",
      completedAt: data.completed_at || null,
      questions_answered: data.questions_answered || 0,
    };
    
  } catch (error) {
    console.error("❌ Error fetching session status:", error);
    // Network errors, etc. - not fatal, just return null
    return null;
  }
}

async function fetchCurrentSession(clerkUserId: string): Promise<{
  session_id: string;
  status: string;
  created_at: string;
  completed_at: string | null;
} | null> {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  
  try {
    const response = await fetch(`${API_BASE}/api/assessment/current/${clerkUserId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      console.error(`❌ Failed to fetch current session: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    return data.current_assessment || null;
    
  } catch (error) {
    console.error("❌ Error fetching current session:", error);
    return null;
  }
}

interface AssessmentSessionProviderProps {
  children: ReactNode;
}

export function AssessmentSessionProvider({ children }: AssessmentSessionProviderProps) {
  const [session, setSession] = useState<AssessmentSession>(getDefaultSession);
  const [isHydrated, setIsHydrated] = useState(false);
  const [hasTransferredSession, setHasTransferredSession] = useState(false);
  const hasShownTransferToastRef = useRef(false); // Track if we've shown the toast
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoaded: isUserLoaded } = useUser();
  const { getToken } = useAuth();

  // Hydrate from localStorage on mount (client-side only)
  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedSession = getStoredSession();
        
        // For authenticated users, always check what their CURRENT session is on backend
        // This prevents showing old completed sessions when they have a new active one
        if (isUserLoaded && user?.id) {
          console.log(`🔍 Checking current session for user: ${user.id}`);
          const currentSession = await fetchCurrentSession(user.id);
          
          if (currentSession) {
            // Backend has a current session for this user
            if (currentSession.session_id !== storedSession.sessionId) {
              // localStorage has wrong/old session - sync with backend current
              console.log(`🔄 Syncing to current session: ${currentSession.session_id}`);
              storedSession.sessionId = currentSession.session_id;
              storedSession.status = currentSession.status as "in-progress" | "completed" | "abandoned";
              storedSession.completedAt = currentSession.completed_at;
              storedSession.startedAt = currentSession.created_at;
              storedSession.hasStartedAssessment = true;
              saveSessionToStorage(storedSession);
            } else {
              // localStorage session matches backend current - just update status
              storedSession.status = currentSession.status as "in-progress" | "completed" | "abandoned";
              storedSession.completedAt = currentSession.completed_at;
              saveSessionToStorage(storedSession);
            }
          } else if (storedSession.sessionId) {
            // localStorage has a session but backend says no current session
            // This means the stored session was archived - fetch its status
            console.log(`🔍 Checking stored session status: ${storedSession.sessionId}`);
            const statusData = await fetchSessionStatus(storedSession.sessionId);
            if (statusData) {
              storedSession.status = statusData.status as "in-progress" | "completed" | "abandoned";
              storedSession.completedAt = statusData.completedAt;
              saveSessionToStorage(storedSession);
            }
          }
        } else if (storedSession.sessionId) {
          // Anonymous user - just check the stored session's status
          console.log(`🔄 Checking status for session: ${storedSession.sessionId}`);
          const statusData = await fetchSessionStatus(storedSession.sessionId);
          
          if (statusData) {
            storedSession.status = statusData.status as "in-progress" | "completed" | "abandoned";
            storedSession.completedAt = statusData.completedAt;
            console.log(`✅ Session status synced: ${statusData.status}`);
            saveSessionToStorage(storedSession);
          } else {
            console.log("📝 Using local session data (backend status unavailable)");
          }
        }
        
        setSession(storedSession);
        
      } catch (error) {
        console.error("❌ Error loading session:", error);
        // On error, use default session to prevent app crash
        setSession(getDefaultSession());
      } finally {
        setIsHydrated(true);
      }
    };
    
    loadSession();
  }, [isUserLoaded, user?.id]);

  // Save to localStorage whenever session changes
  useEffect(() => {
    if (isHydrated) {
      saveSessionToStorage(session);
    }
  }, [session, isHydrated]);

  // Define state-updating functions (before they're used in effects)
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

  const archiveAndRestart = useCallback(async (): Promise<string | null> => {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    
    try {
      // Get Clerk user ID if available
      const clerkUserId = user?.id;
      
      if (!clerkUserId) {
        // For anonymous users, just clear localStorage and start fresh
        console.log("📦 Anonymous user - clearing local session");
        clearSession();
        startAssessment();
        return null;
      }
      
      // For authenticated users, archive on backend
      const token = await getToken();
      const response = await fetch(`${API_BASE}/api/assessment/archive-and-restart?clerk_user_id=${clerkUserId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` }),
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to archive assessment: ${response.statusText}`);
      }
      
      const data = await response.json();
      const newSessionId = data.new_session_id;
      
      console.log(`✅ Archived ${data.archived_count} assessment(s), created new session: ${newSessionId}`);
      
      // Show success toast
      if (data.archived_count > 0) {
        toast.success("Previous assessment saved!", {
          description: `Your ${data.archived_count} previous ${data.archived_count === 1 ? 'assessment' : 'assessments'} archived successfully. Starting fresh!`,
          duration: 4000,
        });
      } else {
        toast.success("Starting fresh assessment", {
          description: "Ready to discover your personality profile",
          duration: 3000,
        });
      }
      
      // Clear local storage and create new session with the ID from backend
      localStorage.removeItem(STORAGE_KEY);
      setSession({
        ...getDefaultSession(),
        sessionId: newSessionId,
        hasStartedAssessment: true,
        startedAt: new Date().toISOString(),
      });
      
      return newSessionId;
      
    } catch (error) {
      console.error("❌ Failed to archive and restart:", error);
      toast.error("Couldn't save to server", {
        description: "No worries! Starting fresh locally instead. Your progress will still be saved.",
        duration: 5000,
      });
      
      // Fallback: clear locally if backend fails
      clearSession();
      startAssessment();
      return null;
    }
  }, [user, getToken, clearSession, startAssessment]);

  // Transfer anonymous session when user signs in
  useEffect(() => {
    if (!isHydrated || !isUserLoaded || hasTransferredSession) return;
    
    // User just signed in and has an active anonymous session
    if (user && session.sessionId && !session.sessionId.includes(user.id)) {
      console.log("🔄 Transferring anonymous session to authenticated user...");
      
      transferSessionToUser(session.sessionId, user.id, getToken)
        .then(() => {
          console.log("✅ Session transferred successfully");
          
          // Only show toast if user is on assessment-related page and haven't shown it yet
          const isAssessmentPage = pathname?.includes("/assessment") || pathname?.includes("/results");
          
          if (isAssessmentPage && !hasShownTransferToastRef.current) {
            toast.success("Progress saved to your account!", {
              description: "You can now continue your assessment from any device, anytime.",
              duration: 5000,
            });
            hasShownTransferToastRef.current = true;
          }
          
          setHasTransferredSession(true);
          
          // Update session with user info
          saveProgress({ 
            lastActiveAt: new Date().toISOString() 
          });
        })
        .catch((error: Error) => {
          console.error("❌ Failed to transfer session:", error);
          
          // Only show error toast on assessment pages
          const isAssessmentPage = pathname?.includes("/assessment") || pathname?.includes("/results");
          
          if (isAssessmentPage) {
            toast.error("Couldn't sync to your account", {
              description: "Don't worry - your progress is still saved on this device.",
              duration: 5000,
            });
          }
        });
    }
  }, [user, isUserLoaded, session.sessionId, isHydrated, hasTransferredSession, saveProgress, getToken, pathname]);

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
  }, [session, isHydrated, saveProgress]);

  const canAccessWizard = session.hasStartedAssessment;

  const contextValue: AssessmentSessionContextType = {
    session,
    startAssessment,
    saveProgress,
    clearSession,
    archiveAndRestart,
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