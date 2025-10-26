"use client"

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

export default function UP42Window({
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
        <p className="font-serif text-xl mb-4">I established design practice and launched several keystone projects at <a href="https://www.up42.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground font-bold bg-secondary hover:bg-accent" onClick={() => track("link_open", { id: "up42_site", url: "https://www.up42.com/" })}>UP42</a>.</p>
        <p className="mb-4">As the first design hire within the Airbus Defence and Space subsidiary, I established design practice within the organisation.</p>
        <p className="mb-4">I was responsible for establishing a culture of continuous research through a combination of quantitative (SQL, BigQuery, etc.) and qualitative (user interviews, usability testing, etc.) techniques to ensure decisions were made with the best data and insights at hand.</p>
        <p className="mb-4">I also worked closely with the frontend team to establish the foundations of our design system, through the design and implementation of token and component libraries.</p>
        <button onClick={onShowDocumentationHub} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
          <FileText strokeWidth={0.8} className="size-12"/>
          <span>documentation-hub-case-study.html</span>
        </button>
        <button onClick={onShowCatalogSearchCaseStudy} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
          <FileChartPie strokeWidth={0.8} className="size-12"/>
          <span>catalog-search-case-study.figma</span>
        </button>
        <button onClick={onShowCatalogSearchPrototype} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
          <FileBox strokeWidth={0.8} className="size-12"/>
          <span>catalog-search-prototype.figma</span>
        </button>
        <button onClick={onShowMarketingWebsiteCaseStudy} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
          <FileChartPie strokeWidth={0.8} className="size-12"/>
          <span>marketing-website-case-study.figma</span>
        </button>
        <button onClick={onShowGISOSPrototype} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
          <FileBox strokeWidth={0.8} className="size-12"/>
          <span>gis-os-prototype.figma</span>
        </button>
      </WindowContent>
    </Window>
  );
}
