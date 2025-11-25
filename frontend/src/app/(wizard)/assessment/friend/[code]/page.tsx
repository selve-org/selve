// src/app/(wizard)/assessment/friend/[code]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ArtisticCanvas } from "@/components/wizard/ArtisticCanvas";
import { QuestionRenderer } from "@/components/wizard/QuestionRenderer";
import { ProgressBar } from "@/components/wizard/ProgressBar";
import { BackButton } from "@/components/wizard/BackButton";
import { SoundWaveLoader } from "@/components/shared/SoundWaveLoader";

/**
 * Friend Assessment Wizard
 *
 * Allows friends to complete the assessment about the inviter.
 * 
 * Features:
 * - Shows inviter's name in context
 * - Tracks response times
 * - Supports "Not Sure" option
 * - Submits quality-scored responses
 */

interface Question {
  item_id: string;
  text: string;
  dimension: string;
  reversed: boolean;
}

interface ResponseData {
  item_id: string;
  value: number | null;
  not_sure: boolean;
  response_time: number;
}

export default function FriendAssessmentPage() {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;

  // localStorage key for this specific invite
  const STORAGE_KEY = `friend_assessment_${code}`;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [inviterName, setInviterName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [assessmentStartTime] = useState<number>(Date.now());

  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);
  const [notSure, setNotSure] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  /**
   * Load saved progress from localStorage on mount
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { responses: savedResponses, currentIndex: savedIndex, timestamp } = JSON.parse(saved);
        
        // Check if saved data is less than 7 days old (match invite expiry)
        const age = Date.now() - timestamp;
        const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
        
        if (age < maxAge && savedResponses && savedResponses.length > 0) {
          setResponses(savedResponses);
          setCurrentIndex(savedIndex || savedResponses.length);
          
          toast.success("Progress restored", {
            description: `Continuing from question ${(savedIndex || savedResponses.length) + 1}`,
            duration: 4000,
          });
        }
      }
    } catch (err) {
      console.warn("Failed to restore progress:", err);
    }
  }, [STORAGE_KEY]);

  /**
   * Save progress to localStorage whenever responses change
   */
  useEffect(() => {
    if (typeof window === 'undefined' || responses.length === 0) return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        responses,
        currentIndex,
        timestamp: Date.now(),
      }));
    } catch (err) {
      console.warn("Failed to save progress:", err);
    }
  }, [responses, currentIndex, STORAGE_KEY]);

  /**
   * Warn user before leaving page if they have unsaved responses
   */
  useEffect(() => {
    if (responses.length === 0 || isSubmitting) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // Chrome requires this
      return ""; // Some browsers require a return value
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [responses.length, isSubmitting]);

  /**
   * Fetch questions on mount
   */
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${API_BASE}/api/invites/${code}/questions`);
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.detail || "Failed to load questions");
        }

        const data = await res.json();
        
        // Use inviter name from API response
        setInviterName(data.inviter_name || "your friend");
        
        setQuestions(data.questions);
        setQuestionStartTime(performance.now());
        setIsLoading(false);
      } catch (err: any) {
        console.error("Error fetching questions:", err);
        setError(err.message);
        setIsLoading(false);
        
        toast.error("Failed to load assessment", {
          description: err.message,
        });
      }
    };

    fetchQuestions();
  }, [code]);

  /**
   * Handle answer selection
   */
  const handleAnswerChange = (value: number | null, isNotSure: boolean) => {
    setCurrentAnswer(value);
    setNotSure(isNotSure);
  };

  /**
   * Submit current question and move to next
   */
  const handleNext = async () => {
    if (!notSure && currentAnswer === null) {
      toast.error("Please select an answer or choose 'Not Sure'");
      return;
    }

    const responseTime = performance.now() - questionStartTime;

    const response: ResponseData = {
      item_id: currentQuestion.item_id,
      value: notSure ? null : currentAnswer,
      not_sure: notSure,
      response_time: Math.round(responseTime),
    };

    const newResponses = [...responses, response];
    setResponses(newResponses);

    // Move to next question or submit
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentAnswer(null);
      setNotSure(false);
      setQuestionStartTime(performance.now());
    } else {
      // Final question - submit all responses
      await submitAllResponses(newResponses);
    }
  };

  /**
   * Submit all responses to backend
   */
  const submitAllResponses = async (allResponses: ResponseData[]) => {
    setIsSubmitting(true);

    try {
      const totalTime = Date.now() - assessmentStartTime;

      const payload = {
        responses: allResponses,
        total_time: totalTime,
        privacy_accepted: true,
      };

      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_BASE}/api/invites/${code}/responses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to submit responses");
      }

      const result = await res.json();

      // Clear localStorage after successful submission
      localStorage.removeItem(STORAGE_KEY);

      // Show success and redirect to thank you page
      toast.success("Thank you! 🎉", {
        description: `Your responses have been recorded (Quality: ${result.quality_score.toFixed(0)}/100)`,
        duration: 5000,
      });

      // Redirect to completion page
      router.push(`/assessment/friend/${code}/complete`);
    } catch (err: any) {
      console.error("Error submitting responses:", err);
      toast.error("Failed to submit responses", {
        description: err.message,
      });
      setIsSubmitting(false);
    }
  };

  /**
   * Go back to previous question
   */
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      
      // Restore previous answer
      const prevResponse = responses[currentIndex - 1];
      if (prevResponse) {
        setCurrentAnswer(prevResponse.value);
        setNotSure(prevResponse.not_sure);
        
        // Remove last response from array
        setResponses(responses.slice(0, -1));
      }
      
      setQuestionStartTime(performance.now());
    }
  };

  /**
   * Prevent browser back button
   */
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      window.history.pushState(null, "", window.location.href);

      toast.warning("Use the back button in the assessment", {
        description: "Your progress is automatically saved.",
        duration: 4000,
      });
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  /**
   * Loading State
   */
  if (isLoading) {
    return (
      <div className="dark min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <SoundWaveLoader />
          <p className="text-white/70 animate-pulse">Loading questions...</p>
        </div>
      </div>
    );
  }

  /**
   * Error State
   */
  if (error) {
    return (
      <div className="dark min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-2">Unable to Load Assessment</h1>
          <p className="text-white/70 mb-6">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  /**
   * Submitting State
   */
  if (isSubmitting) {
    return (
      <div className="dark min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <SoundWaveLoader />
          <p className="text-white/70 animate-pulse">Submitting your responses...</p>
        </div>
      </div>
    );
  }

  /**
   * Main Wizard
   */
  return (
    <div className="dark min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Split Screen Layout */}
      <div className="flex h-screen">
        {/* Left Side - Artistic Canvas (hidden on mobile/tablet) */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <ArtisticCanvas />
        </div>

        {/* Right Side - Question Form */}
        <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
              {/* Back Button */}
              {currentIndex > 0 && (
                <BackButton onClick={handleBack} />
              )}

              {/* Progress Bar */}
              <ProgressBar 
                current={currentIndex + 1}
                total={questions.length}
                percentage={Math.round(progress)}
              />

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 mb-6"
              >
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  Help us understand {inviterName} better
                </h1>
                <p className="text-white/60 text-lg">
                  Question {currentIndex + 1} of {questions.length}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Question Content */}
          <div className="flex-1 p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                {currentQuestion && (
                  <motion.div
                    key={currentQuestion.item_id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <QuestionRenderer
                      question={{
                        id: currentQuestion.item_id,
                        text: currentQuestion.text,
                        type: "likert-scale",
                        renderConfig: {
                          labels: {
                            1: "Strongly Disagree",
                            2: "Disagree",
                            3: "Neutral",
                            4: "Agree",
                            5: "Strongly Agree",
                          },
                        },
                      }}
                      value={notSure ? "not-sure" : currentAnswer}
                      onChange={(value) => {
                        if (value === "not-sure") {
                          handleAnswerChange(null, true);
                        } else {
                          handleAnswerChange(value as number, false);
                        }
                      }}
                    />

                    {/* Next Button */}
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={handleNext}
                        disabled={!notSure && currentAnswer === null}
                        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {currentIndex < questions.length - 1 ? "Next" : "Submit"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
