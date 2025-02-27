export class CustomError extends Error {
    errorCode: number;
    detail?: string;
    constructor(errorCode: number, message: string, detail?: string) {
        super(message);
        this.errorCode = errorCode;
        this.name = "CustomError";
        this.detail = detail;
    }
}
