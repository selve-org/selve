import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface SettingsCardProps {
  title?: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

export function SettingsCard({ title, icon: Icon, children, className = "" }: SettingsCardProps) {
  return (
    <div className={`bg-gray-50 dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-800 p-6 ${className}`}>
      {title && (
        <div className="flex items-center gap-2 mb-4">
          {Icon && <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
        </div>
      )}
      {children}
    </div>
  );
}
