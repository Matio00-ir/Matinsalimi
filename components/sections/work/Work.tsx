"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { SectionHead } from "@/components/ui/SectionHead";
import { featuredProjects } from "@/content/projects";
import { pad } from "@/lib/i18n";
import { ScrollTrigger } from "@/lib/motion";
import { useReveal } from "@/hooks/useReveal";
import { ProjectScene } from "./ProjectScene";
import s from "./Work.module.css";

export function Work() {
  const { dict, locale, scrollTo } = useSite();
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const total = featuredProjects.length;
  useReveal(root);

  // HUD: which project is on stage, and how far through the work section we are.
  useEffect(() => {
    const wrap = list.current;
    if (!wrap) return;
    const triggers = [
      ScrollTrigger.create({
        trigger: wrap,
        start: "top 60%",
        end: "bottom 40%",
        onToggle: (self) => setInView(self.isActive),
        onUpdate: (self) => {
          if (bar.current) bar.current.style.transform = `scaleX(${self.progress.toFixed(4)})`;
        },
      }),
      ...Array.from(wrap.querySelectorAll<HTMLElement>("[data-work-index]")).map((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(Number(el.dataset.workIndex)),
        }),
      ),
    ];
    return () => triggers.forEach((t) => t.kill());
  }, []);

  const current = featuredProjects[active];

  return (
    <section ref={root} id="work" className={s.work} aria-labelledby="work-title">
      <div className="container">
        <SectionHead id="work-title" index="02" label={dict.work.label} heading={dict.work.heading} intro={dict.work.intro} />

        <nav className={s.index} aria-label={dict.work.label} data-reveal>
          {featuredProjects.map((p, i) => (
            <a
              key={p.slug}
              href={`#work-${p.slug}`}
              className={s.indexItem}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(`#work-${p.slug}`);
              }}
              data-cursor="view"
            >
              <span className="mono accent">{pad(i + 1, locale)}</span>
              <span className={`${s.indexName} latin`}>{p.wordmark}</span>
              <span className={`${s.indexCat} muted`}>{p.category[locale]}</span>
            </a>
          ))}
        </nav>

        <div ref={list}>
          {featuredProjects.map((p, i) => (
            <ProjectScene key={p.slug} project={p} index={i} total={total} />
          ))}
        </div>
      </div>

      <div className={`${s.hud} mono`} data-visible={inView || undefined} aria-hidden="true">
        <span>
          <span className="accent">{pad(active + 1, locale)}</span> / {pad(total, locale)}
        </span>
        <span className={`${s.hudName} latin`}>{current?.wordmark}</span>
        <span className={s.hudTrack}>
          <i ref={bar} />
        </span>
      </div>
    </section>
  );
}
