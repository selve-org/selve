// src/components/header/navigation/DesktopNav.tsx
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, NavLinkType, DropdownNavLink } from "./navLinks";

export const DesktopNav = () => {
  const [activeDropdown, setActiveDropdown] = useState<DropdownNavLink | null>(
    null
  );
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (link: NavLinkType) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (link.type === "dropdown") setActiveDropdown(link);
    else setActiveDropdown(null);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const renderDropdownItems = (items: DropdownNavLink["items"]) => {
    // If items exceed 5, render in two columns
    if (items.length > 5) {
      const midpoint = Math.ceil(items.length / 2);
      const firstColumn = items.slice(0, midpoint);
      const secondColumn = items.slice(midpoint);

      return (
        <div className="grid grid-flow-col auto-cols-max gap-x-8">
          <ul className="space-y-1">
            {firstColumn.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block text-sm text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 px-3 py-1.5 rounded-md transition-all"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-1 border-l border-neutral-200 dark:border-neutral-800 pl-8">
            {secondColumn.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block text-sm text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 px-3 py-1.5 rounded-md transition-all"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    // Render a single column for 5 items or less
    return (
      <ul className="space-y-1 w-max">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="block text-sm text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 px-3 py-1.5 rounded-md transition-all"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav
      ref={navRef}
      onMouseLeave={handleMouseLeave}
      className="hidden lg:flex items-center justify-center relative"
    >
      {navLinks.map((link) => (
        <div
          key={link.label}
          onMouseEnter={() => handleMouseEnter(link)}
          className="px-1 py-2"
        >
          {link.type === "link" ? (
            <Link
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 whitespace-nowrap"
            >
              {link.label}
            </Link>
          ) : (
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 whitespace-nowrap">
              {link.label}
            </button>
          )}
        </div>
      ))}

      <AnimatePresence>
        {activeDropdown && navRef.current && (
          <motion.div
            layoutId="dropdown-pane"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onMouseEnter={() => handleMouseEnter(activeDropdown)}
            className="absolute top-full mt-2 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl w-max"
            style={{
              left: (
                navRef.current.children[
                  navLinks.findIndex((l) => l.label === activeDropdown.label)
                ] as HTMLElement
              )?.offsetLeft,
            }}
          >
            <motion.div
              layoutId="dropdown-arrow"
              className="absolute -top-[7px] w-3 h-3 bg-white dark:bg-neutral-900 border-l border-t border-neutral-200 dark:border-neutral-800 rotate-45 z-[-1]"
              style={{ left: "30px" }}
            />
            {renderDropdownItems(activeDropdown.items)}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
