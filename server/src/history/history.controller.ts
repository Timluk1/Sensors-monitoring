import { Controller, Get, Query } from "@nestjs/common";
import { HistoryService } from "./history.service";
import { QueryHistoryDto } from "./dto/query-history.dto";

@Controller("api/history")
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  findAll(@Query() query: QueryHistoryDto) {
    return this.historyService.findAll(query);
  }
}
