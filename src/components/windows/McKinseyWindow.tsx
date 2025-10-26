"use client"

import { track } from "@vercel/analytics";
import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface McKinseyWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

export default function McKinseyWindow({ onClose, windowRef }: McKinseyWindowProps) {
  return (
    <Window id="mckinsey_and_company" ref={windowRef} className="w-125 left-1/2 top-1/2 -translate-1/2" onClose={onClose}>
      <WindowTitle>McKinsey & Company</WindowTitle>
      <WindowContent>
        <p className="text-sm text-muted-foreground">2021–Present</p>
        <p className="font-serif text-xl mb-4">I&apos;m currently leading design across digital transformation initiatives at <a href="https://www.mckinsey.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground font-bold bg-secondary hover:bg-accent" onClick={() => track("link_open", { id: "mckinsey_and_company_site", url: "https://www.mckinsey.com/" })}>McKinsey & Company</a>.</p>
        <p className="mb-4">Leading a design team building Visual Graphics & Media services that serve tens of thousands of management consultants worldwide.</p>
        <p className="mb-4">My work focuses on untangling complex, fragmented service experiences and creating systems that help balance limited resources with growing demand. I take projects from user research and opportunity mapping through high-fidelity prototypes to implementation.</p>
        <p>I combine strategic thinking with hands-on execution, mentoring designers while collaborating closely with engineering, product, and operations teams.</p>
      </WindowContent>
    </Window>
  );
}
