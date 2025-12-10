// src/components/header/navigation/navLinks.ts
export type SimpleNavLink = {
  type: "link";
  label: string;
  href: string;
};

export type DropdownNavLink = {
  type: "dropdown";
  label: string;
  items: { label: string; href: string }[];
};

export type NavLinkType = SimpleNavLink | DropdownNavLink;

export const navLinks: NavLinkType[] = [
  { type: "link", label: "About", href: "/about" },
  { type: "link", label: "Pricing", href: "/#pricing" },
  {
    type: "dropdown",
    label: "Dimensions",
    items: [
      { label: "✨ LUMEN — Social Energy", href: "/blog/dimensions/lumen" },
      { label: "🌫️ AETHER — Emotional Stability", href: "/blog/dimensions/aether" },
      { label: "🎵 ORPHEUS — Warmth & Empathy", href: "/blog/dimensions/orpheus" },
      { label: "⚖️ VARA — Honesty & Integrity", href: "/blog/dimensions/vara" },
      { label: "⏳ CHRONOS — Patience & Flexibility", href: "/blog/dimensions/chronos" },
      { label: "🔥 KAEL — Assertiveness", href: "/blog/dimensions/kael" },
      { label: "🧭 ORIN — Organization", href: "/blog/dimensions/orin" },
      { label: "🦋 LYRA — Openness & Curiosity", href: "/blog/dimensions/lyra" },
    ],
  },
  {
    type: "dropdown",
    label: "Learn",
    items: [
      { label: "How it Works", href: "/how-it-works" },
      { label: "Friend Insights", href: "/#friend-insights" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    type: "dropdown",
    label: "Legal",
    items: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];
