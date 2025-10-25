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
  const {
    min = 1,
    max = 10,
    step = 1,
    labels = {},
    showValue = true,
  } = config;

  const currentValue = value ?? min;

  // Generate scale points
  const points = [];
  for (let i = min; i <= max; i += step) {
    points.push(i);
  }

  return (
    <div className="w-full space-y-4">
      {/* Slider */}
      <div className="relative pt-8">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-green-500
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-6
            [&::-moz-range-thumb]:h-6
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
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              {currentValue}
            </div>
          </div>
        )}
      </div>

      {/* Scale labels */}
      <div className="flex justify-between text-sm">
        {points.map((point) => (
          <div
            key={point}
            className={`text-center ${
              point === currentValue ? "text-green-400 font-medium" : "text-gray-500"
            }`}
          >
            <div>{labels[point] || point}</div>
          </div>
        ))}
      </div>

      {config.helpText && (
        <p className="text-sm text-gray-400 text-center">{config.helpText}</p>
      )}
    </div>
  );
};
