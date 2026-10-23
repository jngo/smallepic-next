/**
 * Popular data sources pie — fully self-contained SVG (pie, leaders, title,
 * subtitle, caption, callouts). text-sm on screen via ResizeObserver so
 * viewBox font sizes match process-diagram HTML text-sm.
 */

"use client";

import { useLayoutEffect, useRef, useState } from "react";

type Slice = {
  id: string;
  label: string;
  pct: number;
  color: string;
  side: "left" | "right";
  slot: number;
};

const slices: Slice[] = [
  {
    id: "landsat-8",
    label: "Sentinel Hub Landsat-8 L1 (TOA) AOI Clipped",
    pct: 15.6,
    color: "var(--chart-5)",
    side: "left",
    slot: 0,
  },
  {
    id: "sentinel-2",
    label: "Sentinel Hub Sentinel-2 L2 (BOA) AOI Clipped",
    pct: 18.8,
    color: "var(--chart-3)",
    side: "left",
    slot: 1,
  },
  {
    id: "pleiades",
    label: "OneAtlas Pléiades Streaming",
    pct: 43.8,
    color: "color-mix(in oklch, var(--chart-4) 70%, var(--foreground))",
    side: "left",
    slot: 2,
  },
  {
    id: "sobloo-grd",
    label: "Sobloo Sentinel-1 L1C (GRD) Full Scenes",
    pct: 6.3,
    color: "var(--chart-1)",
    side: "right",
    slot: 0,
  },
  {
    id: "sobloo-slc",
    label: "Sobloo Sentinel-1 L1C (SLC) Full Scenes",
    pct: 6.3,
    color: "var(--chart-2)",
    side: "right",
    slot: 1,
  },
  {
    id: "spot",
    label: "OneAtlas SPOT 6/7 Streaming",
    pct: 9.4,
    color: "var(--chart-4)",
    side: "right",
    slot: 2,
  },
];

const DRAW_ORDER = [
  "sobloo-grd",
  "sobloo-slc",
  "spot",
  "pleiades",
  "sentinel-2",
  "landsat-8",
] as const;

const VB_W = 960;
const CX = 480;
const CY = 208;
/** Sized so left×3 + right-top stay horizontal and right mid/bottom 45° reach. */
const R = 145;
/**
 * Equal visual margin from pie edge → subtitle baseline and pie edge → caption.
 * (Accounts for empty space in the pie stage above/below the circle.)
 */
const EDGE_GAP = 14;
/** Minimal bands — title/caption sit relative to the pie, not these alone. */
const TOP_BAND = 36;
const PIE_TOP = TOP_BAND + CY - R;
const PIE_BOTTOM = TOP_BAND + CY + R;
/**
 * Cropped viewBox — trims unused vertical margin so figure padding isn’t
 * doubled. Geometry below stays in full stage coordinates.
 */
const VIEW_Y = 48;
const VIEW_H = 384;
const LABEL_GAP = 14;
/** Right column nudged out so bottom-right can keep visible stubs + a true 45°. */
const LABEL_X = { left: 268, right: 710 } as const;
/** Callout slots fixed; pie rotated for leader alignment. */
const ROTATION_CW = 22;
/** Leader anchor Y — leave unchanged when nudging labels. */
const SLOT_Y = [80, 178, 276] as const;
/** Callout label Y — mid/bottom nudged up slightly from the leaders. */
const LABEL_Y = [80, 170, 268] as const;

type BuiltSlice = Slice & {
  startDeg: number;
  endDeg: number;
  midDeg: number;
};

function norm(deg: number) {
  return ((deg % 360) + 360) % 360;
}

function angleInSlice(angle: number, startDeg: number, endDeg: number) {
  return norm(startDeg - angle) <= norm(startDeg - endDeg) + 1e-6;
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function horizontalHitAngle(side: "left" | "right", y: number, r: number) {
  const dy = CY - y;
  const inside = r * r - dy * dy;
  if (inside <= 0) return null;
  const xOffset = (side === "left" ? -1 : 1) * Math.sqrt(inside);
  return (Math.atan2(dy, xOffset) * 180) / Math.PI;
}

function buildSlices(): BuiltSlice[] {
  const byId = Object.fromEntries(slices.map((s) => [s.id, s])) as Record<
    string,
    Slice
  >;
  let cursor = 90 - ROTATION_CW;
  return DRAW_ORDER.map((id) => {
    const s = byId[id];
    const sweep = (s.pct / 100) * 360;
    const startDeg = cursor;
    const endDeg = cursor - sweep;
    const midDeg = startDeg - sweep / 2;
    cursor = endDeg;
    return { ...s, startDeg, endDeg, midDeg };
  });
}

function slicePath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const start = polar(cx, cy, r, startDeg);
  const end = polar(cx, cy, r, endDeg);
  const sweep = ((startDeg - endDeg) % 360 + 360) % 360;
  const large = sweep > 180 ? 1 : 0;
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

/** Approx word-wrap for SVG <text> (no layout engine). Matches former max-w-[28%]. */
function wrapLines(text: string, maxWidth: number, fontSize: number): string[] {
  const maxChars = Math.max(8, Math.floor(maxWidth / (fontSize * 0.52)));
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const word of words) {
    const next = cur ? `${cur} ${word}` : word;
    if (next.length > maxChars && cur) {
      lines.push(cur);
      cur = word;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

/**
 * Pick a point on the slice arc for a horizontal → 45° leader.
 * prefer: "short" = smaller 45° (nearer horizontal into the slice);
 *         "long"  = larger 45°.
 */
function diagonalTarget(
  s: BuiltSlice,
  y: number,
  lineEndX: number,
  prefer: "short" | "long",
  /** Extra horizontal stub before the 45° (right-side, from the label). */
  minLabelStub = 0,
  /** Short horizontal into the pie after the 45° (keeps the end level with the segment). */
  endStub = 0,
) {
  const sweep = norm(s.startDeg - s.endDeg);
  const maxElbowX = lineEndX - minLabelStub; // right side: elbow must be ≤ this
  let best: {
    rim: { x: number; y: number };
    elbowX: number;
    joinX: number;
    score: number;
  } | null = null;

  for (let t = 0; t <= 1; t += 0.02) {
    const ang = s.startDeg - t * sweep;
    const rim = polar(CX, CY, R + LABEL_GAP, ang);
    const dy = Math.abs(rim.y - y);
    // 45° lands on a point endStub shy of the rim, then a short horizontal finishes
    const joinX = rim.x + endStub;
    const elbowX = joinX + dy;
    if (elbowX > maxElbowX) continue;
    if (elbowX < rim.x) continue;

    const score =
      (prefer === "short" ? dy : -dy) + 0.3 * Math.abs(ang - s.midDeg);
    if (!best || score < best.score) best = { rim, elbowX, joinX, score };
  }

  return best;
}

/** Shift every Y in an M/L path — rigid translate, angles/proportions unchanged. */
function shiftPathY(d: string, dy: number) {
  if (dy === 0) return d;
  return d.replace(
    /([ML])\s*([-\d.]+)\s+([-\d.]+)/g,
    (_, cmd: string, x: string, y: string) =>
      `${cmd} ${x} ${parseFloat(y) + dy}`,
  );
}

function leaderPath(s: BuiltSlice) {
  // Geometry is always solved at SLOT_Y; mid/bottom paths are translated up
  // afterward so the line meets the label top without changing angles.
  const y = SLOT_Y[s.slot];
  const yOffset = LABEL_Y[s.slot] - SLOT_Y[s.slot];
  const lineEndX = s.side === "left" ? LABEL_X.left : LABEL_X.right;
  const hitAngle = horizontalHitAngle(s.side, y, R);

  let d: string;

  if (hitAngle != null && angleInSlice(hitAngle, s.startDeg, s.endDeg)) {
    const hit = polar(CX, CY, R, hitAngle);
    const endX = s.side === "left" ? hit.x - LABEL_GAP : hit.x + LABEL_GAP;
    d = `M ${lineEndX} ${y} L ${endX} ${y}`;
  } else if (s.side === "right" && s.slot === 1) {
    // Middle-right: shorter 45°, finish with a short horizontal into the segment
    const target = diagonalTarget(s, y, lineEndX, "short", 0, 14);
    d = target
      ? `M ${lineEndX} ${y} L ${target.elbowX} ${y} L ${target.joinX} ${target.rim.y} L ${target.rim.x} ${target.rim.y}`
      : "";
  } else if (s.side === "right" && s.slot === 2) {
    // Bottom-right: equal stubs + exact 45°
    const sweep = norm(s.startDeg - s.endDeg);
    let best: {
      rim: { x: number; y: number };
      stub: number;
      dy: number;
    } | null = null;

    for (let t = 0; t <= 1; t += 0.005) {
      const ang = s.startDeg - t * sweep;
      const rim = polar(CX, CY, R + LABEL_GAP, ang);
      const dy = Math.abs(rim.y - y);
      const stub = (lineEndX - rim.x - dy) / 2;
      if (stub < 8) continue;
      if (!best || stub > best.stub) best = { rim, stub, dy };
    }

    if (best) {
      const elbowX = lineEndX - best.stub;
      const joinX = best.rim.x + best.stub;
      d = `M ${lineEndX} ${y} L ${elbowX} ${y} L ${joinX} ${best.rim.y} L ${best.rim.x} ${best.rim.y}`;
    } else {
      d = "";
    }
  } else {
    d = "";
  }

  if (!d) {
    const target = diagonalTarget(s, y, lineEndX, "long");
    if (target) {
      d = `M ${lineEndX} ${y} L ${target.elbowX} ${y} L ${target.rim.x} ${target.rim.y}`;
    } else {
      const rim = polar(CX, CY, R + LABEL_GAP, s.midDeg);
      d = `M ${lineEndX} ${y} L ${rim.x} ${y}`;
    }
  }

  return shiftPathY(d, yOffset);
}

/** CSS text-sm ≈ 14px — convert to viewBox units so rendered size matches HTML. */
const CSS_TEXT_SM = 14;

export function PopularDataSourcesChart() {
  const built = buildSlices();
  const rootRef = useRef<HTMLDivElement>(null);
  const [fontSm, setFontSm] = useState(CSS_TEXT_SM);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const update = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) setFontSm(CSS_TEXT_SM * (VB_W / w));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Pin subtitle & caption to the pie with equal EDGE_GAP (not the stage bands)
  const subtitleY = PIE_TOP - EDGE_GAP;
  const titleY = subtitleY - fontSm * 1.25;
  const captionY = PIE_BOTTOM + EDGE_GAP + fontSm;

  return (
    <div
      ref={rootRef}
      className="relative w-full"
      style={{ aspectRatio: `${VB_W} / ${VIEW_H}` }}
    >
      <svg
        viewBox={`0 ${VIEW_Y} ${VB_W} ${VIEW_H}`}
        className="absolute inset-0 size-full"
        role="img"
        aria-label="Popular data sources pie chart for October 2019. OneAtlas Pléiades Streaming 43.8%, Sentinel Hub Sentinel-2 18.8%, Sentinel Hub Landsat-8 15.6%, OneAtlas SPOT 9.4%, Sobloo Sentinel-1 GRD and SLC 6.3% each."
      >
        {/* Title = process hub (serif text-sm); subtitle/caption = process callout size */}
        <text
          x={VB_W / 2}
          y={titleY}
          textAnchor="middle"
          fill="var(--foreground)"
          style={{ fontSize: fontSm, fontFamily: "var(--font-serif)" }}
        >
          Popular Data Sources
        </text>
        <text
          x={VB_W / 2}
          y={subtitleY}
          textAnchor="middle"
          fill="var(--muted-foreground)"
          style={{ fontSize: fontSm, fontFamily: "var(--font-sans)" }}
        >
          October 2019
        </text>

        <g transform={`translate(0 ${TOP_BAND})`}>
          {built.map((s) => (
            <path
              key={s.id}
              d={slicePath(CX, CY, R, s.startDeg, s.endDeg)}
              fill={s.color}
            />
          ))}

          {built.map((s) => (
            <path
              key={`${s.id}-leader`}
              d={leaderPath(s)}
              fill="none"
              stroke={s.color}
              strokeWidth={1.25}
              strokeLinejoin="miter"
            />
          ))}

          {built.map((s) => {
            const isLeft = s.side === "left";
            const lineEndX = isLeft ? LABEL_X.left : LABEL_X.right;
            const textX = isLeft ? lineEndX - LABEL_GAP : lineEndX + LABEL_GAP;
            const lines = wrapLines(s.label, VB_W * 0.28, fontSm);
            // Match former HTML: leading-4, first line centered on the leader (−0.5 × line box)
            const lineH = fontSm * (16 / 14);
            const y0 = LABEL_Y[s.slot] + fontSm * 0.25;

            return (
              <text
                key={`${s.id}-label`}
                textAnchor={isLeft ? "end" : "start"}
                style={{ fontSize: fontSm, fontFamily: "var(--font-sans)" }}
              >
                {lines.map((line, i) => (
                  <tspan
                    key={i}
                    x={textX}
                    y={y0 + i * lineH}
                    fill="var(--foreground)"
                  >
                    {line}
                  </tspan>
                ))}
                <tspan
                  x={textX}
                  y={y0 + lines.length * lineH}
                  fill={s.color}
                  fontWeight={700}
                >
                  {s.pct.toFixed(1)}%
                </tspan>
              </text>
            );
          })}
        </g>

        <text
          x={VB_W / 2}
          y={captionY}
          textAnchor="middle"
          fill="var(--muted-foreground)"
          style={{ fontSize: fontSm, fontFamily: "var(--font-sans)" }}
        >
          Data Only Workflows Run at Least 5 Times (811 jobs)
        </text>
      </svg>
    </div>
  );
}
