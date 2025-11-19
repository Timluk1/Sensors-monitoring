import { Injectable } from "@nestjs/common";
import { QueryHistoryDto } from "./dto/query-history.dto";
import { HistoryRecord } from "./entities/history.entity";

@Injectable()
export class HistoryService {
  findAll(query: QueryHistoryDto): {
      items: HistoryRecord[];
      total: number;
      page: number;
  } {
    const items: HistoryRecord[] = [];
    const now = new Date();
    let steps = 24;
    let stepMs = 60 * 60 * 1000; // 1 hour

    // Определяем количество точек и шаг в зависимости от интервала
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
      
      // Генерируем одно агрегированное значение на временной шаг
      // Например, среднюю температуру всех сенсоров
      const value = Math.random() * 10 + 18; // 18-28°C

      items.push({
        date: timestamp.toISOString(),
        value: parseFloat(value.toFixed(2)),
      });
    }

    // Сортируем по времени (от старых к новым)
    items.sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
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
    };
  }
}
