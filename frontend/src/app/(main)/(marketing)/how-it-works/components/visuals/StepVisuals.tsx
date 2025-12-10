import { currentColors } from "../colors";

export const NeuralNetworkViz = () => {
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
    { from: 0, to: 4 },
    { from: 0, to: 5 },
    { from: 1, to: 4 },
    { from: 1, to: 5 },
    { from: 1, to: 6 },
    { from: 2, to: 5 },
    { from: 2, to: 6 },
    { from: 3, to: 5 },
    { from: 3, to: 6 },
    // Hidden 1 to hidden 2
    { from: 4, to: 7 },
    { from: 4, to: 8 },
    { from: 5, to: 7 },
    { from: 5, to: 8 },
    { from: 6, to: 7 },
    { from: 6, to: 8 },
    // Hidden 2 to output
    { from: 7, to: 9 },
    { from: 8, to: 9 },
  ];

  return (
    <div className="relative h-[280px] w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-950">
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
            className="stroke-neutral-300 dark:stroke-white/[0.08]"
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
              className={node.layer === 3 ? "fill-white dark:fill-black/60" : "fill-white dark:fill-black/60"}
              stroke={node.layer === 3 ? currentColors.amber.pulse : undefined}
              strokeWidth={node.layer === 3 ? 2 : 1}
            />
            {node.layer !== 3 && (
              <circle
                cx={node.x}
                cy={node.y}
                r={10}
                className="fill-none stroke-neutral-300 dark:stroke-white/20"
                strokeWidth="1"
              />
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r={4}
              fill={node.layer === 3 ? currentColors.amber.pulse : undefined}
              className={node.layer === 3 ? "neural-node-pulse" : "fill-neutral-400 dark:fill-white/40"}
            />
          </g>
        ))}

        {/* Labels */}
        <text x="60" y="250" className="fill-neutral-500 dark:fill-white/40" fontSize="10" textAnchor="middle">
          Questions
        </text>
        <text x="420" y="250" fill={currentColors.amber.pulse} fontSize="10" textAnchor="middle">
          Profile
        </text>
      </svg>
    </div>
  );
};

export const ConnectionGraphViz = () => {
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
    <div className="relative h-[280px] w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-950">
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
            className="stroke-neutral-300 dark:stroke-white/[0.06]"
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
              className="fill-white dark:fill-black/70 stroke-neutral-300 dark:stroke-white/15"
              strokeWidth="1"
            />
            <text
              x={friend.x}
              y={friend.y + 4}
              className="fill-neutral-500 dark:fill-white/50"
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
          className="fill-white dark:fill-black/80"
          stroke={currentColors.cyan.pulse}
          strokeWidth="2"
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

export const BlueprintFusionViz = () => {
  return (
    <div className="relative h-[280px] w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-950">
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
        <rect x="30" y="40" width="100" height="60" rx="8" className="fill-white dark:fill-white/[0.03] stroke-neutral-300 dark:stroke-white/10" />
        <text x="80" y="75" className="fill-neutral-600 dark:fill-white/50" fontSize="11" textAnchor="middle">Self Signal</text>

        {/* Friend signal box */}
        <rect x="30" y="180" width="100" height="60" rx="8" className="fill-white dark:fill-white/[0.03] stroke-neutral-300 dark:stroke-white/10" />
        <text x="80" y="215" className="fill-neutral-600 dark:fill-white/50" fontSize="11" textAnchor="middle">Friend Signal</text>

        {/* Merge point */}
        <circle cx="240" cy="140" r="24" className="fill-white dark:fill-black/60" stroke={currentColors.violet.pulse} strokeWidth="2" />
        <text x="240" y="144" fill={currentColors.violet.pulse} fontSize="10" textAnchor="middle">FUSE</text>

        {/* Blueprint output */}
        <rect x="340" y="100" width="110" height="80" rx="10" className="fill-white dark:fill-black/50" stroke={currentColors.violet.pulse} strokeWidth="2" />
        <text x="395" y="135" fill={currentColors.violet.pulse} fontSize="11" textAnchor="middle" fontWeight="600">Blueprint</text>
        <text x="395" y="155" className="fill-neutral-500 dark:fill-white/40" fontSize="9" textAnchor="middle">8 Dimensions</text>

        {/* Static paths */}
        <path d="M 130 70 C 180 70, 180 140, 216 140" fill="none" className="stroke-neutral-300 dark:stroke-white/[0.06]" strokeWidth="2" />
        <path d="M 130 210 C 180 210, 180 140, 216 140" fill="none" className="stroke-neutral-300 dark:stroke-white/[0.06]" strokeWidth="2" />
        <path d="M 264 140 L 340 140" fill="none" className="stroke-neutral-300 dark:stroke-white/[0.06]" strokeWidth="2" />

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

export const CoachChatViz = () => {
  return (
    <div className="relative h-[280px] w-full overflow-hidden rounded-2xl bg-neutral-100 p-4 dark:bg-neutral-950">
      <div className="flex h-full flex-col justify-between">
        {/* Chat messages with flowing current */}
        <div className="space-y-3">
          {/* User message */}
          <div className="flex items-start gap-3">
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center dark:bg-white/10">
                <span className="text-xs text-neutral-600 dark:text-white/50">You</span>
              </div>
            </div>
            <div className="relative flex-1">
              <div className="rounded-xl bg-white px-4 py-2.5 text-sm text-neutral-700 shadow-sm dark:bg-white/5 dark:text-white/60">
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
                <path d="M 0 32 C 30 32, 50 32, 96 32" className="stroke-neutral-300 dark:stroke-white/[0.06]" strokeWidth="2" fill="none" />
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
                <circle cx="32" cy="24" r="8" className="fill-white dark:fill-white/5 stroke-neutral-300 dark:stroke-white/15" />
                <circle cx="96" cy="24" r="10" className="fill-white dark:fill-black/50" stroke={currentColors.rose.pulse} strokeWidth="1.5" />
                <circle cx="160" cy="24" r="8" className="fill-white dark:fill-white/5 stroke-neutral-300 dark:stroke-white/15" />

                {/* Connection lines */}
                <line x1="44" y1="24" x2="82" y2="24" className="stroke-neutral-300 dark:stroke-white/[0.06]" strokeWidth="2" />
                <line x1="110" y1="24" x2="148" y2="24" className="stroke-neutral-300 dark:stroke-white/[0.06]" strokeWidth="2" />

                {/* Animated currents */}
                <line x1="44" y1="24" x2="82" y2="24" stroke="url(#process-gradient)" strokeWidth="2" className="process-current-1" />
                <line x1="110" y1="24" x2="148" y2="24" stroke="url(#process-gradient)" strokeWidth="2" className="process-current-2" />

                {/* Labels */}
                <text x="32" y="44" className="fill-neutral-400 dark:fill-white/30" fontSize="7" textAnchor="middle">Profile</text>
                <text x="96" y="44" fill={currentColors.rose.pulse} fontSize="7" textAnchor="middle">Process</text>
                <text x="160" y="44" className="fill-neutral-400 dark:fill-white/30" fontSize="7" textAnchor="middle">Response</text>
              </svg>
            </div>
          </div>

          {/* Coach response */}
          <div className="flex items-start gap-3">
            <svg className="h-16 w-24 flex-shrink-0" viewBox="0 0 96 64">
              <path d="M 96 32 C 66 32, 46 32, 0 32" className="stroke-neutral-300 dark:stroke-white/[0.06]" strokeWidth="2" fill="none" />
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
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 border border-rose-300 flex items-center justify-center dark:from-rose-500/20 dark:to-rose-600/20 dark:border-rose-500/30">
                  <span className="text-xs text-rose-600 dark:text-rose-400">S</span>
                </div>
              </div>
            </div>
            <div className="flex-1 rounded-xl bg-rose-50 border border-rose-200 px-4 py-2.5 text-sm text-neutral-700 dark:bg-rose-500/5 dark:border-rose-500/10 dark:text-white/60">
              <span className="text-rose-600 dark:text-rose-400">Based on your ORIN score,</span> lead with data first, then emotional framing...
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm dark:bg-white/5">
          <span className="text-sm text-neutral-400 dark:text-white/30">Ask your blueprint anything...</span>
          <div className="ml-auto h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center dark:bg-rose-500/20">
            <svg className="h-3 w-3 text-rose-600 dark:text-rose-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
