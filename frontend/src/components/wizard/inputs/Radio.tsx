// src/components/wizard/inputs/Radio.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface RadioOption {
  value: string | number;
  label: string;
}

interface RadioProps {
  value: string | number;
  onChange: (value: string | number) => void;
  options: RadioOption[];
  error?: string;
}

/**
 * Radio Component
 *
 * Classic radio button group for single selection
 * Used for yes/no, true/false, or small option sets
 */
export const Radio: React.FC<RadioProps> = ({
  value,
  onChange,
  options,
  error,
}) => {
  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const isSelected = value === option.value;

        return (
          <motion.button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              w-full p-4 rounded-lg text-left
              transition-all duration-200
              flex items-center gap-4 cursor-pointer
              ${
                isSelected
                  ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-2 border-purple-500 dark:border-purple-400"
                  : "bg-gray-100 dark:bg-[#2e2e2e] border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600"
              }
              ${error ? "border-red-500" : ""}
            `}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Radio Circle */}
            <div
              className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                transition-all duration-200
                ${
                  isSelected
                    ? "border-purple-500 dark:border-purple-400"
                    : "border-gray-400 dark:border-gray-500"
                }
              `}
            >
              {isSelected && (
                <motion.div
                  className="w-3 h-3 rounded-full bg-purple-500 dark:bg-purple-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </div>

            {/* Label */}
            <span
              className={`
                text-base font-medium
                ${
                  isSelected
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300"
                }
              `}
            >
              {option.label}
            </span>
          </motion.button>
        );
      })}

      {/* Error Message */}
      {error && (
        <motion.p
          className="text-sm text-red-500 mt-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
