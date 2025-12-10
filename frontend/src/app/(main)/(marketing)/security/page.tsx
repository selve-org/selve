"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const focusAreas = [
  "Authentication bypass or session hijacking",
  "Unauthorized access to assessment data or friend responses",
  "Cross-site scripting (XSS)",
  "SQL injection or data tampering",
  "Privilege escalation",
];

const outOfScope = [
  "Social engineering or phishing",
  "Denial of service attacks",
  "Automated scanner output without demonstrated impact",
  "Issues in third-party services",
];

export default function SecurityPage() {
  return (
    <div className="bg-gradient-to-b from-background via-background to-background/90 text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-40 -top-40 h-80 w-80 bg-gradient-radial from-emerald-400/15 to-transparent blur-3xl" />
          <div className="absolute right-0 top-10 h-72 w-72 bg-gradient-radial from-sky-500/20 to-transparent blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
              Security
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
              Found a vulnerability?
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              SELVE holds personal data people trust us with. If you find something wrong, we want to know. Doing so keeps the world a little safer.
            </p>
          </div>
        </div>
      </section>

      {/* Report */}
      <section className="relative py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35 }}
            className="max-w-2xl rounded-3xl border border-neutral-200/70 bg-white/90 p-8 shadow-lg backdrop-blur-md dark:border-neutral-800/60 dark:bg-neutral-900/70"
          >
            <h2 className="text-2xl font-semibold">How to report</h2>
            <p className="mt-4 text-muted-foreground">
              Email{" "}
              <a
                href="mailto:hello@selve.me"
                className="font-medium text-foreground underline decoration-neutral-300 underline-offset-4 hover:decoration-foreground dark:decoration-neutral-600"
              >
                hello@selve.me
              </a>{" "}
              with <span className="font-medium">"Security"</span> in the subject. Tell us what you found, how to reproduce it, and any supporting details.
            </p>
            <p className="mt-4 text-muted-foreground">
              We don't run a formal bounty program, but we appreciate every report that helps protect our users.
            </p>
            <a
              href="mailto:hello@selve.me?subject=Security"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:translate-y-[-1px] hover:shadow-xl dark:bg-white dark:text-neutral-900"
            >
              Email hello@selve.me
            </a>
          </motion.div>
        </div>
      </section>

      {/* Scope */}
      <section className="relative py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-neutral-200/70 bg-white/90 p-6 dark:border-neutral-800/60 dark:bg-neutral-900/70"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                  <svg className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <h3 className="font-semibold">We care about</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {focusAreas.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.3, delay: 0.08 }}
              className="rounded-2xl border border-neutral-200/70 bg-white/90 p-6 dark:border-neutral-800/60 dark:bg-neutral-900/70"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                  <svg className="h-3.5 w-3.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
                <h3 className="font-semibold">Out of scope</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {outOfScope.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl rounded-2xl border border-neutral-200/70 bg-neutral-50/50 p-6 dark:border-neutral-800/60 dark:bg-neutral-900/50">
            <p className="text-sm text-muted-foreground">
              Thanks for helping keep SELVE safe. If you have questions, just reach out at{" "}
              <a
                href="mailto:hello@selve.me"
                className="font-medium text-foreground underline decoration-neutral-300 underline-offset-4 hover:decoration-foreground dark:decoration-neutral-600"
              >
                hello@selve.me
              </a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
