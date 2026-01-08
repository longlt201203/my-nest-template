import { ValidationError } from "class-validator";
import { ApiError } from "./api-error";
import { ErrorCode } from "@utils/enums";
import { Builder } from "builder-pattern";

export class ValidationErrorReduced {
	property: string;
	constraints: { [type: string]: string };
	children?: ValidationErrorReduced[];

	static fromError(error: ValidationError): ValidationErrorReduced {
		return Builder(ValidationErrorReduced)
			.property(error.property)
			.constraints(error.constraints || {})
			.children(error.children ? this.fromErrors(error.children) : undefined)
			.build();
	}

	static fromErrors(errors: ValidationError[]): ValidationErrorReduced[] {
		return errors.map((err) => this.fromError(err));
	}
}

export class ApiValidationError extends ApiError<ValidationErrorReduced[]> {
	constructor(errors: ValidationError[]) {
		super({
			code: ErrorCode.VALIDATION_ERROR,
			message: "Validation Error!",
			detail: ValidationErrorReduced.fromErrors(errors),
		});
	}
}
