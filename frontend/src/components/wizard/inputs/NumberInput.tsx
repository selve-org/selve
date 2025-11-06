// src/components/wizard/inputs/NumberInput.tsx
"use client";

import React from "react";
import type { RenderConfig } from "@/types/questionnaire";

interface NumberInputProps {
  value: number | string;
  onChange: (value: number) => void;
  config: RenderConfig;
  error?: string;
}

/**
 * NumberInput Component
 *
 * Numeric input field with validation
 */
export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  config,
  error,
}) => {
  const { min, max, placeholder = "Enter a number", helpText } = config;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      onChange(0);
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  return (
    <div className="w-full space-y-2">
      <input
        type="number"
        min={min}
        max={max}
        value={value || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-white dark:bg-[#2e2e2e] border ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 dark:border-[#4d4d4d] focus:ring-purple-500"
        } rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#666666]
          focus:outline-none focus:ring-2 transition-colors`}
      />
      {helpText && (
        <p className="text-xs text-gray-500 dark:text-[#999999]">{helpText}</p>
      )}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
};
