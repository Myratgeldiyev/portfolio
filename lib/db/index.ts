import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

type Db = ReturnType<typeof drizzle<typeof schema>>

const globalForDb = globalThis as unknown as { db?: Db }

/** Lazily connect so builds and tests don't need DATABASE_URL. */
export function getDb(): Db {
	if (globalForDb.db) return globalForDb.db

	const url = process.env.DATABASE_URL
	if (!url) throw new Error('DATABASE_URL is not set')

	// prepare: false is required by Supabase's transaction pooler (pgbouncer).
	const client = postgres(url, { prepare: false, max: 5, idle_timeout: 20 })
	const db = drizzle(client, { schema })
	globalForDb.db = db
	return db
}
