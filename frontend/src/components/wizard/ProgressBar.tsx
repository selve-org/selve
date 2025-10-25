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
  return (
    <div className={`w-full ${className}`}>
      {/* Progress text */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-400">
          Question {current} of {total}
        </span>
        <span className="text-sm font-bold text-green-400">
          {percentage}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        
        {/* Shimmer effect */}
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
      </div>
    </div>
  );
};
