"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaceUnhappy, FaceSad, FaceSmile, FaceHappy } from "@/components/emojis";

// TODO: Future database integration
// - Store feedback with user ID (if logged in) or anonymously with IP/location
// - Use GEOAPIFY for location detection (IP -> country/state)
// - Link feedback to specific assessment results/session
// - Implement feedback analytics dashboard
// - Add moderation system for feedback content
// - Consider adding feedback categories (accuracy, clarity, usefulness, etc.)

interface FeedbackWidgetProps {
  sessionId: string;
  className?: string;
}

type RatingValue = 1 | 2 | 3 | 4;

const RATING_OPTIONS: Array<{
  value: RatingValue;
  icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
  label: string;
  hoverColor: string;
  activeColor: string;
}> = [
  { 
    value: 1, 
    icon: FaceSad, 
    label: "Not helpful", 
    hoverColor: "hover:bg-red-50 dark:hover:bg-red-900/20",
    activeColor: "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700"
  },
  { 
    value: 2, 
    icon: FaceUnhappy, 
    label: "Somewhat helpful", 
    hoverColor: "hover:bg-orange-50 dark:hover:bg-orange-900/20",
    activeColor: "bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700"
  },
  { 
    value: 3, 
    icon: FaceHappy, 
    label: "Helpful", 
    hoverColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
    activeColor: "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700"
  },
  { 
    value: 4, 
    icon: FaceSmile, 
    label: "Very helpful", 
    hoverColor: "hover:bg-green-50 dark:hover:bg-green-900/20",
    activeColor: "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700"
  }
];

export default function FeedbackWidget({ sessionId, className = "" }: FeedbackWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRating, setSelectedRating] = useState<RatingValue | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingClick = (rating: RatingValue) => {
    setSelectedRating(rating);
    setIsExpanded(true);
  };

  const handleSubmit = async () => {
    if (!selectedRating) return;

    setIsSubmitting(true);
    
    try {
      // TODO: Replace with actual API endpoint for feedback submission
      // const response = await fetch('/api/feedback', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     sessionId,
      //     rating: selectedRating,
      //     feedback: feedbackText.trim(),
      //     // Future fields:
      //     // userIp: await getUserIP(),
      //     // location: await getLocationFromIP(),
      //     // timestamp: new Date().toISOString(),
      //     // userId: currentUser?.id || null,
      //   })
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      
      // TODO: Show success message, maybe confetti animation
      // TODO: Analytics tracking: track(conversion_feedback_submitted)
      
    } catch (error) {
      // TODO: Error handling and user feedback
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setSelectedRating(null);
    setFeedbackText("");
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${className} bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-4xl mb-3"
        >
          🎉
        </motion.div>
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
          Thank you for your feedback!
        </h3>
        <p className="text-green-600 dark:text-green-300 text-sm">
          Your input helps us improve the assessment experience.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className={`${className} bg-gray-50 dark:bg-[#2e2e2e] border border-gray-200 dark:border-[#3e3e3e] rounded-xl overflow-hidden transition-all duration-300`}
    >
      {/* Compact State */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Was this helpful?
              </span>
            </div>
            
            <div className="flex gap-2 justify-center">
              {RATING_OPTIONS.map((option) => {
                const IconComponent = option.icon;
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => handleRatingClick(option.value)}
                    className={`
                      w-12 h-12 rounded-full border-2 border-gray-200 dark:border-[#3e3e3e] 
                      flex items-center justify-center cursor-pointer
                      transition-all duration-200 transform
                      ${option.hoverColor}
                      hover:border-gray-300 dark:hover:border-[#4e4e4e]
                      hover:scale-110 active:scale-95
                      focus:outline-none focus:ring-2 focus:ring-purple-500/50
                    `}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title={option.label}
                  >
                    <IconComponent size={20} className="text-gray-600 dark:text-gray-300" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded State */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Selected Rating Display */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">Rating:</span>
                {selectedRating && (() => {
                  const selectedOption = RATING_OPTIONS.find(opt => opt.value === selectedRating);
                  if (!selectedOption) return null;
                  const SelectedIcon = selectedOption.icon;
                  return (
                    <div className={`
                      flex items-center gap-2 px-3 py-1 rounded-full border-2
                      ${selectedOption.activeColor}
                    `}>
                      <SelectedIcon size={18} className="text-gray-700 dark:text-gray-200" />
                      <span className="text-sm font-medium">
                        {selectedOption.label}
                      </span>
                    </div>
                  );
                })()}
                <button
                  onClick={handleCollapse}
                  className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  title="Change rating"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>

              {/* Feedback Textarea */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="space-y-3"
                style={{ transformOrigin: "top" }}
              >
                <label className="block text-sm text-gray-600 dark:text-gray-400">
                  Your feedback...
                </label>
                
                <motion.textarea
                  initial={{ height: 0 }}
                  animate={{ height: 120 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="
                    w-full px-4 py-3 bg-white dark:bg-[#1c1c1c] 
                    border border-gray-200 dark:border-[#3e3e3e] rounded-lg
                    text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500
                    resize-none transition-all duration-200
                  "
                  placeholder="Tell us what you think about your results..."
                  maxLength={500}
                />
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {feedbackText.length}/500 characters
                  </span>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={handleSubmit}
                disabled={isSubmitting || !selectedRating}
                className="
                  w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 
                  text-white font-medium rounded-lg transition-all duration-200 cursor-pointer
                  disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]
                  focus:outline-none focus:ring-2 focus:ring-purple-500/50
                "
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                    />
                    Sending...
                  </div>
                ) : (
                  "Send"
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}