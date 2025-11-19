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
            disabled={remainingInvites === 0}
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
