"use client";

import React, { useRef, useEffect, useState } from 'react';

// --- SVG Icon Components ---
const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

const FastForwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white">
    <polygon points="13 19 22 12 13 5 13 19"></polygon>
    <polygon points="2 19 11 12 2 5 2 19"></polygon>
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
    <path d="M2 12h20"></path>
  </svg>
);

const PercentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white">
    <line x1="19" x2="5" y1="5" y2="19"></line>
    <circle cx="6.5" cy="6.5" r="2.5"></circle>
    <circle cx="17.5" cy="17.5" r="2.5"></circle>
  </svg>
);

// --- SpotlightCard Component ---
const SpotlightCard = ({ icon, title, description, styleProps }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const updateGlow = (e: any) => {
      card.style.setProperty('--glow-opacity', '1');
      const rect = card.getBoundingClientRect();
      let clientX, clientY;

      if (e.touches) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      
      card.style.setProperty('--x', clientX);
      card.style.setProperty('--y', clientY);
      
      const xInCard = clientX - rect.left;
      const xp = xInCard / rect.width;
      card.style.setProperty('--xp', xp.toString());
    };

    const turnOffGlow = () => {
      card.style.setProperty('--glow-opacity', '0');
    };

    card.addEventListener('mousemove', updateGlow);
    card.addEventListener('mouseleave', turnOffGlow);
    card.addEventListener('touchmove', updateGlow, { passive: false });
    card.addEventListener('touchend', turnOffGlow);
    card.addEventListener('touchcancel', turnOffGlow);

    return () => {
      card.removeEventListener('mousemove', updateGlow);
      card.removeEventListener('mouseleave', turnOffGlow);
      card.removeEventListener('touchmove', updateGlow);
      card.removeEventListener('touchend', turnOffGlow);
      card.removeEventListener('touchcancel', turnOffGlow);
    };
  }, []);

  const cardStyle = {
    "--base": styleProps.base,
    "--spread": styleProps.spread,
    "--radius": 16,
    "--border": 1,
    "--backdrop": "hsl(0 0% 100% / 0.05)",
    "--backup-border": "hsl(0 0% 100% / 0.1)",
    "--size": 200,
    "--outer": 1,
    "--border-size": "calc(var(--border, 2) * 1px)",
    "--spotlight-size": "calc(var(--size, 150) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    backgroundImage: "radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent)",
    backgroundColor: "var(--backdrop, transparent)",
    backgroundSize: "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
    backgroundPosition: "50% 50%",
    backgroundAttachment: "fixed",
    border: "var(--border-size) solid var(--backup-border)",
    position: "relative" as const,
    touchAction: "none" as const,
  };

  return (
    <div className="h-full">
      <div ref={cardRef} data-glow="true" className="relative rounded-2xl backdrop-blur-lg p-8 h-full" style={cardStyle}>
        <div data-glow="true"></div>
        <div className="relative z-10 h-full">
          <div className="text-center flex flex-col items-center justify-center h-full">
            <div className="flex items-center justify-center h-16 w-16 mx-auto bg-white/10 rounded-full">
              {icon}
            </div>
            <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
            <p className="mt-2 text-base text-gray-400 max-w-xs mx-auto">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main About Page Component ---
export default function AboutPage() {
  const features = [
    {
      icon: <ShieldCheckIcon />,
      title: "No Setup",
      description: "Just tell HeybossAI what you need — we do the rest.",
      styleProps: { base: 220, spread: 200 }
    },
    {
      icon: <FastForwardIcon />,
      title: "Instant Build",
      description: "Your database is ready in seconds, no config needed.",
      styleProps: { base: 280, spread: 300 }
    },
    {
      icon: <GlobeIcon />,
      title: "Auto-Connected",
      description: "Pages and forms connect to your data automatically.",
      styleProps: { base: 120, spread: 200 }
    },
    {
      icon: <PercentIcon />,
      title: "Scales Fast",
      description: "Grows with your business — no maintenance required.",
      styleProps: { base: 30, spread: 200 }
    }
  ];

  return (
    <>
      <style jsx global>{`
        body {
          font-family: 'Inter', sans-serif;
          overflow: hidden; /* Prevent scrolling issues with touch events on cards */
        }

        [data-glow]::before,
        [data-glow]::after {
          pointer-events: none;
          content: "";
          position: absolute;
          inset: calc(var(--border-size) * -1);
          border: var(--border-size) solid transparent;
          border-radius: calc(var(--radius) * 1px);
          background-attachment: fixed;
          background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
          background-repeat: no-repeat;
          background-position: 50% 50%;
          mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
          mask-clip: padding-box, border-box;
          mask-composite: intersect;
          opacity: var(--glow-opacity, 0);
          transition: opacity 500ms ease;
        }

        [data-glow]::before {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
            calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
            hsl(
              var(--hue, 210)
              calc(var(--saturation, 100) * 1%)
              calc(var(--lightness, 50) * 1%) /
              var(--border-spot-opacity, 1)
            ),
            transparent 100%
          );
          filter: brightness(2);
        }

        [data-glow]::after {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
            calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
            hsl(0 100% 100% / var(--border-light-opacity, 1)),
            transparent 100%
          );
        }

        [data-glow] [data-glow] {
          position: absolute;
          inset: 0;
          will-change: filter;
          opacity: var(--outer, 1);
          border-radius: calc(var(--radius) * 1px);
          border-width: calc(var(--border-size) * 20);
          filter: blur(calc(var(--border-size) * 10));
          background: none;
          pointer-events: none;
          border: none;
        }

        [data-glow] > [data-glow]::before {
          inset: -10px;
          border-width: 10px;
        }
      `}</style>
      <main className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">SELVE</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're building the future of AI-powered development. Our mission is to make creating applications as simple as having a conversation.
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
        </div>
      </main>
    </>
  );
}
