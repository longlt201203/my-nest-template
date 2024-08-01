import { PaginationDto } from "./pagination.dto";

export class SuccessApiResponseDto<T> {
    message?: string;
    data?: T;
    pagination?: PaginationDto;

    constructor(
        message?: string,
        data?: T,
        pagination?: PaginationDto
    ) {
        this.message = message;
        this.data = data;
        this.pagination = pagination;
    }
}

export class ErrorApiResponseDto {
    code: string;
    message?: string;
    details?: any;
}