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
        maxLength={maxLength}
        className={`
          w-full ${sizeClasses[size]}
          bg-gray-800 text-white rounded-lg
          border ${error ? "border-red-500" : "border-gray-700"}
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
          placeholder-gray-500
          transition-all duration-200
        `}
      />
      {config.helpText && !error && (
        <p className="mt-2 text-sm text-gray-400">{config.helpText}</p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
      {maxLength && (
        <p className="mt-1 text-xs text-gray-500 text-right">
          {value.length} / {maxLength}
        </p>
      )}
    </div>
  );
};
