import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Register GSAP plugins once, client-side only. Runs at module load (below) because
 * React fires child effects before parent effects — registering from a provider
 * effect would be too late for the sections' own timelines.
 */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: ease.out, duration: duration.base });
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

/** Motion tokens — mirrored in globals.css (--ease-*, --dur-*). */
export const ease = {
  out: "expo.out",
  inOut: "expo.inOut",
  soft: "power3.out",
  linear: "none",
} as const;

export const duration = {
  fast: 0.32,
  base: 0.64,
  slow: 1.0,
  reveal: 1.2,
} as const;

/**
 * Media conditions for gsap.matchMedia(). Every scroll scene branches on these so
 * reduced-motion users get a static layout and mobile gets a lighter timeline.
 */
export const mq = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 960px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 959.98px) and (prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
} as const;

registerGsap();

export { gsap, ScrollTrigger };
