import { SiteFooter } from '@/components/site-footer'
import { ScrollReveal } from '@/components/scroll-reveal'
import { SiteHeader } from '@/components/site-header'
import { ThemeProvider } from '@/components/theme'
import { profile } from '@/content/profile'
import { siteUrl } from '@/lib/site'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import type { ReactNode } from 'react'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

const description = `${profile.name} — ${profile.title} based in ${profile.location}. ${profile.headline}`

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: `${profile.name} — ${profile.title}`,
		template: `%s — ${profile.name}`,
	},
	description,
	applicationName: profile.name,
	authors: [{ name: profile.name, url: siteUrl }],
	creator: profile.name,
	keywords: [
		profile.name,
		'software engineer',
		'full-stack developer',
		'React',
		'Next.js',
		'TypeScript',
		'NestJS',
		'Spring Boot',
		'React Native',
		'portfolio',
	],
	alternates: { canonical: '/' },
	openGraph: {
		type: 'website',
		url: siteUrl,
		siteName: profile.name,
		title: `${profile.name} — ${profile.title}`,
		description,
		locale: 'en_US',
	},
	twitter: {
		card: 'summary_large_image',
		title: `${profile.name} — ${profile.title}`,
		description,
	},
	robots: { index: true, follow: true },
}

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#fbfaf8' },
		{ media: '(prefers-color-scheme: dark)', color: '#141519' },
	],
}

const personJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: profile.name,
	jobTitle: profile.title,
	url: siteUrl,
	email: `mailto:${profile.email}`,
	address: { '@type': 'PostalAddress', addressLocality: 'Hangzhou', addressCountry: 'CN' },
	alumniOf: { '@type': 'CollegeOrUniversity', name: 'Hangzhou Normal University' },
	sameAs: profile.socials.filter(s => s.href).map(s => s.href),
}

const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL
const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
			<body className='flex min-h-dvh flex-col'>
				<ThemeProvider>
					<a
						href='#main'
						className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg'
					>
						Skip to content
					</a>
					<SiteHeader />
					<ScrollReveal />
					<main id='main' className='flex-1'>
						{children}
					</main>
					<SiteFooter />
				</ThemeProvider>
				<script
					type='application/ld+json'
					// JSON-LD must be inlined; content is static and comes from our own file.
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
				/>
				{umamiUrl && umamiId && (
					<Script defer src={`${umamiUrl.replace(/\/$/, '')}/script.js`} data-website-id={umamiId} strategy='afterInteractive' />
				)}
			</body>
		</html>
	)
}
