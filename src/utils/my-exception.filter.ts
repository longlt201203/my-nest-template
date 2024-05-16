import { MyValidationError } from "@errors";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { ErrorApiResponseDto } from "./api-response.dto";

@Catch()
export class MyExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const res = host.switchToHttp().getResponse<Response>();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let data: ErrorApiResponseDto = { message: "Internal Server Error" };

        if (exception instanceof MyValidationError) {
            status = HttpStatus.BAD_REQUEST;
            data = { code: "validation_err", message: exception.message, details: exception.details };
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            data = { message: exception.message, details: exception.getResponse() }
        } else {
            console.error(exception);
        }
        
        res.status(status).send(data);
    }
}