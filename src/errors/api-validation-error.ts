import { ValidationError } from "class-validator";
import { ApiError } from "./api-error";

export class ApiValidationError extends ApiError {
	constructor(errors: ValidationError[]) {
		super({
			code: "validation_err",
			message: "Validation Error!",
			detail: errors.map((err) => ({
				field: err.property,
				constraints: Object.keys(err.constraints),
			})),
		});
	}
}
