import { get, run } from "../../db/database.js";
import type { LinkRecord } from "./link.types.js";

// Insert a new short link row.
export async function insertLink(
    shortCode: string,
    originalUrl: string
): Promise<void> {
    await run(
        `
    INSERT INTO links (short_code, original_url)
    VALUES (?, ?)
    `,
        [shortCode, originalUrl]
    );
}

// Find one link by short code.
export async function findLinkByShortCode(
    shortCode: string
): Promise<LinkRecord | undefined> {
    return get<LinkRecord>(
        `
    SELECT id, short_code, original_url, click_count, created_at
    FROM links
    WHERE short_code = ?
    `,
        [shortCode]
    );
}

// Increment analytics counter when a short link is used.
export async function incrementClickCount(shortCode: string): Promise<void> {
    await run(
        `
    UPDATE links
    SET click_count = click_count + 1
    WHERE short_code = ?
    `,
        [shortCode]
    );
}