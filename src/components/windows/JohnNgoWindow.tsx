"use client"

import Image from "next/image";
import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface JohnNgoWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

export default function JohnNgoWindow({ onClose, windowRef }: JohnNgoWindowProps) {
  return (
    <Window id="john_ngo" ref={windowRef} className="w-125 left-1/2 top-1/2 -translate-1/2" onClose={onClose}>
      <WindowTitle>John Ngo</WindowTitle>
      <WindowContent className="p-0">
        <Image src="/john-ngo.jpg" alt="John Ngo" width={1024} height={1024} className="w-full aspect-4/3" />
      </WindowContent>
    </Window>
  );
}
