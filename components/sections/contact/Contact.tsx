"use client";

import { useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { SplitWords } from "@/components/ui/SplitWords";
import { site } from "@/content/site";
import { useReveal } from "@/hooks/useReveal";
import s from "./Contact.module.css";

/** The conclusion of the story: pick what you need, then one clear action. */
export function Contact() {
  const { dict } = useSite();
  const root = useRef<HTMLElement>(null);
  const [intent, setIntent] = useState(0);
  const [copied, setCopied] = useState(false);
  useReveal(root);

  const { email, telegram, linkedin, github } = site.contact;
  const subject = dict.contact.intents[intent];
  const mailto = email ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : null;
  const configured = Boolean(email || telegram);

  const copy = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

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
          {mailto && (
            <Magnetic>
              <a href={mailto} className={s.cta} data-cursor="open">
                <span>{dict.contact.cta}</span>
                <span className={s.arrow} aria-hidden="true">
                  →
                </span>
              </a>
            </Magnetic>
          )}
          {telegram && (
            <a href={`https://t.me/${telegram}`} target="_blank" rel="noreferrer" className={s.secondary} data-cursor="open">
              Telegram ↗
            </a>
          )}
          {email && (
            <button type="button" onClick={copy} className={`${s.secondary} latin`} aria-live="polite">
              {email} <span className="mono muted">{copied ? dict.contact.copied : dict.contact.copy}</span>
            </button>
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
