import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

// Database connection using better-sqlite3
const sqlite = new Database(process.env.SQLITE_DB_PATH ?? "./data.db");

export const db = drizzle(sqlite, { schema });

// Type exports for use throughout the app
export type Database = typeof db;
