import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	schema: './lib/db/schema.ts',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: { url: process.env.DATABASE_URL ?? '' },
	// Only manage our own tables; Umami lives in the separate "umami" schema.
	schemaFilter: ['public'],
	strict: true,
	verbose: true,
})
