"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { HeartIcon, UserIcon, ClockIcon } from "@heroicons/react/24/outline";

interface InviteDetails {
  inviter_name: string;
  relationship_type: string;
  status: string;
  expires_at: string;
}

export default function InvitePage() {
  const params = useParams();
  const router = useRouter();
  const inviteCode = params.code as string;

  const [invite, setInvite] = useState<InviteDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInvite() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await fetch(`${backendUrl}/api/invites/${inviteCode}`);

        if (!response.ok) {
          const data = await response.json();
          setError(data.detail || "Invalid or expired invite");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setInvite(data);
        setLoading(false);

        // Mark invite as opened (analytics)
        await fetch(`${backendUrl}/api/invites/${inviteCode}/mark-opened`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        console.error("Error fetching invite:", err);
        setError("Failed to load invite. Please try again.");
        setLoading(false);
      }
    }

    if (inviteCode) {
      fetchInvite();
    }
  }, [inviteCode]);

  const handleStartAssessment = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      // Mark invite as started (analytics)
      await fetch(`${backendUrl}/api/invites/${inviteCode}/mark-started`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      // Redirect to assessment wizard with invite code
      router.push(`/assessment/wizard?invite=${inviteCode}`);
    } catch (err) {
      console.error("Error starting assessment:", err);
      // Still redirect even if analytics fails
      router.push(`/assessment/wizard?invite=${inviteCode}`);
    }
  };

  const getRelationshipEmoji = (type: string) => {
    const emojis: Record<string, string> = {
      friend: "👥",
      sibling: "👫",
      parent: "👨‍👩‍👧",
      partner: "💑",
      coworker: "👔",
    };
    return emojis[type] || "👤";
  };

  const formatRelationship = (type: string) => {
    const labels: Record<string, string> = {
      friend: "Friend",
      sibling: "Sibling",
      parent: "Parent",
      partner: "Partner",
      coworker: "Coworker",
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-[#0c0c0c] dark:to-purple-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your invite...</p>
        </div>
      </div>
    );
  }

  if (error || !invite) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-[#0c0c0c] dark:to-purple-950 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <ClockIcon className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Invite Not Available
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || "This invite link is invalid, expired, or has already been used."}
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  const expiresIn = new Date(invite.expires_at).toLocaleDateString();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-[#0c0c0c] dark:to-purple-950 px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold mb-2">You're Invited!</h1>
            <p className="text-purple-100 text-lg">
              Someone wants to learn more about themselves through your eyes
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Inviter Info */}
            <div className="bg-purple-50 dark:bg-gray-700/50 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <UserIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {invite.inviter_name}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl">{getRelationshipEmoji(invite.relationship_type)}</span>
                <span className="text-gray-600 dark:text-gray-300">
                  wants your perspective as a <strong>{formatRelationship(invite.relationship_type)}</strong>
                </span>
              </div>
            </div>

            {/* What to Expect */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                What to Expect
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 dark:text-purple-400 text-xl mt-1">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    15-20 minute adaptive questionnaire about how you see them
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 dark:text-purple-400 text-xl mt-1">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    Your honest answers help them gain valuable self-insight
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 dark:text-purple-400 text-xl mt-1">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    Your individual responses remain private and anonymous
                  </span>
                </li>
              </ul>
            </div>

            {/* Expiration Notice */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 justify-center">
              <ClockIcon className="w-4 h-4" />
              <span>This invite expires on {expiresIn}</span>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleStartAssessment}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              Start Assessment
            </button>

            {/* Privacy Note */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              By continuing, you agree to provide honest feedback to help {invite.inviter_name.split(" ")[0]} understand themselves better.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-gray-500 dark:text-gray-400 text-sm">
          Powered by <span className="font-semibold text-purple-600 dark:text-purple-400">SELVE</span> • Psychology-based personality insights
        </p>
      </div>
    </div>
  );
}
