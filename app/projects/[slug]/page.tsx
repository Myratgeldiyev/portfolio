import { GitHubIcon } from '@/components/icons'
import { ProjectCover } from '@/components/project-card'
import { ButtonLink, Tag } from '@/components/ui'
import { getProject, projects } from '@/content/profile'
import { ArrowLeft, ArrowUpRight, Lock } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
	return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const project = getProject(slug)
	if (!project) return {}
	return {
		title: project.title,
		description: project.tagline,
		alternates: { canonical: `/projects/${project.slug}` },
		openGraph: { title: project.title, description: project.tagline },
	}
}

export default async function ProjectPage({ params }: Props) {
	const { slug } = await params
	const project = getProject(slug)
	if (!project) notFound()

	const index = projects.findIndex(p => p.slug === project.slug)
	const next = projects[(index + 1) % projects.length]

	return (
		<article className='mx-auto max-w-3xl px-5 pb-20 pt-10'>
			<Link href='/#projects' className='inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg'>
				<ArrowLeft className='size-4' />
				All projects
			</Link>

			<header className='reveal mt-10'>
				<p className='font-mono text-xs text-muted'>{project.year}</p>
				<h1 className='mt-3 text-4xl font-semibold tracking-tight sm:text-5xl'>{project.title}</h1>
				<p className='mt-3 text-lg text-muted'>{project.tagline}</p>
				<div className='mt-6 flex flex-wrap items-center gap-3'>
					{project.liveUrl && (
						<ButtonLink href={project.liveUrl} target='_blank' rel='noopener noreferrer'>
							Live site
							<ArrowUpRight className='size-4' />
						</ButtonLink>
					)}
					{project.repoUrl && (
						<ButtonLink href={project.repoUrl} target='_blank' rel='noopener noreferrer' variant='ghost'>
							<GitHubIcon className='size-4' />
							Source code
						</ButtonLink>
					)}
					{project.isPrivate && (
						<span className='inline-flex items-center gap-2 text-sm text-muted'>
							<Lock className='size-4' />
							Private code — happy to walk through it in an interview
						</span>
					)}
				</div>
			</header>

			<ProjectCover project={project} priority className='reveal mt-10 [animation-delay:100ms]' />

			<div className='mt-12 grid gap-10 sm:grid-cols-[1fr_12rem]'>
				<div>
					<h2 className='font-mono text-xs uppercase tracking-[0.2em] text-accent'>Overview</h2>
					<p className='mt-4 leading-relaxed text-pretty'>{project.description}</p>

					<h2 className='mt-10 font-mono text-xs uppercase tracking-[0.2em] text-accent'>Highlights</h2>
					<ul className='mt-4 space-y-2'>
						{project.features.map(f => (
							<li key={f} className='flex gap-2'>
								<span aria-hidden='true' className='text-accent'>
									→
								</span>
								{f}
							</li>
						))}
					</ul>
				</div>
				<aside className='space-y-6 text-sm'>
					<div>
						<h2 className='mb-2 font-mono text-xs uppercase tracking-wider text-muted'>Role</h2>
						<p>{project.role}</p>
					</div>
					<div>
						<h2 className='mb-2 font-mono text-xs uppercase tracking-wider text-muted'>Stack</h2>
						<ul className='flex flex-wrap gap-1.5'>
							{project.stack.map(t => (
								<li key={t}>
									<Tag>{t}</Tag>
								</li>
							))}
						</ul>
					</div>
				</aside>
			</div>

			{next && next.slug !== project.slug && (
				<nav aria-label='Next project' className='mt-20 border-t pt-8'>
					<Link href={`/projects/${next.slug}`} className='group flex items-center justify-between'>
						<span>
							<span className='block font-mono text-xs text-muted'>Next project</span>
							<span className='mt-1 block text-xl font-medium group-hover:text-accent'>{next.title}</span>
						</span>
						<ArrowUpRight className='size-5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent' />
					</Link>
				</nav>
			)}
		</article>
	)
}
