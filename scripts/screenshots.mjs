// Re-captures screenshots of projects that have a live URL.
// Usage: npm run screenshots
// Uses Playwright's Chromium if installed, otherwise the local Google Chrome.
import { chromium } from '@playwright/test'
import { readFile } from 'node:fs/promises'

// Read slugs + live URLs straight from content/profile.ts without a TS loader.
const source = await readFile(new URL('../content/profile.ts', import.meta.url), 'utf8')
const targets = [...source.matchAll(/slug: '([^']+)'[\s\S]*?(?=slug: '|$)/g)]
	.map(([block, slug]) => ({ slug, url: block.match(/liveUrl: '([^']+)'/)?.[1] }))
	.filter(t => t.url)

const browser = await chromium.launch().catch(() => chromium.launch({ channel: 'chrome' }))
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })

for (const { slug, url } of targets) {
	try {
		await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 })
		await page.waitForTimeout(1500) // let entrance animations finish
		await page.screenshot({ path: `public/projects/${slug}.png` })
		console.log(`✓ ${slug}  ${url}`)
	} catch (err) {
		console.warn(`✗ ${slug}  ${url}  (${err.message.split('\n')[0]})`)
	}
}

await browser.close()
