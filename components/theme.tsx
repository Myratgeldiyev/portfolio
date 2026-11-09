'use client'

import { Moon, Sun } from 'lucide-react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { useSyncExternalStore, type ReactNode } from 'react'

const noopSubscribe = () => () => {}

export function ThemeProvider({ children }: { children: ReactNode }) {
	return (
		<NextThemesProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
			{children}
		</NextThemesProvider>
	)
}

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme()
	// The theme is only known on the client; render a stable placeholder on the server.
	const mounted = useSyncExternalStore(
		noopSubscribe,
		() => true,
		() => false,
	)

	const isDark = mounted && resolvedTheme === 'dark'

	return (
		<button
			type='button'
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
			className='grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-subtle hover:text-fg'
		>
			{mounted ? isDark ? <Sun className='size-4' /> : <Moon className='size-4' /> : <span className='size-4' />}
		</button>
	)
}
