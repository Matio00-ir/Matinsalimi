"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { LOCALE_COOKIE } from "@/lib/i18n";
import { ScrollTrigger } from "@/lib/motion";
import s from "./Nav.module.css";

const SECTIONS = ["work", "capabilities", "about"] as const;
type SectionId = (typeof SECTIONS)[number];

export function Nav() {
  const { dict, locale, scrollTo, setScrollLocked } = useSite();
  const [active, setActive] = useState<SectionId | null>(null);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLSpanElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const other = locale === "fa" ? "en" : "fa";

  // Scroll progress (whole document).
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (bar.current) bar.current.style.transform = `scaleX(${self.progress.toFixed(4)})`;
      },
    });
    return () => st.kill();
  }, []);

  // Active section = whichever crosses the viewport middle.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as SectionId);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const top = document.getElementById("top");
    const ioTop = new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), { rootMargin: "-50% 0px -50% 0px" });
    if (top) ioTop.observe(top);
    return () => {
      io.disconnect();
      ioTop.disconnect();
    };
  }, []);

  // Mobile menu: lock scroll, Escape to close, move focus in.
  useEffect(() => {
    if (!open) return;
    setScrollLocked(true);
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      setScrollLocked(false);
    };
  }, [open, setScrollLocked]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    // Let the menu release the scroll lock before travelling.
    requestAnimationFrame(() => scrollTo(`#${id}`));
  };

  const rememberLocale = () => {
    document.cookie = `${LOCALE_COOKIE}=${other};path=/;max-age=31536000;samesite=lax`;
  };

  return (
    <>
      <header className={s.nav} data-open={open || undefined}>
        <span ref={bar} className={s.progress} aria-hidden="true" />
        <div className={`${s.inner} container`}>
          <a href="#top" className={s.mark} onClick={(e) => go(e, "top")} aria-label="Matin Salimi — top">
            <span className="latin">MATIN SALIMI</span>
            <span className={s.dot} aria-hidden="true" />
          </a>

          <nav className={s.links} aria-label="Primary">
            {SECTIONS.map((id, i) => (
              <a key={id} href={`#${id}`} onClick={(e) => go(e, id)} className={s.link} aria-current={active === id ? "true" : undefined}>
                <span className={`${s.num} mono`}>{String(i + 1).padStart(2, "0")}</span>
                {dict.nav[id]}
              </a>
            ))}
          </nav>

          <div className={s.end}>
            <a href={`/${other}`} hrefLang={other} onClick={rememberLocale} className={`${s.lang} mono`}>
              {other === "fa" ? "FA" : "EN"}
            </a>
            <button
              type="button"
              className={`${s.menuBtn} mono`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? dict.nav.close : dict.nav.menu}
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={s.sheet} data-open={open || undefined} aria-hidden={!open} inert={!open || undefined}>
        <nav className="container" aria-label="Mobile">
          {SECTIONS.map((id, i) => (
            <a
              key={id}
              ref={i === 0 ? firstLink : undefined}
              href={`#${id}`}
              onClick={(e) => go(e, id)}
              className={s.sheetLink}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={`${s.num} mono`}>{String(i + 1).padStart(2, "0")}</span>
              <span>{dict.nav[id]}</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
