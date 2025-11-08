// src/app/(main)/assessment/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useAssessmentSession } from "@/contexts/AssessmentSessionContext";

export default function AssessmentPage() {
  const { startAssessment, session } = useAssessmentSession();
  const router = useRouter();

  const handleStartAssessment = () => {
    startAssessment();
    router.push("/assessment/wizard");
  };

  // Show continue option if user has existing progress
  const hasProgress = session.sessionId && (
    Object.keys(session.responses).length > 0 || 
    Object.keys(session.demographics).length > 0
  );
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
          {hasProgress ? (
            <div className="space-y-4">
              {/* Continue Assessment Button */}
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
                onClick={() => {
                  if (confirm("Are you sure you want to start over? This will delete your current progress.")) {
                    // Clear session and start fresh
                    localStorage.removeItem("selve_assessment_session");
                    startAssessment();
                    router.push("/assessment/wizard");
                  }
                }}
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
    </div>
  );
}
