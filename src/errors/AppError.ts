export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);

        // HTTP status the API should return.
        this.statusCode = statusCode;

        // Marks this as an expected app-level error.
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}