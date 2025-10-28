"use client"

import { memo } from "react";
import { Network, Podcast, ScanText, Clapperboard, LibraryBig } from "lucide-react";
import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface ExplorationWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
  onShowSynthesiser: () => void;
  onShowPodscriber: () => void;
  onShowMermaidViewer: () => void;
  onShowFilmsAndConversations: () => void;
  onShowBooksAndConversations: () => void;
}

function ExplorationWindow({
  onClose,
  windowRef,
  onShowSynthesiser,
  onShowPodscriber,
  onShowMermaidViewer,
  onShowFilmsAndConversations,
  onShowBooksAndConversations
}: ExplorationWindowProps) {
  return (
    <Window id="exploration" ref={windowRef} defaultView="list" className="w-210 left-4 top-14" onClose={onClose}>
      <WindowTitle>Exploration</WindowTitle>

      <WindowContent view="icon">
        <button onClick={onShowSynthesiser} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
          <Network strokeWidth={0.8} className="size-12"/>
          <span>synthesiser.html</span>
        </button>
        <button onClick={onShowPodscriber} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
          <Podcast strokeWidth={0.8} className="size-12"/>
          <span>podscriber.html</span>
        </button>
        <button onClick={onShowMermaidViewer} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
          <ScanText strokeWidth={0.8} className="size-12"/>
          <span>mermaid-viewer.html</span>
        </button>
        <button onClick={onShowFilmsAndConversations} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
          <Clapperboard strokeWidth={0.8} className="size-12"/>
          <span>films-and-conversations.html</span>
        </button>
        <button onClick={onShowBooksAndConversations} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
          <LibraryBig strokeWidth={0.8} className="size-12"/>
          <span>books-and-conversations.html</span>
        </button>
      </WindowContent>

      <WindowContent view="list" className="@container">
        <ul>
          <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 pb-1">
            <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={onShowSynthesiser} className="text-muted-foreground font-bold hover:bg-muted">Synthesiser</button></span>
            <span className="grow">Generate a Minto Pyramid synthesis of any content.</span>
          </li>
          <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t py-1">
            <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={onShowPodscriber} className="text-muted-foreground font-bold hover:bg-muted">Podscriber</button></span>
            <span className="grow">Transcribe podcast episodes and send them to your read-it-later queue.</span>
          </li>
          <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t py-1">
            <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={onShowMermaidViewer} className="text-muted-foreground font-bold hover:bg-muted">Mermaid Viewer</button></span>
            <span className="grow">A lightweight, mobile-friendly Mermaid diagram viewer.</span>
          </li>
          <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t py-1">
            <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={onShowFilmsAndConversations} className="text-muted-foreground font-bold hover:bg-muted">Films & Conversations</button></span>
            <span className="flex-grow">A film club bringing together people, documentaries, and discussions.</span>
          </li>
          <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t pt-1">
            <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={onShowBooksAndConversations} className="text-muted-foreground font-bold hover:bg-muted">Books & Conversations</button></span>
            <span className="grow">Roundtable discussions with good friends and great books.</span>
          </li>
        </ul>
      </WindowContent>
    </Window>
  );
}

export default memo(ExplorationWindow);
