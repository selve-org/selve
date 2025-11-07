import { motion } from "framer-motion";

interface ProfileHeaderProps {
  pattern?: string;
  description?: string;
}

export function ProfileHeader({ pattern, description }: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-16 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-pink-500/10 rounded-3xl blur-3xl" />

      <div className="relative text-center p-8 rounded-3xl border border-purple-200/50 dark:border-purple-800/50 bg-white/50 dark:bg-[#1c1c1c]/50 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/50"
        >
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold pb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
          {pattern || "Your Personality Profile"}
        </h1>

        {description && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {description}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
