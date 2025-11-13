// src/app/(wizard)/assessment/wizard/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ArtisticCanvas } from "@/components/wizard/ArtisticCanvas";
import { QuestionRenderer } from "@/components/wizard/QuestionRenderer";
import { ProgressBar } from "@/components/wizard/ProgressBar";
import { Checkpoint } from "@/components/wizard/Checkpoint";
import { BackButton } from "@/components/wizard/BackButton";
import { BackWarningModal } from "@/components/wizard/BackWarningModal";
import { ResultsGeneratingLoader } from "@/components/wizard/ResultsGeneratingLoader";
import { SoundWaveLoader } from "@/components/shared/SoundWaveLoader";
import AssessmentLoader from "@/components/wizard/AssessmentLoader";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";

/**
 * WizardPage Component
 *
 * Main questionnaire wizard with split-screen layout:
 * - Left: Artistic Canvas (hidden on mobile/tablet)
 * - Right: Question Form (scrollable)
 *
 * Features:
 * - Adaptive question flow
 * - Progress tracking
 * - Checkpoint milestones
 * - Back navigation with warning
 * - Responsive design
 * - Beautiful animations
 */
export default function WizardPage() {
  const {
    currentQuestion,
    isLoading,
    isInitializing,
    error,
    progress,
    showCheckpoint,
    isComplete,
    canGoBack,
    warningMessage,
    submitAnswer,
    goBack,
    checkCanGoBack,
    skipQuestion,
    continueFromCheckpoint,
    validateAnswer,
    getAnswer,
  } = useQuestionnaire();

  const [currentAnswer, setCurrentAnswer] = useState<unknown>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showBackWarning, setShowBackWarning] = useState(false);
  const [backLockedMessage, setBackLockedMessage] = useState<string | null>(
    null
  );
  const [hasShownCompletionToast, setHasShownCompletionToast] = useState(false);

  /**
   * Prevent browser back button navigation
   */
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      
      // Push current state back to prevent navigation
      window.history.pushState(null, '', window.location.href);
      
      // Show warning
      toast.warning("Use the back button in the assessment", {
        description: "Your progress is automatically saved. Use the arrow button to go back to previous questions.",
        duration: 4000,
      });
    };

    // Push initial state
    window.history.pushState(null, '', window.location.href);
    
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  /**
   * Show celebration toast when assessment completes
   */
  useEffect(() => {
    if (isComplete && !hasShownCompletionToast) {
      toast.success("Assessment Complete! 🎉", {
        description: "Generating your personalized personality profile...",
        duration: 5000,
      });
      setHasShownCompletionToast(true);
    }
  }, [isComplete, hasShownCompletionToast]);

  /**
   * Update current answer when question changes (including when going back)
   */
  useEffect(() => {
    if (currentQuestion) {
      const existingAnswer = getAnswer(currentQuestion.id);
      setCurrentAnswer(existingAnswer ?? null);
      setValidationError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion?.id]);

  /**
   * Handle answer change from input components
   */
  const handleAnswerChange = (value: unknown) => {
    setCurrentAnswer(value);
    setValidationError(null); // Clear error on change
  };

  /**
   * Handle back button click - check if back is allowed first
   */
  const handleBackClick = async () => {
    // Check if back is possible before showing modal
    const { canGoBack: backAllowed, warning } = await checkCanGoBack();

    if (!backAllowed) {
      // Show locked message instead of modal
      setBackLockedMessage(warning || "Cannot go back at this time");
      // Auto-hide after 5 seconds
      setTimeout(() => setBackLockedMessage(null), 5000);
    } else {
      // Show warning modal
      setShowBackWarning(true);
    }
  };

  /**
   * Confirm going back (after warning)
   */
  const handleBackConfirm = async () => {
    setShowBackWarning(false);
    await goBack();
  };

  /**
   * Cancel going back
   */
  const handleBackCancel = () => {
    setShowBackWarning(false);
  };

  /**
   * Handle form submission (Next button)
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentQuestion) return;

    // Validate answer
    const validation = validateAnswer(currentAnswer);
    if (!validation.isValid) {
      setValidationError(validation.error || "Invalid answer");
      return;
    }

    // Submit answer
    await submitAnswer(currentQuestion.id, currentAnswer);

    // Reset for next question
    setCurrentAnswer(null);
    setValidationError(null);
  };

  /**
   * Handle skip button
   */
  const handleSkip = () => {
    if (currentQuestion?.isRequired) {
      setValidationError("This question is required");
      return;
    }
    skipQuestion();
    setCurrentAnswer(null);
    setValidationError(null);
  };

  return (
    <>
      {/* Initialization Loading Screen */}
      {isInitializing && (
        <AssessmentLoader message="Checking for saved progress..." />
      )}
      
      {/* Main Assessment Interface - Only show when not initializing */}
      {!isInitializing && (
        <div className="flex min-h-screen bg-[#1c1c1c] dark:bg-[#1c1c1c] bg-white text-foreground">
      {/* Left Side: Artistic Canvas (hidden on mobile/tablet) */}
      <div className="hidden lg:block lg:w-1/2 lg:fixed lg:left-0 lg:top-0 lg:h-screen">
        <ArtisticCanvas />
      </div>

      {/* Right Side: Question Form (scrollable) */}
      <div className="w-full lg:w-1/2 lg:ml-auto min-h-screen bg-white dark:bg-[#1c1c1c] flex flex-col">
        <div className="max-w-[512px] mx-auto px-5 md:px-0 py-16 flex-1 flex flex-col">
          {/* Header with section title */}
          <div className="text-center pt-10 pb-8">
            <h1 className="text-[36px] font-black leading-10 text-gray-900 dark:text-white mb-2">
              Let&apos;s Decipher You!
            </h1>
            <p className="text-sm text-gray-600 dark:text-[#999999] leading-5 px-4 md:px-3">
              Your data isn&apos;t shared with anyone and remains completely
              private.
            </p>
          </div>

          {/* Back Locked Alert Banner */}
          <AnimatePresence>
            {backLockedMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mx-5 mb-4 overflow-hidden"
              >
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                        {backLockedMessage}
                      </p>
                    </div>
                    <button
                      onClick={() => setBackLockedMessage(null)}
                      className="flex-shrink-0 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content */}
          <motion.div layout className="flex-1 px-5 overflow-hidden">
            <AnimatePresence mode="wait">
              {/* Loading State */}
              {isLoading && (
                <motion.div
                  key="loading"
                  className="flex flex-col items-center justify-center h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SoundWaveLoader size="md" color="purple" text="Loading" />
                </motion.div>
              )}

              {/* Error State */}
              {error && !isLoading && (
                <motion.div
                  key="error"
                  className="flex flex-col items-center justify-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500 flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <p className="text-red-400 text-center text-sm">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-3 bg-gray-200 dark:bg-[#2e2e2e] hover:bg-gray-300 dark:hover:bg-[#3e3e3e] text-gray-900 dark:text-white rounded-full transition-colors text-sm"
                  >
                    Retry
                  </button>
                </motion.div>
              )}

              {/* Checkpoint Display */}
              {showCheckpoint && !isLoading && (
                <Checkpoint
                  key={`checkpoint-${showCheckpoint.id}`}
                  checkpoint={showCheckpoint}
                  onContinue={continueFromCheckpoint}
                />
              )}

              {/* Completion State - Results Generating */}
              {isComplete && !isLoading && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ResultsGeneratingLoader />
                </motion.div>
              )}

              {/* Question Form */}
              {currentQuestion &&
                !isLoading &&
                !showCheckpoint &&
                !isComplete && (
                  <motion.form
                    key={currentQuestion.id}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Question Renderer */}
                    <QuestionRenderer
                      question={currentQuestion}
                      value={currentAnswer ?? getAnswer(currentQuestion.id)}
                      onChange={handleAnswerChange}
                      error={validationError || undefined}
                    />

                    {/* Action buttons */}
                    <div className="flex gap-3 items-center">
                      {/* Back button */}
                      <BackButton
                        onClick={handleBackClick}
                        disabled={!canGoBack}
                        isLoading={isLoading}
                      />

                      {/* Continue button */}
                      <button
                        type="submit"
                        disabled={isLoading || !currentAnswer}
                        className="flex-1 px-8 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-200 dark:disabled:bg-[#2e2e2e] 
                        text-white disabled:text-gray-400 dark:disabled:text-[#4d4d4d] font-normal rounded-full
                        transition-all duration-200 disabled:cursor-not-allowed text-sm"
                      >
                        {isLoading ? "Submitting..." : "Continue"}
                      </button>
                    </div>

                    {/* Skip Link */}
                    {!currentQuestion.isRequired && (
                      <div className="text-center pt-1 pb-5">
                        <button
                          type="button"
                          onClick={handleSkip}
                          className="text-gray-500 dark:text-[#666666] hover:text-gray-700 dark:hover:text-[#999999] text-sm transition-colors"
                        >
                          Skip
                        </button>
                      </div>
                    )}
                  </motion.form>
                )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="text-center py-6">
          <p className="text-gray-400 dark:text-[#666666] text-xs">
            © Copyright 2025 - SELVE | All Rights Reserved
          </p>
        </div>
      </div>

      {/* Back Warning Modal */}
      <BackWarningModal
        isOpen={showBackWarning}
        onConfirm={handleBackConfirm}
        onCancel={handleBackCancel}
        warningMessage={warningMessage}
      />
        </div>
      )}
    </>
  );
}
