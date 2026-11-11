"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  type RefObject,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function getCarouselSlides(scroller: HTMLElement) {
  return Array.from(
    scroller.querySelectorAll<HTMLElement>("[data-carousel-slide]"),
  );
}

/**
 * Content column width for full-bleed carousels: scroller client width minus
 * the track’s horizontal padding (so slides align with WindowContent).
 */
export function useScrollerContentWidth(
  scrollerRef: RefObject<HTMLElement | null>,
) {
  const [contentWidthPx, setContentWidthPx] = useState(0);

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
  }, [scrollerRef]);

  return contentWidthPx;
}

export function scrollCarouselSlide(
  slide: HTMLElement,
  index: number,
  count: number,
) {
  const scroller = slide.closest("[data-carousel-scroller]");
  if (!(scroller instanceof HTMLElement)) return;
  const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
  let left: number;
  if (index === 0) {
    left = 0;
  } else if (index === count - 1) {
    left = max;
  } else {
    const slideRect = slide.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();
    left =
      scroller.scrollLeft +
      (slideRect.left - scrollerRect.left) -
      (scroller.clientWidth - slideRect.width) / 2;
    left = Math.min(max, Math.max(0, left));
  }
  scroller.scrollTo({ left, behavior: "smooth" });
}

function getNearestCarouselSlideIndex(
  scroller: HTMLElement,
  slides: HTMLElement[],
) {
  const scrollerRect = scroller.getBoundingClientRect();
  const center = scrollerRect.left + scrollerRect.width / 2;
  let best = 0;
  let bestDist = Number.POSITIVE_INFINITY;
  slides.forEach((slide, index) => {
    const rect = slide.getBoundingClientRect();
    const dist = Math.abs(rect.left + rect.width / 2 - center);
    if (dist < bestDist) {
      bestDist = dist;
      best = index;
    }
  });
  return best;
}

export function scrollCarouselBy(scroller: HTMLElement, delta: -1 | 1) {
  const slides = getCarouselSlides(scroller);
  if (slides.length === 0) return;
  const current = getNearestCarouselSlideIndex(scroller, slides);
  const next = Math.min(slides.length - 1, Math.max(0, current + delta));
  scrollCarouselSlide(slides[next], next, slides.length);
}

/** Track overflow and expose prev/next for discrete `[data-carousel-slide]` items. */
export function useCarouselControls(scrollerRef: RefObject<HTMLElement | null>) {
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    setCanPrev(scroller.scrollLeft > 1);
    setCanNext(scroller.scrollLeft < max - 1);
  }, [scrollerRef]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(scroller);
    const track = scroller.firstElementChild;
    if (track instanceof HTMLElement) ro.observe(track);

    return () => {
      scroller.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [scrollerRef, update]);

  const scrollPrev = useCallback(() => {
    const scroller = scrollerRef.current;
    if (scroller) scrollCarouselBy(scroller, -1);
  }, [scrollerRef]);

  const scrollNext = useCallback(() => {
    const scroller = scrollerRef.current;
    if (scroller) scrollCarouselBy(scroller, 1);
  }, [scrollerRef]);

  return {
    canPrev,
    canNext,
    scrollPrev,
    scrollNext,
    hasOverflow: canPrev || canNext,
  };
}

/**
 * Overflow tracking for scrollers that step by `[data-story-col]` (or similar)
 * instead of centered carousel slides.
 */
export function useHorizontalOverflow(
  scrollerRef: RefObject<HTMLElement | null>,
) {
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    setCanPrev(scroller.scrollLeft > 1);
    setCanNext(scroller.scrollLeft < max - 1);
  }, [scrollerRef]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(scroller);
    const track = scroller.firstElementChild;
    if (track instanceof HTMLElement) ro.observe(track);

    return () => {
      scroller.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [scrollerRef, update]);

  return { canPrev, canNext, hasOverflow: canPrev || canNext, update };
}

function CarouselArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      className="group p-2 -m-2 disabled:pointer-events-none"
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon className="size-5 rounded-full border border-input text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground group-disabled:opacity-50" />
    </button>
  );
}

export function CarouselArrows({
  canPrev,
  canNext,
  onPrev,
  onNext,
  hidden,
}: {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  hidden?: boolean;
}) {
  if (hidden) return null;

  return (
    <div className="mt-4 flex items-center justify-center gap-1">
      <CarouselArrowButton
        direction="prev"
        disabled={!canPrev}
        onClick={onPrev}
      />
      <CarouselArrowButton
        direction="next"
        disabled={!canNext}
        onClick={onNext}
      />
    </div>
  );
}
