import { reveal } from '@/lib/reveal'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

export function Section({
	id,
	label,
	title,
	children,
	className,
}: {
	id: string
	label: string
	title: string
	children: ReactNode
	className?: string
}) {
	return (
		<section id={id} aria-labelledby={`${id}-title`} className={cn('py-16 sm:py-20', className)}>
			<p {...reveal()} className='mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent'>{label}</p>
			<h2 {...reveal(1)} id={`${id}-title`} className='mb-10 text-2xl font-semibold tracking-tight sm:text-3xl'>
				{title}
			</h2>
			{children}
		</section>
	)
}

export function Tag({ children }: { children: ReactNode }) {
	return (
		<span className='inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] text-muted'>
			{children}
		</span>
	)
}

const buttonBase =
	'inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-60'

const variants = {
	primary: 'bg-fg text-bg hover:bg-accent hover:text-accent-fg',
	ghost: 'border text-fg hover:border-fg',
}

type Variant = keyof typeof variants

export function ButtonLink({
	variant = 'primary',
	className,
	...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
	return <Link className={cn(buttonBase, variants[variant], className)} {...props} />
}

export function Button({ variant = 'primary', className, ...props }: ComponentProps<'button'> & { variant?: Variant }) {
	return <button className={cn(buttonBase, variants[variant], className)} {...props} />
}
