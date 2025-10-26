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
        <p className="font-serif text-xl mb-2">I helped lay the technical and product foundations for European expansion at <a href="https://urbansportsclub.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground font-bold bg-secondary hover:bg-accent" onClick={() => track("link_open", { id: "urban_sports_club_site", url: "https://urbansportsclub.com/" })}>Urban Sports Club</a>.</p>
        <p className="mb-2">I played a key technical leadership and product design role, responsible for the digital transformation of key technical infrastructure and the venue check-in experience. My achievements were instrumental to the ambitious expansion of the flat-rate sports membership from Berlin into over 88 cities and 8,000 sporting venues.</p>
        <p>My key achievement was leading the delivery team, where I designed the REST API specification and mobile app experiences. Within three months, we replaced the existing manual membership card and log sheet processes with an API and mobile apps enabling members to check-in with their iOS and Android devices.</p>
      </WindowContent>
    </Window>
  );
}
