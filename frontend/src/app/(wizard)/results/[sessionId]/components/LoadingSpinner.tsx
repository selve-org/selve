export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1c1c1c] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-300 dark:border-[#2e2e2e] border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 dark:text-[#999999]">
          Loading your results...
        </p>
      </div>
    </div>
  );
}
