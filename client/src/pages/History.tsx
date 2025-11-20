import { useParams, useNavigate } from "react-router"
import { useEffect, useState } from "react";
import { historyService } from "@/modules/History/api/histroy.service";
import { sensorsService } from "@/modules/Sensors/api/sensors.service";
import type { Sensor } from "@/modules/Sensors/types/sensors.types";

import { Card, CardHeader, CardDescription, CardTitle, CardAction, CardContent } from "@/shared/components/card";
import { ToggleGroup, ToggleGroupItem } from "@/shared/components/toggle-group";
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "@/shared/components/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/shared/components/chart";
import { Button } from "@/shared/components/button";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { type HistoryInterval, type HistoryRecord } from "@/modules/History/types/history.types";

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    desktop: {
        label: "Desktop",
        color: "var(--primary)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--primary)",
    },
} satisfies ChartConfig

export const History = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [interval, setInterval] = useState<HistoryInterval>("30d");
    const [data, setData] = useState<HistoryRecord[]>([]);
    const [sensor, setSensor] = useState<Sensor | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) navigate('/');
    }, [id, navigate]);

    useEffect(() => {
        const getSensor = async () => {
            if (!id) return;
            try {
                const sensorData = await sensorsService.getAll();
                const foundSensor = sensorData.items.find((s: Sensor) => s.id === id);
                if (foundSensor) setSensor(foundSensor);
            } catch (error) {
                console.error('Failed to fetch sensor data:', error);
            }
        };
        getSensor();
    }, [id]);

    useEffect(() => {
        const getData = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const data = await historyService.getAll({
                    sensorId: id,
                    interval
                });
                setData(data.items);
            } catch {
                setError("Failed to fetch history data.");
            } finally {
                setLoading(false);
            }
        }
        
        getData();
    }, [id, interval]);

    const getSensorTypeName = (type: Sensor['type']) => {
        const names = {
            temperature: "Temperature",
            humidity: "Humidity",
            air_quality: "Air Quality",
            noise: "Noise",
            movement: "Movement",
            co2: "CO₂",
            solar_radiation: "Solar Radiation",
        };
        return names[type] || type;
    };

    const getTextByInterval = (interval: HistoryInterval) => {
        switch (interval) {
            case "1h":
                return "last 1 hour";
            case "24h":
                return "last 24 hours";
            case "7d":
                return "last 7 days";
            case "30d":
                return "last 30 days";
        }
    };

    const getXDateFormatByInterval = (value: string) => {
        const date = new Date(value);
        if (interval === "1h" || interval === "24h") {
            return date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
            });
        } else if (interval === "7d" || interval === "30d") {
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
        }
        return value;
    };

    return (
        <div>
            <Button className="mb-4" onClick={() => navigate(-1)}>
                &larr; Back to Sensors
            </Button>
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle>
                        {sensor ? `${sensor.name} - ${getSensorTypeName(sensor.type)} Statistics` : "Loading..."}
                    </CardTitle>
                    <CardDescription>
                        <span className="hidden @[540px]/card:block">
                            Total for {getTextByInterval(interval)}
                        </span>
                        <span className="@[540px]/card:hidden">{getTextByInterval(interval)}</span>
                    </CardDescription>
                    <CardAction>
                        <ToggleGroup
                            type="single"
                            value={interval}
                            onValueChange={(value) => {
                                if (value) setInterval(value as HistoryInterval);
                            }}
                            variant="outline"
                            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
                        >
                            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
                            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
                            <ToggleGroupItem value="24h">Last 24 hours</ToggleGroupItem>
                            <ToggleGroupItem value="1h">Last 1 hour</ToggleGroupItem>
                        </ToggleGroup>
                        <Select value={interval} onValueChange={(value) => setInterval(value as HistoryInterval)}>
                            <SelectTrigger
                                className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                                size="sm"
                                aria-label="Select a value"
                            >
                                <SelectValue placeholder="Last 30 days" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="30d" className="rounded-lg">
                                    Last 30 days
                                </SelectItem>
                                <SelectItem value="7d" className="rounded-lg">
                                    Last 7 days
                                </SelectItem>
                                <SelectItem value="24h" className="rounded-lg">
                                    Last 24 hours
                                </SelectItem>
                                <SelectItem value="1h" className="rounded-lg">
                                    Last 1 hour
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </CardAction>
                </CardHeader>
                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="fillArea" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="hsl(217, 91%, 60%)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="hsl(217, 91%, 60%)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    return getXDateFormatByInterval(value);
                                }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value) => {
                                            return getXDateFormatByInterval(value);
                                        }}
                                        indicator="dot"
                                    />
                                }
                            />
                            <Area
                                dataKey="value"
                                type="natural"
                                fill="url(#fillArea)"
                                stroke="hsl(217, 91%, 60%)"
                                strokeWidth={2}
                                stackId="a"
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
