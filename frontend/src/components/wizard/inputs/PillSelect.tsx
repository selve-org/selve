// src/components/wizard/inputs/PillSelect.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import type { RenderConfig } from "@/types/questionnaire";

interface PillSelectProps {
  value: string | string[] | null;
  onChange: (value: string | string[]) => void;
  config: RenderConfig;
  isMultiple?: boolean;
}

/**
 * PillSelect Component
 *
 * Pill-shaped button selection (capsule design)
 * Supports single or multiple selection
 */
export const PillSelect: React.FC<PillSelectProps> = ({
  value,
  onChange,
  config,
  isMultiple = false,
}) => {
  const { options = [], style = {} } = config;
  const { layout = "vertical", spacing = "normal" } = style;

  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

  const handleSelect = (optionValue: string) => {
    if (isMultiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue);
    }
  };

  const isSelected = (optionValue: string) =>
    selectedValues.includes(optionValue);

  const layoutClasses = {
    horizontal: "flex flex-row flex-wrap",
    vertical: "flex flex-col",
    grid: "grid grid-cols-2 md:grid-cols-3",
  };

  const spacingClasses = {
    tight: "gap-2",
    normal: "gap-3",
    relaxed: "gap-4",
  };

  return (
    <div
      className={`${layoutClasses[layout as keyof typeof layoutClasses]} ${
        spacingClasses[spacing as keyof typeof spacingClasses]
      }`}
    >
      {options.map((option) => {
        const optionValue =
          typeof option === "string" ? option : String(option.value);
        const optionLabel = typeof option === "string" ? option : option.label;
        const selected = isSelected(optionValue);

        return (
          <motion.button
            key={optionValue}
            type="button"
            onClick={() => handleSelect(optionValue)}
            className={`
              px-[17px] py-[9px] rounded-full text-xs leading-4 transition-all duration-200
              border
              ${
                selected
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-transparent text-gray-600 dark:text-[#999999] border-gray-300 dark:border-[#2e2e2e] hover:border-gray-400 dark:hover:border-[#3e3e3e]"
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {optionLabel}
          </motion.button>
        );
      })}
    </div>
  );
};
