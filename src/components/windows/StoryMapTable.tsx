/**
 * Catalog Search story map — HTML table with sticky swim-lane labels and
 * full-bleed horizontal scroll. Sticky column width = content inset + label
 * (bg-muted/70 overlay includes the left gutter); lane borders stay on the
 * label only. A trailing spacer mirrors the content inset on the right.
 */

import {
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

function CardStack({
  items,
  height,
}: {
  items: string[];
  height: string;
}) {
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
  color,
  last = false,
}: {
  label: string;
  color: string;
  /** Last swim lane — no bottom padding (figure stage py handles inset). */
  last?: boolean;
}) {
  // Border spans label + trailing column gap (content box), not the left inset gutter.
  return (
    <div
      className={`border-t pt-4${last ? "" : " pb-4"}`}
      style={{ color, borderColor: color }}
    >
      <span className="block" style={{ width: STORY_LABEL_W }}>
        {label}
      </span>
    </div>
  );
}

export function StoryMapTable() {
  const lastColIndex = storyMapColumns.length - 1;

  return (
    <div
      className="overflow-x-auto overscroll-x-none py-8 @3xl:py-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [--story-inset:2rem] @3xl:[--story-inset:3rem]"
      role="region"
      aria-label="Story map: Search, Select, and Acquire across Minimum Viable Product and Backlog swim lanes. Swim-lane labels and the current activity header stay fixed while scrolling horizontally."
    >
      {/* border-spacing: 0 keeps the table flush with the figure edges */}
      <table className="border-separate border-spacing-0 text-sm">
        <thead>
          <tr>
            <th
              scope="col"
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
                    color: "var(--chart-4)",
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
                className="h-4 pb-4 text-left font-mono text-sm font-normal leading-4 text-foreground"
                style={{
                  width: STORY_CARD_W,
                  minWidth: STORY_CARD_W,
                  ...(i === lastColIndex ? undefined : colPad),
                }}
              >
                <span className="block truncate" style={{ width: STORY_CARD_W }}>
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
                color={STORY_LANE.mvp}
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
              className={stickyLabel}
              style={{
                width: stickyColWidth,
                minWidth: stickyColWidth,
                paddingLeft: "var(--story-inset)",
                paddingRight: STORY_COL_GAP,
              }}
            >
              <LaneLabel label="Backlog" color={STORY_LANE.backlog} last />
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
                <CardStack items={col.backlog} height={STORY_BACKLOG_STACK_H} />
              </td>
            ))}
            <td aria-hidden style={endSpacerStyle} />
          </tr>
        </tbody>
      </table>
    </div>
  );
}
