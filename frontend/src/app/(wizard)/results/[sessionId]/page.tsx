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
  FeedbackWidget,
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

        // Update user profile with demographics and results (for authenticated users only)
        // This saves demographics to User/Profile tables
        if (data.demographics && data.scores && data.narrative) {
          try {
            await fetch('/api/update-profile', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                demographics: data.demographics,
                scores: data.scores,
                narrative: data.narrative,
              }),
            });
            console.log('✅ Profile updated with assessment results');
          } catch (profileError) {
            // Don't fail the whole page if profile update fails
            // User can still see results, just profile won't be updated
            console.error('⚠️ Failed to update profile (non-critical):', profileError);
          }
        }
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

        {/* OLD FORMAT FALLBACK - Extracted to component */}
        {hasOldFormat && !isIntegratedFormat && (
          <OldFormatResults narrative={narrative} scores={scores} />
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

        {/* Feedback Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-16"
        >
          <FeedbackWidget sessionId={sessionId} />
        </motion.div>

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
