import { axiosBase } from "@/shared/config/axios";

export const sensorsService = {
    async getAll(params?: Record<string, any>) {
        const response = await axiosBase.get("/sensors", { params });
        return response.data;
    },

    async findHistory(sensorId: string, params?: Record<string, any>) {
        const response = await axiosBase.get(`/sensors/${sensorId}/history`, {
            params,
        });
        return response.data;
    },
};
