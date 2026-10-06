import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { locales } from "@/content/types";
import { dictionaries } from "@/content/dictionary";
import { site } from "@/content/site";
import { dirOf, isLocale } from "@/lib/i18n";
import "../globals.css";

const vazir = localFont({
  src: "../fonts/Vazirmatn-Variable.woff2",
  variable: "--font-vazir",
  weight: "100 900",
  display: "swap",
});

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = dictionaries[lang].meta;
  return {
    metadataBase: new URL(site.url),
    title: d.title,
    description: d.description,
    alternates: { canonical: `/${lang}`, languages: { fa: "/fa", en: "/en" } },
    openGraph: { title: d.title, description: d.description, type: "website", locale: lang === "fa" ? "fa_IR" : "en_US" },
  };
}

/** Sets html.motion before first paint so intro elements don't flash. */
const motionScript = `try{if(matchMedia('(prefers-reduced-motion: no-preference)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

export default async function RootLayout({ children, params }: Params & { children: React.ReactNode }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      dir={dirOf(lang)}
      className={`${GeistSans.variable} ${GeistMono.variable} ${vazir.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
