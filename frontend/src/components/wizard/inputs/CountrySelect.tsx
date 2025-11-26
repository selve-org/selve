"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Country {
  name: string;
  country_code: string;
  formatted: string;
}

interface CountrySelectProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  helpText?: string;
}

/**
 * CountrySelect Component
 *
 * Autocomplete country selector using Geoapify API
 * - Type to search countries
 * - Shows dropdown with matches
 * - Returns country name (e.g., "Nigeria")
 */
export function CountrySelect({
  value = "",
  onChange,
  error,
  placeholder = "Start typing your country...",
  helpText,
}: CountrySelectProps) {
  const [inputValue, setInputValue] = useState(value);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

  // Fetch countries from Geoapify
  useEffect(() => {
    if (inputValue.length < 2) {
      setCountries([]);
      setIsOpen(false);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
            inputValue
          )}&type=country&format=json&apiKey=${API_KEY}`
        );
        const data = await response.json();

        if (data.results) {
          const countryList: Country[] = data.results.map((result: any) => ({
            name: result.country || result.name,
            country_code: result.country_code?.toUpperCase() || "",
            formatted: result.formatted || result.name,
          }));

          // Remove duplicates
          const unique = Array.from(
            new Map(countryList.map((c) => [c.country_code, c])).values()
          );

          setCountries(unique);
          setIsOpen(unique.length > 0);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [inputValue, API_KEY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedIndex(-1);
  };

  // Handle country selection
  const handleSelect = (country: Country) => {
    setInputValue(country.name);
    onChange(country.name);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < countries.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < countries.length) {
          handleSelect(countries[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => inputValue.length >= 2 && setIsOpen(true)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors bg-white dark:bg-[#2e2e2e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
          error
            ? "border-red-500 focus:border-red-600 dark:focus:border-red-400"
            : "border-gray-200 dark:border-[#3e3e3e] focus:border-purple-600 dark:focus:border-purple-400"
        } focus:outline-none focus:ring-0`}
      />

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-gray-300 dark:border-[#4e4e4e] border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin" />
        </div>
      )}

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && countries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-[#2e2e2e] border-2 border-gray-200 dark:border-[#3e3e3e] rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {countries.map((country, index) => (
              <button
                key={country.country_code}
                onClick={() => handleSelect(country)}
                className={`w-full px-4 py-3 text-left transition-colors cursor-pointer ${
                  index === selectedIndex
                    ? "bg-purple-100 dark:bg-purple-900/20"
                    : "hover:bg-gray-100 dark:hover:bg-[#3e3e3e]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white font-medium">
                    {country.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {country.country_code}
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help text */}
      {helpText && !error && (
        <p className="mt-2 text-sm text-gray-500 dark:text-[#999999]">
          {helpText}
        </p>
      )}

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-500 dark:text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
