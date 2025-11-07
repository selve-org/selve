"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  FormattedText,
  LoadingSpinner,
  ErrorDisplay,
  NarrativeSection,
  ProfileHeader,
  CoreIdentitySection,
  OldFormatResults,
  DIMENSION_NAMES, 
  DIMENSION_DETAILS,
  type AssessmentResults 
} from "./components";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;

  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await fetch(
          `${API_BASE}/api/assessment/${sessionId}/results`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }

        const data = await response.json();
        setResults(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to load results";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    if (sessionId) {
      fetchResults();
    }
  }, [sessionId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !results) {
    return (
      <ErrorDisplay
        error={error}
        onRetakeAssessment={() => router.push("/assessment/wizard")}
      />
    );
  }

  const { narrative, scores } = results;

  // Check if we have the new integrated format
  const isIntegratedFormat = narrative.profile_pattern && narrative.sections;
  const hasOldFormat = narrative.archetype && narrative.dimensions;

  return (
    <div className="min-h-screen bg-white dark:bg-[#1c1c1c]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Metadata banner removed - users don't need to see technical details */}

        {/* NEW INTEGRATED FORMAT */}
        {isIntegratedFormat && (
          <>
            {/* Header with Hero Design */}
            <ProfileHeader
              pattern={narrative.profile_pattern?.pattern}
              description={narrative.profile_pattern?.description}
            />

            {/* Core Identity - Hero Card */}
            {narrative.sections.core_identity && (
              <CoreIdentitySection
                content={narrative.sections.core_identity}
              />
            )}

            {/* Motivations */}
            {narrative.sections.motivations && (
              <NarrativeSection
                title="Core Motivations"
                emoji="🎯"
                content={narrative.sections.motivations}
                gradient={{ from: "from-blue-500/20", to: "to-cyan-500/20" }}
                border="border-blue-200 dark:border-blue-900/50"
                delay={0.3}
                fullWidth={true}
              />
            )}

            {/* Two Column Layout: Strengths & Conflicts */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {narrative.sections.strengths && (
                <NarrativeSection
                  title="Your Strengths"
                  emoji="💪"
                  content={narrative.sections.strengths}
                  gradient={{
                    from: "from-green-500/20",
                    to: "to-emerald-500/20",
                  }}
                  border="border-green-200 dark:border-green-900/50"
                  delay={0.4}
                  fullWidth={false}
                />
              )}

              {narrative.sections.conflicts && (
                <NarrativeSection
                  title="Internal Conflicts"
                  emoji="⚡"
                  content={narrative.sections.conflicts}
                  gradient={{
                    from: "from-amber-500/20",
                    to: "to-orange-500/20",
                  }}
                  border="border-amber-200 dark:border-amber-900/50"
                  delay={0.4}
                  fullWidth={false}
                />
              )}
            </div>

            {/* Growth Areas */}
            {narrative.sections.growth_areas && (
              <NarrativeSection
                title="Growth Areas"
                emoji="📈"
                content={narrative.sections.growth_areas}
                gradient={{ from: "from-orange-500/20", to: "to-red-500/20" }}
                border="border-orange-200 dark:border-orange-900/50"
                delay={0.5}
                fullWidth={true}
              />
            )}

            {/* Two Column Layout: Relationships & Work Style */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {narrative.sections.relationships && (
                <NarrativeSection
                  title="In Relationships"
                  emoji="💝"
                  content={narrative.sections.relationships}
                  gradient={{ from: "from-rose-500/20", to: "to-pink-500/20" }}
                  border="border-rose-200 dark:border-rose-900/50"
                  delay={0.6}
                  fullWidth={false}
                />
              )}

              {narrative.sections.work_style && (
                <NarrativeSection
                  title="Work Style"
                  emoji="💼"
                  content={narrative.sections.work_style}
                  gradient={{
                    from: "from-indigo-500/20",
                    to: "to-purple-500/20",
                  }}
                  border="border-indigo-200 dark:border-indigo-900/50"
                  delay={0.6}
                  fullWidth={false}
                />
              )}
            </div>
          </>
        )}

        {/* OLD FORMAT FALLBACK - Keep existing rendering */}
        {hasOldFormat && !isIntegratedFormat && (
          <>
            {/* Archetype Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-24 h-24 rounded-full bg-purple-600/20 border-4 border-purple-600 flex items-center justify-center mx-auto mb-6"
                >
                  <svg
                    className="w-12 h-12 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {narrative.archetype?.name}
                </h1>
                <p className="text-xl text-purple-600 dark:text-purple-400 mb-8">
                  {narrative.archetype?.essence}
                </p>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  {narrative.archetype?.description}
                </p>
              </div>

              {/* Core Traits */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3">
                {narrative.archetype?.core_traits.map((trait, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="px-4 py-2 bg-purple-100 dark:bg-purple-900/20 rounded-full text-center text-sm font-medium text-purple-700 dark:text-purple-300"
                  >
                    {trait}
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Your Core Dimensions - Etymology Introduction */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Your Core Dimensions
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Your personality is composed of eight ancient dimensions. Here
                are your three strongest forces:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {narrative.top_dimensions?.slice(0, 3).map((topDim, i) => {
                  const details = DIMENSION_DETAILS[topDim.name];
                  if (!details) return null;

                  return (
                    <motion.div
                      key={topDim.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 rounded-xl border-2 border-purple-200 dark:border-purple-800"
                    >
                      <div className="text-4xl mb-3 text-center">
                        {details.emoji}
                      </div>
                      <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1 text-center">
                        {topDim.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">
                        {DIMENSION_NAMES[topDim.name]}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Origin:
                          </span>{" "}
                          <span className="text-gray-700 dark:text-gray-300">
                            {details.origin}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Meaning:
                          </span>{" "}
                          <span className="text-gray-700 dark:text-gray-300">
                            {details.meaning}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            Essence:
                          </span>{" "}
                          <span className="italic text-gray-700 dark:text-gray-300">
                            {details.essence}
                          </span>
                        </div>
                        <div className="pt-2 mt-2 border-t border-purple-200 dark:border-purple-800">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-purple-600 dark:text-purple-400">
                              Your Score
                            </span>
                            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                              {Math.round(topDim.score)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* Life Purpose */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-16 p-8 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 rounded-2xl"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Your Life Purpose
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {narrative.archetype?.life_purpose}
              </p>
            </motion.section>

            {/* Dimension Scores */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                All Eight Dimensions
              </h2>
              <div className="space-y-6">
                {Object.entries(scores).map(([dim, score], i) => {
                  const details = DIMENSION_DETAILS[dim];
                  return (
                    <motion.div
                      key={dim}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.05 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                          {details && (
                            <span className="text-xl">{details.emoji}</span>
                          )}
                          <span>
                            {dim}{" "}
                            {details && (
                              <span className="text-gray-500 dark:text-gray-400 text-sm">
                                ({DIMENSION_NAMES[dim]})
                              </span>
                            )}
                          </span>
                        </span>
                        <span className="text-purple-600 dark:text-purple-400 font-bold">
                          {Math.round(score)}/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-[#2e2e2e] rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ delay: 0.7 + i * 0.05, duration: 0.6 }}
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* Detailed Dimension Narratives */}
            {narrative.dimensions?.map((dim, index) => (
              <motion.section
                key={dim.dimension}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="mb-16 p-8 bg-gray-50 dark:bg-[#2e2e2e] rounded-2xl"
              >
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {dim.title}
                  </h2>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">
                    {DIMENSION_NAMES[dim.dimension]} - {Math.round(dim.score)}
                    /100
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Core Nature
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {dim.core_nature}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      What Drives You
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      {dim.motivations.map((m, i) => (
                        <li
                          key={i}
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      What You Fear
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      {dim.fears.map((f, i) => (
                        <li
                          key={i}
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Your Strengths
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      {dim.strengths.map((s, i) => (
                        <li
                          key={i}
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Growth Path
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                      {dim.growth_path}
                    </p>
                  </div>
                </div>
              </motion.section>
            ))}

            {/* Strengths & Challenges */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="p-6 bg-green-50 dark:bg-green-900/10 rounded-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Your Strengths
                </h2>
                <ul className="space-y-3">
                  {narrative.archetype?.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className="w-6 h-6 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">
                        {strength}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                className="p-6 bg-orange-50 dark:bg-orange-900/10 rounded-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Growth Areas
                </h2>
                <ul className="space-y-3">
                  {narrative.archetype?.challenges.map((challenge, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className="w-6 h-6 text-orange-600 dark:text-orange-400 mr-2 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">
                        {challenge}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            </div>

            {/* Career Paths */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Career Paths That Fit You
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {narrative.archetype?.career_paths.map((career, i) => (
                  <div
                    key={i}
                    className="p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-lg text-center text-gray-900 dark:text-white font-medium"
                  >
                    {career}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Final Wisdom */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="p-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl text-white"
            >
              <h2 className="text-2xl font-bold mb-4">Your Growth Direction</h2>
              <p className="text-lg leading-relaxed opacity-95">
                {narrative.archetype?.growth_direction}
              </p>
            </motion.section>

            {/* Actions */}
            <div className="mt-12 flex justify-center gap-4">
              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-gray-200 dark:bg-[#2e2e2e] hover:bg-gray-300 dark:hover:bg-[#3e3e3e] text-gray-900 dark:text-white rounded-full transition-colors"
              >
                Download PDF
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
              >
                Return Home
              </button>
            </div>
          </>
        )}

        {/* Dimension Scores - Show for both formats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16 mt-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Your Dimension Scores
          </h2>
          <div className="space-y-6">
            {Object.entries(scores).map(([dim, score], i) => {
              const details = DIMENSION_DETAILS[dim];
              return (
                <motion.div
                  key={dim}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      {details && (
                        <span className="text-xl">{details.emoji}</span>
                      )}
                      <span>
                        {dim}{" "}
                        {details && (
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            ({DIMENSION_NAMES[dim]})
                          </span>
                        )}
                      </span>
                    </span>
                    <span className="text-purple-600 dark:text-purple-400 font-bold">
                      {Math.round(score)}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-[#2e2e2e] rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ delay: 0.9 + i * 0.05, duration: 0.6 }}
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Actions - Common for all formats */}
        <div className="mt-12 flex justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-gray-200 dark:bg-[#2e2e2e] hover:bg-gray-300 dark:hover:bg-[#3e3e3e] text-gray-900 dark:text-white rounded-full transition-colors"
          >
            Download PDF
          </button>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
