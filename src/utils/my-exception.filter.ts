import { MyValidationError } from "@errors";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class MyExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const res = host.switchToHttp().getResponse<Response>();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let data: any = { message: "Internal Server Error" };

        if (exception instanceof MyValidationError) {
            status = HttpStatus.BAD_REQUEST;
            data = { message: exception.message, details: exception.errors };
        } else if (exception instanceof HttpException) {
            status = exception.getStatus();
            data = exception.getResponse();
        } else {
            console.error(exception);
        }
        
        res.status(status).send(data);
    }
}