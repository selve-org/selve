// src/lib/env.ts
/**
 * Environment Configuration Utility
 * 
 * Handles environment-based configuration switching
 * Use NODE_ENV to switch between development and production databases
 */

export const ENV = {
  // Environment type
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  nodeEnv: process.env.NODE_ENV || 'development',

  // Clerk
  clerk: {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  },

  // PostHog
  posthog: {
    key: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  },

  // Sentry
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },

  // Backend API
  api: {
    url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },

  // Geoapify (country autocomplete)
  geoapify: {
    key: process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY,
  },
} as const;
