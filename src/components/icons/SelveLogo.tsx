// src/components/icons/SelveLogo.tsx
import Image from "next/image";

export const SelveLogo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center space-x-2 select-none ${className}`}>
      <Image
        src="/logo/selve-logo.png"
        alt="SELVE Logo"
        width={40}
        height={40}
        priority
        className="pointer-events-none"
      />
      <Image
        src="/logo/selve-logo-text.svg"
        alt="SELVE"
        width={120}
        height={30}
        priority
        className="dark:invert pointer-events-none"
      />
    </div>
  );
};
