"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { SectionHead } from "@/components/ui/SectionHead";
import { capabilities } from "@/content/capabilities";
import { featuredProjects } from "@/content/projects";
import { pad, t } from "@/lib/i18n";
import { ScrollTrigger } from "@/lib/motion";
import { useReveal } from "@/hooks/useReveal";
import s from "./Capabilities.module.css";

const COLS = 12;
const ROWS = 8;

/** Deterministic cell pattern per capability, so the field "responds" without randomness. */
function pattern(seed: number) {
  const on = new Set<number>();
  let x = (seed + 1) * 2654435761;
  for (let i = 0; i < 14; i++) {
    x = (x ^ (x << 13)) >>> 0;
    x = (x ^ (x >>> 17)) >>> 0;
    x = (x ^ (x << 5)) >>> 0;
    on.add(x % (COLS * ROWS));
  }
  return on;
}

export function Capabilities() {
  const { dict, locale, scrollTo } = useSite();
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const hovering = useRef(false);
  useReveal(root);

  // Scroll sets the active row (unless the pointer is choosing).
  useEffect(() => {
    const rows = list.current?.querySelectorAll<HTMLElement>("[data-cap]");
    if (!rows) return;
    const triggers = Array.from(rows).map((row, i) =>
      ScrollTrigger.create({
        trigger: row,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => self.isActive && !hovering.current && setActive(i),
      }),
    );
    return () => triggers.forEach((tr) => tr.kill());
  }, []);

  const cap = capabilities[active];
  const cells = useMemo(() => pattern(active), [active]);
  const related = featuredProjects.filter((p) => p.capabilities.includes(cap.id));

  return (
    <section ref={root} id="capabilities" className={s.section} aria-labelledby="cap-title">
      <div className="container">
        <SectionHead id="cap-title" index="03" label={dict.capabilities.label} heading={dict.capabilities.heading} />

        <div className={s.layout}>
          <ol
            ref={list}
            className={s.list}
            onPointerEnter={() => (hovering.current = true)}
            onPointerLeave={() => (hovering.current = false)}
          >
            {capabilities.map((c, i) => (
              <li key={c.id} data-cap={c.id} className={s.row} data-active={i === active || undefined}>
                <button
                  type="button"
                  className={s.trigger}
                  aria-expanded={i === active}
                  aria-controls={`cap-detail-${c.id}`}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className={`${s.num} mono`}>{pad(i + 1, locale)}</span>
                  <span className={s.name}>{t(c.title, locale)}</span>
                </button>
                {/* Inline detail: shown on small screens where there's no side panel. */}
                <div id={`cap-detail-${c.id}`} className={s.inline}>
                  <div>
                    <p>{t(c.description, locale)}</p>
                    <div className="tags">
                      {c.stack.map((x) => (
                        <span key={x} className="tag">
                          {x}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <aside className={s.panel} aria-live="polite">
            <div className={s.field} aria-hidden="true">
              {Array.from({ length: COLS * ROWS }, (_, i) => (
                <i key={i} data-on={cells.has(i) || undefined} style={{ transitionDelay: `${(i % COLS) * 18}ms` }} />
              ))}
            </div>
            <div className={s.panelBody} key={cap.id}>
              <span className={`${s.big} latin`}>{pad(active + 1, "en")}</span>
              <h3 className={s.panelTitle}>{t(cap.title, locale)}</h3>
              <p className={s.panelText}>{t(cap.description, locale)}</p>
              <div className={s.panelMeta}>
                <span className="mono muted">{dict.capabilities.stack}</span>
                <div className="tags">
                  {cap.stack.map((x) => (
                    <span key={x} className="tag">
                      {x}
                    </span>
                  ))}
                </div>
              </div>
              {related.length > 0 && (
                <div className={s.panelMeta}>
                  <span className="mono muted">{dict.capabilities.related}</span>
                  <div className={s.related}>
                    {related.map((p) => (
                      <a
                        key={p.slug}
                        href={`#work-${p.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollTo(`#work-${p.slug}`);
                        }}
                        data-cursor="view"
                        className="latin"
                      >
                        {p.wordmark}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
