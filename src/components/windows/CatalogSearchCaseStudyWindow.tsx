"use client"

import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface CatalogSearchCaseStudyWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

export default function CatalogSearchCaseStudyWindow({ onClose, windowRef }: CatalogSearchCaseStudyWindowProps) {
  return (
    <Window id="catalog_search_case_study" ref={windowRef} className="w-200 aspect-7/5 left-1/2 top-1/2 -translate-1/2" onClose={onClose}>
      <WindowTitle>Case Study — Catalog Search</WindowTitle>
      <WindowContent className="p-0">
        <iframe
          src="https://embed.figma.com/proto/L7o2shGNkBjhNIiuqzKJh3/John-Ngo-%C2%B7-Curriculum-Vitae?page-id=204%3A0&node-id=204-1&p=f&viewport=631%2C234%2C0.33&scaling=contain&content-scaling=fixed&embed-host=smallepic&hide_ui=1&footer=false&theme=system"
          allowFullScreen
          className="w-full h-full"
        />
      </WindowContent>
    </Window>
  );
}
