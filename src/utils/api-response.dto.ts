import { PaginationDto } from "./pagination.dto";

export class ApiResponseDto<T = any> {
    message?: string;
    data: T;
    pagination?: PaginationDto;
}