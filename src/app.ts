import express from "express";
import { errorHandler } from "./errors/errorHandler.js";
import { notFoundHandler } from "./errors/notFoundHandler.js";
import { linkRouter } from "./features/links/link.routes.js";
import { requestLogger } from "./middleware/requestLogger.js";

// App factory. Useful for testing because tests can import createApp().
export function createApp() {
    const app = express();

    // Log every request.
    app.use(requestLogger);

    // Parse JSON request bodies.
    app.use(express.json());

    // Simple health check endpoint.
    app.get("/health", (_req, res) => {
        return res.status(200).json({
            data: {
                status: "ok",
            },
        });
    });

    // Register feature routes.
    app.use(linkRouter);

    // Handle unmatched routes.
    app.use(notFoundHandler);

    // Handle errors from routes/controllers/services.
    app.use(errorHandler);

    return app;
}