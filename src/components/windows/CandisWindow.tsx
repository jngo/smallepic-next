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
        <p className="font-serif text-xl mb-2">I was a design team of one, hands-on from research to frontend at <a href="https://www.candis.io/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground font-bold bg-secondary hover:bg-accent" onClick={() => track("link_open", { id: "candis_site", url: "https://www.candis.io/" })}>Candis</a>.</p>
        <p className="mb-2">As a single person design team, I was responsible for user experience across the portfolio of products at Candis. Practically speaking, I conducted user research, produced design concepts and prototypes, documented epics and user stories, and contributed UI enhancements to the React codebase.</p>
        <p>I also led the initiative to scale design to meet the needs of a growing engineering team through the development of a design system that served as the style guide and component library for current and future Candis products.</p>
      </WindowContent>
    </Window>
  );
}
