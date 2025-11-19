import { CreditCardIcon } from "@heroicons/react/24/outline";
import { SettingsCard } from "../ui/SettingsCard";
import { TierType } from "../../types";

interface BillingTabProps {
  tier: TierType;
}

export function BillingTab({ tier }: BillingTabProps) {
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
