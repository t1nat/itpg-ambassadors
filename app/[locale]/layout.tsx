// app/[locale]/layout.tsx

import { Geist, Geist_Mono } from "next/font/google"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { PageTransition } from "@/components/animations/page-transition"
import { ScrollProgress } from "@/components/animations/scroll-progress"
import { CustomCursor } from "@/components/animations/custom-cursor"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
})

interface RootLayoutProps {
  children: React.ReactNode;
  // ПРОМЯНА: Правим locale незадължителен с '?'
  params: Promise<{ locale?: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  // ПРОМЯНА: Даваме стойност по подразбиране 'bg', ако locale липсва
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'bg';

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <CustomCursor />
        <ScrollProgress />
        <div className="flex min-h-screen flex-col">
          {/* Navigation now includes GoogleTranslate inline */}
          <Navigation />
          <main className="flex-1 pt-16">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}