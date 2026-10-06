"use client";

import Image from "next/image";
import { useRef } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { SplitWords } from "@/components/ui/SplitWords";
import { site } from "@/content/site";
import { gsap, mq } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { useReveal } from "@/hooks/useReveal";
import s from "./About.module.css";

export function About() {
  const { dict, locale } = useSite();
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  // The statement is read at the pace of the scroll: words light up in order.
  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(
      mq.motion,
      () => {
        const words = el.querySelectorAll(`.${s.statement} .wi`);
        gsap.fromTo(
          words,
          { opacity: 0.12 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: `.${s.statement}`, start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
      },
      el,
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="about" className={s.section} aria-labelledby="about-title">
      <div className={`${s.grid} container`}>
        <div className={`${s.rule} mono`} data-reveal>
          <span className="accent">04</span>
          <span>{dict.about.label}</span>
        </div>

        <h2 id="about-title" className={s.statement}>
          <SplitWords text={dict.about.statement} />
        </h2>

        {site.portrait && (
          <div className={s.portrait} data-reveal>
            <Image src={site.portrait.src} alt={site.fullName[locale]} width={site.portrait.width} height={site.portrait.height} sizes="(max-width: 960px) 60vw, 25vw" />
          </div>
        )}

        <p className={s.body} data-reveal>
          {dict.about.body}
        </p>

        <dl className={s.facts}>
          {dict.about.facts.map(([k, v]) => (
            <div key={k} className={s.fact} data-reveal>
              <dt className="mono muted">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
