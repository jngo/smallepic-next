"use client"

import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface CatalogSearchPrototypeWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

export default function CatalogSearchPrototypeWindow({ onClose, windowRef }: CatalogSearchPrototypeWindowProps) {
  return (
    <Window id="catalog_search_prototype" ref={windowRef} className="w-200 aspect-7/5 left-1/2 top-1/2 -translate-1/2" onClose={onClose}>
      <WindowTitle>Prototype — Catalog Search</WindowTitle>
      <WindowContent className="p-0">
        <iframe
          src="https://embed.figma.com/proto/DxUQrLPUFJap2u8FoYLxMe/UP%E2%81%B4%C2%B2-%C2%B7-Catalog-Search?node-id=432-1054&viewport=179%2C205%2C0.133953258395195&scaling=contain&content-scaling=fixed&embed-host=smallepic&hide_ui=1&footer=false&theme=system"
          allowFullScreen
          className="w-full h-full"
          />
      </WindowContent>
    </Window>
  );
}
