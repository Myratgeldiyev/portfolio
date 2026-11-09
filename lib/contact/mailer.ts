import { Resend } from 'resend'
import type { Mailer, StoredMessage } from './service'

export function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
}

export function renderEmail(m: StoredMessage) {
	const subject = `Portfolio: new message from ${m.name.replace(/[\r\n]+/g, ' ')}`
	const text = `${m.message}\n\n— ${m.name} <${m.email}>`
	const html = `<div style="font-family:system-ui,sans-serif;line-height:1.5">
<p style="white-space:pre-wrap">${escapeHtml(m.message)}</p>
<hr style="border:none;border-top:1px solid #ddd"/>
<p style="color:#666">${escapeHtml(m.name)} &lt;${escapeHtml(m.email)}&gt;</p>
</div>`
	return { subject, text, html }
}

/** Returns null when RESEND_API_KEY is missing, so the form still works without email. */
export function createResendMailer(env: Record<string, string | undefined> = process.env): Mailer | null {
	const apiKey = env.RESEND_API_KEY
	const to = env.CONTACT_TO_EMAIL
	if (!apiKey || !to) return null

	const resend = new Resend(apiKey)
	const from = env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>'

	return {
		async send(m) {
			const { error } = await resend.emails.send({ from, to, replyTo: m.email, ...renderEmail(m) })
			if (error) throw new Error(`Resend: ${error.message}`)
		},
	}
}
