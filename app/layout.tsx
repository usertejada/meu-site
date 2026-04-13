import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DNACody — Desenvolvedor Full Stack',
  description: 'Desenvolvedor Full Stack especialista em sites, sistemas web e landing pages profissionais.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}