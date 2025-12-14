'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
	return (
		<div className='relative min-h-screen overflow-hidden'>
			{/* Animated background gradient */}
			<div className='absolute inset-0 bg-gradient-to-br from-blue-600/10 via-background to-cyan-600/10 animate-gradient-shift' />

			{/* Animated particles */}
			<div className='absolute inset-0 overflow-hidden'>
				{[...Array(20)].map((_, i) => (
					<motion.div
						key={i}
						className='absolute h-1 w-1 rounded-full bg-cyan-400/30'
						animate={{
							x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
							y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
						}}
						transition={{
							duration: Math.random() * 10 + 20,
							repeat: Number.POSITIVE_INFINITY,
							ease: 'linear',
						}}
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
					/>
				))}
			</div>

			<div className='relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-center'
				>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2, type: 'spring' }}
						className='mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 backdrop-blur-sm'
					>
						<Sparkles className='h-4 w-4 text-cyan-400' />
						<span className='text-sm text-cyan-400'>Available for work</span>
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.8 }}
						className='mb-4 text-5xl font-bold tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl'
					>
						Hi, I'm{' '}
						<span className='bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>
							Yunus Myratgeldiyev
						</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5, duration: 0.8 }}
						className='mb-2 text-xl text-muted-foreground sm:text-2xl md:text-3xl'
					>
						Frontend Developer
					</motion.p>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6, duration: 0.8 }}
						className='mx-auto mb-12 max-w-2xl text-lg text-muted-foreground text-balance'
					>
						Crafting beautiful, accessible, and performant web experiences with
						modern technologies
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8, duration: 0.8 }}
						className='flex flex-col gap-4 sm:flex-row sm:justify-center'
					>
						<Link href='/projects'>
							<Button
								size='lg'
								className='group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700'
							>
								View Projects
								<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
							</Button>
						</Link>
						<Link href='/contact'>
							<Button
								size='lg'
								variant='outline'
								className='group border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm hover:bg-cyan-500/10'
							>
								Contact Me
								<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
							</Button>
						</Link>
					</motion.div>
				</motion.div>

				{/* Scroll indicator */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.5 }}
					className='absolute bottom-8'
				>
					<motion.div
						animate={{ y: [0, 10, 0] }}
						transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
						className='h-12 w-6 rounded-full border-2 border-cyan-500/30 p-1'
					>
						<motion.div
							animate={{ y: [0, 16, 0] }}
							transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
							className='h-2 w-2 rounded-full bg-cyan-500'
						/>
					</motion.div>
				</motion.div>
			</div>
		</div>
	)
}
