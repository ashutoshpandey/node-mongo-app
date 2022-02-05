export class AppError extends Error {
    status: string;
    message: string;
    errorCode: number;

    constructor(message: string, errorCode: number) {
        super(message);

        this.message = message;
        this.errorCode = errorCode;

        this.status = `${errorCode}`.startsWith('4') ? 'fail' : 'error';
    }
}