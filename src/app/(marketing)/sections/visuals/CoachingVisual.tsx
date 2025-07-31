// src/app/(marketing)/sections/visuals/CoachingVisual.tsx

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// initial order of coaching UI images
const initialImages = [
  "/images/ai-chatbot-interface/chatbot-interface1.png",
  "/images/ai-chatbot-interface/chatbot-interface3.jpg",
  "/images/ai-chatbot-interface/chatbot-interface2.png",
];

export const CoachingVisual = () => {
  const [images, setImages] = useState(initialImages);

  // rotate the images array at random intervals between 20-60 seconds
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const rotate = () => {
      setImages((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      const randomDelay = Math.random() * (60000 - 20000) + 20000;
      timeoutId = setTimeout(rotate, randomDelay);
    };
    rotate();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className="relative w-full h-60 sm:h-72 md:h-80 flex justify-end items-center pr-0 transform"
      style={{ translate: "16px 0" }}
    >
      {images.map((src, index) => {
        const zIndex = 10 + index;
        const rotation = [-8, -4, 0][index];
        const filter = `blur(${2 - index}px)`;
        const opacity = [0.6, 0.8, 1][index];
        const xOffset = (index - 2) * 80;
        const yOffset = (index - 2) * -30;

        return (
          <motion.div
            key={src}
            className="aspect-[3/2] w-[85%] max-w-md rounded-xl overflow-hidden shadow-2xl absolute inset-0 m-auto bg-white dark:bg-neutral-950 flex items-center justify-center"
            style={{ zIndex }}
            initial={{ x: 100, opacity: 0, rotate: rotation + 10 }}
            animate={{
              x: xOffset,
              y: yOffset,
              opacity,
              rotate: rotation,
              filter,
            }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <img
              src={src}
              alt={`Coaching UI ${index + 1}`}
              className="w-full h-full object-contain select-none pointer-events-none"
              draggable={false}
              onContextMenu={(e) => e.stopPropagation()}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
