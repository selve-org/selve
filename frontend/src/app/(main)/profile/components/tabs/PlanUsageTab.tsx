"use client";

import { CreditCardIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { SettingsCard } from "../ui/SettingsCard";
import { TierType, InviteLink } from "../../types";
import { useUsage } from "@/hooks/useUsage";

interface PlanUsageTabProps {
  tier: TierType;
  invites: InviteLink[];
}

export function PlanUsageTab({ tier, invites }: PlanUsageTabProps) {
  const inviteCount = invites.length;
  const maxInvites = tier === "free" ? 3 : Infinity;
  const usagePercentage = tier === "free" ? (inviteCount / 3) * 100 : 20;

  // Chatbot usage tracking
  const {
    usagePercentage: chatbotUsage,
    messageCount,
    timeUntilReset,
    plan,
    loading: usageLoading,
    isLimitExceeded
  } = useUsage();

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
            /* COMING SOON: Upgrade functionality */
            <button 
              disabled 
              title="Coming soon"
              className="px-4 py-2 bg-purple-600/50 text-white/70 rounded-md text-sm font-medium cursor-not-allowed"
            >
              Upgrade
            </button>
            /* END COMING SOON */
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

        {/* Chatbot Usage */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Chatbot usage</span>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {usageLoading ? (
                <span className="text-gray-400">Loading...</span>
              ) : plan === "pro" ? (
                <span className="text-green-600 dark:text-green-400">Unlimited</span>
              ) : (
                `${Math.round(chatbotUsage)}%`
              )}
            </span>
          </div>

          {plan === "free" && (
            <>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    isLimitExceeded
                      ? "bg-red-600 dark:bg-red-500"
                      : chatbotUsage >= 80
                      ? "bg-yellow-600 dark:bg-yellow-500"
                      : "bg-purple-600 dark:bg-purple-500"
                  }`}
                  style={{ width: `${Math.min(chatbotUsage, 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                <span>{messageCount} messages today</span>
                <span>Resets in {timeUntilReset}</span>
              </div>
              {isLimitExceeded && (
                <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-sm text-red-800 dark:text-red-300 font-medium">
                    Daily limit reached
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    Upgrade to Pro for unlimited chatbot conversations!
                  </p>
                </div>
              )}
            </>
          )}

          {plan === "pro" && (
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {messageCount} messages today • No daily limit
            </p>
          )}
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
            {/* COMING SOON: Payment method update functionality */}
            <button 
              disabled 
              title="Coming soon"
              className="px-3 py-1.5 bg-white/50 dark:bg-[#0c0c0c]/50 border border-gray-200 dark:border-gray-800 text-gray-700/50 dark:text-gray-300/50 rounded-md text-sm font-medium cursor-not-allowed"
            >
              Update
            </button>
            {/* END COMING SOON */}
          </div>
        </SettingsCard>
      )}
    </div>
  );
}
