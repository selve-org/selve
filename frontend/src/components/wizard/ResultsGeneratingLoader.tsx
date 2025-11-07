// src/components/wizard/ResultsGeneratingLoader.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Brain, Sparkles, Zap, Network, Eye, Target } from "lucide-react";

interface Stage {
  text: string;
  icon: React.ReactNode;
  duration: number; // milliseconds
}

const STAGES: Stage[] = [
  {
    text: "Initializing system...",
    icon: <Zap className="w-8 h-8" />,
    duration: 800,
  },
  {
    text: "Processing data...",
    icon: <Brain className="w-8 h-8" />,
    duration: 1000,
  },
  {
    text: "Assembling blueprints...",
    icon: <Network className="w-8 h-8" />,
    duration: 900,
  },
  {
    text: "Parsing neural patterns...",
    icon: <Sparkles className="w-8 h-8" />,
    duration: 1100,
  },
  {
    text: "Aligning emotional spectrum...",
    icon: <Eye className="w-8 h-8" />,
    duration: 1000,
  },
  {
    text: "Almost ready...",
    icon: <Target className="w-8 h-8" />,
    duration: 700,
  },
];

/**
 * ResultsGeneratingLoader Component
 *
 * Multi-stage animated loader shown when assessment is complete
 * and results are being generated. Cycles through different stages
 * with icons and text to create anticipation.
 */
export function ResultsGeneratingLoader() {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (currentStage >= STAGES.length - 1) {
      // Stay on last stage
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStage((prev) => prev + 1);
    }, STAGES[currentStage].duration);

    return () => clearTimeout(timer);
  }, [currentStage]);

  const stage = STAGES[currentStage];
  const progress = ((currentStage + 1) / STAGES.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Animated Icon */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage}
          className="relative mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Outer pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Icon container */}
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-purple-500/50">
            <div className="text-white">{stage.icon}</div>
          </div>

          {/* Orbiting particles */}
          {[0, 120, 240].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-purple-400"
              style={{
                top: "50%",
                left: "50%",
                marginTop: "-6px",
                marginLeft: "-6px",
              }}
              animate={{
                rotate: [angle, angle + 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div
                style={{
                  transform: `translateX(50px) translateY(-50%)`,
                }}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg shadow-purple-400/50"
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Stage Text */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={currentStage}
          className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {stage.text}
        </motion.h2>
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="w-64 mt-8">
        <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>Generating your profile...</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Subtle hint */}
      <motion.p
        className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        We're crafting your unique personality profile based on your responses.
        This might take a few moments...
      </motion.p>
    </div>
  );
}
