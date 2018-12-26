export interface IError {
    errorCode: number | string;
    errorMessage: string;
}

export class CommonError implements IError {
    errorCode: string | number;
    errorMessage: string;
}

export interface ICommonResponse {
    statusCode: number;
    errors?: IError[];
}

export class DataResponse<T> implements ICommonResponse {
    statusCode = 200;
    data: T;
}

export class ErrorResponse implements ICommonResponse  {
    statusCode: number;    data?: any;
    errors: CommonError[];
}
