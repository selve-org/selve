"use client";

import { useState } from "react";
import { useConsent } from "@/contexts/ConsentContext";

export function ConsentBanner() {
  const {
    preferences,
    hasDecided,
    managerOpen,
    acceptAll,
    rejectAll,
    updatePreferences,
    closeManager,
  } = useConsent();
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldShow = !hasDecided || managerOpen;
  if (!shouldShow) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-6 sm:right-6">
      <div className="bg-background/90 border border-foreground/10 shadow-2xl backdrop-blur-xl rounded-2xl px-4 py-4 sm:px-6 sm:py-5 flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
          <div className="flex-1 space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground/70">
              <span>Privacy</span>
              <span className="h-1 w-1 rounded-full bg-foreground/50" aria-hidden />
              <span>SELVE</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">We use cookies to improve SELVE</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                We keep essential cookies for sign-in and sessions. With your permission we also enable
                product analytics and privacy-filtered session replay to improve the assessment experience.
                You can change your choice anytime in Privacy.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="text-sm font-medium text-foreground/70 underline-offset-4 hover:text-foreground cursor-pointer"
            >
              {isExpanded ? "Hide details" : "Manage choices"}
            </button>
            {managerOpen && (
              <button
                type="button"
                onClick={closeManager}
                className="text-xs font-medium text-foreground/60 underline-offset-4 hover:text-foreground cursor-pointer"
              >
                Close
              </button>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Analytics & session replay</p>
                <p className="text-xs text-foreground/70">Helps us improve flows; no ads.</p>
              </div>
              <button
                type="button"
                onClick={() => updatePreferences({ analytics: !preferences.analytics })}
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition
                  ${preferences.analytics
                    ? "border-green-500/60 bg-green-500/10 text-green-600 dark:text-green-400"
                    : "border-foreground/20 bg-background text-foreground/80"} cursor-pointer`}
                aria-pressed={preferences.analytics}
              >
                {preferences.analytics ? "On" : "Off"}
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3">
          <button
            type="button"
            onClick={rejectAll}
            className="inline-flex items-center justify-center rounded-xl border border-foreground/20 px-4 py-2 text-sm font-semibold text-foreground hover:border-foreground/40 transition cursor-pointer"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:shadow-purple-500/30 cursor-pointer"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
