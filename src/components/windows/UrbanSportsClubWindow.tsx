"use client"

import { track } from "@vercel/analytics";
import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface UrbanSportsClubWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

export default function UrbanSportsClubWindow({ onClose, windowRef }: UrbanSportsClubWindowProps) {
  return (
    <Window id="urban_sports_club" ref={windowRef} className="w-125 left-1/2 top-1/2 -translate-1/2" onClose={onClose}>
      <WindowTitle>Urban Sports Club</WindowTitle>
      <WindowContent>
        <p className="text-sm text-muted-foreground">2015</p>
        <p className="font-serif text-xl mb-2">I laid the technical and product foundations for <a href="https://urbansportsclub.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground font-bold bg-secondary hover:bg-accent" onClick={() => track("link_open", { id: "urban_sports_club_site", url: "https://urbansportsclub.com/" })}>Urban Sports Club&apos;s</a> expansion across Europe.</p>
        <p className="mb-2">Led the digitisation of venue check-in from a manual card-and-log system to a full mobile product, designing the iOS and Android apps and the API interface powering both, while managing a team of three developers.</p>
        <p>Shipped in three months, supporting expansion from Berlin to 88 cities and 8,000 venues.</p>
      </WindowContent>
    </Window>
  );
}
