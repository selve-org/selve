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
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Assessment Already Completed */}
              <div className="relative p-8 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/30 dark:via-green-950/20 dark:to-teal-950/30 border-2 border-emerald-200/80 dark:border-emerald-700/50 rounded-3xl shadow-lg shadow-emerald-100/50 dark:shadow-emerald-950/50 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/20 dark:bg-emerald-700/10 rounded-full blur-3xl -z-0" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-200/20 dark:bg-teal-700/10 rounded-full blur-3xl -z-0" />
                
                <div className="relative z-10 flex flex-col items-center text-center gap-6">
                  {/* Success Icon with animation */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2 
                    }}
                    className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                  </motion.div>
                  
                  {/* Title */}
                  <div>
                    <h3 
                      className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-emerald-700 to-green-700 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent mb-2"
                      style={{ fontFamily: '"Tiempos Headline", ui-serif, Georgia, serif' }}
                    >
                      Assessment Completed!
                    </h3>
                    <p className="text-base text-slate-600 dark:text-slate-400 font-light" style={{ fontFamily: 'var(--font-inter)' }}>
                      You completed this assessment on{' '}
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {new Date(session.completedAt!).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
                    <Link 
                      href={`/results/${session.sessionId}`}
                      className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 hover:scale-[1.02] active:scale-[0.98]"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      <span>View Your Results</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <motion.button
                      onClick={() => setShowRestartConfirm(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-2xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      <span>Take Again</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
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
