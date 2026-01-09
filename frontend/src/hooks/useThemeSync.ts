"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useUser } from "@clerk/nextjs";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Syncs theme preference across all Selve apps via backend
 * - Fetches user's saved theme preference on mount
 * - Saves theme changes to backend for cross-app sync
 */
export function useThemeSync() {
  const { theme, setTheme } = useTheme();
  const { user, isLoaded } = useUser();
  const isInitialLoad = useRef(true);
  const isSyncing = useRef(false);

  // Fetch theme preference from backend on mount
  useEffect(() => {
    if (!isLoaded || !user?.id || !isInitialLoad.current) return;

    async function fetchThemePreference() {
      try {
        console.log('[ThemeSync] Fetching theme preference for user:', user!.id);
        const response = await fetch(`${API_URL}/api/users/theme`, {
          headers: {
            "X-User-ID": user!.id,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('[ThemeSync] Fetched theme:', data.theme, 'Current theme:', theme);
          if (data.theme && data.theme !== theme) {
            console.log('[ThemeSync] Setting theme to:', data.theme);
            isSyncing.current = true;
            setTheme(data.theme);
            // Reset syncing flag after a short delay
            setTimeout(() => {
              isSyncing.current = false;
            }, 100);
          }
        }
      } catch (error) {
        console.error("[ThemeSync] Error fetching theme preference:", error);
      } finally {
        isInitialLoad.current = false;
      }
    }

    fetchThemePreference();
  }, [isLoaded, user?.id]);

  // Save theme changes to backend
  useEffect(() => {
    if (!isLoaded || !user?.id || isInitialLoad.current || isSyncing.current) return;
    if (!theme) return;

    async function saveThemePreference() {
      try {
        console.log('[ThemeSync] Saving theme preference:', theme);
        const response = await fetch(`${API_URL}/api/users/theme`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-User-ID": user!.id,
          },
          body: JSON.stringify({ theme }),
        });
        if (response.ok) {
          console.log('[ThemeSync] Theme saved successfully');
        }
      } catch (error) {
        console.error("[ThemeSync] Error saving theme preference:", error);
      }
    }

    saveThemePreference();
  }, [theme, isLoaded, user?.id]);
}
