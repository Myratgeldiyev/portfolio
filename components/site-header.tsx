import { ThemeToggle } from '@/components/theme'
import { profile } from '@/content/profile'
import { navItems } from '@/lib/site'
import Link from 'next/link'

export function SiteHeader() {
	return (
		<header className='sticky top-0 z-40 border-b border-transparent bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70'>
			<div className='mx-auto flex h-16 max-w-3xl items-center justify-between px-5'>
				<Link href='/' className='font-mono text-sm font-medium tracking-tight' aria-label={`${profile.name}, home`}>
					yunus<span className='text-accent'>.</span>m
				</Link>
				<nav className='flex items-center gap-1' aria-label='Main'>
					<ul className='hidden items-center gap-1 sm:flex'>
						{navItems.map(item => (
							<li key={item.href}>
								<Link
									href={item.href}
									className='rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-fg'
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
					<ThemeToggle />
				</nav>
			</div>
		</header>
	)
}
