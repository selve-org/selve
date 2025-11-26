// src/components/logo/AnimatedSelveLogo.tsx
"use client";

import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export const AnimatedLogo = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rawRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const rotate = useSpring(rawRotate, {
    stiffness: 90,
    damping: 15,
    mass: 0.3,
  });

  const rawTranslateX = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const translateX = useSpring(rawTranslateX, { stiffness: 100, damping: 18 });

  const rawOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);
  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 20 });

  return (
    <div ref={ref} className="relative h-20 flex items-center px-4 select-none">
      {/* Masked container */}
      <div className="relative w-[200px] h-12 flex items-center overflow-hidden">
        {/* Text */}
        <motion.div
          style={{ x: translateX, opacity }}
          className="absolute left-16 text-2xl font-bold tracking-widest pointer-events-none"
        >
          <Image
            src="/logo/selve-logo-text.svg"
            alt="SELVE"
            width={120}
            height={30}
            priority
            className="dark:invert pointer-events-none select-none"
            style={{ height: "auto" }}
          />
        </motion.div>

        {/* Logo */}
        <motion.div
          style={{ rotate }}
          className="absolute scale-115 left-0 w-10 h-10 z-10 pointer-events-none flex items-center justify-center"
        >
          <div className="[background:var(--background)] rounded-full w-10 h-10 flex items-center justify-center">
            <Image
              src="/logo/selve-logo.png"
              alt="SELVE Logo"
              width={40} // smaller than the container, so the black shows
              height={40}
              priority
              className="pointer-events-none select-none"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
