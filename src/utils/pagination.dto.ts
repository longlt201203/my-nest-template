export class PaginationDto<T> {
    page: number;
    take: number;
    totalRecord: number;
    totalPage: number;
    nextPage?: number;
    prevPage?: number;
    data: T[];

    from(data: T[]) {

    }
}