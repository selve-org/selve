// src/app/(main)/about/page.tsx
"use client";

import React from "react";
import { Sparkles, Users, Brain, Shield, Target, Heart, Compass, Palette } from "lucide-react";
import CanvasButton from "@/components/buttons/CanvasButton";
import SpotlightCard from "@/components/cards/SpotlightCard";
import AnimatedIcon from "@/components/icons/AnimatedIcon";

export default function AboutPage() {
  const dimensions = [
    {
      icon: <AnimatedIcon Icon={Sparkles} color="#FFD700" />,
      title: "LUMEN ✨",
      description: "Social Energy — those who shine and illuminate rooms with their presence.",
      styleProps: { base: 40, spread: 200 },
    },
    {
      icon: <AnimatedIcon Icon={Shield} color="#C0C0C0" />,
      title: "AETHER 🌫️",
      description: "Emotional Stability — rising above turbulence with transcendent calm.",
      styleProps: { base: 200, spread: 200 },
    },
    {
      icon: <AnimatedIcon Icon={Heart} color="#9370DB" />,
      title: "ORPHEUS 🎵",
      description: "Warmth & Empathy — attuning to every heart through deep connection.",
      styleProps: { base: 280, spread: 200 },
    },
    {
      icon: <AnimatedIcon Icon={Target} color="#228B22" />,
      title: "VARA ⚖️",
      description: "Honesty & Integrity — sacred truth-keeping and unwavering ethics.",
      styleProps: { base: 120, spread: 200 },
    },
    {
      icon: <AnimatedIcon Icon={Brain} color="#CD7F32" />,
      title: "CHRONOS ⏳",
      description: "Patience & Flexibility — understanding natural rhythms and timing.",
      styleProps: { base: 30, spread: 200 },
    },
    {
      icon: <AnimatedIcon Icon={Sparkles} color="#DC143C" />,
      title: "KAEL 🔥",
      description: "Assertiveness — the warrior spirit and focused will to lead.",
      styleProps: { base: 0, spread: 200 },
    },
    {
      icon: <AnimatedIcon Icon={Compass} color="#4682B4" />,
      title: "ORIN 🧭",
      description: "Organization — building lasting systems with enduring reliability.",
      styleProps: { base: 220, spread: 200 },
    },
    {
      icon: <AnimatedIcon Icon={Palette} color="#9966CC" />,
      title: "LYRA 🦋",
      description: "Openness & Curiosity — exploring new frontiers and embracing complexity.",
      styleProps: { base: 260, spread: 200 },
    },
  ];

  return (
    <>
      <main className="bg-background text-foreground font-sans min-h-screen py-16 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                SELVE
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              SELVE is a personality profiling platform built on 8 scientifically validated 
              dimensions, combining modern behavioral psychology with mythological archetypes 
              to help you truly understand yourself.
            </p>
          </div>

          {/* Mission Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Users className="w-6 h-6 text-purple-500" />
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We believe self-knowledge is the foundation for personal growth, better 
                  relationships, and meaningful careers. SELVE goes beyond simple personality 
                  quizzes by incorporating feedback from the people who know you best—your friends.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our Friend Assessment feature reveals your blind spots by comparing how you 
                  see yourself with how others perceive you. This 360° view creates a richer, 
                  more accurate portrait of who you really are.
                </p>
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Brain className="w-6 h-6 text-purple-500" />
                  The Science
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  SELVE's framework is validated across 1M+ responses from established 
                  psychometric instruments including the Big Five (IPIP-FFM), HEXACO, and 16PF.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our average reliability of α = 0.855 (Excellent) exceeds industry standards, 
                  with all dimensions meeting or exceeding the "Good" threshold (α {">"} 0.80). 
                  This isn't pop psychology—it's rigorous science made accessible.
                </p>
              </div>
            </div>
          </div>

          {/* The 8 Dimensions */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-foreground mb-4">
              The 8 Dimensions
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Each dimension represents a fundamental aspect of human personality, 
              validated through empirical data with mythological archetypes that resonate.
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {dimensions.map((dimension, index) => (
                <SpotlightCard
                  key={index}
                  icon={dimension.icon}
                  title={dimension.title}
                  description={dimension.description}
                  styleProps={dimension.styleProps}
                />
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="text-center mb-16">
            <blockquote className="text-2xl md:text-3xl font-light italic text-muted-foreground">
              "Know thyself"
            </blockquote>
            <p className="text-sm text-muted-foreground mt-2">— Delphic Maxim</p>
            <p className="text-sm text-purple-500 mt-1 font-medium">
              SELVE: Self-Exploration, Learning, Validation, Evolution
            </p>
          </div>

          {/* Call-to-Action Button */}
          <div className="flex justify-center">
            <CanvasButton />
          </div>
        </div>
      </main>
    </>
  );
}
