export interface KinoResponse {
    status: boolean;
    message: string;
}

export interface SuccessResponse<T> extends KinoResponse {
    status: true;
    result: T;
}

export interface ErrorResponse extends KinoResponse {
    status: false;
}
