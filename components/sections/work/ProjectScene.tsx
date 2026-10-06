"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Project } from "@/content/types";
import { useSite } from "@/components/providers/SiteProvider";
import { pad, t } from "@/lib/i18n";
import { gsap, mq, ScrollTrigger } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { Schematic } from "./Schematic";
import s from "./ProjectScene.module.css";

interface Props {
  project: Project;
  index: number;
  total: number;
}

/**
 * One project = one scene. Scroll drives three beats:
 * the wordmark rises out of its mask, the interface opens from a slit and its
 * fragments drift at different depths, then the scene recedes as the next arrives.
 * With several screenshots, scrolling through the frame steps through them
 * (they can also be picked directly from the frame's index).
 */
export function ProjectScene({ project: p, index, total }: Props) {
  const { dict, locale } = useSite();
  const root = useRef<HTMLElement>(null);
  const [shot, setShot] = useState(0);
  const media = p.media ?? [];

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(
      mq.motion,
      () => {
        const q = gsap.utils.selector(el);
        const frame = q(`.${s.frame}`)[0];

        gsap.from(q(`.${s.letter}`), {
          yPercent: 108,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: { trigger: el, start: "top 85%", end: "top 30%", scrub: 0.6 },
        });

        gsap.fromTo(
          frame,
          { clipPath: "inset(18% 10% 18% 10%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top 95%", end: "top 25%", scrub: 0.6 },
          },
        );

        q("[data-depth]").forEach((frag) => {
          const d = Number((frag as HTMLElement).dataset.depth) || 0;
          gsap.fromTo(
            frag,
            { y: 70 * d },
            { y: -40 * d, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        // Several screenshots: the scroll position through the frame selects the visible one.
        if (media.length > 1) {
          ScrollTrigger.create({
            trigger: frame,
            // Hold the first shot (the website) until the frame has fully arrived.
            start: "top 20%",
            end: "bottom 55%",
            onUpdate: (self) => setShot(Math.min(media.length - 1, Math.floor(self.progress * media.length))),
          });
        }

        // Recede when the next scene takes over.
        gsap.to(q(`.${s.visual}`), {
          scale: 0.94,
          autoAlpha: 0.35,
          ease: "none",
          scrollTrigger: { trigger: el, start: "bottom 65%", end: "bottom 5%", scrub: true },
        });
      },
      el,
    );
    return () => mm.revert();
  }, [media.length]);

  const href = p.links?.live ?? p.links?.caseStudy;
  const hero = media[0];

  return (
    <article ref={root} id={`work-${p.slug}`} className={s.scene} data-work-index={index} aria-labelledby={`work-${p.slug}-title`}>
      <header className={`${s.meta} mono`} data-reveal>
        <span>
          <span className="accent">{pad(index + 1, locale)}</span> / {pad(total, locale)}
        </span>
        <span className={s.category}>{t(p.category, locale)}</span>
        <span className={s.metaEnd}>
          {p.status && <span className={s.status}>{dict.work.status[p.status]}</span>}
          {p.year && <span className="latin">{p.year}</span>}
        </span>
      </header>

      <h3 id={`work-${p.slug}-title`} className={s.title}>
        <span className="sr-only">{t(p.title, locale)}</span>
        <span className={`${s.wordmark} latin`} aria-hidden="true" style={{ "--len": p.wordmark.length } as React.CSSProperties}>
          {p.wordmark.split("").map((c, i) =>
            c === " " ? (
              <span key={i} className={s.space} />
            ) : (
              <span key={i} className={s.mask}>
                <span className={s.letter}>{c}</span>
              </span>
            ),
          )}
        </span>
      </h3>

      <p className={s.summary} data-reveal>
        {locale === "fa" && <span className={s.localName}>{p.title.fa} — </span>}
        {t(p.summary, locale)}
      </p>

      <div className={s.visual}>
        <div className={s.frame}>
          <div className={`${s.chrome} mono`}>
            <span className={s.dots} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="latin">/{p.slug}</span>
            <span className={s.chromeEnd}>
              {p.video ? null : hero ? (
                media.length > 1 ? (
                  <span className={s.shots} role="group" aria-label={t(p.title, locale)}>
                    <span className={s.shotLabel}>{t(media[shot].alt, locale)}</span>
                    {media.map((m, i) => (
                      <button
                        key={m.src}
                        type="button"
                        className={s.shotBtn}
                        aria-pressed={i === shot}
                        aria-label={t(m.alt, locale)}
                        onClick={() => setShot(i)}
                      >
                        {pad(i + 1, locale)}
                      </button>
                    ))}
                  </span>
                ) : (
                  t(hero.alt, locale)
                )
              ) : (
                dict.work.schematic
              )}
            </span>
          </div>
          <div className={s.screen} style={hero ? { aspectRatio: `${hero.width} / ${hero.height}` } : undefined}>
            {p.video ? (
              <video className={s.media} src={p.video.src} poster={p.video.poster} muted loop playsInline autoPlay preload="none" />
            ) : hero ? (
              media.map((m, i) => (
                <Image
                  key={m.src}
                  className={s.media}
                  data-active={i === shot || undefined}
                  src={m.src}
                  alt={t(m.alt, locale)}
                  fill
                  sizes="(max-width: 960px) 100vw, 1344px"
                  quality={85}
                />
              ))
            ) : (
              <Schematic kind={p.schematic} />
            )}
          </div>
        </div>
      </div>

      <dl className={s.facts}>
        <div className={s.fact} data-reveal>
          <dt className="mono">{dict.work.problem}</dt>
          <dd>{t(p.problem, locale)}</dd>
        </div>
        <div className={s.fact} data-reveal>
          <dt className="mono">{dict.work.solution}</dt>
          <dd>{t(p.solution, locale)}</dd>
        </div>
        <div className={s.fact} data-reveal>
          <dt className="mono">{dict.work.scope}</dt>
          <dd>
            <ul className={s.list}>
              {p.highlights.map((h) => (
                <li key={h.en}>{t(h, locale)}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div className={s.fact} data-reveal>
          <dt className="mono">{dict.work.stack}</dt>
          <dd className="tags">
            {p.stack.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </dd>
          {p.result && (
            <>
              <dt className={`mono ${s.resultLabel}`}>{dict.work.result}</dt>
              <dd>{t(p.result, locale)}</dd>
            </>
          )}
        </div>
      </dl>

      {(href || p.links?.github) && (
        <div className={s.links} data-reveal>
          {p.links?.live && (
            <a href={p.links.live} target="_blank" rel="noreferrer" className={s.link} data-cursor="open">
              {dict.work.live} <span aria-hidden="true">↗</span>
            </a>
          )}
          {p.links?.caseStudy && (
            <a href={p.links.caseStudy} className={s.link} data-cursor="view">
              {dict.work.caseStudy} <span aria-hidden="true">→</span>
            </a>
          )}
          {p.links?.github && (
            <a href={p.links.github} target="_blank" rel="noreferrer" className={s.link} data-cursor="open">
              {dict.work.github} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      )}
    </article>
  );
}
