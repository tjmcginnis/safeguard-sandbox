import { categoryCodeMappings } from "@/app/constants";
import Container from "@/app/ui/container";
import Header from "@/app/ui/header";

type SafetyClassificationProps = {
  violation: 0 | 1 | null;
  categories: string[];
  confidenceScores: Record<string, number>;
  loading?: boolean;
};

export default function SafetyClassification({
  violation,
  categories,
  confidenceScores,
  loading = false,
}: SafetyClassificationProps) {
  // Empty state - no evaluation run yet
  if (violation === null && !loading) {
    return (
      <Container className="order-1">
        <Header>Model Classification</Header>
        <div className="p-2 sm:px-3 text-sm text-gray-500 dark:text-gray-400">
          Submit content to see classification results
        </div>
      </Container>
    );
  }

  // Loading state
  if (loading) {
    return (
      <Container className="order-1">
        <Header>Model Classification</Header>
        <div className="p-2 sm:px-3 space-y-3">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  const isViolation = violation === 1;
  const hasCategories = categories.length > 0;

  return (
    <Container className="order-1">
      <Header>Model Classification</Header>
      <div className="p-2 sm:px-3 space-y-3">
        {/* Overall violation status badge */}
        <div>
          <span
            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
              isViolation
                ? "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/30"
                : "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/30"
            }`}
          >
            {isViolation ? "Violation Detected" : "Safe"}
          </span>
        </div>

        {/* Category list with confidence scores */}
        {hasCategories && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Triggered Categories:
            </p>
            {categories.map((code) => {
              const score = confidenceScores[code] || 0;
              const percentage = Math.round(score * 100);
              const categoryName =
                categoryCodeMappings[code] || `Unknown (${code})`;

              return (
                <div key={code} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {code}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {percentage}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {categoryName}
                  </div>
                  {/* Confidence bar */}
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 dark:bg-red-600 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Container>
  );
}
