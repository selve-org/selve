// scr/components/ScrollProgressBar.tsx
"use client";

import { motion, MotionValue, useScroll } from "framer-motion";
import { useState, useEffect } from "react";

interface ScrollProgressBarProps {
  scrollYProgress: MotionValue<number>;
}

export const ScrollProgressBar = ({ scrollYProgress }: ScrollProgressBarProps) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  
  // Track scroll position to detect if the user is at the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if the user is at the bottom of the page
      if (scrollPosition >= documentHeight) {
        setIsAtBottom(true);  // User is at the bottom
      } else {
        setIsAtBottom(false); // User is scrolling up
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // This container handles the responsive positioning of the timeline.
    // It's on the left for mobile and centered for tablet/desktop.
    <div className="pointer-events-none absolute top-0 w-[1px] h-full
                   left-0 md:left-1/2 md:-translate-x-1/2">
      
      {/* The gray "track" line that shows the full path */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-neutral-200 dark:bg-neutral-800 opacity-50"
        style={{
          opacity: isAtBottom ? 0 : 0.5,  // Fade out when at bottom
        }}
      />
      
      {/* The colorful "progress" line that grows on scroll */}
      <motion.div
        className="absolute top-0 left-0 w-[1px] h-full origin-top"
        style={{
          scaleY: scrollYProgress,  // Directly using scrollYProgress for real-time updates
          backgroundImage: "linear-gradient(to bottom, #22c55e, #3b82f6, #a855f7)",
          opacity: isAtBottom ? 0 : 1,  // Fade out when at bottom
          transition: "opacity 0.3s ease-in-out",  // Smooth opacity transition
        }}
      />
    </div>
  );
};
