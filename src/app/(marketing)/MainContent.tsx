// scr/app/(marketing)/MainContent.tsx
"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent = ({ children }: MainContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // The offset is set to start tracking when the top of this container
  // meets the top of the viewport, and end when the bottom meets the bottom.
  // This correctly measures progress only within this component's bounds.
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={contentRef} className="relative">
      <ScrollProgressBar scrollYProgress={scrollYProgress} />
      {/* The actual page sections are rendered here */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};