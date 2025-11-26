"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Share2, Link2, Check, X, Lock, MessageCircle, Sparkles } from "lucide-react";
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
import { FriendInsights } from "@/components/FriendInsights";
import { Header } from "@/components/header/Header";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded: userLoaded } = useUser();
  const sessionId = params.sessionId as string;

  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [shareId, setShareId] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);

  useEffect(() => {
    async function fetchResults() {
      try {
        // First check access
        const accessResponse = await fetch(
          `${API_BASE}/api/assessment/${sessionId}/results/check-access?clerk_user_id=${user?.id || ''}`
        );
        
        if (accessResponse.ok) {
          const accessData = await accessResponse.json();
          setIsOwner(accessData.isOwner);
          setIsPublic(accessData.isPublic);
          setShareId(accessData.publicShareId);
          
          if (!accessData.hasAccess) {
            // Redirect unauthorized users to homepage
            console.log('🔒 Access denied to results - redirecting to homepage', {
              sessionId,
              isOwner: accessData.isOwner,
              isPublic: accessData.isPublic,
              userId: user?.id || 'anonymous'
            });
            router.replace('/');
            return;
          }
        }

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

    if (sessionId && userLoaded) {
      fetchResults();
    }
  }, [sessionId, userLoaded, user?.id]);

  const handleShare = async () => {
    if (!user?.id) return;
    setShareLoading(true);
    
    try {
      const response = await fetch(
        `${API_BASE}/api/assessment/${sessionId}/share?clerk_user_id=${user.id}`,
        { method: 'POST' }
      );
      
      if (response.ok) {
        const data = await response.json();
        setShareId(data.shareId);
        setIsPublic(true);
        
        // Copy to clipboard
        const shareUrl = `${window.location.origin}/share/${data.shareId}`;
        await navigator.clipboard.writeText(shareUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch (error) {
      console.error('Failed to create share link:', error);
    } finally {
      setShareLoading(false);
    }
  };

  const handleCopyLink = async () => {
    if (!shareId) return;
    const shareUrl = `${window.location.origin}/share/${shareId}`;
    await navigator.clipboard.writeText(shareUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleToggleShare = async (enable: boolean) => {
    if (!user?.id) return;
    setShareLoading(true);
    
    try {
      const response = await fetch(
        `${API_BASE}/api/assessment/${sessionId}/share/toggle?clerk_user_id=${user.id}&enable=${enable}`,
        { method: 'POST' }
      );
      
      if (response.ok) {
        const data = await response.json();
        setIsPublic(data.isPublic);
        setShareId(data.shareId);
      }
    } catch (error) {
      console.error('Failed to toggle sharing:', error);
    } finally {
      setShareLoading(false);
      setShowShareMenu(false);
    }
  };

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
      {/* Header with nav links and profile */}
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16 pt-24">
        {/* Share Button - Only for owners */}
        {isOwner && (
          <div className="flex justify-end mb-6 relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-[#333] transition-colors shadow-sm cursor-pointer"
              aria-label="Share results"
              aria-expanded={showShareMenu}
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm font-medium">Share</span>
              {isPublic && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
                  Public
                </span>
              )}
            </button>
            
            {/* Share Menu Dropdown */}
            {showShareMenu && (
              <div className="absolute right-0 top-12 w-72 bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Share your results</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Anyone with the link can view your personality profile
                  </p>
                </div>
                
                <div className="p-4 space-y-3">
                  {isPublic && shareId ? (
                    <>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg">
                        <Link2 className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-400 truncate flex-1">
                          {window.location.origin}/share/{shareId}
                        </span>
                      </div>
                      
                      <button
                        onClick={handleCopyLink}
                        disabled={shareLoading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:cursor-not-allowed"
                      >
                        {copySuccess ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Link2 className="w-4 h-4" />
                            Copy Link
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleToggleShare(false)}
                        disabled={shareLoading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:cursor-not-allowed"
                      >
                        <Lock className="w-4 h-4" />
                        Make Private
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleShare}
                      disabled={shareLoading}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {shareLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                      Create Shareable Link
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

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

        {/* Friend Insights - Show before dimension scores */}
        <FriendInsights sessionId={sessionId} selfScores={scores} />

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
            className="px-6 py-3 bg-gray-200 dark:bg-[#2e2e2e] hover:bg-gray-300 dark:hover:bg-[#3e3e3e] text-gray-900 dark:text-white rounded-full transition-colors cursor-pointer"
          >
            Download PDF
          </button>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors cursor-pointer"
          >
            Return Home
          </button>
        </div>

        {/* Coming Soon: AI Chat Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-20 mb-8"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800/50 p-8 text-center">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/50 to-transparent dark:from-purple-600/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/50 to-transparent dark:from-indigo-600/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative">
              {/* Icon and Coming Soon Badge */}
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/25 mb-3">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 dark:bg-purple-800/40 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                  <Sparkles className="w-3 h-3" />
                  Coming Soon
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Explore Yourself Deeper
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto leading-relaxed">
                Chat with your personal AI guide to dive deeper into your personality. 
                Share your thoughts, explore patterns, and get to know yourself even better 
                through meaningful conversation.
              </p>
              
              {/* Teaser features */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#2a2a2a] rounded-full text-sm text-gray-600 dark:text-gray-300 shadow-sm">
                  💬 Personal insights
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#2a2a2a] rounded-full text-sm text-gray-600 dark:text-gray-300 shadow-sm">
                  🎯 Growth guidance
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#2a2a2a] rounded-full text-sm text-gray-600 dark:text-gray-300 shadow-sm">
                  🔮 Pattern exploration
                </span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
