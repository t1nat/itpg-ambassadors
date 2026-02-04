import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, COOKIES, type SupportedLocale } from "@/lib/config/constants";

/**
 * Check if a string is a supported locale
 */
function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

/**
 * Middleware for handling locale-based routing
 * - Redirects requests without locale prefix to the appropriate locale
 * - Respects user's saved locale preference from cookie
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, Next.js internals, and API routes
  if (pathname.includes(".") || pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Check if pathname already has a valid locale prefix
  const pathnameHasLocale = SUPPORTED_LOCALES.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Get saved locale from cookie, or use default
  const cookieLocale = request.cookies.get(COOKIES.locale)?.value;
  const locale = cookieLocale && isSupportedLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;

  // Redirect to locale-prefixed URL
  const url = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
