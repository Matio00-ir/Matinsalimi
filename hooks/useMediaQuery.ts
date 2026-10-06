"use client";

import { useSyncExternalStore } from "react";

/** Subscribes to a media query. Returns `fallback` during SSR. */
export function useMediaQuery(query: string, fallback = false) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => fallback,
  );
}
