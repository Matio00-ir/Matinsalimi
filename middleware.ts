import { NextResponse, type NextRequest } from "next/server";
import { locales } from "@/content/types";
import { LOCALE_COOKIE, defaultLocale, isLocale } from "@/lib/i18n";

/** Redirect locale-less paths to /fa or /en: saved choice → Accept-Language → default. */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  const accept = req.headers.get("accept-language") ?? "";
  const locale = isLocale(saved) ? saved : /^en\b/i.test(accept.trim()) ? "en" : defaultLocale;

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
