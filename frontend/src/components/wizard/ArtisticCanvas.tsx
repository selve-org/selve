// src/components/wizard/ArtisticCanvas.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * ArtisticCanvas Component
 *
 * Displays rotating artistic backgrounds for the wizard
 * - Shows patterns OR images with smooth transitions
 * - Rotates every random interval (<60 seconds)
 * - Images from /public/artistico/
 * - Patterns as fallback for fast loading
 * - 100vh height, non-scrollable
 */

interface ArtisticItem {
  type: "image" | "pattern";
  src?: string;
  colors?: string[];
  patternType?: "gradient" | "geometric" | "abstract" | "waves" | "mesh";
}

export const ArtisticCanvas: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState<ArtisticItem[]>([]);
  const [imageLoadError, setImageLoadError] = useState<Set<string>>(new Set());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Artistic images from public folder
  const artisticImages = [
    // Abstract & concept art
    "/artistico/20250728_0025_image.png",
    "/artistico/Behaviour.webp",
    "/artistico/HD-wallpaper-girl-painting-abstract-art-painting-art-abstract-artist-digital-art.jpg",
    "/artistico/digital-art-style-mental-health-day-awareness-illustration.jpg",
    "/artistico/pixlr-image-generator-6886ad9322ee964dff70b573.png",
    "/artistico/pixlr-image-generator-6886ad9322ee964dff70b575.png",
    "/artistico/pixlr-image-generator-6886ad9322ee964dff70b576.png",
    "/artistico/yin-yang-nature-stockcake.jpg",
    "/artistico/Neural-Intelligence-In-Art-And-Design.jpg",
    "/artistico/representation-collective-mind-process-concept.jpg",
    "/artistico/doubt.jpg",

    // Nature & connection themes
    "/artistico/nature.webp",
    "/artistico/Nature.jpeg",
    "/artistico/autumn.avif",
    "/artistico/Lines-of-Connection-Getty-15.webp",

    // Cyril Rolando digital illustrations (dreamlike, introspective)
    "/artistico/cyril-rolando-digital-illustrations-1.jpg",
    "/artistico/cyril-rolando-digital-illustrations-3.jpg",
    "/artistico/cyril-rolando-digital-illustrations-5.jpg",
    "/artistico/cyril-rolando-digital-illustrations-7.jpg",
    "/artistico/cyril-rolando-digital-illustrations-8.jpg",
    "/artistico/cyril-rolando-digital-illustrations-10.jpg",
    "/artistico/cyril-rolando-digital-illustrations-12.jpg",
    "/artistico/cyril-rolando-digital-illustrations-13.jpg",
    "/artistico/cyril-rolando-digital-illustrations-14.jpg",
    "/artistico/cyril-rolando-digital-illustrations-15.jpg",
    "/artistico/cyril-rolando-digital-illustrations-16.jpg",
    "/artistico/cyril-rolando-digital-illustrations-18.jpg",

    // Personality & emotion themes
    "/artistico/A-multi-colored-painting-of-a-girl_s-face.jpg",
    "/artistico/dibujo-artistico.webp",
    "/artistico/multiple_personality-1398777481m.webp",
    "/artistico/personality-study-series-face-young.jpg",
    "/artistico/original-ad0edf5a242edc5bedef9f2d050cd534.webp",

    // Emotional range & storytelling
    "/artistico/lonely.jpg",
    "/artistico/anger-catoon.jpg",
    "/artistico/cartoon-sad.jpg",
    "/artistico/manipulate-art.jpg",
    "/artistico/manipulation-art.jpg",
    "/artistico/istockphoto-813059638-612x612.jpg",
    "/artistico/images.jpg",
    "/artistico/trees.jpg",
    "/artistico/illustration-of-cartoon-night-nature-scene.jpg",
  ];

  // Sophisticated artistic patterns as fallback
  const artisticPatterns: ArtisticItem[] = [
    {
      type: "pattern",
      patternType: "gradient",
      colors: ["#0f172a", "#1e293b", "#334155"],
    },
    {
      type: "pattern",
      patternType: "gradient",
      colors: ["#1e1b4b", "#312e81", "#4c1d95"],
    },
    {
      type: "pattern",
      patternType: "gradient",
      colors: ["#064e3b", "#065f46", "#047857"],
    },
    {
      type: "pattern",
      patternType: "gradient",
      colors: ["#1e293b", "#0f172a", "#020617"],
    },
    {
      type: "pattern",
      patternType: "mesh",
      colors: ["#0f172a", "#581c87", "#064e3b"],
    },
    {
      type: "pattern",
      patternType: "abstract",
      colors: ["#1e1b4b", "#7c2d12", "#064e3b"],
    },
  ];

  // Initialize items: Start with patterns, then add images
  useEffect(() => {
    // Always start with patterns for immediate display
    const initialItems: ArtisticItem[] = [...artisticPatterns];

    // Add images that haven't failed to load
    artisticImages.forEach((src) => {
      if (!imageLoadError.has(src)) {
        initialItems.push({ type: "image", src });
      }
    });

    // Shuffle for variety
    const shuffled = initialItems.sort(() => Math.random() - 0.5);
    setItems(shuffled);
  }, [imageLoadError]);

  // Rotation timer - random interval between 10-20 seconds
  useEffect(() => {
    if (items.length === 0) return;

    const getRandomInterval = () => Math.random() * 10000 + 10000; // 10-20 seconds

    const rotate = () => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
      const nextInterval = getRandomInterval();
      timeoutId = setTimeout(rotate, nextInterval);
    };

    let timeoutId = setTimeout(rotate, getRandomInterval());

    return () => clearTimeout(timeoutId);
  }, [items.length]);

  // Draw canvas patterns
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentItem = items[currentIndex];
    if (!currentItem || currentItem.type !== "pattern") return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const { patternType, colors = [] } = currentItem;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (patternType) {
      case "gradient":
        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        colors.forEach((color, i) => {
          gradient.addColorStop(i / (colors.length - 1), color);
        });
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        break;

      case "mesh":
        // Mesh gradient effect
        const meshGradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          Math.max(canvas.width, canvas.height)
        );
        colors.forEach((color, i) => {
          meshGradient.addColorStop(i / (colors.length - 1), color);
        });
        ctx.fillStyle = meshGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add mesh overlay
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 50) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 50) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
        break;

      case "abstract":
        // Abstract organic shapes
        const bgGradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        colors.forEach((color, i) => {
          bgGradient.addColorStop(i / (colors.length - 1), color);
        });
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add organic blobs
        for (let i = 0; i < 5; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const radius = Math.random() * 200 + 100;
          const blobGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
          blobGradient.addColorStop(
            0,
            `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
              Math.random() * 255
            }, 0.1)`
          );
          blobGradient.addColorStop(1, "transparent");
          ctx.fillStyle = blobGradient;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
        break;

      default:
        // Default gradient
        const defaultGradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        colors.forEach((color, i) => {
          defaultGradient.addColorStop(i / (colors.length - 1), color);
        });
        ctx.fillStyle = defaultGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [currentIndex, items]);

  const currentItem = items[currentIndex];

  if (!currentItem) {
    // Fallback loading state
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800" />
    );
  }

  const handleImageError = (src: string) => {
    setImageLoadError((prev) => new Set([...prev, src]));
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 animate-gradient-xy" />

      <AnimatePresence mode="wait">
        {currentItem.type === "image" && currentItem.src ? (
          <motion.div
            key={`image-${currentIndex}`}
            className="w-full h-full absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Image
              src={currentItem.src}
              alt="Artistic background"
              fill
              className="object-cover"
              priority={currentIndex === 0}
              onError={() => handleImageError(currentItem.src!)}
            />
            {/* Subtle overlay for better image blending */}
            <div className="absolute inset-0 bg-white/10 dark:bg-black/20" />
          </motion.div>
        ) : (
          <motion.canvas
            ref={canvasRef}
            key={`pattern-${currentIndex}`}
            className="w-full h-full absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
