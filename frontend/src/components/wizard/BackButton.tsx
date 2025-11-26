// src/components/wizard/BackButton.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

/**
 * BackButton Component
 *
 * Button for navigating back to the previous question in the assessment.
 * Shows a warning before allowing the user to go back.
 */
export function BackButton({
  onClick,
  disabled = false,
  isLoading = false,
}: BackButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        group relative flex items-center gap-2 px-6 py-3 rounded-xl
        font-medium transition-all duration-300
        ${
          disabled || isLoading
            ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
            : "bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 text-purple-700 dark:text-purple-300 hover:from-purple-100 hover:to-indigo-100 dark:hover:from-purple-900/40 dark:hover:to-indigo-900/40 shadow-sm hover:shadow-md cursor-pointer"
        }
      `}
      whileHover={disabled || isLoading ? {} : { scale: 1.02 }}
      whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
    >
      {/* Icon */}
      <motion.div
        animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
        transition={
          isLoading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}
        }
      >
        <ArrowLeft className="w-5 h-5" />
      </motion.div>

      {/* Text */}
      <span>{isLoading ? "Loading..." : "Back"}</span>

      {/* Hover gradient effect */}
      {!disabled && !isLoading && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-200/0 via-purple-200/50 to-purple-200/0 dark:from-purple-700/0 dark:via-purple-700/30 dark:to-purple-700/0"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}
    </motion.button>
  );
}
