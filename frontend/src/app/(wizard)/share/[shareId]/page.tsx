"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Dimension details for display
const DIMENSION_NAMES: Record<string, string> = {
  LUMEN: "Mindful Curiosity",
  AETHER: "Rational Reflection",
  ORPHEUS: "Compassionate Connection",
  ORIN: "Structured Harmony",
  LYRA: "Creative Expression",
  VARA: "Purposeful Commitment",
  CHRONOS: "Adaptive Spontaneity",
  KAEL: "Bold Resilience",
};

const DIMENSION_DETAILS: Record<string, { emoji: string; color: string }> = {
  LUMEN: { emoji: "✨", color: "from-yellow-500 to-amber-500" },
  AETHER: { emoji: "🧠", color: "from-blue-500 to-cyan-500" },
  ORPHEUS: { emoji: "💜", color: "from-purple-500 to-pink-500" },
  ORIN: { emoji: "⚖️", color: "from-emerald-500 to-teal-500" },
  LYRA: { emoji: "🎨", color: "from-rose-500 to-orange-500" },
  VARA: { emoji: "🎯", color: "from-indigo-500 to-violet-500" },
  CHRONOS: { emoji: "⚡", color: "from-orange-500 to-red-500" },
  KAEL: { emoji: "🦁", color: "from-red-500 to-rose-500" },
};

interface SharedResults {
  session_id: string;
  scores: Record<string, number>;
  narrative: {
    profile_pattern?: {
      pattern: string;
      description: string;
    };
    sections?: {
      core_identity?: string;
      motivations?: string;
      strengths?: string;
      conflicts?: string;
      growth_areas?: string;
      relationships?: string;
      work_style?: string;
    };
    archetype?: {
      name: string;
      description: string;
    };
  };
  completed_at: string;
  demographics?: Record<string, unknown>;
  profile_pattern?: string;
  archetype?: string;
  is_shared: boolean;
}

export default function SharedResultsPage() {
  const params = useParams();
  const router = useRouter();
  const shareId = params.shareId as string;

  const [results, setResults] = useState<SharedResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSharedResults() {
      try {
        const response = await fetch(
          `${API_BASE}/api/share/${shareId}/results`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("This shared link is no longer available or has been made private.");
          }
          throw new Error("Failed to fetch shared results");
        }

        const data = await response.json();
        setResults(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to load shared results";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    if (shareId) {
      fetchSharedResults();
    }
  }, [shareId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#1c1c1c]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading shared profile...</p>
        </div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#1c1c1c]">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Link Not Available
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || "This shared profile could not be found."}
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
          >
            <span>Take Your Own Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const { narrative, scores } = results;
  const isIntegratedFormat = narrative.profile_pattern && narrative.sections;

  return (
    <div className="min-h-screen bg-white dark:bg-[#1c1c1c]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Shared Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm">
            <Globe className="w-4 h-4" />
            <span>Shared Personality Profile</span>
          </div>
        </motion.div>

        {/* Profile Header */}
        {isIntegratedFormat && narrative.profile_pattern && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {narrative.profile_pattern.pattern}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {narrative.profile_pattern.description}
            </p>
          </motion.div>
        )}

        {/* Core Identity */}
        {isIntegratedFormat && narrative.sections?.core_identity && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 p-8 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl border border-purple-100 dark:border-purple-800/50"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>🌟</span>
              <span>Core Identity</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {narrative.sections.core_identity}
            </p>
          </motion.div>
        )}

        {/* Key Traits Grid */}
        {isIntegratedFormat && narrative.sections && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {narrative.sections.strengths && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/50"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>💪</span>
                  <span>Strengths</span>
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {narrative.sections.strengths}
                </p>
              </motion.div>
            )}

            {narrative.sections.conflicts && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800/50"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>⚡</span>
                  <span>Internal Dynamics</span>
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {narrative.sections.conflicts}
                </p>
              </motion.div>
            )}
          </div>
        )}

        {/* Dimension Scores */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Dimension Scores
          </h2>
          <div className="space-y-4">
            {Object.entries(scores).map(([dim, score], i) => {
              const details = DIMENSION_DETAILS[dim];
              return (
                <motion.div
                  key={dim}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                >
                  <div className="flex justify-between mb-1.5">
                    <span className="font-medium text-gray-900 dark:text-white flex items-center gap-2 text-sm">
                      {details && <span>{details.emoji}</span>}
                      <span>
                        {dim}{" "}
                        <span className="text-gray-500 dark:text-gray-400">
                          ({DIMENSION_NAMES[dim]})
                        </span>
                      </span>
                    </span>
                    <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">
                      {Math.round(score)}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-[#2e2e2e] rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ delay: 0.6 + i * 0.05, duration: 0.6 }}
                      className={`h-2.5 rounded-full bg-gradient-to-r ${details?.color || 'from-purple-500 to-indigo-500'}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 p-8 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Curious about your own personality?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Take the SELVE assessment and discover your unique psychological profile.
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            <span>Take the Assessment</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
