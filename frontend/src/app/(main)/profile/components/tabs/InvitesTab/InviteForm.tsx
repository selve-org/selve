import { useState, FormEvent } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface InviteFormProps {
  onSubmit: (data: {
    friendEmail: string;
    friendNickname: string;
    relationshipType: string;
  }) => Promise<boolean>;
  onCancel: () => void;
  sending: boolean;
}

export function InviteForm({ onSubmit, onCancel, sending }: InviteFormProps) {
  const [friendEmail, setFriendEmail] = useState("");
  const [friendNickname, setFriendNickname] = useState("");
  const [relationshipType, setRelationshipType] = useState("friend");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const success = await onSubmit({
      friendEmail,
      friendNickname,
      relationshipType,
    });

    if (success) {
      // Reset form
      setFriendEmail("");
      setFriendNickname("");
      setRelationshipType("friend");
      onCancel();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-800 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Send New Invite
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={friendEmail}
            onChange={(e) => setFriendEmail(e.target.value)}
            placeholder="friend@example.com"
            className="w-full px-3 py-2 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-gray-800 rounded-md text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nickname (Optional)
          </label>
          <input
            type="text"
            value={friendNickname}
            onChange={(e) => setFriendNickname(e.target.value)}
            placeholder="Jane"
            className="w-full px-3 py-2 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-gray-800 rounded-md text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Relationship *
          </label>
          <select
            value={relationshipType}
            onChange={(e) => setRelationshipType(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-gray-800 rounded-md text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="friend">Friend</option>
            <option value="sibling">Sibling</option>
            <option value="parent">Parent</option>
            <option value="partner">Partner</option>
            <option value="coworker">Coworker</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={sending}
            className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-md text-sm font-medium transition-colors"
          >
            {sending ? "Sending..." : "Send Invite"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
