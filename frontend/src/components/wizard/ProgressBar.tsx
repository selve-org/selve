// src/components/wizard/ProgressBar.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  percentage: number;
  className?: string;
}

/**
 * ProgressBar Component
 * 
 * Displays a beautiful progress indicator for the wizard
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  percentage,
  className = "",
}) => {
  // Prefer backend-calculated progress.
  // Backend sends `progress` as a fraction (0..1). If it ever sends 0..100, handle that too.
  const percentFromBackend = percentage <= 1 ? percentage * 100 : percentage;
  const percentFromCounts = total > 0 ? (current / total) * 100 : 0;
  const rawPercent = percentFromBackend > 0 ? percentFromBackend : percentFromCounts;
  const normalizedPercentage = Math.max(0, Math.min(100, rawPercent));

  return (
    <div className={`w-full ${className}`}>
      {/* Progress bar */}
      <div className="relative h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-600 to-purple-500 dark:from-purple-500 dark:to-purple-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${normalizedPercentage}%` }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0.0, 0.2, 1], // Custom cubic-bezier for smooth motion
          }}
        />

        {/* Shimmer effect - constrained within bar */}
        <motion.div
          className="absolute left-0 top-0 h-full pointer-events-none overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${normalizedPercentage}%` }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          <motion.div
            className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ["0%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};
