import { query } from "./database.js";

// Runs database setup before the HTTP server starts accepting requests.
export async function runMigrations(): Promise<void> {
  // Create the links table if it does not exist.
  await query(`
    CREATE TABLE IF NOT EXISTS links (
      id BIGSERIAL PRIMARY KEY,
      short_code TEXT NOT NULL UNIQUE,
      original_url TEXT NOT NULL,
      click_count INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  // Index short_code because redirects look up links by short code.
  await query(`
    CREATE INDEX IF NOT EXISTS idx_links_short_code
    ON links(short_code)
  `);
}