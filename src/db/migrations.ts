import { run } from "./database.js";

export async function runMigrations(): Promise<void> {
    await run(`
    CREATE TABLE IF NOT EXISTS links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      short_code TEXT NOT NULL UNIQUE,
      original_url TEXT NOT NULL,
      click_count INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

    await run(`
    CREATE INDEX IF NOT EXISTS idx_links_short_code
    ON links(short_code)
  `);
}