"use client"

import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface AboutWindowProps {
  onClose: () => void;
  onShowJohnNgo: () => void;
  onShowExploration: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

export default function AboutWindow({ onClose, onShowJohnNgo, onShowExploration, windowRef }: AboutWindowProps) {
  return (
    <Window id="about" ref={windowRef} className="w-125 left-1/2 top-1/2 -translate-1/2" onClose={onClose}>
      <WindowTitle>About</WindowTitle>
      <WindowContent>
        <h1 className="text-3xl font-bold mt-4 mb-4">Hi, I’m <button className="text-muted-foreground bg-secondary hover:bg-accent" onClick={onShowJohnNgo}>John</button>.</h1>
        <p className="text-l leading-relaxed mb-4">I started as a software engineer. Somewhere along the way I crossed into design, but the line between designing something and building it has never made much sense to me.</p>
        <p className="text-l leading-relaxed mb-4">The most interesting problems live in between, where the system you’re shaping starts to shape how people think and behave, often in ways nobody planned. I keep finding myself drawn there: not to the interface, but to the mechanisms underneath it.</p>
        <p className="text-l leading-relaxed mb-4">I believe the right relationship with tools is collaborative, not delegatory. Cognitive work you hand off entirely is cognitive capacity you permanently lose. My <button className="text-muted-foreground bg-secondary hover:bg-accent" onClick={onShowExploration}>explorations</button> are experiments in solving that for myself: tools for capturing thought, structuring it, making it useful to my future self.</p>
        <p className="text-l leading-relaxed mb-4">My instinct in most situations is subtraction. I find elegance in constraint more reliably than I find it in options. This shows up in how I design, in how I write, even in how I run a meeting.</p>
        <p className="text-l leading-relaxed">I’m better at building small things well than building large things quickly. I’ve spent a long time learning that about myself, and a long time finding environments that believe it too.</p>
      </WindowContent>
    </Window>
  );
}
