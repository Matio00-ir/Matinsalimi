"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

/** Pulls its child gently toward the pointer. Fine pointers + motion only. */
export function Magnetic({ children, strength = 0.28 }: { children: React.ReactNode; strength?: number }) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const ok = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    if (!ok) return;
    const xTo = gsap.quickTo(node, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = node.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    return () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={el} style={{ display: "inline-block" }}>
      {children}
    </span>
  );
}
