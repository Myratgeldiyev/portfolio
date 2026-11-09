import { clientIp, hashIp } from '@/lib/contact/ip'
import { createResendMailer } from '@/lib/contact/mailer'
import { handleContact } from '@/lib/contact/service'
import { dbContactStore } from '@/lib/contact/store'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const MAX_BODY_BYTES = 20_000

export async function POST(request: Request) {
	const raw = await request.text()
	if (raw.length > MAX_BODY_BYTES) {
		return NextResponse.json({ error: 'Message is too large.' }, { status: 413 })
	}

	let input: unknown
	try {
		input = JSON.parse(raw)
	} catch {
		return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
	}

	const result = await handleContact(
		input,
		{ ipHash: hashIp(clientIp(request.headers)), userAgent: request.headers.get('user-agent')?.slice(0, 300) ?? null },
		{ store: dbContactStore, mailer: createResendMailer() },
	)

	return NextResponse.json(result.body, { status: result.status })
}
