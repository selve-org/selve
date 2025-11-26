// src/app/(main)/(marketing)/hero/ParallaxHeroBackground.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  MotionValue,
  useTransform,
  useSpring,
  Transition,
} from "framer-motion";

const allObjects = [
  { emoji: "🎭", layer: 1, top: "10%", left: "15%", size: "text-4xl" },
  { emoji: "🚲", layer: 2, top: "20%", left: "80%", size: "text-5xl" },
  { emoji: "(☞ ͡° ͜ʖ ͡°)☞", layer: 1, top: "75%", left: "10%", size: "text-3xl" },
  { emoji: "¯\\_(ツ)_/¯", layer: 3, top: "35%", left: "25%", size: "text-5xl" },
  { emoji: "💬", layer: 3, top: "50%", left: "50%", size: "text-6xl" },
  { emoji: "📞", layer: 1, top: "80%", left: "90%", size: "text-4xl" },
  { emoji: "✏️", layer: 2, top: "5%", left: "60%", size: "text-3xl" },
  { emoji: "🕰️", layer: 3, top: "85%", left: "40%", size: "text-5xl" },
  { emoji: "📅", layer: 2, top: "40%", left: "5%", size: "text-4xl" },
  { emoji: "😁", layer: 2, top: "60%", left: "70%", size: "text-4xl" },
  { emoji: "😎", layer: 1, top: "15%", left: "5%", size: "text-5xl" },
  { emoji: "🙄", layer: 2, top: "70%", left: "50%", size: "text-4xl" },
  { emoji: "🤑", layer: 3, top: "30%", left: "85%", size: "text-3xl" },
  { emoji: "😠", layer: 2, top: "90%", left: "20%", size: "text-4xl" },
  { emoji: "😩", layer: 1, top: "45%", left: "80%", size: "text-4xl" },
  { emoji: "😜", layer: 3, top: "10%", left: "35%", size: "text-3xl" },
  { emoji: "💅", layer: 2, top: "55%", left: "15%", size: "text-5xl" },
  { emoji: "💛💜", layer: 1, top: "65%", left: "90%", size: "text-3xl" },
];

// Utility to shrink size on mobile
const getMobileSize = (size: string) => {
  switch (size) {
    case "text-6xl": return "text-3xl";
    case "text-5xl": return "text-2xl";
    case "text-4xl": return "text-xl";
    case "text-3xl": return "text-lg";
    default: return size;
  }
};

// Desktop-only parallax
const DesktopEmojis: React.FC<{
  windowSize: { width: number; height: number };
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}> = ({ windowSize, mouseX, mouseY }) => {
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  return (
    <>
      {allObjects.map(({ emoji, layer, top, left, size }, i) => {
        const x = useTransform(
          smoothX,
          [-windowSize.width / 2, windowSize.width / 2],
          [-15 * layer, 15 * layer]
        );
        const y = useTransform(
          smoothY,
          [-windowSize.height / 2, windowSize.height / 2],
          [-15 * layer, 15 * layer]
        );

        return (
          <motion.div
            key={i}
            className={`${size} absolute opacity-30 dark:opacity-20 select-none`}
            style={{ top, left, x, y }}
          >
            {emoji}
          </motion.div>
        );
      })}
    </>
  );
};

// Mobile-only static + tap animation
const MobileEmojis: React.FC<{ target: { x: number; y: number } | null }> = ({ target }) => (
  <>
    {allObjects.slice(0, 8).map(({ emoji, layer, top, left, size }, i) => {
      const mobileSize = getMobileSize(size);
      const motionProps: {
        initial?: { x: number; y: number };
        animate?: { x: number; y: number };
        transition?: Transition;
      } = {};

      if (target) {
        motionProps.initial = { x: 0, y: 0 };
        motionProps.animate = {
          x: target.x * 0.05 * layer,
          y: target.y * 0.05 * layer,
        };
        motionProps.transition = {
          type: "spring",
          stiffness: 100,
          damping: 20,
        };
      }

      return (
        <motion.div
          key={i}
          className={`${mobileSize} absolute opacity-30 dark:opacity-20 select-none`}
          style={{ top, left }}
          {...motionProps}
        >
          {emoji}
        </motion.div>
      );
    })}
  </>
);

export const ParallaxHeroBackground = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 800 });
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null);

  const mouseX = useMotionValue<number>(0);
  const mouseY = useMotionValue<number>(0);

  // detect desktop / resize
  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // mouse parallax (desktop only)
  useEffect(() => {
    if (!isDesktop) return;
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - windowSize.width / 2);
      mouseY.set(e.clientY - windowSize.height / 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isDesktop, mouseX, mouseY, windowSize]);

  // mobile tap handler on the full background area
  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTarget({ x, y });
  };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 select-none"
      onClick={handleTap}
      style={{ pointerEvents: isDesktop ? "none" : "auto" }}
    >
      <div className="relative w-full h-full overflow-visible">
        {isDesktop ? (
          <DesktopEmojis windowSize={windowSize} mouseX={mouseX} mouseY={mouseY} />
        ) : (
          <MobileEmojis target={target} />
        )}
      </div>
    </div>
  );
};
