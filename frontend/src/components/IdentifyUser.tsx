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
        email: user.primaryEmailAddress?.emailAddress,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
      });
    }
  }, [user, posthog]);

  return null;  // Invisible component
}
