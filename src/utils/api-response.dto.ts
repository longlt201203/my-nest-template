import { PaginationDto } from "./pagination.dto";

export class SuccessApiResponseDto {
    message?: string;
    data?: any;
    pagination?: PaginationDto;
}

export class ErrorApiResponseDto {
    code?: string;
    message?: string;
    details?: any;
}