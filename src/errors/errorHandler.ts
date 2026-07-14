import type { ErrorRequestHandler } from "express";
import { AppError } from "./AppError"

//express error middleware

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
    req.log.error({ error }, "request failed");

    //return clean message
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            error: {
                message: error.message,
            },
        });
    }

    //hide isr from client
    return res.status(500).json({
        error: {
            message: "Internal Servor Error"
        }
    })

}