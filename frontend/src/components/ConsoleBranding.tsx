"use client";

import { useEffect } from "react";
import { showConsoleBranding } from "@/lib/console-branding";

/**
 * Component that displays SELVE branding in the browser console.
 * Renders nothing to the DOM - purely for console output.
 */
export function ConsoleBranding() {
  useEffect(() => {
    showConsoleBranding();
  }, []);

  return null;
}
