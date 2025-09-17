// src/app/(main)/(marketing)/MainContent.tsx
"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { FeatureSection, TestimonialsSection, CtaSection } from "./sections"; // Assuming index.ts barrel file

import ProfileInsightsPanel from "./sections/profile-insights-panel/ProfileInsightsPanel";
import { NodeVisual } from "./sections/visuals/NodeVisual";
import { PerspectiveVisual } from "./sections/visuals/PerspectiveVisual";
import { CoachingVisual } from "./sections/visuals/CoachingVisual";
import BlueprintVisual from "./sections/visuals/BlueprintVisual";

// Placeholder visual components - you can replace these with your actual graphics/SVGs

export const MainContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={contentRef} className="relative">
      <ScrollProgressBar scrollYProgress={scrollYProgress} />
      <div className="relative z-10 flex flex-col gap-y-32 md:gap-y-48">
        <FeatureSection
          title="More than MBTI. Smarter than quizzes."
          description={`SELVE blends modern behavioral psychology with real-time interaction design. It's not just a test—it's a system trained to understand you. \n\n We draw from the Big Five, DISC, MBTI, and faith-based insight models to form a type system tailored to the modern world.`}
          visual={<NodeVisual />}
          layout="text-left"
        />

        <FeatureSection
          title="Get outside perspective."
          description="Invite trusted friends to profile you. Their honest answers shape your results, revealing blind spots and validating your self-perception. SELVE triangulates both internal reflection and external feedback to give the clearest picture of who you are."
          visual={<PerspectiveVisual />}
          layout="text-right"
        />
        <FeatureSection
          title="Coaching that speaks your language."
          description="Knowing yourself is step one. SELVE gives you advice, strategies, and goals that match your style—whether you're growth-minded or peace-seeking, visionary or pragmatic. AI-powered coaching is coming soon!"
          visual={<CoachingVisual />}
          layout="text-left"
        />
        <FeatureSection
          title="Your Living Blueprint."
          description="Your SELVE profile is not static. It evolves as you complete challenges, receive feedback, and grow. Our system continuously refines your blueprint, providing an ever-accurate, dynamic guide to your personal and professional life."
          visual={<BlueprintVisual />}
          layout="text-right"
        />
        <ProfileInsightsPanel />
        <TestimonialsSection />
        <CtaSection />
      </div>
    </div>
  );
};
