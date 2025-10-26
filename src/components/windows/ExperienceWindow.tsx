"use client"

import { FileText, Folder } from "lucide-react";
import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface ExperienceWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
  onShowMcKinsey: () => void;
  onShowUP42: () => void;
  onShowCandis: () => void;
  onShowUrbanSportsClub: () => void;
}

export default function ExperienceWindow({
  onClose,
  windowRef,
  onShowMcKinsey,
  onShowUP42,
  onShowCandis,
  onShowUrbanSportsClub
}: ExperienceWindowProps) {
  return (
    <Window id="experience" ref={windowRef} defaultView="icon" className="w-210 left-16 top-30" onClose={onClose}>
      <WindowTitle>Experience</WindowTitle>

      <WindowContent view="icon">
        <button onClick={onShowMcKinsey} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
          <FileText strokeWidth={0.8} className="size-12"/>
          <span>mckinsey-and-company.html</span>
        </button>
        <button onClick={onShowUP42} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
          <Folder strokeWidth={0.8} className="size-12"/>
          <span>up42</span>
        </button>
        <button onClick={onShowCandis} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
          <FileText strokeWidth={0.8} className="size-12"/>
          <span>candis.html</span>
        </button>
        <button onClick={onShowUrbanSportsClub} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
          <FileText strokeWidth={0.8} className="size-12"/>
          <span>urban-sports-club.html</span>
        </button>
      </WindowContent>

      <WindowContent view="list" className="@container">
        <ul>
          <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 pb-1">
            <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={onShowMcKinsey} className="text-muted-foreground font-bold hover:bg-muted">McKinsey & Company</button></span>
            <span className="flex-grow">Leading design across digital transformation initiatives.</span>
            <span className="flex-none order-first @3xl:order-last @3xl:text-right text-sm @3xl:text-base text-muted-foreground">2021–Present</span>
          </li>
          <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t py-1">
            <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={onShowUP42} className="text-muted-foreground font-bold hover:bg-muted">UP42</button></span>
            <span className="flex-grow">Established design practice and launched several keystone projects.</span>
            <span className="flex-none order-first @3xl:order-last @3xl:text-right text-sm @3xl:text-base text-muted-foreground">2019–2021</span>
          </li>
          <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t py-1">
            <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={onShowCandis} className="text-muted-foreground font-bold hover:bg-muted">Candis</button></span>
            <span className="grow">Design team of one, hands-on from research to frontend.</span>
            <span className="flex-none order-first @3xl:order-last @3xl:text-right text-sm @3xl:text-base text-muted-foreground">2017–2019</span>
          </li>
          <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t pt-1">
            <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={onShowUrbanSportsClub} className="text-muted-foreground font-bold hover:bg-muted">Urban Sports Club</button></span>
            <span className="grow">Laid the technical and product foundations for European expansion.</span>
            <span className="flex-none order-first @3xl:order-last @3xl:text-right text-sm @3xl:text-base text-muted-foreground">2015</span>
          </li>
        </ul>
      </WindowContent>
    </Window>
  );
}
