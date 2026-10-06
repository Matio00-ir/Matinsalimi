import type { SchematicKind } from "@/content/types";
import s from "./Schematic.module.css";

/**
 * Interface schematics: abstract, monochrome UI fragments composed per project type.
 * Shown until real screenshots are added to the project's `media`.
 * Each fragment carries a depth used for parallax as the scene scrolls.
 */

type Variant = "side" | "kpi" | "chart" | "donut" | "table" | "banner" | "tiles" | "cart" | "calendar" | "slots" | "roster" | "program";
type Frag = [Variant, number, number, number, number, number]; // variant, x, y, w, h (%), depth

const layouts: Record<SchematicKind, Frag[]> = {
  erp: [
    ["side", 0, 0, 15, 100, 0.2],
    ["kpi", 17, 0, 26.3, 20, 0.6],
    ["kpi", 45.3, 0, 26.3, 20, 0.8],
    ["kpi", 73.6, 0, 26.4, 20, 1],
    ["chart", 17, 23, 54.6, 45, 0.4],
    ["donut", 73.6, 23, 26.4, 45, 0.9],
    ["table", 17, 71, 83, 29, 0.5],
  ],
  commerce: [
    ["banner", 0, 0, 100, 34, 0.3],
    ["tiles", 0, 37, 70, 63, 0.6],
    ["cart", 72.5, 37, 27.5, 63, 1],
  ],
  booking: [
    ["calendar", 0, 0, 60, 100, 0.3],
    ["slots", 62.5, 0, 37.5, 56, 0.8],
    ["roster", 62.5, 60, 37.5, 40, 1],
  ],
  coaching: [
    ["roster", 0, 0, 30, 100, 0.3],
    ["chart", 32.5, 0, 67.5, 47, 0.7],
    ["program", 32.5, 51, 67.5, 49, 1],
  ],
  marketing: [
    ["banner", 0, 0, 100, 48, 0.3],
    ["tiles", 0, 52, 100, 48, 0.8],
  ],
};

export function Schematic({ kind }: { kind: SchematicKind }) {
  return (
    <div className={s.canvas}>
      {layouts[kind].map(([variant, x, y, w, h, depth], i) => (
        <div
          key={i}
          className={`${s.frag} ${s[variant] ?? ""}`}
          data-depth={depth}
          style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
        >
          <FragmentBody variant={variant} seed={i} />
        </div>
      ))}
    </div>
  );
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

function FragmentBody({ variant, seed }: { variant: Variant; seed: number }) {
  switch (variant) {
    case "side":
      return (
        <>
          <i className={s.logo} />
          {range(7).map((i) => (
            <i key={i} className={i === 1 ? s.lineAcc : s.line} style={{ width: `${48 + ((i * 17) % 40)}%` }} />
          ))}
        </>
      );
    case "kpi":
      return (
        <>
          <i className={s.line} style={{ width: "36%" }} />
          <i className={s.value} style={{ width: `${44 + seed * 6}%` }} />
          {seed === 1 && <i className={s.delta} />}
        </>
      );
    case "chart":
      return (
        <svg viewBox="0 0 400 160" preserveAspectRatio="none" className={s.svg}>
          {[40, 80, 120].map((y) => (
            <path key={y} d={`M0 ${y}H400`} stroke="var(--c-line)" vectorEffect="non-scaling-stroke" />
          ))}
          <path d="M0 130L50 112L100 120L150 82L200 92L250 58L300 66L350 34L400 40V160H0Z" fill="var(--c-accent-dim)" />
          <path
            d="M0 130L50 112L100 120L150 82L200 92L250 58L300 66L350 34L400 40"
            fill="none"
            stroke="var(--c-accent)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      );
    case "donut":
      return (
        <svg viewBox="0 0 100 100" className={s.svgFit}>
          <circle cx="50" cy="50" r="30" fill="none" stroke="var(--c-graphite-2)" strokeWidth="10" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="var(--c-fg)" strokeWidth="10" pathLength={100} strokeDasharray="62 100" transform="rotate(-90 50 50)" />
        </svg>
      );
    case "table":
      return (
        <div className={s.rows}>
          {range(4).map((r) => (
            <div key={r} className={s.row}>
              <i className={r === 0 ? s.lineDim : s.line} style={{ width: "22%" }} />
              <i className={s.lineDim} style={{ width: "16%" }} />
              <i className={s.lineDim} style={{ width: "12%" }} />
              <i className={r === 1 ? s.chipAcc : s.chip} />
            </div>
          ))}
        </div>
      );
    case "banner":
      return (
        <div className={s.banner}>
          <div className={s.bannerText}>
            <i className={s.title} style={{ width: "72%" }} />
            <i className={s.title} style={{ width: "48%" }} />
            <i className={s.line} style={{ width: "56%" }} />
            <i className={s.button} />
          </div>
          <i className={s.media} />
        </div>
      );
    case "tiles":
      return (
        <div className={s.tiles}>
          {range(6).map((i) => (
            <div key={i} className={s.tile}>
              <i className={s.media} />
              <i className={s.line} style={{ width: "70%" }} />
              <i className={i === 2 ? s.lineAcc : s.lineDim} style={{ width: "36%" }} />
            </div>
          ))}
        </div>
      );
    case "cart":
      return (
        <div className={s.stackList}>
          {range(3).map((i) => (
            <div key={i} className={s.cartRow}>
              <i className={s.thumb} />
              <span>
                <i className={s.line} style={{ width: "80%" }} />
                <i className={s.lineDim} style={{ width: "40%" }} />
              </span>
            </div>
          ))}
          <i className={s.button} style={{ width: "100%", marginTop: "auto" }} />
        </div>
      );
    case "calendar":
      return (
        <div className={s.calendar}>
          {range(35).map((i) => (
            <i key={i} className={i === 17 ? s.dayAcc : [3, 9, 10, 16, 23, 24, 30].includes(i) ? s.dayOn : s.day} />
          ))}
        </div>
      );
    case "slots":
      return (
        <div className={s.slots}>
          {range(8).map((i) => (
            <i key={i} className={i === 2 ? s.slotAcc : i === 5 ? s.slotOff : s.slot} />
          ))}
        </div>
      );
    case "roster":
      return (
        <div className={s.stackList}>
          {range(seed === 0 ? 7 : 3).map((i) => (
            <div key={i} className={s.person}>
              <i className={s.avatar} />
              <span>
                <i className={s.line} style={{ width: `${60 + ((i * 13) % 30)}%` }} />
                <i className={s.lineDim} style={{ width: "40%" }} />
              </span>
              <i className={i === 1 ? s.dotAcc : s.dot} />
            </div>
          ))}
        </div>
      );
    case "program":
      return (
        <div className={s.program}>
          {range(7).map((d) => (
            <div key={d} className={s.col}>
              <i className={s.lineDim} style={{ width: "60%" }} />
              {range(1 + ((d * 5) % 3)).map((b) => (
                <i key={b} className={d === 3 && b === 0 ? s.blockAcc : s.block} />
              ))}
            </div>
          ))}
        </div>
      );
  }
}
