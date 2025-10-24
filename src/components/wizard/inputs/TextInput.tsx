// src/components/wizard/inputs/TextInput.tsx
"use client";

import React from "react";
import type { RenderConfig } from "@/types/questionnaire";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  config: RenderConfig;
  error?: string;
}

/**
 * TextInput Component
 *
 * Standard text input field with validation
 */
export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  config,
  error,
}) => {
  const {
    placeholder = "Enter your answer...",
    maxLength,
    style = {},
  } = config;

  const { size = "md" } = style;

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
  };

  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white dark:bg-[#1c1c1c] text-gray-900 dark:text-white border border-gray-300 dark:border-[#2e2e2e] rounded-[4px] px-4 py-3 text-[14px] placeholder:text-gray-400 dark:placeholder:text-[#666666] focus:outline-none focus:ring-1 focus:ring-purple-600 transition-all"
      />
      {config.helpText && !error && (
        <p className="mt-2 text-[11px] text-gray-500 dark:text-[#aaaaaa] leading-[16.51px]">
          {config.helpText}
        </p>
      )}
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      {maxLength && (
        <p className="mt-1 text-xs text-gray-500 dark:text-[#666666] text-right">
          {value.length} / {maxLength}
        </p>
      )}
    </div>
  );
};
