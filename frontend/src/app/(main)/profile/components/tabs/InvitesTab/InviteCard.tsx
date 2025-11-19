import { ClipboardIcon, CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import { InviteLink } from "../../../types";

interface InviteCardProps {
  invite: InviteLink;
  onCopy: (code: string) => void;
  isCopied: boolean;
}

export function InviteCard({ invite, onCopy, isCopied }: InviteCardProps) {
  const getStatusBadge = () => {
    if (invite.status === "completed") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 dark:bg-green-500/10 dark:text-green-400">
          ✓ Completed
        </span>
      );
    }
    if (new Date(invite.expiresAt) < new Date()) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400">
          Expired
        </span>
      );
    }
    if (invite.startedAt) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400">
          In Progress
        </span>
      );
    }
    if (invite.openedAt) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">
          Opened
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400">
        Pending
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
              {invite.friendNickname || invite.friendEmail}
            </h3>
            {getStatusBadge()}
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
            <span className="capitalize">{invite.relationshipType}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {new Date(invite.createdAt).toLocaleDateString()}
            </span>
            {invite.status !== "completed" && (
              <>
                <span>•</span>
                <span className="text-xs">
                  Expires {new Date(invite.expiresAt).toLocaleDateString()}
                </span>
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => onCopy(invite.inviteCode)}
          className="flex-shrink-0 inline-flex items-center px-3 py-1.5 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
        >
          {isCopied ? (
            <>
              <CheckIcon className="w-4 h-4 mr-1.5 text-green-600 dark:text-green-400" />
              Copied
            </>
          ) : (
            <>
              <ClipboardIcon className="w-4 h-4 mr-1.5" />
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}
