export interface HistoryRecord {
  date: string;
  value: number;
}

export type HistoryInterval = "1h" | "24h" | "7d" | "30d";
