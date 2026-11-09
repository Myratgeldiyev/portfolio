import { ContactForm } from '@/components/contact-form'
import { socialIcons } from '@/components/icons'
import { ProjectCard } from '@/components/project-card'
import { ButtonLink, Section, Tag } from '@/components/ui'
import { education, experience, profile, projects } from '@/content/profile'
import { reveal } from '@/lib/reveal'
import { Download, Mail, MapPin } from 'lucide-react'
import { existsSync } from 'node:fs'
import path from 'node:path'

// Show the CV button only when public/cv.pdf exists (checked at build time).
const hasCv = existsSync(path.join(process.cwd(), 'public', profile.cvUrl))

export default function HomePage() {
	const featured = projects.filter(p => p.featured)
	const others = projects.filter(p => !p.featured)
	const socials = profile.socials.filter(s => s.href)

	return (
		<div className='mx-auto max-w-3xl px-5'>
			{/* Hero */}
			<section className='pb-12 pt-20 sm:pb-16 sm:pt-28' aria-label='Introduction'>
				<p className='reveal flex items-center gap-2 font-mono text-xs text-muted'>
					<span className='relative flex size-2'>
						<span className='absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60' />
						<span className='relative inline-flex size-2 rounded-full bg-success' />
					</span>
					Open to internships and full-time roles
				</p>
				<h1 className='reveal mt-6 text-4xl font-semibold tracking-tight [animation-delay:60ms] sm:text-6xl'>
					{profile.name}
				</h1>
				<p className='reveal mt-3 text-xl text-muted [animation-delay:120ms] sm:text-2xl'>{profile.title}</p>
				<p className='reveal mt-6 max-w-xl text-pretty leading-relaxed [animation-delay:180ms]'>{profile.headline}</p>
				<div className='reveal mt-8 flex flex-wrap items-center gap-3 [animation-delay:240ms]'>
					<ButtonLink href='/#projects'>View projects</ButtonLink>
					{hasCv && (
						<ButtonLink href={profile.cvUrl} variant='ghost' target='_blank' download>
							<Download className='size-4' />
							Download CV
						</ButtonLink>
					)}
					<ul className='ml-1 flex items-center gap-1'>
						{socials.map(s => {
							const Icon = socialIcons[s.label]
							return (
								<li key={s.label}>
									<a
										href={s.href}
										target='_blank'
										rel='noopener noreferrer'
										aria-label={s.label}
										className='grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-subtle hover:text-fg'
									>
										{Icon && <Icon className='size-[18px]' />}
									</a>
								</li>
							)
						})}
					</ul>
				</div>
			</section>

			{/* About */}
			<Section id='about' label='01 — About' title='A bit about me'>
				<div className='space-y-4 leading-relaxed text-pretty'>
					{profile.about.map((p, i) => (
						<p key={p.slice(0, 24)} {...reveal(i)}>
							{p}
						</p>
					))}
				</div>
				<dl className='mt-10 grid gap-6 sm:grid-cols-2'>
					{Object.entries(profile.skills).map(([group, items], i) => (
						<div key={group} {...reveal(i % 2)}>
							<dt className='mb-2 font-mono text-xs uppercase tracking-wider text-muted'>{group}</dt>
							<dd className='flex flex-wrap gap-1.5'>
								{items.map(s => (
									<Tag key={s}>{s}</Tag>
								))}
							</dd>
						</div>
					))}
				</dl>
			</Section>

			{/* Experience */}
			<Section id='experience' label='02 — Experience' title='Where I have worked'>
				<ol className='space-y-10'>
					{experience.map(item => (
						<li key={`${item.company}-${item.period}`} {...reveal()} className='grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6'>
							<p className='pt-0.5 font-mono text-xs text-muted'>{item.period}</p>
							<div>
								<h3 className='font-medium'>
									{item.role} <span className='text-muted'>· {item.company}</span>
								</h3>
								<p className='mt-2 text-sm leading-relaxed text-muted'>{item.summary}</p>
								{item.highlights.length > 0 && (
									<ul className='mt-3 space-y-1.5 text-sm'>
										{item.highlights.map(h => (
											<li key={h} className='flex gap-2'>
												<span aria-hidden='true' className='text-accent'>
													→
												</span>
												{h}
											</li>
										))}
									</ul>
								)}
							</div>
						</li>
					))}
				</ol>

				<h3 {...reveal()} className='mb-6 mt-16 font-mono text-xs uppercase tracking-[0.2em] text-muted'>
					Education
				</h3>
				<ol className='space-y-8'>
					{education.map(item => (
						<li key={item.school} {...reveal()} className='grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6'>
							<p className='pt-0.5 font-mono text-xs text-muted'>{item.period}</p>
							<div>
								<p className='font-medium'>
									{item.degree} <span className='text-muted'>· {item.school}</span>
								</p>
								<p className='mt-2 text-sm leading-relaxed text-muted'>{item.summary}</p>
								{item.highlights && (
									<p className='mt-2 flex flex-wrap gap-1.5'>
										{item.highlights.map(h => (
											<Tag key={h}>{h}</Tag>
										))}
									</p>
								)}
							</div>
						</li>
					))}
				</ol>
			</Section>

			{/* Projects */}
			<Section id='projects' label='03 — Projects' title='Selected work'>
				<div className='grid gap-12 sm:grid-cols-2 sm:gap-x-8'>
					{featured.map((p, i) => (
						<ProjectCard key={p.slug} project={p} {...reveal(i % 2)} />
					))}
				</div>
				{others.length > 0 && (
					<>
						<h3 {...reveal()} className='mb-6 mt-16 font-mono text-xs uppercase tracking-[0.2em] text-muted'>
							More projects
						</h3>
						<div className='grid gap-12 sm:grid-cols-2 sm:gap-x-8'>
							{others.map((p, i) => (
								<ProjectCard key={p.slug} project={p} {...reveal(i % 2)} />
							))}
						</div>
					</>
				)}
			</Section>

			{/* Contact */}
			<Section id='contact' label='04 — Contact' title="Let's work together">
				<div className='grid gap-10 sm:grid-cols-[1fr_1.6fr]'>
					<div {...reveal()} className='space-y-4 text-sm'>
						<p className='leading-relaxed text-muted'>
							Have a role, a project or just a question? Send a message and it lands straight in my inbox.
						</p>
						<a href={`mailto:${profile.email}`} className='flex items-center gap-2 hover:text-accent'>
							<Mail className='size-4 text-muted' />
							{profile.email}
						</a>
						<p className='flex items-center gap-2'>
							<MapPin className='size-4 text-muted' />
							{profile.location}
						</p>
					</div>
					<div {...reveal(1)}>
						<ContactForm />
					</div>
				</div>
			</Section>
		</div>
	)
}
