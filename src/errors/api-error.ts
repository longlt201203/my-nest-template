export class ApiError<T = any> {
    code: string;
    message: string;
    detail: T;
}