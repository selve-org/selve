"use client";

import { motion, Variants } from "framer-motion";
import clsx from "clsx"; // optional for class merging
import React from "react";

interface Props {
  isOpen: boolean;
  className?: string;
}

// Base animation config
const transition = {
  duration: 0.3,
  ease: "easeOut",
};

// Shared base variant
const baseVariant: Variants = {
  closed: {
    rotate: 0,
    y: 0,
    opacity: 1,
    transition,
  },
  open: {
    transition,
  },
};

// Individual line variants
const topLineVariants: Variants = {
  ...baseVariant,
  open: {
    ...baseVariant.open,
    rotate: 45,
    y: 6,
  },
};

const middleLineVariants: Variants = {
  ...baseVariant,
  open: {
    ...baseVariant.open,
    opacity: 0,
  },
};

const bottomLineVariants: Variants = {
  ...baseVariant,
  open: {
    ...baseVariant.open,
    rotate: -45,
    y: -6,
  },
};

export const AnimatedHamburgerIcon: React.FC<Props> = ({ isOpen, className }) => {
  return (
    <motion.div
      className={clsx("relative w-6 h-4", className)}
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      {[topLineVariants, middleLineVariants, bottomLineVariants].map((variant, index) => (
        <motion.span
          key={index}
          variants={variant}
          style={{ originX: 0.5, originY: 0.5 }}
          className={clsx(
            "absolute left-0 w-full h-0.5 bg-current",
            index === 1 ? "top-1.5" : index === 2 ? "top-3" : "top-0"
          )}
        />
      ))}
    </motion.div>
  );
};
