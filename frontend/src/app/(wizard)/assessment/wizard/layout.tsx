// src/app/(wizard)/assessment/wizard/layout.tsx
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { PostHogProvider } from "../../../providers";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Assessment Wizard – SELVE",
  description: "Complete your psychological profile assessment",
};

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PostHogProvider>
      <ClerkProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ClerkProvider>
    </PostHogProvider>
  );
}
