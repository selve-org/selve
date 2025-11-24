import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Poppins,
  Crimson_Text,
} from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { PostHogProvider } from "./providers";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AssessmentSessionProvider } from "@/contexts/AssessmentSessionContext";
import { FriendCompletionToast } from "@/components/FriendCompletionToast";
import "./globals.css";

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
  title: "SELVE - Discover Your True Self",
  description:
    "A comprehensive personality assessment that deciphers who you are from head to toe.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { rel: "icon", url: "favicons/icon.ico" },
      { rel: "apple-touch-icon", url: "favicons/apple-touch-icon.png" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "favicons/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "favicons/android-chrome-512x512.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${poppins.variable} ${crimsonText.variable} antialiased`}
      >
        <PostHogProvider>
          <ClerkProvider>
            <ThemeProvider>
              <AssessmentSessionProvider>
                {children}
                <Toaster position="top-right" richColors closeButton />
                <FriendCompletionToast />
              </AssessmentSessionProvider>
            </ThemeProvider>
          </ClerkProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
