import { ValidationError } from "@nestjs/common";
import { MyValidationErrorDetail } from "./my-validation-error-detail";

export class MyValidationError extends Error {
    details: ValidationError[];

    constructor(details: ValidationError[]) {
        super("Validation Error!");
        this.details = details;
    }
}