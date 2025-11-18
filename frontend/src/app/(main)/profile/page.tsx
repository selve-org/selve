"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  ClipboardIcon,
  CheckIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
  ClockIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface InviteLink {
  id: string;
  inviteCode: string;
  friendEmail: string;
  friendNickname: string | null;
  relationshipType: string;
  status: string;
  createdAt: string;
  expiresAt: string;
  openedAt: string | null;
  startedAt: string | null;
  completedAt: string | null;
}

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [invites, setInvites] = useState<InviteLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [remainingInvites, setRemainingInvites] = useState<number | null>(null);
  
  // Form state
  const [friendEmail, setFriendEmail] = useState("");
  const [friendNickname, setFriendNickname] = useState("");
  const [relationshipType, setRelationshipType] = useState("friend");
  const [sending, setSending] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Fetch user's invites
  useEffect(() => {
    if (isLoaded && user) {
      fetchInvites();
    }
  }, [isLoaded, user]);

  const fetchInvites = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${backendUrl}/api/invites`, {
        headers: {
          "X-User-ID": user?.id || "",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setInvites(data.invites || []);
        setRemainingInvites(data.remaining_invites);
      }
    } catch (error) {
      console.error("Failed to fetch invites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch("/api/invites/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          friend_email: friendEmail,
          friend_nickname: friendNickname || null,
          relationship_type: relationshipType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("Rate limit exceeded. Please try again later.");
        } else if (response.status === 403) {
          toast.error(data.detail || "Invite limit reached. Upgrade to Premium for unlimited invites.");
        } else {
          toast.error(data.detail || "Failed to send invite");
        }
        return;
      }

      // Success
      if (data.email_sent) {
        toast.success(`Invite sent to ${friendEmail}!`);
      } else {
        toast.warning("Invite created, but email failed. Share the link manually.");
      }

      // Reset form
      setFriendEmail("");
      setFriendNickname("");
      setRelationshipType("friend");
      setShowInviteForm(false);

      // Refresh invite list
      fetchInvites();
    } catch (error) {
      toast.error("Failed to send invite. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const copyInviteLink = (inviteCode: string) => {
    const inviteUrl = `${window.location.origin}/invite/${inviteCode}`;
    navigator.clipboard.writeText(inviteUrl);
    setCopiedCode(inviteCode);
    toast.success("Invite link copied!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getStatusBadge = (invite: InviteLink) => {
    if (invite.status === "completed") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          ✓ Completed
        </span>
      );
    }
    if (new Date(invite.expiresAt) < new Date()) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Expired
        </span>
      );
    }
    if (invite.startedAt) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          In Progress
        </span>
      );
    }
    if (invite.openedAt) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Opened
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        Pending
      </span>
    );
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            {user.imageUrl && (
              <img
                src={user.imageUrl}
                alt={user.fullName || "Profile"}
                className="w-20 h-20 rounded-full"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {user.fullName || user.emailAddresses[0].emailAddress}
              </h1>
              <p className="text-gray-600 mt-1">
                {user.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>
          
          {remainingInvites !== null && (
            <div className="text-right">
              <p className="text-sm text-gray-600">Remaining Invites</p>
              <p className="text-3xl font-bold text-blue-600">{remainingInvites}</p>
              {remainingInvites === 0 && (
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Upgrade to Premium →
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Invite Dashboard */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <UserGroupIcon className="w-7 h-7 text-blue-600" />
              Friend Assessment Invites
            </h2>
            <p className="text-gray-600 mt-1">
              Invite friends to assess your personality and gain 360° insights
            </p>
          </div>
          
          {!showInviteForm && (
            <button
              onClick={() => setShowInviteForm(true)}
              disabled={remainingInvites === 0}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="w-5 h-5 mr-2" />
              Send New Invite
            </button>
          )}
        </div>

        {/* Invite Form */}
        {showInviteForm && (
          <form onSubmit={handleSendInvite} className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Send New Invite</h3>
              <button
                type="button"
                onClick={() => setShowInviteForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={friendEmail}
                  onChange={(e) => setFriendEmail(e.target.value)}
                  placeholder="friend@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nickname (Optional)
                </label>
                <input
                  type="text"
                  value={friendNickname}
                  onChange={(e) => setFriendNickname(e.target.value)}
                  placeholder="Jane"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationship *
              </label>
              <select
                value={relationshipType}
                onChange={(e) => setRelationshipType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="friend">Friend</option>
                <option value="sibling">Sibling</option>
                <option value="parent">Parent</option>
                <option value="partner">Partner</option>
                <option value="coworker">Coworker</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={sending}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300"
              >
                {sending ? "Sending..." : "Send Invite"}
              </button>
              <button
                type="button"
                onClick={() => setShowInviteForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Invites List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : invites.length === 0 ? (
          <div className="text-center py-12">
            <UserGroupIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No invites sent yet</p>
            <p className="text-sm text-gray-500">
              Send your first invite to get 360° personality insights from friends
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {invites.map((invite) => (
              <div
                key={invite.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {invite.friendNickname || invite.friendEmail}
                      </h3>
                      {getStatusBadge(invite)}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="capitalize">{invite.relationshipType}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        Sent {new Date(invite.createdAt).toLocaleDateString()}
                      </span>
                      {invite.status !== "completed" && (
                        <>
                          <span>•</span>
                          <span>
                            Expires {new Date(invite.expiresAt).toLocaleDateString()}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => copyInviteLink(invite.inviteCode)}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {copiedCode === invite.inviteCode ? (
                      <>
                        <CheckIcon className="w-4 h-4 mr-1.5 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <ClipboardIcon className="w-4 h-4 mr-1.5" />
                        Copy Link
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
