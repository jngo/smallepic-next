"use client"

import { memo } from "react";
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

function ExperienceWindow({
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
        <button onClick={onShowMcKinsey} className="desktop-item w-24">
          <FileText strokeWidth={0.8} className="size-12"/>
          <span>mckinsey-and-company.html</span>
        </button>
        <button onClick={onShowUP42} className="desktop-item w-24">
          <Folder strokeWidth={0.8} className="size-12"/>
          <span>up42</span>
        </button>
        <button onClick={onShowCandis} className="desktop-item w-24">
          <FileText strokeWidth={0.8} className="size-12"/>
          <span>candis.html</span>
        </button>
        <button onClick={onShowUrbanSportsClub} className="desktop-item w-24">
          <FileText strokeWidth={0.8} className="size-12"/>
          <span>urban-sports-club.html</span>
        </button>
      </WindowContent>

      <WindowContent view="list" className="@container">
        <ul>
          <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 pb-1">
            <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={onShowMcKinsey} className="desktop-list-link">McKinsey & Company</button></span>
            <span className="flex-grow">Leading McKinsey&apos;s in-house product design capability and the systems consultants rely on daily.</span>
            <span className="flex-none order-first @3xl:order-last @3xl:text-right text-sm @3xl:text-base text-muted-foreground">2021–Present</span>
          </li>
          <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t py-1">
            <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={onShowUP42} className="desktop-list-link">UP42</button></span>
            <span className="flex-grow">Founding design leader who built UP42&apos;s design function from the ground up.</span>
            <span className="flex-none order-first @3xl:order-last @3xl:text-right text-sm @3xl:text-base text-muted-foreground">2019–2021</span>
          </li>
          <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t py-1">
            <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={onShowCandis} className="desktop-list-link">Candis</button></span>
            <span className="grow">Design team of one, hands-on from research through frontend delivery.</span>
            <span className="flex-none order-first @3xl:order-last @3xl:text-right text-sm @3xl:text-base text-muted-foreground">2017–2019</span>
          </li>
          <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t pt-1">
            <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={onShowUrbanSportsClub} className="desktop-list-link">Urban Sports Club</button></span>
            <span className="grow">Laid the technical and product foundations for Urban Sports Club&apos;s expansion across Europe.</span>
            <span className="flex-none order-first @3xl:order-last @3xl:text-right text-sm @3xl:text-base text-muted-foreground">2015</span>
          </li>
        </ul>
      </WindowContent>
    </Window>
  );
}

export default memo(ExperienceWindow);
