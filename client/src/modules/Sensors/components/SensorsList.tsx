import { SensorsListItem } from "./SensorsListItem";
import { useEffect, useState } from "react";
import { sensorsService } from "../api/sensors.service";
import type { Sensor } from "../types/sensors.types";

export const SensorsList = () => {
    const [sensors, setSensors] = useState<Sensor[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchSensors = async () => {
            setLoading(true);
            const data = await sensorsService.getAll();
            setSensors(data.items);
            setLoading(false);
        }

        fetchSensors();
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sensors.length > 0 && sensors.map((sensor: Sensor) => (
                <SensorsListItem 
                    key={sensor.id}
                    {...sensor}
                />
            ))}
        </div>
    )
}