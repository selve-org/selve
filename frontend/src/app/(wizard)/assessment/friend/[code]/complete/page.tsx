// src/app/(wizard)/assessment/friend/[code]/complete/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Heart, Sparkles } from "lucide-react";

/**
 * Friend Assessment Completion Page
 * 
 * Shows success message after friend completes assessment.
 */
export default function FriendCompletePage() {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;

  const [inviterName, setInviterName] = useState<string>("your friend");

  useEffect(() => {
    // Extract inviter name from invite code if possible
    // (In production, you might fetch this from API)
    const storedName = sessionStorage.getItem(`inviter_name_${code}`);
    if (storedName) {
      setInviterName(storedName);
    }
  }, [code]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-12 text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-block mb-6"
        >
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl lg:text-5xl font-bold text-white mb-4"
        >
          Thank You! 🎉
        </motion.h1>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 text-white/70 text-lg mb-8"
        >
          <p>
            Your responses have been recorded and will help {inviterName} gain
            deeper insights into their personality.
          </p>
          <p className="flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-pink-400" />
            Your perspective is valuable and appreciated
          </p>
        </motion.div>

        {/* Privacy Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8"
        >
          <h3 className="text-white font-semibold mb-2">Privacy Note</h3>
          <p className="text-white/60 text-sm">
            Your individual responses will never be shown to {inviterName}.
            Only aggregated insights from all friends will be shared, ensuring
            your honest feedback remains confidential.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <p className="text-white/60">Want to discover your own personality?</p>
          <button
            onClick={() => router.push("/assessment/wizard")}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all"
          >
            Take Your Own Assessment
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
