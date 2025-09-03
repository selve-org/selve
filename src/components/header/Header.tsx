// src/components/header/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AnimatedLogo } from "@/components/logo/AnimatedSelveLogo";
import { DesktopNav } from "./navigation/DesktopNav";
import { navLinks } from "./navigation/navLinks";
import { AnimatedHamburgerIcon } from "@/components/icons/HamburgerButton";
import { IdentifyUser } from "@/components/IdentifyUser";
import { SyncClerkToDB } from "@/components/SyncClerkToDB";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md pb-1 border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto px-4">
        <div className="grid grid-cols-3 items-center h-16">
          <div className="flex justify-start">
            <Link href="/" className="flex items-center">
              <AnimatedLogo />
            </Link>
          </div>

          <DesktopNav />

          <div className="hidden lg:flex items-center justify-end space-x-2">
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Log in
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-900 rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
              >
                Sign up
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
              <IdentifyUser />
              <SyncClerkToDB />
            </SignedIn>
          </div>

          <div className="lg:hidden col-start-3 flex justify-end">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <AnimatedHamburgerIcon isOpen={isMenuOpen} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-2 bg-background/90 backdrop-blur-md p-4 rounded-md space-y-3 min-h-[calc(100vh-4rem)]">
            {navLinks.map((link) =>
              link.type === "dropdown" ? (
                <div key={link.label}>
                  <p className="font-semibold text-sm mb-1">{link.label}</p>
                  <ul className="pl-2 space-y-1">
                    {link.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="block text-sm text-muted-foreground hover:text-foreground"
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
                  className="block font-semibold text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              )
            )}
            <hr className="border-neutral-200 dark:border-neutral-800" />
            <div className="flex items-center space-x-2 pt-2">
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="flex-1 text-center text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Log in
                </Link>
                <Link
                  href="/sign-up"
                  className="flex-1 text-center px-4 py-2 text-sm font-medium bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-900 rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
                >
                  Sign up
                </Link>
              </SignedOut>
              <SignedIn>
                <div className="flex-1 flex justify-center">
                  <UserButton />
                </div>
                <IdentifyUser />
                <SyncClerkToDB />
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
