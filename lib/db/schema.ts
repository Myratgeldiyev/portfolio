import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const contactMessages = pgTable(
	'contact_messages',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		name: text('name').notNull(),
		email: text('email').notNull(),
		message: text('message').notNull(),
		/** sha256(IP_HASH_SALT + ip): enough for rate limiting, never the raw IP. */
		ipHash: text('ip_hash').notNull(),
		userAgent: text('user_agent'),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	},
	t => [index('contact_messages_ip_hash_created_at_idx').on(t.ipHash, t.createdAt)],
	// RLS on with no policies: Supabase's public REST API (anon key) can't read or write this table.
	// Our server connects as the postgres role, which bypasses RLS.
).enableRLS()

export type ContactMessage = typeof contactMessages.$inferSelect
export type NewContactMessage = typeof contactMessages.$inferInsert
