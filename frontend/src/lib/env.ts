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

  // Database URLs
  database: {
    dev: process.env.DATABASE_URL_DEV,
    prod: process.env.DATABASE_URL_PROD,
    current: process.env.DATABASE_URL,
  },

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
} as const;

/**
 * Get the current database URL based on environment
 */
export function getDatabaseUrl(): string {
  if (ENV.isDevelopment && ENV.database.dev) {
    return ENV.database.dev;
  }
  
  if (ENV.isProduction && ENV.database.prod) {
    return ENV.database.prod;
  }

  // Fallback to current DATABASE_URL
  return ENV.database.current || '';
}

/**
 * Log current environment configuration (useful for debugging)
 */
export function logEnvironment() {
  if (ENV.isDevelopment) {
    console.log('🔧 Environment:', ENV.nodeEnv);
    console.log('🗄️  Database:', ENV.database.current?.includes('rapid-band') ? 'Development (development branch)' : 'Production (production branch)');
  }
}
