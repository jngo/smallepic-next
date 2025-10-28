"use client"

import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface SynthesiserWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

export default function SynthesiserWindow({ onClose, windowRef }: SynthesiserWindowProps) {
  return (
    <Window id="synthesiser" ref={windowRef} className="w-96 left-1/2 top-1/2 -translate-1/2" onClose={onClose}>
      <WindowTitle>Synthesiser</WindowTitle>
      <WindowContent>
        <p className="font-serif text-xl mb-2">Generate a Minto Pyramid synthesis of any content.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">v0</Badge>
          <Badge variant="secondary">Cursor</Badge>
          <Badge variant="secondary">Next.js</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
          <Badge variant="secondary">React Flow</Badge>
          <Badge variant="secondary">OpenAI</Badge>
          <Badge variant="secondary">Vercel</Badge>
        </div>
        <Button asChild className="w-full">
          <a href="https://synthesiser.smallepic.com/" target="_blank" rel="noopener" onClick={() => track("link_open", { id: "synthesiser", url: "https://synthesiser.smallepic.com/" })}>
            Check Out Synthesiser
          </a>
        </Button>
      </WindowContent>
    </Window>
  );
}
