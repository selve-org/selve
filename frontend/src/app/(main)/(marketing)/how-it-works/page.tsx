"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NodeVisual } from "../sections/visuals/NodeVisual";
import { PerspectiveVisual } from "../sections/visuals/PerspectiveVisual";
import { CoachingVisual } from "../sections/visuals/CoachingVisual";
import BlueprintVisual from "../sections/visuals/BlueprintVisual";

const steps = [
  {
    title: "Adaptive self-portrait",
    time: "6–8 minutes",
    description:
      "You answer a short, adaptive assessment built from validated item pools (Big Five + SELVE lens). The system calibrates difficulty as you go to lock in your baseline profile fast.",
    highlights: [
      "Adaptive item routing trims guesswork",
      "Measures 8 SELVE dimensions with Likert + Not Sure",
      "Backed by psychometric validation and notebook audits",
    ],
    gradient: "from-amber-500/70 via-red-500/60 to-rose-500/70",
  },
  {
    title: "Invite honest friends",
    time: "Optional, ~4 minutes each",
    description:
      "Share a link with people who know you. Their third-person responses are weighted for reliability, giving you blind-spot coverage and confidence where you already align.",
    highlights: [
      "Third-person grammar to reduce self-bias",
      "Quality scoring dampens low-effort responses",
      "We keep response time low so friends finish",
    ],
    gradient: "from-blue-500/70 via-cyan-400/60 to-emerald-500/70",
  },
  {
    title: "Fuse signals into your blueprint",
    time: "Instant",
    description:
      "SELVE blends your self-assessment with peer perspective, calibrates dimension scores, and regenerates your living blueprint. You see where you agree, where you diverge, and what to do about it.",
    highlights: [
      "Alignment vs divergence mapped per dimension",
      "Action cards tuned to your style (visionary, pragmatic, growth-minded)",
      "Profiles update as new signals arrive",
    ],
    gradient: "from-purple-600/70 via-indigo-500/60 to-sky-500/70",
  },
  {
    title: "Coach, ask, iterate",
    time: "Ongoing",
    description:
      "Use SELVE-CHAT to interrogate your results, plan decisions, or rehearse tough conversations. Keep inviting feedback and completing micro-challenges—your blueprint evolves with you.",
    highlights: [
      "Chat with your profile for context-aware guidance",
      "Scenario rehearsal: negotiations, relationships, career moves",
      "Micro-challenges keep the blueprint current",
    ],
    gradient: "from-slate-900/80 via-neutral-800/70 to-zinc-700/70",
  },
];

const signals = [
  {
    title: "Self signals",
    items: [
      "Adaptive Likert responses",
      "Completion time + consistency",
      "Dimension-level confidence bands",
    ],
  },
  {
    title: "Friend signals",
    items: [
      "Weighted agreement vs divergence",
      "Observable vs internal behaviors",
      "Response quality heuristics",
    ],
  },
  {
    title: "Contextual signals",
    items: [
      "Goals you set (focus, career, relationships)",
      "Scenarios you rehearse in SELVE-CHAT",
      "Progress on micro-challenges",
    ],
  },
];

const outcomes = [
  {
    title: "Clarity you can act on",
    copy:
      "See why you react the way you do, which dimensions drive it, and what to try next. Every recommendation cites the signal that triggered it.",
    visual: <BlueprintVisual />,
  },
  {
    title: "External reality-checks",
    copy:
      "Friend inputs surface blind spots without inflating or shaming. Alignment charts show where you and your circle strongly agree or diverge.",
    visual: <PerspectiveVisual />,
  },
  {
    title: "A coach that knows you",
    copy:
      "SELVE-CHAT speaks your language—whether you want a direct plan, a compassionate nudge, or a strategic breakdown. Coaching is tailored to your profile style.",
    visual: <CoachingVisual />,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-gradient-to-b from-background via-background to-background/90 text-foreground">
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-40 -top-40 h-80 w-80 bg-gradient-radial from-orange-400/20 to-transparent blur-3xl" />
          <div className="absolute right-0 top-10 h-72 w-72 bg-gradient-radial from-purple-500/25 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 bg-gradient-radial from-sky-400/20 to-transparent blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
              How SELVE works
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
              From honest signals to a living blueprint.
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              We combine adaptive psychometrics, trusted friend input, and a profile-aware coach so you can move from self-awareness to confident action—without drowning in generic advice.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="rounded-full bg-neutral-900 text-white px-3 py-1 shadow-sm dark:bg-white dark:text-neutral-900">Fast: ~6–8 minutes</span>
              <span className="rounded-full border border-dashed border-neutral-300 px-3 py-1 dark:border-neutral-700">Friend perspective optional</span>
              <span className="rounded-full border border-neutral-200 px-3 py-1 dark:border-neutral-800">Built on validated items</span>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:translate-y-[-1px] hover:shadow-xl dark:bg-white dark:text-neutral-900"
              >
                Start the assessment
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-foreground transition hover:border-foreground/60 dark:border-neutral-700"
              >
                Skip to the flow ↓
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white/90 shadow-[0_10px_50px_-25px_rgba(0,0,0,0.35)] backdrop-blur-sm dark:border-neutral-800/60 dark:bg-neutral-900/60"
              >
                <div
                  className={`absolute inset-0 opacity-70 blur-3xl bg-gradient-to-tr ${step.gradient}`}
                  aria-hidden
                />
                <div className="relative grid gap-8 p-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:p-12">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm uppercase tracking-[0.16em] text-muted-foreground">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-base font-semibold shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground/80">{step.time}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">
                      {step.title}
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="grid gap-2 text-sm text-foreground/90 sm:grid-cols-2">
                      {step.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 rounded-lg bg-white/50 px-3 py-2 shadow-sm ring-1 ring-neutral-200/70 dark:bg-neutral-900/70 dark:ring-neutral-800/70"
                        >
                          <span className="mt-1 inline-block h-2 w-2 rounded-full bg-gradient-to-r from-white via-white to-white shadow-[0_0_0_4px_rgba(255,255,255,0.25)] dark:from-neutral-200 dark:via-neutral-200 dark:to-neutral-200" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative min-h-[240px] rounded-2xl border border-neutral-200/60 bg-white/80 p-4 shadow-inner backdrop-blur-md dark:border-neutral-800/70 dark:bg-neutral-900/70">
                    <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-white/50 via-white/20 to-transparent dark:from-neutral-800/70 dark:via-neutral-900/70" />
                    <div className="relative flex h-full items-center justify-center">
                      {index === 0 && <NodeVisual />}
                      {index === 1 && <PerspectiveVisual />}
                      {index === 2 && <BlueprintVisual />}
                      {index === 3 && <CoachingVisual />}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="rounded-3xl border border-neutral-200/80 bg-white/90 p-10 shadow-[0_20px_80px_-45px_rgba(0,0,0,0.5)] backdrop-blur-md dark:border-neutral-800/60 dark:bg-neutral-900/70">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground/80">
                  Signals we combine
                </p>
                <h2 className="text-3xl font-semibold leading-tight lg:max-w-xl">
                  Every insight cites its source.
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed lg:max-w-2xl">
                  SELVE is explicit about where guidance comes from: your self pattern, friend corroboration, or scenarios you explore in SELVE-CHAT. You always know why a recommendation appears.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {signals.map((signal) => (
                    <div
                      key={signal.title}
                      className="rounded-2xl border border-neutral-200/80 bg-white/70 p-4 shadow-sm dark:border-neutral-800/60 dark:bg-neutral-900/70"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground/80">
                        {signal.title}
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-foreground/90">
                        {signal.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-2xl border border-neutral-200/80 bg-gradient-to-br from-neutral-50 via-white to-white/60 p-6 shadow-lg dark:border-neutral-800/60 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900/60">
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-orange-400/20 via-purple-400/10 to-sky-400/20 blur-3xl" />
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">A lightweight flow, zero noise</h3>
                  <p className="text-sm text-muted-foreground">
                    No inbox spam, no social feeds. Just a private loop between you, your trusted friends, and a coach that remembers context.
                  </p>
                  <div className="grid gap-3 text-sm">
                    <div className="rounded-xl border border-neutral-200/80 bg-white/80 p-3 shadow-sm dark:border-neutral-800/70 dark:bg-neutral-900/70">
                      <p className="font-medium">01 — Self baseline</p>
                      <p className="text-muted-foreground">Adaptive assessment generates your initial blueprint.</p>
                    </div>
                    <div className="rounded-xl border border-neutral-200/80 bg-white/80 p-3 shadow-sm dark:border-neutral-800/70 dark:bg-neutral-900/70">
                      <p className="font-medium">02 — Friend invites</p>
                      <p className="text-muted-foreground">Share a link; we weight responses and protect pace.</p>
                    </div>
                    <div className="rounded-xl border border-neutral-200/80 bg-white/80 p-3 shadow-sm dark:border-neutral-800/70 dark:bg-neutral-900/70">
                      <p className="font-medium">03 — SELVE-CHAT</p>
                      <p className="text-muted-foreground">Ask for plans, rehearse conversations, or pressure-test ideas.</p>
                    </div>
                    <div className="rounded-xl border border-neutral-200/80 bg-white/80 p-3 shadow-sm dark:border-neutral-800/70 dark:bg-neutral-900/70">
                      <p className="font-medium">04 — Living blueprint</p>
                      <p className="text-muted-foreground">Insights refresh with every new signal. You always see the why.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-3">
            {outcomes.map((outcome) => (
              <motion.div
                key={outcome.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35 }}
                className="group relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/90 p-6 shadow-[0_12px_45px_-30px_rgba(0,0,0,0.4)] backdrop-blur-md dark:border-neutral-800/60 dark:bg-neutral-900/70"
              >
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" aria-hidden>
                  <div className="absolute -inset-12 bg-gradient-to-br from-orange-400/10 via-purple-500/10 to-sky-400/10 blur-3xl" />
                </div>
                <h3 className="text-2xl font-semibold leading-tight">{outcome.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{outcome.copy}</p>
                <div className="mt-6 rounded-2xl border border-neutral-200/80 bg-white/70 p-4 shadow-inner dark:border-neutral-800/60 dark:bg-neutral-900/70">
                  {outcome.visual}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-6 rounded-3xl border border-neutral-200/70 bg-gradient-to-br from-neutral-900 via-neutral-900 to-black p-10 text-white shadow-[0_24px_90px_-50px_rgba(0,0,0,0.7)] dark:border-neutral-800/60">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/70">
              <span className="rounded-full border border-white/20 px-3 py-1">Private</span>
              <span className="rounded-full border border-white/20 px-3 py-1">Actionable</span>
              <span className="rounded-full border border-white/20 px-3 py-1">Context-aware</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
              Ready to see yourself more clearly—then act on it?
            </h2>
            <p className="max-w-3xl text-base text-white/80">
              Start with the adaptive assessment. Invite one trusted friend. Ask SELVE-CHAT the hard questions. You will get clarity you can use today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg transition hover:translate-y-[-1px] hover:shadow-xl"
              >
                Begin the assessment
              </Link>
              <Link
                href="/share-your-story"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                See how others use SELVE
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
