"use client"

import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface MarketingWebsiteCaseStudyWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

export default function MarketingWebsiteCaseStudyWindow({ onClose, windowRef }: MarketingWebsiteCaseStudyWindowProps) {
  return (
    <Window id="marketing_website_case_study" ref={windowRef} className="w-200 aspect-7/5 left-1/2 top-1/2 -translate-1/2" onClose={onClose}>
      <WindowTitle>Case Study — Marketing Website</WindowTitle>
      <WindowContent className="p-0">
        <iframe
          src="https://embed.figma.com/proto/xcEAPzkwk5kSrzEJJXSrc8/Case-Study-%C2%B7-Marketing-Website?page-id=&node-id=1-344&viewport=533%2C-1156%2C0.25&scaling=contain&content-scaling=fixed&embed-host=smallepic&hide_ui=1&footer=false&theme=system"
          allowFullScreen
          className="w-full h-full"
          />
      </WindowContent>
    </Window>
  );
}
