// src/app/(wizard)/assessment/wizard/page.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArtisticCanvas } from "@/components/wizard/ArtisticCanvas";
import { QuestionRenderer } from "@/components/wizard/QuestionRenderer";
import { ProgressBar } from "@/components/wizard/ProgressBar";
import { Checkpoint } from "@/components/wizard/Checkpoint";
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
 * - Responsive design
 * - Beautiful animations
 */
export default function WizardPage() {
  const {
    currentQuestion,
    isLoading,
    error,
    progress,
    showCheckpoint,
    isComplete,
    submitAnswer,
    skipQuestion,
    continueFromCheckpoint,
    validateAnswer,
    getAnswer,
  } = useQuestionnaire();

  const [currentAnswer, setCurrentAnswer] = useState<unknown>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  /**
   * Handle answer change from input components
   */
  const handleAnswerChange = (value: unknown) => {
    setCurrentAnswer(value);
    setValidationError(null); // Clear error on change
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
              Your data isn&apos;t shared with anyone and remains completely private.
            </p>
          </div>

          {/* Content */}
          <div className="flex-1 px-5">
            <AnimatePresence mode="wait">
              {/* Loading State */}
              {isLoading && (
                <motion.div
                  key="loading"
                  className="flex flex-col items-center justify-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-12 h-12 border-2 border-gray-300 dark:border-[#2e2e2e] border-t-gray-900 dark:border-t-white rounded-full animate-spin mb-4" />
                  <p className="text-gray-600 dark:text-[#999999] text-sm">
                    Loading...
                  </p>
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

              {/* Completion State */}
              {isComplete && !isLoading && (
                <motion.div
                  key="complete"
                  className="flex flex-col items-center justify-center py-20 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-purple-600/20 border-4 border-purple-600 flex items-center justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <svg
                      className="w-10 h-10 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                  <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                    You&apos;re All Done!
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-[#999999] mb-8 max-w-md">
                    Thank you for completing the assessment. Your profile is
                    being generated.
                  </p>
                  <a
                    href="/"
                    className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full
                      transition-all duration-200 hover:scale-105 active:scale-95 text-sm"
                  >
                    Return Home
                  </a>
                </motion.div>
              )}

              {/* Question Form */}
              {currentQuestion && !isLoading && !showCheckpoint && (
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

                  {/* Continue Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !currentAnswer}
                    className="w-full px-8 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-200 dark:disabled:bg-[#2e2e2e] 
                      text-white disabled:text-gray-400 dark:disabled:text-[#4d4d4d] font-normal rounded-full
                      transition-all duration-200 disabled:cursor-not-allowed text-sm"
                  >
                    {isLoading ? "Submitting..." : "Continue"}
                  </button>

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
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="text-center py-6">
          <p className="text-gray-400 dark:text-[#666666] text-xs">
            © Copyright 2025 - SELVE | All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
