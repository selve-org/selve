"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type ConsentPreferences = {
  analytics: boolean; // covers product analytics + session replay
};

type ConsentContextValue = {
  preferences: ConsentPreferences;
  hasDecided: boolean;
  managerOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  updatePreferences: (next: Partial<ConsentPreferences>) => void;
  openManager: () => void;
  closeManager: () => void;
};

const STORAGE_KEY = "selve_consent_v1";
const DEFAULT_PREFERENCES: ConsentPreferences = { analytics: false };
const EXPIRY_DAYS = 30; // re-prompt monthly

const ConsentContext = createContext<ConsentContextValue | null>(null);

function isExpired(updatedAt?: number): boolean {
  if (!updatedAt) return true;
  const now = Date.now();
  const diffDays = (now - updatedAt) / (1000 * 60 * 60 * 24);
  return diffDays >= EXPIRY_DAYS;
}

function readStoredPreferences(): { prefs: ConsentPreferences; hasDecided: boolean } {
  if (typeof window === "undefined") return { prefs: DEFAULT_PREFERENCES, hasDecided: false };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { prefs: DEFAULT_PREFERENCES, hasDecided: false };
    const parsed = JSON.parse(raw) as { prefs?: ConsentPreferences; hasDecided?: boolean; updatedAt?: number };

    if (isExpired(parsed.updatedAt)) {
      return { prefs: DEFAULT_PREFERENCES, hasDecided: false };
    }

    return {
      prefs: { ...DEFAULT_PREFERENCES, ...(parsed.prefs || {}) },
      hasDecided: Boolean(parsed.hasDecided),
    };
  } catch (error) {
    console.warn("Failed to read consent preferences", error);
    return { prefs: DEFAULT_PREFERENCES, hasDecided: false };
  }
}

function persistPreferences(prefs: ConsentPreferences) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ prefs, hasDecided: true, updatedAt: Date.now() })
    );
    window.dispatchEvent(new CustomEvent("selve:consent", { detail: prefs }));
  } catch (error) {
    console.warn("Failed to persist consent preferences", error);
  }
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  // Start with a server-safe default to keep SSR/CSR markup in sync; load real
  // preferences after mount to avoid hydration mismatches when localStorage is
  // available on the client only.
  const [{ prefs, hasDecided }, setState] = useState<{ prefs: ConsentPreferences; hasDecided: boolean}>(() => ({
    prefs: DEFAULT_PREFERENCES,
    hasDecided: false,
  }));
  const [managerOpen, setManagerOpen] = useState(false);

  useEffect(() => {
    setState(readStoredPreferences());

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      setState(readStoredPreferences());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const save = useCallback((next: ConsentPreferences) => {
    setState({ prefs: next, hasDecided: true });
    setManagerOpen(false);
    persistPreferences(next);
  }, []);

  const acceptAll = useCallback(() => save({ analytics: true }), [save]);
  const rejectAll = useCallback(() => save({ analytics: false }), [save]);

  const updatePreferences = useCallback(
    (next: Partial<ConsentPreferences>) => {
      save({ ...prefs, ...next });
    },
    [prefs, save]
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      preferences: prefs,
      hasDecided,
      managerOpen,
      acceptAll,
      rejectAll,
      updatePreferences,
      openManager: () => setManagerOpen(true),
      closeManager: () => setManagerOpen(false),
    }),
    [prefs, hasDecided, managerOpen, acceptAll, rejectAll, updatePreferences]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within a ConsentProvider");
  return ctx;
}
