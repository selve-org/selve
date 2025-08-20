// src/app/(marketing)/sections/CtaSection.tsx
"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/framer/variants";

export const CtaSection = () => {
  return (
    <motion.section
      className="container mx-auto px-4 pb-32"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={fadeInUp}
    >
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Ready to meet your SELVE?
        </h2>
        <p className="text-muted-foreground text-xl mb-8">
          Start your journey of self-discovery today. It's free to get started.
        </p>

        <div
          className="group relative inline-flex items-center justify-center rounded-lg overflow-hidden"
          style={{ minHeight: "44px", minWidth: "220px" }}
        >
          {/* Spinning bright purple border for light mode, overridden in dark */}
          <div
            className="absolute top-0 left-0 right-0 bottom-0 m-auto rounded-inherit z-0 dark:bg-[conic-gradient(transparent,#3b82f6,transparent_30%)]"
            style={{
              width: "300px",
              height: "300px",
              background: "conic-gradient(transparent, #a855f7, transparent 30%)", // light mode purple
              animation: "spin 6s linear infinite",
            }}
          />

          {/* Button background: white for light with gray border, dark gray for dark */}
          <div className="absolute top-px left-px right-px bottom-px rounded-[6px] z-1 bg-white border border-gray-300 dark:bg-[#1a1a1a] dark:border-none" />

          {/* Hover overlay grow effect - simplified for dark mode */}
          <div className="absolute top-0 left-0 right-0 bottom-0 rounded-[6px] bg-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-105 z-1 pointer-events-none dark:bg-white/10" />

          <button className="relative z-2 border-none outline-none cursor-pointer bg-transparent text-black py-3 px-5 text-base rounded-[6px] dark:text-white">
            Begin your journey
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </motion.section>
  );
};