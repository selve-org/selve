// src/components/wizard/Checkpoint.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import type { QuestionnaireCheckpoint } from "@/lib/types/questionnaire";

interface CheckpointProps {
  checkpoint: QuestionnaireCheckpoint;
  onContinue: () => void;
}

/**
 * Checkpoint Component
 *
 * Displays milestone progress in the wizard with a tree-like visualization
 * Based on the Figma design showing completed steps
 */
export const Checkpoint: React.FC<CheckpointProps> = ({
  checkpoint,
  onContinue,
}) => {
  const { title, description } = checkpoint;

  return (
    <motion.div
      className="flex items-center justify-center min-h-[60vh] px-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Celebration Icon */}
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <div className="w-24 h-24 rounded-full bg-green-500/20 border-4 border-green-500 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h2>

        {/* Description */}
        {description && (
          <motion.p
            className="text-lg text-gray-400 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {description}
          </motion.p>
        )}

        {/* Progress Indicator */}
        <motion.div
          className="flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[1, 2, 3, 4].map((step, index) => (
            <div
              key={step}
              className={`w-3 h-3 rounded-full ${
                index <= 1 ? "bg-green-500" : "bg-gray-700"
              }`}
            />
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.button
          onClick={onContinue}
          className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full
            shadow-lg shadow-purple-600/30 transition-all duration-200
            hover:scale-105 active:scale-95"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue →
        </motion.button>

        {/* Skip option */}
        <motion.button
          onClick={onContinue}
          className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Skip
        </motion.button>
      </div>
    </motion.div>
  );
};
