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
  // Asymptotic progress calculation for adaptive assessments
  // The bar fills quickly at first, then slows down but never stops
  // Formula: progress approaches 90% asymptotically
  // This is honest - we don't know the exact total, so we show continuous progress
  const normalizedPercentage = 90 * (1 - Math.exp(-current / 30));

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

        {/* Shimmer effect */}
        <motion.div
          className="absolute left-0 top-0 h-full pointer-events-none"
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
              x: ["-100%", "200%"],
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
