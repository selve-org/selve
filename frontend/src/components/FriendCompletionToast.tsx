// src/components/FriendCompletionToast.tsx
"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Sparkles } from "lucide-react";

/**
 * FriendCompletionToast
 * 
 * Shows a celebration toast when a friend completes the assessment.
 * This component should be mounted in the root layout to work globally.
 */
export function FriendCompletionToast() {
  const router = useRouter();
  const { toastFriend, clearToast } = useNotifications();

  useEffect(() => {
    if (toastFriend) {
      // Show celebration toast
      toast.success(`${toastFriend} completed your friend assessment! 🎉`, {
        description: "Your profile has been updated with their insights. Click to view!",
        duration: 8000,
        action: {
          label: "View Profile",
          onClick: () => {
            router.push("/results");
            clearToast();
          },
        },
        onDismiss: () => {
          clearToast();
        },
        onAutoClose: () => {
          clearToast();
        },
        icon: <Sparkles className="w-5 h-5 text-purple-500" />,
      });

      // Clear the toast flag from backend
      const clearFlag = async () => {
        try {
          const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
          await fetch(`${API_BASE}/api/notifications/toast-flag`, {
            method: "DELETE",
          });
        } catch (error) {
          console.error("Failed to clear toast flag:", error);
        }
      };
      clearFlag();
    }
  }, [toastFriend, clearToast, router]);

  return null; // This component doesn't render anything
}
