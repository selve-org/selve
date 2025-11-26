// src/app/(main)/newsletter/unsubscribe/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unsubscribe | SELVE Newsletter",
  description: "Unsubscribe from the SELVE newsletter. We're sorry to see you go!",
  robots: {
    index: false,
    follow: false,
  },
};

export default function UnsubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
