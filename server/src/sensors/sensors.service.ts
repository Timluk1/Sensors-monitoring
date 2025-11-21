import { Injectable } from "@nestjs/common";
import { Sensor, SensorHistory, SensorLog } from "./entities/sensor.entity";
import { QuerySensorDto } from "./dto/query-sensor.dto";
import { QueryHistoryDto } from "./dto/query-history.dto";

const SENSORS: Sensor[] = [
  {
    id: "sensor_1",
    name: "Living Room Temp",
    type: "temperature",
    status: "online",
    currentValue: 22,
    unit: "°C",
    location: "Living Room",
  },
  {
    id: "sensor_2",
    name: "Living Room Hum",
    type: "humidity",
    status: "online",
    currentValue: 45,
    unit: "%",
    location: "Living Room",
  },
  {
    id: "sensor_3",
    name: "Kitchen Air Quality",
    type: "air_quality",
    status: "offline",
    currentValue: 15,
    unit: "AQI",
    location: "Kitchen",
  },
  {
    id: "sensor_4",
    name: "Outdoor Noise",
    type: "noise",
    status: "online",
    currentValue: 55,
    unit: "dB",
    location: "Backyard",
  },
  {
    id: "sensor_5",
    name: "Bedroom Temp",
    type: "temperature",
    status: "online",
    currentValue: 21,
    unit: "°C",
    location: "Bedroom",
  },
  {
    id: "sensor_6",
    name: "Office CO2",
    type: "co2",
    status: "online",
    currentValue: 800,
    unit: "ppm",
    location: "Office",
  },
  {
    id: "sensor_7",
    name: "Garden Soil Moisture",
    type: "humidity",
    status: "online",
    currentValue: 60,
    unit: "%",
    location: "Garden",
  },
  {
    id: "sensor_8",
    name: "Rooftop Solar Radiation",
    type: "solar_radiation",
    status: "online",
    currentValue: 500,
    unit: "W/m²",
    location: "Rooftop",
  },
];

@Injectable()
export class SensorsService {
  findAll(query: QuerySensorDto): { items: Sensor[]; total: number } {
    let items = SENSORS;

    if (query.type) {
      items = items.filter((s) => s.type === query.type);
    }
    if (query.status) {
      items = items.filter((s) => s.status === query.status);
    }

    const page = query.page || 1;
    const limit = query.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedItems = items.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      total: items.length,
    };
  }

  findOne(id: string): Sensor | undefined {
    return SENSORS.find((sensor) => sensor.id === id);
  }

  findHistory(
    id: string,
    query: QueryHistoryDto,
  ): { sensorId: string; interval: string; data: SensorHistory[] } {
    const data: SensorHistory[] = [];
    const now = new Date();
    let steps = 24;
    if (query.interval === "7d") steps = 7 * 24;
    if (query.interval === "30d") steps = 30 * 24;
    if (query.interval === "1h") steps = 12; // 5 min steps

    for (let i = 0; i < steps; i++) {
      const timestamp = new Date(
        now.getTime() -
          i * (query.step === "5min" ? 5 * 60 * 1000 : 60 * 60 * 1000),
      );
      data.push({
        timestamp: timestamp.toISOString(),
        value: Math.random() * 30 + 10, // Simulate some value
      });
    }

    return {
      sensorId: id,
      interval: query.interval || '24h',
      data: data.reverse(),
    };
  }
}
