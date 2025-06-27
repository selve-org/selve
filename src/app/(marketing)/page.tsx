// src/app/(marketing)/page.tsx
import { Header } from "./header/Header";
import { Hero } from "@/app/(marketing)/hero/Hero";
import { Footer } from "./footer/Footer";
import { MainContent } from "./MainContent";
import { FooterVisibilityProvider } from "@/context/FooterVisibilityContext";

export default function LandingPage() {
  return (
    <FooterVisibilityProvider>
      <div className="bg-background text-foreground font-sans">
        <Header />
        <main>
          <Hero />
          <MainContent />
        </main>
        <Footer />
      </div>
    </FooterVisibilityProvider>
  );
}
