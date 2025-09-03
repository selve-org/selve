// src/components/header/navigation/NavLink.tsx
import Link from "next/link";

export const NavLink = ({
  href,
  label,
}: {
  href: string;
  label: string;
}) => {
  if (!href) return null;
  return (
    <Link
      href={href}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
    </Link>
  );
};
