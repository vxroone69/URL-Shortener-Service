import sqlite3 from "sqlite3";
import { env } from "../config/env.js";

export const database = new sqlite3.Database(env.DATABASE_FILE);

export function run(
    sql: string,
    params: readonly unknown[] = []
): Promise<{ id: number; changes: number }> {
    return new Promise((resolve, reject) => {
        database.run(sql, params, function (error) {
            if (error) {
                reject(error);
                return;
            }

            resolve({
                id: this.lastID,
                changes: this.changes,
            });
        });
    });
}

export function get<T>(
    sql: string,
    params: readonly unknown[] = []
): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
        database.get(sql, params, (error, row: T) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(row);
        });
    });
}