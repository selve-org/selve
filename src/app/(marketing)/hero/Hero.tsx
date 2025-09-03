// src/app/(marketing)/hero/Hero.tsx
"use client";

import { motion } from "framer-motion";
import {
  fadeInUp,
  wordFadeLeft,
  staggerContainer,
} from "../../../lib/framer/variants";
import Link from "next/link";
import { ParallaxHeroBackground } from "./ParallaxHeroBackground";

const headingWords = ["Discover", '', "your ", "TRUE", "self"];

export const Hero = () => {
  return (
    <section
      className="
        relative
        min-h-screen
        z-1
        pt-10 pb-24 md:pt-30 md:pb-48
        text-center
        overflow-visible
        flex flex-col justify-center
        overflow-x-hidden
      "
    >
      {/* Background gradients and overlays (this is to block
          the scrolling line from appearing over the hero)*/}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-background" />
        {/* <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 to-transparent dark:from-purple-500/40" /> */}
      </div>

      {/* Parallax background container */}
      <ParallaxHeroBackground />

      {/* Animated Content */}
      <motion.div
        className="container mx-auto px-4 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight flex justify-center flex-wrap gap-x-2 pointer-events-none">
          {headingWords.map((word, idx) => (
            <motion.span
              key={idx}
              variants={wordFadeLeft}
              className={
                word === "TRUE"
                  ? "text-transparent bg-clip-text bg-gradient-to-tr from-red-500 via-orange-400 to-yellow-300 drop-shadow-sm skew-y-1 inline-block"
                  : "inline-block"
              }
            >
              {word}
            </motion.span>
          ))}
          {/* This span **always** renders */}
          <motion.span variants={fadeInUp} className="block w-full mx-4">
            like never before
          </motion.span>
        </h1>

        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-2xl mx-auto text-base md:text-2xl text-muted-foreground"
        >
          SELVE helps you understand who you are, why you act the way you do,
          and how to become your best self — through intelligent psychological
          profiling.
        </motion.p>

        <motion.div variants={fadeInUp} className="mt-8 flex justify-center">
          <Link
            href="/assessment"
            className="inline-flex items-center justify-center px-8 py-4 font-medium text-black dark:text-white bg-white dark:bg-purple-600 border border-gray-300 dark:border-transparent rounded-full hover:bg-gray-100 dark:hover:bg-purple-700 transition-colors shadow-md"
          >
            Get Started →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};
