import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export * from "./schema";

export function createDbClient(connectionString: string) {
  const pool = new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30000,
  });

  return drizzle(pool, { schema });
}

let dbInstance: DbClient | null = null;

export function getDatabase(connectionString?: string): DbClient {
  if (!dbInstance) {
    const conn = connectionString || process.env.DATABASE_URL;
    if (!conn) {
      throw new Error("DATABASE_URL is not set");
    }
    dbInstance = createDbClient(conn);
  }
  return dbInstance;
}

export type DbClient = ReturnType<typeof createDbClient>;
