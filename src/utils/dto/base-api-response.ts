import { Builder } from "builder-pattern";
import { Type, applyDecorators } from "@nestjs/common";
import {
	ApiExtraModels,
	ApiOkResponse,
	ApiProperty,
	OmitType,
	getSchemaPath,
} from "@nestjs/swagger";
import { ErrorCode } from "../enums/error-code";
import { PaginationDto } from "./pagination.dto";

export class BaseApiResponse<T = any> {
	@ApiProperty({ enum: ErrorCode })
	code: ErrorCode;

	@ApiProperty()
	message: string;

	@ApiProperty({ required: false })
	error?: any;

	@ApiProperty({ required: false })
	data?: T;

	@ApiProperty({ required: false, type: PaginationDto })
	pagination?: PaginationDto;

	static success<T>(data?: T, pagination?: PaginationDto) {
		return Builder(BaseApiResponse)
			.code(ErrorCode.OK)
			.message("Success")
			.data(data)
			.pagination(pagination)
			.build();
	}

	static error(code: ErrorCode, message: string, error: any) {
		return Builder(BaseApiResponse)
			.code(code)
			.message(message)
			.error(error)
			.build();
	}
}

interface SwaggerBaseApiResponseOptions {
	isArray?: boolean;
	withPagination?: boolean;
}

export function SwaggerBaseApiResponse<T extends Type<any>>(
	t: T,
	opts?: SwaggerBaseApiResponseOptions,
): MethodDecorator {
	const swaggerModel = opts?.withPagination
		? BaseApiResponse
		: OmitType(BaseApiResponse, ["pagination"]);

	const dataSchema = opts?.isArray
		? {
				type: "array",
				items: {
					type: "object",
					$ref: getSchemaPath(t),
				},
			}
		: {
				type: "object",
				$ref: getSchemaPath(t),
			};

	return applyDecorators(
		ApiExtraModels(swaggerModel, t),
		ApiOkResponse({
			schema: {
				allOf: [
					{ $ref: getSchemaPath(swaggerModel) },
					{
						properties: {
							data: dataSchema,
						},
					},
				],
			},
		}),
	);
}
