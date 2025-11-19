import { ReactNode } from "react";

interface SettingsCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function SettingsCard({ title, children, className = "" }: SettingsCardProps) {
  return (
    <div className={`bg-gray-50 dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-800 p-6 ${className}`}>
      {title && (
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
