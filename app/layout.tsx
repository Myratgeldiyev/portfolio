import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import type React from 'react'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Yunus Myratgeldiyev - Frontend Developer Portfolio',
	description:
		'Frontend Developer specializing in React, Next.js, and modern web technologies. View my projects and get in touch.',
	generator: 'v0.app',
	keywords: [
		'frontend developer',
		'web developer',
		'React',
		'Next.js',
		'TypeScript',
		'portfolio',
	],
	authors: [{ name: 'Yunus Myratgeldiyev' }],
	icons: {},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className='dark'>
			<body className={`font-sans antialiased`}>
				{children}
				<Analytics />
			</body>
		</html>
	)
}
