import { env } from "./config/env.js";
import { runMigrations } from "./db/migrations.js";
import { createApp } from "./app.js";

// Bootstraps the whole service.
async function bootstrap(): Promise<void> {
    // Prepare database schema before accepting traffic.
    await runMigrations();

    const app = createApp();

    // Start HTTP server.
    app.listen(env.PORT, () => {
        console.log(`TinyLink is running on ${env.BASE_URL}`);
    });
}

// Crash fast if startup fails.
bootstrap().catch((error) => {
    console.error(error);
    process.exit(1);
});