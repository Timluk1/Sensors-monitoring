import { Link } from "react-router";
import { Thermometer, Droplets, Wind, Volume2, Activity, CloudRain, Sun } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/card";
import { Badge } from "@/shared/components/badge";
import { type Sensor } from "../types/sensors.types";

const sensorIcons = {
    temperature: Thermometer,
    humidity: Droplets,
    air_quality: Wind,
    noise: Volume2,
    movement: Activity,
    co2: CloudRain,
    solar_radiation: Sun,
};

const sensorLabels = {
    temperature: "Temperature",
    humidity: "Humidity",
    air_quality: "Air Quality",
    noise: "Noise",
    movement: "Movement",
    co2: "CO₂",
    solar_radiation: "Solar Radiation",
};

const getUnitByType = (type: Sensor['type']): string => {
    const units = {
        temperature: "°C",
        humidity: "%",
        air_quality: "AQI",
        noise: "dB",
        movement: "",
        co2: "ppm",
        solar_radiation: "W/m²",
    };
    return units[type] || "";
};

export const SensorsListItem: React.FC<Sensor> = ({ id, name, type, status, currentValue, location, description }) => {
    const Icon = sensorIcons[type];
    const unit = getUnitByType(type);
    const isOnline = status === "online";
    const sensorLabel = sensorLabels[type];

    return (
        <Link to={`history/${id}`}>
            <Card className="hover:shadow-foreground active:shadow-foreground transition-shadow">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isOnline ? 'bg-primary/10' : 'bg-muted'}`}>
                                <Icon className={`h-5 w-5 ${isOnline ? 'text-primary' : 'text-muted-foreground'}`} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <CardTitle className="text-lg">{name}</CardTitle>
                                <CardDescription className="text-xs">{sensorLabel}</CardDescription>
                            </div>
                        </div>
                        <Badge variant={isOnline ? "default" : "secondary"}>
                            {isOnline ? "Online" : "Offline"}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold tabular-nums">
                                {currentValue !== undefined ? currentValue : "—"}
                            </span>
                            {unit && <span className="text-2xl font-medium text-muted-foreground">{unit}</span>}
                        </div>

                        <div className="flex flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <span className="font-medium">Location:</span>
                                <span>{location}</span>
                            </div>
                            {description && (
                                <div className="text-muted-foreground">
                                    {description}
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
