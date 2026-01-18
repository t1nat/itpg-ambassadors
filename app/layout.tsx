import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ITPG Ambassadors",
  description: "EP Ambassador Program at ITPG „Acad. Blagovest Sendov\"",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}