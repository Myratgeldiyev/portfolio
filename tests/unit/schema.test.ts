import { contactSchema, toFieldErrors } from '@/lib/contact/schema'
import { describe, expect, it } from 'vitest'

const valid = { name: 'Ada', email: 'ada@example.com', message: 'Hello, I would like to talk.' }

describe('contactSchema', () => {
	it('accepts a valid message and trims fields', () => {
		const r = contactSchema.parse({ ...valid, name: '  Ada  ' })
		expect(r.name).toBe('Ada')
		expect(r.website).toBe('')
	})

	it.each([
		['name', { ...valid, name: '   ' }],
		['email', { ...valid, email: 'not-an-email' }],
		['message', { ...valid, message: 'short' }],
		['message', { ...valid, message: 'x'.repeat(5001) }],
	])('rejects an invalid %s', (field, input) => {
		const r = contactSchema.safeParse(input)
		expect(r.success).toBe(false)
		if (!r.success) expect(toFieldErrors(r.error)).toHaveProperty(field)
	})
})
