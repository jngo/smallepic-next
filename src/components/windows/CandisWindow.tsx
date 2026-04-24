"use client"

import { track } from "@vercel/analytics";
import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface CandisWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

export default function CandisWindow({ onClose, windowRef }: CandisWindowProps) {
  return (
    <Window id="candis" ref={windowRef} className="w-125 left-1/2 top-1/2 -translate-1/2" onClose={onClose}>
      <WindowTitle>Candis</WindowTitle>
      <WindowContent>
        <p className="text-sm text-muted-foreground">2017–2019</p>
        <p className="font-serif text-xl mb-2">I was a design team of one, hands-on from research to frontend at <a href="https://www.candis.io/" target="_blank" rel="noopener noreferrer" className="inline-token-link" onClick={() => track("link_open", { id: "candis_site", url: "https://www.candis.io/" })}>Candis</a>.</p>
        <p>As the sole designer on a team of 10 engineers, I established the UI guidelines that defined Smartbooks, the flagship bookkeeping product, and built the design system that scaled across their financial Workflows product.</p>
      </WindowContent>
    </Window>
  );
}
