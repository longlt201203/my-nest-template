import { ValidationError } from "class-validator";
import { ApiError } from "./api-error";

export class ApiValidationError extends ApiError<ValidationError[]> {
    constructor(errors: ValidationError[]) {
        super();
        this.code = "validation_err";
        this.message = "Validation Error!";
        this.detail = errors;
    }
}