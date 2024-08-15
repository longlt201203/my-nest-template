import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class BaseFilterDto {
    @IsNumber()
    @Type(() => Number)
    page: number;

    @IsNumber()
    @Type(() => Number)
    take: number;
}