import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['bg', 'en', 'de', 'fr', 'es', 'it', 'pl', 'ro', 'cs', 'sk', 'sl', 'hr', 'sr', 'mk', 'al', 'me']
const defaultLocale = 'bg'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) {
    // Path already has locale, continue
    return NextResponse.next()
  }

  // Path doesn't have locale, redirect to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
  }

  // For other paths, redirect to default locale + path
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
  ],
}