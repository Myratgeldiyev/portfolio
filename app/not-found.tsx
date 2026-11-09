import { ButtonLink } from '@/components/ui'

export default function NotFound() {
	return (
		<div className='mx-auto flex max-w-3xl flex-col items-start px-5 py-32'>
			<p className='font-mono text-xs text-accent'>404</p>
			<h1 className='mt-3 text-3xl font-semibold tracking-tight'>This page doesn&apos;t exist.</h1>
			<p className='mt-3 text-muted'>The link may be broken, or the page may have moved.</p>
			<ButtonLink href='/' className='mt-8'>
				Back home
			</ButtonLink>
		</div>
	)
}
