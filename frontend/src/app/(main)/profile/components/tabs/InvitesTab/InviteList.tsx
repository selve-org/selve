import { UserGroupIcon } from "@heroicons/react/24/outline";
import { InviteLink } from "../../../types";
import { InviteCard } from "./InviteCard";

interface InviteListProps {
  invites: InviteLink[];
  loading: boolean;
  onCopyLink: (code: string) => void;
  copiedCode: string | null;
}

export function InviteList({ invites, loading, onCopyLink, copiedCode }: InviteListProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
      </div>
    );
  }

  if (invites.length === 0) {
    return (
      <div className="text-center py-12">
        <UserGroupIcon className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400 mb-2">No invites sent yet</p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Send your first invite to get 360° personality insights from friends
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {invites.map((invite) => (
        <InviteCard
          key={invite.id}
          invite={invite}
          onCopy={onCopyLink}
          isCopied={copiedCode === invite.inviteCode}
        />
      ))}
    </div>
  );
}
