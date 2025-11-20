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
  { id: "sensor_7", type: "movement" as SensorType },
  { id: "sensor_8", type: "humidity" as SensorType },
  { id: "sensor_9", type: "solar_radiation" as SensorType },
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
    switch (query.interval) {
      case "1h":
        steps = 12;
        stepMs = 5 * 60 * 1000; // 5 минут
        break;
      case "24h":
        steps = 24;
        stepMs = 60 * 60 * 1000; // 1 час
        break;
      case "7d":
        steps = 7 * 24;
        stepMs = 60 * 60 * 1000; // 1 час
        break;
      case "30d":
        steps = 30;
        stepMs = 24 * 60 * 60 * 1000; // 1 день
        break;
    }

    for (let i = 0; i < steps; i++) {
      const timestamp = new Date(now.getTime() - i * stepMs);

      // Генерируем значения в зависимости от типа сенсора
      let value: number;
      switch (sensor.type) {
        case "temperature":
          value = Math.floor(Math.random() * 10 + 18); // 18-28°C (целые числа)
          break;
        case "humidity":
          value = Math.floor(Math.random() * 40 + 30); // 30-70% (целые числа)
          break;
        case "air_quality":
          value = Math.floor(Math.random() * 30 + 10); // 10-40 AQI (целые числа)
          break;
        case "noise":
          value = Math.floor(Math.random() * 30 + 40); // 40-70 dB (целые числа)
          break;
        case "co2":
          value = Math.floor(Math.random() * 400 + 600); // 600-1000 ppm (целые числа)
          break;
        case "solar_radiation":
          value = Math.floor(Math.random() * 600 + 200); // 200-800 W/m² (целые числа)
          break;
        case "movement":
          value = Math.floor(Math.random() * 2); // 0 или 1 (целые числа)
          break;
        default:
          value = 0;
      }

      items.push({
        date: timestamp.toISOString(),
        value: value,
      });
    }

    // Сортируем по времени (от старых к новым)
    items.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    // Пагинация
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
