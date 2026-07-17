import "dotenv/config";
import { z } from "zod";

// Defines and validates all environment variables used by the app.
const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),

    PORT: z.coerce.number().int().positive().default(3000),

    BASE_URL: z.string().url().default("http://localhost:3000"),

    DATABASE_URL: z
        .string()
        .url()
        .default("postgres://tinylink:tinylink@localhost:5433/tinylink"),
});

// Parses environment config once at startup.
export const env = envSchema.parse(process.env);