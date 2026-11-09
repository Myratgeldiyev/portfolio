import { expect, test } from '@playwright/test'

test('home page shows the right person and all sections', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Yunus Myratgeldiyev')
	await expect(page).toHaveTitle(/Yunus Myratgeldiyev/)
	for (const title of ['A bit about me', 'Where I have worked', 'Selected work', "Let's work together"]) {
		await expect(page.getByRole('heading', { name: title })).toBeVisible()
	}
	await expect(page.locator('body')).not.toContainText(/Alex Chen|example\.com\/|v0\.app/)
})

test('project cards open their detail page', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('link', { name: /Ziya/ }).first().click()
	await expect(page).toHaveURL(/\/projects\/ziya$/)
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Ziya')
	await page.getByRole('link', { name: 'All projects' }).click()
	await expect(page).toHaveURL(/\/#projects$/)
})

test('unknown project returns 404', async ({ page }) => {
	const res = await page.goto('/projects/does-not-exist')
	expect(res?.status()).toBe(404)
	await expect(page.getByText("This page doesn't exist.")).toBeVisible()
})

test('contact form validates and submits', async ({ page }) => {
	let body: Record<string, string> | undefined
	await page.route('**/api/contact', async route => {
		body = route.request().postDataJSON()
		await route.fulfill({ status: 200, json: { ok: true } })
	})

	await page.goto('/#contact')
	const form = page.getByRole('form', { name: 'Contact form' })
	await form.getByRole('button', { name: 'Send message' }).click()
	await expect(form.getByText('Please enter your name')).toBeVisible()

	await form.getByLabel('Name').fill('Playwright')
	await form.getByLabel('Email').fill('bot@test.dev')
	await form.getByLabel('Message').fill('Hello from the smoke test!')
	await form.getByRole('button', { name: 'Send message' }).click()

	await expect(page.getByText('Message sent — thank you!')).toBeVisible()
	expect(body).toMatchObject({ name: 'Playwright', email: 'bot@test.dev', website: '' })
})

test('contact form shows server errors', async ({ page }) => {
	await page.route('**/api/contact', route =>
		route.fulfill({ status: 429, json: { error: 'Too many messages. Please try again in a few minutes.' } }),
	)
	await page.goto('/#contact')
	const form = page.getByRole('form', { name: 'Contact form' })
	await form.getByLabel('Name').fill('Playwright')
	await form.getByLabel('Email').fill('bot@test.dev')
	await form.getByLabel('Message').fill('Hello from the smoke test!')
	await form.getByRole('button', { name: 'Send message' }).click()
	await expect(form.getByRole('alert')).toHaveText(/Too many messages/)
})

test('theme toggle switches between light and dark', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'light' })
	await page.goto('/')
	const html = page.locator('html')
	await expect(html).not.toHaveClass(/dark/)
	await page.getByRole('button', { name: 'Switch to dark theme' }).click()
	await expect(html).toHaveClass(/dark/)
	await page.getByRole('button', { name: 'Switch to light theme' }).click()
	await expect(html).not.toHaveClass(/dark/)
})

test('SEO files are served', async ({ request }) => {
	expect((await request.get('/robots.txt')).ok()).toBe(true)
	const sitemap = await (await request.get('/sitemap.xml')).text()
	expect(sitemap).toContain('/projects/ziya')
	const og = await request.get('/opengraph-image')
	expect(og.headers()['content-type']).toContain('image/png')
})
