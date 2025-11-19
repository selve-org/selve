"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Settings, LogOut, User, ChevronDown } from "lucide-react";

export function CustomUserMenu() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Loading state
  if (!isLoaded) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
    );
  }

  // Not signed in
  if (!user) {
    return null;
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
        aria-label="User menu"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-purple-500 transition-all">
          <img
            src={user.imageUrl}
            alt={user.fullName || "Profile"}
            className="w-full h-full object-cover"
          />
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* User Info Header */}
            <div className="px-4 py-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-500/20">
                  <img
                    src={user.imageUrl}
                    alt={user.fullName || "Profile"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {user.fullName || "User"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {user.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {/* View Profile */}
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                  <User className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">View Profile</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    See your public profile
                  </p>
                </div>
              </Link>

              {/* Settings */}
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                  <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Settings</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Manage your account
                  </p>
                </div>
              </Link>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-800 my-2" />

            {/* Sign Out */}
            <div className="px-2 pb-2">
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-950/20 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                  <LogOut className="w-4 h-4" />
                </div>
                <span className="font-medium">Sign out</span>
              </button>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-500 text-center flex items-center justify-center gap-1">
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                </svg>
                Secured by Clerk
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
