// src/app/(wizard)/assessment/wizard/layout.tsx
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { PostHogProvider } from "../../../providers";
import {
  Geist,
  Geist_Mono,
  Inter,
  Poppins,
  Crimson_Text,
} from "next/font/google";
import "../../../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson-text",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Assessment Wizard – Selve",
  description: "Complete your psychological profile assessment",
};

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PostHogProvider>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${poppins.variable} ${crimsonText.variable} antialiased bg-[#1c1c1c]`}
          >
            <ThemeProvider>{children}</ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </PostHogProvider>
  );
}
