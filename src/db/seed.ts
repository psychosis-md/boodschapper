/*
 * Loads demo data. Run with `npm run db:seed`.
 *
 * Runs outside Next.js, so it opens its own connection instead of importing
 * `./index` (which is server-only). Seed data is invented demo data, never
 * prices scraped from stores (AGENTS.md rule 9).
 */
import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

loadEnvConfig(process.cwd());

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local.");

  const client = postgres(url, { max: 1 });
  const db = drizzle(client, { schema });

  await db.transaction(async () => {
    // Nothing to seed yet: there are no tables.
  });

  console.log("Seed complete.");
  await client.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
