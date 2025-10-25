// src/components/footer/FooterLink.tsx
import Link from "next/link";

export const FooterLink = ({
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
      className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 px-2.5 py-1.5 rounded-md transition-colors"
    >
      {label}
    </Link>
  );
};
