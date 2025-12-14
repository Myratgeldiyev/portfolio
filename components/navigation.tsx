'use client'

import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import {
	Briefcase,
	FolderOpen,
	GraduationCap,
	Home,
	Mail,
	Menu,
	MessageSquare,
	User,
	X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
	{ href: '/', label: 'Home', icon: Home },
	{ href: '/about', label: 'About', icon: User },
	{ href: '/experience', label: 'Experience', icon: Briefcase },
	{ href: '/education', label: 'Education', icon: GraduationCap },
	{ href: '/projects', label: 'Projects', icon: FolderOpen },
	{ href: '/contact', label: 'Contact', icon: Mail },
	{ href: '/chat', label: 'Chat', icon: MessageSquare },
]

export function Navigation() {
	const [isOpen, setIsOpen] = useState(false)
	const pathname = usePathname()

	return (
		<>
			{/* Desktop Navigation */}
			<motion.nav
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				className='fixed top-0 z-50 w-full border-b border-cyan-500/10 bg-background/80 backdrop-blur-lg'
			>
				<div className='mx-auto max-w-7xl px-4'>
					<div className='flex h-16 items-center justify-between'>
						<Link href='/' className='text-xl font-bold'>
							<span className='bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>
								Yunus Myratgeldiyev
							</span>
						</Link>

						{/* Desktop Menu */}
						<div className='hidden items-center gap-1 md:flex'>
							{navItems.map(item => {
								const isActive =
									pathname === item.href ||
									(item.href !== '/' && pathname.startsWith(item.href))
								return (
									<Link key={item.href} href={item.href}>
										<Button
											variant='ghost'
											className={`group relative ${
												isActive
													? 'text-cyan-400'
													: 'text-muted-foreground hover:text-foreground'
											}`}
										>
											<item.icon className='mr-2 h-4 w-4' />
											{item.label}
											{isActive && (
												<motion.div
													layoutId='activeTab'
													className='absolute inset-0 rounded-md bg-cyan-500/10'
													transition={{
														type: 'spring',
														bounce: 0.2,
														duration: 0.6,
													}}
												/>
											)}
										</Button>
									</Link>
								)
							})}
						</div>

						{/* Mobile Menu Button */}
						<Button
							variant='ghost'
							size='icon'
							className='md:hidden'
							onClick={() => setIsOpen(!isOpen)}
						>
							{isOpen ? (
								<X className='h-5 w-5' />
							) : (
								<Menu className='h-5 w-5' />
							)}
						</Button>
					</div>
				</div>
			</motion.nav>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, x: '100%' }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: '100%' }}
						transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
						className='fixed inset-y-0 right-0 z-50 w-full bg-background/95 backdrop-blur-lg md:hidden'
					>
						<div className='flex h-16 items-center justify-between px-4 border-b border-cyan-500/10'>
							<Link
								href='/'
								className='text-xl font-bold'
								onClick={() => setIsOpen(false)}
							>
								<span className='bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>
									Alex Chen
								</span>
							</Link>
							<Button
								variant='ghost'
								size='icon'
								onClick={() => setIsOpen(false)}
							>
								<X className='h-5 w-5' />
							</Button>
						</div>

						<div className='flex flex-col gap-2 p-4'>
							{navItems.map((item, index) => {
								const isActive =
									pathname === item.href ||
									(item.href !== '/' && pathname.startsWith(item.href))
								return (
									<motion.div
										key={item.href}
										initial={{ opacity: 0, x: 50 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.1 }}
									>
										<Link href={item.href} onClick={() => setIsOpen(false)}>
											<Button
												variant='ghost'
												className={`w-full justify-start text-lg ${
													isActive
														? 'bg-cyan-500/10 text-cyan-400'
														: 'text-muted-foreground'
												}`}
											>
												<item.icon className='mr-3 h-5 w-5' />
												{item.label}
											</Button>
										</Link>
									</motion.div>
								)
							})}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Spacer for fixed nav */}
			<div className='h-16' />
		</>
	)
}
