import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
    PORT: z.coerce.number().int().positive().default(3000),
    DATABASE_FILE: z.string().default("tinylink.db"),
    BASE_URL: z.string().url().default("http://localhost:3000"),
});

export const env = envSchema.parse(process.env);