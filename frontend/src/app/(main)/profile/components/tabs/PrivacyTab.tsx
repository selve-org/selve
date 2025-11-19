import { SettingsCard } from "../ui/SettingsCard";

export function PrivacyTab() {
  return (
    <div className="space-y-6">
      <SettingsCard title="Privacy Settings">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Privacy controls coming soon. Your data is always kept secure and private.
        </p>
      </SettingsCard>
    </div>
  );
}
