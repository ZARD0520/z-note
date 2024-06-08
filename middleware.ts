import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import i18n from './i18n/config'

import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

function getLocale(request: NextRequest): string | undefined {
  const locales: any = i18n.locales
  const headers: Record<string, string> = {}
  request.headers.forEach((value, key) => headers[key] = value)
  const languages = new Negotiator({
    headers
  }).languages(locales)

  return match(languages, locales, i18n.defaultLocale)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameNoLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameNoLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
    )
  }

}

export const config = {
  matcher:["/((?!api|_next/static|_next/image|images/|favicon.ico|public/).*)"]
}