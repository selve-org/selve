// src/components/FriendInsights.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, AlertTriangle, Sparkles, TrendingUp } from "lucide-react";

interface FriendResponse {
  id: string;
  inviteId: string;
  responses: Record<string, number | string>;
  qualityScore: number;
  totalTime: number;
  completedAt: string;
}

interface FriendInsight {
  dimension: string;
  dimensionName: string;
  emoji: string;
  selfScore: number;
  friendScore: number;
  difference: number;
  isBlindSpot: boolean;
}

interface FriendInsightsProps {
  sessionId: string;
  selfScores: Record<string, number>;
}

const DIMENSION_NAMES: Record<string, string> = {
  O: "Openness",
  C: "Conscientiousness", 
  E: "Extraversion",
  A: "Agreeableness",
  N: "Neuroticism",
  H: "Honesty-Humility",
  X: "Emotionality",
  K: "Kael"
};

const DIMENSION_EMOJIS: Record<string, string> = {
  O: "🔮",
  C: "📋",
  E: "🎉",
  A: "🤝",
  N: "🌊",
  H: "✨",
  X: "❤️",
  K: "⚡"
};

export function FriendInsights({ sessionId, selfScores }: FriendInsightsProps) {
  const [friendResponses, setFriendResponses] = useState<FriendResponse[]>([]);
  const [insights, setInsights] = useState<FriendInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFriendData() {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        
        // Fetch friend responses for this session
        const response = await fetch(`${API_BASE}/api/assessment/${sessionId}/friend-insights`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch friend insights");
        }

        const data = await response.json();
        
        if (data.friendResponses && data.friendResponses.length > 0) {
          setFriendResponses(data.friendResponses);
          
          // Calculate insights (self vs friend comparison)
          const friendScores = data.aggregatedScores || {};
          const insightsData: FriendInsight[] = [];
          
          for (const [dim, selfScore] of Object.entries(selfScores)) {
            const friendScore = friendScores[dim] || selfScore;
            const difference = Math.abs(friendScore - selfScore);
            const isBlindSpot = difference >= 15;
            
            insightsData.push({
              dimension: dim,
              dimensionName: DIMENSION_NAMES[dim] || dim,
              emoji: DIMENSION_EMOJIS[dim] || "🔍",
              selfScore: Math.round(selfScore),
              friendScore: Math.round(friendScore),
              difference: Math.round(difference),
              isBlindSpot,
            });
          }
          
          // Sort by difference (blind spots first)
          insightsData.sort((a, b) => b.difference - a.difference);
          setInsights(insightsData);
        }
      } catch (error) {
        console.error("Failed to fetch friend insights:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFriendData();
  }, [sessionId, selfScores]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
      </div>
    );
  }

  if (friendResponses.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-16"
      >
        <div className="text-center p-8 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10 border border-purple-200 dark:border-purple-800/50 rounded-2xl">
          <Users className="w-12 h-12 mx-auto mb-4 text-purple-500" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Friend Insights Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Invite friends to complete your assessment to see how their perception compares to yours!
          </p>
        </div>
      </motion.section>
    );
  }

  const highQualityResponses = friendResponses.filter(r => r.qualityScore >= 70).length;
  const blindSpots = insights.filter(i => i.isBlindSpot);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="mb-16"
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Friend Insights
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          How your friends see you compared to how you see yourself
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800/50 rounded-xl">
          <Users className="w-8 h-8 text-purple-600 mb-2" />
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {friendResponses.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Friend{friendResponses.length !== 1 ? "s" : ""} Responded
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800/50 rounded-xl">
          <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {highQualityResponses}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            High Quality Responses
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl">
          <AlertTriangle className="w-8 h-8 text-amber-600 mb-2" />
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {blindSpots.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Blind Spot{blindSpots.length !== 1 ? "s" : ""} Found
          </div>
        </div>
      </div>

      {/* Blind Spots Section */}
      {blindSpots.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Your Blind Spots
          </h3>
          <div className="space-y-4">
            {blindSpots.map((insight, i) => (
              <motion.div
                key={insight.dimension}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{insight.emoji}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {insight.dimensionName}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Your friends see you {insight.friendScore > insight.selfScore ? "higher" : "lower"} than you see yourself
                    </p>
                    <div className="flex items-center gap-6">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">You</div>
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {insight.selfScore}
                        </div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                          {insight.difference} point difference
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">Friends</div>
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                          {insight.friendScore}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* All Dimensions Comparison */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Self vs Friend Perception
        </h3>
        <div className="space-y-4">
          {insights.map((insight, i) => (
            <motion.div
              key={insight.dimension}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + i * 0.05 }}
              className="p-4 bg-white dark:bg-[#2e2e2e] border border-gray-200 dark:border-gray-700 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-xl">{insight.emoji}</span>
                  {insight.dimensionName}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  Δ {insight.difference} pts
                </span>
              </div>
              
              {/* Comparison Bars */}
              <div className="space-y-2">
                {/* Self Score */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-400">You</span>
                    <span className="font-medium text-purple-600 dark:text-purple-400">
                      {insight.selfScore}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-[#1c1c1c] rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${insight.selfScore}%` }}
                    />
                  </div>
                </div>

                {/* Friend Score */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Friends</span>
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">
                      {insight.friendScore}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-[#1c1c1c] rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full"
                      style={{ width: `${insight.friendScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
