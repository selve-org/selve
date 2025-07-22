// src/app/(marketing)/sections/TestimonialsSection.tsx
"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/framer/variants";

const testimonials = [
  {
    quote:
      "SELVE felt like talking to a wise friend who also happened to be a data scientist. The triangulation of feedback from my peers was a game-changer for my self-awareness.",
    author: "Alex R.",
    role: "Product Manager",
  },
  {
    quote:
      "I've tried every personality test out there. SELVE is the first one that felt dynamic and truly personalized. It's less about putting you in a box and more about giving you a compass.",
    author: "Jordan T.",
    role: "UX Designer",
  },
];

export const TestimonialsSection = () => {
  return (
    <motion.section
      className="container mx-auto px-4 py-20"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div variants={fadeInUp} className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Trusted by curious minds
        </h2>
        <p className="text-muted-foreground mt-2">
          See what our first users are saying.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-700"
          >
            <blockquote className="text-lg italic">
              "{testimonial.quote}"
            </blockquote>
            <p className="mt-4 font-semibold">{testimonial.author}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};