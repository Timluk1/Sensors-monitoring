import { SensorsListItemSkeleton } from "./SensorsListItemSkeleton"

interface SensorsListSkeletonProps {
    count: number;
}

export const SensorsListSkeleton: React.FC<SensorsListSkeletonProps> = ({ count }) => {
    const skeletons = Array.from({ length: count });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {skeletons.map((_, index) => (
                <SensorsListItemSkeleton key={index} />
            ))}
        </div>
    )
}
