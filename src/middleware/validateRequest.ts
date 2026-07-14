import type { RequestHandler } from "express";
import type { ZodSchema } from "zod";
import { AppError } from "../errors/AppError.js";

type RequestValidationSchemas = {
    body?: ZodSchema;
    params?: ZodSchema;
    query?: ZodSchema;
};

// Middleware factory that validates selected request parts.
export function validateRequest(
    schemas: RequestValidationSchemas
): RequestHandler {
    return (req, _res, next) => {
        // Validate request body if a body schema exists.
        const bodyResult = schemas.body?.safeParse(req.body);

        if (bodyResult && !bodyResult.success) {
            return next(new AppError("Invalid request body", 400));
        }

        if (bodyResult?.success) {
            req.body = bodyResult.data;
        }

        // Validate route params if a params schema exists.
        const paramsResult = schemas.params?.safeParse(req.params);

        if (paramsResult && !paramsResult.success) {
            return next(new AppError("Invalid request params", 400));
        }

        if (paramsResult?.success) {
            req.params = paramsResult.data as typeof req.params;
        }

        // Validate query string if a query schema exists.
        const queryResult = schemas.query?.safeParse(req.query);

        if (queryResult && !queryResult.success) {
            return next(new AppError("Invalid request query", 400));
        }

        if (queryResult?.success) {
            req.query = queryResult.data as typeof req.query;
        }

        return next();
    };
}