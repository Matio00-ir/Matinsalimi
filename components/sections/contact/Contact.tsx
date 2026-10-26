"use client";

import { useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { SplitWords } from "@/components/ui/SplitWords";
import { site } from "@/content/site";
import { useReveal } from "@/hooks/useReveal";
import s from "./Contact.module.css";

/** The conclusion of the story: pick what you need, then reach out on Telegram or by email. */
export function Contact() {
  const { dict } = useSite();
  const root = useRef<HTMLElement>(null);
  const [intent, setIntent] = useState(0);
  useReveal(root);

  const { email, telegram, linkedin, github } = site.contact;
  const subject = dict.contact.intents[intent];
  const mailto = email ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : null;
  const configured = Boolean(email || telegram);

  return (
    <section ref={root} id="contact" className={s.section} aria-labelledby="contact-title">
      <div className={`${s.inner} container`}>
        <div className={`${s.rule} mono`} data-reveal>
          <span className="accent">05</span>
          <span>{dict.contact.label}</span>
        </div>

        <h2 id="contact-title" className={s.heading} data-reveal-lines>
          {dict.contact.heading.map((line) => (
            <span key={line} className={s.line}>
              <SplitWords text={line} />
            </span>
          ))}
          <span className={`${s.line} ${s.sub}`}>
            <SplitWords text={dict.contact.sub} />
          </span>
        </h2>

        <fieldset className={s.intents} data-reveal>
          <legend className="mono muted">{dict.contact.intentLabel}</legend>
          <div className={s.options}>
            {dict.contact.intents.map((label, i) => (
              <label key={label} className={s.option}>
                <input type="radio" name="intent" checked={intent === i} onChange={() => setIntent(i)} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={s.actions} data-reveal>
          {telegram && (
            <Magnetic>
              <a href={`https://t.me/${telegram}`} target="_blank" rel="noreferrer" className={s.cta} data-cursor="open">
                <span>Telegram</span>
                <span className={s.arrow} aria-hidden="true">
                  →
                </span>
              </a>
            </Magnetic>
          )}
          {mailto && (
            <a href={mailto} className={`${s.secondary} latin`} data-cursor="open">
              {email} ↗
            </a>
          )}
          {!configured && process.env.NODE_ENV !== "production" && <p className={`${s.todo} mono`}>{dict.contact.notConfigured}</p>}
        </div>

        {(linkedin || github) && (
          <div className={`${s.socials} mono`} data-reveal>
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
