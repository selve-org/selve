// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const CONSENT_KEY = "selve_consent_v1";
let sentryInitialized = false;

function readAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { prefs?: { analytics?: boolean } };
    return Boolean(parsed.prefs?.analytics);
  } catch (error) {
    console.warn("Could not read consent for Sentry", error);
    return false;
  }
}

function initSentryIfPermitted() {
  if (sentryInitialized) return;
  if (!readAnalyticsConsent()) return;

  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;
  if (!dsn) {
    console.warn("Sentry DSN missing; client instrumentation skipped.");
    return;
  }

  Sentry.init({
    dsn,
    integrations: [Sentry.replayIntegration()],
    tracesSampleRate: 0.2,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    debug: false,
  });
  sentryInitialized = true;
}

if (typeof window !== "undefined") {
  initSentryIfPermitted();
  window.addEventListener("selve:consent", (event: Event) => {
    const detail = (event as CustomEvent).detail as { analytics?: boolean } | undefined;
    if (detail?.analytics) {
      initSentryIfPermitted();
    }
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;