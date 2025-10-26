"use client"

import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface GISOSPrototypeWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

export default function GISOSPrototypeWindow({ onClose, windowRef }: GISOSPrototypeWindowProps) {
  return (
    <Window id="gis_os_prototype" ref={windowRef} className="w-200 aspect-7/5 left-1/2 top-1/2 -translate-1/2" onClose={onClose}>
      <WindowTitle>Prototype — GIS OS</WindowTitle>
      <WindowContent className="p-0">
        <iframe
          src="https://embed.figma.com/proto/I4CSylVpVDpCe15J0NYQ74/UP%E2%81%B4%C2%B2-%C2%B7-Product-Vision?node-id=269-290&viewport=77%2C474%2C0.0725146234035492&scaling=contain&content-scaling=fixed&embed-host=smallepic&hide_ui=1&footer=false&theme=system"
          allowFullScreen
          className="w-full h-full"
        />
      </WindowContent>
    </Window>
  );
}
