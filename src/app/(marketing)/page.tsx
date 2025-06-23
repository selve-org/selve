// src/app/(marketing)/page.tsx
import { Header } from "./Header";
import { Hero } from "@/app/(marketing)/Hero";
import { Footer } from "./Footer";

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Header />
      <main>
        <Hero />
        {/* More sections coming later */}
      </main>
      <Footer />
    </div>
  );
}
