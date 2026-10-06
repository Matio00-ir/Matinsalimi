"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import type { Locale } from "@/content/types";
import { dictionaries, type Dictionary } from "@/content/dictionary";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface SiteContext {
  locale: Locale;
  dict: Dictionary;
  /** True once the boot sequence has finished (or was skipped). */
  ready: boolean;
  markReady: () => void;
  reducedMotion: boolean;
  scrollTo: (target: string | number) => void;
  setScrollLocked: (locked: boolean) => void;
}

const Ctx = createContext<SiteContext | null>(null);

export function SiteProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [ready, setReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // One scroll system: Lenis drives the wheel, GSAP's ticker drives Lenis, ScrollTrigger listens.
  // Touch keeps native scrolling (Lenis default), reduced motion keeps native everything.
  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({ lerp: 0.095, wheelMultiplier: 0.9 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (document.documentElement.classList.contains("is-booting")) lenis.stop();
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  // Fonts change line boxes; re-measure every trigger once they're in.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  const scrollTo = useCallback(
    (target: string | number) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
        return;
      }
      if (typeof target === "number") window.scrollTo({ top: target, behavior: reducedMotion ? "auto" : "smooth" });
      else document.querySelector(target)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    },
    [reducedMotion],
  );

  const setScrollLocked = useCallback((locked: boolean) => {
    document.documentElement.classList.toggle("is-booting", locked);
    if (locked) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, []);

  const markReady = useCallback(() => setReady(true), []);

  const value = useMemo<SiteContext>(
    () => ({ locale, dict: dictionaries[locale], ready, markReady, reducedMotion, scrollTo, setScrollLocked }),
    [locale, ready, markReady, reducedMotion, scrollTo, setScrollLocked],
  );

  return (
    <Ctx.Provider value={value}>
      <a className="skip-link" href="#main">
        {value.dict.nav.skip}
      </a>
      {children}
    </Ctx.Provider>
  );
}

export function useSite() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}
