import { IsOptional, IsIn, IsInt, Min, IsString } from "class-validator";
import { Type } from "class-transformer";

export class QuerySensorDto {
  @IsOptional()
  @IsString()
  @IsIn(["temperature", "humidity", "air_quality", "noise"])
  type?: "temperature" | "humidity" | "air_quality" | "noise";

  @IsOptional()
  @IsString()
  @IsIn(["online", "offline"])
  status?: "online" | "offline";

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;
}
