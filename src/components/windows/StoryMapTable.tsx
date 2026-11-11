/**
 * Catalog Search story map — wide: HTML table with sticky swim-lane labels and
 * horizontal scroll + arrow affordances beneath the muted stage. Narrow: two
 * release slides (MVP | Backlog) as a carousel, each walking Search → Select →
 * Acquire.
 */

"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  CarouselArrows,
  scrollCarouselSlide,
  useCarouselControls,
  useHorizontalOverflow,
} from "@/components/windows/carouselControls";
import {
  STORY_ACTIVITY,
  STORY_BACKLOG_STACK_H,
  STORY_CARD_W,
  STORY_COL_GAP,
  STORY_LABEL_W,
  STORY_LANE,
  STORY_MVP_STACK_H,
  storyCardClass,
  storyMapColumns,
  storyMapPhases,
} from "@/components/windows/storyMapData";

function activityColor(phaseId: string) {
  return (
    STORY_ACTIVITY[phaseId as keyof typeof STORY_ACTIVITY] ??
    "var(--chart-4)"
  );
}

/** Match process/chart hybrid switch. */
const STACKED_MAX_PX = 480;

const stickyLabel =
  "sticky left-0 z-20 box-border bg-muted/70 text-left align-top font-mono text-sm leading-4";

const stickyCorner = "sticky left-0 z-30 box-border bg-muted/70";

/**
 * Sticky column: left inset (overlay) + label + column gap before first card.
 * Overlay reaches the bleed edge; borders stay on the label only.
 */
const stickyColWidth = `calc(var(--story-inset) + ${STORY_LABEL_W} + ${STORY_COL_GAP})`;

/** Activity headers stick just after the frozen overlay column. */
const stickyActivityLeft = stickyColWidth;

const colPad = { paddingRight: STORY_COL_GAP } as const;

/** Matches WindowContent padding on the trailing edge (scrolls with the table). */
const endSpacerStyle = {
  width: "var(--story-inset)",
  minWidth: "var(--story-inset)",
  padding: 0,
} as const;

const releases = [
  {
    id: "mvp",
    label: "Minimum Viable Product",
    key: "mvp" as const,
  },
  {
    id: "backlog",
    label: "Backlog",
    key: "backlog" as const,
  },
] as const;

function CardStack({
  items,
  height,
}: {
  items: string[];
  height: string;
}) {
  if (items.length === 0) return null;

  return (
    <ul
      className="flex flex-col gap-2"
      style={{ height, width: STORY_CARD_W }}
    >
      {items.map((item) => (
        <li key={item} className={storyCardClass}>
          <span className="line-clamp-2">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function LaneLabel({
  label,
  borderColor,
  last = false,
}: {
  label: string;
  /** Swim-lane rule only — release heading text stays black/foreground. */
  borderColor: string;
  /** Last swim lane — no bottom padding (figure stage py handles inset). */
  last?: boolean;
}) {
  // Border spans label + trailing column gap (content box), not the left inset gutter.
  return (
    <div
      className={`border-t pt-4 text-foreground${last ? "" : " pb-4"}`}
      style={{ borderColor }}
    >
      <span className="block" style={{ width: STORY_LABEL_W }}>
        {label}
      </span>
    </div>
  );
}

function scrollStoryMapByColumn(scroller: HTMLElement, delta: -1 | 1) {
  const cols = Array.from(
    scroller.querySelectorAll<HTMLElement>("[data-story-col]"),
  );
  if (cols.length === 0) return;

  const sticky = scroller.querySelector<HTMLElement>("[data-story-sticky]");
  const leftEdge = sticky
    ? sticky.getBoundingClientRect().right
    : scroller.getBoundingClientRect().left;

  let current = 0;
  cols.forEach((col, index) => {
    const rect = col.getBoundingClientRect();
    if (rect.left <= leftEdge + rect.width * 0.35) current = index;
  });

  const next = Math.min(cols.length - 1, Math.max(0, current + delta));
  const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
  if (next === 0) {
    scroller.scrollTo({ left: 0, behavior: "smooth" });
    return;
  }
  if (next === cols.length - 1) {
    scroller.scrollTo({ left: max, behavior: "smooth" });
    return;
  }

  const target = cols[next];
  const left =
    scroller.scrollLeft + (target.getBoundingClientRect().left - leftEdge);
  scroller.scrollTo({
    left: Math.min(max, Math.max(0, left)),
    behavior: "smooth",
  });
}

function StoryMapWide({ caption }: { caption?: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { canPrev, canNext, hasOverflow } = useHorizontalOverflow(scrollerRef);
  const lastColIndex = storyMapColumns.length - 1;

  const scrollPrev = useCallback(() => {
    const scroller = scrollerRef.current;
    if (scroller) scrollStoryMapByColumn(scroller, -1);
  }, []);

  const scrollNext = useCallback(() => {
    const scroller = scrollerRef.current;
    if (scroller) scrollStoryMapByColumn(scroller, 1);
  }, []);

  return (
    <>
      <div className="bg-muted">
        <div
          ref={scrollerRef}
          data-carousel-scroller
          className="overflow-x-auto overscroll-x-none py-8 @3xl:py-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* border-spacing: 0 keeps the table flush with the figure edges */}
          <table className="border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                <th
                  scope="col"
                  data-story-sticky
                  className={stickyCorner}
                  style={{
                    width: stickyColWidth,
                    minWidth: stickyColWidth,
                    paddingLeft: "var(--story-inset)",
                    paddingRight: STORY_COL_GAP,
                  }}
                />
                {storyMapPhases.map((phase, phaseIndex) => {
                  const isLastPhase =
                    phaseIndex === storyMapPhases.length - 1;
                  return (
                    <th
                      key={phase.id}
                      scope="colgroup"
                      colSpan={phase.columns.length}
                      className="sticky h-4 bg-muted pb-4 text-left font-serif text-sm font-normal leading-4"
                      style={{
                        color: activityColor(phase.id),
                        left: stickyActivityLeft,
                        zIndex: 10 + phaseIndex,
                        ...(isLastPhase ? undefined : colPad),
                      }}
                    >
                      {phase.title}
                    </th>
                  );
                })}
                <th aria-hidden style={endSpacerStyle} />
              </tr>
              <tr>
                <th
                  scope="col"
                  data-story-sticky
                  className={stickyCorner}
                  style={{
                    width: stickyColWidth,
                    minWidth: stickyColWidth,
                    paddingLeft: "var(--story-inset)",
                    paddingRight: STORY_COL_GAP,
                  }}
                />
                {storyMapColumns.map((col, i) => (
                  <th
                    key={`${col.phaseId}-${col.title}`}
                    scope="col"
                    data-story-col
                    className="h-4 pb-4 text-left text-sm font-bold leading-4"
                    style={{
                      color: activityColor(col.phaseId),
                      width: STORY_CARD_W,
                      minWidth: STORY_CARD_W,
                      ...(i === lastColIndex ? undefined : colPad),
                    }}
                  >
                    <span
                      className="block truncate"
                      style={{ width: STORY_CARD_W }}
                    >
                      {col.title}
                    </span>
                  </th>
                ))}
                <th aria-hidden style={endSpacerStyle} />
              </tr>
            </thead>

            <tbody>
              <tr>
                <th
                  scope="row"
                  data-story-sticky
                  className={stickyLabel}
                  style={{
                    width: stickyColWidth,
                    minWidth: stickyColWidth,
                    paddingLeft: "var(--story-inset)",
                    paddingRight: STORY_COL_GAP,
                  }}
                >
                  <LaneLabel
                    label="Minimum Viable Product"
                    borderColor={STORY_LANE.mvp}
                  />
                </th>
                {storyMapColumns.map((col, i) => (
                  <td
                    key={`${col.phaseId}-${col.title}-mvp`}
                    className="border-t pt-4 pb-4 align-top"
                    style={{
                      borderColor: STORY_LANE.mvp,
                      ...(i === lastColIndex ? undefined : colPad),
                    }}
                  >
                    <CardStack items={col.mvp} height={STORY_MVP_STACK_H} />
                  </td>
                ))}
                <td aria-hidden style={endSpacerStyle} />
              </tr>

              <tr>
                <th
                  scope="row"
                  data-story-sticky
                  className={stickyLabel}
                  style={{
                    width: stickyColWidth,
                    minWidth: stickyColWidth,
                    paddingLeft: "var(--story-inset)",
                    paddingRight: STORY_COL_GAP,
                  }}
                >
                  <LaneLabel
                    label="Backlog"
                    borderColor={STORY_LANE.backlog}
                    last
                  />
                </th>
                {storyMapColumns.map((col, i) => (
                  <td
                    key={`${col.phaseId}-${col.title}-backlog`}
                    className="border-t pt-4 align-top"
                    style={{
                      borderColor: STORY_LANE.backlog,
                      ...(i === lastColIndex ? undefined : colPad),
                    }}
                  >
                    <CardStack
                      items={col.backlog}
                      height={STORY_BACKLOG_STACK_H}
                    />
                  </td>
                ))}
                <td aria-hidden style={endSpacerStyle} />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {caption ? (
        <figcaption className="mx-8 @3xl:mx-12 mt-2 text-center text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
      <CarouselArrows
        canPrev={canPrev}
        canNext={canNext}
        onPrev={scrollPrev}
        onNext={scrollNext}
        hidden={!hasOverflow}
      />
    </>
  );
}

function ReleaseTimeline({
  release,
}: {
  release: (typeof releases)[number];
}) {
  return (
    <>
      <h4 className="font-serif text-base font-normal leading-5 text-foreground">
        {release.label}
      </h4>

      {/* Keep Search → Select → Acquire even when a release has no stories in a beat. */}
      <ol className="relative flex flex-col gap-5 pl-1">
        <span
          className="pointer-events-none absolute top-2 bottom-2 left-[calc(0.25rem+3px)] w-px bg-border"
          aria-hidden
        />
        {storyMapPhases.map((phase) => {
          const color = activityColor(phase.id);
          const columns = phase.columns.filter(
            (column) => column[release.key].length > 0,
          );

          return (
            <li
              key={`${release.id}-${phase.id}`}
              className="flex flex-col gap-3"
            >
              <div className="relative flex items-center gap-4">
                <span
                  className="relative z-10 flex w-1.5 shrink-0 justify-center"
                  aria-hidden
                >
                  <span
                    className="size-1.5 rounded-full"
                    style={{ background: color }}
                  />
                </span>
                <h5
                  className="font-serif text-sm font-normal leading-4"
                  style={{ color }}
                >
                  {phase.title}
                </h5>
              </div>
              {columns.map((column) => (
                <div
                  key={`${release.id}-${phase.id}-${column.title}`}
                  className="relative flex items-center gap-4"
                >
                  <span
                    className="relative z-10 flex w-1.5 shrink-0 justify-center self-start pt-[5px]"
                    aria-hidden
                  >
                    <span
                      className="size-1.5 rounded-full"
                      style={{ background: color }}
                    />
                  </span>
                  <div className="min-w-0 flex-1 text-sm leading-4">
                    <p className="font-bold" style={{ color }}>
                      {column.title}
                    </p>
                    <ul className="text-muted-foreground">
                      {column[release.key].map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </li>
          );
        })}
      </ol>
    </>
  );
}

function StoryMapStacked({ caption }: { caption?: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { canPrev, canNext, scrollPrev, scrollNext, hasOverflow } =
    useCarouselControls(scrollerRef);

  return (
    <>
      <div className="bg-muted">
        <div
          ref={scrollerRef}
          data-carousel-scroller
          className="overflow-x-auto overscroll-x-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex">
            {releases.map((release, index) => (
              <section
                key={release.id}
                data-carousel-slide
                className="flex w-full min-w-full shrink-0 cursor-pointer flex-col gap-6 px-[var(--story-inset)] py-8 @3xl:py-12"
                onClick={(event) => {
                  scrollCarouselSlide(
                    event.currentTarget,
                    index,
                    releases.length,
                  );
                }}
              >
                <ReleaseTimeline release={release} />
              </section>
            ))}
          </div>
        </div>
      </div>
      {caption ? (
        <figcaption className="mx-8 @3xl:mx-12 mt-2 text-center text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
      <CarouselArrows
        canPrev={canPrev}
        canNext={canNext}
        onPrev={scrollPrev}
        onNext={scrollNext}
        hidden={!hasOverflow}
      />
    </>
  );
}

export function StoryMapTable({ caption }: { caption?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<"table" | "stacked">("table");

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const update = () => {
      const w = el.getBoundingClientRect().width;
      if (w <= 0) return;
      setLayout(w < STACKED_MAX_PX ? "stacked" : "table");
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="[--story-inset:2rem] @3xl:[--story-inset:3rem]"
      role="region"
      aria-label={
        layout === "table"
          ? "Story map: Search, Select, and Acquire across Minimum Viable Product and Backlog swim lanes. Swim-lane labels and the current activity header stay fixed while scrolling horizontally."
          : "Story map by release: swipe or use arrows to switch between Minimum Viable Product and Backlog, each walking Search, Select, and Acquire."
      }
    >
      {layout === "table" ? (
        <StoryMapWide caption={caption} />
      ) : (
        <StoryMapStacked caption={caption} />
      )}
    </div>
  );
}
