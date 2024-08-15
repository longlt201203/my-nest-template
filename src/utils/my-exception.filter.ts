import { ApiError } from "@errors";
import {
	ExceptionFilter,
	ArgumentsHost,
	InternalServerErrorException,
	HttpException,
	Catch,
} from "@nestjs/common";
import { Response } from "express";

/**
 * Global exception filter to handle all uncaught exceptions.
 * It catches various exception types and transforms them into a consistent API error format.
 */
@Catch()
export class MyExceptionFilter implements ExceptionFilter {
	/**
	 * Handles the thrown exception.
	 *
	 * @param exception The thrown exception.
	 * @param host The arguments host providing access to the request/response objects.
	 */
	catch(exception: any, host: ArgumentsHost) {
		const res = host.switchToHttp().getResponse<Response>();
		let data: ApiError<any> = {
			code: InternalServerErrorException.name,
			message: "Internal Server Error",
			detail: null,
			status: 500,
		};

		// Handle specific exception types and extract relevant information.
		if (exception instanceof ApiError) {
			data = exception;
		} else if (exception instanceof HttpException) {
			data = {
				code: exception.constructor.name,
				message: exception.message,
				detail: exception.getResponse(),
				status: exception.getStatus(),
			};
		} else {
			// Log unexpected errors for debugging.
			console.error(exception);
		}

		// Send the formatted error response.
		res.status(data.status).send(data);
	}
}
