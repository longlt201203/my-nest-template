import {
	ExceptionFilter,
	ArgumentsHost,
	Catch,
	HttpException,
} from "@nestjs/common";
import { Response } from "express";
import { BaseApiResponse } from "./dto/base-api-response";
import { ErrorCode } from "./enums/error-code";
import { ApiError } from "@errors";

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

		if (exception instanceof ApiError) {
			return res
				.status(exception.status)
				.send(
					BaseApiResponse.error(
						exception.code,
						exception.message,
						exception.detail,
					),
				);
		}

		if (exception instanceof HttpException) {
			return res
				.status(exception.getStatus())
				.send(
					BaseApiResponse.error(
						ErrorCode.UNKNOWN_ERROR,
						exception.message,
						exception.getResponse(),
					),
				);
		}

		return res
			.status(200)
			.send(
				BaseApiResponse.error(
					ErrorCode.UNKNOWN_ERROR,
					"Unknown error occurred",
					exception,
				),
			);
	}
}
