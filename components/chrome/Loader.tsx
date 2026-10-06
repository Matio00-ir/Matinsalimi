"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { gsap, ease } from "@/lib/motion";
import s from "./Loader.module.css";

const SESSION_KEY = "matin:booted";
const MIN_MS = 1100;

/**
 * Short boot sequence, first visit per session only. Never blocks longer than
 * fonts take to load (plus a short minimum so it reads as intentional).
 */
export function Loader() {
  const { dict, markReady, setScrollLocked } = useSite();
  const [mounted, setMounted] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduce) {
      setMounted(false);
      markReady();
      return;
    }

    let cancelled = false;
    setScrollLocked(true);
    const progress = { v: 0 };
    const render = () => {
      if (count.current) count.current.textContent = String(Math.round(progress.v)).padStart(3, "0");
      if (bar.current) bar.current.style.transform = `scaleX(${progress.v / 100})`;
    };

    const ctx = gsap.context(() => {
      const fill = gsap.to(progress, { v: 86, duration: MIN_MS / 1000, ease: "power2.out", onUpdate: render });
      const fonts = document.fonts?.ready ?? Promise.resolve();
      const minDelay = new Promise((r) => setTimeout(r, MIN_MS));

      Promise.all([fonts, minDelay]).then(() => {
        if (cancelled) return;
        fill.kill();
        ctx.add(() =>
          gsap
          .timeline()
          .to(progress, { v: 100, duration: 0.35, ease: "power2.inOut", onUpdate: render })
          .to(`.${s.line}`, { yPercent: -110, duration: 0.6, ease: ease.inOut, stagger: 0.04 })
          .add(() => {
            try {
              sessionStorage.setItem(SESSION_KEY, "1");
            } catch {}
            setScrollLocked(false);
            markReady();
          }, "-=0.2")
          .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: ease.inOut }, "<")
          .add(() => setMounted(false)),
        );
      });
    }, root);

    return () => {
      cancelled = true;
      ctx.revert();
      setScrollLocked(false);
    };
  }, [markReady, setScrollLocked]);

  if (!mounted) return null;

  return (
    <div ref={root} className={s.loader} aria-hidden="true">
      <div className={s.row}>
        <span className="mask">
          <span className={`${s.line} mono`}>
            MATIN SALIMI <span className={s.slash}>/</span> {dict.loader.status}
          </span>
        </span>
        <span className="mask">
          <span ref={count} className={`${s.line} ${s.count} mono`}>
            000
          </span>
        </span>
      </div>
      <div className={s.track}>
        <i ref={bar} />
      </div>
    </div>
  );
}
