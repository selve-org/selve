// src/components/IdentifyUser.tsx
"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { usePostHog } from 'posthog-js/react';

export function IdentifyUser() {
  const { user } = useUser();
  const posthog = usePostHog();  // Use the hook to get PostHog instance

  useEffect(() => {
    if (user && posthog) {
      posthog.identify(user.id, {
        // Remove email for GDPR compliance - not needed for product analytics
        // Keep only first name for cohort analysis
        firstName: user.firstName,
        signupDate: user.createdAt,
        // Add subscription plan from public metadata if available
        subscriptionPlan: (user.publicMetadata?.subscriptionPlan as string) || "free",
      });
    }
  }, [user, posthog]);

  return null;  // Invisible component
}
