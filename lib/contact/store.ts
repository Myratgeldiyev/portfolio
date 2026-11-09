import { getDb } from '@/lib/db'
import { contactMessages } from '@/lib/db/schema'
import { and, count, eq, gte } from 'drizzle-orm'
import type { ContactStore } from './service'

export const dbContactStore: ContactStore = {
	async countSince(ipHash, since) {
		const [row] = await getDb()
			.select({ value: count() })
			.from(contactMessages)
			.where(and(eq(contactMessages.ipHash, ipHash), gte(contactMessages.createdAt, since)))
		return row?.value ?? 0
	},
	async insert(message) {
		await getDb().insert(contactMessages).values(message)
	},
}
