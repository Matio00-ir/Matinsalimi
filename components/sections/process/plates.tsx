/**
 * The four layers of the system, drawn as SVG on a shared 500×320 canvas.
 * `.draw` strokes are traced in by the timeline (pathLength=1), `.pop` items fade in.
 */

const VB = "0 0 500 320";

export function BlueprintPlate() {
  return (
    <svg viewBox={VB} className="plate-svg">
      <defs>
        <pattern id="bp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="var(--c-line)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="500" height="320" fill="url(#bp-grid)" />
      {[
        { x: 24, y: 138, w: 88, h: 44, l: "CLIENT" },
        { x: 170, y: 138, w: 96, h: 44, l: "GATEWAY" },
        { x: 330, y: 48, w: 92, h: 36, l: "AUTH" },
        { x: 330, y: 142, w: 92, h: 36, l: "CORE" },
        { x: 330, y: 236, w: 92, h: 36, l: "BILLING" },
      ].map((n) => (
        <g key={n.l}>
          <rect className="draw" pathLength={1} x={n.x} y={n.y} width={n.w} height={n.h} fill="var(--c-bg)" stroke="var(--c-fg-2)" />
          <text className="pop t" x={n.x + n.w / 2} y={n.y + n.h / 2 + 3.5} textAnchor="middle">
            {n.l}
          </text>
        </g>
      ))}
      {[
        "M112 160H170",
        "M266 160C298 160 298 66 330 66",
        "M266 160H330",
        "M266 160C298 160 298 254 330 254",
        "M422 66H468V254H422",
        "M422 160H468",
      ].map((d) => (
        <path key={d} className="draw" pathLength={1} d={d} fill="none" stroke="var(--c-accent)" strokeWidth="1" />
      ))}
    </svg>
  );
}

const tables = [
  { x: 28, y: 64, name: "users", cols: [["id", "uuid"], ["email", "text"], ["role", "enum"]] },
  { x: 185, y: 40, name: "orders", cols: [["id", "uuid"], ["user_id", "fk"], ["total", "numeric"], ["status", "enum"]] },
  { x: 342, y: 84, name: "invoices", cols: [["id", "uuid"], ["order_id", "fk"], ["amount", "numeric"]] },
];

export function DatabasePlate() {
  return (
    <svg viewBox={VB} className="plate-svg">
      <path className="draw" pathLength={1} d="M158 108C172 108 172 96 185 96" fill="none" stroke="var(--c-accent)" />
      <path className="draw" pathLength={1} d="M315 118C330 118 328 140 342 140" fill="none" stroke="var(--c-accent)" />
      {tables.map((tb) => {
        const h = 26 + tb.cols.length * 22;
        return (
          <g key={tb.name} className="pop">
            <rect x={tb.x} y={tb.y} width="130" height={h} fill="var(--c-bg)" stroke="var(--c-fg-2)" />
            <rect x={tb.x} y={tb.y} width="130" height="26" fill="var(--c-graphite-2)" />
            <text className="t strong" x={tb.x + 10} y={tb.y + 17}>
              {tb.name}
            </text>
            {tb.cols.map(([c, type], i) => (
              <g key={c}>
                <path d={`M${tb.x} ${tb.y + 26 + i * 22}H${tb.x + 130}`} stroke="var(--c-line-strong)" />
                <text className="t" x={tb.x + 10} y={tb.y + 41 + i * 22}>
                  {c}
                </text>
                <text className="t dim" x={tb.x + 120} y={tb.y + 41 + i * 22} textAnchor="end">
                  {type}
                </text>
              </g>
            ))}
          </g>
        );
      })}
      <text className="pop t dim" x="28" y="296">
        postgresql · prisma
      </text>
    </svg>
  );
}

const endpoints: [string, string, string, number][] = [
  ["GET", "/api/orders", "200", 0.42],
  ["POST", "/api/orders", "201", 0.66],
  ["GET", "/api/invoices", "200", 0.35],
  ["PATCH", "/api/stock/:id", "200", 0.5],
  ["GET", "/api/reports/pnl", "200", 0.8],
  ["POST", "/api/auth/login", "200", 0.3],
];

export function ApiPlate() {
  return (
    <svg viewBox={VB} className="plate-svg">
      {endpoints.map(([m, p, code, w], i) => {
        const y = 52 + i * 38;
        return (
          <g key={p + m} className="pop">
            <path d={`M24 ${y + 12}H476`} stroke="var(--c-line)" />
            <text className={`t strong${m !== "GET" ? " acc" : ""}`} x="24" y={y}>
              {m}
            </text>
            <text className="t" x="84" y={y}>
              {p}
            </text>
            <text className="t dim" x="290" y={y}>
              {code}
            </text>
            <rect x="330" y={y - 7} width={146 * w} height="5" fill="var(--c-fg-3)" />
          </g>
        );
      })}
    </svg>
  );
}

/** The product surface. `.wire` is the sketch (UX step), `.fillLayer` the built UI (Frontend step). */
export function InterfacePlate() {
  const sideItems = [60, 48, 56, 40, 52];
  const kpis = [0, 1, 2];
  return (
    <svg viewBox={VB} className="plate-svg">
      <g className="fillLayer">
        <rect width="500" height="320" fill="var(--c-bg-raise)" />
        <rect width="96" height="320" fill="var(--c-bg)" />
        {[14, 26, 38].map((cx) => (
          <circle key={cx} cx={cx} cy="13" r="3" fill="var(--c-fg-3)" />
        ))}
        {sideItems.map((w, i) => (
          <rect key={i} x="16" y={46 + i * 20} width={w} height="6" fill={i === 1 ? "var(--c-accent)" : "var(--c-fg-3)"} />
        ))}
        {kpis.map((i) => (
          <g key={i}>
            <rect x={112 + i * 128} y="42" width="116" height="56" fill="var(--c-graphite)" />
            <rect x={124 + i * 128} y="54" width="40" height="5" fill="var(--c-fg-3)" />
            <rect x={124 + i * 128} y="68" width={i === 1 ? 48 : 64} height="14" fill="var(--c-fg)" />
            {i === 0 && <rect x="204" y="72" width="18" height="6" fill="var(--c-accent)" />}
          </g>
        ))}
        <rect x="112" y="112" width="244" height="110" fill="var(--c-graphite)" />
        {[140, 166, 192].map((y) => (
          <path key={y} d={`M124 ${y}H344`} stroke="var(--c-line)" />
        ))}
        <path d="M124 204L160 188L196 194L232 162L268 170L304 140L340 128V212H124Z" fill="var(--c-accent-dim)" />
        <path d="M124 204L160 188L196 194L232 162L268 170L304 140L340 128" fill="none" stroke="var(--c-accent)" strokeWidth="2" />
        <rect x="368" y="112" width="116" height="110" fill="var(--c-graphite)" />
        <circle cx="426" cy="167" r="30" fill="none" stroke="var(--c-fg-3)" strokeWidth="8" />
        <circle
          cx="426"
          cy="167"
          r="30"
          fill="none"
          stroke="var(--c-fg)"
          strokeWidth="8"
          pathLength={100}
          strokeDasharray="64 100"
          transform="rotate(-90 426 167)"
        />
        <rect x="112" y="236" width="372" height="70" fill="var(--c-graphite)" />
        {[250, 272, 294].map((y, i) => (
          <g key={y}>
            <rect x="124" y={y - 3} width="80" height="5" fill="var(--c-fg-2)" />
            <rect x="260" y={y - 3} width="60" height="5" fill="var(--c-fg-3)" />
            <rect x="396" y={y - 3} width="48" height="5" fill="var(--c-fg-3)" />
            <rect x="460" y={y - 4} width="14" height="7" fill={i === 0 ? "var(--c-accent)" : "var(--c-fg-3)"} />
          </g>
        ))}
      </g>

      <g className="wire" fill="none" stroke="var(--c-fg-2)" strokeWidth="1">
        <path className="draw" pathLength={1} d="M0 26H500" />
        <path className="draw" pathLength={1} d="M96 26V320" />
        {sideItems.map((w, i) => (
          <rect key={i} className="draw" pathLength={1} x="16" y={46 + i * 20} width={w} height="6" />
        ))}
        {kpis.map((i) => (
          <rect key={i} className="draw" pathLength={1} x={112 + i * 128} y="42" width="116" height="56" />
        ))}
        <rect className="draw" pathLength={1} x="112" y="112" width="244" height="110" />
        <rect className="draw" pathLength={1} x="368" y="112" width="116" height="110" />
        <rect className="draw" pathLength={1} x="112" y="236" width="372" height="70" />
        <path className="draw" pathLength={1} d="M112 258H484M112 280H484" />
      </g>
    </svg>
  );
}
