import { Module } from "@nestjs/common";
import { SensorsModule } from "./sensors/sensors.module";
import { HistoryModule } from "./history/history.module";

@Module({
  imports: [SensorsModule, HistoryModule],
})
export class AppModule {}
