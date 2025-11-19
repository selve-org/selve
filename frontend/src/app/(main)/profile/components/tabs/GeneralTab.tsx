import { User } from "@clerk/nextjs/server";
import { SettingsCard } from "../ui/SettingsCard";
import { TierType } from "../../types";

interface GeneralTabProps {
  user: {
    fullName: string | null;
    emailAddresses: { emailAddress: string }[];
    imageUrl?: string;
  };
  tier: TierType;
}

export function GeneralTab({ user, tier }: GeneralTabProps) {
  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <SettingsCard title="Profile">
        <div className="flex items-center gap-4 mb-6">
          {user.imageUrl && (
            <img
              src={user.imageUrl}
              alt={user.fullName || "Profile"}
              className="w-16 h-16 rounded-full"
            />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">Full name</span>
            </div>
            <input
              type="text"
              value={user.fullName || ""}
              disabled
              className="w-full px-3 py-2 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-gray-800 rounded-md text-gray-900 dark:text-gray-100 disabled:opacity-60"
            />
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
    </div>
  );
}
