// src/components/ScrollProgressBar.tsx
"use client";

import { motion, MotionValue } from "framer-motion";
import { useState, useEffect } from "react";

interface ScrollProgressBarProps {
  scrollYProgress: MotionValue<number>;
}

export const ScrollProgressBar = ({
  scrollYProgress,
}: ScrollProgressBarProps) => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Track scroll position to detect if the user is at the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      setIsAtBottom(scrollPosition >= documentHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // This container is fixed in place, behind your Hero via negative z-index
    <div
      className="pointer-events-none fixed top-0 left-0 w-[1px] h-[100vh] md:left-1/2 md:-translate-x-1/2 z-0"
      aria-hidden="true"
    >
      {/* The gray "track" line */}
      <motion.div
        className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800"
        style={{
          opacity: isAtBottom ? 0 : 0.5, // Fade out when at bottom
        }}
      />

      {/* The colorful "progress" line that grows on scroll */}
      <motion.div
        className="absolute top-0 left-0 w-[1px] h-full origin-top"
        style={{
          scaleY: scrollYProgress, // Directly using scrollYProgress for real-time updates
          backgroundImage:
            "linear-gradient(to bottom, #ff007f, #a2c2e2, #9b59b6, #10b981)",
          opacity: isAtBottom ? 0 : 1, // Fade out when at bottom
          transition: "opacity 0.3s ease-in-out", // Smooth opacity transition
        }}
      />
    </div>
  );
};
