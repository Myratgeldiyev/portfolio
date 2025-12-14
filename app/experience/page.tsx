'use client'

import { Navigation } from '@/components/navigation'
import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'

const experiences = [
	{
		title: 'Frontend Intern',
		company: 'Startup Company',
		period: 'Dec 2023 - May 2024',
		description:
			'Building modern web applications using React, Next.js, and TypeScript. Collaborated with design and backend teams to deliver pixel-perfect, performant user interfaces.',
		achievements: [
			'Improved website performance by 40% through code optimization',
			'Led the migration from CRA to Next.js',
			'Mentored 2 junior developers',
		],
	},
	{
		title: 'Frontend Developer',
		company: 'Galkyn company',
		period: 'June 2024 - Nov 2024',
		description:
			'Developed responsive web applications and implemented new features. Worked closely with UX designers to create intuitive user interfaces.',
		achievements: [
			'Reduced bug count by 30% through better testing',
			'Implemented design system components',
		],
	},
	{
		title: 'Frontend Developer',
		company: 'Freelancer',
		period: 'Dec 2024 - Present',
		description:
			'Assisted in building client websites and learned best practices for modern web development. Gained hands-on experience with React and modern frontend tooling.',
		achievements: [
			'Completed 3 client projects successfully',
			'Improved knowledges about React, TypeScript, and Tailwind CSS',
		],
	},
]

export default function ExperiencePage() {
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
						Experience
					</h1>
					<p className='mb-12 max-w-3xl text-lg text-muted-foreground text-balance'>
						My professional journey in frontend development
					</p>
				</motion.div>

				<div className='relative'>
					{/* Timeline line */}
					<div className='absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-cyan-500 md:left-1/2' />

					<div className='space-y-12'>
						{experiences.map((exp, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.2, duration: 0.6 }}
								className={`relative flex flex-col md:flex-row ${
									index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
								} gap-8`}
							>
								{/* Timeline dot */}
								<div className='absolute left-8 top-0 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-background bg-gradient-to-r from-cyan-500 to-blue-600 md:left-1/2' />

								{/* Content */}
								<div
									className={`ml-20 md:ml-0 md:w-1/2 ${
										index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
									}`}
								>
									<motion.div
										whileHover={{ scale: 1.02 }}
										className='group rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/10'
									>
										<div className='mb-4 flex items-start justify-between'>
											<div>
												<h3 className='mb-1 text-xl font-bold text-balance'>
													{exp.title}
												</h3>
												<p className='mb-2 flex items-center gap-2 text-cyan-400'>
													<Briefcase className='h-4 w-4' />
													{exp.company}
												</p>
												<p className='flex items-center gap-2 text-sm text-muted-foreground'>
													<Calendar className='h-4 w-4' />
													{exp.period}
												</p>
											</div>
										</div>

										<p className='mb-4 text-muted-foreground leading-relaxed'>
											{exp.description}
										</p>

										<div>
											<p className='mb-2 text-sm font-semibold'>
												Key Achievements:
											</p>
											<ul className='space-y-1'>
												{exp.achievements.map((achievement, i) => (
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
									</motion.div>
								</div>

								<div className='hidden md:block md:w-1/2' />
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
