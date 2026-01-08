import { ErrorCode } from "@utils/enums";

export class ApiError<T = any> {
	code: ErrorCode;
	message: string;
	detail?: T;
	status: number;

	constructor(props: Partial<ApiError<T>>) {
		this.code = props.code || ErrorCode.UNKNOWN_ERROR;
		this.message = props.message || "Unknown Error";
		this.detail = props.detail;
		this.status = props.status || 400;
	}
}
