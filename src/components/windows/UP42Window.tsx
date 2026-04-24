"use client"

import { memo } from "react";
import { track } from "@vercel/analytics";
import { FileText, FileChartPie, FileBox } from "lucide-react";
import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface UP42WindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
  onShowDocumentationHub: () => void;
  onShowCatalogSearchCaseStudy: () => void;
  onShowCatalogSearchPrototype: () => void;
  onShowMarketingWebsiteCaseStudy: () => void;
  onShowGISOSPrototype: () => void;
}

function UP42Window({
  onClose,
  windowRef,
  onShowDocumentationHub,
  onShowCatalogSearchCaseStudy,
  onShowCatalogSearchPrototype,
  onShowMarketingWebsiteCaseStudy,
  onShowGISOSPrototype
}: UP42WindowProps) {
  return (
    <Window id="up42" ref={windowRef} className="w-125 left-1/2 top-1/2 -translate-1/2" onClose={onClose}>
      <WindowTitle>UP42</WindowTitle>
      <WindowContent>
        <p className="text-sm text-muted-foreground">2019–2021</p>
        <p className="font-serif text-xl mb-4">I was the founding design leader at <a href="https://www.up42.com/" target="_blank" rel="noopener noreferrer" className="inline-token-link" onClick={() => track("link_open", { id: "up42_site", url: "https://www.up42.com/" })}>UP42</a>, building the design function from the ground up at an Airbus-incubated geospatial startup.</p>
        <p className="mb-4">As the founding design leader at this Airbus-incubated geospatial startup, I built the design function from zero: hiring and leading the team to deliver product vision, research, and go-to-market across a platform and marketplace for geospatial data workflows and a developer API.</p>
        <button onClick={onShowDocumentationHub} className="desktop-item w-28">
          <FileText strokeWidth={0.8} className="size-12"/>
          <span>documentation-hub-case-study.html</span>
        </button>
        <button onClick={onShowCatalogSearchCaseStudy} className="desktop-item w-28">
          <FileChartPie strokeWidth={0.8} className="size-12"/>
          <span>catalog-search-case-study.figma</span>
        </button>
        <button onClick={onShowCatalogSearchPrototype} className="desktop-item w-28">
          <FileBox strokeWidth={0.8} className="size-12"/>
          <span>catalog-search-prototype.figma</span>
        </button>
        <button onClick={onShowMarketingWebsiteCaseStudy} className="desktop-item w-28">
          <FileChartPie strokeWidth={0.8} className="size-12"/>
          <span>marketing-website-case-study.figma</span>
        </button>
        <button onClick={onShowGISOSPrototype} className="desktop-item w-28">
          <FileBox strokeWidth={0.8} className="size-12"/>
          <span>gis-os-prototype.figma</span>
        </button>
      </WindowContent>
    </Window>
  );
}

export default memo(UP42Window);
