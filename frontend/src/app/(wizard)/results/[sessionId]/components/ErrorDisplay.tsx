interface ErrorDisplayProps {
  error: string | null;
  onRetakeAssessment: () => void;
}

export function ErrorDisplay({
  error,
  onRetakeAssessment,
}: ErrorDisplayProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1c1c1c] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <p className="text-red-400 mb-6">{error || "Results not found"}</p>
        <button
          onClick={onRetakeAssessment}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
        >
          Take Assessment
        </button>
      </div>
    </div>
  );
}
