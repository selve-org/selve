import { currentColors } from "../colors";

export const ClarityViz = () => (
  <div className="relative h-[200px] w-full overflow-hidden rounded-xl bg-neutral-100 p-4 dark:bg-neutral-950">
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
          <text x="10" y="20" className="fill-neutral-500 dark:fill-white/40" fontSize="10">{dim}</text>
          <rect x="80" y="10" width="220" height="16" rx="4" className="fill-neutral-200 dark:fill-white/[0.03]" />
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

export const AlignmentViz = () => (
  <div className="relative h-[200px] w-full overflow-hidden rounded-xl bg-neutral-100 p-4 dark:bg-neutral-950">
    <svg viewBox="0 0 320 160" className="h-full w-full">
      <defs>
        <linearGradient id="align-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor={currentColors.emerald.pulse} />
          <stop offset="50%" stopColor="rgba(150,150,150,0.3)" />
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
            className="fill-white dark:fill-black/80"
            stroke={pos < 0.5 ? currentColors.emerald.pulse : pos > 0.5 ? currentColors.rose.pulse : "rgba(150,150,150,0.5)"}
            strokeWidth="2"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
          <text x={40 + pos * 240} y="100" className="fill-neutral-500 dark:fill-white/40" fontSize="8" textAnchor="middle">
            {["LUMEN", "AETHER", "ORPHEUS", "ORIN", "LYRA"][i]}
          </text>
        </g>
      ))}
      
      {/* You vs Friends indicators */}
      <circle cx="100" cy="130" r="4" fill={currentColors.cyan.pulse} />
      <text x="110" y="134" className="fill-neutral-500 dark:fill-white/40" fontSize="9">Self</text>
      <circle cx="180" cy="130" r="4" fill={currentColors.violet.pulse} />
      <text x="190" y="134" className="fill-neutral-500 dark:fill-white/40" fontSize="9">Friends</text>
    </svg>
  </div>
);

export const CoachStyleViz = () => (
  <div className="relative h-[200px] w-full overflow-hidden rounded-xl bg-neutral-100 p-4 dark:bg-neutral-950">
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
        <circle cx="50" cy="70" r="16" className="fill-white dark:fill-black/60" stroke={currentColors.violet.pulse} strokeWidth="2" />
        <text x="50" y="74" fill={currentColors.violet.pulse} fontSize="8" textAnchor="middle">YOU</text>
        
        {/* Style options */}
        {[
          { y: 30, label: "Direct", active: false },
          { y: 70, label: "Compassionate", active: true },
          { y: 110, label: "Strategic", active: false },
        ].map((style) => (
          <g key={style.label}>
            {/* Connection line */}
            <line x1="70" y1="70" x2="130" y2={style.y} className="stroke-neutral-300 dark:stroke-white/[0.06]" strokeWidth="2" />
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
              className={style.active ? "" : "fill-white dark:fill-white/[0.02] stroke-neutral-300 dark:stroke-white/10"}
              fill={style.active ? "rgba(167, 139, 250, 0.15)" : undefined}
              stroke={style.active ? currentColors.violet.pulse : undefined}
              strokeWidth={style.active ? 1.5 : 1}
            />
            <text
              x={170}
              y={style.y + 4}
              fill={style.active ? currentColors.violet.pulse : undefined}
              className={style.active ? "" : "fill-neutral-500 dark:fill-white/40"}
              fontSize="10"
              textAnchor="middle"
            >
              {style.label}
            </text>
            
            {/* Output arrow */}
            {style.active && (
              <>
                <line x1="210" y1={style.y} x2="280" y2={style.y} className="stroke-neutral-300 dark:stroke-white/[0.06]" strokeWidth="2" />
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

export const RoadmapViz = () => (
  <div className="relative overflow-hidden rounded-2xl bg-neutral-100 p-6 dark:bg-neutral-950">
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
      <line x1="50" y1="100" x2="750" y2="100" className="stroke-neutral-300 dark:stroke-white/[0.08]" strokeWidth="3" />
      
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
      ].map((milestone) => (
        <g key={milestone.label}>
          {/* Milestone marker */}
          <circle
            cx={milestone.x}
            cy="100"
            r="12"
            fill={milestone.complete ? currentColors.emerald.pulse : undefined}
            className={milestone.complete ? "" : "fill-white dark:fill-black/80 stroke-neutral-300 dark:stroke-white/20"}
            stroke={milestone.complete ? currentColors.emerald.pulse : undefined}
            strokeWidth="2"
          />
          {milestone.complete && (
            <path
              d={`M ${milestone.x - 4} 100 L ${milestone.x - 1} 103 L ${milestone.x + 5} 97`}
              stroke="white"
              strokeWidth="2"
              fill="none"
              className="dark:stroke-black"
            />
          )}
          
          {/* Label */}
          <text x={milestone.x} y="75" className="fill-neutral-700 dark:fill-white/70" fontSize="12" textAnchor="middle" fontWeight="500">
            {milestone.label}
          </text>
          <text x={milestone.x} y="135" className="fill-neutral-400 dark:fill-white/30" fontSize="10" textAnchor="middle">
            {milestone.sublabel}
          </text>
        </g>
      ))}

      {/* Branch to outputs */}
      <path d="M 550 100 C 600 100, 620 50, 680 50" fill="none" className="stroke-neutral-300 dark:stroke-white/[0.06]" strokeWidth="2" />
      <path d="M 550 100 C 600 100, 620 150, 680 150" fill="none" className="stroke-neutral-300 dark:stroke-white/[0.06]" strokeWidth="2" />
      
      {/* Branch labels */}
      <rect x="680" y="35" width="90" height="30" rx="6" className="fill-white dark:fill-white/[0.03] stroke-neutral-300 dark:stroke-white/10" />
      <text x="725" y="55" className="fill-neutral-600 dark:fill-white/50" fontSize="10" textAnchor="middle">Action Cards</text>
      
      <rect x="680" y="135" width="90" height="30" rx="6" className="fill-white dark:fill-white/[0.03] stroke-neutral-300 dark:stroke-white/10" />
      <text x="725" y="155" className="fill-neutral-600 dark:fill-white/50" fontSize="10" textAnchor="middle">Insights</text>
    </svg>
  </div>
);
