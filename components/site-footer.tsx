import { socialIcons } from '@/components/icons'
import { profile } from '@/content/profile'

export function SiteFooter() {
	const socials = profile.socials.filter(s => s.href)

	return (
		<footer className='border-t'>
			<div className='mx-auto flex max-w-3xl flex-col gap-4 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between'>
				<p>
					© {new Date().getFullYear()} {profile.name}
				</p>
				<ul className='flex items-center gap-4'>
					{socials.map(s => {
						const Icon = socialIcons[s.label]
						return (
							<li key={s.label}>
								<a
									href={s.href}
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center gap-2 transition-colors hover:text-fg'
								>
									{Icon && <Icon className='size-4' />}
									{s.label}
								</a>
							</li>
						)
					})}
				</ul>
			</div>
		</footer>
	)
}
