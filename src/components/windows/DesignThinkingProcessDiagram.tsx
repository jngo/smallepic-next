/**
 * Three hub phases, each owning two adjacent ring segments + callouts:
 *   Understand  → Empathise (NW) + Define (NE)
 *   Explore     → Ideate (E)     + Prototype (SE)
 *   Materialise → Implement (W)  + Test (SW)
 *
 * Wide: radial SVG + HTML callouts. Narrow: compact ring + stacked lists.
 * Same data; layout mode from ResizeObserver on the diagram width.
 */

"use client";

import { useLayoutEffect, useRef, useState } from "react";

type Phase = {
  id: string;
  title: string;
  side: "left" | "right";
  hub: "understand" | "explore" | "materialise";
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

/** Below this diagram width, switch to stacked layout. */
const STACKED_MAX_PX = 480;

/** Midpoints every 60°. */
const phases: Phase[] = [
  {
    id: "empathise",
    title: "Empathise",
    side: "left",
    hub: "understand",
    color: C.understand,
    items: [
      "Customer Feedback",
      "Competitive Analysis",
      "User Interviews",
      "Analytics",
    ],
    angle: 120,
  },
  {
    id: "implement",
    title: "Implement",
    side: "left",
    hub: "materialise",
    color: C.materialise,
    items: ["Reporting", "Usability Testing"],
    angle: 180,
  },
  {
    id: "test",
    title: "Test",
    side: "left",
    hub: "materialise",
    color: C.materialise,
    items: ["Customer Feedback"],
    angle: 240,
  },
  {
    id: "define",
    title: "Define",
    side: "right",
    hub: "understand",
    color: C.understand,
    items: ["Story Mapping"],
    angle: 60,
  },
  {
    id: "ideate",
    title: "Ideate",
    side: "right",
    hub: "explore",
    color: C.explore,
    items: ["Breadboarding", "UI Design"],
    angle: 0,
  },
  {
    id: "prototype",
    title: "Prototype",
    side: "right",
    hub: "explore",
    color: C.explore,
    items: ["Prototyping"],
    angle: 300,
  },
];

const hubs = [
  {
    id: "understand" as const,
    label: "Understand",
    color: C.understand,
    x: 0,
    y: -42,
  },
  {
    id: "explore" as const,
    label: "Explore",
    color: C.explore,
    x: 48,
    y: 38,
  },
  {
    id: "materialise" as const,
    label: "Materialise",
    color: C.materialise,
    x: -54,
    y: 38,
  },
] as const;

/** Narrative order for stacked layout. */
const hubGroups = hubs.map((hub) => ({
  ...hub,
  phases: phases.filter((p) => p.hub === hub.id),
}));

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

/** Compact ring crop (stacked mode) — ring + hub labels only. */
const RING_PAD = 16;
const RING_VIEW = {
  x: CX - R_OUTER - RING_PAD,
  y: CY - R_OUTER - RING_PAD,
  w: (R_OUTER + RING_PAD) * 2,
  h: (R_OUTER + RING_PAD) * 2,
};

const ARIA_LABEL =
  "Adapted design thinking process: Understand (Empathise, Define), Explore (Ideate, Prototype), and Materialise (Implement, Test).";

function arcPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
) {
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

function pct(x: number, y: number, view = { x: VIEW_X, y: VIEW_Y, w: VIEW_W, h: VIEW_H }) {
  return {
    left: `${((x - view.x) / view.w) * 100}%`,
    top: `${((y - view.y) / view.h) * 100}%`,
  };
}

function RingSvg({
  view,
  showLeaders,
}: {
  view: { x: number; y: number; w: number; h: number };
  showLeaders: boolean;
}) {
  return (
    <svg
      viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
      className="absolute inset-0 size-full"
      aria-hidden
    >
      <circle
        cx={CX}
        cy={CY}
        r={R_MID - STROKE / 2 - 2}
        fill="var(--muted)"
      />

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

      {showLeaders
        ? phases.map((phase) => {
            const rim = polar(CX, CY, R_LINE, phase.angle);
            const lineEndX =
              phase.side === "left" ? LABEL_X.left : LABEL_X.right;
            return (
              <line
                key={phase.id}
                x1={lineEndX}
                y1={rim.y}
                x2={rim.x}
                y2={rim.y}
                stroke={phase.color}
                strokeWidth={1.25}
              />
            );
          })
        : null}
    </svg>
  );
}

function HubLabels({
  view,
}: {
  view: { x: number; y: number; w: number; h: number };
}) {
  return hubs.map((h) => {
    const pos = pct(CX + h.x, CY + h.y, view);
    return (
      <span
        key={h.label}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 font-serif text-sm"
        style={{ ...pos, color: h.color }}
      >
        {h.label}
      </span>
    );
  });
}

function RadialProcess() {
  const view = { x: VIEW_X, y: VIEW_Y, w: VIEW_W, h: VIEW_H };

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
    >
      <RingSvg view={view} showLeaders />
      <HubLabels view={view} />

      {phases.map((phase) => {
        const rim = polar(CX, CY, R_LINE, phase.angle);
        const isLeft = phase.side === "left";
        const lineEndX = isLeft ? LABEL_X.left : LABEL_X.right;
        const textX = isLeft ? lineEndX - LABEL_GAP : lineEndX + LABEL_GAP;
        const pos = pct(textX, rim.y, view);

        return (
          <div
            key={phase.id}
            className={`pointer-events-none absolute text-sm leading-4 ${
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

function StackedProcess() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div
        className="relative mx-auto w-full max-w-56"
        style={{ aspectRatio: "1" }}
      >
        <RingSvg view={RING_VIEW} showLeaders={false} />
        <HubLabels view={RING_VIEW} />
      </div>

      <div className="flex flex-col gap-5">
        {hubGroups.map((hub) => (
          <section key={hub.id} className="min-w-0">
            <h3
              className="mb-2 font-serif text-sm"
              style={{ color: hub.color }}
            >
              {hub.label}
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {hub.phases.map((phase) => (
                <li key={phase.id} className="min-w-0 text-sm leading-4">
                  <p className="font-bold" style={{ color: phase.color }}>
                    {phase.title}
                  </p>
                  <ul className="text-muted-foreground">
                    {phase.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export function DesignThinkingProcessDiagram() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<"radial" | "stacked">("radial");

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const update = () => {
      setLayout(el.clientWidth < STACKED_MAX_PX ? "stacked" : "radial");
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="w-full"
      role="img"
      aria-label={ARIA_LABEL}
    >
      {layout === "radial" ? <RadialProcess /> : <StackedProcess />}
    </div>
  );
}
