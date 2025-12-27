"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { MouseEvent } from "react";

import { GlobalAnimations } from "./components/GlobalAnimations";
import { currentColors } from "./components/colors";
import { RoadmapViz } from "./components/visuals/OutcomeVisuals";
import { steps } from "./data/steps";
import { outcomes } from "./data/outcomes";

// Smooth scroll with custom ease-in-out (slow → fast → slow)
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const smoothScrollTo = (targetY: number, duration = 950) => {
  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  const startTime = performance.now();

  const tick = (now: number) => {
    const elapsed = Math.min((now - startTime) / duration, 1);
    const eased = easeInOutCubic(elapsed);
    window.scrollTo(0, startY + distance * eased);
    if (elapsed < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

// ═══════════════════════════════════════════════════════════════════════════════
// STEP VISUALS (imported from components/visuals/StepVisuals)
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function HowItWorksPage() {
  const chatbotBaseUrl = (process.env.NEXT_PUBLIC_CHATBOT_URL || "https://chat.selve.me").trim();
  const chatbotRedirect = `/auth/redirect?redirect_to=${encodeURIComponent(chatbotBaseUrl)}`;

  const handleScrollToSteps = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const el = document.getElementById("steps");
    if (el) {
      const targetY = el.getBoundingClientRect().top + window.scrollY;
      smoothScrollTo(targetY, 950);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-neutral-50 to-white text-neutral-900 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-950 dark:text-white">
      <GlobalAnimations />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 bg-amber-400/15 blur-[120px] rounded-full dark:bg-amber-500/5" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 bg-violet-400/15 blur-[120px] rounded-full dark:bg-violet-500/5" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-white/40">
              How SELVE works
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
              From honest signals to a{" "}
              <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-violet-500 bg-clip-text text-transparent dark:from-amber-400 dark:via-rose-400 dark:to-violet-400">
                living blueprint
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-neutral-600 leading-relaxed dark:text-white/50">
              Adaptive psychometrics, trusted friend input, and a profile-aware coach.
              Move from self-awareness to confident action.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white border border-neutral-200 px-4 py-1.5 text-sm text-neutral-600 shadow-sm dark:bg-white/5 dark:border-white/10 dark:text-white/60">
                ~6–8 minutes
              </span>
              <span className="rounded-full bg-white border border-neutral-200 px-4 py-1.5 text-sm text-neutral-600 shadow-sm dark:bg-white/5 dark:border-white/10 dark:text-white/60">
                Friend perspective optional
              </span>
              <span className="rounded-full bg-white border border-neutral-200 px-4 py-1.5 text-sm text-neutral-600 shadow-sm dark:bg-white/5 dark:border-white/10 dark:text-white/60">
                Validated items
              </span>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-white/90"
              >
                Start the assessment
              </Link>
              <Link
                href={chatbotRedirect}
                className="inline-flex items-center justify-center rounded-full border border-rose-200 px-6 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 dark:border-rose-500/40 dark:text-rose-300 dark:hover:bg-rose-500/10"
              >
                Open SELVE-Chat
              </Link>
              <Link
                href="#steps"
                onClick={handleScrollToSteps}
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 dark:border-white/20 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
              >
                See the flow ↓
              </Link>
            </div>
          </div>

          {/* Hero visualization */}
          <div className="mt-16">
            <RoadmapViz />
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="steps" className="relative py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                  {/* Content */}
                  <div className={`space-y-5 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                    <div className="flex items-center gap-4">
                      <span
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold"
                        style={{
                          backgroundColor: currentColors[step.color].lightBg,
                          color: currentColors[step.color].pulse,
                        }}
                      >
                        {index + 1}
                      </span>
                      <span className="text-sm text-neutral-500 uppercase tracking-wide dark:text-white/40">
                        {step.time}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-white">{step.title}</h2>
                    <p className="text-base text-neutral-600 leading-relaxed dark:text-white/50">{step.description}</p>

                    <ul className="space-y-2">
                      {step.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-neutral-600 dark:text-white/60">
                          <span
                            className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: currentColors[step.color].pulse }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visualization */}
                  <div className={index % 2 === 1 ? "md:order-1" : ""}>
                    <div className="relative rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
                      <step.Visual />
                    </div>
                  </div>
                </div>

                {/* Connector line between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 -bottom-8 h-16 w-px">
                    <svg viewBox="0 0 2 64" className="h-full w-full">
                      <line x1="1" y1="0" x2="1" y2="64" className="stroke-neutral-200 dark:stroke-white/10" strokeWidth="2" />
                      <line
                        x1="1"
                        y1="0"
                        x2="1"
                        y2="64"
                        stroke={currentColors[steps[index + 1].color].pulse}
                        strokeWidth="2"
                        strokeDasharray="8 56"
                        className="step-connector"
                        style={{ animationDelay: `${index * 0.5}s` }}
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="relative py-20 md:py-28 bg-neutral-100/80 dark:bg-neutral-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-white/40">
              What you get
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-neutral-900 dark:text-white">
              Insights that actually help
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={outcome.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-neutral-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20"
              >
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{outcome.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed dark:text-white/50">{outcome.copy}</p>
                <div className="mt-6">
                  <outcome.Visual />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-white via-neutral-50 to-neutral-100 p-10 md:p-16 shadow-xl dark:border-white/10 dark:from-white/[0.03] dark:via-neutral-900/0 dark:to-transparent">
            {/* Ambient glow */}
            <div className="absolute -top-40 -right-40 h-80 w-80 bg-violet-500/15 blur-[110px] rounded-full dark:bg-violet-500/10" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 bg-amber-500/15 blur-[110px] rounded-full dark:bg-amber-500/10" />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-neutral-600 mb-6 dark:text-white/40">
                <span className="rounded-full border border-neutral-200 px-3 py-1 text-neutral-700 dark:border-white/10 dark:text-white/70">Private</span>
                <span className="rounded-full border border-neutral-200 px-3 py-1 text-neutral-700 dark:border-white/10 dark:text-white/70">Actionable</span>
                <span className="rounded-full border border-neutral-200 px-3 py-1 text-neutral-700 dark:border-white/10 dark:text-white/70">Context-aware</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-semibold max-w-2xl text-neutral-900 dark:text-white">
                Ready to see yourself more clearly—then act on it?
              </h2>
              <p className="mt-4 max-w-xl text-base text-neutral-700 leading-relaxed dark:text-white/50">
                Start with the adaptive assessment. Invite one trusted friend. 
                Ask SELVE-CHAT the hard questions.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-white/90"
                >
                  Begin the assessment
                </Link>
                <Link
                  href={chatbotRedirect}
                  className="inline-flex items-center justify-center rounded-full border border-rose-200 px-6 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 dark:border-rose-500/40 dark:text-rose-300 dark:hover:bg-rose-500/10"
                >
                  Chat with SELVE-Chat
                </Link>
                <Link
                  href="/share-your-story"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-800 transition hover:bg-neutral-100 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
                >
                  See how others use SELVE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}