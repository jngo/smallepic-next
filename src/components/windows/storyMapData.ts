/**
 * Story map content and layout tokens for StoryMapTable.
 */

export type StoryColumn = {
  title: string;
  mvp: string[];
  backlog: string[];
};

export type StoryPhase = {
  id: string;
  title: string;
  columns: StoryColumn[];
};

export const storyMapPhases: StoryPhase[] = [
  {
    id: "search",
    title: "Search",
    columns: [
      {
        title: "Data Providers",
        mvp: ["Data Provider: OneAtlas"],
        backlog: [
          "Data Provider: Sobloo",
          "Data Provider: Sentinel Hub",
          "Data Provider: OneAtlas Archive",
          "Other Data Providers",
        ],
      },
      {
        title: "Querying",
        mvp: [
          "Geocoding",
          "Geometry Editor: Area of Interest",
          "Geometry Import: GeoJSON",
        ],
        backlog: [
          "Geometry Import: Shapefile",
          "Geometry Import: KML",
          "Search: Image ID",
          "Search: Latitude & Longitude",
        ],
      },
      {
        title: "Filtering",
        mvp: [
          "Filter: Date Range",
          "Filter: Cloud Cover",
          "Filter: Data Source",
        ],
        backlog: [
          "Filter: AOI Coverage",
          "Filter: Time Series",
          "Filter: Additional Filters",
        ],
      },
    ],
  },
  {
    id: "select",
    title: "Select",
    columns: [
      {
        title: "Preview",
        mvp: ["Images Previews", "Image Metadata (i.e. ID)"],
        backlog: [],
      },
      {
        title: "Selection",
        mvp: ["Image Selection"],
        backlog: [],
      },
    ],
  },
  {
    id: "acquire",
    title: "Acquire",
    columns: [
      {
        title: "Workflows",
        mvp: [
          "Job Parameters: Date",
          "Job Parameters: Geometry",
          "Job Parameters: Cloud Cover",
        ],
        backlog: [
          "Job Configuration: Workflow Selector",
          "Sunset Dry Runs",
        ],
      },
      {
        title: "Storage",
        mvp: [],
        backlog: ["Data Ordering", "Satellite Tasking"],
      },
    ],
  },
];

/** Lane accents — chart-2 ≈ Figma MVP green; chart-3 ≈ Figma backlog warm. */
export const STORY_LANE = {
  mvp: "var(--chart-2)",
  backlog: "var(--chart-3)",
} as const;

/** Fixed card box — two-line text-sm; ~4 columns fit in the w-200 window. */
export const STORY_CARD_H = "3rem";
export const STORY_CARD_W = "10rem";
export const STORY_CARD_GAP = "0.5rem"; // gap-2; lane rules use pt-4/pb-4 (1rem)
export const STORY_COL_GAP = "0.75rem";
export const STORY_LABEL_W = "8.5rem";

export const STORY_MAX_MVP = Math.max(
  ...storyMapPhases.flatMap((p) => p.columns.map((c) => c.mvp.length)),
  1,
);
export const STORY_MAX_BACKLOG = Math.max(
  ...storyMapPhases.flatMap((p) => p.columns.map((c) => c.backlog.length)),
  1,
);

export function storyStackHeight(slots: number) {
  if (slots <= 0) return STORY_CARD_H;
  return `calc(${slots} * ${STORY_CARD_H} + ${slots - 1} * ${STORY_CARD_GAP})`;
}

export const STORY_MVP_STACK_H = storyStackHeight(STORY_MAX_MVP);
export const STORY_BACKLOG_STACK_H = storyStackHeight(STORY_MAX_BACKLOG);

export const storyCardClass =
  "box-border flex h-12 w-full shrink-0 items-center overflow-hidden rounded-[2px] px-2.5 font-mono text-sm leading-4 text-background bg-[color-mix(in_oklch,var(--muted-foreground)_70%,var(--chart-4))]";

export const storyMapColumns = storyMapPhases.flatMap((p) =>
  p.columns.map((c) => ({ ...c, phaseId: p.id, phaseTitle: p.title })),
);
