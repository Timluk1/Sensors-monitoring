import { IsOptional, IsIn, IsString } from "class-validator";

export class QueryHistoryDto {
  @IsOptional()
  @IsString()
  @IsIn(["1h", "24h", "7d", "30d"])
  interval?: string = "24h";

  @IsOptional()
  @IsString()
  @IsIn(["5min", "1h"])
  step?: string = "1h";
}
