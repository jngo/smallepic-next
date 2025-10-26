"use client"

import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface AboutWindowProps {
  onClose: () => void;
  onShowJohnNgo: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

export default function AboutWindow({ onClose, onShowJohnNgo, windowRef }: AboutWindowProps) {
  return (
    <Window id="about" ref={windowRef} className="w-125 left-1/2 top-1/2 -translate-1/2" onClose={onClose}>
      <WindowTitle>About</WindowTitle>
      <WindowContent>
        <h1 className="text-3xl font-bold mt-4 mb-4">
          Hi, I&apos;m <button className="text-muted-foreground bg-secondary hover:bg-accent" onClick={onShowJohnNgo}>John</button>.
        </h1>
        <p className="text-l leading-relaxed">
          Designer by practice, engineer by training, researcher at heart. I tackle complex product challenges by combining technical depth with user-centered design, turning ambiguity into actionable insights and shipped solutions.
        </p>
      </WindowContent>
    </Window>
  );
}
