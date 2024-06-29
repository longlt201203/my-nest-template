export class ApiError<T = any> {
	code: string;
	message: string;
	detail: T;
	status?: number;

	constructor(props: ApiError) {
		Object.assign(this, props);
		if (!this.status) this.status = 400;
	}
}
