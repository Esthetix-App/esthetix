import { Skeleton } from "@/components/ui/skeleton";

export const FormFillSkeleton = () => {
  return (
    <div className="mx-auto mt-6 grid w-full max-w-4xl grid-cols-4 gap-6">
      <Skeleton className="col-span-4 h-40 w-full border-dashed" />
      <Skeleton className="col-span-3 h-14 w-full border-dashed" />
      <Skeleton className="col-span-2 h-11 w-full border-dashed" />
      <Skeleton className="col-span-2 h-11 w-full border-dashed" />
      <Skeleton className="col-span-1 h-11 w-full border-dashed" />
      <Skeleton className="col-span-1 h-11 w-full border-dashed" />
      <Skeleton className="col-span-1 h-11 w-full border-dashed" />
      <Skeleton className="col-span-1 h-11 w-full border-dashed" />
      <Skeleton className="col-span-2 h-11 w-full border-dashed" />
    </div>
  );
};
