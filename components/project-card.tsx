import { Tag } from '@/components/ui'
import type { Project } from '@/content/profile'
import { cn } from '@/lib/utils'
import { ArrowUpRight, Lock } from 'lucide-react'
import type { ComponentProps } from 'react'
import Image from 'next/image'
import Link from 'next/link'

/** Screenshot if we have one, otherwise a typographic cover. */
export function ProjectCover({ project, className, priority }: { project: Project; className?: string; priority?: boolean }) {
	return (
		<div className={cn(
				'relative aspect-[16/10] overflow-hidden rounded-xl border bg-subtle transition-[translate,box-shadow] duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_-20px_rgb(0_0_0/0.35)]',
				className,
			)}>
			{project.image ? (
				<Image
					src={project.image}
					alt={`${project.title} screenshot`}
					fill
					priority={priority}
					sizes='(min-width: 768px) 720px, 100vw'
					className='object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]'
				/>
			) : (
				<div className='absolute inset-0 flex flex-col justify-between p-6 sm:p-8'>
					<div
						aria-hidden='true'
						className='absolute inset-0 opacity-60 [background-image:radial-gradient(var(--line)_1px,transparent_1px)] [background-size:18px_18px]'
					/>
					<div
						aria-hidden='true'
						className='absolute -right-16 -top-16 size-56 rounded-full bg-accent/15 blur-3xl transition-transform duration-700 group-hover:scale-125'
					/>
					<p className='relative font-mono text-xs text-muted'>{project.year}</p>
					<div className='relative'>
						<p className='text-3xl font-semibold tracking-tight sm:text-4xl'>{project.title}</p>
						<p className='mt-2 font-mono text-xs text-muted'>{project.stack.slice(0, 4).join(' · ')}</p>
					</div>
				</div>
			)}
		</div>
	)
}

export function ProjectCard({ project, className, ...props }: { project: Project } & ComponentProps<'article'>) {
	return (
		<article className={cn('group relative', className)} {...props}>
			<Link href={`/projects/${project.slug}`} className='block'>
				<ProjectCover project={project} />
				<div className='mt-4 flex items-start justify-between gap-4'>
					<div>
						<h3 className='flex items-center gap-2 font-medium'>
							{project.title}
							{project.isPrivate && <Lock className='size-3.5 text-muted' aria-label='Private code' />}
						</h3>
						<p className='mt-1 text-sm text-muted'>{project.tagline}</p>
					</div>
					<ArrowUpRight className='mt-0.5 size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent' />
				</div>
			</Link>
			<ul className='mt-3 flex flex-wrap gap-1.5' aria-label='Tech stack'>
				{project.stack.slice(0, 5).map(t => (
					<li key={t}>
						<Tag>{t}</Tag>
					</li>
				))}
			</ul>
		</article>
	)
}
