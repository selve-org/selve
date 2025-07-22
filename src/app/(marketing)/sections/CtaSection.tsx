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
        <button className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded-lg text-lg hover:bg-primary/90 transition-colors">
          Begin Your Journey
        </button>
      </div>
    </motion.section>
  );
};