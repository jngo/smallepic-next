"use client"

import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface BooksAndConversationsWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

export default function BooksAndConversationsWindow({ onClose, windowRef }: BooksAndConversationsWindowProps) {
  return (
    <Window id="books_and_conversations" ref={windowRef} className="w-96 left-1/2 top-1/2 -translate-1/2" onClose={onClose}>
      <WindowTitle>Books & Conversations</WindowTitle>
      <WindowContent>
        <p className="font-serif text-lg mb-2">Roundtable discussions with good friends and great books.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">Jekyll</Badge>
          <Badge variant="secondary">Github Pages</Badge>
        </div>
        <Button asChild className="w-full">
          <a href="http://booksandconversations.com/" target="_blank" rel="noopener" onClick={() => track("link_open", { id: "books_and_conversations", url: "http://booksandconversations.com/" })}>
            Check Out Books & Conversations
          </a>
        </Button>
      </WindowContent>
    </Window>
  );
}
