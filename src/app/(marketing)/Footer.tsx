import Link from "next/link";
import { SelveLogo } from "@/components/icons/SelveLogo";

const footerLinks = {
  Product: ["Overview", "Features", "Pricing", "Changelog"],
  Company: ["About", "Team", "Careers", "Contact"],
  Resources: ["Blog", "Docs", "Privacy Policy", "Terms"],
};

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border text-muted-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1 ml-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-foreground"
            >
              <SelveLogo />
            </Link>
            <p className="text-sm mt-4 max-w-xs">
              Discover your true self. Empower your mind.
            </p>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-medium text-foreground mb-4">{section}</h4>
              <ul className="space-y-2 text-sm">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="hover:text-foreground">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
