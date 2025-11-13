// src/app/(main)/assessment/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useAssessmentSession } from "@/contexts/AssessmentSessionContext";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

export default function AssessmentPage() {
  const { startAssessment, session, archiveAndRestart } = useAssessmentSession();
  const router = useRouter();
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);

  const handleStartAssessment = () => {
    startAssessment();
    router.push("/assessment/wizard");
  };
  
  const handleRestartAssessment = async () => {
    try {
      const newSessionId = await archiveAndRestart();
      router.push("/assessment/wizard");
    } catch (error) {
      console.error("Error restarting assessment:", error);
      // archiveAndRestart already handles fallback, so just navigate
      router.push("/assessment/wizard");
    }
  };

  // Show continue option if user has existing progress
  const hasProgress = session.sessionId && (
    Object.keys(session.responses).length > 0 || 
    Object.keys(session.demographics).length > 0
  );
  
  // Check if assessment is completed
  const isCompleted = session.status === "completed" && session.completedAt;
  return (
    <div
      className="min-h-screen bg-white dark:bg-[#0c0c0c] text-slate-900 dark:text-white flex flex-col justify-start items-start p-4 md:justify-center md:items-center md:p-8"
      style={{
        fontFamily:
          '"Tiempos Headline", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      }}
    >
      <div className="text-left max-w-none md:text-center md:max-w-[800px]">
        {/* Subtitle */}
        <div className="font-sans text-[12px] font-normal text-slate-500 dark:text-[#888888] tracking-[0.8px] mt-8 mb-4 uppercase md:text-[14px] md:mb-6">
          The SELVE assessment
        </div>

        {/* Title */}
        <h1
          className="text-[clamp(3rem,10vw,6rem)] font-normal leading-[1.0] mb-12 text-slate-900 dark:text-white tracking-[-0.02em] md:text-[clamp(4rem,12vw,8rem)] md:mb-16"
          style={{
            fontFamily:
              '"Tiempos Headline", ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
          }}
        >
          What&apos;s really
          <br />
          driving you?
        </h1>

        {/* Description */}
        <div className="text-[16px] font-light text-slate-600 dark:text-[#b3b3b3] leading-[1.6] max-w-[500px] mx-0 md:text-[18px] md:mx-auto">
          <p className="mb-0">
            What if every choice carries echoes of things you never realized
            shaped you? Every mind hides secrets—some guide you toward light,
            others drag you into shadow. You live by those pulls without ever
            knowing, until now...
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16">
          {isCompleted ? (
            <div className="space-y-4">
              {/* Assessment Already Completed */}
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Assessment Completed!
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      You completed this assessment on {new Date(session.completedAt!).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link 
                        href={`/results/${session.sessionId}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
                      >
                        <span>View Your Results</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <motion.button
                        onClick={() => setShowRestartConfirm(true)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        <span>Take Again</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : hasProgress ? (
            <div className="space-y-4">{/* Continue Assessment Button */}
              <motion.button
                onClick={handleStartAssessment}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group relative cursor-pointer inline-block overflow-hidden rounded-2xl px-8 py-4 text-base font-bold shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white mr-4"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                <span className="relative z-10 flex items-center justify-between gap-3">
                  <span>Continue Assessment</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </motion.button>

              {/* Start Over Button */}
              <motion.button
                onClick={() => setShowRestartConfirm(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer inline-block overflow-hidden rounded-2xl px-6 py-3 text-sm font-medium border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                <span className="relative z-10 flex items-center justify-between gap-2">
                  <span>Start Over</span>
                </span>
              </motion.button>

              {/* Progress indicator */}
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                You have progress saved from {session.startedAt ? new Date(session.startedAt).toLocaleDateString() : 'your previous session'}
              </div>
            </div>
          ) : (
            <motion.button
              onClick={handleStartAssessment}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative cursor-pointer inline-block overflow-hidden rounded-2xl px-8 py-4 text-base font-bold shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 text-white"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <span className="relative z-10 flex items-center justify-between gap-3">
                <span>Start Assessment</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
              {/* continuous shine */}
              <span className="pointer-events-none absolute inset-0 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shine" />
              <style>{`
                @keyframes shine {
                  0% { transform: translateX(-120%) skewX(-20deg); opacity: 0; }
                  20% { opacity: 1; }
                  100% { transform: translateX(120%) skewX(-20deg); opacity: 0; }
                }
                .animate-shine {
                  animation: shine 2.5s linear infinite;
                }
              `}</style>
            </motion.button>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showRestartConfirm}
        onClose={() => setShowRestartConfirm(false)}
        onConfirm={handleRestartAssessment}
        title="Start a New Assessment?"
        description="Your previous results will be safely archived and you can view them anytime. Ready to discover how you've evolved?"
        confirmText="Start Fresh"
        cancelText="Keep Current"
        variant="info"
      />
    </div>
  );
}
