import { CreditCardIcon } from "@heroicons/react/24/outline";
import { SettingsCard } from "../ui/SettingsCard";
import { TierType, InviteLink } from "../../types";

interface PlanUsageTabProps {
  tier: TierType;
  invites: InviteLink[];
}

export function PlanUsageTab({ tier, invites }: PlanUsageTabProps) {
  const inviteCount = invites.length;
  const maxInvites = tier === "free" ? 3 : Infinity;
  const usagePercentage = tier === "free" ? (inviteCount / 3) * 100 : 20;

  return (
    <div className="space-y-6">
      {/* Subscription Info */}
      <SettingsCard title="Subscription">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <CreditCardIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {tier === "free" ? "Free Plan" : "Pro Plan"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {tier === "free"
                  ? "Limited to 3 friend assessments"
                  : "Unlimited friend assessments"}
              </p>
            </div>
          </div>
          {tier === "free" && (
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors">
              Upgrade
            </button>
          )}
        </div>
      </SettingsCard>

      {/* Usage Limits */}
      <SettingsCard title="Usage Limits">
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

      {/* Payment Method */}
      {tier !== "free" && (
        <SettingsCard title="Payment">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-200 dark:bg-gray-800 rounded">
                <CreditCardIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                •••• •••• •••• 4242
              </span>
            </div>
            <button className="px-3 py-1.5 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium transition-colors">
              Update
            </button>
          </div>
        </SettingsCard>
      )}
    </div>
  );
}
