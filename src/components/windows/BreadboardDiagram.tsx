/**
 * UX breadboard: places + affordances + connection lines.
 * Places are HTML (content-sized, readable type); connectors are SVG
 * paths from a specific signifier to a destination place title, measured
 * via ResizeObserver and drawn above the boxes.
 */

"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";

type Affordance = {
  label: string;
  /** Underlined — an action that leads elsewhere. */
  link?: boolean;
};

type Place = {
  id: string;
  title: string;
  /** Grid cell: row / column (1-based CSS grid). */
  col: number;
  row: number;
  rowSpan?: number;
  items: Affordance[];
};

const places: Place[] = [
  {
    id: "map",
    title: "Map",
    col: 1,
    row: 2,
    rowSpan: 2,
    items: [
      { label: "Zoom" },
      { label: "Layers" },
      { label: "Search", link: true },
      { label: "Import Geometry", link: true },
    ],
  },
  {
    id: "search",
    title: "Search",
    col: 2,
    row: 1,
    rowSpan: 2,
    items: [
      { label: "Query" },
      { label: "Edit Geometry", link: true },
      { label: "Filters", link: true },
      { label: "Results", link: true },
      { label: "Pagination", link: true },
      { label: "View Selection", link: true },
    ],
  },
  {
    id: "geometry",
    title: "Geometry",
    col: 2,
    row: 3,
    items: [
      { label: "Bounding Box" },
      { label: "Coverage Area" },
      { label: "Zoom", link: true },
      { label: "Edit", link: true },
      { label: "Delete", link: true },
    ],
  },
  {
    id: "filters",
    title: "Filters",
    col: 3,
    row: 1,
    items: [
      { label: "Date Range", link: true },
      { label: "Cloud Cover (%)", link: true },
      { label: "Data Source", link: true },
    ],
  },
  {
    id: "image",
    title: "Image",
    col: 3,
    row: 2,
    rowSpan: 2,
    items: [
      { label: "Thumbnail" },
      { label: "Date" },
      { label: "Data Source" },
      { label: "Cloud Cover" },
      { label: "Toggle Preview", link: true },
      { label: "View Metadata", link: true },
      { label: "Toggle Selection", link: true },
    ],
  },
  {
    id: "preview",
    title: "Preview",
    col: 4,
    row: 1,
    items: [{ label: "Outline" }, { label: "Image" }],
  },
  {
    id: "metadata",
    title: "Metadata",
    col: 4,
    row: 2,
    items: [{ label: "[...]" }, { label: "Toggle Preview", link: true }],
  },
  {
    id: "selection",
    title: "Selection",
    col: 4,
    row: 3,
    items: [
      { label: "Images" },
      { label: "Clear Selection", link: true },
      { label: "View Parameters", link: true },
    ],
  },
  {
    id: "workflow",
    title: "Workflow Parameters",
    col: 5,
    row: 2,
    rowSpan: 2,
    items: [
      { label: "Geometry" },
      { label: "Image Identifiers" },
      { label: "Date Range" },
      { label: "Data Source" },
      { label: "Copy to Clipboard", link: true },
    ],
  },
];

/** Signifier → destination place (title is the related affordance). */
type Link = {
  fromPlace: string;
  fromItem: string;
  toPlace: string;
};

const links: Link[] = [
  { fromPlace: "map", fromItem: "Search", toPlace: "search" },
  { fromPlace: "map", fromItem: "Import Geometry", toPlace: "geometry" },
  { fromPlace: "search", fromItem: "Edit Geometry", toPlace: "geometry" },
  { fromPlace: "search", fromItem: "Filters", toPlace: "filters" },
  { fromPlace: "search", fromItem: "Results", toPlace: "image" },
  { fromPlace: "search", fromItem: "View Selection", toPlace: "selection" },
  { fromPlace: "image", fromItem: "Toggle Preview", toPlace: "preview" },
  { fromPlace: "image", fromItem: "View Metadata", toPlace: "metadata" },
  { fromPlace: "image", fromItem: "Toggle Selection", toPlace: "selection" },
  { fromPlace: "metadata", fromItem: "Toggle Preview", toPlace: "preview" },
  { fromPlace: "selection", fromItem: "View Parameters", toPlace: "workflow" },
];

type Box = { x: number; y: number; w: number; h: number };

function itemKey(placeId: string, label: string) {
  return `${placeId}::${label}`;
}

function titleKey(placeId: string) {
  return `${placeId}::title`;
}

function placeKey(placeId: string) {
  return `${placeId}::place`;
}

/**
 * Soft curve: leave the source place’s right edge at the signifier;
 * arrive at the destination place’s left edge (vertically aligned with
 * the title), always approaching from the left so the arrow points
 * toward the title.
 */
function linkPath(fromPlace: Box, fromItem: Box, toPlace: Box, toTitle: Box) {
  const y1 = fromItem.y + fromItem.h / 2;
  const y2 = toTitle.y + toTitle.h / 2;
  const x1 = fromPlace.x + fromPlace.w;
  const x2 = toPlace.x;
  const fromCx = fromPlace.x + fromPlace.w / 2;
  const toCx = toPlace.x + toPlace.w / 2;
  const colSlack = Math.max(fromPlace.w, toPlace.w) * 0.5;
  const sameColumn = Math.abs(toCx - fromCx) < colSlack;

  // Approach from the left so orient=auto points into the box / toward the title.
  const approach = Math.max(24, Math.min(fromPlace.w, toPlace.w) * 0.35);

  if (sameColumn) {
    // Loop out to the right, then curve back to the box edge from the left.
    const bulge = Math.max(28, Math.min(fromPlace.w, toPlace.w) * 0.5);
    return `M ${x1} ${y1} C ${x1 + bulge} ${y1}, ${x2 - approach} ${y2}, ${x2} ${y2}`;
  }

  const mx = (x1 + x2) / 2;
  const c2x = Math.min(mx, x2 - approach);
  return `M ${x1} ${y1} C ${mx} ${y1}, ${c2x} ${y2}, ${x2} ${y2}`;
}

const boxBg =
  "bg-[color-mix(in_oklch,var(--muted-foreground)_14%,var(--muted))]";

/** Connector stroke — process-diagram Materialise. */
const linkStroke = "var(--chart-3)";

export function BreadboardDiagram() {
  const uid = useId().replace(/:/g, "");
  const arrowId = `bb-arrow-${uid}`;
  const rootRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLElement | null>>({});
  const [boxes, setBoxes] = useState<Record<string, Box>>({});
  const [size, setSize] = useState({ w: 1, h: 1 });

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const rootRect = root.getBoundingClientRect();
      const next: Record<string, Box> = {};
      for (const [key, el] of Object.entries(nodeRefs.current)) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        next[key] = {
          x: r.left - rootRect.left,
          y: r.top - rootRect.top,
          w: r.width,
          h: r.height,
        };
      }
      setBoxes(next);
      setSize({ w: rootRect.width, h: rootRect.height });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    for (const el of Object.values(nodeRefs.current)) {
      if (el) ro.observe(el);
    }
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative w-full"
      role="img"
      aria-label="Breadboard connecting map, search, filters, selection, metadata, and workflow parameters."
    >
      <div
        className="relative grid items-start gap-3 @3xl:gap-4"
        style={{
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gridTemplateRows: "auto auto auto",
        }}
      >
        {places.map((place) => (
          <div
            key={place.id}
            ref={(el) => {
              nodeRefs.current[placeKey(place.id)] = el;
            }}
            className={`h-fit px-2.5 py-2 text-foreground ${boxBg}`}
            style={{
              gridColumn: place.col,
              gridRow: `${place.row} / span ${place.rowSpan ?? 1}`,
              alignSelf: "start",
            }}
          >
            <p
              ref={(el) => {
                nodeRefs.current[titleKey(place.id)] = el;
              }}
              className="font-mono text-xs font-bold leading-tight"
            >
              {place.title}
            </p>
            <ul className="mt-1.5 space-y-0.5 font-mono text-[0.65rem] leading-snug">
              {place.items.map((item) => (
                <li
                  key={item.label}
                  ref={(el) => {
                    nodeRefs.current[itemKey(place.id, item.label)] = el;
                  }}
                  className={
                    item.link ? "underline underline-offset-2" : undefined
                  }
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Connectors above places */}
      <svg
        className="pointer-events-none absolute inset-0 z-10 size-full"
        viewBox={`0 0 ${size.w} ${size.h}`}
        aria-hidden
      >
        <defs>
          {/* refX at the chevron’s open rear so the stroke meets there, tip ahead */}
          <marker
            id={arrowId}
            viewBox="0 0 8 8"
            markerWidth="8"
            markerHeight="8"
            refX="1.5"
            refY="4"
            orient="auto"
            markerUnits="userSpaceOnUse"
            overflow="visible"
          >
            <path
              d="M1.5 1.5 L6.5 4 L1.5 6.5"
              fill="none"
              stroke={linkStroke}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>
        {links.map((link) => {
          const fromPlace = boxes[placeKey(link.fromPlace)];
          const fromItem = boxes[itemKey(link.fromPlace, link.fromItem)];
          const toPlace = boxes[placeKey(link.toPlace)];
          const toTitle = boxes[titleKey(link.toPlace)];
          if (!fromPlace || !fromItem || !toPlace || !toTitle) return null;
          const d = linkPath(fromPlace, fromItem, toPlace, toTitle);
          const key = `${link.fromPlace}-${link.fromItem}-${link.toPlace}`;
          return (
            <path
              key={key}
              d={d}
              fill="none"
              stroke={linkStroke}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              markerEnd={`url(#${arrowId})`}
            />
          );
        })}
      </svg>
    </div>
  );
}
