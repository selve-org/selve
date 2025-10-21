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
    <div className="flex min-h-screen bg-black text-white">
      {/* Left Side: Artistic Canvas (hidden on mobile/tablet) */}
      <div className="hidden lg:block lg:w-1/2 lg:fixed lg:left-0 lg:top-0 lg:h-screen">
        <ArtisticCanvas />
      </div>

      {/* Right Side: Question Form (scrollable) */}
      <div className="w-full lg:w-1/2 lg:ml-auto min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-8 md:px-12 md:py-12">
          {/* Progress Bar */}
          {!isComplete && !showCheckpoint && (
            <ProgressBar
              current={progress.current}
              total={progress.total}
              percentage={progress.percentage}
              className="mb-8"
            />
          )}

          {/* Content */}
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
                <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mb-4" />
                <p className="text-gray-400">Loading...</p>
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
                <div className="w-16 h-16 rounded-full bg-red-500/20 border-4 border-red-500 flex items-center justify-center mb-4">
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
                <p className="text-red-400 text-center">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
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
                  className="w-24 h-24 rounded-full bg-green-500/20 border-4 border-green-500 flex items-center justify-center mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <svg
                    className="w-12 h-12 text-green-400"
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
                <h1 className="text-4xl font-bold mb-4">You&apos;re All Done!</h1>
                <p className="text-xl text-gray-400 mb-8 max-w-lg">
                  Thank you for completing the assessment. Your profile is being generated.
                </p>
                <a
                  href="/"
                  className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full
                    shadow-lg shadow-green-500/30 transition-all duration-200
                    hover:scale-105 active:scale-95"
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
                className="space-y-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Question Renderer */}
                <QuestionRenderer
                  question={currentQuestion}
                  value={currentAnswer ?? getAnswer(currentQuestion.id)}
                  onChange={handleAnswerChange}
                  error={validationError || undefined}
                />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  {/* Skip Button (only if not required) */}
                  {!currentQuestion.isRequired && (
                    <button
                      type="button"
                      onClick={handleSkip}
                      className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-full
                        transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      Skip
                    </button>
                  )}

                  {/* Next Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-8 py-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 
                      text-white font-medium rounded-full shadow-lg shadow-green-500/30
                      transition-all duration-200 hover:scale-105 active:scale-95
                      disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
                  >
                    {isLoading ? "Submitting..." : "Next →"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

