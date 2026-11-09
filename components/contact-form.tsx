'use client'

import { Button } from '@/components/ui'
import { contactSchema, toFieldErrors, type FieldErrors } from '@/lib/contact/schema'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { useState, type FormEvent } from 'react'

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string }

const inputClass =
	'w-full rounded-lg border bg-transparent px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-fg aria-[invalid=true]:border-danger'

export function ContactForm() {
	const [status, setStatus] = useState<Status>({ kind: 'idle' })
	const [errors, setErrors] = useState<FieldErrors>({})

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const form = e.currentTarget
		const values = Object.fromEntries(new FormData(form))

		const parsed = contactSchema.safeParse(values)
		if (!parsed.success) {
			setErrors(toFieldErrors(parsed.error))
			return
		}
		setErrors({})
		setStatus({ kind: 'sending' })

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(parsed.data),
			})
			const body = (await res.json().catch(() => ({}))) as { error?: string; fieldErrors?: FieldErrors }

			if (!res.ok) {
				if (body.fieldErrors) setErrors(body.fieldErrors)
				setStatus({ kind: 'error', message: body.error ?? 'Something went wrong. Please try again.' })
				return
			}
			form.reset()
			setStatus({ kind: 'sent' })
		} catch {
			setStatus({ kind: 'error', message: 'Network error. Check your connection and try again.' })
		}
	}

	if (status.kind === 'sent') {
		return (
			<div role='status' className='flex items-start gap-3 rounded-xl border p-6'>
				<span className='grid size-8 shrink-0 place-items-center rounded-full bg-success/15 text-success'>
					<Check className='size-4' />
				</span>
				<div>
					<p className='font-medium'>Message sent — thank you!</p>
					<p className='mt-1 text-sm text-muted'>I usually reply within a day or two.</p>
					<button
						type='button'
						onClick={() => setStatus({ kind: 'idle' })}
						className='mt-3 text-sm text-accent underline-offset-4 hover:underline'
					>
						Send another message
					</button>
				</div>
			</div>
		)
	}

	return (
		<form onSubmit={onSubmit} noValidate className='space-y-4' aria-label='Contact form'>
			<div className='grid gap-4 sm:grid-cols-2'>
				<Field id='name' label='Name' error={errors.name}>
					<input
						id='name'
						name='name'
						autoComplete='name'
						maxLength={100}
						placeholder='Your name'
						aria-invalid={!!errors.name}
						aria-describedby={errors.name ? 'name-error' : undefined}
						className={inputClass}
					/>
				</Field>
				<Field id='email' label='Email' error={errors.email}>
					<input
						id='email'
						name='email'
						type='email'
						autoComplete='email'
						maxLength={200}
						placeholder='you@example.com'
						aria-invalid={!!errors.email}
						aria-describedby={errors.email ? 'email-error' : undefined}
						className={inputClass}
					/>
				</Field>
			</div>
			<Field id='message' label='Message' error={errors.message}>
				<textarea
					id='message'
					name='message'
					rows={5}
					maxLength={5000}
					placeholder='Tell me about your project or role…'
					aria-invalid={!!errors.message}
					aria-describedby={errors.message ? 'message-error' : undefined}
					className={cn(inputClass, 'resize-y')}
				/>
			</Field>

			{/* Honeypot: invisible to people and screen readers. */}
			<div aria-hidden='true' className='absolute -left-[9999px] h-0 w-0 overflow-hidden'>
				<label htmlFor='website'>Website</label>
				<input id='website' name='website' type='text' tabIndex={-1} autoComplete='off' />
			</div>

			<div className='flex flex-wrap items-center gap-4'>
				<Button type='submit' disabled={status.kind === 'sending'}>
					{status.kind === 'sending' ? 'Sending…' : 'Send message'}
				</Button>
				{status.kind === 'error' && (
					<p role='alert' className='text-sm text-danger'>
						{status.message}
					</p>
				)}
			</div>
		</form>
	)
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
	return (
		<div>
			<label htmlFor={id} className='mb-1.5 block text-sm font-medium'>
				{label}
			</label>
			{children}
			{error && (
				<p id={`${id}-error`} className='mt-1.5 text-xs text-danger'>
					{error}
				</p>
			)}
		</div>
	)
}
