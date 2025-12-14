'use client'

import { Navigation } from '@/components/navigation'
import { motion } from 'framer-motion'
import { BookOpen, GraduationCap } from 'lucide-react'

const education = [
	{
		degree: 'Bachelor of Science in Computer Science',
		school: 'Hangzhou Normal University',
		period: '2025 - 2029',
		description:
			'Focused on web development, software engineering, and data structures.',
	},
	{
		degree: 'Chinese Language Program',
		school: 'Zhejiang university of technology',
		period: '2024-2025',
		description:
			'Intensive one year program learned chinese language efficiently.',
		achievements: ['HSK4 certificate', 'Improved chinese language from zero '],
	},
]

export default function EducationPage() {
	return (
		<div className='min-h-screen'>
			<Navigation />

			<div className='mx-auto max-w-4xl px-4 py-20'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className='mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'>
						Education
					</h1>
					<p className='mb-12 max-w-3xl text-lg text-muted-foreground text-balance'>
						My academic background and continuous learning journey
					</p>
				</motion.div>

				{/* Education Timeline */}
				<div className='mb-16 space-y-8'>
					{education.map((edu, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.2, duration: 0.6 }}
							className='relative'
						>
							<motion.div
								whileHover={{ scale: 1.01 }}
								className='group rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/10'
							>
								<div className='mb-4 flex items-start gap-4'>
									<div className='rounded-full border border-cyan-500/20 bg-cyan-500/10 p-3'>
										<GraduationCap className='h-6 w-6 text-cyan-400' />
									</div>
									<div className='flex-1'>
										<h3 className='mb-1 text-xl font-bold text-balance'>
											{edu.degree}
										</h3>
										<p className='mb-2 text-cyan-400'>{edu.school}</p>
										<p className='text-sm text-muted-foreground'>
											{edu.period}
										</p>
									</div>
								</div>

								<p className='mb-4 text-muted-foreground leading-relaxed'>
									{edu.description}
								</p>

								<div>
									<ul className='space-y-1'>
										{edu.achievements && edu.achievements.length > 0 && (
											<div>
												<ul className='space-y-1'>
													{edu.achievements.map((achievement, i) => (
														<li
															key={i}
															className='flex items-start gap-2 text-sm text-muted-foreground'
														>
															<span className='text-cyan-400'>•</span>
															<span>{achievement}</span>
														</li>
													))}
												</ul>
											</div>
										)}
									</ul>
								</div>
							</motion.div>
						</motion.div>
					))}
				</div>

				{/* Continuous Learning */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='mt-16'
				>
					<div className='rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-8 backdrop-blur-sm'>
						<div className='mb-4 flex items-center gap-3'>
							<BookOpen className='h-6 w-6 text-cyan-400' />
							<h2 className='text-2xl font-bold'>Continuous Learning</h2>
						</div>
						<p className='text-muted-foreground leading-relaxed'>
							I believe in lifelong learning and staying up-to-date with the
							latest web development trends. I regularly take online courses,
							attend webinars, and contribute to open-source projects to enhance
							my skills and give back to the community.
						</p>
					</div>
				</motion.div>
			</div>
		</div>
	)
}
