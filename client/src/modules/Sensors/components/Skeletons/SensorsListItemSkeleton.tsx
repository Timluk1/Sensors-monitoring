import { Skeleton } from "@/shared/components/skeleton";

export const SensorsListItemSkeleton = () => {
    return (
        <div className="h-[206px]">
            <Skeleton className="h-full w-full rounded-xl" />
        </div>
    );
};
