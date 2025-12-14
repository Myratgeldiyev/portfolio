'use client'

import { Navigation } from '@/components/navigation'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

const projects = [
	{
		slug: 'fast-grocery',
		title: 'Fast Grocery Platform',
		description:
			'A full-featured Fast Grocery platform with shopping cart, payments, and admin dashboard',
		image: '/grocery-delivery.png',
		tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind'],
		featured: true,
	},
	{
		slug: 'healthcare-clinic',
		title: 'HealthCare clinic',
		description:
			'Modern healthcare clinic website with appointment booking, user profiles, chat interface, map integration, and smooth animations built using Next.js and Tailwind CSS.',
		image: '/health-care.png',
		tags: ['React', 'Firebase', 'Framer Motion'],
		featured: true,
	},
	{
		slug: 'seret-streaming-movie',
		title: 'Seret streaming movie platform',
		description:
			'Seret Film is a modern streaming website featuring smooth animations, a built-in video player, smart search and filters, and multi-language support (English, Russian, Turkmen). It includes subscription plans, secure UI navigation, and fully playable movies using optimized mock data—ready to use without a backend.',
		image: '/seret.png',
		tags: ['React', 'OpenWeather API', 'Charts'],
		featured: false,
	},
	{
		slug: 'chulba',
		title: 'Chulba landing page',
		description:
			'Chulba is a modern platform designed to help you launch and grow your digital projects faster. With a sleek interface, high performance, and flexible features, it delivers a seamless user experience from start to scale',
		image: '/chulba.png',
		tags: ['Next.js', 'DnD Kit', 'Tailwind'],
		featured: false,
	},
	{
		slug: 'hytayda-oka',
		title: 'Hytayda Oka',
		description:
			'Study in China platform that helps international students find universities, explore programs, and apply with confidence. We provide clear guidance, reliable support, and a smooth application process from start to enrollment',
		image: '/hytayda-oka.png',
		tags: ['React', 'Chart.js', 'REST API'],
		featured: false,
	},
]

export default function ProjectsPage() {
	return (
		<div className='min-h-screen'>
			<Navigation />

			<div className='mx-auto max-w-7xl px-4 py-20'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className='mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'>
						Projects
					</h1>
					<p className='mb-12 max-w-3xl text-lg text-muted-foreground text-balance'>
						A collection of my recent work and side projects
					</p>
				</motion.div>

				<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
					{projects.map((project, index) => (
						<motion.div
							key={project.slug}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1, duration: 0.5 }}
						>
							<Link href={`/projects/${project.slug}`}>
								<motion.div
									whileHover={{ y: -8 }}
									className='group relative h-full overflow-hidden rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 backdrop-blur-sm transition-all hover:border-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/20'
								>
									{/* Image */}
									<div className='relative aspect-video overflow-hidden'>
										<motion.img
											whileHover={{ scale: 1.1 }}
											transition={{ duration: 0.6 }}
											src={project.image}
											alt={project.title}
											className='h-full w-full object-cover'
										/>
										<div className='absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity' />
									</div>

									{/* Content */}
									<div className='p-6'>
										<div className='mb-3 flex items-start justify-between gap-2'>
											<h3 className='text-xl font-bold text-balance group-hover:text-cyan-400 transition-colors'>
												{project.title}
											</h3>
											<ExternalLink className='h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-cyan-400' />
										</div>

										<p className='mb-4 text-sm text-muted-foreground leading-relaxed'>
											{project.description}
										</p>

										{/* Tags */}
										<div className='flex flex-wrap gap-2'>
											{project.tags.map(tag => (
												<span
													key={tag}
													className='rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400'
												>
													{tag}
												</span>
											))}
										</div>
									</div>

									{/* Featured badge */}
									{project.featured && (
										<div className='absolute right-4 top-4 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400 backdrop-blur-sm'>
											Featured
										</div>
									)}
								</motion.div>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	)
}
