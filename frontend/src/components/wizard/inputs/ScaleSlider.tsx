// src/components/wizard/inputs/ScaleSlider.tsx
"use client";

import React from "react";
import type { RenderConfig } from "@/lib/types/questionnaire";

interface ScaleSliderProps {
  value: number | null;
  onChange: (value: number) => void;
  config: RenderConfig;
}

/**
 * ScaleSlider Component
 *
 * Minimal dot-based scale selector
 */
export const ScaleSlider: React.FC<ScaleSliderProps> = ({
  value,
  onChange,
  config,
}) => {
  const { min = 1, max = 5, step = 1, labels = {} } = config;

  const points: number[] = [];
  for (let i = min; i <= max; i += step) {
    points.push(i);
  }

  return (
    <div className="w-full py-4">
      {/* Dots */}
      <div className="flex justify-between items-center px-2">
        {points.map((point) => {
          const isSelected = value === point;

          return (
            <button
              key={point}
              type="button"
              onClick={() => onChange(point)}
              className="group flex items-center justify-center w-8 h-8 md:w-10 md:h-10 cursor-pointer"
            >
              <div
                className={`
                  rounded-full transition-all duration-200 ease-out cursor-pointer
                  w-3 h-3 md:w-4 md:h-4
                  ${isSelected
                    ? "scale-[1.6] bg-green-500 shadow-lg shadow-green-500/30"
                    : "bg-gray-300 dark:bg-gray-600 group-hover:bg-gray-400 dark:group-hover:bg-gray-500 group-hover:scale-110"
                  }
                `}
              />
            </button>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-1">
        {points.map((point) => {
          const isSelected = value === point;
          const label = labels[point] || point;

          return (
            <button
              key={point}
              type="button"
              onClick={() => onChange(point)}
              className={`
                text-[10px] sm:text-xs md:text-sm leading-tight transition-all duration-200 text-center flex-1
                ${isSelected
                  ? "text-green-600 dark:text-green-400 font-semibold"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                }
              `}
            >
              {label}
            </button>
          );
        })}
      </div>

      {config.helpText && (
        <p className="text-xs sm:text-sm text-gray-400 text-center mt-6">{config.helpText}</p>
      )}
    </div>
  );
};