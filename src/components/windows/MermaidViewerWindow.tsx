"use client"

import Image from "next/image";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface MermaidViewerWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

export default function MermaidViewerWindow({ onClose, windowRef }: MermaidViewerWindowProps) {
  return (
    <Window id="mermaid_viewer" ref={windowRef} className="w-96 left-1/2 top-1/2 -translate-1/2" onClose={onClose}>
      <WindowTitle>Mermaid Viewer</WindowTitle>
      <WindowContent>
        <Image src="/mermaid-viewer.png" alt="Mermaid Viewer" width={400} height={300} className="w-full h-auto mb-4" />
        <p className="font-serif text-xl mb-4">A lightweight, mobile-friendly way to view and edit Mermaid diagrams.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">v0</Badge>
          <Badge variant="secondary">Cursor</Badge>
          <Badge variant="secondary">Next.js</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
          <Badge variant="secondary">Mermaid.js</Badge>
          <Badge variant="secondary">Vercel</Badge>
        </div>
        <p className="mb-4"><strong>Mermaid Viewer</strong> was born out of the need for a simple, mobile-friendly viewer for the mountains of Mermaid diagrams coming out of my ChatGPT sessions.</p>
        <p className="mb-4">As a tool for creating diagrams and visualisations using plain text, <a href="https://mermaid.js.org/" className="underline" onClick={() => track("link_open", { id: "mermaidjs", url: "https://mermaid.js.org/" })}>Mermaid</a> is ideally suited for transforming the outputs of large language models (LLMs) into structured formats.</p>
        <Button asChild className="w-full">
          <a href="https://mermaid.smallepic.com/" target="_blank" rel="noopener" onClick={() => track("link_open", { id: "mermaid_viewer", url: "https://mermaid.smallepic.com/" })}>
            Check Out Mermaid Viewer
          </a>
        </Button>
      </WindowContent>
    </Window>
  );
}
