import { createHash } from 'node:crypto'

/** First address in x-forwarded-for is the client (Railway's proxy appends itself). */
export function clientIp(headers: Headers): string {
	const forwarded = headers.get('x-forwarded-for')
	if (forwarded) {
		const first = forwarded.split(',')[0]?.trim()
		if (first) return first
	}
	return headers.get('x-real-ip')?.trim() || 'unknown'
}

export function hashIp(ip: string, salt = process.env.IP_HASH_SALT ?? ''): string {
	return createHash('sha256').update(`${salt}:${ip}`).digest('hex')
}
