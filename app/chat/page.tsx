'use client'

import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import emailjs from '@emailjs/browser'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Send, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Message {
	id: string
	text: string
	sender: 'user' | 'bot'
	timestamp: Date
}

export default function ChatPage() {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: '1',
			text: "Hi! I'm Yunus's assistant. How can I help you today?",
			sender: 'bot',
			timestamp: new Date(),
		},
	])
	const [inputValue, setInputValue] = useState('')
	const [isTyping, setIsTyping] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages, isTyping])

	const sendToEmail = async (message: string) => {
		try {
			emailjs.init(
				process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
			)

			await emailjs.send(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
				process.env.NEXT_PUBLIC_EMAILJS_CHAT_TEMPLATE_ID ||
					'YOUR_CHAT_TEMPLATE_ID',
				{
					message: message,
					timestamp: new Date().toLocaleString(),
				}
			)
		} catch (error) {
			console.error('Failed to send email:', error)
		}
	}

	const handleSend = async () => {
		if (!inputValue.trim()) return

		const userMessage: Message = {
			id: Date.now().toString(),
			text: inputValue,
			sender: 'user',
			timestamp: new Date(),
		}

		setMessages(prev => [...prev, userMessage])
		setInputValue('')
		setIsTyping(true)

		// Send to EmailJS
		await sendToEmail(inputValue)

		// Simulate bot response
		setTimeout(() => {
			const botMessage: Message = {
				id: (Date.now() + 1).toString(),
				text: "Thanks for your message! I've forwarded it to Yunus. He'll get back to you via email soon!",
				sender: 'bot',
				timestamp: new Date(),
			}
			setMessages(prev => [...prev, botMessage])
			setIsTyping(false)
		}, 1500)
	}

	return (
		<div className='min-h-screen flex flex-col'>
			<Navigation />

			<div className='mx-auto w-full max-w-4xl flex-1 px-4 py-8'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='mb-6'
				>
					<h1 className='mb-2 text-3xl font-bold'>Chat</h1>
					<p className='text-sm text-muted-foreground'>
						Send me a message and I'll get back to you via email
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
					className='flex h-[600px] flex-col rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 backdrop-blur-sm'
				>
					{/* Messages */}
					<div className='flex-1 space-y-4 overflow-y-auto p-6'>
						<AnimatePresence mode='popLayout'>
							{messages.map(message => (
								<motion.div
									key={message.id}
									initial={{ opacity: 0, y: 20, scale: 0.8 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.3 }}
									className={`flex gap-3 ${
										message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
									}`}
								>
									<div
										className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
											message.sender === 'user'
												? 'border-blue-500/20 bg-blue-500/10'
												: 'border-cyan-500/20 bg-cyan-500/10'
										}`}
									>
										{message.sender === 'user' ? (
											<User className='h-4 w-4 text-blue-400' />
										) : (
											<Bot className='h-4 w-4 text-cyan-400' />
										)}
									</div>

									<div
										className={`max-w-[70%] space-y-1 ${
											message.sender === 'user' ? 'items-end' : 'items-start'
										}`}
									>
										<div
											className={`rounded-2xl px-4 py-2 ${
												message.sender === 'user'
													? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
													: 'border border-cyan-500/20 bg-background/50'
											}`}
										>
											<p className='text-sm leading-relaxed'>{message.text}</p>
										</div>
										<p className='px-2 text-xs text-muted-foreground'>
											{message.timestamp.toLocaleTimeString([], {
												hour: '2-digit',
												minute: '2-digit',
											})}
										</p>
									</div>
								</motion.div>
							))}
						</AnimatePresence>

						{/* Typing Indicator */}
						{isTyping && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								className='flex gap-3'
							>
								<div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/10'>
									<Bot className='h-4 w-4 text-cyan-400' />
								</div>
								<div className='flex items-center gap-1 rounded-2xl border border-cyan-500/20 bg-background/50 px-4 py-2'>
									<motion.div
										animate={{ scale: [1, 1.2, 1] }}
										transition={{
											duration: 1,
											repeat: Number.POSITIVE_INFINITY,
											delay: 0,
										}}
										className='h-2 w-2 rounded-full bg-cyan-400'
									/>
									<motion.div
										animate={{ scale: [1, 1.2, 1] }}
										transition={{
											duration: 1,
											repeat: Number.POSITIVE_INFINITY,
											delay: 0.2,
										}}
										className='h-2 w-2 rounded-full bg-cyan-400'
									/>
									<motion.div
										animate={{ scale: [1, 1.2, 1] }}
										transition={{
											duration: 1,
											repeat: Number.POSITIVE_INFINITY,
											delay: 0.4,
										}}
										className='h-2 w-2 rounded-full bg-cyan-400'
									/>
								</div>
							</motion.div>
						)}

						<div ref={messagesEndRef} />
					</div>

					{/* Input */}
					<div className='border-t border-cyan-500/10 p-4'>
						<form
							onSubmit={e => {
								e.preventDefault()
								handleSend()
							}}
							className='flex gap-2'
						>
							<Input
								value={inputValue}
								onChange={e => setInputValue(e.target.value)}
								placeholder='Type your message...'
								className='flex-1 border-cyan-500/20 bg-background/50 focus:border-cyan-500'
							/>
							<Button
								type='submit'
								size='icon'
								className='shrink-0 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
							>
								<Send className='h-4 w-4' />
							</Button>
						</form>
					</div>
				</motion.div>
			</div>
		</div>
	)
}
