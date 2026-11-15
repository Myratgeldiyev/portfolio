import { contactSchema, toFieldErrors, type ContactData, type FieldErrors } from './schema'

export const RATE_LIMIT = { max: 3, windowMs: 10 * 60 * 1000 }

export type StoredMessage = Omit<ContactData, 'website'> & { ipHash: string; userAgent: string | null }

export interface ContactStore {
	countSince(ipHash: string, since: Date): Promise<number>
	insert(message: StoredMessage): Promise<void>
}

export interface Mailer {
	send(message: StoredMessage): Promise<void>
}

export type ContactDeps = {
	/** null when DATABASE_URL is unset: messages are emailed only and not rate limited. */
	store: ContactStore | null
	mailer: Mailer | null
	now?: () => Date
	log?: Pick<Console, 'error' | 'warn'>
}

export type ContactResult =
	| { status: 200; body: { ok: true } }
	| { status: 400; body: { error: string; fieldErrors?: FieldErrors } }
	| { status: 429; body: { error: string } }
	| { status: 500; body: { error: string } }

/** Validates, rate-limits, stores and notifies. Framework-free so it can be unit tested. */
export async function handleContact(
	input: unknown,
	ctx: { ipHash: string; userAgent: string | null },
	deps: ContactDeps,
): Promise<ContactResult> {
	const log = deps.log ?? console
	const parsed = contactSchema.safeParse(input)
	if (!parsed.success) {
		return { status: 400, body: { error: 'Please fix the highlighted fields.', fieldErrors: toFieldErrors(parsed.error) } }
	}

	// Honeypot filled: pretend it worked so bots don't retry, but keep nothing.
	if (parsed.data.website) return { status: 200, body: { ok: true } }

	const { name, email, message } = parsed.data
	const record: StoredMessage = { name, email, message, ipHash: ctx.ipHash, userAgent: ctx.userAgent }
	const failed = { status: 500, body: { error: 'Could not send your message. Please email me directly.' } } as const

	// Without a database the email is the only copy, so it has to succeed.
	if (!deps.store) {
		if (!deps.mailer) {
			log.error('[contact] neither DATABASE_URL nor RESEND_API_KEY is set')
			return failed
		}
		try {
			await deps.mailer.send(record)
		} catch (err) {
			log.error('[contact] failed to send email', err)
			return failed
		}
		return { status: 200, body: { ok: true } }
	}

	try {
		const now = deps.now?.() ?? new Date()
		const recent = await deps.store.countSince(ctx.ipHash, new Date(now.getTime() - RATE_LIMIT.windowMs))
		if (recent >= RATE_LIMIT.max) {
			return { status: 429, body: { error: 'Too many messages. Please try again in a few minutes.' } }
		}
		await deps.store.insert(record)
	} catch (err) {
		log.error('[contact] failed to store message', err)
		return failed
	}

	// The message is safely stored; a failed notification shouldn't fail the request.
	if (deps.mailer) {
		try {
			await deps.mailer.send(record)
		} catch (err) {
			log.error('[contact] failed to send notification email', err)
		}
	} else {
		log.warn('[contact] RESEND_API_KEY not set, skipping email notification')
	}

	return { status: 200, body: { ok: true } }
}
