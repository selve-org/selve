// src/app/(marketing)/sections/visuals/CoachingVisual.tsx

// src/app/(marketing)/sections/visuals/CoachingVisual.tsx

"use client";

import { motion } from "framer-motion";

const images = [
  "/images/ai-chatbot-interface/chatbot-interface1.png",
  "/images/ai-chatbot-interface/chatbot-interface2.png",
  "/images/ai-chatbot-interface/chatbot-interface3.jpg",
];

export const CoachingVisual = () => {
  return (
    <div className="relative w-full h-64 sm:h-72 md:h-80 flex justify-end items-center pr-6 md:pr-8">
      {images.map((src, index) => {
        // --- Animation & Styling Values ---

        // 1. Final state values for when the animation is complete.
        const zIndex = 10 + index;
        const rotation = [-8, -4, 0][index]; // Back image is rotated most.
        const filter = `blur(${2 - index * 1}px)`; // index 0: blur(2px), index 1: blur(1px), index 2: blur(0px)
        const opacity = [0.6, 0.8, 1][index]; // Back image is most transparent.

        // Position the top image (index 2) at (0,0) and push the others behind it.
        const xOffset = (index - 2) * 120; // Pushes images left.
        const yOffset = (index - 2) * -30; // Pushes images down.

        return (
          <motion.img
            key={src}
            src={src}
            alt={`Coaching UI ${index + 1}`}
            className="absolute w-[85%] max-w-md rounded-xl shadow-2xl object-cover border border-neutral-800"
            style={{ zIndex }} // zIndex can stay here as it's not a transform property.
            
            // 2. Define the initial state (before animation starts).
            initial={{
              x: 100, // Start off-screen to the right.
              opacity: 0,
              rotate: rotation + 10, // Start with a bit more rotation for a nice effect.
            }}

            // 3. Define the final state (what to animate to).
            //    ✅ This is the key change: `rotate` is now inside Framer Motion's props.
            whileInView={{
              x: xOffset,
              y: yOffset,
              opacity: opacity,
              rotate: rotation,
              filter: filter,
            }}

            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1], // A sharp ease-out curve.
            }}
            viewport={{ once: true, amount: 0.7 }}
          />
        );
      })}
    </div>
  );
};