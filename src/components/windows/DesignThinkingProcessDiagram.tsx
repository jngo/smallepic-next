/**
 * Three hub phases, each owning two adjacent ring segments + callouts:
 *   Understand  → Empathise (NW) + Define (NE)
 *   Explore     → Ideate (E)     + Prototype (SE)
 *   Materialise → Implement (W)  + Test (SW)
 *
 * Geometry lives in SVG (viewBox units). Labels are HTML (text-sm) so sizing
 * is controlled in CSS — SVG font-size would scale with the viewBox.
 */

type Phase = {
  id: string;
  title: string;
  side: "left" | "right";
  color: string;
  items: string[];
  /** Segment midpoint angle: 0° = east, CCW. */
  angle: number;
};

/** One color per hub phase — shared by both callouts and ring segments. */
const C = {
  understand: "var(--chart-2)",
  explore: "var(--chart-4)",
  materialise: "var(--chart-3)",
} as const;

/**
 * Cropped viewBox — trims empty margin so figure padding isn’t doubled by
 * unused SVG space. Ring/callout coordinates below are absolute in the
 * original 964×424 canvas.
 */
const VIEW_X = 96;
const VIEW_Y = 52;
const VIEW_W = 732;
const VIEW_H = 332;

/** Midpoints every 60°. */
const phases: Phase[] = [
  {
    id: "empathise",
    title: "Empathise",
    side: "left",
    color: C.understand,
    items: ["Customer Feedback", "Competitive Analysis", "User Interviews", "Analytics"],
    angle: 120,
  },
  {
    id: "implement",
    title: "Implement",
    side: "left",
    color: C.materialise,
    items: ["Reporting", "Usability Testing"],
    angle: 180,
  },
  {
    id: "test",
    title: "Test",
    side: "left",
    color: C.materialise,
    items: ["Customer Feedback"],
    angle: 240,
  },
  {
    id: "define",
    title: "Define",
    side: "right",
    color: C.understand,
    items: ["Story Mapping"],
    angle: 60,
  },
  {
    id: "ideate",
    title: "Ideate",
    side: "right",
    color: C.explore,
    items: ["Breadboarding", "UI Design"],
    angle: 0,
  },
  {
    id: "prototype",
    title: "Prototype",
    side: "right",
    color: C.explore,
    items: ["Prototyping"],
    angle: 300,
  },
];

const hubs = [
  { label: "Understand", color: C.understand, x: 0, y: -42 },
  { label: "Explore", color: C.explore, x: 48, y: 38 },
  { label: "Materialise", color: C.materialise, x: -54, y: 38 },
] as const;

const GAP = 2;

const ringWedges = phases.map((p) => {
  const mid = ((p.angle % 360) + 360) % 360;
  return {
    id: p.id,
    color: p.color,
    start: mid - 30 + GAP,
    end: mid + 30 - GAP,
  };
});

const CX = 482;
const CY = 212;
const R_MID = 128;
const STROKE = 18;
const R_OUTER = R_MID + STROKE / 2;
/** Shared gap: text ↔ line, and line ↔ ring (viewBox units). */
const LABEL_GAP = 14;
const R_LINE = R_OUTER + LABEL_GAP;
const LABEL_X = { left: 268, right: 696 } as const;

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const sweep = ((endDeg - startDeg) % 360 + 360) % 360;
  const large = sweep > 180 ? 1 : 0;
  const s = toRad(startDeg);
  const e = toRad(endDeg);
  const x0 = cx + r * Math.cos(s);
  const y0 = cy - r * Math.sin(s);
  const x1 = cx + r * Math.cos(e);
  const y1 = cy - r * Math.sin(e);
  return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 0 ${x1} ${y1}`;
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function pct(x: number, y: number) {
  return {
    left: `${((x - VIEW_X) / VIEW_W) * 100}%`,
    top: `${((y - VIEW_Y) / VIEW_H) * 100}%`,
  };
}

export function DesignThinkingProcessDiagram() {
  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
      role="img"
      aria-label="Adapted design thinking process: Understand (Empathise, Define), Explore (Ideate, Prototype), and Materialise (Implement, Test)."
    >
      <svg
        viewBox={`${VIEW_X} ${VIEW_Y} ${VIEW_W} ${VIEW_H}`}
        className="absolute inset-0 size-full"
        aria-hidden
      >
        <circle cx={CX} cy={CY} r={R_MID - STROKE / 2 - 2} fill="var(--muted)" />

        {ringWedges.map((w) => (
          <path
            key={w.id}
            d={arcPath(CX, CY, R_MID, w.start, w.end)}
            fill="none"
            stroke={w.color}
            strokeWidth={STROKE}
            strokeLinecap="butt"
          />
        ))}

        {phases.map((phase) => {
          const rim = polar(CX, CY, R_LINE, phase.angle);
          const y = rim.y;
          const lineEndX = phase.side === "left" ? LABEL_X.left : LABEL_X.right;
          return (
            <line
              key={phase.id}
              x1={lineEndX}
              y1={y}
              x2={rim.x}
              y2={y}
              stroke={phase.color}
              strokeWidth={1.25}
            />
          );
        })}
      </svg>

      {/* Hub labels — HTML so font-size matches the page, not the viewBox scale */}
      {hubs.map((h) => {
        const pos = pct(CX + h.x, CY + h.y);
        return (
          <span
            key={h.label}
            className="pointer-events-none absolute font-serif text-sm -translate-x-1/2 -translate-y-1/2"
            style={{ ...pos, color: h.color }}
          >
            {h.label}
          </span>
        );
      })}

      {/* Callouts */}
      {phases.map((phase) => {
        const rim = polar(CX, CY, R_LINE, phase.angle);
        const isLeft = phase.side === "left";
        const lineEndX = isLeft ? LABEL_X.left : LABEL_X.right;
        const textX = isLeft ? lineEndX - LABEL_GAP : lineEndX + LABEL_GAP;
        const pos = pct(textX, rim.y);

        return (
          <div
            key={phase.id}
            className={`pointer-events-none absolute text-sm leading-4 ${
              // -translate-y-2 = half of leading-4 so the title centers on the leader
              isLeft
                ? "-translate-x-full -translate-y-2 text-right"
                : "-translate-y-2 text-left"
            }`}
            style={pos}
          >
            <p className="font-bold" style={{ color: phase.color }}>
              {phase.title}
            </p>
            <ul className="text-muted-foreground">
              {phase.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
