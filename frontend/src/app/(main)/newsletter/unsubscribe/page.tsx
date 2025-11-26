// src/app/(main)/newsletter/unsubscribe/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { MailX, CheckCircle, Loader2, ArrowLeft, Heart } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  
  const [isLoading, setIsLoading] = useState(false);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [inputEmail, setInputEmail] = useState(email);

  // Auto-unsubscribe if email is in URL
  useEffect(() => {
    if (email && !isUnsubscribed) {
      handleUnsubscribe(email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const handleUnsubscribe = async (emailToUnsubscribe: string) => {
    if (!emailToUnsubscribe || !emailToUnsubscribe.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_BASE}/api/newsletter/unsubscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailToUnsubscribe }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || "Unsubscribe failed");
      }
      
      setIsUnsubscribed(true);
      toast.success("You've been unsubscribed", {
        description: data.message,
      });
    } catch (error) {
      toast.error("Something went wrong", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleUnsubscribe(inputEmail);
  };

  return (
    <main className="bg-background text-foreground font-sans min-h-screen py-16 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <Link 
          href="/newsletter"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Newsletter
        </Link>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-6">
            <MailX className="w-8 h-8 text-neutral-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Unsubscribe
          </h1>
        </div>

        {isLoading ? (
          <div className="text-center p-8">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
            <p className="text-muted-foreground mt-4">Processing...</p>
          </div>
        ) : isUnsubscribed ? (
          <div className="text-center p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              You've been unsubscribed
            </h2>
            <p className="text-muted-foreground mb-6">
              We're sorry to see you go. You won't receive any more newsletter emails from us.
            </p>
            
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <p className="text-sm text-muted-foreground mb-4">
                Changed your mind?
              </p>
              <Link 
                href="/newsletter"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
              >
                <Heart className="w-4 h-4" />
                Resubscribe
              </Link>
            </div>
          </div>
        ) : !email ? (
          // Manual unsubscribe form
          <div className="mt-8">
            <p className="text-muted-foreground text-center mb-6">
              Enter your email address to unsubscribe from our newsletter.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-foreground font-medium transition-all"
              >
                Unsubscribe
              </button>
            </form>
            
            <p className="text-center text-sm text-muted-foreground mt-6">
              <Link href="/newsletter" className="text-purple-600 hover:underline">
                Actually, I want to subscribe
              </Link>
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  );
}
