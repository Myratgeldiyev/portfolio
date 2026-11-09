import type { CSSProperties } from 'react'

/**
 * Props that make an element fade up when it scrolls into view.
 * `step` staggers siblings: each step adds 80ms of delay.
 * The animation itself lives in globals.css; <ScrollReveal /> triggers it.
 */
export function reveal(step = 0) {
	return {
		'data-reveal': '',
		style: { '--reveal-delay': `${step * 80}ms` } as CSSProperties,
	}
}
