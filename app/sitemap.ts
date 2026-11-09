import { projects } from '@/content/profile'
import { siteUrl } from '@/lib/site'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: siteUrl, changeFrequency: 'monthly', priority: 1 },
		...projects.map(p => ({
			url: `${siteUrl}/projects/${p.slug}`,
			changeFrequency: 'yearly' as const,
			priority: 0.7,
		})),
	]
}
