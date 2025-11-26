// src/app/(main)/newsletter/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Mail, Sparkles, Brain, Heart, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Format subscriber count for display
// Returns "others" if count is 0 or undefined
// Returns "X,XXX+" rounded down to nearest 500 if count >= 2500
function formatSubscriberCount(count: number | undefined): string {
  if (!count || count < 2500) {
    return "others";
  }
  
  // Round down to nearest 500
  const rounded = Math.floor(count / 500) * 500;
  return `${rounded.toLocaleString()}+`;
}

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState<number | undefined>(undefined);

  // Fetch subscriber count on mount
  useEffect(() => {
    const fetchSubscriberCount = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await fetch(`${API_BASE}/api/stats/subscribers`);
        if (response.ok) {
          const data = await response.json();
          setSubscriberCount(data.count);
        }
      } catch {
        // Silently fail - we'll just show "others"
      }
    };

    fetchSubscriberCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_BASE}/api/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source: "website" }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || "Subscription failed");
      }
      
      setIsSubscribed(true);
      
      // Customize message based on status
      if (data.status === "already_subscribed") {
        toast.info("Already subscribed!", {
          description: data.message,
        });
      } else if (data.status === "resubscribed") {
        toast.success("Welcome back!", {
          description: data.message,
        });
      } else {
        toast.success("Welcome to the SELVE community!", {
          description: "Check your inbox for a confirmation email.",
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      title: "Mental Models",
      description: "Learn frameworks for better decision-making and self-understanding.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      title: "Self-Awareness Tips",
      description: "Practical strategies to deepen your understanding of who you are.",
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      title: "Relationship Insights",
      description: "How your personality shapes your connections with others.",
    },
  ];

  return (
    <main className="bg-background text-foreground font-sans min-h-screen py-16 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-6">
            <Mail className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Stay in the{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Know
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get actionable insights, mental models, and self-awareness strategies 
            delivered twice a month.
          </p>
        </div>

        {/* Subscription Form */}
        <div className="max-w-md mx-auto mb-16">
          {isSubscribed ? (
            <div className="text-center p-8 rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                You're in!
              </h2>
              <p className="text-muted-foreground">
                Check your inbox for a confirmation email. We're excited to have you on this journey of self-discovery.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  disabled={isLoading}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Subscribe
                  </>
                )}
              </button>
              <p className="text-center text-sm text-muted-foreground">
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            What you'll get
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            Join{" "}
            <span className="font-semibold text-foreground">
              {formatSubscriberCount(subscriberCount)}
            </span>{" "}
            on their journey to self-discovery
          </p>
        </div>
      </div>
    </main>
  );
}
