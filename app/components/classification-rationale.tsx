import Container from "@/app/ui/container";
import Header from "@/app/ui/header";

type ClassificationRationaleProps = {
  rationale: string | null;
  loading?: boolean;
};

export default function ClassificationRationale({
  rationale,
  loading = false,
}: ClassificationRationaleProps) {
  // Empty state - no evaluation run yet
  if (!rationale && !loading) {
    return (
      <Container className="mt-4 grow order-2">
        <Header>Classification Rationale</Header>
        <div className="p-2 sm:px-3 text-sm text-gray-500 dark:text-gray-400">
          The model&apos;s reasoning will appear here
        </div>
      </Container>
    );
  }

  // Loading state
  if (loading) {
    return (
      <Container className="mt-4 grow order-2">
        <Header>Classification Rationale</Header>
        <div className="p-2 sm:px-3">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4 grow order-2">
      <Header>Classification Rationale</Header>
      <div className="p-2 sm:px-3 text-sm overflow-auto text-gray-900 dark:text-gray-100">
        {rationale}
      </div>
    </Container>
  );
}
