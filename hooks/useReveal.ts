"use client";

import type { RefObject } from "react";
import { gsap, mq, duration, ease } from "@/lib/motion";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";

/**
 * Entrance reveals for everything inside `scope`:
 *  - [data-reveal]        fades/rises once when it enters
 *  - [data-reveal-lines]  its `.wi` words slide up out of their masks
 * Reduced motion: nothing runs, content is simply there.
 * Nested scopes are safe: an element is only ever bound once.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useIsoLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add(
      mq.motion,
      () => {
        const bound: HTMLElement[] = [];
        const claim = (sel: string) =>
          Array.from(root.querySelectorAll<HTMLElement>(sel)).filter((el) => {
            if (el.dataset.revealBound) return false;
            el.dataset.revealBound = "1";
            bound.push(el);
            return true;
          });

        claim("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 24,
            autoAlpha: 0,
            duration: duration.reveal,
            ease: ease.out,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });
        claim("[data-reveal-lines]").forEach((el) => {
          gsap.from(el.querySelectorAll(".wi"), {
            yPercent: 110,
            duration: 1.1,
            ease: ease.out,
            stagger: 0.04,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        return () => bound.forEach((el) => delete el.dataset.revealBound);
      },
      root,
    );
    return () => mm.revert();
  }, [scope]);
}
