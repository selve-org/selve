import { motion } from "framer-motion";
import { FormattedText } from "./FormattedText";

interface NarrativeSectionProps {
  title: string;
  emoji: string;
  content: string;
  gradient: {
    from: string;
    to: string;
  };
  border: string;
  delay?: number;
  fullWidth?: boolean;
}

export function NarrativeSection({
  title,
  emoji,
  content,
  gradient,
  border,
  delay = 0,
  fullWidth = true,
}: NarrativeSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`relative group ${fullWidth ? "mb-12" : "h-full"}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient.from} ${gradient.to} rounded-2xl blur-xl group-hover:blur-2xl transition-all`}
      />
      <div
        className={`relative ${fullWidth ? "h-full" : ""} p-8 ${fullWidth ? "md:p-12" : ""} bg-white/80 dark:bg-[#2e2e2e]/80 backdrop-blur-sm ${fullWidth ? "rounded-3xl" : "rounded-2xl"} border ${border} shadow-xl hover:shadow-2xl transition-all`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient.from} ${gradient.to} flex items-center justify-center text-2xl shadow-lg`}
          >
            {emoji}
          </div>
          <h2
            className={`${fullWidth ? "text-3xl md:text-4xl" : "text-2xl"} font-bold text-gray-900 dark:text-white`}
          >
            {title}
          </h2>
        </div>
        <FormattedText text={content} />
      </div>
    </motion.div>
  );
}
