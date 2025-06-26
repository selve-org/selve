// src/app/(marketing)/footer/Footer.tsx
import Link from "next/link";
import { SelveLogo } from "@/components/logo/SelveLogo";
import { footerLinks } from "./footerLinks";
import { FooterLink } from "./footerLink";

export const Footer = () => {
  return (
    <footer className="bg-background text-muted-foreground flex flex-col min-h-screen">
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

            {/* Spacer */}
            <div className="hidden md:block lg:hidden col-span-1"></div>

            {/* Columns 2-5: Footer Links */}
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
    </footer>
  );
};
