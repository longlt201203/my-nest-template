// import { Type, applyDecorators } from "@nestjs/common";
import { PaginationDto } from "./pagination.dto";
// import { ApiExtraModels, ApiOkResponse, ApiProperty, OmitType, getSchemaPath } from "@nestjs/swagger";

export class ApiResponseDto<T = any> {
    // @ApiProperty({ required: false })
    message?: string;

    // @ApiProperty()
    data?: T;

    // @ApiProperty({ required: false, type: PaginationDto })
    pagination?: PaginationDto;

    constructor(
        data?: T,
        pagination?: PaginationDto,
        message?: string
    ) {
        this.data = data;
        this.pagination = pagination;
        this.message = message;
    }
}

// interface SwaggerApiResponseOptions {
//     isArray?: boolean;
//     withPagination?: boolean;
// }

// export const SwaggerApiResponse = <T extends Type<any>>(t: T, opts?: SwaggerApiResponseOptions) => {
//     const swaggerModel = opts?.withPagination ? ApiResponseDto : OmitType(ApiResponseDto, ["pagination"]);
    
//     return applyDecorators(
//         ApiExtraModels(swaggerModel, t),
//         ApiOkResponse({
//             schema: {
//                 allOf: [
//                     { $ref: getSchemaPath(swaggerModel) },
//                     {
//                         properties: {
//                             data: opts?.isArray ? {
//                                 type: "array",
//                                 items: {
//                                     type: "object",
//                                     $ref: getSchemaPath(t)
//                                 }
//                             } : {
//                                 type: "object",
//                                 $ref: getSchemaPath(t)
//                             }
//                         }
//                     }
//                 ]
//             }
//         })
//     );
// };