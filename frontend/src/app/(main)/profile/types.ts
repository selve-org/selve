/**
 * Shared types for the profile/settings page
 */

export interface InviteLink {
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

export type TabType =
  | "general"
  | "security"
  | "accounts"
  | "sessions"
  | "invites"
  | "plan";

export type TierType = "free" | "premium";

export interface Tab {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}
