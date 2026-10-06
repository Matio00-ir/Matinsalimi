"use client";

import { useEffect, useRef } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { SplitWords } from "@/components/ui/SplitWords";
import { LocalTime } from "@/components/ui/LocalTime";
import { gsap, mq, ease } from "@/lib/motion";
import { pad } from "@/lib/i18n";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import s from "./Hero.module.css";

/** Display name, one entry per line. */
const NAME_LINES = ["MATIN", "SALIMI"];

/**
 * Opening scene. A sticky stage scrubbed by scroll:
 * the name recedes, the role line cycles (developer → system builder → product engineer),
 * then the statement resolves and an accent rule hands off to the Process scene.
 */
export function Hero() {
  const { dict, locale, ready } = useSite();
  const root = useRef<HTMLElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const roles = dict.hero.roles;

  // Scroll timeline.
  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(
      mq.motion,
      () => {
        const q = gsap.utils.selector(el);
        const roleEls = q(`.${s.role}`);
        gsap.set(roleEls.slice(1), { yPercent: 105, autoAlpha: 1 });
        gsap.set(q(`.${s.statement} .wi`), { opacity: 0, yPercent: 40 });

        // Phones stack the composition taller, so the name travels further and the roles less.
        const narrow = () => window.matchMedia("(max-width: 959.98px)").matches;

        const setCounter = (i: number) => {
          if (counter.current) counter.current.textContent = `${pad(i + 1, locale)} / ${pad(roles.length, locale)}`;
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => setCounter(Math.min(roles.length - 1, Math.floor(self.progress / 0.3))),
          },
        });

        tl.to(q(`.${s.nameInner}`), { scale: 0.34, yPercent: () => (narrow() ? -70 : -55), duration: 0.62, ease: "power1.inOut" }, 0.08)
          .to(roleEls[0], { yPercent: -105, duration: 0.14 }, 0.22)
          .to(roleEls[1], { yPercent: 0, duration: 0.14 }, 0.22)
          .to(roleEls[1], { yPercent: -105, duration: 0.14 }, 0.48)
          .to(roleEls[2], { yPercent: 0, duration: 0.14 }, 0.48)
          .to(q(`.${s.roles}`), { y: () => -window.innerHeight * (narrow() ? 0.14 : 0.26), duration: 0.3, ease: "power1.inOut" }, 0.5)
          .to(q(`.${s.statement} .wi`), { opacity: 1, yPercent: 0, duration: 0.08, stagger: 0.03, ease: "power2.out" }, 0.62)
          .to(q(`.${s.bridge}`), { scaleX: 1, duration: 0.14 }, 0.86)
          .to(q(`.${s.scroll}`), { autoAlpha: 0, duration: 0.08 }, 0.02);
      },
      el,
    );
    return () => mm.revert();
  }, [locale, roles.length]);

  // Intro, once the boot sequence hands over.
  useEffect(() => {
    if (!ready || !root.current) return;
    const mm = gsap.matchMedia();
    mm.add(
      mq.motion,
      () => {
        const q = gsap.utils.selector(root.current);
        gsap
          .timeline({ delay: 0.05 })
          .set(q("[data-intro]"), { visibility: "visible" })
          .from(q(`.${s.letter}`), { yPercent: 110, duration: 1.5, ease: ease.out, stagger: 0.06 })
          .from(q(`.${s.rolesInner}`), { yPercent: 110, duration: 1.2, ease: ease.out }, 0.35)
          .from(q(`.${s.edge}`), { autoAlpha: 0, y: 12, duration: 1, ease: ease.out, stagger: 0.08 }, 0.5)
          .from(q(`.${s.statementWrap}`), { autoAlpha: 0, duration: 1 }, 0.6);
      },
      root.current,
    );
    return () => mm.revert();
  }, [ready]);

  return (
    <section id="top" ref={root} className={s.hero} aria-labelledby="hero-title">
      <div className={s.stage}>
        <div className={s.grid} aria-hidden="true">
          {Array.from({ length: 13 }, (_, i) => (
            <i key={i} />
          ))}
        </div>

        <div className={`${s.edgeRow} ${s.top} container mono`}>
          <span className={s.edge} data-intro>
            {dict.hero.index} <span className="muted">—</span> <span className="latin">{new Date().getFullYear()}</span>
          </span>
          <span className={`${s.edge} ${s.status}`} data-intro>
            <i aria-hidden="true" /> {dict.hero.availability}
          </span>
        </div>

        <div className={s.center}>
          <h1 id="hero-title" className={s.name}>
            <span className="sr-only">
              Matin Salimi — {roles[0]}
            </span>
            <span className={`${s.nameInner} latin`} aria-hidden="true">
              {NAME_LINES.map((line) => (
                <span key={line} className={s.nameLine}>
                  {line.split("").map((c, i) => (
                    <span key={i} className={s.letterMask} data-intro>
                      <span className={s.letter}>{c}</span>
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h1>

          <div className={s.roles} aria-hidden="true">
            <div className={s.rolesInner} data-intro>
              {roles.map((r) => (
                <span key={r} className={s.role}>
                  {r}
                </span>
              ))}
            </div>
          </div>

          <p className={s.statementWrap} data-intro>
            <SplitWords text={dict.hero.statement} className={s.statement} />
          </p>
        </div>

        <div className={`${s.edgeRow} ${s.bottom} container mono`}>
          <span className={s.edge} data-intro>
            <LocalTime /> <span className="muted">TEH</span>
          </span>
          <span className={s.edge} data-intro>
            <span className={s.scroll}>
              {dict.hero.scroll}
              <i aria-hidden="true" />
            </span>
          </span>
          <span className={s.edge} data-intro>
            <span ref={counter}>
              {pad(1, locale)} / {pad(roles.length, locale)}
            </span>
          </span>
        </div>

        <span className={s.bridge} aria-hidden="true" />
      </div>
    </section>
  );
}
