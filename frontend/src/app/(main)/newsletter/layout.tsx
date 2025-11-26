// src/app/(main)/newsletter/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter - Stay in the Know | SELVE",
  description:
    "Subscribe to the SELVE newsletter for actionable self-awareness tips, mental models, and personality insights delivered twice a month.",
  openGraph: {
    title: "Stay in the Know | SELVE Newsletter",
    description:
      "Join thousands discovering their true selves. Get actionable insights and self-awareness strategies.",
  },
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
