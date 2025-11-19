import { IsOptional, IsIn, IsString, IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";

export class QueryHistoryDto {
  @IsOptional()
  @IsString()
  @IsIn(["1h", "24h", "7d", "30d"])
  interval?: string = "24h";

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 100;
}