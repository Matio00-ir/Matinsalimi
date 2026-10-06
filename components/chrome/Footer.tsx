"use client";

import { useSite } from "@/components/providers/SiteProvider";
import { LocalTime } from "@/components/ui/LocalTime";
import s from "./Footer.module.css";

export function Footer() {
  const { dict, scrollTo } = useSite();
  return (
    <footer className={`${s.footer} container`}>
      <span className="mono muted">
        © {new Date().getFullYear()} — {dict.footer.built}
      </span>
      <span className="mono muted">
        {dict.footer.local} <LocalTime />
      </span>
      <button type="button" className={`${s.top} mono`} onClick={() => scrollTo(0)}>
        {dict.footer.top} ↑
      </button>
    </footer>
  );
}
