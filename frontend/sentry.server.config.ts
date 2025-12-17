// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,

  // Performance monitoring
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // PII scrubbing - remove sensitive data before sending to Sentry
  beforeSend(event, hint) {
    // Remove user emails
    if (event.user?.email) {
      event.user.email = "***@***.***";
    }

    // Scrub financial data from messages and exception values
    const scrubFinancialData = (text: string) => {
      if (typeof text !== 'string') return text;
      return text.replace(/\$\d+\.\d+/g, "$X.XX");
    };

    if (event.message) {
      event.message = scrubFinancialData(event.message);
    }

    if (event.exception?.values) {
      event.exception.values.forEach(exception => {
        if (exception.value) {
          exception.value = scrubFinancialData(exception.value);
        }
      });
    }

    return event;
  },

  // Ignore common non-critical errors
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "Non-Error promise rejection captured",
  ],
});

