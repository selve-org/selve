"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "@/components/icons/Menu";
import { AnimatedLogo } from "@/components/branding/AnimatedLogo";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-primary font-semibold text-lg">
            <AnimatedLogo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/sign-in" className="text-sm text-muted-foreground hover:text-foreground">Log in</Link>
            <Link
              href="/sign-up"
              className="px-4 py-2 text-sm bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground focus:outline-none"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 bg-background/90 backdrop-blur-md p-4 rounded-md space-y-3">
            {navLinks.map(link => (
              <Link key={link.label} href={link.href} className="block text-sm text-muted-foreground hover:text-foreground">
                {link.label}
              </Link>
            ))}
            <hr className="border-border" />
            <Link href="/sign-in" className="block text-sm text-muted-foreground hover:text-foreground">Log in</Link>
            <Link
              href="/sign-up"
              className="block w-full text-center px-4 py-2 text-sm bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
