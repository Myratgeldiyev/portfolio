'use client'

import type React from 'react'

import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { CheckCircle2, Mail, MapPin, Send, XCircle } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	})
	const [status, setStatus] = useState<
		'idle' | 'loading' | 'success' | 'error'
	>('idle')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setStatus('loading')

		try {
			// Initialize EmailJS with your public key
			emailjs.init(
				process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
			)

			await emailjs.send(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
				{
					from_name: formData.name,
					from_email: formData.email,
					message: formData.message,
				}
			)

			setStatus('success')
			setFormData({ name: '', email: '', message: '' })
			setTimeout(() => setStatus('idle'), 5000)
		} catch (error) {
			setStatus('error')
			setTimeout(() => setStatus('idle'), 5000)
		}
	}

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
						Get In Touch
					</h1>
					<p className='mb-12 max-w-3xl text-lg text-muted-foreground text-balance'>
						Have a project in mind or just want to chat? Feel free to reach out!
					</p>
				</motion.div>

				<div className='grid gap-8 lg:grid-cols-2'>
					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2, duration: 0.6 }}
					>
						<div className='rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-8 backdrop-blur-sm'>
							<h2 className='mb-6 text-2xl font-bold'>Send a Message</h2>

							<form onSubmit={handleSubmit} className='space-y-6'>
								<div>
									<label
										htmlFor='name'
										className='mb-2 block text-sm font-medium'
									>
										Name
									</label>
									<Input
										id='name'
										type='text'
										required
										value={formData.name}
										onChange={e =>
											setFormData({ ...formData, name: e.target.value })
										}
										className='border-cyan-500/20 bg-background/50 focus:border-cyan-500'
										placeholder='Your name'
									/>
								</div>

								<div>
									<label
										htmlFor='email'
										className='mb-2 block text-sm font-medium'
									>
										Email
									</label>
									<Input
										id='email'
										type='email'
										required
										value={formData.email}
										onChange={e =>
											setFormData({ ...formData, email: e.target.value })
										}
										className='border-cyan-500/20 bg-background/50 focus:border-cyan-500'
										placeholder='your@email.com'
									/>
								</div>

								<div>
									<label
										htmlFor='message'
										className='mb-2 block text-sm font-medium'
									>
										Message
									</label>
									<Textarea
										id='message'
										required
										rows={6}
										value={formData.message}
										onChange={e =>
											setFormData({ ...formData, message: e.target.value })
										}
										className='border-cyan-500/20 bg-background/50 focus:border-cyan-500 resize-none'
										placeholder='Tell me about your project...'
									/>
								</div>

								<Button
									type='submit'
									disabled={status === 'loading'}
									className='group w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
								>
									{status === 'loading' ? (
										'Sending...'
									) : (
										<>
											Send Message
											<Send className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
										</>
									)}
								</Button>

								{/* Status Messages */}
								{status === 'success' && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className='flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-green-400'
									>
										<CheckCircle2 className='h-5 w-5' />
										<span>Message sent successfully!</span>
									</motion.div>
								)}

								{status === 'error' && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className='flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400'
									>
										<XCircle className='h-5 w-5' />
										<span>Failed to send message. Please try again.</span>
									</motion.div>
								)}
							</form>
						</div>
					</motion.div>

					{/* Contact Info */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className='space-y-6'
					>
						<div className='rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-8 backdrop-blur-sm'>
							<h2 className='mb-6 text-2xl font-bold'>Contact Information</h2>

							<div className='space-y-6'>
								<motion.div
									whileHover={{ x: 5 }}
									className='flex items-start gap-4'
								>
									<div className='rounded-full border border-cyan-500/20 bg-cyan-500/10 p-3'>
										<Mail className='h-5 w-5 text-cyan-400' />
									</div>
									<div>
										<p className='mb-1 font-medium'>Email</p>
										<a
											href='mailto:deluxlos06@example.com'
											className='text-muted-foreground hover:text-cyan-400 transition-colors'
										>
											deluxlos06@example.com
										</a>
									</div>
								</motion.div>

								<motion.div
									whileHover={{ x: 5 }}
									className='flex items-start gap-4'
								>
									<div className='rounded-full border border-cyan-500/20 bg-cyan-500/10 p-3'>
										<MapPin className='h-5 w-5 text-cyan-400' />
									</div>
									<div>
										<p className='mb-1 font-medium'>Location</p>
										<p className='text-muted-foreground'>Hangzhou, China</p>
									</div>
								</motion.div>
							</div>
						</div>

						<div className='rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-8 backdrop-blur-sm'>
							<h2 className='mb-4 text-2xl font-bold'>Let's Work Together</h2>
							<p className='text-muted-foreground leading-relaxed'>
								I'm always interested in hearing about new projects and
								opportunities. Whether you have a question or just want to say
								hi, I'll try my best to get back to you!
							</p>
						</div>

						<div className='rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-8 backdrop-blur-sm'>
							<h2 className='mb-4 text-2xl font-bold'>Response Time</h2>
							<p className='text-muted-foreground leading-relaxed'>
								I typically respond within 24-48 hours. For urgent inquiries,
								please mention it in your message and I'll prioritize getting
								back to you.
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	)
}
