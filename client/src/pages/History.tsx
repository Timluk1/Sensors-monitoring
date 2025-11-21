import { useParams, useNavigate } from "react-router"
import { useEffect, useState } from "react";
import { sensorsService } from "@/modules/Sensors/api/sensors.service";
import { HistoryChart } from "@/modules/History/components/HistoryChart";
import type { Sensor } from "@/modules/Sensors/types/sensors.types";
import { Button } from "@/shared/components/button";

export const History = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [sensor, setSensor] = useState<Sensor | null>(null);

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

    return (
        <div>
            <Button className="mb-4" onClick={() => navigate(-1)}>
                Back to Sensors
            </Button>
            {id && <HistoryChart sensorId={id} sensor={sensor} />}
        </div>
    )
}
