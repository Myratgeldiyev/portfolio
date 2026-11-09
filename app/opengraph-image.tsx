import { profile } from '@/content/profile'
import { ImageResponse } from 'next/og'

export const alt = `${profile.name} — ${profile.title}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: 80,
					background: '#141519',
					color: '#efede8',
					fontFamily: 'sans-serif',
				}}
			>
				<div style={{ display: 'flex', fontSize: 28, color: '#9a9ca5' }}>
					yunus<span style={{ color: '#f0954e' }}>.</span>m
				</div>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>{profile.name}</div>
					<div style={{ fontSize: 40, color: '#9a9ca5', marginTop: 12 }}>{profile.title}</div>
				</div>
				<div style={{ display: 'flex', gap: 16, fontSize: 24, color: '#9a9ca5' }}>
					<span>TypeScript</span>
					<span style={{ color: '#f0954e' }}>·</span>
					<span>React / Next.js</span>
					<span style={{ color: '#f0954e' }}>·</span>
					<span>Node / NestJS</span>
					<span style={{ color: '#f0954e' }}>·</span>
					<span>Mobile</span>
				</div>
			</div>
		),
		size,
	)
}
