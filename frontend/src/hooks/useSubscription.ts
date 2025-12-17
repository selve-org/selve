// src/hooks/useSubscription.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

interface SubscriptionDetails {
  plan: "free" | "pro";
  plan_name: string;
  price: number;
  status: string | null;
  features: string[];
  chatbot_daily_limit: number | null;
  subscription_id: string | null;
  clerk_customer_id: string | null;
  plan_start_date: string | null;
  plan_end_date: string | null;
}

interface SubscriptionPlans {
  free: {
    name: string;
    price: number;
    chatbot_daily_limit: number;
    features: string[];
  };
  pro: {
    name: string;
    price: number;
    chatbot_daily_limit: null;
    features: string[];
  };
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function useSubscription() {
  const { user } = useUser();
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlans | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch subscription details
  const fetchSubscription = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/users/subscription`, {
        headers: {
          "X-User-ID": user.id,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSubscription(data);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Failed to fetch subscription");
      }
    } catch (err) {
      console.error("Failed to fetch subscription:", err);
      setError("Network error while fetching subscription");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Fetch available plans
  const fetchPlans = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/api/users/subscription/plans`);

      if (response.ok) {
        const data = await response.json();
        setPlans(data.plans);
      }
    } catch (err) {
      console.error("Failed to fetch plans:", err);
    }
  }, []);

  // Check if user is on free plan
  const isFree = subscription?.plan === "free";

  // Check if user is on pro plan
  const isPro = subscription?.plan === "pro";

  // Get plan features
  const features = subscription?.features || [];

  // Get daily limit
  const dailyLimit = subscription?.chatbot_daily_limit;

  // Initial load
  useEffect(() => {
    if (user?.id) {
      fetchSubscription();
      fetchPlans();
    }
  }, [user?.id, fetchSubscription, fetchPlans]);

  return {
    subscription,
    plans,
    loading,
    error,
    isFree,
    isPro,
    features,
    dailyLimit,
    refetch: fetchSubscription,
  };
}
