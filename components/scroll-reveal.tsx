'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/** Marks [data-reveal] elements as revealed the first time they scroll into view. */
export function ScrollReveal() {
	const pathname = usePathname()

	useEffect(() => {
		const elements = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])')
		const show = (el: Element) => el.setAttribute('data-revealed', '')

		if (!('IntersectionObserver' in window)) {
			elements.forEach(show)
			return
		}

		const observer = new IntersectionObserver(
			entries => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue
					show(entry.target)
					observer.unobserve(entry.target)
				}
			},
			{ rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
		)
		elements.forEach(el => observer.observe(el))
		return () => observer.disconnect()
	}, [pathname])

	return null
}
