import type { HistoryRecord } from "@/modules/History/types/history.types";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/shared/components/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

interface AreaChartWidgetProps<T extends HistoryRecord> {
    data: T[];
    dataKey: string;
    xAxisKey: string;
    tickFormatter?: (value: string) => string;
    labelFormatter?: (value: string) => string;
    color?: string;
    gradientId?: string;
    className?: string;
}

const defaultChartConfig = {
    value: {
        label: "Value",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

export function AreaChartWidget<T extends HistoryRecord>({
    data,
    dataKey,
    xAxisKey,
    tickFormatter,
    labelFormatter,
    color = "hsl(217, 91%, 60%)",
    gradientId = "fillArea",
    className = "aspect-auto h-[250px] w-full",
}: AreaChartWidgetProps<T>) {
    return (
        <ChartContainer config={defaultChartConfig} className={className}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey={xAxisKey as string}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={tickFormatter}
                />
                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            labelFormatter={labelFormatter}
                            indicator="dot"
                        />
                    }
                />
                <Area
                    dataKey={dataKey as string}
                    type="natural"
                    fill={`url(#${gradientId})`}
                    stroke={color}
                    strokeWidth={2}
                    stackId="a"
                />
            </AreaChart>
        </ChartContainer>
    );
}
