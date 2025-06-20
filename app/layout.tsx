import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
// import { GeistMono } from "geist/font/mono"
// const font = GeistMono({
//   subsets: ['latin'],
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
// })

export const metadata: Metadata = {
  title: "Dynamic City Explorer + ISS Tracker",
  description: "Explore random cities worldwide with live ISS tracking",
  generator: "v0.dev",
}
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <html lang="en" className={`${GeistMono.className} dark`}>
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab" rel="stylesheet" />
      </head>
      <body className=" bg-black text-white min-h-screen">{children}</body>
      <SpeedInsights />
    </html>
  )
}
