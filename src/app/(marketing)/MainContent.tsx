// scr/app/(marketing)/MainContent.tsx
"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

// Placeholder for future sections
const PlaceholderSection = ({
  title,
  height = "h-screen",
}: {
  title: string;
  height?: string;
}) => (
  <div
    className={`container mx-auto px-4 py-20 flex items-center justify-center ${height}`}
  >
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        This is a placeholder section. As you scroll past it, the progress bar
        will grow. You can add any content here.
      </p>
    </div>
  </div>
);

export const MainContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={contentRef} className="relative">
      <ScrollProgressBar scrollYProgress={scrollYProgress} />
      <div className="relative z-10">
        <PlaceholderSection title="Feature Section 1" />
        <PlaceholderSection title="Feature Section 2" />
        <PlaceholderSection title="Feature Section 3" />
        <PlaceholderSection title="Feature Section 4" />
        <PlaceholderSection title="Testimonials" height="h-[50vh]" />
        <PlaceholderSection title="Testimonials" height="h-[50vh]" />
      </div>
    </div>
  );
};
