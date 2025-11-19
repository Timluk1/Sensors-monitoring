import { Controller, Get, Param, Query } from "@nestjs/common";
import { SensorsService } from "./sensors.service";
import { QuerySensorDto } from "./dto/query-sensor.dto";
import { QueryHistoryDto } from "./dto/query-history.dto";

@Controller("api/sensors")
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Get()
  findAll(@Query() query: QuerySensorDto) {
    return this.sensorsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.sensorsService.findOne(id);
  }

  @Get(":id/history")
  findHistory(@Param("id") id: string, @Query() query: QueryHistoryDto) {
    return this.sensorsService.findHistory(id, query);
  }

  @Get(":id/logs")
  findLogs(@Param("id") id: string) {
    return this.sensorsService.findLogs(id);
  }
}
