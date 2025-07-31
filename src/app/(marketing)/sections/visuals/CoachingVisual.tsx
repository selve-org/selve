// src/app/(marketing)/sections/visuals/CoachingVisual.tsx

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// initial order
const initialImages = [
  "/images/ai-chatbot-interface/chatbot-interface1.png",
  "/images/ai-chatbot-interface/chatbot-interface3.jpg",
  "/images/ai-chatbot-interface/chatbot-interface2.png",
];

export const CoachingVisual = () => {
  const [images, setImages] = useState(initialImages);

  useEffect(() => {
    const interval = setInterval(() => {
      setImages((prev) => {
        // rotate array: move first element to end
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 4000); // every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-64 sm:h-72 md:h-80 flex justify-end items-center pr-6 md:pr-8">
      {images.map((src, index) => {
        const zIndex = 10 + index;
        const rotation = [-8, -4, 0][index];
        const filter = `blur(${2 - index}px)`;
        const opacity = [0.6, 0.8, 1][index];
        const xOffset = (index - 2) * 120;
        const yOffset = (index - 2) * -30;

        return (
          <motion.img
            key={src}
            src={src}
            alt={`Coaching UI ${index + 1}`}
            className="absolute w-[85%] max-w-md rounded-xl shadow-2xl object-cover border border-neutral-800"
            style={{ zIndex }}
            initial={{ x: 100, opacity: 0, rotate: rotation + 10 }}
            whileInView={{ x: xOffset, y: yOffset, opacity, rotate: rotation, filter }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.7 }}
          />
        );
      })}
    </div>
  );
};
