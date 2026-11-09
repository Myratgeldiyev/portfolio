import { handleContact, RATE_LIMIT, type ContactStore, type Mailer, type StoredMessage } from '@/lib/contact/service'
import { describe, expect, it, vi } from 'vitest'

const valid = { name: 'Ada', email: 'ada@example.com', message: 'Hello, I would like to talk.' }
const ctx = { ipHash: 'hash-1', userAgent: 'vitest' }
const silent = { error: vi.fn(), warn: vi.fn() }

function memoryStore(): ContactStore & { rows: (StoredMessage & { at: Date })[] } {
	const rows: (StoredMessage & { at: Date })[] = []
	return {
		rows,
		async countSince(ipHash, since) {
			return rows.filter(r => r.ipHash === ipHash && r.at >= since).length
		},
		async insert(m) {
			rows.push({ ...m, at: new Date() })
		},
	}
}

describe('handleContact', () => {
	it('stores the message and sends a notification', async () => {
		const store = memoryStore()
		const mailer: Mailer = { send: vi.fn().mockResolvedValue(undefined) }
		const res = await handleContact(valid, ctx, { store, mailer, log: silent })
		expect(res).toEqual({ status: 200, body: { ok: true } })
		expect(store.rows).toHaveLength(1)
		expect(store.rows[0]).toMatchObject({ ...valid, ipHash: 'hash-1', userAgent: 'vitest' })
		expect(mailer.send).toHaveBeenCalledOnce()
	})

	it('returns field errors for invalid input', async () => {
		const store = memoryStore()
		const res = await handleContact({ ...valid, email: 'nope' }, ctx, { store, mailer: null, log: silent })
		expect(res.status).toBe(400)
		if (res.status === 400) expect(res.body.fieldErrors?.email).toBeTruthy()
		expect(store.rows).toHaveLength(0)
	})

	it('silently drops honeypot submissions', async () => {
		const store = memoryStore()
		const mailer: Mailer = { send: vi.fn() }
		const res = await handleContact({ ...valid, website: 'http://spam' }, ctx, { store, mailer, log: silent })
		expect(res.status).toBe(200)
		expect(store.rows).toHaveLength(0)
		expect(mailer.send).not.toHaveBeenCalled()
	})

	it(`rate limits after ${RATE_LIMIT.max} messages per window`, async () => {
		const store = memoryStore()
		for (let i = 0; i < RATE_LIMIT.max; i++) {
			expect((await handleContact(valid, ctx, { store, mailer: null, log: silent })).status).toBe(200)
		}
		expect((await handleContact(valid, ctx, { store, mailer: null, log: silent })).status).toBe(429)
		// A different visitor is not affected.
		expect((await handleContact(valid, { ...ctx, ipHash: 'hash-2' }, { store, mailer: null, log: silent })).status).toBe(200)
	})

	it('allows messages again after the window passes', async () => {
		const store = memoryStore()
		for (let i = 0; i < RATE_LIMIT.max; i++) await handleContact(valid, ctx, { store, mailer: null, log: silent })
		const later = () => new Date(Date.now() + RATE_LIMIT.windowMs + 1000)
		expect((await handleContact(valid, ctx, { store, mailer: null, now: later, log: silent })).status).toBe(200)
	})

	it('still succeeds when the email fails, because the message is stored', async () => {
		const store = memoryStore()
		const mailer: Mailer = { send: vi.fn().mockRejectedValue(new Error('down')) }
		const log = { error: vi.fn(), warn: vi.fn() }
		const res = await handleContact(valid, ctx, { store, mailer, log })
		expect(res.status).toBe(200)
		expect(store.rows).toHaveLength(1)
		expect(log.error).toHaveBeenCalled()
	})

	it('returns 500 when the database fails', async () => {
		const store: ContactStore = { countSince: vi.fn().mockRejectedValue(new Error('db down')), insert: vi.fn() }
		const res = await handleContact(valid, ctx, { store, mailer: null, log: silent })
		expect(res.status).toBe(500)
	})
})
