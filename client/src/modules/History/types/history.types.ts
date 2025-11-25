export interface HistoryRecord {
    date: string;
    value: number;
}

export type HistoryInterval = "1h" | "24h" | "7d" | "30d";

export type SensorType =
    | "temperature"
    | "humidity"
    | "air_quality"
    | "noise"
    | "movement"
    | "co2"
    | "solar_radiation";
