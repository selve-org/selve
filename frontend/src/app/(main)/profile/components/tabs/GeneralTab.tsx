import { useState, useEffect } from "react";
import { User } from "@clerk/nextjs/server";
import { useTheme } from "next-themes";
import Link from "next/link";
import { SettingsCard } from "../ui/SettingsCard";
import { TierType } from "../../types";
import { Sun, Moon, Monitor, Palette, ArrowRight } from "lucide-react";

interface GeneralTabProps {
  user: {
    id: string;
    fullName: string | null;
    emailAddresses: { emailAddress: string }[];
    imageUrl?: string;
  };
  tier: TierType;
  hasCompletedAssessment?: boolean;
  currentSessionId?: string | null;
}

export function GeneralTab({ user, tier, hasCompletedAssessment, currentSessionId }: GeneralTabProps) {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await fetch(`${backendUrl}/api/users/profile`, {
          headers: {
            "X-User-ID": user.id,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserName(data.name || user.fullName || null);
        } else {
          // Fallback to Clerk's name if backend fetch fails
          setUserName(user.fullName);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Fallback to Clerk's name
        setUserName(user.fullName);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [user.id, user.fullName]);

  // Theme options
  const themeOptions = [
    {
      id: "light",
      label: "Light",
      description: "Light theme all the time",
      icon: Sun,
    },
    {
      id: "system",
      label: "Match system",
      description: "Follow the system preference",
      icon: Monitor,
    },
    {
      id: "dark",
      label: "Dark",
      description: "Dark theme all the time",
      icon: Moon,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Assessment Results Section */}
      <SettingsCard title="Your Assessment">
        {hasCompletedAssessment && currentSessionId ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                You&apos;ve completed your personality assessment
              </p>
              <p className="text-gray-900 dark:text-gray-100">
                View your full personality profile and insights
              </p>
            </div>
            <Link
              href={`/results/${currentSessionId}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors"
            >
              <span>View Results</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Discover your personality profile
              </p>
              <p className="text-gray-900 dark:text-gray-100">
                Take the assessment to uncover your unique traits
              </p>
            </div>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </SettingsCard>

      {/* Profile Section */}
      <SettingsCard title="Profile">
        <div className="flex items-center gap-4 mb-6">
          {user.imageUrl && (
            <img
              src={user.imageUrl}
              alt={userName || "Profile"}
              className="w-16 h-16 rounded-full"
            />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">Full name</span>
            </div>
            {loading ? (
              <div className="w-full px-3 py-2 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-md">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ) : (
              <input
                type="text"
                value={userName || ""}
                disabled
                placeholder={userName ? "" : "Complete assessment to add your name"}
                className="w-full px-3 py-2 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-gray-800 rounded-md text-gray-900 dark:text-gray-100 disabled:opacity-60 placeholder:text-gray-400 dark:placeholder:text-gray-600"
              />
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
              Email address
            </label>
            <input
              type="email"
              value={user.emailAddresses[0]?.emailAddress || ""}
              disabled
              className="w-full px-3 py-2 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-gray-800 rounded-md text-gray-900 dark:text-gray-100 disabled:opacity-60"
            />
          </div>
        </div>
      </SettingsCard>

      {/* Account Tier */}
      <SettingsCard title="Account Tier">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current plan</p>
            <p className="text-xl font-semibold capitalize text-gray-900 dark:text-gray-100">
              {tier === "free" ? "Free" : "Premium"}
            </p>
          </div>
          {tier === "free" && (
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors">
              Upgrade to Premium
            </button>
          )}
        </div>
      </SettingsCard>

      {/* Theme Selector */}
      <SettingsCard title="Appearance" icon={Palette}>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose how Selve looks to you. Select a single theme, or sync with your system
            and automatically switch between day and night themes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = theme === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => setTheme(option.id)}
                  className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                    isSelected
                      ? "border-purple-600 dark:border-purple-500 bg-purple-50 dark:bg-purple-950/20"
                      : "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0c0c0c] hover:border-purple-300 dark:hover:border-purple-700"
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-full ${
                        isSelected
                          ? "bg-purple-600 dark:bg-purple-500 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <p
                        className={`font-medium ${
                          isSelected
                            ? "text-purple-900 dark:text-purple-100"
                            : "text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {option.label}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          isSelected
                            ? "text-purple-700 dark:text-purple-300"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {option.description}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full bg-purple-600 dark:bg-purple-500">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </SettingsCard>
    </div>
  );
}
