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
        <p className="font-serif text-xl mb-4">I&apos;m currently leading <a href="https://www.mckinsey.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground font-bold bg-secondary hover:bg-accent" onClick={() => track("link_open", { id: "mckinsey_and_company_site", url: "https://www.mckinsey.com/" })}>McKinsey & Company&apos;s</a> in-house product design capability, building the systems tens of thousands of consultants rely on daily.</p>
        <p className="mb-4">Leading a design team of four within Visual Graphics & Media, McKinsey&apos;s in-house visual design capability serving tens of thousands of consultants globally. The work centres on untangling complex, fragmented service experiences and building systems that balance limited resources with growing demand, from research through to implementation.</p>
        <p className="mb-4">I hire and mentor the team while staying close enough to the work to still be in the details &mdash; including designing and running Vibes to Pull Requests, a two-day technical literacy workshop now in its second cohort, taking 29 designers and researchers from zero to their first merged pull request in a live codebase.</p>
        <p>I designed a Skills Map and Levelling Framework, a growth model that helps designers and their managers navigate progression across analytical, technical, and interpersonal dimensions.</p>
      </WindowContent>
    </Window>
  );
}
