// src/app/(marketing)/page.tsx
import { Hero } from "@/app/(marketing)/hero/Hero";
import { MainContent } from "./MainContent";
import { FooterVisibilityProvider } from "@/context/FooterVisibilityContext";
import { Footer } from "@/components/footer/Footer";

export default function LandingPage() {
  return (
    <FooterVisibilityProvider>
      <div className="bg-background text-foreground font-sans">
        <main>
          <Hero />
          <MainContent />
        </main>
        <Footer />
      </div>
    </FooterVisibilityProvider>
  );
}
