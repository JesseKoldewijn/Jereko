import { locales, matchedLang } from "@/utils/i18n";

import { type NextRequest } from "next/server";

const getLocale = (req: Request) => {
  const cookieLang = req.headers
    .get("cookie")
    ?.match(/NEXT_LOCALE=(.*?)(?:;|$)/)?.[1];
  const requestLang = req.headers.get("accept-language");

  return matchedLang(cookieLang ?? requestLang ?? "en-US");
};

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
