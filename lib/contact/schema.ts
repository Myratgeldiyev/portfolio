import { z } from 'zod'

/** Shared by the contact form (client) and POST /api/contact (server). */
export const contactSchema = z.object({
	name: z.string().trim().min(1, 'Please enter your name').max(100, 'Name is too long'),
	email: z.string().trim().max(200, 'Email is too long').email('Please enter a valid email'),
	message: z
		.string()
		.trim()
		.min(10, 'Message should be at least 10 characters')
		.max(5000, 'Message is too long (5000 characters max)'),
	/** Honeypot: hidden from people, bots tend to fill it in. */
	website: z.string().max(200).optional().default(''),
})

export type ContactInput = z.input<typeof contactSchema>
export type ContactData = z.output<typeof contactSchema>

export type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>

export function toFieldErrors(error: z.ZodError): FieldErrors {
	const out: FieldErrors = {}
	for (const issue of error.issues) {
		const key = issue.path[0]
		if ((key === 'name' || key === 'email' || key === 'message') && !out[key]) out[key] = issue.message
	}
	return out
}
