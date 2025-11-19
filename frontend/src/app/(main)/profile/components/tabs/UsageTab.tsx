import { SettingsCard } from "../ui/SettingsCard";
import { TierType, InviteLink } from "../../types";

interface UsageTabProps {
  tier: TierType;
  invites: InviteLink[];
}

export function UsageTab({ tier, invites }: UsageTabProps) {
  const inviteCount = invites.length;
  const maxInvites = tier === "free" ? 3 : Infinity;
  const usagePercentage = tier === "free" ? (inviteCount / 3) * 100 : 20;

  return (
    <div className="space-y-6">
      <SettingsCard title="Plan usage limits">
        {/* Invite Usage */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Friend invites</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {inviteCount} / {tier === "free" ? "3" : "∞"}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
            <div
              className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Future: Chatbot Usage */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Chatbot usage tracking coming soon
          </p>
        </div>
      </SettingsCard>
    </div>
  );
}
