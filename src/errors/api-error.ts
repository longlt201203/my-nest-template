export class ApiError<T = any> {
    code: string;
    message: string;
    detail: T;

    constructor(props: ApiError) {
        Object.assign(this, props);
    }
}