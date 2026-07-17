import { Pool } from "pg";
import type { QueryResultRow } from "pg";
import { env } from "../config/env.js";

// Create a Postgres connection pool.
//
// Intuition:
// A backend server can receive many requests.
// Instead of opening a new database connection for every request,
// the pool keeps reusable connections ready.
console.log("App DATABASE_URL:", env.DATABASE_URL);

export const pool = new Pool({
    connectionString: env.DATABASE_URL,
});

// Run a SQL query that may return multiple rows.
//
// Type note:
// pg requires result row types to extend QueryResultRow.
// Also, pg expects a mutable params array, so we use unknown[] instead of readonly unknown[].
export async function query<T extends QueryResultRow = QueryResultRow>(
    sql: string,
    params: unknown[] = []
): Promise<T[]> {
    const result = await pool.query<T>(sql, params);
    return result.rows;
}

// Run a SQL query where we expect zero or one row.
//
// Used for lookups like:
// SELECT * FROM links WHERE short_code = $1
export async function queryOne<T extends QueryResultRow = QueryResultRow>(
    sql: string,
    params: unknown[] = []
): Promise<T | undefined> {
    const rows = await query<T>(sql, params);
    return rows[0];
}