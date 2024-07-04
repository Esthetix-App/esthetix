import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeleton = () => {
  return (
    <div className="mt-10 grid grid-cols-4 gap-6">
      <Skeleton className="h-36 w-full rounded-lg shadow-sm" />
      <Skeleton className="h-36 w-full rounded-lg shadow-sm" />
      <Skeleton className="h-36 w-full rounded-lg shadow-sm" />
    </div>
  );
};
