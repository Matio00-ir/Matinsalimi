import type { L10n } from "./types";

export const site = {
  name: "Matin Salimi",
  fullName: { fa: "متین سلیمی", en: "Matin Salimi" } satisfies L10n,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Shown in the footer/hero clock. */
  timeZone: "Asia/Tehran",
  /** Optional portrait, e.g. { src: "/about/matin.webp", width: 960, height: 1200 } */
  portrait: null as null | { src: string; width: number; height: number },
  /**
   * TODO(matin): fill in real contact channels.
   * Empty values are hidden in the UI — nothing fake is ever rendered.
   */
  contact: {
    email: "",
    telegram: "", // username without @
    linkedin: "", // full URL
    github: "", // full URL
  },
};

export type Site = typeof site;
