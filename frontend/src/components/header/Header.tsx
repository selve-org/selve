// src/components/header/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useClerk,
} from "@clerk/nextjs";
import { AnimatedLogo } from "@/components/logo/AnimatedSelveLogo";
import { DesktopNav } from "./navigation/DesktopNav";
import { navLinks } from "./navigation/navLinks";
import { AnimatedHamburgerIcon } from "@/components/icons/HamburgerButton";
import { IdentifyUser } from "@/components/IdentifyUser";
import { SyncClerkToDB } from "@/components/SyncClerkToDB";
import { CustomUserMenu } from "./CustomUserMenu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut } = useClerk();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md pb-1 border-b border-neutral-200 dark:border-neutral-800">
      <div className="relative mx-auto px-4">
        <div className="grid grid-cols-3 items-center h-16">
          <div className="flex justify-start">
            <Link href="/" className="flex items-center">
              <AnimatedLogo />
            </Link>
          </div>

          <DesktopNav />

          <div className="hidden lg:flex items-center justify-end space-x-2">
            <SignedOut>
              <SignInButton>
                <button className="text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
                  Log in
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="px-4 py-2 text-sm font-medium bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-900 rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors cursor-pointer">
                  Sign up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <CustomUserMenu />
              <IdentifyUser />
              <SyncClerkToDB />
            </SignedIn>
          </div>

          <div className="lg:hidden col-start-3 flex justify-end">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 p-2 rounded-md cursor-pointer"
              aria-label="Toggle menu"
            >
              <AnimatedHamburgerIcon isOpen={isMenuOpen} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-2 bg-background/90 backdrop-blur-md p-4 rounded-md space-y-3 min-h-[calc(100vh-4rem)]">
            <SignedOut>
              {/* Show all navigation for guests */}
              {navLinks.map((link) =>
                link.type === "dropdown" ? (
                  <div key={link.label}>
                    <p className="font-semibold text-sm mb-1">{link.label}</p>
                    <ul className="pl-2 space-y-1">
                      {link.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-sm text-muted-foreground hover:text-foreground active:text-purple-600 active:bg-purple-50 dark:active:bg-purple-900/20 transition-colors px-2 py-1 rounded-md"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block font-semibold text-sm text-muted-foreground hover:text-foreground active:text-purple-600 active:bg-purple-50 dark:active:bg-purple-900/20 transition-colors px-2 py-1 rounded-md"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <hr className="border-neutral-200 dark:border-neutral-800" />
              <div className="flex items-center space-x-2 pt-2">
                <SignInButton>
                  <button className="flex-1 text-center text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
                    Log in
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="flex-1 text-center px-4 py-2 text-sm font-medium bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-900 rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors cursor-pointer">
                    Sign up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              {/* Simplified mobile menu for signed-in users - only 5 options */}
              <div className="space-y-1">
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block font-semibold text-sm text-muted-foreground hover:text-foreground active:text-purple-600 active:bg-purple-50 dark:active:bg-purple-900/20 transition-colors px-2 py-2 rounded-md"
                >
                  View Profile
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_CHATBOT_URL || "https://chat.selve.me"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="block font-semibold text-sm text-muted-foreground hover:text-foreground active:text-purple-600 active:bg-purple-50 dark:active:bg-purple-900/20 transition-colors px-2 py-2 rounded-md"
                >
                  Chat with SELVE
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="block font-semibold text-sm text-muted-foreground hover:text-foreground active:text-purple-600 active:bg-purple-50 dark:active:bg-purple-900/20 transition-colors px-2 py-2 rounded-md"
                >
                  About
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsMenuOpen(false)}
                  className="block font-semibold text-sm text-muted-foreground hover:text-foreground active:text-purple-600 active:bg-purple-50 dark:active:bg-purple-900/20 transition-colors px-2 py-2 rounded-md"
                >
                  Blog
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left font-semibold text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 active:bg-red-50 dark:active:bg-red-900/20 transition-colors px-2 py-2 rounded-md cursor-pointer"
                >
                  Sign out
                </button>
              </div>
              <IdentifyUser />
              <SyncClerkToDB />
            </SignedIn>
          </div>
        )}
      </div>
    </header>
  );
};
