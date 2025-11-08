"use client";

import { motion } from "framer-motion";

interface AssessmentLoaderProps {
  message?: string;
}

export default function AssessmentLoader({ 
  message = "Preparing your assessment..." 
}: AssessmentLoaderProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0c0c0c] flex flex-col items-center justify-center">
      {/* Animated Logo/Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="mb-8"
      >
        <div className="relative">
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full"
          />
          
          {/* Inner ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-3 left-3 w-14 h-14 border-3 border-blue-200 dark:border-blue-800 border-t-blue-500 dark:border-t-blue-400 rounded-full"
          />
          
          {/* Center dot */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute top-7 left-7 w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full"
          />
        </div>
      </motion.div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {message}
        </h2>
        
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          This will only take a moment
        </motion.p>
      </motion.div>

      {/* Animated dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-1 mt-6"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -8, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: [0.4, 0, 0.6, 1],
            }}
            className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full"
          />
        ))}
      </motion.div>

      {/* Subtle background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-0 w-96 h-px bg-gradient-to-r from-transparent via-purple-200/30 to-transparent"
        />
        <motion.div
          animate={{
            x: ["100%", "-100%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
          className="absolute bottom-1/3 right-0 w-96 h-px bg-gradient-to-r from-transparent via-blue-200/30 to-transparent"
        />
      </div>
    </div>
  );
}