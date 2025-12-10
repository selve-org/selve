"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { MouseEvent } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// LINEAR-STYLE ELECTRIC CURRENT COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

type CurrentColor = "amber" | "cyan" | "violet" | "emerald" | "rose";

const currentColors: Record<CurrentColor, { glow: string; pulse: string; bg: string }> = {
  amber: {
    glow: "rgba(251, 191, 36, 0.9)",
    pulse: "rgba(251, 191, 36, 1)",
    bg: "rgba(251, 191, 36, 0.15)",
  },
  cyan: {
    glow: "rgba(34, 211, 238, 0.9)",
    pulse: "rgba(34, 211, 238, 1)",
    bg: "rgba(34, 211, 238, 0.15)",
  },
  violet: {
    glow: "rgba(167, 139, 250, 0.9)",
    pulse: "rgba(167, 139, 250, 1)",
    bg: "rgba(167, 139, 250, 0.15)",
  },
  emerald: {
    glow: "rgba(52, 211, 153, 0.9)",
    pulse: "rgba(52, 211, 153, 1)",
    bg: "rgba(52, 211, 153, 0.15)",
  },
  rose: {
    glow: "rgba(251, 113, 133, 0.9)",
    pulse: "rgba(251, 113, 133, 1)",
    bg: "rgba(251, 113, 133, 0.15)",
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 1: ADAPTIVE ASSESSMENT - Neural Network Visualization
// ═══════════════════════════════════════════════════════════════════════════════

const NeuralNetworkViz = () => {
  const nodes = [
    // Input layer
    { x: 60, y: 40, layer: 0 },
    { x: 60, y: 100, layer: 0 },
    { x: 60, y: 160, layer: 0 },
    { x: 60, y: 220, layer: 0 },
    // Hidden layer 1
    { x: 180, y: 70, layer: 1 },
    { x: 180, y: 130, layer: 1 },
    { x: 180, y: 190, layer: 1 },
    // Hidden layer 2
    { x: 300, y: 100, layer: 2 },
    { x: 300, y: 160, layer: 2 },
    // Output
    { x: 420, y: 130, layer: 3 },
  ];

  const connections = [
    // Input to hidden 1
    { from: 0, to: 4 }, { from: 0, to: 5 },
    { from: 1, to: 4 }, { from: 1, to: 5 }, { from: 1, to: 6 },
    { from: 2, to: 5 }, { from: 2, to: 6 },
    { from: 3, to: 5 }, { from: 3, to: 6 },
    // Hidden 1 to hidden 2
    { from: 4, to: 7 }, { from: 4, to: 8 },
    { from: 5, to: 7 }, { from: 5, to: 8 },
    { from: 6, to: 7 }, { from: 6, to: 8 },
    // Hidden 2 to output
    { from: 7, to: 9 }, { from: 8, to: 9 },
  ];

  return (
    <div className="relative h-[280px] w-full overflow-hidden rounded-2xl bg-neutral-950">
      <svg viewBox="0 0 480 260" className="h-full w-full">
        <defs>
          <linearGradient id="neural-pulse-amber" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor={currentColors.amber.pulse} />
            <stop offset="60%" stopColor={currentColors.amber.pulse} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="neural-glow-amber">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Static connection lines */}
        {connections.map((conn, i) => (
          <line
            key={`static-${i}`}
            x1={nodes[conn.from].x}
            y1={nodes[conn.from].y}
            x2={nodes[conn.to].x}
            y2={nodes[conn.to].y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
          />
        ))}

        {/* Animated pulse lines */}
        {connections.map((conn, i) => (
          <line
            key={`pulse-${i}`}
            x1={nodes[conn.from].x}
            y1={nodes[conn.from].y}
            x2={nodes[conn.to].x}
            y2={nodes[conn.to].y}
            stroke="url(#neural-pulse-amber)"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#neural-glow-amber)"
            className="neural-current"
            style={{
              animationDelay: `${i * 0.15}s`,
              opacity: 0,
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.layer === 3 ? 14 : 10}
              fill="rgba(0,0,0,0.6)"
              stroke={node.layer === 3 ? currentColors.amber.pulse : "rgba(255,255,255,0.2)"}
              strokeWidth={node.layer === 3 ? 2 : 1}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={4}
              fill={node.layer === 3 ? currentColors.amber.pulse : "rgba(255,255,255,0.4)"}
              className={node.layer === 3 ? "neural-node-pulse" : ""}
            />
          </g>
        ))}

        {/* Labels */}
        <text x="60" y="250" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">
          Questions
        </text>
        <text x="420" y="250" fill={currentColors.amber.pulse} fontSize="10" textAnchor="middle">
          Profile
        </text>
      </svg>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 2: FRIEND INVITES - Connection Graph Visualization
// ═══════════════════════════════════════════════════════════════════════════════

const ConnectionGraphViz = () => {
  const centerNode = { x: 240, y: 130 };
  const friendNodes = [
    { x: 100, y: 60, label: "A" },
    { x: 380, y: 60, label: "B" },
    { x: 60, y: 180, label: "C" },
    { x: 420, y: 180, label: "D" },
    { x: 160, y: 240, label: "E" },
    { x: 320, y: 240, label: "F" },
  ];

  return (
    <div className="relative h-[280px] w-full overflow-hidden rounded-2xl bg-neutral-950">
      <svg viewBox="0 0 480 280" className="h-full w-full">
        <defs>
          <linearGradient id="friend-pulse-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="45%" stopColor={currentColors.cyan.pulse} />
            <stop offset="55%" stopColor={currentColors.cyan.pulse} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="friend-glow-cyan">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="center-glow">
            <stop offset="0%" stopColor={currentColors.cyan.bg} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Center glow */}
        <circle cx={centerNode.x} cy={centerNode.y} r="80" fill="url(#center-glow)" />

        {/* Connection lines - static */}
        {friendNodes.map((friend, i) => (
          <line
            key={`static-friend-${i}`}
            x1={centerNode.x}
            y1={centerNode.y}
            x2={friend.x}
            y2={friend.y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="2"
          />
        ))}

        {/* Connection lines - animated current */}
        {friendNodes.map((friend, i) => (
          <line
            key={`pulse-friend-${i}`}
            x1={friend.x}
            y1={friend.y}
            x2={centerNode.x}
            y2={centerNode.y}
            stroke="url(#friend-pulse-cyan)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#friend-glow-cyan)"
            className="friend-current"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        {/* Friend nodes */}
        {friendNodes.map((friend, i) => (
          <g key={`friend-node-${i}`}>
            <circle
              cx={friend.x}
              cy={friend.y}
              r="20"
              fill="rgba(0,0,0,0.7)"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
            <text
              x={friend.x}
              y={friend.y + 4}
              fill="rgba(255,255,255,0.5)"
              fontSize="12"
              textAnchor="middle"
              fontWeight="500"
            >
              {friend.label}
            </text>
          </g>
        ))}

        {/* Center node (You) */}
        <circle
          cx={centerNode.x}
          cy={centerNode.y}
          r="28"
          fill="rgba(0,0,0,0.8)"
          stroke={currentColors.cyan.pulse}
          strokeWidth="2"
          className="center-node-pulse"
        />
        <text
          x={centerNode.x}
          y={centerNode.y + 5}
          fill={currentColors.cyan.pulse}
          fontSize="13"
          textAnchor="middle"
          fontWeight="600"
        >
          You
        </text>
      </svg>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 3: BLUEPRINT FUSION - Data Flow Visualization
// ═══════════════════════════════════════════════════════════════════════════════

const BlueprintFusionViz = () => {
  return (
    <div className="relative h-[280px] w-full overflow-hidden rounded-2xl bg-neutral-950">
      <svg viewBox="0 0 480 280" className="h-full w-full">
        <defs>
          <linearGradient id="fusion-pulse-violet" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor={currentColors.violet.pulse} />
            <stop offset="60%" stopColor={currentColors.violet.pulse} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="fusion-pulse-emerald" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor={currentColors.emerald.pulse} />
            <stop offset="60%" stopColor={currentColors.emerald.pulse} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="fusion-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Self signal box */}
        <rect x="30" y="40" width="100" height="60" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
        <text x="80" y="75" fill="rgba(255,255,255,0.5)" fontSize="11" textAnchor="middle">Self Signal</text>

        {/* Friend signal box */}
        <rect x="30" y="180" width="100" height="60" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
        <text x="80" y="215" fill="rgba(255,255,255,0.5)" fontSize="11" textAnchor="middle">Friend Signal</text>

        {/* Merge point */}
        <circle cx="240" cy="140" r="24" fill="rgba(0,0,0,0.6)" stroke={currentColors.violet.pulse} strokeWidth="2" />
        <text x="240" y="144" fill={currentColors.violet.pulse} fontSize="10" textAnchor="middle">FUSE</text>

        {/* Blueprint output */}
        <rect x="340" y="100" width="110" height="80" rx="10" fill="rgba(0,0,0,0.5)" stroke={currentColors.violet.pulse} strokeWidth="2" />
        <text x="395" y="135" fill={currentColors.violet.pulse} fontSize="11" textAnchor="middle" fontWeight="600">Blueprint</text>
        <text x="395" y="155" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">8 Dimensions</text>

        {/* Static paths */}
        <path d="M 130 70 C 180 70, 180 140, 216 140" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
        <path d="M 130 210 C 180 210, 180 140, 216 140" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
        <path d="M 264 140 L 340 140" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />

        {/* Animated current - Self to Merge */}
        <path
          d="M 130 70 C 180 70, 180 140, 216 140"
          fill="none"
          stroke="url(#fusion-pulse-violet)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#fusion-glow)"
          className="fusion-current-1"
        />

        {/* Animated current - Friend to Merge */}
        <path
          d="M 130 210 C 180 210, 180 140, 216 140"
          fill="none"
          stroke="url(#fusion-pulse-emerald)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#fusion-glow)"
          className="fusion-current-2"
        />

        {/* Animated current - Merge to Blueprint */}
        <path
          d="M 264 140 L 340 140"
          fill="none"
          stroke="url(#fusion-pulse-violet)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#fusion-glow)"
          className="fusion-current-3"
        />
      </svg>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 4: COACH CHAT - Chat Flow Visualization
// ═══════════════════════════════════════════════════════════════════════════════

const CoachChatViz = () => {
  return (
    <div className="relative h-[280px] w-full overflow-hidden rounded-2xl bg-neutral-950 p-4">
      <div className="flex h-full flex-col justify-between">
        {/* Chat messages with flowing current */}
        <div className="space-y-3">
          {/* User message */}
          <div className="flex items-start gap-3">
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-xs text-white/50">You</span>
              </div>
            </div>
            <div className="relative flex-1">
              <div className="rounded-xl bg-white/5 px-4 py-2.5 text-sm text-white/60">
                How should I approach this negotiation?
              </div>
              <svg className="absolute -right-2 top-1/2 h-16 w-24 -translate-y-1/2" viewBox="0 0 96 64">
                <defs>
                  <linearGradient id="chat-pulse-rose" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor={currentColors.rose.pulse} />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path d="M 0 32 C 30 32, 50 32, 96 32" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
                <path
                  d="M 0 32 C 30 32, 50 32, 96 32"
                  stroke="url(#chat-pulse-rose)"
                  strokeWidth="2"
                  fill="none"
                  className="chat-current-out"
                />
              </svg>
            </div>
          </div>

          {/* Coach processing indicator */}
          <div className="flex justify-center">
            <div className="relative h-12 w-48">
              <svg viewBox="0 0 192 48" className="h-full w-full">
                <defs>
                  <linearGradient id="process-gradient">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor={currentColors.rose.pulse} />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                {/* Profile, Context, Response nodes */}
                <circle cx="32" cy="24" r="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" />
                <circle cx="96" cy="24" r="10" fill="rgba(0,0,0,0.5)" stroke={currentColors.rose.pulse} strokeWidth="1.5" />
                <circle cx="160" cy="24" r="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" />

                {/* Connection lines */}
                <line x1="44" y1="24" x2="82" y2="24" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
                <line x1="110" y1="24" x2="148" y2="24" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />

                {/* Animated currents */}
                <line x1="44" y1="24" x2="82" y2="24" stroke="url(#process-gradient)" strokeWidth="2" className="process-current-1" />
                <line x1="110" y1="24" x2="148" y2="24" stroke="url(#process-gradient)" strokeWidth="2" className="process-current-2" />

                {/* Labels */}
                <text x="32" y="44" fill="rgba(255,255,255,0.3)" fontSize="7" textAnchor="middle">Profile</text>
                <text x="96" y="44" fill={currentColors.rose.pulse} fontSize="7" textAnchor="middle">Process</text>
                <text x="160" y="44" fill="rgba(255,255,255,0.3)" fontSize="7" textAnchor="middle">Response</text>
              </svg>
            </div>
          </div>

          {/* Coach response */}
          <div className="flex items-start gap-3">
            <svg className="h-16 w-24 flex-shrink-0" viewBox="0 0 96 64">
              <path d="M 96 32 C 66 32, 46 32, 0 32" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
              <path
                d="M 96 32 C 66 32, 46 32, 0 32"
                stroke="url(#chat-pulse-rose)"
                strokeWidth="2"
                fill="none"
                className="chat-current-in"
              />
            </svg>
            <div className="flex-1">
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-rose-500/20 to-rose-600/20 border border-rose-500/30 flex items-center justify-center">
                  <span className="text-xs text-rose-400">S</span>
                </div>
              </div>
            </div>
            <div className="flex-1 rounded-xl bg-rose-500/5 border border-rose-500/10 px-4 py-2.5 text-sm text-white/60">
              <span className="text-rose-400">Based on your ORIN score,</span> lead with data first, then emotional framing...
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
          <span className="text-sm text-white/30">Ask your blueprint anything...</span>
          <div className="ml-auto h-6 w-6 rounded-full bg-rose-500/20 flex items-center justify-center">
            <svg className="h-3 w-3 text-rose-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// OUTCOME VISUALIZATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const ClarityViz = () => (
  <div className="relative h-[200px] w-full overflow-hidden rounded-xl bg-neutral-950 p-4">
    <svg viewBox="0 0 320 160" className="h-full w-full">
      <defs>
        <linearGradient id="clarity-bar" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={currentColors.amber.pulse} />
          <stop offset="100%" stopColor={currentColors.amber.bg} />
        </linearGradient>
      </defs>
      {/* Dimension bars */}
      {["LUMEN", "AETHER", "ORPHEUS", "ORIN"].map((dim, i) => (
        <g key={dim} transform={`translate(0, ${i * 38})`}>
          <text x="10" y="20" fill="rgba(255,255,255,0.4)" fontSize="10">{dim}</text>
          <rect x="80" y="10" width="220" height="16" rx="4" fill="rgba(255,255,255,0.03)" />
          <rect
            x="80"
            y="10"
            width={140 + i * 20}
            height="16"
            rx="4"
            fill="url(#clarity-bar)"
            className="clarity-bar"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
          <text x={230 + i * 20} y="22" fill={currentColors.amber.pulse} fontSize="10" fontWeight="600">
            {65 + i * 8}
          </text>
        </g>
      ))}
    </svg>
  </div>
);

const AlignmentViz = () => (
  <div className="relative h-[200px] w-full overflow-hidden rounded-xl bg-neutral-950 p-4">
    <svg viewBox="0 0 320 160" className="h-full w-full">
      <defs>
        <linearGradient id="align-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor={currentColors.emerald.pulse} />
          <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor={currentColors.rose.pulse} />
        </linearGradient>
      </defs>
      
      {/* Scale */}
      <rect x="40" y="70" width="240" height="4" rx="2" fill="url(#align-gradient)" />
      
      {/* Labels */}
      <text x="40" y="60" fill={currentColors.emerald.pulse} fontSize="9">ALIGNED</text>
      <text x="280" y="60" fill={currentColors.rose.pulse} fontSize="9" textAnchor="end">DIVERGENT</text>
      
      {/* Markers */}
      {[0.2, 0.35, 0.5, 0.7, 0.85].map((pos, i) => (
        <g key={i}>
          <circle
            cx={40 + pos * 240}
            cy="72"
            r="8"
            fill="rgba(0,0,0,0.8)"
            stroke={pos < 0.5 ? currentColors.emerald.pulse : pos > 0.5 ? currentColors.rose.pulse : "rgba(255,255,255,0.3)"}
            strokeWidth="2"
            className="alignment-marker"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
          <text x={40 + pos * 240} y="100" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">
            {["LUMEN", "AETHER", "ORPHEUS", "ORIN", "LYRA"][i]}
          </text>
        </g>
      ))}
      
      {/* You vs Friends indicators */}
      <circle cx="100" cy="130" r="4" fill={currentColors.cyan.pulse} />
      <text x="110" y="134" fill="rgba(255,255,255,0.4)" fontSize="9">Self</text>
      <circle cx="180" cy="130" r="4" fill={currentColors.violet.pulse} />
      <text x="190" y="134" fill="rgba(255,255,255,0.4)" fontSize="9">Friends</text>
    </svg>
  </div>
);

const CoachStyleViz = () => (
  <div className="relative h-[200px] w-full overflow-hidden rounded-xl bg-neutral-950 p-4">
    <div className="flex h-full flex-col justify-between">
      {/* Style options with current flowing to selected */}
      <svg viewBox="0 0 320 140" className="h-full w-full">
        <defs>
          <linearGradient id="style-pulse" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={currentColors.violet.pulse} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        
        {/* Profile node */}
        <circle cx="50" cy="70" r="16" fill="rgba(0,0,0,0.6)" stroke={currentColors.violet.pulse} strokeWidth="2" />
        <text x="50" y="74" fill={currentColors.violet.pulse} fontSize="8" textAnchor="middle">YOU</text>
        
        {/* Style options */}
        {[
          { y: 30, label: "Direct", active: false },
          { y: 70, label: "Compassionate", active: true },
          { y: 110, label: "Strategic", active: false },
        ].map((style, i) => (
          <g key={style.label}>
            {/* Connection line */}
            <line x1="70" y1="70" x2="130" y2={style.y} stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
            {style.active && (
              <line
                x1="70"
                y1="70"
                x2="130"
                y2={style.y}
                stroke="url(#style-pulse)"
                strokeWidth="2"
                className="style-current"
              />
            )}
            
            {/* Style box */}
            <rect
              x="130"
              y={style.y - 14}
              width="80"
              height="28"
              rx="6"
              fill={style.active ? "rgba(167, 139, 250, 0.1)" : "rgba(255,255,255,0.02)"}
              stroke={style.active ? currentColors.violet.pulse : "rgba(255,255,255,0.1)"}
              strokeWidth={style.active ? 1.5 : 1}
            />
            <text
              x={170}
              y={style.y + 4}
              fill={style.active ? currentColors.violet.pulse : "rgba(255,255,255,0.4)"}
              fontSize="10"
              textAnchor="middle"
            >
              {style.label}
            </text>
            
            {/* Output arrow */}
            {style.active && (
              <>
                <line x1="210" y1={style.y} x2="280" y2={style.y} stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
                <line
                  x1="210"
                  y1={style.y}
                  x2="280"
                  y2={style.y}
                  stroke="url(#style-pulse)"
                  strokeWidth="2"
                  className="style-output-current"
                />
                <polygon points="280,65 295,70 280,75" fill={currentColors.violet.pulse} />
              </>
            )}
          </g>
        ))}
      </svg>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// ROADMAP VISUALIZATION (Linear-style)
// ═══════════════════════════════════════════════════════════════════════════════

const RoadmapViz = () => (
  <div className="relative overflow-hidden rounded-2xl bg-neutral-950 p-6">
    <svg viewBox="0 0 800 200" className="w-full h-auto">
      <defs>
        <linearGradient id="roadmap-pulse" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor={currentColors.emerald.pulse} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <filter id="roadmap-glow">
          <feGaussianBlur stdDeviation="3" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main timeline */}
      <line x1="50" y1="100" x2="750" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
      
      {/* Animated current on timeline */}
      <line
        x1="50"
        y1="100"
        x2="750"
        y2="100"
        stroke="url(#roadmap-pulse)"
        strokeWidth="4"
        filter="url(#roadmap-glow)"
        className="roadmap-current"
      />

      {/* Milestones */}
      {[
        { x: 150, label: "Assessment", sublabel: "6-8 min", complete: true },
        { x: 350, label: "Friend Input", sublabel: "Optional", complete: false },
        { x: 550, label: "Blueprint", sublabel: "Instant", complete: false },
        { x: 700, label: "Coach", sublabel: "Ongoing", complete: false },
      ].map((milestone, i) => (
        <g key={milestone.label}>
          {/* Milestone marker */}
          <circle
            cx={milestone.x}
            cy="100"
            r="12"
            fill={milestone.complete ? currentColors.emerald.pulse : "rgba(0,0,0,0.8)"}
            stroke={milestone.complete ? currentColors.emerald.pulse : "rgba(255,255,255,0.2)"}
            strokeWidth="2"
          />
          {milestone.complete && (
            <path
              d={`M ${milestone.x - 4} 100 L ${milestone.x - 1} 103 L ${milestone.x + 5} 97`}
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
          )}
          
          {/* Label */}
          <text x={milestone.x} y="75" fill="rgba(255,255,255,0.7)" fontSize="12" textAnchor="middle" fontWeight="500">
            {milestone.label}
          </text>
          <text x={milestone.x} y="135" fill="rgba(255,255,255,0.3)" fontSize="10" textAnchor="middle">
            {milestone.sublabel}
          </text>
        </g>
      ))}

      {/* Branch to outputs */}
      <path d="M 550 100 C 600 100, 620 50, 680 50" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
      <path d="M 550 100 C 600 100, 620 150, 680 150" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
      
      {/* Branch labels */}
      <rect x="680" y="35" width="90" height="30" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
      <text x="725" y="55" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">Action Cards</text>
      
      <rect x="680" y="135" width="90" height="30" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
      <text x="725" y="155" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">Insights</text>
    </svg>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const steps = [
  {
    title: "Adaptive self-portrait",
    time: "6–8 minutes",
    description:
      "Answer a short, adaptive assessment built from validated item pools. The system calibrates difficulty as you go to lock in your baseline profile fast.",
    highlights: [
      "Adaptive item routing trims guesswork",
      "Measures 8 SELVE dimensions",
      "Backed by psychometric validation",
    ],
    color: "amber" as CurrentColor,
    Visual: NeuralNetworkViz,
  },
  {
    title: "Invite honest friends",
    time: "Optional, ~4 min each",
    description:
      "Share a link with people who know you. Their responses are weighted for reliability, giving you blind-spot coverage and confidence where you align.",
    highlights: [
      "Third-person grammar reduces self-bias",
      "Quality scoring filters low-effort input",
      "Quick completion protects friendships",
    ],
    color: "cyan" as CurrentColor,
    Visual: ConnectionGraphViz,
  },
  {
    title: "Fuse signals into your blueprint",
    time: "Instant",
    description:
      "SELVE blends your self-assessment with peer perspective, calibrates dimension scores, and generates your living blueprint.",
    highlights: [
      "Alignment vs divergence per dimension",
      "Action cards tuned to your style",
      "Updates as new signals arrive",
    ],
    color: "violet" as CurrentColor,
    Visual: BlueprintFusionViz,
  },
  {
    title: "Coach, ask, iterate",
    time: "Ongoing",
    description:
      "Use SELVE-CHAT to interrogate your results, plan decisions, or rehearse tough conversations. Your blueprint evolves with you.",
    highlights: [
      "Context-aware guidance",
      "Scenario rehearsal built-in",
      "Micro-challenges keep it current",
    ],
    color: "rose" as CurrentColor,
    Visual: CoachChatViz,
  },
];

const outcomes = [
  {
    title: "Clarity you can act on",
    copy: "See why you react the way you do, which dimensions drive it, and what to try next. Every recommendation cites its source.",
    Visual: ClarityViz,
  },
  {
    title: "External reality-checks",
    copy: "Friend inputs surface blind spots without inflating or shaming. Alignment charts show where you and your circle agree or diverge.",
    Visual: AlignmentViz,
  },
  {
    title: "A coach that knows you",
    copy: "SELVE-CHAT speaks your language—direct, compassionate, or strategic. Coaching adapts to your profile style.",
    Visual: CoachStyleViz,
  },
];

export default function HowItWorksPage() {
  const handleScrollToSteps = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const el = document.getElementById("steps");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen">
      {/* Global animation styles */}
      <style jsx global>{`
        /* Neural Network - Step 1 */
        @keyframes neuralCurrent {
          0% { opacity: 0; stroke-dashoffset: 100; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; stroke-dashoffset: -100; }
        }
        .neural-current {
          stroke-dasharray: 20 200;
          animation: neuralCurrent 2s ease-in-out infinite;
        }
        @keyframes neuralPulse {
          0%, 100% { opacity: 0.8; r: 4; }
          50% { opacity: 1; r: 6; }
        }
        .neural-node-pulse {
          animation: neuralPulse 1.5s ease-in-out infinite;
        }

        /* Friend Connections - Step 2 */
        @keyframes friendCurrent {
          0% { stroke-dashoffset: 200; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        .friend-current {
          stroke-dasharray: 30 300;
          animation: friendCurrent 2.5s ease-out infinite;
        }
        @keyframes centerPulse {
          0%, 100% { stroke-width: 2; filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.3)); }
          50% { stroke-width: 3; filter: drop-shadow(0 0 12px rgba(34, 211, 238, 0.6)); }
        }
        .center-node-pulse {
          animation: centerPulse 2s ease-in-out infinite;
        }

        /* Blueprint Fusion - Step 3 */
        @keyframes fusionCurrent1 {
          0% { stroke-dashoffset: 150; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        .fusion-current-1 {
          stroke-dasharray: 30 200;
          animation: fusionCurrent1 3s ease-in-out infinite;
        }
        .fusion-current-2 {
          stroke-dasharray: 30 200;
          animation: fusionCurrent1 3s ease-in-out infinite 0.5s;
        }
        @keyframes fusionCurrent3 {
          0% { stroke-dashoffset: 100; opacity: 0; }
          30% { opacity: 0; }
          50% { opacity: 1; }
          90% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        .fusion-current-3 {
          stroke-dasharray: 20 100;
          animation: fusionCurrent3 3s ease-in-out infinite;
        }

        /* Coach Chat - Step 4 */
        @keyframes chatCurrentOut {
          0% { stroke-dashoffset: 100; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
        .chat-current-out {
          stroke-dasharray: 20 200;
          animation: chatCurrentOut 2s ease-out infinite;
        }
        @keyframes chatCurrentIn {
          0% { stroke-dashoffset: -100; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: 100; opacity: 0; }
        }
        .chat-current-in {
          stroke-dasharray: 20 200;
          animation: chatCurrentIn 2s ease-out infinite 1s;
        }
        @keyframes processCurrent {
          0% { stroke-dashoffset: 50; opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { stroke-dashoffset: -50; opacity: 0; }
        }
        .process-current-1 {
          stroke-dasharray: 15 100;
          animation: processCurrent 1.5s ease-in-out infinite;
        }
        .process-current-2 {
          stroke-dasharray: 15 100;
          animation: processCurrent 1.5s ease-in-out infinite 0.4s;
        }

        /* Outcome animations */
        @keyframes clarityBar {
          0% { width: 0; }
          100% { width: inherit; }
        }
        .clarity-bar {
          animation: clarityBar 1s ease-out forwards;
        }
        @keyframes alignmentMarker {
          0% { opacity: 0; transform: scale(0); }
          100% { opacity: 1; transform: scale(1); }
        }
        .alignment-marker {
          animation: alignmentMarker 0.5s ease-out forwards;
        }
        @keyframes styleCurrent {
          0% { stroke-dashoffset: 100; opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
        .style-current {
          stroke-dasharray: 15 200;
          animation: styleCurrent 2s ease-in-out infinite;
        }
        .style-output-current {
          stroke-dasharray: 15 200;
          animation: styleCurrent 2s ease-in-out infinite 0.5s;
        }

        /* Roadmap */
        @keyframes roadmapCurrent {
          0% { stroke-dashoffset: 1400; }
          100% { stroke-dashoffset: 0; }
        }
        .roadmap-current {
          stroke-dasharray: 40 700;
          animation: roadmapCurrent 8s linear infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 bg-amber-500/5 blur-[120px] rounded-full" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 bg-violet-500/5 blur-[120px] rounded-full" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
              How SELVE works
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
              From honest signals to a{" "}
              <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-violet-400 bg-clip-text text-transparent">
                living blueprint
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/50 leading-relaxed">
              Adaptive psychometrics, trusted friend input, and a profile-aware coach. 
              Move from self-awareness to confident action.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-sm text-white/60">
                ~6–8 minutes
              </span>
              <span className="rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-sm text-white/60">
                Friend perspective optional
              </span>
              <span className="rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-sm text-white/60">
                Validated items
              </span>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-white/90"
              >
                Start the assessment
              </Link>
              <Link
                href="#steps"
                onClick={handleScrollToSteps}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                See the flow ↓
              </Link>
            </div>
          </div>

          {/* Hero visualization */}
          <div className="mt-16">
            <RoadmapViz />
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="steps" className="relative py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                  {/* Content */}
                  <div className={`space-y-5 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                    <div className="flex items-center gap-4">
                      <span
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold"
                        style={{
                          backgroundColor: currentColors[step.color].bg,
                          color: currentColors[step.color].pulse,
                        }}
                      >
                        {index + 1}
                      </span>
                      <span className="text-sm text-white/40 uppercase tracking-wide">
                        {step.time}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-semibold">{step.title}</h2>
                    <p className="text-base text-white/50 leading-relaxed">{step.description}</p>

                    <ul className="space-y-2">
                      {step.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                          <span
                            className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: currentColors[step.color].pulse }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visualization */}
                  <div className={index % 2 === 1 ? "md:order-1" : ""}>
                    <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-2 backdrop-blur-sm">
                      <step.Visual />
                    </div>
                  </div>
                </div>

                {/* Connector line between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 -bottom-8 h-16 w-px">
                    <svg viewBox="0 0 2 64" className="h-full w-full">
                      <line x1="1" y1="0" x2="1" y2="64" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                      <line
                        x1="1"
                        y1="0"
                        x2="1"
                        y2="64"
                        stroke={currentColors[steps[index + 1].color].pulse}
                        strokeWidth="2"
                        strokeDasharray="8 56"
                        className="step-connector"
                        style={{ animationDelay: `${index * 0.5}s` }}
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="relative py-20 md:py-28 bg-neutral-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
              What you get
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold">
              Insights that actually help
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={outcome.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition hover:border-white/20"
              >
                <h3 className="text-xl font-semibold">{outcome.title}</h3>
                <p className="mt-3 text-sm text-white/50 leading-relaxed">{outcome.copy}</p>
                <div className="mt-6">
                  <outcome.Visual />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-10 md:p-16">
            {/* Ambient glow */}
            <div className="absolute -top-40 -right-40 h-80 w-80 bg-violet-500/10 blur-[100px] rounded-full" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 bg-amber-500/10 blur-[100px] rounded-full" />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/40 mb-6">
                <span className="rounded-full border border-white/10 px-3 py-1">Private</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Actionable</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Context-aware</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-semibold max-w-2xl">
                Ready to see yourself more clearly—then act on it?
              </h2>
              <p className="mt-4 max-w-xl text-base text-white/50">
                Start with the adaptive assessment. Invite one trusted friend. 
                Ask SELVE-CHAT the hard questions.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-white/90"
                >
                  Begin the assessment
                </Link>
                <Link
                  href="/share-your-story"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
                >
                  See how others use SELVE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}