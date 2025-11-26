"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { SettingsCard } from "../ui/SettingsCard";
import { Monitor, Smartphone, Tablet, AlertCircle, CheckCircle, MapPin } from "lucide-react";
import type { SessionResource } from "@clerk/types";

export function SessionsTab() {
  const { user } = useUser();
  const clerk = useClerk();
  const [sessions, setSessions] = useState<SessionResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [revokeLoading, setRevokeLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch sessions on mount
  useEffect(() => {
    fetchSessions();
  }, [user]);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const userSessions = await user?.getSessions();
      if (userSessions) {
        setSessions(userSessions);
      }
    } catch (error: any) {
      setError("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  // Get device icon based on device type
  const getDeviceIcon = (deviceType?: string) => {
    const type = deviceType?.toLowerCase() || "";
    if (type.includes("mobile") || type.includes("phone")) {
      return <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
    }
    if (type.includes("tablet")) {
      return <Tablet className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
    }
    return <Monitor className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
  };

  // Format date
  const formatDate = (date: Date | number) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
    return d.toLocaleDateString();
  };

  // Handle revoking a session
  const handleRevokeSession = async (sessionId: string) => {
    if (
      !confirm(
        "Are you sure you want to sign out this device? You'll need to sign in again to use it."
      )
    ) {
      return;
    }

    setError("");
    setRevokeLoading(sessionId);

    try {
      const session = sessions.find((s) => s.id === sessionId);
      await session?.revoke();

      setSuccess("Device signed out successfully");

      // Refresh sessions list
      await fetchSessions();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error: any) {
      setError(error.errors?.[0]?.message || "Failed to revoke session");
    } finally {
      setRevokeLoading(null);
    }
  };

  // Get browser name from user agent
  const getBrowserName = (userAgent?: string): string => {
    if (!userAgent) return "Unknown Browser";

    if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) return "Chrome";
    if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Edg")) return "Edge";
    if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";

    return "Unknown Browser";
  };

  // Get OS name from user agent
  const getOSName = (userAgent?: string): string => {
    if (!userAgent) return "";

    if (userAgent.includes("Windows")) return "Windows";
    if (userAgent.includes("Mac")) return "macOS";
    if (userAgent.includes("Linux")) return "Linux";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iOS") || userAgent.includes("iPhone")) return "iOS";

    return "";
  };

  return (
    <div className="space-y-6">
      <SettingsCard title="Active Sessions" icon={Monitor}>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage where you're signed in. If you see an unfamiliar device, sign it out
            immediately and change your password.
          </p>

          {/* Success/Error Messages */}
          {error && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-md">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 rounded-md">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
              <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-50 dark:bg-[#0c0c0c] rounded-lg border border-gray-200 dark:border-gray-800 animate-pulse"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2" />
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => {
                const isCurrentSession = session.id === clerk.session?.id;
                const browser = getBrowserName(session.latestActivity?.browserName);
                const os = getOSName(session.latestActivity?.deviceType);

                return (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0c0c0c] rounded-lg border border-gray-200 dark:border-gray-800"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 flex-shrink-0">
                        {getDeviceIcon(session.latestActivity?.deviceType)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {browser}
                            {os && ` on ${os}`}
                          </p>
                          {isCurrentSession && (
                            <span className="inline-flex items-center px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full flex-shrink-0">
                              Current
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-gray-600 dark:text-gray-400">
                          {session.latestActivity?.ipAddress && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {session.latestActivity.ipAddress}
                            </span>
                          )}
                          {session.latestActivity?.city && (
                            <span className="hidden sm:block">•</span>
                          )}
                          {session.latestActivity?.city && (
                            <span>
                              {session.latestActivity.city}
                              {session.latestActivity.country &&
                                `, ${session.latestActivity.country}`}
                            </span>
                          )}
                          {session.lastActiveAt && (
                            <>
                              <span className="hidden sm:block">•</span>
                              <span>Last active {formatDate(session.lastActiveAt)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Revoke Button - Only show for non-current sessions */}
                    {!isCurrentSession && (
                      <button
                        onClick={() => handleRevokeSession(session.id)}
                        disabled={revokeLoading === session.id}
                        className="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors disabled:opacity-50 flex-shrink-0 cursor-pointer disabled:cursor-not-allowed"
                      >
                        {revokeLoading === session.id ? "Signing out..." : "Sign out"}
                      </button>
                    )}
                  </div>
                );
              })}

              {sessions.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Monitor className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No active sessions found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </SettingsCard>
    </div>
  );
}
