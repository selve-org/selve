// src/components/wizard/BackWarningModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";

interface BackWarningModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  warningMessage?: string | null;
}

/**
 * BackWarningModal Component
 *
 * Modal that warns the user before allowing them to go back to a previous question.
 * Going back may affect the accuracy of the assessment results.
 */
export function BackWarningModal({
  isOpen,
  onConfirm,
  onCancel,
  warningMessage,
}: BackWarningModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />

          {/* Modal */}
          <motion.div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 relative">
              {/* Close button */}
              <button
                onClick={onCancel}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>

              {/* Icon */}
              <motion.div
                className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", damping: 15 }}
              >
                <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </motion.div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Are you sure?
              </h2>

              {/* Warning message */}
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                {warningMessage ||
                  "Going back may affect the accuracy of your assessment results."}
              </p>

              {/* Action buttons */}
              <div className="flex gap-3">
                {/* Cancel button */}
                <motion.button
                  onClick={onCancel}
                  className="flex-1 px-6 py-3 rounded-xl font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Stay Here
                </motion.button>

                {/* Confirm button */}
                <motion.button
                  onClick={onConfirm}
                  className="flex-1 px-6 py-3 rounded-xl font-medium bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Go Back Anyway
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
