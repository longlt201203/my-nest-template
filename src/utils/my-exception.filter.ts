import { ApiError } from "@errors";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class MyExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const res = host.switchToHttp().getResponse<Response>();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let data: ApiError<any> = { code: InternalServerErrorException.name, message: "Internal Server Error", detail: null };

        if (exception instanceof ApiError) {
            status = HttpStatus.BAD_REQUEST;
            data = exception;
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            data = { code: exception.constructor.name, message: exception.message, detail: exception.getResponse() }
        } else {
            console.error(exception);
        }
        
        res.status(status).send(data);
    }
}