"use client";

import { useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { SectionHead } from "@/components/ui/SectionHead";
import { processSteps } from "@/content/process";
import { pad, t } from "@/lib/i18n";
import { gsap, mq } from "@/lib/motion";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { useReveal } from "@/hooks/useReveal";
import { ApiPlate, BlueprintPlate, DatabasePlate, InterfacePlate } from "./plates";
import s from "./Process.module.css";

const STEPS = processSteps.length;
/** Plate spacing as a fraction of plate width — keep in sync with .beam height in CSS. */
const GAP = 0.22;

const BEAMS = [
  [12, 18],
  [88, 18],
  [12, 82],
  [88, 82],
];

/**
 * Signature scene: a system assembled layer by layer.
 * idea → wireframe → (iso) architecture → database → API → built UI →
 * automation beams → deploy pipeline → layers collapse into the live product.
 */
export function Process() {
  const { dict, locale } = useSite();
  const root = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  useReveal(root);

  useIsoLayoutEffect(() => {
    const el = scene.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add(
      mq.motion,
      () => {
        const q = gsap.utils.selector(el);
        const stack = q(`.${s.stack}`)[0] as HTMLElement;
        const gap = () => stack.offsetWidth * GAP;
        const layer = (name: string) => q(`[data-layer="${name}"]`);
        const ui = layer("ui");
        const bp = layer("blueprint");
        const db = layer("db");
        const api = layer("api");

        // Initial state: only the idea exists.
        gsap.set(q(`.${s.tilt}`), { rotationX: 0 });
        gsap.set(q(`.${s.spin}`), { rotationZ: 0, scale: 0.94 });
        gsap.set([ui, bp, db, api], { autoAlpha: 0, z: 0 });
        gsap.set(q(".draw"), { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(q(".pop"), { opacity: 0 });
        gsap.set(q(".fillLayer"), { opacity: 0 });
        gsap.set(q(".wire"), { opacity: 1 });
        gsap.set(q(`.${s.beam}`), { autoAlpha: 0 });
        gsap.set(q(`.${s.beamFill}`), { scaleY: 0 });
        gsap.set(q(`.${s.plateTag}`), { autoAlpha: 0 });
        gsap.set(q(`.${s.console}`), { autoAlpha: 0, y: 16 });
        gsap.set(q(`.${s.pipeBar}`), { scaleX: 0 });
        gsap.set(q(`.${s.live}`), { autoAlpha: 0 });
        gsap.set(q(`.${s.seed}`), { autoAlpha: 1, scale: 1 });

        let last = -1;
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.9,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.min(STEPS - 1, Math.floor(self.progress * tl.duration()));
              if (i !== last) {
                last = i;
                el.dataset.step = String(i);
                setStep(i);
              }
            },
          },
        });

        // 02 UX/UI — the idea becomes a sketch of an interface.
        tl.to(q(`.${s.seed}`), { scale: 0, autoAlpha: 0, duration: 0.4 }, 1)
          .to(ui, { autoAlpha: 1, duration: 0.2 }, 1.05)
          .to(q(`[data-layer="ui"] .wire .draw`), { strokeDashoffset: 0, duration: 0.5, stagger: 0.025, ease: "power1.out" }, 1.1)

          // 03 ARCHITECTURE — tilt into an exploded view, the blueprint appears beneath.
          .to(q(`.${s.tilt}`), { rotationX: 56, duration: 0.8 }, 2)
          .to(q(`.${s.spin}`), { rotationZ: -36, scale: 0.84, duration: 0.8 }, 2)
          .to(ui, { z: () => gap() * 3, duration: 0.8 }, 2)
          .to(bp, { autoAlpha: 1, duration: 0.3 }, 2.3)
          .to(q(`[data-layer="blueprint"] .draw`), { strokeDashoffset: 0, duration: 0.45, stagger: 0.04, ease: "power1.out" }, 2.4)
          .to(q(`[data-layer="blueprint"] .pop`), { opacity: 1, duration: 0.3, stagger: 0.04 }, 2.5)
          .to(q(`[data-layer="ui"] .${s.plateTag}, [data-layer="blueprint"] .${s.plateTag}`), { autoAlpha: 1, duration: 0.3 }, 2.6)

          // 04 DATABASE
          .fromTo(db, { autoAlpha: 0, z: () => gap() * 0.4 }, { autoAlpha: 1, z: () => gap(), duration: 0.6 }, 3)
          .to(q(`[data-layer="db"] .pop`), { opacity: 1, duration: 0.3, stagger: 0.08 }, 3.2)
          .to(q(`[data-layer="db"] .draw`), { strokeDashoffset: 0, duration: 0.4, stagger: 0.1 }, 3.4)
          .to(q(`[data-layer="db"] .${s.plateTag}`), { autoAlpha: 1, duration: 0.3 }, 3.3)

          // 05 BACKEND
          .fromTo(api, { autoAlpha: 0, z: () => gap() * 1.4 }, { autoAlpha: 1, z: () => gap() * 2, duration: 0.6 }, 4)
          .to(q(`[data-layer="api"] .pop`), { opacity: 1, duration: 0.25, stagger: 0.06 }, 4.2)
          .to(q(`[data-layer="api"] .${s.plateTag}`), { autoAlpha: 1, duration: 0.3 }, 4.3)

          // 06 FRONTEND — the sketch is built out.
          .to(q(`[data-layer="ui"] .fillLayer`), { opacity: 1, duration: 0.6 }, 5)
          .to(q(`[data-layer="ui"] .wire`), { opacity: 0.2, duration: 0.6 }, 5)

          // 07 AUTOMATION — signals run through every layer.
          .to(q(`.${s.beam}`), { autoAlpha: 1, duration: 0.2 }, 6)
          .to(q(`.${s.beamFill}`), { scaleY: 1, duration: 0.6, stagger: 0.1 }, 6.05)
          .to(q(`.${s.console}`), { autoAlpha: 1, y: 0, duration: 0.4 }, 6.2)

          // 08 DEPLOYMENT
          .to(q(`.${s.pipeBar}`), { scaleX: 1, duration: 0.3, stagger: 0.22, ease: "none" }, 7.1)

          // 09 PRODUCT — every layer collapses into the one surface people use.
          .to(q(`.${s.beam}, .${s.console}, .${s.plateTag}`), { autoAlpha: 0, duration: 0.3 }, 8)
          .to([api, db, bp], { z: () => gap() * 3, autoAlpha: 0, duration: 0.6, stagger: 0.06 }, 8.05)
          .to(ui, { z: 0, duration: 0.8 }, 8.2)
          .to(q(`.${s.tilt}`), { rotationX: 0, duration: 0.8 }, 8.2)
          .to(q(`.${s.spin}`), { rotationZ: 0, scale: 1.04, duration: 0.8 }, 8.2)
          .to(q(`[data-layer="ui"] .wire`), { opacity: 0, duration: 0.4 }, 8.4)
          .to(q(`.${s.live}`), { autoAlpha: 1, duration: 0.2 }, 8.85)
          .to({}, { duration: 0.3 }, 9);
      },
      el,
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className={s.process} aria-labelledby="process-title">
      <div className="container">
        <SectionHead id="process-title" index="01" label={dict.process.label} heading={dict.process.heading} intro={dict.process.intro} />
      </div>

      <div ref={scene} className={s.scene} data-step="0">
        <div className={s.stage}>
          {/* Giant step word — a typographic object behind everything. */}
          <div className={`${s.words} latin`} aria-hidden="true">
            {processSteps.map((p, i) => (
              <span key={p.key} className={s.word} data-state={state(i, step)}>
                {p.word}
              </span>
            ))}
          </div>

          {/* Step index rail */}
          <ol className={`${s.rail} mono`} aria-hidden="true">
            {processSteps.map((p, i) => (
              <li key={p.key} data-state={state(i, step)}>
                <span>{pad(i + 1, locale)}</span>
                <span className="latin">{p.word}</span>
              </li>
            ))}
          </ol>

          {/* The system */}
          <div className={s.visual} aria-hidden="true">
            <span className={s.seed}>
              <i />
              <i />
              <i />
            </span>
            <div className={s.tilt}>
              <div className={s.spin}>
                <div className={s.stack}>
                  <Plate name="blueprint" tag="L1 · ARCHITECTURE">
                    <BlueprintPlate />
                  </Plate>
                  <Plate name="db" tag="L2 · DATA">
                    <DatabasePlate />
                  </Plate>
                  <Plate name="api" tag="L3 · API">
                    <ApiPlate />
                  </Plate>
                  <Plate name="ui" tag="L4 · INTERFACE">
                    <InterfacePlate />
                    <span className={`${s.live} mono`}>
                      <i /> {dict.process.live}
                    </span>
                  </Plate>
                  {BEAMS.map(([x, y]) => (
                    <span key={`${x}-${y}`} className={s.beam} style={{ insetInlineStart: `${x}%`, top: `${y}%` }}>
                      <span className={s.beamFill} />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${s.console} mono`}>
              <div className={s.consoleHead}>
                <span>console</span>
                <span className="accent">●</span>
              </div>
              <ul className={s.auto}>
                <li>
                  <span className="muted">cron</span> nightly-report <span className="accent">✓</span>
                </li>
                <li>
                  <span className="muted">webhook</span> payment.succeeded
                </li>
                <li>
                  <span className="muted">notify</span> stock.low → warehouse
                </li>
              </ul>
              <ul className={s.pipe}>
                {dict.process.pipeline.map((label) => (
                  <li key={label}>
                    <span>{label}</span>
                    <span className={s.pipeTrack}>
                      <i className={s.pipeBar} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step copy */}
          <div className={s.copy}>
            <p className={`${s.counter} mono`} aria-hidden="true">
              <span className="accent">{pad(step + 1, locale)}</span> / {pad(STEPS, locale)}
            </p>
            <ol className={s.steps}>
              {processSteps.map((p, i) => (
                <li key={p.key} className={s.step} data-state={state(i, step)}>
                  <h3 className={s.stepTitle}>
                    <span className={`${s.stepNum} mono`}>{pad(i + 1, locale)}</span>
                    {t(p.title, locale)}
                  </h3>
                  <p className={s.stepBody}>{t(p.body, locale)}</p>
                  <div className="tags">
                    {p.tools.map((tool) => (
                      <span key={tool} className="tag">
                        {tool}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function state(i: number, active: number) {
  return i < active ? "past" : i === active ? "active" : "future";
}

function Plate({ name, tag, children }: { name: string; tag: string; children: React.ReactNode }) {
  return (
    <div className={s.plate} data-layer={name}>
      <span className={`${s.plateTag} mono latin`}>{tag}</span>
      {children}
    </div>
  );
}
