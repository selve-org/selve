// src/app/(marketing)/navigation/navLinks.ts
export type SimpleNavLink = {
  type: "link";
  label: string;
  href: string;
};

export type DropdownNavLink = {
  type: "dropdown";
  label: string;
  items: { label: string; href: string }[];
};

export type NavLinkType = SimpleNavLink | DropdownNavLink;

export const navLinks: NavLinkType[] = [
  { type: "link", label: "About", href: "#about" },
  { type: "link", label: "How it works", href: "#how-it-works" },
  {
    type: "dropdown",
    label: "Resources",
    items: [
      { label: "Support Center", href: "/support" },
      { label: "Guides", href: "/guides" },
      { label: "Blog", href: "/blog" },
      { label: "Sessions", href: "/sessions" },
      { label: "Community Forum", href: "/community" },
      { label: "API Documentation", href: "/api-docs" },
      { label: "Contact Sales", href: "/contact" },
    ],
  },
  {
    type: "dropdown",
    label: "Company",
    items: [
      { label: "Jobs", href: "/jobs" },
      { label: "Newsroom", href: "/news" },
      { label: "Become a Partner", href: "/partners" },
    ],
  },
  { type: "link", label: "Pricing", href: "#pricing" },
];