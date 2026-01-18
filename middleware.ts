import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['bg', 'en', 'de', 'fr', 'es', 'it', 'pl', 'ro', 'cs', 'sk', 'sl', 'hr', 'sr', 'mk', 'al', 'me']
const defaultLocale = 'bg'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.includes('.') || pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // ПРОМЯНА: Вземи записания език от бисквитката, ако съществува
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  const locale = locales.includes(cookieLocale || '') ? cookieLocale : defaultLocale

  const url = new URL(`/${locale}${pathname}`, request.url)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}