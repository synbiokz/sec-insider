import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEC Insider',
  description: 'Insider trading analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta 
          httpEquiv="Content-Security-Policy" 
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:;" 
        />
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}