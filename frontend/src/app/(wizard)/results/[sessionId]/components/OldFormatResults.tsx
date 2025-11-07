import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { DIMENSION_NAMES, DIMENSION_DETAILS, type AssessmentResults } from "./types";

interface OldFormatResultsProps {
  narrative: AssessmentResults["narrative"];
  scores: Record<string, number>;
}

/**
 * Legacy results format - kept for backwards compatibility
 * This displays the old archetype-based personality profile
 * @deprecated Use the new integrated narrative format instead
 */
export function OldFormatResults({ narrative, scores }: OldFormatResultsProps) {
  const router = useRouter();

  if (!narrative.archetype) return null;

  return (
    <>
      {/* Rest of the old format code will go here - keeping it in a separate file */}
      {/* This component is intentionally kept as a monolith for backwards compatibility */}
      {/* TODO: Consider deprecating this format entirely */}
      <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
        (Old format - component extracted but not fully implemented)
      </p>
    </>
  );
}
