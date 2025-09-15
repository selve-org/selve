"use client";

import React from "react";
import { ShieldCheck, Zap, Globe, TrendingUp } from "lucide-react";
import CanvasButton from "@/components/buttons/CanvasButton";
import SpotlightCard from "@/components/cards/SpotlightCard";
import AnimatedIcon from "@/components/icons/AnimatedIcon";
// import styles from "./about.module.css";

export default function AboutPage() {
  const features = [
    {
      icon: <AnimatedIcon Icon={ShieldCheck} color="#3B82F6" />, // Bright blue
      title: "No Setup",
      description: "Just tell HeybossAI what you need — we do the rest.",
      styleProps: { base: 220, spread: 200 },
    },
    {
      icon: <AnimatedIcon Icon={Zap} color="#10B981" />, // Bright green
      title: "Instant Build",
      description: "Your database is ready in seconds, no config needed.",
      styleProps: { base: 280, spread: 300 },
    },
    {
      icon: <AnimatedIcon Icon={Globe} color="#F59E0B" />, // Bright amber
      title: "Auto-Connected",
      description: "Pages and forms connect to your data automatically.",
      styleProps: { base: 120, spread: 200 },
    },
    {
      icon: <AnimatedIcon Icon={TrendingUp} color="#EF4444" />, // Bright red
      title: "Scales Fast",
      description: "Grows with your business — no maintenance required.",
      styleProps: { base: 30, spread: 200 },
    },
  ];

  return (
    <>
      <main className="bg-background text-foreground font-sans min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                SELVE
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're building the future of AI-powered development. Our mission
              is to make creating applications as simple as having a
              conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <SpotlightCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                styleProps={feature.styleProps}
              />
            ))}
          </div>

          {/* Call-to-Action Button */}
          <div className="flex justify-center mt-16">
            <CanvasButton />
          </div>
        </div>
      </main>
    </>
  );
}
