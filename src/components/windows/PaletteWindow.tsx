"use client";

import { memo } from "react";
import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface PaletteWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

type Swatch = {
  token: string;
  /** Tailwind background utility, e.g. bg-muted */
  bg: string;
  /** Optional foreground sample on the swatch */
  fg?: string;
  note?: string;
};

const surface: Swatch[] = [
  { token: "--background", bg: "bg-background", fg: "text-foreground" },
  { token: "--foreground", bg: "bg-foreground", fg: "text-background" },
  { token: "--card", bg: "bg-card", fg: "text-card-foreground" },
  { token: "--card-foreground", bg: "bg-card-foreground", fg: "text-card" },
  { token: "--popover", bg: "bg-popover", fg: "text-popover-foreground" },
  {
    token: "--popover-foreground",
    bg: "bg-popover-foreground",
    fg: "text-popover",
  },
];

const brand: Swatch[] = [
  { token: "--primary", bg: "bg-primary", fg: "text-primary-foreground" },
  {
    token: "--primary-foreground",
    bg: "bg-primary-foreground",
    fg: "text-primary",
  },
  { token: "--secondary", bg: "bg-secondary", fg: "text-secondary-foreground" },
  {
    token: "--secondary-foreground",
    bg: "bg-secondary-foreground",
    fg: "text-secondary",
  },
  { token: "--accent", bg: "bg-accent", fg: "text-accent-foreground" },
  {
    token: "--accent-foreground",
    bg: "bg-accent-foreground",
    fg: "text-accent",
  },
  { token: "--muted", bg: "bg-muted", fg: "text-muted-foreground" },
  {
    token: "--muted-foreground",
    bg: "bg-muted-foreground",
    fg: "text-muted",
  },
  {
    token: "--destructive",
    bg: "bg-destructive",
    fg: "text-destructive-foreground",
  },
  {
    token: "--destructive-foreground",
    bg: "bg-destructive-foreground",
    fg: "text-destructive",
  },
];

const chrome: Swatch[] = [
  { token: "--border", bg: "bg-border" },
  { token: "--input", bg: "bg-input" },
  { token: "--ring", bg: "bg-ring" },
];

const charts: Swatch[] = [
  { token: "--chart-1", bg: "bg-chart-1" },
  { token: "--chart-2", bg: "bg-chart-2" },
  { token: "--chart-3", bg: "bg-chart-3" },
  { token: "--chart-4", bg: "bg-chart-4" },
  { token: "--chart-5", bg: "bg-chart-5" },
];

const sidebar: Swatch[] = [
  { token: "--sidebar", bg: "bg-sidebar", fg: "text-sidebar-foreground" },
  {
    token: "--sidebar-foreground",
    bg: "bg-sidebar-foreground",
    fg: "text-sidebar",
  },
  {
    token: "--sidebar-primary",
    bg: "bg-sidebar-primary",
    fg: "text-sidebar-primary-foreground",
  },
  {
    token: "--sidebar-primary-foreground",
    bg: "bg-sidebar-primary-foreground",
    fg: "text-sidebar-primary",
  },
  {
    token: "--sidebar-accent",
    bg: "bg-sidebar-accent",
    fg: "text-sidebar-accent-foreground",
  },
  {
    token: "--sidebar-accent-foreground",
    bg: "bg-sidebar-accent-foreground",
    fg: "text-sidebar-accent",
  },
  { token: "--sidebar-border", bg: "bg-sidebar-border" },
  { token: "--sidebar-ring", bg: "bg-sidebar-ring" },
];

const shadows = [
  { token: "--shadow-2xs", className: "shadow-2xs" },
  { token: "--shadow-xs", className: "shadow-xs" },
  { token: "--shadow-sm", className: "shadow-sm" },
  { token: "--shadow", className: "shadow" },
  { token: "--shadow-md", className: "shadow-md" },
  { token: "--shadow-lg", className: "shadow-lg" },
  { token: "--shadow-xl", className: "shadow-xl" },
  { token: "--shadow-2xl", className: "shadow-2xl" },
] as const;

function SwatchGrid({ items }: { items: Swatch[] }) {
  return (
    <ul className="grid grid-cols-1 gap-2 @min-[28rem]:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.token}
          className="flex min-w-0 items-stretch overflow-hidden rounded-sm border"
        >
          <div
            className={`flex w-16 shrink-0 items-center justify-center ${item.bg} ${item.fg ?? ""}`}
            aria-hidden
          >
            {item.fg ? (
              <span className="font-mono text-[0.65rem]">Aa</span>
            ) : null}
          </div>
          <div className="min-w-0 flex-1 px-2.5 py-2">
            <p className="truncate font-mono text-xs">{item.token}</p>
            {item.note ? (
              <p className="truncate text-[0.65rem] text-muted-foreground">
                {item.note}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 font-serif text-base">{title}</h2>
      {children}
    </section>
  );
}

function PaletteWindow({ onClose, windowRef }: PaletteWindowProps) {
  return (
    <Window
      id="theme"
      ref={windowRef}
      className="w-150 left-1/2 top-1/2 -translate-1/2 @container"
      onClose={onClose}
    >
      <WindowTitle>Theme Variables</WindowTitle>
      <WindowContent>
        <p className="text-sm text-muted-foreground">shadcn</p>
        <p className="mb-4 font-serif text-xl">Theme Variables</p>

        <Section title="Surfaces">
          <SwatchGrid items={surface} />
        </Section>

        <Section title="Brand &amp; text">
          <SwatchGrid items={brand} />
        </Section>

        <Section title="Chrome">
          <SwatchGrid items={chrome} />
        </Section>

        <Section title="Charts">
          <SwatchGrid items={charts} />
        </Section>

        <Section title="Sidebar">
          <SwatchGrid items={sidebar} />
        </Section>

        <Section title="Shadows">
          <ul className="grid grid-cols-2 gap-3 @min-[28rem]:grid-cols-4">
            {shadows.map((item) => (
              <li key={item.token} className="min-w-0">
                <div
                  className={`mb-2 flex h-14 items-center justify-center rounded-sm border bg-card ${item.className}`}
                />
                <p className="truncate font-mono text-[0.65rem]">{item.token}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Type">
          <div className="space-y-3 rounded-sm border p-4">
            <p className="font-sans text-sm">
              <span className="text-muted-foreground">--font-sans · </span>
              Inconsolata — The quick brown fox
            </p>
            <p className="font-serif text-sm">
              <span className="text-muted-foreground">--font-serif · </span>
              FF Meta Serif — The quick brown fox
            </p>
            <p className="font-mono text-sm">
              <span className="text-muted-foreground">--font-mono · </span>
              Inconsolata — The quick brown fox
            </p>
          </div>
        </Section>
      </WindowContent>
    </Window>
  );
}

export default memo(PaletteWindow);
