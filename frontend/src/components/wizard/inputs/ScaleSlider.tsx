// src/components/wizard/inputs/ScaleSlider.tsx
"use client";

import React from "react";
import type { RenderConfig } from "@/types/questionnaire";

interface ScaleSliderProps {
  value: number | null;
  onChange: (value: number) => void;
  config: RenderConfig;
}

/**
 * ScaleSlider Component
 *
 * Numeric scale/slider for ratings (e.g., 1-10 scale)
 */
export const ScaleSlider: React.FC<ScaleSliderProps> = ({
  value,
  onChange,
  config,
}) => {
  const { min = 1, max = 10, step = 1, labels = {}, showValue = true } = config;

  const currentValue = value ?? min;

  // Generate scale points
  const points = [];
  for (let i = min; i <= max; i += step) {
    points.push(i);
  }

  return (
    <div className="w-full space-y-4">
      {/* Slider */}
      <div className="relative pt-6">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-green-500
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-green-500
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:shadow-lg
          "
        />

        {/* Value indicator */}
        {showValue && (
          <div
            className="absolute top-0 transform -translate-x-1/2 transition-all duration-200"
            style={{
              left: `${((currentValue - min) / (max - min)) * 100}%`,
            }}
          >
            <div className="bg-green-500 text-white ml-10% w-5 h-5 flex items-center justify-center rounded-full text-xs font-semibold shadow-lg">
              {currentValue}
            </div>
          </div>
        )}
      </div>

      {/* Scale labels */}
      <div className="flex justify-between text-xs md:text-sm px-1">
        {/* Only show first and last labels on mobile, all on desktop */}
        {points.map((point, index) => {
          const isFirst = index === 0;
          const isLast = index === points.length - 1;
          const showOnMobile = isFirst || isLast;

          return (
            <div
              key={point}
              className={`text-center flex-1 ${
                showOnMobile ? "" : "hidden md:block"
              } ${
                point === currentValue
                  ? "text-green-400 font-semibold"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <div className="truncate px-1">{labels[point] || point}</div>
            </div>
          );
        })}
      </div>

      {config.helpText && (
        <p className="text-sm text-gray-400 text-center">{config.helpText}</p>
      )}
    </div>
  );
};
