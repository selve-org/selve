// src/components/shared/SoundWaveLoader.tsx
"use client";

import { motion } from "framer-motion";

interface SoundWaveLoaderProps {
  /**
   * Size of the loader
   * - sm: Small (40px bars)
   * - md: Medium (60px bars) - default
   * - lg: Large (100px bars)
   */
  size?: "sm" | "md" | "lg";
  /**
   * Color variant
   * - purple: Purple gradient (default)
   * - pink: Pink gradient
   */
  color?: "purple" | "pink";
  /**
   * Show loading text below the bars
   */
  showText?: boolean;
  /**
   * Custom text to display
   */
  text?: string;
  /**
   * Number of bars (default: 7)
   */
  barCount?: number;
}

/**
 * SoundWaveLoader Component
 *
 * Animated sound wave loading indicator with customizable size and colors.
 * Creates a beautiful wave animation effect like a sound visualizer.
 */
export function SoundWaveLoader({
  size = "md",
  color = "purple",
  showText = true,
  text = "Loading",
  barCount = 7,
}: SoundWaveLoaderProps) {
  // Size configurations
  const sizeConfig = {
    sm: {
      height: 40,
      barWidth: "w-1",
      gap: "gap-1",
      containerHeight: "h-12",
      textSize: "text-xs",
    },
    md: {
      height: 60,
      barWidth: "w-1.5",
      gap: "gap-1.5",
      containerHeight: "h-20",
      textSize: "text-sm",
    },
    lg: {
      height: 100,
      barWidth: "w-2",
      gap: "gap-2",
      containerHeight: "h-32",
      textSize: "text-xl",
    },
  };

  // Color configurations
  const colorConfig = {
    purple: "bg-gradient-to-t from-purple-600 via-purple-500 to-purple-400",
    pink: "bg-gradient-to-t from-pink-500 via-pink-400 to-pink-300",
  };

  const config = sizeConfig[size];
  const bars = Array.from({ length: barCount }, (_, i) => i);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Sound Wave Bars */}
      <div
        className={`flex items-center justify-center ${config.gap} ${config.containerHeight}`}
      >
        {bars.map((i) => (
          <motion.div
            key={i}
            animate={{
              scaleY: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
            className={`${config.barWidth} ${colorConfig[color]} rounded-full origin-center`}
            style={{
              height: `${config.height}px`,
            }}
          />
        ))}
      </div>

      {/* Loading Text */}
      {showText && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`text-gray-400 dark:text-gray-400 ${config.textSize} tracking-wider uppercase mt-4 font-light`}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}
