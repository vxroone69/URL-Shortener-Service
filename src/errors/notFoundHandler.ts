import type { RequestHandler } from "express"

// handle request that doesnt match any of our routes

export const notFoundHandler: RequestHandler = (req, res) => {
    return res.status(404).json({
        error: {
            message: `Route ${req.method} ${req.path} not found`,

        },
    });
}