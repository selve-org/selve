// src/components/hero/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../lib/framer/variants";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 text-center overflow-hidden">
      {/* Layered Background */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/40 to-transparent" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Animated Text */}
      <motion.div
        className="container mx-auto px-4 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight"
        >
          Discover yourself <br className="hidden md:block" />
          like never before.
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground"
        >
          SELVE helps you understand who you are, why you act the way you do,
          and how to become your best self — through intelligent psychological
          profiling.
        </motion.p>

        <motion.div variants={fadeInUp} className="mt-8 flex justify-center">
          <Link
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 font-medium text-black dark:text-white bg-white dark:bg-purple-600 rounded-full hover:bg-gray-200 dark:hover:bg-purple-700 transition-colors shadow-lg"
          >
            Get started →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};
