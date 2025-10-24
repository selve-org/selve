// src/components/wizard/inputs/DateInput.tsx
"use client";

import React from "react";
import type { RenderConfig } from "@/types/questionnaire";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  config: RenderConfig;
  error?: string;
}

/**
 * DateInput Component
 *
 * Date picker input field
 */
export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  config,
  error,
}) => {
  const { placeholder = "Select date", style = {} } = config;
  const { size = "md" } = style;

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
  };

  return (
    <div className="w-full">
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full px-[17px] py-[13px] text-sm
          bg-white dark:bg-[#1c1c1c] text-gray-900 dark:text-white rounded-[4px]
          border ${error ? "border-red-500" : "border-gray-300 dark:border-[#2e2e2e]"}
          focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600
          dark:[color-scheme:dark]
          transition-all duration-200
          leading-5
        `}
      />
      {config.helpText && !error && (
        <p className="mt-2 text-[11px] text-gray-500 dark:text-[#aaaaaa] leading-[16.51px]">
          {config.helpText}
        </p>
      )}
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
};
