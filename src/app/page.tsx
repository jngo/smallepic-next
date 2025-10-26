"use client"

import { useState, useRef } from "react";
import { track } from "@vercel/analytics";
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

// Import window components
import AboutWindow from "@/components/windows/AboutWindow";
import JohnNgoWindow from "@/components/windows/JohnNgoWindow";
import ExperienceWindow from "@/components/windows/ExperienceWindow";
import ExplorationWindow from "@/components/windows/ExplorationWindow";
import McKinseyWindow from "@/components/windows/McKinseyWindow";
import UP42Window from "@/components/windows/UP42Window";
import CandisWindow from "@/components/windows/CandisWindow";
import UrbanSportsClubWindow from "@/components/windows/UrbanSportsClubWindow";
import SynthesiserWindow from "@/components/windows/SynthesiserWindow";
import PodscriberWindow from "@/components/windows/PodscriberWindow";
import MermaidViewerWindow from "@/components/windows/MermaidViewerWindow";
import FilmsAndConversationsWindow from "@/components/windows/FilmsAndConversationsWindow";
import BooksAndConversationsWindow from "@/components/windows/BooksAndConversationsWindow";
import DocumentationHubCaseStudyWindow from "@/components/windows/DocumentationHubCaseStudyWindow";
import CatalogSearchCaseStudyWindow from "@/components/windows/CatalogSearchCaseStudyWindow";
import CatalogSearchPrototypeWindow from "@/components/windows/CatalogSearchPrototypeWindow";
import MarketingWebsiteCaseStudyWindow from "@/components/windows/MarketingWebsiteCaseStudyWindow";
import GISOSPrototypeWindow from "@/components/windows/GISOSPrototypeWindow";

export default function Home() {
  const [showAbout, setShowAbout] = useState(true);
  const [showJohnNgo, setShowJohnNgo] = useState(false);
  const [showExperience, setShowExperience] = useState(true);
  const [showExploration, setShowExploration] = useState(true);
  const [showMermaidViewer, setShowMermaidViewer] = useState(false);
  const [showPodscriber, setShowPodscriber] = useState(false);
  const [showSynthesiser, setShowSynthesiser] = useState(false);
  const [showFilmsAndConversations, setShowFilmsAndConversations] = useState(false);
  const [showBooksAndConversations, setShowBooksAndConversations] = useState(false);
  const [showMcKinseyAndCompany, setShowMcKinseyAndCompany] = useState(false);
  const [showUP42, setShowUP42] = useState(false);
  const [showDocumentationHubCaseStudy, setShowDocumentationHubCaseStudy] = useState(false);
  const [showCatalogSearchPrototype, setShowCatalogSearchPrototype] = useState(false);
  const [showCatalogSearchCaseStudy, setShowCatalogSearchCaseStudy] = useState(false);
  const [showMarketingWebsiteCaseStudy, setShowMarketingWebsiteCaseStudy] = useState(false);
  const [showGISOSPrototype, setShowGISOSPrototype] = useState(false);
  const [showCandis, setShowCandis] = useState(false);
  const [showUrbanSportsClub, setShowUrbanSportsClub] = useState(false);

  // Refs for each window
  const aboutRef = useRef<WindowRef>(null);
  const johnNgoRef = useRef<WindowRef>(null);
  const experienceRef = useRef<WindowRef>(null);
  const explorationRef = useRef<WindowRef>(null);
  const mermaidViewerRef = useRef<WindowRef>(null);
  const podscriberRef = useRef<WindowRef>(null);
  const synthesiserRef = useRef<WindowRef>(null);
  const filmsAndConversationsRef = useRef<WindowRef>(null);
  const booksAndConversationsRef = useRef<WindowRef>(null);
  const mckinseyAndCompanyRef = useRef<WindowRef>(null);
  const up42Ref = useRef<WindowRef>(null);
  const documentationHubCaseStudyRef = useRef<WindowRef>(null);
  const catalogSearchPrototypeRef = useRef<WindowRef>(null);
  const catalogSearchCaseStudyRef = useRef<WindowRef>(null);
  const marketingWebsiteCaseStudyRef = useRef<WindowRef>(null);
  const GISOSPrototypeRef = useRef<WindowRef>(null);
  const candisRef = useRef<WindowRef>(null);
  const urbanSportsClubRef = useRef<WindowRef>(null);

  // Helper function to show window and bring to front
  const showWindow = (
    id: string,
    origin: string,
    setShow: (show: boolean) => void,
    ref: React.RefObject<WindowRef | null>
  ) => {
    track("window_open", { id, origin });
    setShow(true);
    // Use setTimeout to ensure the window is rendered before bringing to front
    setTimeout(() => {
      ref.current?.bringToFront();
    }, 0);
  };

  const closeWindow = (id: string, setShow: (show: boolean) => void) => {
    track("window_close", { id });
    setShow(false);
  };

  return (
    <div className="w-svw h-svh relative overflow-clip">
      <Menubar className="fixed top-0 left-0 right-0 z-50 rounded-none border-x-0 border-t-0 border-b flex items-center">
        <MenubarMenu>
          <MenubarTrigger className="font-bold">John Ngo</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => showWindow("about", "menubar", setShowAbout, aboutRef)}>About</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Experience</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => showWindow("experience", "menubar", setShowExperience, experienceRef)}>View All</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => showWindow("mckinsey_and_company", "menubar", setShowMcKinseyAndCompany, mckinseyAndCompanyRef)}>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>McKinsey & Company</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow("up42", "menubar", setShowUP42, up42Ref)}>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>UP42</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow("candis", "menubar", setShowCandis, candisRef)}>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>Candis</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow("urban_sports_club", "menubar", setShowUrbanSportsClub, urbanSportsClubRef)}>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>Urban Sports Club</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Exploration</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => showWindow("exploration", "menubar", setShowExploration, explorationRef)}>View All</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => showWindow("synthesiser", "menubar", setShowSynthesiser, synthesiserRef)}>
              <Network className="mr-2 h-4 w-4" />
              <span>Synthesiser</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow("podscriber", "menubar", setShowPodscriber, podscriberRef)}>
              <Podcast className="mr-2 h-4 w-4" />
              <span>Podscriber</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow("mermaid_viewer", "menubar", setShowMermaidViewer, mermaidViewerRef)}>
              <ScanText className="mr-2 h-4 w-4" />
              <span>Mermaid Viewer</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow("films_and_conversations", "menubar", setShowFilmsAndConversations, filmsAndConversationsRef)}>
              <Clapperboard className="mr-2 h-4 w-4" />
              <span>Films & Conversations</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow("books_and_conversations", "menubar", setShowBooksAndConversations, booksAndConversationsRef)}>
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

      {/* Windows */}
      {showExploration && (
        <ExplorationWindow
          onClose={() => closeWindow("exploration", setShowExploration)}
          windowRef={explorationRef}
          onShowSynthesiser={() => showWindow("synthesiser", "icon", setShowSynthesiser, synthesiserRef)}
          onShowPodscriber={() => showWindow("podscriber", "icon", setShowPodscriber, podscriberRef)}
          onShowMermaidViewer={() => showWindow("mermaid_viewer", "icon", setShowMermaidViewer, mermaidViewerRef)}
          onShowFilmsAndConversations={() => showWindow("films_and_conversations", "icon", setShowFilmsAndConversations, filmsAndConversationsRef)}
          onShowBooksAndConversations={() => showWindow("books_and_conversations", "icon", setShowBooksAndConversations, booksAndConversationsRef)}
        />
      )}

      {showExperience && (
        <ExperienceWindow
          onClose={() => closeWindow("experience", setShowExperience)}
          windowRef={experienceRef}
          onShowMcKinsey={() => showWindow("mckinsey_and_company", "icon", setShowMcKinseyAndCompany, mckinseyAndCompanyRef)}
          onShowUP42={() => showWindow("up42", "icon", setShowUP42, up42Ref)}
          onShowCandis={() => showWindow("candis", "icon", setShowCandis, candisRef)}
          onShowUrbanSportsClub={() => showWindow("urban_sports_club", "icon", setShowUrbanSportsClub, urbanSportsClubRef)}
        />
      )}

      {showAbout && (
        <AboutWindow
          onClose={() => closeWindow("about", setShowAbout)}
          onShowJohnNgo={() => setShowJohnNgo(true)}
          windowRef={aboutRef}
        />
      )}

      {showJohnNgo && (
        <JohnNgoWindow
          onClose={() => closeWindow("john_ngo", setShowJohnNgo)}
          windowRef={johnNgoRef}
        />
      )}

      {showMcKinseyAndCompany && (
        <McKinseyWindow
          onClose={() => closeWindow("mckinsey_and_company", setShowMcKinseyAndCompany)}
          windowRef={mckinseyAndCompanyRef}
        />
      )}

      {showUP42 && (
        <UP42Window
          onClose={() => closeWindow("up42", setShowUP42)}
          windowRef={up42Ref}
          onShowDocumentationHub={() => showWindow("documentation_hub_case_study", "icon", setShowDocumentationHubCaseStudy, documentationHubCaseStudyRef)}
          onShowCatalogSearchCaseStudy={() => showWindow("catalog_search_case_study", "icon", setShowCatalogSearchCaseStudy, catalogSearchCaseStudyRef)}
          onShowCatalogSearchPrototype={() => showWindow("catalog_search_prototype", "icon", setShowCatalogSearchPrototype, catalogSearchPrototypeRef)}
          onShowMarketingWebsiteCaseStudy={() => showWindow("marketing_website_case_study", "icon", setShowMarketingWebsiteCaseStudy, marketingWebsiteCaseStudyRef)}
          onShowGISOSPrototype={() => showWindow("gis_os_prototype", "icon", setShowGISOSPrototype, GISOSPrototypeRef)}
        />
      )}

      {showDocumentationHubCaseStudy && (
        <DocumentationHubCaseStudyWindow
          onClose={() => closeWindow("documentation_hub_case_study", setShowDocumentationHubCaseStudy)}
          windowRef={documentationHubCaseStudyRef}
        />
      )}

      {showCatalogSearchCaseStudy && (
        <CatalogSearchCaseStudyWindow
          onClose={() => closeWindow("catalog_search_case_study", setShowCatalogSearchCaseStudy)}
          windowRef={catalogSearchCaseStudyRef}
        />
      )}

      {showCatalogSearchPrototype && (
        <CatalogSearchPrototypeWindow
          onClose={() => closeWindow("catalog_search_prototype", setShowCatalogSearchPrototype)}
          windowRef={catalogSearchPrototypeRef}
        />
      )}

      {showMarketingWebsiteCaseStudy && (
        <MarketingWebsiteCaseStudyWindow
          onClose={() => closeWindow("marketing_website_case_study", setShowMarketingWebsiteCaseStudy)}
          windowRef={marketingWebsiteCaseStudyRef}
        />
      )}

      {showGISOSPrototype && (
        <GISOSPrototypeWindow
          onClose={() => closeWindow("gis_os_prototype", setShowGISOSPrototype)}
          windowRef={GISOSPrototypeRef}
        />
      )}

      {showCandis && (
        <CandisWindow
          onClose={() => closeWindow("candis", setShowCandis)}
          windowRef={candisRef}
        />
      )}

      {showUrbanSportsClub && (
        <UrbanSportsClubWindow
          onClose={() => closeWindow("urban_sports_club", setShowUrbanSportsClub)}
          windowRef={urbanSportsClubRef}
        />
      )}

      {showSynthesiser && (
        <SynthesiserWindow
          onClose={() => closeWindow("synthesiser", setShowSynthesiser)}
          windowRef={synthesiserRef}
        />
      )}

      {showPodscriber && (
        <PodscriberWindow
          onClose={() => closeWindow("podscriber", setShowPodscriber)}
          windowRef={podscriberRef}
        />
      )}

      {showMermaidViewer && (
        <MermaidViewerWindow
          onClose={() => closeWindow("mermaid_viewer", setShowMermaidViewer)}
          windowRef={mermaidViewerRef}
        />
      )}

      {showFilmsAndConversations && (
        <FilmsAndConversationsWindow
          onClose={() => closeWindow("films_and_conversations", setShowFilmsAndConversations)}
          windowRef={filmsAndConversationsRef}
        />
      )}

      {showBooksAndConversations && (
        <BooksAndConversationsWindow
          onClose={() => closeWindow("books_and_conversations", setShowBooksAndConversations)}
          windowRef={booksAndConversationsRef}
        />
      )}
    </div>
  );
}
