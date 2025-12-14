'use client'

import { Navigation } from '@/components/navigation'
import { motion } from 'framer-motion'
import { Code2, Coffee, Heart, Palette, Rocket, Users } from 'lucide-react'

const skills = [
	{ name: 'React', level: 90 },
	{ name: 'TypeScript', level: 85 },
	{ name: 'Next.js', level: 88 },
	{ name: 'Tailwind CSS', level: 92 },
	{ name: 'Framer Motion', level: 80 },
	{ name: 'JavaScript', level: 90 },
	{ name: 'C', level: 70 },
	{ name: 'HTML', level: 100 },
	{ name: 'CSS', level: 100 },
]

const interests = [
	{ icon: Code2, label: 'Clean Code', color: 'text-blue-400' },
	{ icon: Palette, label: 'UI Design', color: 'text-cyan-400' },
	{ icon: Rocket, label: 'Performance', color: 'text-blue-500' },
	{ icon: Users, label: 'Collaboration', color: 'text-cyan-500' },
	{ icon: Heart, label: 'Open Source', color: 'text-blue-400' },
	{ icon: Coffee, label: 'Coffee Lover', color: 'text-cyan-400' },
]

export default function AboutPage() {
	return (
		<div className='min-h-screen'>
			<Navigation />

			<div className='mx-auto max-w-6xl px-4 py-20'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className='mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'>
						About Me
					</h1>
					<p className='mb-12 max-w-3xl text-lg text-muted-foreground text-balance'>
						Passionate about creating exceptional digital experiences
					</p>
				</motion.div>

				<div className='grid gap-8 lg:grid-cols-2'>
					{/* Bio section */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className='space-y-6'
					>
						<div className='rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-8 backdrop-blur-sm'>
							<h2 className='mb-4 text-2xl font-bold'>Who I Am</h2>
							<p className='mb-4 text-muted-foreground leading-relaxed'>
								I'm a frontend developer with a passion for creating beautiful,
								accessible, and performant web applications. With over 2 years
								of experience, I specialize in React, Next.js, and modern web
								technologies.
							</p>
							<p className='text-muted-foreground leading-relaxed'>
								I believe in writing clean, maintainable code and creating user
								experiences that delight. When I'm not coding, you'll find me
								exploring new technologies, contributing to open source, or
								enjoying a good cup of coffee.
							</p>
						</div>

						{/* Interests */}
						<div className='rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-8 backdrop-blur-sm'>
							<h2 className='mb-6 text-2xl font-bold'>Interests</h2>
							<div className='grid grid-cols-2 gap-4'>
								{interests.map((interest, index) => (
									<motion.div
										key={interest.label}
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 0.3 + index * 0.1 }}
										className='flex items-center gap-3 rounded-lg border border-cyan-500/10 bg-background/50 p-4'
									>
										<interest.icon className={`h-5 w-5 ${interest.color}`} />
										<span className='text-sm font-medium'>
											{interest.label}
										</span>
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>

					{/* Skills section */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className='space-y-6'
					>
						<div className='rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-8 backdrop-blur-sm'>
							<h2 className='mb-6 text-2xl font-bold'>Skills</h2>
							<div className='space-y-6'>
								{skills.map((skill, index) => (
									<div key={skill.name}>
										<div className='mb-2 flex items-center justify-between'>
											<span className='font-medium'>{skill.name}</span>
											<span className='text-sm text-muted-foreground'>
												{skill.level}%
											</span>
										</div>
										<div className='h-2 overflow-hidden rounded-full bg-secondary'>
											<motion.div
												initial={{ width: 0 }}
												animate={{ width: `${skill.level}%` }}
												transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
												className='h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600'
											/>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Fun facts */}
						<div className='rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-8 backdrop-blur-sm'>
							<h2 className='mb-4 text-2xl font-bold'>Fun Facts</h2>
							<ul className='space-y-3 text-muted-foreground'>
								<li className='flex items-start gap-2'>
									<span className='text-cyan-400'>▸</span>
									<span>I've built over 50+ projects in the past 2 years</span>
								</li>
								<li className='flex items-start gap-2'>
									<span className='text-cyan-400'>▸</span>
									<span>
										Can debug CSS for hours without getting frustrated
									</span>
								</li>
								<li className='flex items-start gap-2'>
									<span className='text-cyan-400'>▸</span>
									<span>My ideal workspace has at least 2 monitors</span>
								</li>
								<li className='flex items-start gap-2'>
									<span className='text-cyan-400'>▸</span>
									<span>I'm always learning something new every week</span>
								</li>
							</ul>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	)
}
