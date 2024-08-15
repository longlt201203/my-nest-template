/**
 * ValidationPipe is a custom PipeTransform used for validating incoming request data against a provided DTO.
 * It leverages the 'class-transformer' and 'class-validator' libraries for data transformation and validation respectively.
 */
import { ApiValidationError } from '@errors';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  /**
   * Transforms the incoming value to the specified DTO instance and validates it.
   * If validation fails, throws an ApiValidationError with the validation errors.
   *
   * @param value - The incoming value to be validated.
   * @param {ArgumentMetadata} metadata - Metadata about the current request.
   * @returns The validated value if successful, throws an error otherwise.
   */
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // Skip validation if no metatype is provided or if it's a primitive type.
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Transform the plain object to a DTO instance.
    const object = plainToInstance(metatype, value, { enableImplicitConversion: true, enableCircularCheck: true });

    // Validate the DTO instance against the validation rules defined in the DTO.
    const errors = await validate(object);

    // Throw an error if validation fails.
    if (errors.length > 0) {
      throw new ApiValidationError(errors);
    }

    // Return the validated value.
    return value;
  }

  /**
   * Checks if the provided metatype is a complex type that needs validation.
   *
   * @param {Function} metatype - The metatype to be checked.
   * @returns {boolean} True if the metatype is a complex type, false otherwise.
   */
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
