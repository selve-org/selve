// src/hooks/useUsage.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

interface UsageData {
  subscription_plan: "free" | "pro";
  current_period: {
    start: string;
    end: string;
    total_cost: number;
    message_count: number;
    percentage_used: number;
    limit: number | null;
  };
  can_send_message: boolean;
  limit_exceeded: boolean;
  time_until_reset: string;
}

const API_BASE = process.env.NEXT_PUBLIC_CHAT_API_URL || "http://localhost:8001";

export function useUsage() {
  const { user } = useUser();
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch usage data
  const fetchUsage = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/users/${user.id}/usage`);

      if (response.ok) {
        const data = await response.json();
        setUsage(data);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Failed to fetch usage");
      }
    } catch (err) {
      console.error("Failed to fetch usage:", err);
      setError("Network error while fetching usage");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Get usage percentage
  const usagePercentage = usage?.current_period?.percentage_used || 0;

  // Check if nearing limit (>= 80%)
  const isNearingLimit = usagePercentage >= 80 && usagePercentage < 100;

  // Check if limit exceeded
  const isLimitExceeded = usage?.limit_exceeded || false;

  // Check if user can send messages
  const canSendMessage = usage?.can_send_message ?? true;

  // Get message count
  const messageCount = usage?.current_period?.message_count || 0;

  // Get time until reset
  const timeUntilReset = usage?.time_until_reset || "0m";

  // Get subscription plan
  const plan = usage?.subscription_plan || "free";

  // Initial load
  useEffect(() => {
    if (user?.id) {
      fetchUsage();
    }
  }, [user?.id, fetchUsage]);

  // Poll for usage updates every 30 seconds when user is active
  useEffect(() => {
    if (!user?.id) return;

    const interval = setInterval(() => {
      fetchUsage();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [user?.id, fetchUsage]);

  return {
    usage,
    loading,
    error,
    usagePercentage,
    isNearingLimit,
    isLimitExceeded,
    canSendMessage,
    messageCount,
    timeUntilReset,
    plan,
    refetch: fetchUsage,
  };
}
