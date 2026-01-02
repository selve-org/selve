"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser, SignUpButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Share2, Link2, Check, X, Lock, MessageCircle, Sparkles, UserPlus, AlertCircle } from "lucide-react";
import { 
  FormattedText,
  LoadingSpinner,
  ErrorDisplay,
  NarrativeSection,
  ProfileHeader,
  CoreIdentitySection,
  OldFormatResults,
  FeedbackWidget,
  DIMENSION_NAMES, 
  DIMENSION_DETAILS,
  type AssessmentResults 
} from "./components";
import { FriendInsights } from "@/components/FriendInsights";
import { Header } from "@/components/header/Header";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Polling configuration
const POLLING_INTERVAL_MS = 2000;
const MAX_POLLING_DURATION_MS = 180000; // 3 minutes max
const MAX_RETRY_COUNT = 3;

type ResultsStatus = 'loading' | 'generating' | 'ready' | 'error' | 'not_found' | 'incomplete';

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded: userLoaded } = useUser();
  const sessionId = params.sessionId as string;

  // Results state
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Access control state
  const [isOwner, setIsOwner] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [shareId, setShareId] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);

  // Polling state
  const [resultsStatus, setResultsStatus] = useState<ResultsStatus>('loading');
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState<string>('Initializing...');
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  
  // Refs for polling control (prevents stale closures)
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const retryCountRef = useRef<number>(0);
  const isPollingRef = useRef<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef<boolean>(true);

  const chatbotBaseUrl = (process.env.NEXT_PUBLIC_CHATBOT_URL || "https://chat.selve.me").trim();
  const chatbotRedirect = `/auth/redirect?redirect_to=${encodeURIComponent(chatbotBaseUrl)}`;

  // Cleanup function to stop all polling and abort pending requests
  const cleanup = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    isPollingRef.current = false;
  }, []);

  // Fetch full results from the API
  const fetchFullResults = useCallback(async (): Promise<boolean> => {
    if (!isMountedRef.current) return false;
    
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      const response = await fetch(
        `${API_BASE}/api/assessment/${sessionId}/results`,
        { signal }
      );

      if (signal.aborted || !isMountedRef.current) return false;

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Failed to fetch results: ${response.status}`);
      }

      const data = await response.json();
      
      if (!isMountedRef.current) return false;
      
      setResults(data);
      setResultsStatus('ready');
      setIsLoading(false);
      cleanup();

      // Update user profile (non-blocking)
      if (data.demographics && data.scores && data.narrative) {
        fetch('/api/update-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            demographics: data.demographics,
            scores: data.scores,
            narrative: data.narrative,
          }),
        }).catch(err => console.error('Profile update failed:', err));
      }
      
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return false;
      if (!isMountedRef.current) return false;
      console.error('fetchFullResults error:', error);
      return false;
    }
  }, [sessionId, cleanup]);

  // Check results status via polling
  const checkResultsStatus = useCallback(async () => {
    if (!isMountedRef.current || isPollingRef.current) return;
    
    isPollingRef.current = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(
        `${API_BASE}/api/assessment/${sessionId}/results/status`,
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`Status check failed: ${response.status}`);

      const data = await response.json();
      if (!isMountedRef.current) return;

      switch (data.status) {
        case 'ready':
          setResultsStatus('ready');
          setGenerationProgress(100);
          setCurrentStep('Complete!');
          cleanup();
          await fetchFullResults();
          break;
          
        case 'generating':
          setResultsStatus('generating');
          // Use REAL progress from backend (0-100)
          const backendProgress = data.progress ?? 0;
          // Ensure we don't go backwards and cap at 95 until fully ready
          setGenerationProgress(prev => Math.max(prev, Math.min(95, backendProgress)));
          // Update current step and completed sections from backend
          if (data.current_step) setCurrentStep(data.current_step);
          if (data.completed_sections) setCompletedSections(data.completed_sections);
          break;
          
        case 'pending':
          // Assessment complete but results not generated yet
          // Don't call fetchFullResults() here - it blocks polling!
          // Instead, just set state and let polling continue
          // The backend will generate results on first /results call
          if (resultsStatus !== 'generating') {
            setResultsStatus('generating');
            startTimeRef.current = Date.now();
            setGenerationProgress(0);
            setCurrentStep('Starting generation...');
          }
          // Update progress if backend provides it during pending state
          const pendingProgress = data.progress ?? 0;
          if (pendingProgress > 0) {
            setGenerationProgress(prev => Math.max(prev, Math.min(95, pendingProgress)));
          }
          if (data.current_step) setCurrentStep(data.current_step);
          if (data.completed_sections) setCompletedSections(data.completed_sections);
          break;
          
        case 'incomplete':
          setResultsStatus('incomplete');
          setError('Assessment not complete. Please finish all questions first.');
          setIsLoading(false);
          cleanup();
          break;
          
        case 'not_found':
          setResultsStatus('not_found');
          setError(data.error_message || 'Session not found or expired');
          setIsLoading(false);
          cleanup();
          break;
          
        case 'error':
          setResultsStatus('error');
          setError(data.error_message || 'An error occurred');
          setIsLoading(false);
          cleanup();
          break;
      }

      retryCountRef.current = 0;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      
      retryCountRef.current += 1;
      if (retryCountRef.current >= MAX_RETRY_COUNT && isMountedRef.current) {
        setResultsStatus('error');
        setError('Unable to check results status. Please refresh the page.');
        setIsLoading(false);
        cleanup();
      }
    } finally {
      clearTimeout(timeoutId);
      isPollingRef.current = false;
    }
  }, [sessionId, resultsStatus, fetchFullResults, cleanup]);

  // Start polling
  const startPolling = useCallback(() => {
    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
    
    startTimeRef.current = Date.now();
    retryCountRef.current = 0;
    checkResultsStatus();
    
    pollingIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      if (elapsed > MAX_POLLING_DURATION_MS) {
        if (isMountedRef.current) {
          setResultsStatus('error');
          setError('Results generation timed out. Please try again later.');
          setIsLoading(false);
        }
        cleanup();
        return;
      }
      checkResultsStatus();
    }, POLLING_INTERVAL_MS);
  }, [checkResultsStatus, cleanup]);

  // Initialize on mount
  useEffect(() => {
    isMountedRef.current = true;
    
    async function initialize() {
      if (!sessionId || !userLoaded) return;
      
      try {
        const accessResponse = await fetch(
          `${API_BASE}/api/assessment/${sessionId}/results/check-access?clerk_user_id=${user?.id || ''}`
        );

        if (!isMountedRef.current) return;

        if (accessResponse.ok) {
          const accessData = await accessResponse.json();
          setIsOwner(accessData.isOwner);
          setIsPublic(accessData.isPublic);
          setShareId(accessData.publicShareId);

          if (!accessData.hasAccess) {
            router.replace('/');
            return;
          }
          
          if (accessData.resultsReady) {
            const success = await fetchFullResults();
            if (!success && isMountedRef.current) startPolling();
            return;
          }
        }

        startPolling();
      } catch (error) {
        console.error('Initialization error:', error);
        if (isMountedRef.current) {
          setError('Failed to initialize. Please refresh the page.');
          setIsLoading(false);
        }
      }
    }

    initialize();

    return () => {
      isMountedRef.current = false;
      cleanup();
    };
  }, [sessionId, userLoaded, user?.id, router, fetchFullResults, startPolling, cleanup]);

  // Share handlers
  const handleShare = async () => {
    if (!user?.id) return;
    setShareLoading(true);
    
    try {
      const response = await fetch(
        `${API_BASE}/api/assessment/${sessionId}/share?clerk_user_id=${user.id}`,
        { method: 'POST' }
      );
      
      if (response.ok) {
        const data = await response.json();
        setShareId(data.shareId);
        setIsPublic(true);
        
        const shareUrl = `${window.location.origin}/share/${data.shareId}`;
        await navigator.clipboard.writeText(shareUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch (error) {
      console.error('Failed to create share link:', error);
    } finally {
      setShareLoading(false);
    }
  };

  const handleCopyLink = async () => {
    if (!shareId) return;
    const shareUrl = `${window.location.origin}/share/${shareId}`;
    await navigator.clipboard.writeText(shareUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleToggleShare = async (enable: boolean) => {
    if (!user?.id) return;
    setShareLoading(true);
    
    try {
      const response = await fetch(
        `${API_BASE}/api/assessment/${sessionId}/share/toggle?clerk_user_id=${user.id}&enable=${enable}`,
        { method: 'POST' }
      );
      
      if (response.ok) {
        const data = await response.json();
        setIsPublic(data.isPublic);
        setShareId(data.shareId);
      }
    } catch (error) {
      console.error('Failed to toggle sharing:', error);
    } finally {
      setShareLoading(false);
      setShowShareMenu(false);
    }
  };

  // Loading state
  if (isLoading || resultsStatus === 'generating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-[#1a1a1a] dark:via-[#1c1c1c] dark:to-[#1a1520] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-purple-400/20 to-indigo-400/20 dark:from-purple-600/10 dark:to-indigo-600/10 blur-xl"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        <div className="text-center max-w-2xl px-6 relative z-10">
          <div className="relative mb-12 flex justify-center">
            <motion.div
              className="absolute w-32 h-32 rounded-full border-4 border-purple-200/30 dark:border-purple-700/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-24 h-24 rounded-full border-4 border-indigo-300/40 dark:border-indigo-600/40 border-t-transparent"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-2xl shadow-purple-500/50"
              animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 dark:from-purple-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto]"
            animate={{ backgroundPosition: ['0% center', '200% center'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            {resultsStatus === 'generating' ? 'Crafting Your Personality Blueprint' : 'Preparing Your Results'}
          </motion.h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Our AI is analyzing your responses and creating a unique narrative just for you...
          </p>

          {resultsStatus === 'generating' && (
            <div className="mb-8">
              {/* Progress bar */}
              <div className="relative w-full h-3 bg-gray-200/50 dark:bg-gray-800/50 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${generationProgress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              
              {/* Progress percentage and current step */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  {Math.round(generationProgress)}% Complete
                </span>
                <motion.span 
                  key={currentStep}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-gray-500 dark:text-gray-400"
                >
                  {currentStep}
                </motion.span>
              </div>
              
              {/* Completed sections list */}
              {completedSections.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  {completedSections.map((section, idx) => (
                    <motion.span
                      key={section}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      {section}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-8 p-4 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/30">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <Sparkles className="w-4 h-4 inline-block mr-2 text-purple-500" />
              Did you know? Your personality profile is as unique as your fingerprint!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !results) {
    return (
      <ErrorDisplay
        error={error}
        onRetakeAssessment={() => router.push("/assessment/wizard")}
      />
    );
  }

  const { narrative, scores } = results;
  const isIntegratedFormat = narrative.profile_pattern && narrative.sections;
  const hasOldFormat = narrative.archetype && narrative.dimensions;

  return (
    <div className="min-h-screen bg-white dark:bg-[#1c1c1c]">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16 pt-24">
        {/* Share Button */}
        {isOwner && (
          <div className="flex justify-end mb-6 relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-[#333] transition-colors shadow-sm cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">Share</span>
              {isPublic && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
                  Public
                </span>
              )}
            </button>
            
            {showShareMenu && (
              <div className="absolute right-0 top-12 w-72 bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Share your results</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Anyone with the link can view your personality profile
                  </p>
                </div>
                
                <div className="p-4 space-y-3">
                  {isPublic && shareId ? (
                    <>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg">
                        <Link2 className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-400 truncate flex-1">
                          {window.location.origin}/share/{shareId}
                        </span>
                      </div>
                      
                      <button
                        onClick={handleCopyLink}
                        disabled={shareLoading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:cursor-not-allowed"
                      >
                        {copySuccess ? <><Check className="w-4 h-4" />Copied!</> : <><Link2 className="w-4 h-4" />Copy Link</>}
                      </button>
                      
                      <button
                        onClick={() => handleToggleShare(false)}
                        disabled={shareLoading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:cursor-not-allowed"
                      >
                        <Lock className="w-4 h-4" />Make Private
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleShare}
                      disabled={shareLoading}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {shareLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Share2 className="w-4 h-4" />}
                      Create Shareable Link
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Integrated Format */}
        {isIntegratedFormat && (
          <>
            <ProfileHeader pattern={narrative.profile_pattern?.pattern} description={narrative.profile_pattern?.description} />
            {narrative.sections.core_identity && <CoreIdentitySection content={narrative.sections.core_identity} />}
            {narrative.sections.motivations && (
              <NarrativeSection title="Core Motivations" emoji="🎯" content={narrative.sections.motivations} gradient={{ from: "from-blue-500/20", to: "to-cyan-500/20" }} border="border-blue-200 dark:border-blue-900/50" delay={0.3} fullWidth={true} />
            )}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {narrative.sections.strengths && (
                <NarrativeSection title="Your Strengths" emoji="💪" content={narrative.sections.strengths} gradient={{ from: "from-green-500/20", to: "to-emerald-500/20" }} border="border-green-200 dark:border-green-900/50" delay={0.4} fullWidth={false} />
              )}
              {narrative.sections.conflicts && (
                <NarrativeSection title="Internal Conflicts" emoji="⚡" content={narrative.sections.conflicts} gradient={{ from: "from-amber-500/20", to: "to-orange-500/20" }} border="border-amber-200 dark:border-amber-900/50" delay={0.4} fullWidth={false} />
              )}
            </div>
            {narrative.sections.growth_areas && (
              <NarrativeSection title="Growth Areas" emoji="📈" content={narrative.sections.growth_areas} gradient={{ from: "from-orange-500/20", to: "to-red-500/20" }} border="border-orange-200 dark:border-orange-900/50" delay={0.5} fullWidth={true} />
            )}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {narrative.sections.relationships && (
                <NarrativeSection title="In Relationships" emoji="💝" content={narrative.sections.relationships} gradient={{ from: "from-rose-500/20", to: "to-pink-500/20" }} border="border-rose-200 dark:border-rose-900/50" delay={0.6} fullWidth={false} />
              )}
              {narrative.sections.work_style && (
                <NarrativeSection title="Work Style" emoji="💼" content={narrative.sections.work_style} gradient={{ from: "from-indigo-500/20", to: "to-purple-500/20" }} border="border-indigo-200 dark:border-indigo-900/50" delay={0.6} fullWidth={false} />
              )}
            </div>
          </>
        )}

        {/* Old Format Fallback */}
        {hasOldFormat && !isIntegratedFormat && <OldFormatResults narrative={narrative} scores={scores} />}

        {/* Friend Insights */}
        <FriendInsights sessionId={sessionId} selfScores={scores} />

        {/* Anonymous User CTA - Save Your Results */}
        {!user && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-16 mt-12"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-rose-900/20 border-2 border-amber-200 dark:border-amber-800/50 p-8">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-300/30 to-transparent dark:from-amber-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-rose-300/30 to-transparent dark:from-rose-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/25">
                      <AlertCircle className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center md:text-left">
                      Don't Lose Your Results!
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-center md:text-left">
                      You're viewing your results as a guest. <strong className="text-amber-700 dark:text-amber-400">These results are temporary and will disappear</strong> when you close this page. 
                      You'll need to retake the entire assessment to see them again.
                    </p>
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 mb-6">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        ✨ Create a free account to:
                      </p>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <li className="flex items-center gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400">✓</span>
                          <span><strong>Permanently save</strong> your personality profile</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400">✓</span>
                          <span><strong>Share</strong> your results with friends and family</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400">✓</span>
                          <span><strong>Access SELVE-Chat</strong> for personalized insights</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400">✓</span>
                          <span><strong>Track your growth</strong> over time</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <SignUpButton mode="modal" forceRedirectUrl={`/results/${sessionId}`}>
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer">
                          <UserPlus className="w-5 h-5" />
                          Create Free Account
                        </button>
                      </SignUpButton>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        Takes less than 30 seconds • No credit card required
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Dimension Scores */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mb-16 mt-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Your Dimension Scores</h2>
          <div className="space-y-6">
            {Object.entries(scores).map(([dim, score], i) => {
              const details = DIMENSION_DETAILS[dim];
              return (
                <motion.div key={dim} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.05 }}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      {details && <span className="text-xl">{details.emoji}</span>}
                      <span>{dim} {details && <span className="text-gray-500 dark:text-gray-400 text-sm">({DIMENSION_NAMES[dim]})</span>}</span>
                    </span>
                    <span className="text-purple-600 dark:text-purple-400 font-bold">{Math.round(score)}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-[#2e2e2e] rounded-full h-3 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ delay: 0.9 + i * 0.05, duration: 0.6 }} className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Feedback Widget */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mb-16">
          <FeedbackWidget sessionId={sessionId} />
        </motion.div>

        {/* Actions */}
        <div className="mt-12 flex justify-center gap-4">
          <button onClick={() => window.print()} className="px-6 py-3 bg-gray-200 dark:bg-[#2e2e2e] hover:bg-gray-300 dark:hover:bg-[#3e3e3e] text-gray-900 dark:text-white rounded-full transition-colors cursor-pointer">Download PDF</button>
          <button onClick={() => router.push("/")} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors cursor-pointer">Return Home</button>
        </div>

        {/* SELVE-Chat Section */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="mt-20 mb-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800/50 p-8 text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/50 to-transparent dark:from-purple-600/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/50 to-transparent dark:from-indigo-600/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative">
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/25 mb-3">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 dark:bg-purple-800/40 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                  <Sparkles className="w-3 h-3" />Available Now
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Explore Yourself Deeper with SELVE-Chat</h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto leading-relaxed">
                SELVE-Chat uses your blueprint to answer questions, rehearse scenarios, and keep you on track.
              </p>
              
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#2a2a2a] rounded-full text-sm text-gray-600 dark:text-gray-300 shadow-sm">💬 Personal insights</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#2a2a2a] rounded-full text-sm text-gray-600 dark:text-gray-300 shadow-sm">🎯 Growth guidance</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#2a2a2a] rounded-full text-sm text-gray-600 dark:text-gray-300 shadow-sm">🔮 Pattern exploration</span>
              </div>

              <div className="mt-8 flex justify-center">
                <button onClick={() => router.push(chatbotRedirect)} className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-sm font-semibold transition-colors cursor-pointer">
                  <MessageCircle className="w-4 h-4" />Open SELVE-Chat
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
