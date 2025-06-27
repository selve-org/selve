// src/components/ScrollProgressBar.tsx
"use client";

import { motion, MotionValue } from "framer-motion";
import { useFooterVisibility } from "@/context/FooterVisibilityContext";

interface ScrollProgressBarProps {
  scrollYProgress: MotionValue<number>;
}

export const ScrollProgressBar = ({ scrollYProgress }: ScrollProgressBarProps) => {
  const { isFooterVisible } = useFooterVisibility();

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 w-[1px] h-[100vh] md:left-1/2 md:-translate-x-1/2 z-0"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800"
        style={{
          opacity: isFooterVisible ? 0 : 0.5,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
      <motion.div
        className="absolute top-0 left-0 w-[1px] h-full origin-top"
        style={{
          scaleY: scrollYProgress,
          backgroundImage:
            "linear-gradient(to bottom, #ff007f, #a2c2e2, #9b59b6, #10b981)",
          opacity: isFooterVisible ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
    </div>
  );
};
