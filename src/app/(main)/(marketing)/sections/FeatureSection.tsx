// src/app/(marketing)/sections/FeatureSection.tsx
"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/framer/variants";
import { ReactNode } from "react";

interface FeatureSectionProps {
  title: string;
  description: string;
  visual: ReactNode;
  layout?: "text-left" | "text-right";
}

export const FeatureSection = ({
  title,
  description,
  visual,
  layout = "text-left",
}: FeatureSectionProps) => {
  const isTextLeft = layout === "text-left";

  return (
    <motion.section
      className="container mx-auto px-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center`}>
        {/* Text Column */}
        <motion.div
          variants={fadeInUp}
          className={`${isTextLeft ? "md:order-1" : "md:order-2"}`}
        >
          <h2 className="text-3xl md:text-4xl font-normal mb-6 leading-tight font-inter">
            {title}
          </h2>
          <p className="text-muted-foreground font-inter dark:font-extralight text-lg leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </motion.div>

        {/* Visual Column */}
        <motion.div
          variants={fadeInUp}
          className={`${isTextLeft ? "md:order-2" : "md:order-1"}`}
        >
          {visual}
        </motion.div>
      </div>
    </motion.section>
  );
};
