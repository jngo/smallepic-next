"use client"

import Image from "next/image";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface PodscriberWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

export default function PodscriberWindow({ onClose, windowRef }: PodscriberWindowProps) {
  return (
    <Window id="podscriber" ref={windowRef} className="w-96 left-1/2 top-1/2 -translate-1/2" onClose={onClose}>
      <WindowTitle>Podscriber</WindowTitle>
      <WindowContent>
        <Image src="/podscriber.gif" alt="Podscriber" width={480} height={1040} className="w-1/2 h-auto mx-auto mb-4" />
        <p className="font-serif text-xl mb-2">Transcribe podcast episodes and send them to your read-it-later queue.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">v0</Badge>
          <Badge variant="secondary">Cursor</Badge>
          <Badge variant="secondary">Next.js</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
          <Badge variant="secondary">Deepgram</Badge>
          <Badge variant="secondary">Reader</Badge>
          <Badge variant="secondary">Vercel</Badge>
        </div>
        <p className="mb-4">As someone who loves listening to podcasts whilst doing other things, capturing notes can be challenging.</p>
        <p className="mb-4">After trying a few different apps, I decided to build a simple podcast transcriber to streamline my workflow from listening to synthesizing notes.</p>
        <p className="mb-4">Instead of pausing and transcribing by hand, I just drop in an Apple Podcasts URL, and it generates a transcript for me. It&apos;s integrated with Readwise Reader, so I can highlight key insights and have everything synced to my Obsidian notes.</p>
        <Button asChild className="w-full">
          <a href="https://podscriber.smallepic.com/" target="_blank" rel="noopener" onClick={() => track("link_open", { id: "podscriber", url: "https://podscriber.smallepic.com/" })}>
            Check Out Podscriber
          </a>
        </Button>
      </WindowContent>
    </Window>
  );
}
