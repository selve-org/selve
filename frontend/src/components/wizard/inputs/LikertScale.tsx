// src/components/wizard/inputs/LikertScale.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import type { RenderConfig } from "@/lib/types/questionnaire";

interface LikertScaleProps {
  value: number | "not-sure" | null;
  onChange: (value: number | "not-sure") => void;
  config: RenderConfig;
  showNotSure?: boolean;
}

/**
 * LikertScale Component
 *
 * 5-point Likert scale with optional "Not Sure" button
 * Specifically designed for friend assessment
 */
export const LikertScale: React.FC<LikertScaleProps> = ({
  value,
  onChange,
  config,
  showNotSure = false,
}) => {
  const { labels = {} } = config;

  const defaultLabels = {
    1: "Strongly Disagree",
    2: "Disagree",
    3: "Neutral",
    4: "Agree",
    5: "Strongly Agree",
  };

  const finalLabels = { ...defaultLabels, ...labels };

  return (
    <div className="w-full space-y-6">
      {/* 5-Point Scale */}
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4, 5].map((point) => (
          <motion.button
            key={point}
            onClick={() => onChange(point)}
            className={`
              w-full px-6 py-4 rounded-xl text-left transition-all cursor-pointer
              ${
                value === point
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                  : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <div
                className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                ${
                  value === point
                    ? "bg-white/20"
                    : "bg-white/5 text-white/50"
                }
              `}
              >
                {point}
              </div>
              <div className="flex-1 font-medium">{finalLabels[point as keyof typeof finalLabels]}</div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Not Sure Button (Optional) */}
      {showNotSure && (
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 text-white/40 text-sm bg-slate-900">or</span>
          </div>
        </div>
      )}

      {showNotSure && (
        <motion.button
          onClick={() => onChange("not-sure")}
          className={`
            w-full px-6 py-4 rounded-xl text-center transition-all cursor-pointer
            ${
              value === "not-sure"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105"
                : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">Not Sure</span>
          </div>
        </motion.button>
      )}

      {config.helpText && (
        <p className="text-sm text-white/50 text-center mt-4">
          {config.helpText}
        </p>
      )}
    </div>
  );
};
