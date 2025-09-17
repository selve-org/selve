// src/app/(main)/assessment/layout.tsx
import React from "react";
import { Footer } from "@/components/footer/Footer";
import { FooterVisibilityProvider } from "@/context/FooterVisibilityContext";

export default function AssessmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FooterVisibilityProvider>
      <main className="flex-grow">{children}</main>
      <Footer />
    </FooterVisibilityProvider>
  );
}
