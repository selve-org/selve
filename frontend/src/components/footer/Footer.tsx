// src/components/footer/Footer.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useFooterVisibility } from "@/context/FooterVisibilityContext";
import { SelveLogo } from "@/components/logo/SelveLogo";
import { footerLinks } from "./footerLinks";
import { FooterLink } from "./FooterLink";
import { useConsent } from "@/contexts/ConsentContext";
import { 
  FaInstagram, 
  FaYoutube, 
  FaXTwitter, 
  FaRedditAlien,
  FaThreads,
  FaMedium
} from "react-icons/fa6";

const socialLinks = [
  { icon: FaYoutube, href: "https://youtube.com/@selve_co", label: "YouTube", title: "Subscribe to our YouTube channel" },
  { icon: FaRedditAlien, href: "https://reddit.com/u/selve_co", label: "Reddit", title: "Join us on Reddit" },
  { icon: FaXTwitter, href: "https://x.com/selve_co", label: "X (Twitter)", title: "Follow us on X" },
  { icon: FaThreads, href: "https://threads.net/@selve.me", label: "Threads", title: "Follow us on Threads" },
  { icon: FaInstagram, href: "https://www.instagram.com/selve.me/", label: "Instagram", title: "Follow us on Instagram" },
  { icon: FaMedium, href: "https://medium.com/@selve", label: "Medium", title: "Read our blog on Medium" },
];

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { setFooterVisibility } = useFooterVisibility();
  const { openManager } = useConsent();

  useEffect(() => {
    if (!footerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisibility(entry.isIntersecting);
      },
      { root: null, threshold: 0.01 }
    );

    observer.observe(footerRef.current);

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, [setFooterVisibility]);

  return (
    <footer
      ref={footerRef}
      className="relative z-[20] bg-background text-muted-foreground flex flex-col min-h-screen"
    >
      <div className="flex-grow mt-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Column 1: Logo and Newsletter */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-900"
              >
                <SelveLogo />
              </Link>
              <p className="text-sm mt-4 max-w-xs text-gray-500">
                Discover your true self. Empower your mind.
              </p>
              <h4 className="font-medium text-foreground mb-2 mt-15">
                Subscribe to our insights newsletter
              </h4>
              <p className="text-sm leading-relaxed mb-4">
                Actionable tips, mental models, and self-awareness
                strategies—twice a month.
              </p>
              <div className="flex flex-col sm:flex-row w-full max-w-sm">
                <Link
                  href="/newsletter"
                  className="flex items-center justify-center px-4 py-2 border border-[#333] rounded-md text-sm font-medium transition dark:hover:border-white focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background cursor-pointer"
                >
                  Subscribe
                </Link>
              </div>
            </div>

            <div className="hidden md:block lg:hidden col-span-1"></div>

            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="font-medium text-foreground mb-4">{section}</h4>
                <ul className="space-y-1 text-sm">
                  {links.map((link) => (
                    <li key={link.label}>
                      <FooterLink href={link.href} label={link.label} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar with Copyright and Social Icons */}
      <div className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} SELVE</span>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <button
                type="button"
                onClick={openManager}
                className="hover:text-foreground transition-colors underline-offset-4 cursor-pointer"
              >
                Cookies & privacy
              </button>
              <Link href="https://buymeacoffee.com/selve" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                Buy me a coffee ☕
              </Link>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.title}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
