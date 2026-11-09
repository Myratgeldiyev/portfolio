import { clientIp, hashIp } from '@/lib/contact/ip'
import { createResendMailer, escapeHtml, renderEmail } from '@/lib/contact/mailer'
import { describe, expect, it } from 'vitest'

describe('clientIp', () => {
	it('uses the first x-forwarded-for address', () => {
		expect(clientIp(new Headers({ 'x-forwarded-for': '1.2.3.4, 10.0.0.1' }))).toBe('1.2.3.4')
	})
	it('falls back to x-real-ip, then "unknown"', () => {
		expect(clientIp(new Headers({ 'x-real-ip': '5.6.7.8' }))).toBe('5.6.7.8')
		expect(clientIp(new Headers())).toBe('unknown')
	})
})

describe('hashIp', () => {
	it('is stable for the same salt and never returns the raw IP', () => {
		const a = hashIp('1.2.3.4', 'salt')
		expect(a).toBe(hashIp('1.2.3.4', 'salt'))
		expect(a).not.toContain('1.2.3.4')
		expect(a).not.toBe(hashIp('1.2.3.4', 'other'))
	})
})

describe('email rendering', () => {
	it('escapes HTML from visitors', () => {
		expect(escapeHtml('<script>"x"&\'y\'</script>')).toBe('&lt;script&gt;&quot;x&quot;&amp;&#39;y&#39;&lt;/script&gt;')
		const { html, subject } = renderEmail({
			name: 'Eve\r\nBcc: x',
			email: 'eve@example.com',
			message: '<img src=x onerror=alert(1)>',
			ipHash: 'h',
			userAgent: null,
		})
		expect(html).not.toContain('<img')
		expect(subject).not.toMatch(/[\r\n]/)
	})

	it('disables the mailer without an API key', () => {
		expect(createResendMailer({ CONTACT_TO_EMAIL: 'a@b.c' })).toBeNull()
		expect(createResendMailer({ RESEND_API_KEY: 're_x', CONTACT_TO_EMAIL: 'a@b.c' })).not.toBeNull()
	})
})
