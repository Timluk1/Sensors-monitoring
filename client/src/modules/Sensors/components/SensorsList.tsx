import { SensorsListItem } from "./SensorsListItem";
import { useEffect, useState } from "react";
import { sensorsService } from "../api/sensors.service";
import type { Sensor } from "../types/sensors.types";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/shared/components/pagination";

export const SensorsList = () => {
    const [sensors, setSensors] = useState<Sensor[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const limit = 6;
    const totalPages = Math.ceil(total / limit);

    useEffect(() => {
        const fetchSensors = async () => {
            setLoading(true);
            const data = await sensorsService.getAll({ page, limit });
            setSensors(data.items);
            setTotal(data.total);
            setLoading(false);
        }

        fetchSensors();
    }, [page])

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {sensors.length > 0 && sensors.map((sensor: Sensor) => (
                    <SensorsListItem
                        key={sensor.id}
                        {...sensor}
                    />
                ))}
            </div>
            {totalPages > 1 && (
                <Pagination className="mt-6">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                            if (
                                pageNum === 1 ||
                                pageNum === totalPages ||
                                (pageNum >= page - 1 && pageNum <= page + 1)
                            ) {
                                return (
                                    <PaginationItem key={pageNum}>
                                        <PaginationLink
                                            onClick={() => setPage(pageNum)}
                                            isActive={page === pageNum}
                                            className="cursor-pointer"
                                        >
                                            {pageNum}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            } else if (
                                pageNum === page - 2 ||
                                pageNum === page + 2
                            ) {
                                return (
                                    <PaginationItem key={pageNum}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            }
                            return null;
                        })}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}