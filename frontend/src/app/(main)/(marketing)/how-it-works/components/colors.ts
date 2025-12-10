export type CurrentColor = "amber" | "cyan" | "violet" | "emerald" | "rose";

export const currentColors: Record<CurrentColor, { glow: string; pulse: string; bg: string; lightBg: string }> = {
  amber: {
    glow: "rgba(251, 191, 36, 0.9)",
    pulse: "rgba(251, 191, 36, 1)",
    bg: "rgba(251, 191, 36, 0.15)",
    lightBg: "rgba(251, 191, 36, 0.12)",
  },
  cyan: {
    glow: "rgba(34, 211, 238, 0.9)",
    pulse: "rgba(34, 211, 238, 1)",
    bg: "rgba(34, 211, 238, 0.15)",
    lightBg: "rgba(6, 182, 212, 0.12)",
  },
  violet: {
    glow: "rgba(167, 139, 250, 0.9)",
    pulse: "rgba(167, 139, 250, 1)",
    bg: "rgba(167, 139, 250, 0.15)",
    lightBg: "rgba(139, 92, 246, 0.12)",
  },
  emerald: {
    glow: "rgba(52, 211, 153, 0.9)",
    pulse: "rgba(52, 211, 153, 1)",
    bg: "rgba(52, 211, 153, 0.15)",
    lightBg: "rgba(16, 185, 129, 0.12)",
  },
  rose: {
    glow: "rgba(251, 113, 133, 0.9)",
    pulse: "rgba(251, 113, 133, 1)",
    bg: "rgba(251, 113, 133, 0.15)",
    lightBg: "rgba(244, 63, 94, 0.12)",
  },
};
