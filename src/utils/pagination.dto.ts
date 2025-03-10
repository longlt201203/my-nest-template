export class PaginationDto {
	page: number;
	take: number;
	totalRecord: number;
	totalPage: number;
	nextPage?: number;
	prevPage?: number;

	constructor(page: number, take: number, totalRecord: number) {
		this.page = page;
		this.take = take;
		this.totalRecord = totalRecord;
		this.totalPage = Math.ceil(totalRecord / take);
		this.nextPage = page < this.totalPage ? page + 1 : undefined;
		this.prevPage = page > 1 ? page - 1 : undefined;
	}
}
