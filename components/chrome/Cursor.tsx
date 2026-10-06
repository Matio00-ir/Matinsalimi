"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/motion";
import s from "./Cursor.module.css";

/**
 * Contextual cursor label. The native cursor stays; a small label follows it only
 * over elements marked `data-cursor="view|open"`. Fine pointers only.
 */
export function Cursor() {
  const { dict } = useSite();
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const el = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!fine || !el.current) return;
    const node = el.current;
    const xTo = gsap.quickTo(node, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      const kind = target?.dataset.cursor as keyof typeof dict.cursor | undefined;
      setLabel(kind && dict.cursor[kind] ? dict.cursor[kind] : null);
    };
    const onLeave = () => setLabel(null);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [fine, dict]);

  if (!fine) return null;

  return (
    <div ref={el} className={s.cursor} aria-hidden="true">
      <span className={`${s.pill} mono`} data-visible={label ? "" : undefined}>
        {label}
      </span>
    </div>
  );
}
