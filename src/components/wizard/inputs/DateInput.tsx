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
          w-full ${sizeClasses[size]}
          bg-gray-800 text-white rounded-lg
          border ${error ? "border-red-500" : "border-gray-700"}
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
          [color-scheme:dark]
          transition-all duration-200
        `}
      />
      {config.helpText && !error && (
        <p className="mt-2 text-sm text-gray-400">{config.helpText}</p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};
