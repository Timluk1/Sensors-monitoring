import type { Sensor } from "@/modules/Sensors/types/sensors.types";
import type { HistoryInterval } from "@/modules/History/types/history.types";

export const getSensorTypeName = (type: Sensor['type']): string => {
    const names: Record<Sensor['type'], string> = {
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

export const getTextByInterval = (interval: HistoryInterval): string => {
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

export const formatDateByInterval = (value: string, interval: HistoryInterval): string => {
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
