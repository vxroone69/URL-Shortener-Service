import pinoHttp from "pino-http";

// Adds req.log and logs request/response details.
export const requestLogger = pinoHttp();