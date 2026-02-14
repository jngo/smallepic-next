"use client"

import { useState, useRef, useCallback, lazy, Suspense, useEffect } from "react";
import { track } from "@vercel/analytics";
import { useRouter } from "next/navigation";
import { WindowRef } from "@/components/ui/window";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { BriefcaseBusiness, Clapperboard, LibraryBig, Mail, Network, Podcast, ScanText } from "lucide-react";
import Clock from "@/components/ui/clock";
import { getDescendantWindowIds, getPathForWindow, WindowId } from "@/lib/window-routes";

// Lazy load window components for code splitting
const AboutWindow = lazy(() => import("@/components/windows/AboutWindow"));
const JohnNgoWindow = lazy(() => import("@/components/windows/JohnNgoWindow"));
const ExperienceWindow = lazy(() => import("@/components/windows/ExperienceWindow"));
const ExplorationWindow = lazy(() => import("@/components/windows/ExplorationWindow"));
const McKinseyWindow = lazy(() => import("@/components/windows/McKinseyWindow"));
const UP42Window = lazy(() => import("@/components/windows/UP42Window"));
const CandisWindow = lazy(() => import("@/components/windows/CandisWindow"));
const UrbanSportsClubWindow = lazy(() => import("@/components/windows/UrbanSportsClubWindow"));
const SynthesiserWindow = lazy(() => import("@/components/windows/SynthesiserWindow"));
const PodscriberWindow = lazy(() => import("@/components/windows/PodscriberWindow"));
const MermaidViewerWindow = lazy(() => import("@/components/windows/MermaidViewerWindow"));
const FilmsAndConversationsWindow = lazy(() => import("@/components/windows/FilmsAndConversationsWindow"));
const BooksAndConversationsWindow = lazy(() => import("@/components/windows/BooksAndConversationsWindow"));
const DocumentationHubCaseStudyWindow = lazy(() => import("@/components/windows/DocumentationHubCaseStudyWindow"));
const CatalogSearchCaseStudyWindow = lazy(() => import("@/components/windows/CatalogSearchCaseStudyWindow"));
const CatalogSearchPrototypeWindow = lazy(() => import("@/components/windows/CatalogSearchPrototypeWindow"));
const MarketingWebsiteCaseStudyWindow = lazy(() => import("@/components/windows/MarketingWebsiteCaseStudyWindow"));
const GISOSPrototypeWindow = lazy(() => import("@/components/windows/GISOSPrototypeWindow"));

interface DesktopAppProps {
  initialOpenWindows?: WindowId[];
}

const defaultWindows: Record<WindowId, boolean> = {
  about: false,
  johnNgo: false,
  experience: false,
  exploration: false,
  mermaidViewer: false,
  podscriber: false,
  synthesiser: false,
  filmsAndConversations: false,
  booksAndConversations: false,
  mckinseyAndCompany: false,
  up42: false,
  documentationHubCaseStudy: false,
  catalogSearchPrototype: false,
  catalogSearchCaseStudy: false,
  marketingWebsiteCaseStudy: false,
  gisosPrototype: false,
  candis: false,
  urbanSportsClub: false,
};

export default function DesktopApp({ initialOpenWindows = [] }: DesktopAppProps) {
  const router = useRouter();
  // Consolidated window visibility state
  const [windows, setWindows] = useState(() => {
    const nextWindows = { ...defaultWindows };
    initialOpenWindows.forEach((windowId) => {
      nextWindows[windowId] = true;
    });
    return nextWindows;
  });

  // Consolidated refs for window instances
  const windowRefs = useRef<Record<WindowId, React.RefObject<WindowRef | null>>>({
    about: useRef<WindowRef | null>(null),
    johnNgo: useRef<WindowRef | null>(null),
    experience: useRef<WindowRef | null>(null),
    exploration: useRef<WindowRef | null>(null),
    mermaidViewer: useRef<WindowRef | null>(null),
    podscriber: useRef<WindowRef | null>(null),
    synthesiser: useRef<WindowRef | null>(null),
    filmsAndConversations: useRef<WindowRef | null>(null),
    booksAndConversations: useRef<WindowRef | null>(null),
    mckinseyAndCompany: useRef<WindowRef | null>(null),
    up42: useRef<WindowRef | null>(null),
    documentationHubCaseStudy: useRef<WindowRef | null>(null),
    catalogSearchPrototype: useRef<WindowRef | null>(null),
    catalogSearchCaseStudy: useRef<WindowRef | null>(null),
    marketingWebsiteCaseStudy: useRef<WindowRef | null>(null),
    gisosPrototype: useRef<WindowRef | null>(null),
    candis: useRef<WindowRef | null>(null),
    urbanSportsClub: useRef<WindowRef | null>(null),
  }).current;

  // Memoized helper function to show window and bring to front
  const showWindow = useCallback((windowId: WindowId, origin: string) => {
    track("window_open", { id: windowId, origin });
    setWindows(prev => ({ ...prev, [windowId]: true }));
    const windowPath = getPathForWindow(windowId);
    if (windowPath) {
      router.push(windowPath);
    }
    // Use setTimeout to ensure the window is rendered before bringing to front
    setTimeout(() => {
      windowRefs[windowId]?.current?.bringToFront();
    }, 0);
  }, [router, windowRefs]);

  const focusWindow = useCallback((windowId: WindowId) => {
    const windowPath = getPathForWindow(windowId);
    if (windowPath) {
      router.replace(windowPath);
    }
  }, [router]);

  // Memoized helper function to close window
  const closeWindow = useCallback((windowId: WindowId) => {
    track("window_close", { id: windowId });
    setWindows(prev => {
      const nextWindows = { ...prev, [windowId]: false };

      getDescendantWindowIds(windowId).forEach((descendantWindowId) => {
        nextWindows[descendantWindowId] = false;
      });

      const hasOpenWindows = Object.values(nextWindows).some(Boolean);
      if (!hasOpenWindows) {
        router.replace("/");
      }

      return nextWindows;
    });
  }, [router]);

  useEffect(() => {
    const activeWindowId = initialOpenWindows[initialOpenWindows.length - 1];
    if (!activeWindowId) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      windowRefs[activeWindowId]?.current?.bringToFront();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [initialOpenWindows, windowRefs]);

  return (
    <div className="w-svw h-svh relative overflow-clip">
      <Menubar className="fixed top-0 left-0 right-0 z-50 rounded-none border-x-0 border-t-0 border-b flex items-center">
        <MenubarMenu>
          <MenubarTrigger className="font-bold">John Ngo</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => showWindow("about", "menubar")}>About</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Experience</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => showWindow("experience", "menubar")}>View All</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => showWindow("mckinseyAndCompany", "menubar")}>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>McKinsey & Company</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow("up42", "menubar")}>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>UP42</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow("candis", "menubar")}>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>Candis</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow("urbanSportsClub", "menubar")}>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>Urban Sports Club</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Exploration</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => showWindow("exploration", "menubar")}>View All</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => showWindow("synthesiser", "menubar")}>
              <Network className="mr-2 h-4 w-4" />
              <span>Synthesiser</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow("podscriber", "menubar")}>
              <Podcast className="mr-2 h-4 w-4" />
              <span>Podscriber</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow("mermaidViewer", "menubar")}>
              <ScanText className="mr-2 h-4 w-4" />
              <span>Mermaid Viewer</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow("filmsAndConversations", "menubar")}>
              <Clapperboard className="mr-2 h-4 w-4" />
              <span>Films & Conversations</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow("booksAndConversations", "menubar")}>
              <LibraryBig className="mr-2 h-4 w-4" />
              <span>Books & Conversations</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Contact</MenubarTrigger>
          <MenubarContent>
            <MenubarItem asChild>
              <a href="mailto:john@smallepic.com" onClick={() => track("link_open", { id: "email", url: "mailto:john@smallepic.com" })}>
                <Mail className="mr-2 h-4 w-4" />
                Email
              </a>
            </MenubarItem>
            <MenubarItem asChild>
              <a href="https://www.linkedin.com/in/jngo/" onClick={() => track("link_open", { id: "linkedin", url: "https://www.linkedin.com/in/jngo/" })}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide mr-2 h-4 w-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
            </MenubarItem>
            <MenubarItem asChild>
              <a href="https://github.com/jngo" onClick={() => track("link_open", { id: "github", url: "https://github.com/jngo" })}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide mr-2 h-4 w-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                GitHub
              </a>
            </MenubarItem>
            <MenubarItem asChild>
              <a href="https://twitter.com/jngo" onClick={() => track("link_open", { id: "twitter", url: "https://twitter.com/jngo" })}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide mr-2 h-4 w-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                Twitter
              </a>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <Clock className="ml-auto pr-2" />
      </Menubar>

      {/* Windows with Suspense boundaries for lazy loading */}
      {windows.exploration && (
        <Suspense>
          <ExplorationWindow
            onClose={() => closeWindow("exploration")}
            onFocus={() => focusWindow("exploration")}
            windowRef={windowRefs.exploration}
            onShowSynthesiser={() => showWindow("synthesiser", "icon")}
            onShowPodscriber={() => showWindow("podscriber", "icon")}
            onShowMermaidViewer={() => showWindow("mermaidViewer", "icon")}
            onShowFilmsAndConversations={() => showWindow("filmsAndConversations", "icon")}
            onShowBooksAndConversations={() => showWindow("booksAndConversations", "icon")}
          />
        </Suspense>
      )}

      {windows.experience && (
        <Suspense>
          <ExperienceWindow
            onClose={() => closeWindow("experience")}
            onFocus={() => focusWindow("experience")}
            windowRef={windowRefs.experience}
            onShowMcKinsey={() => showWindow("mckinseyAndCompany", "icon")}
            onShowUP42={() => showWindow("up42", "icon")}
            onShowCandis={() => showWindow("candis", "icon")}
            onShowUrbanSportsClub={() => showWindow("urbanSportsClub", "icon")}
          />
        </Suspense>
      )}

      {windows.about && (
        <Suspense>
          <AboutWindow
            onClose={() => closeWindow("about")}
            onFocus={() => focusWindow("about")}
            onShowJohnNgo={() => showWindow("johnNgo", "icon")}
            windowRef={windowRefs.about}
          />
        </Suspense>
      )}

      {windows.johnNgo && (
        <Suspense>
          <JohnNgoWindow
            onClose={() => closeWindow("johnNgo")}
            onFocus={() => focusWindow("johnNgo")}
            windowRef={windowRefs.johnNgo}
          />
        </Suspense>
      )}

      {windows.mckinseyAndCompany && (
        <Suspense>
          <McKinseyWindow
            onClose={() => closeWindow("mckinseyAndCompany")}
            onFocus={() => focusWindow("mckinseyAndCompany")}
            windowRef={windowRefs.mckinseyAndCompany}
          />
        </Suspense>
      )}

      {windows.up42 && (
        <Suspense>
          <UP42Window
            onClose={() => closeWindow("up42")}
            onFocus={() => focusWindow("up42")}
            windowRef={windowRefs.up42}
            onShowDocumentationHub={() => showWindow("documentationHubCaseStudy", "icon")}
            onShowCatalogSearchCaseStudy={() => showWindow("catalogSearchCaseStudy", "icon")}
            onShowCatalogSearchPrototype={() => showWindow("catalogSearchPrototype", "icon")}
            onShowMarketingWebsiteCaseStudy={() => showWindow("marketingWebsiteCaseStudy", "icon")}
            onShowGISOSPrototype={() => showWindow("gisosPrototype", "icon")}
          />
        </Suspense>
      )}

      {windows.documentationHubCaseStudy && (
        <Suspense>
          <DocumentationHubCaseStudyWindow
            onClose={() => closeWindow("documentationHubCaseStudy")}
            onFocus={() => focusWindow("documentationHubCaseStudy")}
            windowRef={windowRefs.documentationHubCaseStudy}
          />
        </Suspense>
      )}

      {windows.catalogSearchCaseStudy && (
        <Suspense>
          <CatalogSearchCaseStudyWindow
            onClose={() => closeWindow("catalogSearchCaseStudy")}
            onFocus={() => focusWindow("catalogSearchCaseStudy")}
            windowRef={windowRefs.catalogSearchCaseStudy}
          />
        </Suspense>
      )}

      {windows.catalogSearchPrototype && (
        <Suspense>
          <CatalogSearchPrototypeWindow
            onClose={() => closeWindow("catalogSearchPrototype")}
            onFocus={() => focusWindow("catalogSearchPrototype")}
            windowRef={windowRefs.catalogSearchPrototype}
          />
        </Suspense>
      )}

      {windows.marketingWebsiteCaseStudy && (
        <Suspense>
          <MarketingWebsiteCaseStudyWindow
            onClose={() => closeWindow("marketingWebsiteCaseStudy")}
            onFocus={() => focusWindow("marketingWebsiteCaseStudy")}
            windowRef={windowRefs.marketingWebsiteCaseStudy}
          />
        </Suspense>
      )}

      {windows.gisosPrototype && (
        <Suspense>
          <GISOSPrototypeWindow
            onClose={() => closeWindow("gisosPrototype")}
            onFocus={() => focusWindow("gisosPrototype")}
            windowRef={windowRefs.gisosPrototype}
          />
        </Suspense>
      )}

      {windows.candis && (
        <Suspense>
          <CandisWindow
            onClose={() => closeWindow("candis")}
            onFocus={() => focusWindow("candis")}
            windowRef={windowRefs.candis}
          />
        </Suspense>
      )}

      {windows.urbanSportsClub && (
        <Suspense>
          <UrbanSportsClubWindow
            onClose={() => closeWindow("urbanSportsClub")}
            onFocus={() => focusWindow("urbanSportsClub")}
            windowRef={windowRefs.urbanSportsClub}
          />
        </Suspense>
      )}

      {windows.synthesiser && (
        <Suspense>
          <SynthesiserWindow
            onClose={() => closeWindow("synthesiser")}
            onFocus={() => focusWindow("synthesiser")}
            windowRef={windowRefs.synthesiser}
          />
        </Suspense>
      )}

      {windows.podscriber && (
        <Suspense>
          <PodscriberWindow
            onClose={() => closeWindow("podscriber")}
            onFocus={() => focusWindow("podscriber")}
            windowRef={windowRefs.podscriber}
          />
        </Suspense>
      )}

      {windows.mermaidViewer && (
        <Suspense>
          <MermaidViewerWindow
            onClose={() => closeWindow("mermaidViewer")}
            onFocus={() => focusWindow("mermaidViewer")}
            windowRef={windowRefs.mermaidViewer}
          />
        </Suspense>
      )}

      {windows.filmsAndConversations && (
        <Suspense>
          <FilmsAndConversationsWindow
            onClose={() => closeWindow("filmsAndConversations")}
            onFocus={() => focusWindow("filmsAndConversations")}
            windowRef={windowRefs.filmsAndConversations}
          />
        </Suspense>
      )}

      {windows.booksAndConversations && (
        <Suspense>
          <BooksAndConversationsWindow
            onClose={() => closeWindow("booksAndConversations")}
            onFocus={() => focusWindow("booksAndConversations")}
            windowRef={windowRefs.booksAndConversations}
          />
        </Suspense>
      )}
    </div>
  );
}
