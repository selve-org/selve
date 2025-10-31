// src/components/wizard/QuestionRenderer.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import type { QuestionnaireQuestion } from "@/types/questionnaire";
import {
  PillSelect,
  TextInput,
  Textarea,
  DateInput,
  ScaleSlider,
  NumberInput,
  Radio,
} from "./inputs";
import { CountrySelect } from "./inputs/CountrySelect";

interface QuestionRendererProps {
  question: QuestionnaireQuestion;
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
}

/**
 * QuestionRenderer Component
 *
 * Dynamically renders the appropriate input component based on question type
 * This is the "waiter" that interprets the "customer's" (backend) instructions
 * and uses the available "tools" (input components) to render the question
 */
export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  value,
  onChange,
  error,
}) => {
  const { type, text, description, renderConfig = {}, isRequired } = question;

  /**
   * Render the appropriate input component based on type
   */
  const renderInput = () => {
    switch (type) {
      case "pill-select":
        return (
          <PillSelect
            value={value as string | string[] | null}
            onChange={onChange}
            config={renderConfig}
            isMultiple={renderConfig.multiple}
          />
        );

      case "text-input":
      case "email-input":
      case "phone-input":
        return (
          <TextInput
            value={(value as string) || ""}
            onChange={onChange}
            config={renderConfig}
            error={error}
          />
        );

      case "number-input":
        return (
          <NumberInput
            value={(value as number) || 0}
            onChange={onChange}
            config={renderConfig}
            error={error}
          />
        );

      case "textarea":
        return (
          <Textarea
            value={(value as string) || ""}
            onChange={onChange}
            config={renderConfig}
            error={error}
          />
        );

      case "date-input":
      case "time-input":
      case "datetime-input":
        return (
          <DateInput
            value={(value as string) || ""}
            onChange={onChange}
            config={renderConfig}
            error={error}
          />
        );

      case "scale-slider":
      case "rating":
        return (
          <ScaleSlider
            value={value as number | null}
            onChange={onChange}
            config={renderConfig}
          />
        );

      case "radio":
        return (
          <Radio
            value={(value as string) || ""}
            onChange={onChange}
            options={renderConfig.options || []}
            error={error}
          />
        );

      case "country-select":
        return (
          <CountrySelect
            value={(value as string) || ""}
            onChange={onChange}
            error={error}
            placeholder={renderConfig.placeholder}
            helpText={renderConfig.helpText}
          />
        );

      // TODO: Add more input type handlers as components are created
      case "checkbox":
      case "dropdown":
      case "multi-select":
      case "file-upload":
      case "color-picker":
      case "range-slider":
      case "toggle":
      case "likert-scale":
        return (
          <div className="p-8 bg-gray-800 rounded-lg text-center text-gray-400">
            <p className="mb-2">
              Input type &quot;{type}&quot; not yet implemented
            </p>
            <p className="text-sm">This will be available soon</p>
          </div>
        );

      default:
        return (
          <div className="p-8 bg-red-900/20 rounded-lg text-center text-red-400">
            <p>Unknown input type: {type}</p>
            <p className="text-sm mt-2">Please contact support</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Question Label */}
      <label className="block text-base md:text-lg text-gray-900 dark:text-white font-medium leading-6">
        {text}
        {isRequired && <span className="text-red-400 ml-1">*</span>}
      </label>

      {/* Input Component */}
      <div>{renderInput()}</div>

      {/* Description/Help text */}
      {description && (
        <p className="text-sm text-gray-600 dark:text-[#999999] leading-5 mt-2">
          {description}
        </p>
      )}

      {/* Tooltip */}
      {renderConfig.tooltip && (
        <div className="flex items-start gap-2 p-3 bg-gray-100 dark:bg-[#2e2e2e] rounded-[4px] mt-2">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-[#666666] mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-xs text-gray-600 dark:text-[#999999]">
            {renderConfig.tooltip}
          </p>
        </div>
      )}
    </motion.div>
  );
};
