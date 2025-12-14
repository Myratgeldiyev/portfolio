'use client'

import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, ExternalLink, Github, Tag } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const projectsData: Record<string, any> = {
	'fast-grocery': {
		title: 'Fast Grocery Platform',
		description:
			'A fast grocery delivery platform with shopping cart, payments, and admin dashboard',
		longDescription:
			'Built a fast grocery delivery platform using Next.js and TypeScript. The platform allows users to browse products, add items to the cart, and complete secure payments. It includes an admin dashboard for managing products, orders, and inventory. The project focuses on performance, scalability, and a smooth user experience across all devices.',
		image: '/grocery-delivery.png',
		tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
		date: 'December 2024',
		liveUrl: 'https://grocery-delivery-nu.vercel.app/',
		githubUrl: 'https://github.com/Myratgeldiyev/grocery-delivery',
		features: [
			'Product listing with categories',
			'Shopping cart with real-time updates',
			'Secure payment integration',
			'Admin dashboard for product and order management',
			'Responsive and mobile-first design',
		],
		challenges: [
			'Implementing secure and reliable payments',
			'Optimizing performance for fast browsing',
			'Designing a scalable admin dashboard',
		],
	},

	'healthcare-clinic': {
		title: 'Healthcare Clinic Website',
		description:
			'Modern healthcare clinic website with appointment booking and user interaction',
		longDescription:
			'Developed a modern healthcare clinic website that allows patients to book appointments, manage profiles, and communicate with the clinic. The project includes smooth animations, interactive UI components, map integration, and a clean design optimized for usability and accessibility.',
		image: '/health-care.png',
		tags: ['Next.js', 'Firebase', 'Framer Motion', 'Tailwind CSS'],
		date: 'February 2025',
		liveUrl: 'https://healthcare-clinic-hazel.vercel.app',
		githubUrl: 'https://github.com/Myratgeldiyev/Healthcare-clinic',
		features: [
			'Online appointment booking system',
			'User profiles and authentication',
			'Live chat interface',
			'Map and location integration',
			'Smooth animations and transitions',
		],
		challenges: [
			'Managing real-time user interactions',
			'Designing an intuitive booking flow',
			'Ensuring accessibility and responsiveness',
		],
	},

	'seret-streaming-movie': {
		title: 'Seret Streaming Movie Platform',
		description:
			'Modern movie streaming platform with video player, subscriptions, and multi-language support',
		longDescription:
			'Built a Netflix-style movie streaming platform with smooth animations and a built-in video player. The platform supports smart search, filters, subscription plans, and multi-language support including English, Russian, and Turkmen. Movies are fully playable using optimized mock data, making the platform usable even without a backend.',
		image: '/seret.png',
		tags: ['React', 'TypeScript', 'Tailwind CSS', 'i18n'],
		date: 'March 2025',
		liveUrl: 'https://seret-phi.vercel.app/',
		githubUrl: 'https://github.com/Myratgeldiyev/Seret',
		features: [
			'Built-in video player',
			'Search and filter functionality',
			'Multi-language support',
			'Subscription plans UI',
			'Smooth animations and transitions',
		],
		challenges: [
			'Building a realistic streaming experience without backend',
			'Optimizing video playback performance',
			'Managing multi-language UI state',
		],
	},

	chulba: {
		title: 'Chulba Landing Page',
		description:
			'Modern landing page for showcasing digital platforms and startups',
		longDescription:
			'Designed and developed a modern landing page to showcase digital platforms and startup products. The page focuses on clean UI, high performance, and scalability. Built with modern frontend technologies and optimized for conversions and user engagement.',
		image: '/chulba.png',
		tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
		date: 'April 2025',
		liveUrl: 'https://chulba-landing.vercel.app/',
		githubUrl: 'https://github.com/Myratgeldiyev/chulba-landing',
		features: [
			'Clean and modern UI design',
			'Responsive layout',
			'Smooth animations',
			'SEO-friendly structure',
			'High performance optimization',
		],
		challenges: [
			'Balancing visuals with performance',
			'Creating reusable UI components',
			'Optimizing animations for smooth UX',
		],
	},

	'hytayda-oka': {
		title: 'Hytayda Oka – Study in China Platform',
		description: 'Study in China platform for international students',
		longDescription:
			'Developed a Study in China platform that helps international students find universities, explore academic programs, and apply with confidence. The platform provides clear guidance, structured information, and a smooth application flow from discovery to enrollment.',
		image: '/hytayda-oka.png',
		tags: ['React', 'REST API', 'Tailwind CSS'],
		date: 'October 2025',
		liveUrl: 'https://hytayda-oka.vercel.app/',
		githubUrl: 'https://github.com/Myratgeldiyev/HytaydaOKA',
		features: [
			'University and program listings',
			'Structured application guidance',
			'Student-friendly UI',
			'Responsive design',
			'Scalable content structure',
		],
		challenges: [
			'Organizing complex educational data',
			'Designing a clear user journey',
			'Ensuring clarity for international students',
		],
	},
}

export default function ProjectDetailPage() {
	const params = useParams()
	const slug = params.slug as string
	const project = projectsData[slug]

	if (!project) {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<div className='text-center'>
					<h1 className='mb-4 text-2xl font-bold'>Project not found</h1>
					<Link href='/projects'>
						<Button variant='outline'>Back to Projects</Button>
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen'>
			<Navigation />

			<div className='mx-auto max-w-5xl px-4 py-20'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<Link
						href='/projects'
						className='mb-8 inline-flex items-center gap-2 text-cyan-400 transition-colors hover:text-cyan-300'
					>
						<ArrowLeft className='h-4 w-4' />
						Back to Projects
					</Link>

					<h1 className='mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'>
						{project.title}
					</h1>

					<div className='mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
						<span className='flex items-center gap-2'>
							<Calendar className='h-4 w-4' />
							{project.date}
						</span>
						<span className='flex items-center gap-2'>
							<Tag className='h-4 w-4' />
							{project.tags.length} Technologies
						</span>
					</div>

					<div className='mb-8 flex flex-wrap gap-4'>
						<a href={project.liveUrl} target='_blank' rel='noopener noreferrer'>
							<Button className='group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'>
								<ExternalLink className='mr-2 h-4 w-4' />
								Live Demo
							</Button>
						</a>
						<a
							href={project.githubUrl}
							target='_blank'
							rel='noopener noreferrer'
						>
							<Button
								variant='outline'
								className='group border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10'
							>
								<Github className='mr-2 h-4 w-4' />
								View Code
							</Button>
						</a>
					</div>
				</motion.div>

				{/* Hero Image */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6 }}
					className='mb-12 overflow-hidden rounded-2xl border border-cyan-500/10'
				>
					<img
						src={project.image || '/placeholder.svg'}
						alt={project.title}
						className='h-auto w-full'
					/>
				</motion.div>

				<div className='grid gap-8 lg:grid-cols-3'>
					{/* Main Content */}
					<div className='lg:col-span-2'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.6 }}
							className='space-y-8'
						>
							{/* Description */}
							<div className='rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-8 backdrop-blur-sm'>
								<h2 className='mb-4 text-2xl font-bold'>Overview</h2>
								<p className='text-muted-foreground leading-relaxed'>
									{project.longDescription}
								</p>
							</div>

							{/* Features */}
							<div className='rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-8 backdrop-blur-sm'>
								<h2 className='mb-4 text-2xl font-bold'>Key Features</h2>
								<ul className='space-y-3'>
									{project.features.map((feature: string, index: number) => (
										<motion.li
											key={index}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.4 + index * 0.1 }}
											className='flex items-start gap-3'
										>
											<span className='mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600' />
											<span className='text-muted-foreground'>{feature}</span>
										</motion.li>
									))}
								</ul>
							</div>

							{/* Challenges */}
							<div className='rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-8 backdrop-blur-sm'>
								<h2 className='mb-4 text-2xl font-bold'>
									Challenges & Solutions
								</h2>
								<ul className='space-y-3'>
									{project.challenges.map(
										(challenge: string, index: number) => (
											<motion.li
												key={index}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: 0.5 + index * 0.1 }}
												className='flex items-start gap-3'
											>
												<span className='mt-1 text-cyan-400'>•</span>
												<span className='text-muted-foreground'>
													{challenge}
												</span>
											</motion.li>
										)
									)}
								</ul>
							</div>
						</motion.div>
					</div>

					{/* Sidebar */}
					<div className='lg:col-span-1'>
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.4, duration: 0.6 }}
							className='sticky top-24 space-y-6'
						>
							{/* Tech Stack */}
							<div className='rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-6 backdrop-blur-sm'>
								<h3 className='mb-4 font-bold'>Tech Stack</h3>
								<div className='flex flex-wrap gap-2'>
									{project.tags.map((tag: string) => (
										<span
											key={tag}
											className='rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400'
										>
											{tag}
										</span>
									))}
								</div>
							</div>

							{/* Project Info */}
							<div className='rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-6 backdrop-blur-sm'>
								<h3 className='mb-4 font-bold'>Project Info</h3>
								<div className='space-y-3 text-sm'>
									<div>
										<p className='text-muted-foreground'>Date</p>
										<p className='font-medium'>{project.date}</p>
									</div>
									<div>
										<p className='text-muted-foreground'>Role</p>
										<p className='font-medium'>Full Stack Developer</p>
									</div>
									<div>
										<p className='text-muted-foreground'>Status</p>
										<p className='font-medium text-green-400'>Live</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	)
}
