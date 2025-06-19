import type React from "react"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dynamic City Explorer + ISS Tracker",
  description: "Explore random cities worldwide with live ISS tracking",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistMono.className} dark`}>
      <body className="font-mono antialiased bg-black text-white min-h-screen">{children}</body>
    </html>
  )
}
