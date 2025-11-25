export type SensorType =
    | "temperature"
    | "humidity"
    | "air_quality"
    | "noise"
    | "movement"
    | "co2"
    | "solar_radiation";
export type SensorStatus = "online" | "offline";

export interface Sensor {
    id: string;
    name: string;
    type: SensorType;
    status: SensorStatus;
    currentValue?: number;
    unit?: string;
    location: string;
    description?: string;
}
