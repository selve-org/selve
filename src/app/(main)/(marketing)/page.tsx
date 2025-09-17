// src/app/(main)/(marketing)/page.tsx
import { Hero } from "@/app/(main)/(marketing)/hero/Hero";
import { MainContent } from "./MainContent";
import { FooterVisibilityProvider } from "@/context/FooterVisibilityContext";
import { Footer } from "@/components/footer/Footer";

export default function LandingPage() {
  return (
    <FooterVisibilityProvider>
      <main>
        <Hero />
        <MainContent />
      </main>
      <Footer />
    </FooterVisibilityProvider>
  );
}
