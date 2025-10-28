"use client"

import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface FilmsAndConversationsWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

export default function FilmsAndConversationsWindow({ onClose, windowRef }: FilmsAndConversationsWindowProps) {
  return (
    <Window id="films_and_conversations" ref={windowRef} className="w-96 left-1/2 top-1/2 -translate-1/2" onClose={onClose}>
      <WindowTitle>Films & Conversations</WindowTitle>
      <WindowContent>
        <p className="font-serif text-xl mb-2">A monthly film club bringing together people, documentaries, and discussions.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">Jekyll</Badge>
          <Badge variant="secondary">Github Pages</Badge>
        </div>
        <Button asChild className="w-full">
          <a href="http://filmsandconversations.com/" target="_blank" rel="noopener" onClick={() => track("link_open", { id: "films_and_conversations", url: "http://filmsandconversations.com/" })}>
            Check Out Films & Conversations
          </a>
        </Button>
      </WindowContent>
    </Window>
  );
}
