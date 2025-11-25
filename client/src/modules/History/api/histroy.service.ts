import { axiosBase } from "@/shared/config/axios";
import type { HistoryRecord, SensorType } from "../types/history.types";

export const historyService = {
    async getAll(params: {
        sensorId: string;
        interval?: "1h" | "24h" | "7d" | "30d";
        page?: number;
        limit?: number;
    }): Promise<{
        items: HistoryRecord[];
        total: number;
        page: number;
        sensorType: SensorType;
    }> {
        const response = await axiosBase.get("/history", { params });
        return response.data;
    },
};
