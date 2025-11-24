import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { SettingsCard } from "../../ui/SettingsCard";
import { InviteForm } from "./InviteForm";
import { InviteList } from "./InviteList";
import { InviteLink } from "../../../types";

interface InvitesTabProps {
  invites: InviteLink[];
  loading: boolean;
  remainingInvites: number | null;
  hasCompletedAssessment: boolean;
  onSendInvite: (data: {
    friendEmail: string;
    friendNickname: string;
    relationshipType: string;
  }) => Promise<boolean>;
  onCopyLink: (code: string) => void;
  copiedCode: string | null;
}

export function InvitesTab({
  invites,
  loading,
  remainingInvites,
  hasCompletedAssessment,
  onSendInvite,
  onCopyLink,
  copiedCode,
}: InvitesTabProps) {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSendInvite = async (data: {
    friendEmail: string;
    friendNickname: string;
    relationshipType: string;
  }) => {
    setSending(true);
    const success = await onSendInvite(data);
    setSending(false);
    return success;
  };

  return (
    <div className="space-y-6">
      {/* Assessment Required Notice */}
      {!hasCompletedAssessment && (
        <SettingsCard>
          <div className="flex items-start space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Complete Your Assessment First
              </h3>
              <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                Before inviting friends to assess you, you need to complete your own personality assessment. This helps establish a baseline for comparison.
              </p>
              <a
                href="/assessment"
                className="mt-3 inline-flex items-center px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-md transition-colors"
              >
                Start Your Assessment →
              </a>
            </div>
          </div>
        </SettingsCard>
      )}

      {/* Invite Stats */}
      <SettingsCard>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Friend Assessment Invites
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Invite friends to assess your personality and gain 360° insights
            </p>
          </div>
          {remainingInvites !== null && (
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Remaining</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {remainingInvites}
              </p>
            </div>
          )}
        </div>

        {!showInviteForm && (
          <button
            onClick={() => setShowInviteForm(true)}
            disabled={!hasCompletedAssessment || remainingInvites === 0}
            className="mt-4 w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md text-sm font-medium transition-colors"
          >
            <PaperAirplaneIcon className="w-4 h-4 mr-2" />
            Send New Invite
          </button>
        )}
      </SettingsCard>

      {/* Invite Form */}
      {showInviteForm && (
        <InviteForm
          onSubmit={handleSendInvite}
          onCancel={() => setShowInviteForm(false)}
          sending={sending}
        />
      )}

      {/* Invites List */}
      <SettingsCard>
        <InviteList
          invites={invites}
          loading={loading}
          onCopyLink={onCopyLink}
          copiedCode={copiedCode}
        />
      </SettingsCard>
    </div>
  );
}
