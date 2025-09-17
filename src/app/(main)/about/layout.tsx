// src/app/(main)/about/layout.tsx
import React from "react";
import { Footer } from "@/components/footer/Footer";
import { FooterVisibilityProvider } from "@/context/FooterVisibilityContext";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FooterVisibilityProvider>
      <div className="min-h-screen flex flex-col pt-16">
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </FooterVisibilityProvider>
  );
}
