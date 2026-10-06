import { locales, type L10n, type Locale } from "@/content/types";

export const defaultLocale: Locale = "fa";
export const LOCALE_COOKIE = "locale";

export const isLocale = (v: string | undefined): v is Locale => !!v && (locales as readonly string[]).includes(v);

export const dirOf = (locale: Locale) => (locale === "fa" ? "rtl" : "ltr");

/** Pick the active translation. */
export const t = (value: L10n, locale: Locale) => value[locale];

const faDigits = "۰۱۲۳۴۵۶۷۸۹";
/** Zero-padded index, localized digits: 3 -> "03" / "۰۳". */
export function pad(n: number, locale: Locale, width = 2) {
  const s = String(n).padStart(width, "0");
  return locale === "fa" ? s.replace(/\d/g, (d) => faDigits[+d]) : s;
}
