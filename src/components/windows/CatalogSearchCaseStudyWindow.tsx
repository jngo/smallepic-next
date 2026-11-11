"use client"

import {
  memo,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";
import {
  CarouselArrows,
  scrollCarouselSlide,
  useCarouselControls,
} from "@/components/windows/carouselControls";
import { DesignThinkingProcessDiagram } from "@/components/windows/DesignThinkingProcessDiagram";
import { PopularDataSourcesChart } from "@/components/windows/PopularDataSourcesChart";
import { StoryMapTable } from "@/components/windows/StoryMapTable";
import { BreadboardDiagram } from "@/components/windows/BreadboardDiagram";

interface CatalogSearchCaseStudyWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

/** Full-bleed figure stage padding — matches WindowContent. */
const FIGURE_PAD_X = "px-8 @3xl:px-12";
const FIGURE_PAD_Y = "py-8 @3xl:py-12";
/** Top-only when framed windows peek from the muted band’s bottom edge. */
const FIGURE_PAD_Y_TOP = "pt-8 @3xl:pt-12";

type CarouselItem = {
  src: string;
  alt: string;
  title?: string;
  caption: string;
  width: number;
  height: number;
};

const customerQuotes = [
  "Unified cataloging system and open search is high on our list.",
  "Needs basic search & discovery tools for imagery in terms of availability over an area, cloud cover, dates, etc\u2026",
  "They want a map that shows the coverage of the Pl\u00e9iades and SPOT archives\u2014major problem that customers have is that they can\u2019t find imagery over the area they are looking for.",
];

const userInterviewQuotes = [
  "If you do a [dry run] and don\u2019t get results you want, you get stuck because you can\u2019t edit that [dry run]. It\u2019s a one time test that gets thrown away and you can\u2019t re-use it.",
  "Being able to look on a map and see the availability of imagery in a given area is important. Doesn\u2019t want to spend credits to query the catalog. Called it \u2018shooting in the dark\u2019.",
  "Can test data query images be viewed through the API? E.g. want to be able to show a previewed low-resolution image to customer prior to them making a purchase.",
];

/** Early BETA replies — shown as email cards rather than interview pull-quotes. */
const betaFeedbackEmails = [
  "I have seen the new UI and features of the platform, it looks great, specifically the search feature in the catalog is really helpful. I am satisfied with the current features and data sources available on the platform.",
  "thanks for sending the update - i just logged in and it looks great so far!",
];

const competitors: CarouselItem[] = [
  { src: "/catalog-search-competitors/blacksky.png", alt: "BlackSky catalog search interface.", caption: "BlackSky", width: 1200, height: 655 },
  { src: "/catalog-search-competitors/eos-land-viewer.png", alt: "EOS Land Viewer catalog search interface.", caption: "EOS Land Viewer", width: 1200, height: 655 },
  { src: "/catalog-search-competitors/land-info.png", alt: "Land Info Worldwide Mapping catalog search interface.", caption: "Land Info Worldwide Mapping", width: 1200, height: 655 },
  { src: "/catalog-search-competitors/airbus-oneatlas.png", alt: "Airbus OneAtlas catalog search interface.", caption: "Airbus OneAtlas", width: 1200, height: 655 },
  { src: "/catalog-search-competitors/sobloo.png", alt: "Sobloo catalog search interface.", caption: "Sobloo", width: 1200, height: 655 },
  { src: "/catalog-search-competitors/usgs.png", alt: "United States Geological Survey catalog search interface.", caption: "United States Geological Survey", width: 1200, height: 655 },
];

const uiPrototypes: CarouselItem[] = [
  {
    src: "/catalog-search-filters.png",
    alt: "Search chips, filters panel, and dual-month calendar for date range, cloud cover, and data sources.",
    title: "Filters",
    caption:
      "Feedback pointed to date range and cloud cover as key filters. Most date queries needed only a two-month range.",
    width: 1308,
    height: 1200,
  },
  {
    src: "/catalog-search-image-selection.png",
    alt: "Shopping cart metaphor for selecting imagery before acquisition.",
    title: "Image Selection",
    caption: "A \u2018shopping cart\u2019 metaphor was adopted to convey a mental model for how data selection works.",
    width: 936,
    height: 984,
  },
  {
    src: "/catalog-search-metadata.png",
    alt: "Popover for displaying image metadata.",
    title: "Image Metadata",
    caption: "Popover for displaying image metadata.",
    width: 680,
    height: 1208,
  },
  {
    src: "/catalog-search-workflow-configuration.png",
    alt: "Popover for finding and running a workflow with selected imagery.",
    title: "Workflow Configuration",
    caption:
      "Takes customers from selected imagery into workflow configuration, the key unlock for acquisition.",
    width: 936,
    height: 1208,
  },
  {
    src: "/catalog-search-workflow-parameters.png",
    alt: "Interim solution for replicating search parameters or selected images.",
    title: "Workflow Parameters",
    caption:
      "With workflow creation out of scope, users could still reuse parameters or selections to run a job.",
    width: 1364,
    height: 1248,
  },
];

/** Pseudo window chrome shared by framed screenshots and carousels. */
function PseudoWindow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-t-sm bg-card shadow-xs">
      <div className="relative flex h-6 shrink-0 items-center bg-[color-mix(in_oklch,var(--muted-foreground)_14%,var(--muted))] px-2">
        <div className="flex items-center gap-1" aria-hidden>
          <span className="size-2 rounded-full bg-[color-mix(in_oklch,var(--muted-foreground)_45%,var(--muted))]" />
          <span className="size-2 rounded-full bg-[color-mix(in_oklch,var(--muted-foreground)_45%,var(--muted))]" />
          <span className="size-2 rounded-full bg-[color-mix(in_oklch,var(--muted-foreground)_45%,var(--muted))]" />
        </div>
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[0.65rem] text-muted-foreground">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

/** Wide competitor slide width — definite px so `w-max` tracks don’t explode. */
const COMPETITOR_SLOT_WIDE_PX = 28 * 16;
/** Shared caption measure under variable-width prototype images. */
const PROTOTYPE_CAPTION_WIDTH_PX = 20 * 16;
const PROTOTYPE_SCALE = 0.3;

function ImageCarousel({
  items,
  fill = true,
  mutedImages = false,
  caption,
}: {
  items: CarouselItem[];
  fill?: boolean;
  /** Full-bleed bg-muted behind the image band only (not captions). */
  mutedImages?: boolean;
  /** Shared figure caption; when set, per-slide captions are omitted. */
  caption?: string;
}) {
  // Prototypes share one scale (largest image fits the content column); competitor
  // slides use a definite px width. Avoid % widths inside `w-max` flex tracks —
  // they stay indefinite during max-content sizing, so scrollWidth blows up.
  const titleBarPx = 24; // h-6
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [contentWidthPx, setContentWidthPx] = useState(0);
  const { canPrev, canNext, scrollPrev, scrollNext, hasOverflow } =
    useCarouselControls(scrollerRef);

  // Content column = scroller width minus track padding (both carousel modes).
  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const update = () => {
      const track = scroller.firstElementChild;
      if (!(track instanceof HTMLElement)) return;
      const styles = getComputedStyle(track);
      const pad =
        (parseFloat(styles.paddingLeft) || 0) +
        (parseFloat(styles.paddingRight) || 0);
      const contentW = Math.max(0, scroller.clientWidth - pad);
      if (contentW <= 0) return;
      setContentWidthPx(contentW);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(scroller);
    return () => ro.disconnect();
  }, []);

  const competitorSlotWidthPx =
    contentWidthPx > 0 && contentWidthPx < COMPETITOR_SLOT_WIDE_PX
      ? contentWidthPx
      : COMPETITOR_SLOT_WIDE_PX;

  const maxPrototypeWidth = Math.max(...items.map((item) => item.width));
  const prototypeScale =
    !fill && contentWidthPx > 0
      ? Math.min(PROTOTYPE_SCALE, contentWidthPx / maxPrototypeWidth)
      : PROTOTYPE_SCALE;
  const prototypeCaptionWidthPx =
    !fill && contentWidthPx > 0
      ? Math.min(PROTOTYPE_CAPTION_WIDTH_PX, contentWidthPx)
      : PROTOTYPE_CAPTION_WIDTH_PX;

  const imageHeight = fill
    ? Math.max(
        ...items.map((item) => (competitorSlotWidthPx * item.height) / item.width),
      )
    : Math.max(...items.map((item) => item.height)) * prototypeScale;
  // Competitor slides use window chrome; include the title bar in the muted band.
  const framed = fill;
  const imageBandHeight = framed ? imageHeight + titleBarPx : imageHeight;
  const stageMuted = mutedImages || framed;

  return (
    <figure className="my-12 -mx-8 @3xl:-mx-12">
      {/*
        Full-bleed scroller; inset is padding on the inner track (not spacer
        nodes), so the first/last slides align with content and nothing empty
        can scroll into view past either end.
      */}
      <div className="relative">
        {stageMuted ? (
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 box-content bg-muted ${
              framed ? FIGURE_PAD_Y_TOP : FIGURE_PAD_Y
            }`}
            style={{ height: imageBandHeight }}
            aria-hidden
          />
        ) : null}
        <div
          ref={scrollerRef}
          data-carousel-scroller
          className="relative overflow-x-auto overscroll-x-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className={`flex w-max gap-8 @3xl:gap-12 ${FIGURE_PAD_X}`}>
            {items.map((item, index) => {
              const imageWidthPx = fill
                ? competitorSlotWidthPx
                : item.width * prototypeScale;
              // Prototypes: image keeps its own width; caption uses a shared
              // measure. Slide is the wider of the two so rhythm stays in the
              // images without clipping the caption.
              const slideWidthPx = fill
                ? competitorSlotWidthPx
                : Math.max(imageWidthPx, prototypeCaptionWidthPx);

              return (
              <figure
                key={item.src}
                data-carousel-slide
                className={`shrink-0 min-w-0 cursor-pointer ${
                  fill ? "" : "flex flex-col items-center"
                }`}
                style={{ width: slideWidthPx }}
                onClick={(event) => {
                  scrollCarouselSlide(event.currentTarget, index, items.length);
                }}
              >
                {/*
                  Vertical padding lives on the image band only so the muted
                  strip doesn’t run into the caption. Framed slides peek from
                  the bottom (top padding only).
                */}
                <div
                  className={
                    framed
                      ? // Clip shadow only at the band’s bottom; keep top/side falloff.
                        `${FIGURE_PAD_Y_TOP} [clip-path:inset(0_-12px_0_-12px)]`
                      : mutedImages
                        ? FIGURE_PAD_Y
                        : undefined
                  }
                  style={fill ? undefined : { width: imageWidthPx }}
                >
                  <div
                    className="flex items-end"
                    style={{ minHeight: imageBandHeight }}
                  >
                    {framed ? (
                      <PseudoWindow title={item.title ?? item.caption}>
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={item.width}
                          height={item.height}
                          className="block h-auto w-full"
                          loading="eager"
                          priority={index === 0}
                          unoptimized={process.env.NODE_ENV === "development"}
                        />
                      </PseudoWindow>
                    ) : (
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        className="w-full h-auto"
                        loading="eager"
                        priority={index === 0}
                        // Serve public/ files directly while iterating on exports.
                        unoptimized={process.env.NODE_ENV === "development"}
                      />
                    )}
                  </div>
                </div>
                {caption ? null : (
                  <figcaption
                    className="text-muted-foreground mt-2 text-pretty"
                    style={
                      fill ? undefined : { width: prototypeCaptionWidthPx }
                    }
                  >
                    {item.title ? (
                      <>
                        <strong className="text-foreground">{item.title}</strong>{" "}
                        {item.caption}
                      </>
                    ) : (
                      item.caption
                    )}
                  </figcaption>
                )}
              </figure>
              );
            })}
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
    </figure>
  );
}

/** Full-bleed muted stage + pseudo window chrome around a screenshot. */
function FramedScreenshot({
  src,
  alt,
  title,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  title: string;
  caption: string;
  width: number;
  height: number;
}) {
  return (
    <figure className="-mx-8 @3xl:-mx-12 my-12">
      <div
        className={`overflow-hidden bg-muted ${FIGURE_PAD_X} ${FIGURE_PAD_Y_TOP}`}
      >
        <PseudoWindow title={title}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="block h-auto w-full"
          />
        </PseudoWindow>
      </div>
      <figcaption className="mx-8 @3xl:mx-12 mt-2 text-center text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

function QuoteCarousel({ quotes }: { quotes: string[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { canPrev, canNext, scrollPrev, scrollNext, hasOverflow } =
    useCarouselControls(scrollerRef);

  return (
    <figure className="my-12 -mx-8 @3xl:-mx-12">
      <div
        ref={scrollerRef}
        data-carousel-scroller
        className="@container overflow-x-auto overscroll-x-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className={`flex w-max gap-6 @3xl:gap-8 ${FIGURE_PAD_X}`}>
          {quotes.map((quote, index) => (
            <blockquote
              key={quote}
              data-carousel-slide
              className="flex w-[76cqw] min-w-48 shrink-0 cursor-pointer items-center bg-muted p-6 @3xl:p-8 font-serif text-base text-center text-muted-foreground @min-[30rem]:w-[42cqw]"
              onClick={(event) => {
                scrollCarouselSlide(event.currentTarget, index, quotes.length);
              }}
            >
              &ldquo;{quote}&rdquo;
            </blockquote>
          ))}
        </div>
      </div>
      <CarouselArrows
        canPrev={canPrev}
        canNext={canNext}
        onPrev={scrollPrev}
        onNext={scrollNext}
        hidden={!hasOverflow}
      />
    </figure>
  );
}

/** Floor before the two-up email layout starts scrolling. */
const BETA_EMAIL_MIN_PX = 14 * 16;
const BETA_EMAIL_GAP_PX = 24; // gap-6

/**
 * BETA feedback as email cards: muted stage + window chrome (like framed
 * screenshots), mono header fields, body in default case-study type.
 * Wide: both cards share the content width. Narrow: min width + carousel.
 */
function BetaFeedbackEmails({ emails }: { emails: string[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [contentWidthPx, setContentWidthPx] = useState(0);
  const { canPrev, canNext, scrollPrev, scrollNext, hasOverflow } =
    useCarouselControls(scrollerRef);
  const subject = "RE: Catalog Search BETA";

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const update = () => {
      const track = scroller.firstElementChild;
      if (!(track instanceof HTMLElement)) return;
      const styles = getComputedStyle(track);
      const pad =
        (parseFloat(styles.paddingLeft) || 0) +
        (parseFloat(styles.paddingRight) || 0);
      const contentW = Math.max(0, scroller.clientWidth - pad);
      if (contentW <= 0) return;
      setContentWidthPx(contentW);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(scroller);
    return () => ro.disconnect();
  }, []);

  const slideWidthPx =
    contentWidthPx > 0
      ? Math.max(
          BETA_EMAIL_MIN_PX,
          (contentWidthPx - BETA_EMAIL_GAP_PX) / emails.length,
        )
      : BETA_EMAIL_MIN_PX;

  return (
    <figure className="my-12 -mx-8 @3xl:-mx-12">
      <div className="bg-muted">
        <div
          ref={scrollerRef}
          data-carousel-scroller
          className="overflow-x-auto overscroll-x-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            className={`flex w-max items-end gap-6 ${FIGURE_PAD_X} ${FIGURE_PAD_Y_TOP}`}
          >
            {emails.map((body, index) => (
              <article
                key={body}
                data-carousel-slide
                className="shrink-0 cursor-pointer"
                style={{ width: slideWidthPx }}
                onClick={(event) => {
                  scrollCarouselSlide(event.currentTarget, index, emails.length);
                }}
              >
                <PseudoWindow title={subject}>
                  <div className="border-b border-border px-4 py-3 font-mono text-sm leading-relaxed text-foreground">
                    <p>
                      <span className="text-muted-foreground">To:</span> John
                    </p>
                    <p className="font-bold">{subject}</p>
                  </div>
                  <p className="m-0 px-4 py-3 text-sm leading-relaxed text-pretty text-foreground">
                    {body}
                  </p>
                </PseudoWindow>
              </article>
            ))}
          </div>
        </div>
      </div>
      <CarouselArrows
        canPrev={canPrev}
        canNext={canNext}
        onPrev={scrollPrev}
        onNext={scrollNext}
        hidden={!hasOverflow}
      />
    </figure>
  );
}

function CatalogSearchCaseStudyWindow({ onClose, windowRef }: CatalogSearchCaseStudyWindowProps) {
  return (
    <Window id="catalog_search_case_study" ref={windowRef} className="w-200 left-1/2 top-1/2 -translate-1/2 @container" onClose={onClose}>
      <WindowTitle>Case Study — Catalog Search</WindowTitle>
      <WindowContent className="p-8 @3xl:p-12">
        <p className="text-sm text-center text-muted-foreground">Case Study</p>
        <h1 className="font-serif text-2xl text-center mb-12">Helping customers find needles in a 100,000,000,000 km² haystack.</h1>
        <p className="text-center mb-4"><em>Led a small cross-disciplinary team through a design thinking process to ship Catalog Search—an interface for exploring and discovering satellite imagery across massive geospatial catalogs on the UP42 platform.</em></p>
        <hr className="w-8 border-0.5 color-border mx-auto my-12" />
        <p className="mb-4"><a href="https://www.up42.com/">UP42</a> is a developer platform and marketplace offering a wide range of geospatial data and analytics.</p>
        <p className="mb-4">A core aspect of the platform is enabling customers to construct workflows that take satellite imagery, apply processing algorithms, and extract insights from that data. You can think of it like a <a href="https://zapier.com/">Zapier</a> or <a href="https://support.apple.com/guide/shortcuts/welcome/ios">Shortcuts</a> for geospatial data and processing.</p>
        <hr className="w-8 border-0.5 color-border mx-auto my-12" />
        <h2 className="font-serif text-lg text-center my-12">Problem</h2>
        <p className="mb-4">Now that the infrastructure was in place for developers to construct and execute workflows at scale, we turned our attention towards improving the experience around exploration and discoverability of the massive volumes of available satellite imagery.</p>
        <p className="mb-4">Our most valuable data provider offers over 100 billion square kilometres of satellite imagery dating back to 1986, and the only way to see what was available was to specify your search parameters in code, execute a dry run of your workflow, and repeat until you found (or didn&apos;t find) what you were looking for.</p>
        <p className="mb-4">A time consuming and repetitive process one customer described as &ldquo;shooting in the dark&rdquo;.</p>
        <hr className="w-8 border-0.5 color-border mx-auto my-12" />
        <h2 className="font-serif text-lg text-center my-12">Process</h2>
        <p className="mb-4">With a tight two month deadline and a core team of product designer, backend engineer, and frontend engineer, we adapted a design thinking process that leaned on initial research for prioritising features for the minimum viable product.</p>
        <p className="mb-4">This maximised the engineering time available during the exploration phase to uncover the technical constraints that would influence what we could deliver.</p>
        <figure className="my-12 -mx-8 @3xl:-mx-12">
          <div className={`bg-muted ${FIGURE_PAD_X} ${FIGURE_PAD_Y}`}>
            <DesignThinkingProcessDiagram />
          </div>
          <figcaption className="mx-8 @3xl:mx-12 mt-2 text-center text-muted-foreground">Adapted design thinking process spanning Understand, Explore, and Materialise.</figcaption>
        </figure>
        <hr className="w-8 border-0.5 color-border mx-auto my-12" />
        <h2 className="font-serif text-lg text-center my-12">Understand</h2>
        <h3 className="font-serif text-base text-center my-12">Customer Feedback</h3>
        <QuoteCarousel quotes={customerQuotes} />
        <p className="mb-4">The customer feedback was clear—customers wanted a better way to search and preview available imagery.</p>
        <p className="mb-4">They needed an interface for navigating the vast imagery catalogs (and eventually any geospatial data) that most satellite, aerial, or drone imagery providers already have.</p>
        <h3 className="font-serif text-base text-center my-12">Competitive Analysis</h3>
        <p className="mb-4">Next, we looked at the competitive landscape of other imagery providers, revealing that most follow familiar user interface patterns that we could adopt without reinventing the wheel.</p>
        <p className="mb-4">The challenge would be scaling the experience horizontally across multiple imagery catalogs, as well as vertically to accommodate a variety of geospatial data types.</p>
        <ImageCarousel
          items={competitors}
          caption="Most imagery providers follow familiar user interface patterns."
        />
        <h3 className="font-serif text-base text-center my-12">User Interviews</h3>
        <QuoteCarousel quotes={userInterviewQuotes} />
        <p className="mb-4">With a clear understanding of our customer needs in mind, our user interviews were focused less on identifying the core problem, and more on understanding customers&apos; pain points and which features would best address their use cases.</p>
        <h3 className="font-serif text-base text-center my-12">Analytics</h3>
        <p className="mb-4">While our vision was to surface all available imagery catalogs, we knew we needed to start with the OneAtlas Pléiades and SPOT catalogs first.</p>
        <p className="mb-4">Querying our data warehouse confirmed this assumption and answered the next question customers were already asking—that we would integrate the Sentinel Hub Sentinel-2 and Landsat-8 catalogs next.</p>
        <figure className="my-12 -mx-8 @3xl:-mx-12">
          <div className={`bg-muted ${FIGURE_PAD_X} ${FIGURE_PAD_Y}`}>
            <PopularDataSourcesChart />
          </div>
          <figcaption className="mx-8 @3xl:mx-12 mt-2 text-center text-muted-foreground">
            Data Only Workflows Run at Least 5 Times (811 jobs)
          </figcaption>
        </figure>
        <h3 className="font-serif text-base text-center my-12">Story Mapping</h3>
        <p className="mb-4">For a project with a short deadline and small core team, storymapping enabled us to prioritise immediate customer value for the minimum viable product, while embracing the broader stakeholder product vision.</p>
        <p className="mb-4">With technical constraints changing almost daily, having a lightweight representation of the product was key to aligning stakeholders, focus engineering on key features, and draw boundaries for a design solution.</p>
        <figure className="my-12 -mx-8 @3xl:-mx-12">
          <StoryMapTable caption="Story mapping was used to prioritise features for the first release." />
        </figure>
        <hr className="w-8 border-0.5 color-border mx-auto my-12" />
        <h2 className="font-serif text-lg text-center my-12">Explore</h2>
        <h3 className="font-serif text-base text-center my-12">Breadboarding</h3>
        <p className="mb-4">Enabling search and preview for a satellite imagery catalog has heavy dependencies on third party platforms and APIs; doing so for multiple catalogs from different providers would be an order of magnitude more challenging.</p>
        <p className="mb-4">During the exploration phase, engineering focused on investigating and clarifying the technical capabilities that would determine the boundaries for design to create the user experience.</p>
        <p className="mb-4">As boundaries began to emerge, we used a breadboard to identify the user interface components and their connections. This shorthand technique allowed us to quickly explore ideas and discuss their technical viability before committing to a path.</p>
        <figure className="my-12 -mx-8 @3xl:-mx-12">
          <BreadboardDiagram caption="Breadboarding was used to identify interface components and their connections." />
        </figure>
        <h3 className="font-serif text-base text-center my-12">UI Design &amp; Prototyping</h3>
        <p className="mb-4">With clarity over the technical boundaries and a good sense of the components and connections, it was time to flesh out the user experience and interface in higher fidelity.</p>
        <p className="mb-4">This exploration emphasised the following:</p>
        <ul className="list-disc list-outside marker:text-input mb-4">
          <li>Search, select, and acquire as key activities in the user journey.</li>
          <li>Adopt a &lsquo;shopping cart&rsquo; metaphor to convey a mental model for data selection.</li>
          <li>Lean on customer research to inform decisions regarding the user interface.</li>
        </ul>
        <ImageCarousel items={uiPrototypes} fill={false} mutedImages />
        <hr className="w-8 border-0.5 color-border mx-auto my-12" />
        <h2 className="font-serif text-lg text-center my-12">Materialise</h2>
        <h3 className="font-serif text-base text-center my-12">Customer Feedback</h3>
        <p className="mb-4">As a result of parallelising design and engineering exploration, much of the backend and frontend code was already written, so the test phase was focused on cleaning up the code and polishing the user experience.</p>
        <p className="mb-4">This provided an opportunity to share an early BETA release to gather last minute feedback.</p>
        <BetaFeedbackEmails emails={betaFeedbackEmails} />
        <h3 className="font-serif text-base text-center my-12">Reporting</h3>
        <p className="mb-4">Realtime dashboards were setup to monitor analytics for the search and acquisition phases of the customer journey.</p>
        <p className="mb-4">Search volume and geometry uploads provided awareness into general adoption for the search phase. For the acquire phase, job configuration and dry runs analytics provided insight into whether customers were able to acquire the data they were looking for.</p>
        <FramedScreenshot
          src="/catalog-search-reporting-dashboard.png"
          alt="A Looker dashboard for tracking adoption and use."
          title="Reporting Dashboard - Looker"
          caption="A Looker dashboard for tracking adoption and use."
          width={3756}
          height={3198}
        />
        <h3 className="font-serif text-base text-center my-12">Usability Testing</h3>
        <p className="mb-4">For a feature that promised so much customer value, adoption and use was poor. This was partially due to releasing close to Christmas and with little documentation and onboarding.</p>
        <p className="mb-4">However, as we began to receive customer feedback and conduct usability tests, we uncovered a number of immediate issues to address and opportunities for areas of improvement that would inform our next iteration.</p>
        <FramedScreenshot
          src="/catalog-search-usability-miro.jpeg"
          alt="A Miro board for taking notes and synthesising findings from usability testing."
          title="Usability Testing - Miro"
          caption="A Miro board for taking notes and synthesising findings from usability testing."
          width={1333}
          height={750}
        />
      </WindowContent>
    </Window>
  );
}

export default memo(CatalogSearchCaseStudyWindow);
