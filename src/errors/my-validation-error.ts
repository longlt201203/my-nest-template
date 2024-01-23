import { ValidationError } from "class-validator";

export default class MyValidationError extends Error {
    errors: ValidationError[];

    constructor(errors: ValidationError[]) {
        super("Validation Error!");
        this.errors = errors;
    }
}