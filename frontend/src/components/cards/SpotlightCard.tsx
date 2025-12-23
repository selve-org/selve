// src/components/cards/SpotlightCard.tsx
"use client";

import React, { useRef, useEffect } from "react";
import styles from "@/app/(main)/about/about.module.css";

interface SpotlightCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  styleProps: {
    base: number;
    spread: number;
  };
}

// --- SpotlightCard Component ---
const SpotlightCard: React.FC<SpotlightCardProps> = ({
  icon,
  title,
  description,
  styleProps,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Detect if device is mobile/touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const updateGlow = (e: any) => {
      card.style.setProperty("--glow-opacity", "1");
      const rect = card.getBoundingClientRect();
      let clientX, clientY;

      if (e.touches) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      card.style.setProperty("--x", clientX);
      card.style.setProperty("--y", clientY);

      const xInCard = clientX - rect.left;
      const xp = xInCard / rect.width;
      card.style.setProperty("--xp", xp.toString());
    };

    const turnOffGlow = () => {
      card.style.setProperty("--glow-opacity", "0");
    };

    // Only add mouse events on desktop
    card.addEventListener("mousemove", updateGlow);
    card.addEventListener("mouseleave", turnOffGlow);
    
    // Don't add touch listeners on mobile to allow scrolling
    if (!isTouchDevice) {
      card.addEventListener("touchmove", updateGlow, { passive: true });
      card.addEventListener("touchend", turnOffGlow);
      card.addEventListener("touchcancel", turnOffGlow);
    }

    return () => {
      card.removeEventListener("mousemove", updateGlow);
      card.removeEventListener("mouseleave", turnOffGlow);
      if (!isTouchDevice) {
        card.removeEventListener("touchmove", updateGlow);
        card.removeEventListener("touchend", turnOffGlow);
        card.removeEventListener("touchcancel", turnOffGlow);
      }
    };
  }, []);

  const cardStyle = {
    "--base": styleProps.base,
    "--spread": styleProps.spread,
    "--radius": 16,
    "--border": 1,
    "--backdrop": "hsl(0 0% 0% / 0.02)",
    "--backup-border": "hsl(0 0% 0% / 0.1)",
    "--size": 200,
    "--outer": 1,
    "--border-size": "calc(var(--border, 2) * 1px)",
    "--spotlight-size": "calc(var(--size, 150) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    backgroundImage:
      "radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent)",
    backgroundColor: "var(--card-bg, transparent)",
    backgroundSize:
      "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
    backgroundPosition: "50% 50%",
    backgroundAttachment: "fixed",
    border: "var(--border-size) solid var(--backup-border)",
    position: "relative" as const,
    touchAction: "auto" as const,
  };

  return (
    <div className="h-full">
      <div
        ref={cardRef}
        className={`${styles.glow} relative rounded-2xl backdrop-blur-lg p-8 h-full dark:bg-transparent`}
        style={cardStyle}
      >
        <div className={styles.glow}></div>
        <div className="relative z-10 h-full">
          <div className="text-center flex flex-col items-center justify-center h-full">
            <div
              className="flex items-center justify-center h-16 w-16 mx-auto rounded-full"
              style={{ backgroundColor: "var(--icon-bg, hsl(0 0% 0% / 0.05))" }}
            >
              {icon}
            </div>
            <h3 className="mt-6 text-xl font-semibold text-foreground">
              {title}
            </h3>
            <p className="mt-2 text-base text-muted-foreground max-w-xs mx-auto">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotlightCard;
