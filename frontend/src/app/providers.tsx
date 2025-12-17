// src/app/providers.tsx
'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import { usePostHog } from 'posthog-js/react'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useConsent } from "@/contexts/ConsentContext"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const { preferences } = useConsent();
  const hasAnalyticsConsent = preferences.analytics;

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY as string | undefined;
    if (!key) {
      console.warn("PostHog key missing; analytics disabled.");
      return;
    }

    if (hasAnalyticsConsent) {
      // Initialize once; PostHog handles internal idempotency.
      posthog.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        person_profiles: 'identified_only',
        capture_pageview: false,

        // Sanitize events before sending to remove PII
        sanitize_properties: (properties, event) => {
          // Create a copy to avoid mutating original
          const sanitized = { ...properties };

          // Remove sensitive fields
          delete sanitized.email;
          delete sanitized.password;
          delete sanitized.credit_card;
          delete sanitized.ssn;
          delete sanitized.api_key;
          delete sanitized.token;

          // Scrub financial amounts from all string values
          Object.keys(sanitized).forEach(key => {
            if (typeof sanitized[key] === 'string') {
              sanitized[key] = sanitized[key].replace(/\$\d+\.\d+/g, '$X.XX');
            }
          });

          return sanitized;
        },
      });
      posthog.opt_in_capturing();
    } else {
      posthog.opt_out_capturing();
    }
  }, [hasAnalyticsConsent])

  return (
    <PHProvider client={posthog}>
      {hasAnalyticsConsent ? <SuspendedPostHogPageView /> : null}
      {children}
    </PHProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + "?" + searchParams.toString();
      }

      posthog.capture('$pageview', { '$current_url': url })
    }
  }, [pathname, searchParams, posthog])

  return null
}

// Wrap PostHogPageView in Suspense to avoid the useSearchParams usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}