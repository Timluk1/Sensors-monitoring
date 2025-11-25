import { SensorsListItem } from "./SensorsListItem";
import { SensorsListSkeleton } from "./Skeletons/SensorsListSkeleton";
import { FetchErrorAlert } from "@/widgets/FetchErrorAlert/FetchErrorAlert";
import { PaginationWidget } from "@/widgets/Pagination/PaginationWidget";
import { useEffect, useState } from "react";
import { sensorsService } from "../api/sensors.service";
import type { Sensor } from "../types/sensors.types";

export const SensorsList = () => {
    const [sensors, setSensors] = useState<Sensor[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const limit = 6;
    const totalPages = Math.ceil(total / limit);

    useEffect(() => {
        const fetchSensors = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await sensorsService.getAll({ page, limit });
                setSensors(data.items);
                setTotal(data.total);
            } catch {
                setError("Failed to fetch sensors.");
            } finally {
                setLoading(false);
            }
        };

        fetchSensors();
    }, [page]);

    return (
        <div>
            {error && (
                <FetchErrorAlert
                    title="Unable to fetch sensors."
                    description="Please try again later."
                />
            )}

            {loading && <SensorsListSkeleton count={limit} />}

            {!loading && !error && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {sensors.map((sensor) => (
                            <SensorsListItem key={sensor.id} {...sensor} />
                        ))}
                    </div>
                    <PaginationWidget
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </>
            )}
        </div>
    );
};
