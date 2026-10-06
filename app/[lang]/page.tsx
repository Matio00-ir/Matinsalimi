import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { SiteProvider } from "@/components/providers/SiteProvider";
import { Loader } from "@/components/chrome/Loader";
import { Nav } from "@/components/chrome/Nav";
import { Cursor } from "@/components/chrome/Cursor";
import { Footer } from "@/components/chrome/Footer";
import { Hero } from "@/components/sections/hero/Hero";
import { Process } from "@/components/sections/process/Process";
import { Work } from "@/components/sections/work/Work";
import { Capabilities } from "@/components/sections/capabilities/Capabilities";
import { About } from "@/components/sections/about/About";
import { Contact } from "@/components/sections/contact/Contact";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <SiteProvider locale={lang}>
      <Loader />
      <Cursor />
      <Nav />
      <main id="main">
        <Hero />
        <Process />
        <Work />
        <Capabilities />
        <About />
        <Contact />
      </main>
      <Footer />
    </SiteProvider>
  );
}
