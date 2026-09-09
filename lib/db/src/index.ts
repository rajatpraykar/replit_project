import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

export const isDbConfigured = Boolean(process.env.DATABASE_URL);

if (!isDbConfigured) {
  console.warn("[Database] DATABASE_URL is not set. Database persistence will operate in mock/memory fallback mode.");
}

export const pool = isDbConfigured
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : (null as unknown as pg.Pool);

export const db: NodePgDatabase<typeof schema> = isDbConfigured
  ? drizzle(pool, { schema })
  : (null as unknown as NodePgDatabase<typeof schema>);

export * from "./schema";
