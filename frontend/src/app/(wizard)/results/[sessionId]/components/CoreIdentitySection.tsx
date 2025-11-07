import { motion } from "framer-motion";
import { FormattedText } from "./FormattedText";

interface CoreIdentitySectionProps {
  content: string;
}

export function CoreIdentitySection({ content }: CoreIdentitySectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-12"
    >
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-purple-900/20 dark:via-[#1c1c1c] dark:to-indigo-900/20 p-8 md:p-12 shadow-xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-12 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full" />
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Core Identity
            </h2>
          </div>
          <FormattedText text={content} />
        </div>
      </div>
    </motion.section>
  );
}
