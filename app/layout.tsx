import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

import { GeistMono } from "geist/font/mono"

export const metadata: Metadata = {
  title: "Dynamic City Explorer + ISS Tracker",
  description: "Explore random cities worldwide with live ISS tracking",
  generator: "v0.dev",
}
import { SpeedInsights } from "@vercel/speed-insights/next"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistMono.className} dark`}>
      <body className=" bg-black text-white min-h-screen">
        <Header />
        {children}
        <Footer />
      </body>
      <SpeedInsights />
    </html>
  )
}
