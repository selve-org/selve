// src/components/testimonials/TestimonialCarousel.tsx
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Configuration
export const TESTIMONIAL_CAROUSEL_CONFIG = {
  /** Whether to pause rotation when user hovers over the carousel */
  PAUSE_ON_HOVER: true,
  /** Minimum rotation interval in milliseconds */
  MIN_INTERVAL: 10000, // 10 seconds
  /** Maximum rotation interval in milliseconds */
  MAX_INTERVAL: 20000, // 20 seconds
};

interface Testimonial {
  id: string;
  displayName: string;
  quote: string;
  role: string | null;
  company: string | null;
  rating: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

// Format name as "FirstName L."
const formatDisplayName = (firstName: string, lastName?: string | null): string => {
  if (lastName && lastName.length > 0) {
    return `${firstName} ${lastName.charAt(0).toUpperCase()}.`;
  }
  return firstName;
};

// Get random interval between min and max
const getRandomInterval = (): number => {
  const { MIN_INTERVAL, MAX_INTERVAL } = TESTIMONIAL_CAROUSEL_CONFIG;
  return Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL;
};

// Single testimonial card component
const TestimonialCard = ({ testimonial, animationKey }: { testimonial: Testimonial; animationKey: string }) => (
  <motion.div
    key={animationKey}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="relative overflow-hidden p-6 rounded-xl h-full flex flex-col
      bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 
      border border-purple-200/50
      shadow-[0_4px_20px_-4px_rgba(168,85,247,0.15)]
      dark:bg-neutral-800/50 dark:border-neutral-700 dark:shadow-none dark:from-transparent dark:via-transparent dark:to-transparent"
  >
    {/* Rating Stars */}
    <div className="flex gap-1 mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-base ${
            star <= testimonial.rating ? "text-yellow-500" : "text-neutral-300 dark:text-neutral-600"
          }`}
        >
          ★
        </span>
      ))}
    </div>
    
    <blockquote className="text-base italic leading-relaxed flex-grow text-purple-900/80 dark:text-neutral-200">
      &ldquo;{testimonial.quote}&rdquo;
    </blockquote>
    
    <div className="mt-4 flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 dark:from-primary/30 dark:to-primary/60 rounded-full flex items-center justify-center text-sm font-bold text-white dark:text-foreground">
        {testimonial.displayName.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-sm text-purple-900 dark:text-foreground">{testimonial.displayName}</p>
        {(testimonial.role || testimonial.company) && (
          <p className="text-xs text-muted-foreground">
            {testimonial.role}
            {testimonial.role && testimonial.company && " at "}
            {testimonial.company}
          </p>
        )}
      </div>
    </div>
  </motion.div>
);

export const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  // Track indices for left and right cards (they rotate independently)
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  
  // Ensure we have at least 2 testimonials for 2-column display
  const displayTestimonials = useMemo(() => {
    if (testimonials.length === 0) return [];
    if (testimonials.length === 1) return [testimonials[0], testimonials[0]];
    return testimonials;
  }, [testimonials]);
  
  // Rotate left card
  const rotateLeft = useCallback(() => {
    setLeftIndex((prev) => {
      let next = (prev + 2) % displayTestimonials.length;
      // Avoid same as right
      if (next === rightIndex && displayTestimonials.length > 2) {
        next = (next + 1) % displayTestimonials.length;
      }
      return next;
    });
  }, [displayTestimonials.length, rightIndex]);
  
  // Rotate right card
  const rotateRight = useCallback(() => {
    setRightIndex((prev) => {
      let next = (prev + 2) % displayTestimonials.length;
      // Avoid same as left
      if (next === leftIndex && displayTestimonials.length > 2) {
        next = (next + 1) % displayTestimonials.length;
      }
      return next;
    });
  }, [displayTestimonials.length, leftIndex]);
  
  // Set up independent timers for each card
  useEffect(() => {
    if (displayTestimonials.length <= 2 || isPaused) return;
    
    const leftTimer = setTimeout(rotateLeft, getRandomInterval());
    return () => clearTimeout(leftTimer);
  }, [leftIndex, isPaused, rotateLeft, displayTestimonials.length]);
  
  useEffect(() => {
    if (displayTestimonials.length <= 2 || isPaused) return;
    
    const rightTimer = setTimeout(rotateRight, getRandomInterval());
    return () => clearTimeout(rightTimer);
  }, [rightIndex, isPaused, rotateRight, displayTestimonials.length]);
  
  if (displayTestimonials.length === 0) {
    return null;
  }
  
  const leftTestimonial = displayTestimonials[leftIndex];
  const rightTestimonial = displayTestimonials[rightIndex] || displayTestimonials[0];
  
  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => TESTIMONIAL_CAROUSEL_CONFIG.PAUSE_ON_HOVER && setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="wait">
          <TestimonialCard 
            testimonial={leftTestimonial} 
            animationKey={`left-${leftTestimonial.id}-${leftIndex}`} 
          />
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <TestimonialCard 
            testimonial={rightTestimonial} 
            animationKey={`right-${rightTestimonial.id}-${rightIndex}`} 
          />
        </AnimatePresence>
      </div>
      
      {/* Subtle indicator of total testimonials (no navigation) */}
      {displayTestimonials.length > 2 && (
        <div className="flex justify-center gap-1.5 mt-6">
          {displayTestimonials.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                index === leftIndex || index === rightIndex ? "bg-primary" : "bg-neutral-400 dark:bg-neutral-600"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { formatDisplayName };
