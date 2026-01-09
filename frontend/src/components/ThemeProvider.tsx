// src/components/ThemeProvider.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { useThemeSync } from "@/hooks/useThemeSync";

export function ThemeProvider({ children, ...props }:ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="selve-theme"
            {...props}
        >
            <ThemeSyncWrapper>{children}</ThemeSyncWrapper>
        </NextThemesProvider>
    )
}

function ThemeSyncWrapper({ children }: { children: React.ReactNode }) {
    useThemeSync();
    return <>{children}</>;
}