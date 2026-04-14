"use client"

import { memo } from "react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface MeetingTranscriberWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

function MeetingTranscriberWindow({ onClose, windowRef }: MeetingTranscriberWindowProps) {
  return (
    <Window id="meeting-transcriber" ref={windowRef} className="w-96 left-1/2 top-1/2 -translate-1/2" onClose={onClose}>
      <WindowTitle>Meeting Transcriber</WindowTitle>
      <WindowContent>
        <p className="font-serif text-xl mb-2">Lightweight, private meeting transcription with local Whisper.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">Claude Code</Badge>
          <Badge variant="secondary">Python</Badge>
          <Badge variant="secondary">Swift</Badge>
          <Badge variant="secondary">whisper.cpp</Badge>
        </div>
        <p className="mb-4">Transcribes your microphone and system audio with your preferred Whisper model.</p>
        <p className="mb-4">Streams a live transcript during the meeting, then produces a clean, speaker-attributed Markdown file when the meeting ends.</p>
        <p className="mb-4">Everything happens locally and nothing leaves your device.</p>
        <Button asChild className="w-full">
          <a href="https://github.com/jngo/meeting-transcriber" target="_blank" rel="noopener" onClick={() => track("link_open", { id: "meeting-transcriber", url: "https://github.com/jngo/meeting-transcriber" })}>
            View on GitHub
          </a>
        </Button>
      </WindowContent>
    </Window>
  );
}

export default memo(MeetingTranscriberWindow);
