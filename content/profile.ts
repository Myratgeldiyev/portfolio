/**
 * All site content lives here. Edit this file to update the portfolio.
 * Entries marked `TODO` still hold placeholder text and should be replaced
 * with real information.
 */

export type Social = {
	label: string
	href: string
}

export type Experience = {
	role: string
	company: string
	period: string
	summary: string
	highlights: string[]
}

export type Education = {
	degree: string
	school: string
	period: string
	summary: string
	highlights?: string[]
}

export type Project = {
	slug: string
	title: string
	tagline: string
	description: string
	year: string
	role: string
	stack: string[]
	features: string[]
	image?: string
	liveUrl?: string
	repoUrl?: string
	/** Code is private (client/company work or not published yet). */
	isPrivate?: boolean
	featured?: boolean
}

export const profile = {
	name: 'Yunus Myratgeldiyev',
	shortName: 'Yunus',
	title: 'Software Engineer',
	location: 'Hangzhou, China',
	email: 'deluxlos06@gmail.com',
	headline:
		'I build web and mobile products end to end — from typed APIs and databases to interfaces people enjoy using.',
	// TODO: rewrite in your own words.
	about: [
		'I am a software engineer from Turkmenistan, studying Computer Science at Hangzhou Normal University. I started with frontend work in React and Next.js and have since moved across the stack: NestJS and Spring Boot APIs, PostgreSQL and MySQL databases, and native Android and React Native apps.',
		'I care about clean, typed code, interfaces that feel fast, and shipping things that real people use. I speak Turkmen, Russian, English and Chinese (HSK 4).',
	],
	skills: {
		Frontend: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
		Backend: ['Node.js', 'NestJS', 'Spring Boot', 'REST APIs', 'Zod'],
		Data: ['PostgreSQL', 'MySQL', 'Drizzle ORM', 'Supabase', 'Firebase'],
		Mobile: ['React Native / Expo', 'Android (Java)'],
		Tooling: ['Git', 'Docker', 'GitHub Actions', 'Railway', 'Vercel'],
	} as Record<string, string[]>,
	cvUrl: '/cv.pdf',
	socials: [
		{ label: 'GitHub', href: 'https://github.com/Myratgeldiyev' },
		// TODO: add your LinkedIn and Telegram links (empty links are hidden).
		{ label: 'LinkedIn', href: '' },
		{ label: 'Telegram', href: '' },
	] satisfies Social[],
}

export const experience: Experience[] = [
	{
		role: 'Freelance Software Engineer',
		company: 'Self-employed',
		period: 'Dec 2024 — Present',
		// TODO: replace with real clients and results.
		summary:
			'Building websites and web apps for clients, from landing pages to full-stack platforms.',
		highlights: [
			'Delivered the Chulba company landing page',
			'Building Ziya, a full-stack platform for students applying to Chinese universities',
		],
	},
	{
		role: 'Frontend Developer',
		company: 'Galkyn', // TODO: confirm company name
		period: 'Jun 2024 — Nov 2024',
		// TODO: replace with what you actually built there.
		summary:
			'Developed responsive web applications and new product features together with designers.',
		highlights: ['TODO: add a concrete achievement', 'TODO: add a concrete achievement'],
	},
	{
		role: 'Frontend Intern',
		company: 'TODO: company name',
		period: 'Dec 2023 — May 2024',
		// TODO: replace with what you actually did.
		summary: 'Built UI components with React, Next.js and TypeScript.',
		highlights: ['TODO: add a concrete achievement'],
	},
]

export const education: Education[] = [
	{
		degree: 'B.Sc. in Computer Science',
		school: 'Hangzhou Normal University',
		period: '2025 — 2029',
		summary: 'Software engineering, data structures and algorithms, web development.',
	},
	{
		degree: 'Chinese Language Program',
		school: 'Zhejiang University of Technology',
		period: '2024 — 2025',
		summary: 'One-year intensive Chinese language program.',
		highlights: ['HSK 4 certificate'],
	},
]

export const projects: Project[] = [
	{
		slug: 'ziya',
		title: 'Ziya',
		tagline: 'Full-stack platform for students applying to Chinese universities',
		description:
			'A multilingual (Turkmen / Russian / English) platform where students in Turkmenistan search Chinese university programs, upload their documents and track applications. Built as a monorepo with a Next.js frontend, a NestJS API and Zod schemas shared between both.',
		year: '2026',
		role: 'Full-stack — product, design, API, database, deployment',
		stack: ['Next.js', 'NestJS', 'Fastify', 'PostgreSQL', 'Drizzle ORM', 'Zod', 'S3', 'next-intl', 'Docker'],
		features: [
			'Program search across Chinese universities',
			'Secure document uploads to private S3 storage with presigned URLs',
			'Application tracking for students',
			'Three languages with next-intl',
			'Shared, typed validation between web and API',
		],
		isPrivate: true,
		featured: true,
	},
	{
		slug: 'tizvagt',
		title: 'Tizvagt',
		tagline: 'Native Android e-commerce app with a Spring Boot API',
		description:
			'A full-stack e-commerce application: a native Android client written in Java and a Spring Boot REST API backed by MySQL, with JWT authentication and database migrations.',
		year: '2026',
		role: 'Android and backend',
		stack: ['Java 17', 'Android', 'MVVM', 'Hilt', 'Retrofit', 'Room', 'Spring Boot', 'Spring Security', 'MySQL', 'Flyway', 'Docker'],
		features: [
			'MVVM architecture with Jetpack (ViewModel, LiveData, Navigation, Room)',
			'Spring Boot REST API with JWT authentication',
			'MySQL schema managed by Flyway migrations',
			'Docker Compose dev environment and GitHub Actions CI',
		],
		repoUrl: 'https://github.com/Myratgeldiyev/tizvagt',
		featured: true,
	},
	{
		slug: 'yolugry',
		title: 'Yolugry',
		tagline: 'Production web app with real-time features',
		// TODO: describe what Yolugry does and what you built.
		description:
			'A production Next.js application with multi-language support, real-time updates over WebSockets, Firebase integration and error monitoring with Sentry, shipped with Docker.',
		year: '2024',
		role: 'Frontend developer',
		stack: ['Next.js', 'TypeScript', 'next-intl', 'Zustand', 'SWR', 'WebSocket', 'Firebase', 'Sentry', 'Docker'],
		features: [
			'Real-time updates over WebSockets',
			'Internationalization with next-intl',
			'Phone authentication with Firebase',
			'Error monitoring with Sentry',
		],
		isPrivate: true,
		featured: true,
	},
	{
		slug: 'haka-livestream',
		title: 'Haka Live',
		tagline: 'Live streaming mobile app built with React Native',
		// TODO: confirm features.
		description:
			'A cross-platform live streaming app built with Expo and React Native. Users sign in with Google, watch and host live streams powered by Agora, and interact through animated gifts.',
		year: '2026',
		role: 'Mobile developer',
		stack: ['React Native', 'Expo', 'TypeScript', 'Agora', 'Zustand', 'Reanimated', 'Node.js'],
		features: [
			'Live video streaming with Agora',
			'Google sign-in',
			'Animated gifts with SVGA and Lottie',
			'File-based routing with Expo Router',
		],
		repoUrl: 'https://github.com/Myratgeldiyev/Haka-Livestream',
		featured: true,
	},
	{
		slug: 'seret',
		title: 'Seret',
		tagline: 'Movie streaming web app',
		description:
			'A movie streaming web app with a working video player, search and filters, and support for English, Russian and Turkmen. Authentication, payments and subscriptions are simulated with mock data.',
		year: '2025',
		role: 'Frontend developer',
		stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Radix UI'],
		features: [
			'Built-in video player',
			'Smart search and filters',
			'Three languages (EN / RU / TM)',
			'Simulated auth, payments and subscription plans',
		],
		image: '/projects/seret.png',
		liveUrl: 'https://seret-phi.vercel.app',
		repoUrl: 'https://github.com/Myratgeldiyev/Seret',
	},
	{
		slug: 'healthcare-clinic',
		title: 'Healthcare Clinic',
		tagline: 'Clinic website with appointment booking',
		description:
			'A clinic website where patients book appointments, manage their profile and chat with the clinic. Uses mock backend logic, Zustand for state and smooth Framer Motion animations.',
		year: '2025',
		role: 'Frontend developer',
		stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Framer Motion'],
		features: [
			'Appointment booking flow',
			'Patient profiles and authentication',
			'Chat interface',
			'Animated, responsive UI',
		],
		image: '/projects/healthcare-clinic.png',
		liveUrl: 'https://healthcare-clinic-hazel.vercel.app',
		repoUrl: 'https://github.com/Myratgeldiyev/Healthcare-clinic',
	},
	{
		slug: 'grocery-delivery',
		title: 'Grocery Delivery',
		tagline: 'E-commerce storefront for grocery delivery',
		description:
			'A responsive grocery delivery storefront with categories, product pages and a cart, built on a reusable component system.',
		year: '2025',
		role: 'Frontend developer',
		stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Radix UI'],
		features: [
			'Product catalog with categories',
			'Shopping cart',
			'Reusable component system',
			'Mobile-first layout',
		],
		image: '/projects/grocery-delivery.png',
		liveUrl: 'https://grocery-delivery-nu.vercel.app',
		repoUrl: 'https://github.com/Myratgeldiyev/grocery-delivery',
	},
	{
		slug: 'chulba',
		title: 'Chulba',
		tagline: 'Landing page for a cement company',
		description:
			'A fast, responsive landing page for the Chulba cement company, built as client work.',
		year: '2025',
		role: 'Frontend developer',
		stack: ['HTML', 'CSS', 'JavaScript'],
		features: ['Responsive layout', 'Fast static delivery'],
		image: '/projects/chulba.png',
		liveUrl: 'https://chulba-landing.vercel.app',
		repoUrl: 'https://github.com/Myratgeldiyev/chulba-landing',
	},
]

export function getProject(slug: string): Project | undefined {
	return projects.find(p => p.slug === slug)
}
