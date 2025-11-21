import { Injectable, NotFoundException } from "@nestjs/common";
import { QueryHistoryDto } from "./dto/query-history.dto";
import { HistoryRecord } from "./entities/history.entity";
import { SensorType } from "../sensors/entities/sensor.entity";

const SENSORS = [
  { id: "sensor_1", type: "temperature" as SensorType },
  { id: "sensor_2", type: "humidity" as SensorType },
  { id: "sensor_3", type: "air_quality" as SensorType },
  { id: "sensor_4", type: "noise" as SensorType },
  { id: "sensor_5", type: "temperature" as SensorType },
  { id: "sensor_6", type: "co2" as SensorType },
  { id: "sensor_7", type: "humidity" as SensorType },
  { id: "sensor_8", type: "solar_radiation" as SensorType },
];

@Injectable()
export class HistoryService {
  findAll(query: QueryHistoryDto): {
    items: HistoryRecord[];
    total: number;
    page: number;
    sensorType: SensorType;
  } {
    const sensor = SENSORS.find((s) => s.id === query.sensorId);
    if (!sensor) {
      throw new NotFoundException(`Sensor with id ${query.sensorId} not found`);
    }

    const items: HistoryRecord[] = [];
    const now = new Date();
    let steps = 24;
    let stepMs = 60 * 60 * 1000; // 1 hour
    
    // Determine number of points and step based on interval
    switch (query.interval) {
      case "1h":
        steps = 12;
        stepMs = 5 * 60 * 1000; // 5 minutes
        break;
      case "24h":
        steps = 24;
        stepMs = 60 * 60 * 1000; // 1 hour
        break;
      case "7d":
        steps = 7 * 24;
        stepMs = 60 * 60 * 1000; // 1 hour
        break;
      case "30d":
        steps = 30;
        stepMs = 24 * 60 * 60 * 1000; // 1 day
        break;
    }

    // Generate data points
    for (let i = 0; i < steps; i++) {
      const timestamp = new Date(now.getTime() - i * stepMs);

      // Generate values based on sensor type
      let value: number;
      switch (sensor.type) {
        case "temperature":
          value = Math.floor(Math.random() * 10 + 18); // 18-28°C (integers)
          break;
        case "humidity":
          value = Math.floor(Math.random() * 40 + 30); // 30-70% (integers)
          break;
        case "air_quality":
          value = Math.floor(Math.random() * 30 + 10); // 10-40 AQI (integers)
          break;
        case "noise":
          value = Math.floor(Math.random() * 30 + 40); // 40-70 dB (integers)
          break;
        case "co2":
          value = Math.floor(Math.random() * 400 + 600); // 600-1000 ppm (integers)
          break;
        case "solar_radiation":
          value = Math.floor(Math.random() * 600 + 200); // 200-800 W/m² (integers)
          break;
        case "movement":
          value = Math.floor(Math.random() * 2); // 0 or 1 (integers)
          break;
        default:
          value = 0;
      }

      items.push({
        date: timestamp.toISOString(),
        value: value,
      });
    }

    // Sort by time (oldest to newest)
    items.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    // Pagination
    const page = query.page || 1;
    const limit = query.limit || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedItems = items.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      total: items.length,
      page: page,
      sensorType: sensor.type,
    };
  }
}
