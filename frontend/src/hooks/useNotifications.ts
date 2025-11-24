// src/hooks/useNotifications.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  link: string | null;
  read: boolean;
  readAt: string | null;
  createdAt: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function useNotifications() {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toastFriend, setToastFriend] = useState<string | null>(null);

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/notifications`, {
        headers: {
          "X-User-ID": user.id,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Fetch unread count
  const fetchUnreadCount = useCallback(async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(`${API_BASE}/api/notifications/unread-count`, {
        headers: {
          "X-User-ID": user.id,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.count || 0);
      }
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  }, [user?.id]);

  // Check for toast flag
  const checkToastFlag = useCallback(async () => {
    if (!user?.id) return;

    try {
      const response = await fetch(`${API_BASE}/api/notifications/toast-flag`, {
        headers: {
          "X-User-ID": user.id,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.friend_name) {
          setToastFriend(data.friend_name);
        }
      }
    } catch (error) {
      console.error("Failed to check toast flag:", error);
    }
  }, [user?.id]);

  // Mark notification as read
  const markAsRead = useCallback(
    async (notificationId: string) => {
      if (!user?.id) return;

      try {
        const response = await fetch(
          `${API_BASE}/api/notifications/${notificationId}/mark-read`,
          {
            method: "POST",
            headers: {
              "X-User-ID": user.id,
            },
          }
        );

        if (response.ok) {
          // Update local state
          setNotifications((prev) =>
            prev.map((n) =>
              n.id === notificationId ? { ...n, read: true, readAt: new Date().toISOString() } : n
            )
          );
          setUnreadCount((prev) => Math.max(0, prev - 1));
        }
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
      }
    },
    [user?.id]
  );

  // Clear toast
  const clearToast = useCallback(() => {
    setToastFriend(null);
  }, []);

  // Initial load
  useEffect(() => {
    if (user?.id) {
      fetchUnreadCount();
      checkToastFlag();
    }
  }, [user?.id, fetchUnreadCount, checkToastFlag]);

  return {
    notifications,
    unreadCount,
    loading,
    toastFriend,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    clearToast,
  };
}
