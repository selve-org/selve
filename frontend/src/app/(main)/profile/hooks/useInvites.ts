import { useState, useCallback } from "react";
import { toast } from "sonner";
import { InviteLink, TierType } from "../types";

interface UseInvitesReturn {
  invites: InviteLink[];
  loading: boolean;
  remainingInvites: number | null;
  tier: TierType;
  fetchInvites: () => Promise<void>;
  sendInvite: (data: SendInviteData) => Promise<boolean>;
  copyInviteLink: (inviteCode: string) => void;
  copiedCode: string | null;
}

interface SendInviteData {
  friendEmail: string;
  friendNickname: string;
  relationshipType: string;
}

export function useInvites(userId: string | undefined): UseInvitesReturn {
  const [invites, setInvites] = useState<InviteLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [remainingInvites, setRemainingInvites] = useState<number | null>(null);
  const [tier, setTier] = useState<TierType>("free");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const fetchInvites = useCallback(async () => {
    if (!userId) return;

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${backendUrl}/api/invites`, {
        headers: {
          "X-User-ID": userId,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setInvites(data.invites || []);
        setRemainingInvites(data.remaining_invites);
        setTier(data.tier || "free");
      }
    } catch (error) {
      console.error("Failed to fetch invites:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const sendInvite = useCallback(
    async (data: SendInviteData): Promise<boolean> => {
      try {
        const response = await fetch("/api/invites/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            friend_email: data.friendEmail,
            friend_nickname: data.friendNickname || null,
            relationship_type: data.relationshipType,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          if (response.status === 429) {
            toast.error("Rate limit exceeded. Please try again later.");
          } else if (response.status === 403) {
            toast.error(
              result.detail || "Invite limit reached. Upgrade to Premium for unlimited invites."
            );
          } else {
            toast.error(result.detail || "Failed to send invite");
          }
          return false;
        }

        // Success
        if (result.email_sent) {
          toast.success(`Invite sent to ${data.friendEmail}!`);
        } else {
          toast.warning("Invite created, but email failed. Share the link manually.");
        }

        // Refresh invite list
        await fetchInvites();
        return true;
      } catch (error) {
        toast.error("Failed to send invite. Please try again.");
        return false;
      }
    },
    [fetchInvites]
  );

  const copyInviteLink = useCallback((inviteCode: string) => {
    const inviteUrl = `${window.location.origin}/invite/${inviteCode}`;
    navigator.clipboard.writeText(inviteUrl);
    setCopiedCode(inviteCode);
    toast.success("Invite link copied!");
    setTimeout(() => setCopiedCode(null), 2000);
  }, []);

  return {
    invites,
    loading,
    remainingInvites,
    tier,
    fetchInvites,
    sendInvite,
    copyInviteLink,
    copiedCode,
  };
}
