import { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardAction,
    CardContent,
} from "@/shared/components/card";
import { AreaChartWidget } from "@/widgets/Chart/AreaChartWidget";
import { IntervalToggle } from "./IntervalToggle";
import { IntervalSelect } from "./IntervalSelect";
import { historyService } from "../api/histroy.service";
import {
    type HistoryInterval,
    type HistoryRecord,
} from "../types/history.types";
import type { Sensor } from "@/modules/Sensors/types/sensors.types";
import {
    getSensorTypeName,
    getTextByInterval,
    formatDateByInterval,
} from "../utils/formatters";
import { Spinner } from "@/shared/components/spinner";
import { FetchErrorAlert } from "@/widgets/FetchErrorAlert/FetchErrorAlert";

interface HistoryChartProps {
    sensorId: string;
    sensor: Sensor | null;
}

const INTERVAL_OPTIONS = [
    { value: "30d" as HistoryInterval, label: "Last 30 days" },
    { value: "7d" as HistoryInterval, label: "Last 7 days" },
    { value: "24h" as HistoryInterval, label: "Last 24 hours" },
    { value: "1h" as HistoryInterval, label: "Last 1 hour" },
];

export const HistoryChart: React.FC<HistoryChartProps> = ({
    sensorId,
    sensor,
}) => {
    const [interval, setInterval] = useState<HistoryInterval>("30d");
    const [data, setData] = useState<HistoryRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const getData = async () => {
            if (!sensorId) return;

            try {
                setLoading(true);
                setError(false);
                const response = await historyService.getAll({
                    sensorId,
                    interval,
                });
                setData(response.items);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [sensorId, interval]);

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>
                    {sensor
                        ? `${sensor.name} - ${getSensorTypeName(sensor.type)} Statistics`
                        : "Loading..."}
                </CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        Total for {getTextByInterval(interval)}
                    </span>
                    <span className="@[540px]/card:hidden">
                        {getTextByInterval(interval)}
                    </span>
                </CardDescription>
                <CardAction>
                    <IntervalToggle
                        value={interval}
                        options={INTERVAL_OPTIONS}
                        onValueChange={setInterval}
                    />
                    <IntervalSelect
                        value={interval}
                        options={INTERVAL_OPTIONS}
                        onValueChange={setInterval}
                    />
                </CardAction>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                {loading && (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <Spinner />
                    </div>
                )}
                {error && (
                    <FetchErrorAlert
                        title="Unable to fetch history data."
                        description="Please try again later."
                    />
                )}
                {!loading && !error && (
                    <AreaChartWidget
                        data={data}
                        dataKey="value"
                        xAxisKey="date"
                        tickFormatter={(value) =>
                            formatDateByInterval(value, interval)
                        }
                        labelFormatter={(value) =>
                            formatDateByInterval(value, interval)
                        }
                    />
                )}
            </CardContent>
        </Card>
    );
};
