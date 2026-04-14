"use client"

import { memo } from "react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface GranolaSyncWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

function GranolaSyncWindow({ onClose, windowRef }: GranolaSyncWindowProps) {
  return (
    <Window id="granola-sync" ref={windowRef} className="w-96 left-1/2 top-1/2 -translate-1/2" onClose={onClose}>
      <WindowTitle>Granola Sync</WindowTitle>
      <WindowContent>
        <p className="font-serif text-xl mb-2">Export Granola meeting transcripts as Markdown files.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">Claude Code</Badge>
          <Badge variant="secondary">Python</Badge>
          <Badge variant="secondary">Granola</Badge>
        </div>
        <p className="mb-4">Syncs your Granola meeting transcripts via the API.</p>
        <p className="mb-4">Transcripts are saved as Markdown with YAML front matter and cached locally so syncing only pulls new transcripts.</p>
        <p className="mb-4">Available as a CLI tool and a Claude Code skill.</p>
        <Button asChild className="w-full">
          <a href="https://github.com/jngo/granola-sync" target="_blank" rel="noopener" onClick={() => track("link_open", { id: "granola-sync", url: "https://github.com/jngo/granola-sync" })}>
            View on GitHub
          </a>
        </Button>
      </WindowContent>
    </Window>
  );
}

export default memo(GranolaSyncWindow);
