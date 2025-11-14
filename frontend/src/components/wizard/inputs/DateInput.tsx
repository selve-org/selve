// src/components/wizard/inputs/DateInput.tsx
"use client";

import React from "react";
import type { RenderConfig } from "@/lib/types/questionnaire";

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
  const { placeholder = "Select date", style = {}, yearRange } = config;
  const { size = "md" } = style;
  const [customError, setCustomError] = React.useState<string>("");

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
  };

  // Calculate max date (13 years ago from today)
  const today = new Date();
  const thirteenYearsAgo = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
  const maxDate = thirteenYearsAgo.toISOString().split('T')[0];

  // Calculate min date from yearRange if provided
  const minDate = yearRange && yearRange[0] 
    ? `${yearRange[0]}-01-01` 
    : "1900-01-01";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    
    if (selectedDate) {
      const selected = new Date(selectedDate);
      const today = new Date();
      const age = today.getFullYear() - selected.getFullYear();
      const monthDiff = today.getMonth() - selected.getMonth();
      const dayDiff = today.getDate() - selected.getDate();
      
      // Precise age calculation
      const exactAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) 
        ? age - 1 
        : age;
      
      if (exactAge < 13) {
        setCustomError("You must be 13 years or older to take this assessment");
        return;
      }
    }
    
    setCustomError("");
    onChange(selectedDate);
  };

  const displayError = customError || error;

  return (
    <div className="w-full">
      <input
        type="date"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        min={minDate}
        max={maxDate}
        className={`
          w-full px-[17px] py-[13px] text-sm
          bg-white dark:bg-[#1c1c1c] text-gray-900 dark:text-white rounded-[4px]
          border ${
            displayError ? "border-red-500" : "border-gray-300 dark:border-[#2e2e2e]"
          }
          focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600
          dark:[color-scheme:dark]
          transition-all duration-200
          leading-5
        `}
      />
      {config.helpText && !displayError && (
        <p className="mt-2 text-[11px] text-gray-500 dark:text-[#aaaaaa] leading-[16.51px]">
          {config.helpText}
        </p>
      )}
      {displayError && <p className="mt-2 text-sm text-red-400">{displayError}</p>}
    </div>
  );
};
