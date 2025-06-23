"use client";

import React from "react";
import { motion, Variants, Transition, easeOut } from "framer-motion";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  className?: string;
}

const baseTransition: Transition = {
  duration: 0.3,
  ease: easeOut,
};

const topLineVariants: Variants = {
  closed: {
    rotate: 0,
    y: 0,
    transition: baseTransition,
  },
  open: {
    rotate: 45,
    y: 8,
    transition: baseTransition,
  },
};

const bottomLineVariants: Variants = {
  closed: {
    rotate: 0,
    y: 0,
    transition: baseTransition,
  },
  open: {
    rotate: -45,
    y: -8,
    transition: baseTransition,
  },
};

// Controls when the middle line container is visible
const middleLineContainerVariants: Variants = {
  open: {
    opacity: 1,
    transition: { duration: 0.1 },
  },
  closed: {
    opacity: 1,
    transition: {
      delay: 0.4, // wait for top/bottom lines to reset
      duration: 0.1,
    },
  },
};

// Controls the actual growing animation from dot to line
const middleLineInnerVariants: Variants = {
  open: {
    scaleX: 0,
    transition: {
      duration: 0.2,
      ease: easeOut,
    },
  },
  closed: {
    scaleX: 1,
    transition: {
      delay: 0.45, // a little delay to show the dot before spreading
      duration: 0.3,
      ease: easeOut,
    },
  },
};

export const AnimatedHamburgerIcon: React.FC<Props> = ({ isOpen, className }) => {
  return (
    <motion.div
      className={clsx("relative w-6 h-5", className)}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      {/* Top line */}
      <motion.span
        variants={topLineVariants}
        style={{ originX: 0.5, originY: 0.5 }}
        className="absolute left-0 top-0 w-full h-0.5 bg-current"
      />

      {/* Middle line wrapper */}
      <motion.div
        className="absolute left-0 top-2 w-full h-0.5 flex justify-center overflow-hidden"
        variants={middleLineContainerVariants}
      >
        <motion.span
          variants={middleLineInnerVariants}
          initial={false}
          style={{ originX: 0.5 }}
          className="w-full h-full bg-current"
        />
      </motion.div>

      {/* Bottom line */}
      <motion.span
        variants={bottomLineVariants}
        style={{ originX: 0.5, originY: 0.5 }}
        className="absolute left-0 top-4 w-full h-0.5 bg-current"
      />
    </motion.div>
  );
};
