"use client"

import { useState, useRef } from "react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Window, WindowRef, WindowTitle, WindowContent } from "@/components/ui/window";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { BriefcaseBusiness, Clapperboard, FileBox, FileChartPie, FileSymlink, FileText, FileVideo, Folder, LibraryBig, Mail, Network, Podcast, ScanText } from "lucide-react";
import Clock from "@/components/ui/clock";
import Image from "next/image";

export default function Home() {
  const [showAbout, setShowAbout] = useState(true);
  const [showJohnNgo, setShowJohnNgo] = useState(false);
  const [showExperience, setShowExperience] = useState(true);
  const [showExploration, setShowExploration] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const [showMermaidViewer, setShowMermaidViewer] = useState(false);
  const [showPodscriber, setShowPodscriber] = useState(false);
  const [showSynthesiser, setShowSynthesiser] = useState(false);
  const [showFilmsAndConversations, setShowFilmsAndConversations] = useState(false);
  const [showBooksAndConversations, setShowBooksAndConversations] = useState(false);
  const [showMcKinseyAndCompany, setShowMcKinseyAndCompany] = useState(false);
  const [showUP42, setShowUP42] = useState(false);
  const [showDocumentationHubPresentation, setShowDocumentationHubPresentation] = useState(false);
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
  const contactRef = useRef<WindowRef>(null);
  const mermaidViewerRef = useRef<WindowRef>(null);
  const podscriberRef = useRef<WindowRef>(null);
  const synthesiserRef = useRef<WindowRef>(null);
  const filmsAndConversationsRef = useRef<WindowRef>(null);
  const booksAndConversationsRef = useRef<WindowRef>(null);
  const mckinseyAndCompanyRef = useRef<WindowRef>(null);
  const up42Ref = useRef<WindowRef>(null);
  const documentationHubPresentationRef = useRef<WindowRef>(null);
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


      {showExploration && (
        <Window id="exploration" ref={explorationRef} defaultView="list" className="w-210 left-4 top-14" onClose={() => closeWindow("exploration", setShowExploration)}>
        <WindowTitle>Exploration</WindowTitle>

        <WindowContent view="icon">
          <button onClick={() => showWindow("synthesiser", "icon", setShowSynthesiser, synthesiserRef)} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <Network strokeWidth={0.8} className="size-12"/>
            <span>synthesiser.html</span>
          </button>
          <button onClick={() => showWindow("podscriber", "icon", setShowPodscriber, podscriberRef)} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <Podcast strokeWidth={0.8} className="size-12"/>
            <span>podscriber.html</span>
          </button>
          <button onClick={() => showWindow("mermaid_viewer", "icon", setShowMermaidViewer, mermaidViewerRef)} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <ScanText strokeWidth={0.8} className="size-12"/>
            <span>mermaid-viewer.html</span>
          </button>
          <button onClick={() => showWindow("films_and_conversations", "icon", setShowFilmsAndConversations, filmsAndConversationsRef)} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <Clapperboard strokeWidth={0.8} className="size-12"/>
            <span>films-and-conversations.html</span>
          </button>
          <button onClick={() => showWindow("books_and_conversations", "icon", setShowBooksAndConversations, booksAndConversationsRef)} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <LibraryBig strokeWidth={0.8} className="size-12"/>
            <span>books-and-conversations.html</span>
          </button>
        </WindowContent>

        <WindowContent view="list" className="@container">
          <ul>
            <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 pb-1">
              <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={() => showWindow("synthesiser", "list", setShowSynthesiser, synthesiserRef)} className="text-muted-foreground font-bold hover:bg-muted">Synthesiser</button></span>
              <span className="grow">Generate a Minto Pyramid synthesis of any content.</span>
            </li>
            <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t py-1">
              <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={() => showWindow("podscriber", "list", setShowPodscriber, podscriberRef)} className="text-muted-foreground font-bold hover:bg-muted">Podscriber</button></span>
              <span className="grow">Transcribe podcast episodes and send them to your read-it-later queue.</span>
            </li>
            <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t py-1">
              <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={() => showWindow("mermaid_viewer", "list", setShowMermaidViewer, mermaidViewerRef)} className="text-muted-foreground font-bold hover:bg-muted">Mermaid Viewer</button></span>
              <span className="grow">A lightweight, mobile-friendly Mermaid diagram viewer.</span>
            </li>
            <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t py-1">
              <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={() => showWindow("films_and_conversations", "list", setShowFilmsAndConversations, filmsAndConversationsRef)} className="text-muted-foreground font-bold hover:bg-muted">Films & Conversations</button></span>
              <span className="flex-grow">A film club bringing together people, documentaries, and discussions.</span>
            </li>
            <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t pt-1">
              <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={() => showWindow("books_and_conversations", "list", setShowBooksAndConversations, booksAndConversationsRef)} className="text-muted-foreground font-bold hover:bg-muted">Books & Conversations</button></span>
              <span className="grow">Roundtable discussions with good friends and great books.</span>
            </li>
          </ul>
        </WindowContent>
      </Window>
      )}

      {showExperience && (
      <Window id="experience" ref={experienceRef} defaultView="icon" className="w-210 left-16 top-30" onClose={() => closeWindow("experience", setShowExperience)}>
        <WindowTitle>Experience</WindowTitle>

        <WindowContent view="icon">
          <button onClick={() => showWindow("mckinsey_and_company", "icon", setShowMcKinseyAndCompany, mckinseyAndCompanyRef)} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
            <FileText strokeWidth={0.8} className="size-12"/>
            <span>mckinsey-and-company.html</span>
          </button>
          <button onClick={() => showWindow("up42", "icon", setShowUP42, up42Ref)} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
            <Folder strokeWidth={0.8} className="size-12"/>
            <span>up42</span>
          </button>
          <button onClick={() => showWindow("candis", "icon", setShowCandis, candisRef)} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
            <FileText strokeWidth={0.8} className="size-12"/>
            <span>candis.html</span>
          </button>
          <button onClick={() => showWindow("urban_sports_club", "icon", setShowUrbanSportsClub, urbanSportsClubRef)} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
            <FileText strokeWidth={0.8} className="size-12"/>
            <span>urban-sports-club.html</span>
          </button>
        </WindowContent>

        <WindowContent view="list" className="@container">
          <ul>
            <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 pb-1">
              <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={() => showWindow("mckinsey_and_company", "list", setShowMcKinseyAndCompany, mckinseyAndCompanyRef)} className="text-muted-foreground font-bold hover:bg-muted">McKinsey & Company</button></span>
              <span className="flex-grow">Leading design across digital transformation initiatives.</span>
              <span className="flex-none order-first @3xl:order-last @3xl:text-right text-sm @3xl:text-base text-muted-foreground">2021–Present</span>
            </li>
            <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t py-1">
              <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={() => showWindow("up42", "list", setShowUP42, up42Ref)} className="text-muted-foreground font-bold hover:bg-muted">UP42</button></span>
              <span className="flex-grow">Established design practice and launched several keystone projects.</span>
              <span className="flex-none order-first @3xl:order-last @3xl:text-right text-sm @3xl:text-base text-muted-foreground">2019–2021</span>
            </li>
            <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t py-1">
              <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={() => showWindow("candis", "list", setShowCandis, candisRef)} className="text-muted-foreground font-bold hover:bg-muted">Candis</button></span>
              <span className="grow">Design team of one, hands-on from research to frontend.</span>
              <span className="flex-none order-first @3xl:order-last @3xl:text-right text-sm @3xl:text-base text-muted-foreground">2017–2019</span>
            </li>
            <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t pt-1">
              <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={() => showWindow("urban_sports_club", "list", setShowUrbanSportsClub, urbanSportsClubRef)} className="text-muted-foreground font-bold hover:bg-muted">Urban Sports Club</button></span>
              <span className="grow">Laid the technical and product foundations for European expansion.</span>
              <span className="flex-none order-first @3xl:order-last @3xl:text-right text-sm @3xl:text-base text-muted-foreground">2015</span>
            </li>
          </ul>
        </WindowContent>
      </Window>
      )}

      {showAbout && (
        <Window id="about" ref={aboutRef} className="w-125 left-1/2 top-1/2 -translate-1/2" onClose={() => closeWindow("about", setShowAbout)}>
        <WindowTitle>About</WindowTitle>
        <WindowContent>
          <h1 className="text-3xl font-bold mt-4 mb-4">
            Hi, I’m <button className="text-muted-foreground bg-secondary hover:bg-accent" onClick={() => setShowJohnNgo(true)}>John</button>.
          </h1>
          <p className="text-l leading-relaxed">
            Designer by practice, engineer by training, researcher at heart. I tackle complex product challenges by combining technical depth with user-centered design, turning ambiguity into actionable insights and shipped solutions.
          </p>
        </WindowContent>
      </Window>
      )}

      {showJohnNgo && (
      <Window id="john_ngo" ref={johnNgoRef} className="w-125 left-1/2 top-1/2 -translate-1/2" onClose={() => closeWindow("john_ngo", setShowJohnNgo)}>
        <WindowTitle>John Ngo</WindowTitle>
        <WindowContent className="p-0">
          <Image src="/john-ngo.jpg" alt="John Ngo" width={1024} height={1024} className="w-full aspect-4/3" />
        </WindowContent>
      </Window>
      )}

      {showContact && (
        <Window id="contact" ref={contactRef} className="w-1/2 left-1/2 top-1/2 -translate-1/2" onClose={() => closeWindow("contact", setShowContact)}>
        <WindowTitle>Reach Out</WindowTitle>
        <WindowContent>
          <p>Send me an <a href="mailto:john@smallepic.com" className="text-muted-foreground font-bold hover:bg-muted" onClick={() => track("link_open", { id: "email", url: "mailto:john@smallepic.com" })}>email</a>, or find me on <a href="https://www.linkedin.com/in/jngo/" className="text-muted-foreground font-bold hover:bg-muted" onClick={() => track("link_open", { id: "linkedin", url: "https://www.linkedin.com/in/jngo/" })}>LinkedIn</a>, <a href="https://github.com/jngo" className="text-muted-foreground font-bold hover:bg-muted" onClick={() => track("link_open", { id: "github", url: "https://github.com/jngo" })}>GitHub</a>, or <a href="https://twitter.com/jngo" className="text-muted-foreground font-bold hover:bg-muted" onClick={() => track("link_open", { id: "twitter", url: "https://twitter.com/jngo" })}>Twitter</a>.</p>
        </WindowContent>
      </Window>
      )}

      {showMcKinseyAndCompany && (
      <Window id="mckinsey_and_company" ref={mckinseyAndCompanyRef} className="w-125 left-1/2 top-1/2 -translate-1/2" onClose={() => closeWindow("mckinsey_and_company", setShowMcKinseyAndCompany)}>
        <WindowTitle>McKinsey & Company</WindowTitle>
        <WindowContent>
          <p className="text-sm text-muted-foreground">2021–Present</p>
          <p className="font-serif text-xl mb-4">I’m currently leading design across digital transformation initiatives at <a href="https://www.mckinsey.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground font-bold bg-secondary hover:bg-accent" onClick={() => track("link_open", { id: "mckinsey_and_company_site", url: "https://www.mckinsey.com/" })}>McKinsey & Company</a>.</p>
          <p className="mb-4">Leading a design team building Visual Graphics & Media services that serve tens of thousands of management consultants worldwide.</p>
          <p className="mb-4">My work focuses on untangling complex, fragmented service experiences and creating systems that help balance limited resources with growing demand. I take projects from user research and opportunity mapping through high-fidelity prototypes to implementation.</p>
          <p>I combine strategic thinking with hands-on execution, mentoring designers while collaborating closely with engineering, product, and operations teams.</p>
        </WindowContent>
      </Window>
      )}

      {showUP42 && (
      <Window id="up42" ref={up42Ref} className="w-125 left-1/2 top-1/2 -translate-1/2" onClose={() => closeWindow("up42", setShowUP42)}>
        <WindowTitle>UP42</WindowTitle>
        <WindowContent>
          <p className="text-sm text-muted-foreground">2019–2021</p>
          <p className="font-serif text-xl mb-4">I established design practice and launched several keystone projects at <a href="https://www.up42.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground font-bold bg-secondary hover:bg-accent" onClick={() => track("link_open", { id: "up42_site", url: "https://www.up42.com/" })}>UP42</a>.</p>
          <p className="mb-4">As the first design hire within the Airbus Defence and Space subsidiary, I established design practice within the organisation.</p>
          <p className="mb-4">I was responsible for establishing a culture of continuous research through a combination of quantitative (SQL, BigQuery, etc.) and qualitative (user interviews, usability testing, etc.) techniques to ensure decisions were made with the best data and insights at hand.</p>
          <p className="mb-4">I also worked closely with the frontend team to establish the foundations of our design system, through the design and implementation of token and component libraries.</p>
          <button onClick={() => showWindow("documentation_hub_presentation", "icon", setShowDocumentationHubPresentation, documentationHubPresentationRef)} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <FileVideo strokeWidth={0.8} className="size-12"/>
            <span>documentation-hub.mp4</span>
          </button>
          <button onClick={() => showWindow("documentation_hub_case_study", "icon", setShowDocumentationHubCaseStudy, documentationHubCaseStudyRef)} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <FileText strokeWidth={0.8} className="size-12"/>
            <span>documentation-hub-case-study.html</span>
          </button>
          <a href="https://up42.com/blog/rethinking-our-documentation-experience" target="_blank" rel="noopener noreferrer" className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center" onClick={() => track("link_open", { id: "documentation_hub_article", url: "https://up42.com/blog/rethinking-our-documentation-experience" })}>
            <FileSymlink strokeWidth={0.8} className="size-12"/>
            <span>documentation-experience.url</span>
          </a>
          <button onClick={() => showWindow("catalog_search_case_study", "icon", setShowCatalogSearchCaseStudy, catalogSearchCaseStudyRef)} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <FileChartPie strokeWidth={0.8} className="size-12"/>
            <span>catalog-search-case-study.figma</span>
          </button>
          <button onClick={() => showWindow("catalog_search_prototype", "icon", setShowCatalogSearchPrototype, catalogSearchPrototypeRef)} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <FileBox strokeWidth={0.8} className="size-12"/>
            <span>catalog-search-prototype.figma</span>
          </button>
          <button onClick={() => showWindow("marketing_website_case_study", "icon", setShowMarketingWebsiteCaseStudy, marketingWebsiteCaseStudyRef)} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <FileChartPie strokeWidth={0.8} className="size-12"/>
            <span>marketing-website-case-study.figma</span>
          </button>
          <button onClick={() => showWindow("gis_os_prototype", "icon", setShowGISOSPrototype, GISOSPrototypeRef)} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <FileBox strokeWidth={0.8} className="size-12"/>
            <span>gis-os-prototype.figma</span>
          </button>
        </WindowContent>
      </Window>
      )}

      {showDocumentationHubPresentation && (
      <Window id="documentation_hub_presentation" ref={documentationHubPresentationRef} className="w-200 aspect-16/9 left-1/2 top-1/2 -translate-1/2" onClose={() => closeWindow("documentation_hub_presentation", setShowDocumentationHubPresentation)}>
        <WindowTitle>Presentation — Documentation Hub</WindowTitle>
        <WindowContent className="p-0">
          <iframe
            src="https://www.youtube.com/embed/XpdvVltqWtc"
            allowFullScreen
            className="w-full h-full">
          </iframe>
        </WindowContent>
      </Window>
      )}

      {showDocumentationHubCaseStudy && (
      <Window id="documentation_hub_case_study" ref={documentationHubCaseStudyRef} className="w-200 left-1/2 top-1/2 -translate-1/2" onClose={() => closeWindow("documentation_hub_case_study", setShowDocumentationHubCaseStudy)}>
        <WindowTitle>Case Study — Documentation Hub</WindowTitle>
        <WindowContent>
          <p className="text-sm text-muted-foreground">Case Study</p>
          <h1 className="font-serif text-xl mb-4">I led a cross-disciplinary team in rethinking the documentation experience, building a foundation that bridged the gap between product and documentation.</h1>
          <p className="mb-4"><em>Led the design thinking approach behind the reimagining of UP42’s documentation experience, enabling a small cross-disciplinary team to understand customer problems, explore solutions, and deliver a foundation for shortening the distance between the user interface and documentation.</em></p>
          <figure className="mb-4">
            <img src="/old-new-documentation-hub.png" alt="The old and new documentation hub." />
            <figcaption className="text-muted-foreground text-center mt-2">The old and new documentation hub.</figcaption>
          </figure>
          <p className="mb-4">For a platform bringing geospatial data and analytics to developers, a great developer experience—and by extension, documentation—was essential to fulfilling that promise.</p>
          <p className="mb-4">Two years after launch, our documentation had grown to over 100 pages spread across multiple sites: the API, SDK, and other technical references all lived separately. Developers were beginning to feel the strain of a fragmented experience that slowed them down and obscured the platform’s broader capabilities.</p>
          <p className="mb-4">While the marketing website had undergone a redesign and the product had evolved significantly, the documentation had stagnated and no longer felt representative of a developer-focused product.</p>
          <h2 className="font-serif text-lg mb-4">Understanding the Problems</h2>
          <h3 className="font-serif text-base mb-4">Design Process</h3>
          <p className="mb-4">Kicking things off, I adopted the <a href="https://designthinking.ideo.com/">design thinking</a> framework, a hands-on, user-centric approach to solving complex problems popularised by David Kelley and Tim Brown of IDEO.</p>
          <figure className="mb-4">
            <img src="/design-thinking-framework.png" alt="Framed our approach around IDEO's design thinking framework, guiding the team from research to implementation." />
            <figcaption className="text-muted-foreground text-center mt-2">Framed our approach around IDEO’s design thinking framework, guiding the team from research to implementation.</figcaption>
          </figure>
          <p className="mb-4">To build a shared understanding of developers and their pain points, I gathered insights through:</p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>Customer Feedback:</strong> I pored though customer feedback collected since launch.</li>
            <li><strong>User Interviews:</strong> I reviewed notes from recent research evaluating our developer experience.</li>
            <li><strong>Workshop:</strong> I ran a cross-functional workshop with engineering, support, marketing, data science, and business development to gather ideas and perspectives.</li>
          </ul>
          <h3 className="font-serif text-base mb-4">Opportunities</h3>
          <p className="mb-4">From this research, I distilled a set of goals, questions, and improvements:</p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <h4 className="font-sans font-bold text-base inline">Goals</h4>
              <ul className="list-disc list-inside ml-4">
                <li>Let developers start interacting with the API immediately.</li>
                <li>Make the documentation hub a core part of the developer journey.</li>
                <li>Create the most engaging developer experience in the geospatial community.</li>
              </ul>
            </li>
            <li>
              <h4 className="font-sans font-bold text-base inline">Questions</h4>
              <ul className="list-disc list-inside ml-4">
                <li>How does the platform fit into my existing workflow or infrastructure?</li>
                <li>Where can I find clear documentation for marketplace blocks?</li>
                <li>How does the documentation adapt to my level of expertise?</li>
              </ul>
            </li>
            <li>
              <h4 className="font-sans font-bold text-base inline">Improvements</h4>
              <ul className="list-disc list-inside ml-4">
                <li>Lack of an interactive playground for immediate experimentation.</li>
                <li>Disorganised information architecture that hindered exploration.</li>
                <li>Messaging and visuals misaligned with a developer-first product.</li>
              </ul>
            </li>
          </ul>
          <h2 className="font-serif text-lg mb-4">Redefining the Experience</h2>
          <h3 className="font-serif text-base mb-4">Information Architecture</h3>
          <p className="mb-4">With a clearer picture of the opportunities, my first step was to redesign the information architecture: how content was organised and discovered.</p>
          <p className="mb-4">I began with a content audit across all touchpoints: the existing documentation, SDK microsite, YouTube tutorials, and marketing pages. This inventory became the backbone of our content strategy.</p>
          <figure className="mb-4">
            <img src="/content-inventory.png" alt="The content inventory that would become the backbone of our content strategy." />
            <figcaption className="text-muted-foreground text-center mt-2">The content inventory that would become the backbone of our content strategy.</figcaption>
          </figure>
          <p className="mb-4">From there, I designed a new sitemap around four pillars:</p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>Getting Started:</strong> Fundamentals of the platform covering the catalog, projects, workflows, and jobs.</li>
            <li><strong>Block Reference:</strong> Specifications for every block’s inputs, outputs, and parameters.</li>
            <li><strong>Developers:</strong> API reference, Python SDK, and integration guides.</li>
            <li><strong>Accounts &amp; Credits:</strong> Administrative content including account management, pricing, and compliance.</li>
          </ul>
          <figure className="mb-4">
            <img src="/new-sitemap.png" alt="The new sitemap clarified purpose and navigation, organising content under four intuitive pillars." />
            <figcaption className="text-muted-foreground text-center mt-2">The new sitemap clarified purpose and navigation, organising content under four intuitive pillars.</figcaption>
          </figure>
          <h3 className="font-serif text-base mb-4">Content Types</h3>
          <p className="mb-4">To better serve developers, I adopted three content types from Daniele Procida’s <a href="https://documentation.divio.com/">Documentation System</a>:</p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>References:</strong> Information-oriented explanations of how features or parts of the platform work, typically mirroring the structure of what they describe.</li>
            <li><strong>Guides:</strong> Goal-oriented walkthroughs for real use cases, assuming some prior knowledge.</li>
            <li><strong>Tutorials:</strong> Learning-oriented, task-specific introductions that build confidence and quick wins.</li>
          </ul>
          <h3 className="font-serif text-base mb-4">Navigation Pages</h3>
          <p className="mb-4">With over 100 pages of content, findability was critical. Drawing on Jared Spool’s concept of _information scent_, I introduced distinct <a href="https://aycl.uie.com/virtual_seminars/the_scent_of_a_web_page_the_five_types_of_navigation_pages">navigation page</a> types:</p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>Galleries:</strong> Lists of related links, the most common failure point on content-rich websites.</li>
            <li><strong>Departments:</strong> Groups of related galleries to help developers narrow their search.</li>
            <li><strong>Home:</strong> The orienting layer that helped developers identify where to start.</li>
          </ul>
          <figure className="mb-4">
            <img src="/sitemap-visualization.png" alt="Visualising the sitemap helped validate navigation flows and ensure findability across user journeys." />
            <figcaption className="text-muted-foreground text-center mt-2">Visualising the sitemap helped validate navigation flows and ensure findability across user journeys.</figcaption>
          </figure>
          <h3 className="font-serif text-base mb-4">Atomic Design</h3>
          <p className="mb-4">With the structure in place, our visual designer, Adam, explored visual directions.</p>
          <p className="mb-4">My focus was on interaction design and translating those directions into a modular component system, rooted in <a href="https://atomicdesign.bradfrost.com/">Atomic Design</a> principles, that we could combine to compose any required layout.</p>
          <h4 className="font-sans font-bold text-base">Atoms</h4>
          <p className="mb-4">I picked out colour, icon, and typography tokens from the design system, that had evolved from our product and marketing website, to form the primitives for building components.</p>
          <p className="mb-4">I selected colour, icon, and typography tokens from the design system, evolved from our product and marketing website, to form the primitives for building components.</p>
          <figure className="mb-4">
            <img src="/product-palette-iconography.png" alt="Reusing our product palette and iconography extended visual continuity across product, marketing, and documentation." />
            <figcaption className="text-muted-foreground text-center mt-2">Reusing our product palette and iconography extended visual continuity across product, marketing, and documentation.</figcaption>
          </figure>
          <figure className="mb-4">
            <img src="/type-styles.png" alt="Selecting a concise set of type styles ensured clarity, hierarchy, and consistency across all documentation layouts." />
            <figcaption className="text-muted-foreground text-center mt-2">Selecting a concise set of type styles ensured clarity, hierarchy, and consistency across all documentation layouts.</figcaption>
          </figure>
          <h4 className="font-sans font-bold text-base">Molecules</h4>
          <p className="mb-4">I combined these atoms into reusable components to define the tone and rhythm of content. Headings, captions, and links combined to form headers and lists. Icons, covers, and images were added to construct cards.</p>
          <figure className="mb-4">
            <img src="/atomic-components.png" alt="Combining atomic elements into reusable components laid the groundwork for scalable, systematic page layouts." />
            <figcaption className="text-muted-foreground text-center mt-2">Combining atomic elements into reusable components laid the groundwork for scalable, systematic page layouts.</figcaption>
          </figure>
          <h4 className="font-sans font-bold text-base">Organisms</h4>
          <p className="mb-4">These molecules then combined into flexible page sections used across galleries, departments, and the homepage.</p>
          <figure className="mb-4">
            <video autoPlay loop muted playsInline>
              <source src="/atomic-design-organisms.mp4" type="video/mp4" />
            </video>
            <figcaption className="text-muted-foreground text-center mt-2">Patterns defined as organisms made it possible to compose diverse page types without bespoke design work.</figcaption>
          </figure>
          <h2 className="font-serif text-lg mb-4">Delivering on the Promise</h2>
          <h3 className="font-serif text-base mb-4">Technology Stack</h3>
          <p className="mb-4">A core objective was minimising friction in the editorial workflow, allowing anyone on the editorial team to contribute easily, while keeping the stack simple, extensible, and maintainable by our frontend team.</p>
          <h4 className="font-sans font-bold text-base">Jamstack &amp; Gatsby</h4>
          <p className="mb-4">With these criteria, <a href="https://github.com/afuh">Axel</a>, our frontend engineer, proposed a <a href="https://jamstack.org/">Jamstack</a> architecture using Gatsby and MDX.</p>
          <p className="mb-4"><a href="https://www.gatsbyjs.com/">Gatsby</a> offered fast performance, modern tooling, and a low-maintenance deployment pipeline. Within a day, Axel had a themed boilerplate running, allowing me to begin structuring and populating the new site.</p>
          <p className="mb-4">Content lived as <a href="https://www.markdownguide.org/">Markdown</a> files, and with <a href="https://mdxjs.com/">MDX</a> React components could be embedded directly within pages, giving editors further fine-grained control over layout.</p>
          <h4 className="font-sans font-bold text-base">DocSearch by Algolia</h4>
          <p className="mb-4">For search, we integrated <a href="https://www.algolia.com/">Algolia’s</a> DocSearch, a solution tailored for documentation websites. It handled crawling, indexing, and ranking, providing a fast, relevant search experience with minimal setup.</p>
          <h3 className="font-serif text-base mb-4">Content Strategy</h3>
          <p className="mb-4">Because we already had 120+ pages of documentation, the strategy focused on migrating and improving existing content rather than creating new material.</p>
          <h4 className="font-sans font-bold text-base">Migration</h4>
          <ul className="list-disc list-inside mb-4">
            <li><strong>Site Map:</strong> All existing content was relocated under the new information architecture.</li>
            <li><strong>Links:</strong> Every URL changed, requiring updates and redirects.</li>
            <li><strong>Formatting:</strong> Content was converted from reStructuredText to Markdown.</li>
          </ul>
          <h4 className="font-sans font-bold text-base">Content Editing</h4>
          <p className="mb-4">Once content was migrated, Teodora and Seulgi, our support engineers, reviewed every page, refining formatting, code samples, and structure.</p>
          <h4 className="font-sans font-bold text-base">Screenshots</h4>
          <p className="mb-4">Adam refreshed over 170 screenshots to match the latest UI. We also established visual guidelines to keep screenshots useful without requiring frequent updates.</p>
          <figure className="mb-4">
            <img src="/updated-screenshots.png" alt="Updated screenshots aligned visual cues with the product." />
            <figcaption className="text-muted-foreground text-center mt-2">Updated screenshots aligned visual cues with the product.</figcaption>
          </figure>
          <h2 className="font-serif text-lg mb-4">The Groundwork for a Better Developer Experience</h2>
          <h3 className="font-serif text-base mb-4">Shortening the distance to documentation</h3>
          <p className="mb-4">One of our product principles was _shortening the distance between intent and insight_. In this context — whether measured in clicks, time, or context switching — it meant reducing friction between the user interface and documentation.</p>
          <p className="mb-4">With the new foundation in place, I explored ways to bring documentation closer to developers.</p>
          <h3 className="font-serif text-base mb-4"><code>Ctrl+P</code> (Quick Open)</h3>
          <p className="mb-4">Inspired by code editors like VS Code and Sublime Text, I introduced a <code>ctrl+p</code> shortcut that surfaced documentation search directly in the product, enabling quick access to any topic.</p>
          <figure className="mb-4">
            <video autoPlay loop muted playsInline>
              <source src="/quick-open.mp4" type="video/mp4" />
            </video>
            <figcaption className="text-muted-foreground text-center mt-2">Embedded search brought documentation closer to the workflow.</figcaption>
          </figure>
          <h3 className="font-serif text-base mb-4">Embedded Documentation</h3>
          <figure className="mb-4">
            <video autoPlay loop muted playsInline>
              <source src="/popovers.mp4" type="video/mp4" />
            </video>
            <figcaption className="text-muted-foreground text-center mt-2">Contextual popovers illustrated how immediate guidance could reduce support dependency and task interruptions.</figcaption>
          </figure>
          <p className="mb-4">A year earlier, I had introduced contextual popovers linking to documentation. While helpful, they still forced you into a new tab.</p>
          <figure className="mb-4">
            <video autoPlay loop muted playsInline>
              <source src="/embedded-documentation.mp4" type="video/mp4" />
            </video>
            <figcaption className="text-muted-foreground text-center mt-2">Embedded documentation showed how side-by-side context eliminated tab switching and reinforced learning in-flow.</figcaption>
          </figure>
          <p className="mb-4">To remove that disruption, I explored embedding documentation directly inside the product, allowing side-by-side reference without breaking flow.</p>
        </WindowContent>
      </Window>
      )}

      {showCatalogSearchCaseStudy && (
        <Window id="catalog_search_case_study" ref={catalogSearchCaseStudyRef} className="w-200 aspect-7/5 left-1/2 top-1/2 -translate-1/2" onClose={() => closeWindow("catalog_search_case_study", setShowCatalogSearchCaseStudy)}>
        <WindowTitle>Case Study — Catalog Search</WindowTitle>
        <WindowContent className="p-0">
          <iframe
            src="https://embed.figma.com/proto/L7o2shGNkBjhNIiuqzKJh3/John-Ngo-%C2%B7-Curriculum-Vitae?page-id=204%3A0&node-id=204-1&p=f&viewport=631%2C234%2C0.33&scaling=contain&content-scaling=fixed&embed-host=smallepic&hide_ui=1&footer=false&theme=system"
            allowFullScreen
            className="w-full h-full"
          />
        </WindowContent>
      </Window>
      )}

      {showCatalogSearchPrototype && (
      <Window id="catalog_search_prototype" ref={catalogSearchPrototypeRef} className="w-200 aspect-7/5 left-1/2 top-1/2 -translate-1/2" onClose={() => closeWindow("catalog_search_prototype", setShowCatalogSearchPrototype)}>
        <WindowTitle>Prototype — Catalog Search</WindowTitle>
        <WindowContent className="p-0">
          <iframe
            src="https://embed.figma.com/proto/DxUQrLPUFJap2u8FoYLxMe/UP%E2%81%B4%C2%B2-%C2%B7-Catalog-Search?node-id=432-1054&viewport=179%2C205%2C0.133953258395195&scaling=contain&content-scaling=fixed&embed-host=smallepic&hide_ui=1&footer=false&theme=system"
            allowFullScreen
            className="w-full h-full"
            />
        </WindowContent>
      </Window>
      )}

      {showMarketingWebsiteCaseStudy && (
      <Window id="marketing_website_case_study" ref={marketingWebsiteCaseStudyRef} className="w-200 aspect-7/5 left-1/2 top-1/2 -translate-1/2" onClose={() => setShowMarketingWebsiteCaseStudy(false)}>
        <WindowTitle>Case Study — Marketing Website</WindowTitle>
        <WindowContent className="p-0">
          <iframe
            src="https://embed.figma.com/proto/xcEAPzkwk5kSrzEJJXSrc8/Case-Study-%C2%B7-Marketing-Website?page-id=&node-id=1-344&viewport=533%2C-1156%2C0.25&scaling=contain&content-scaling=fixed&embed-host=smallepic&hide_ui=1&footer=false&theme=system"
            allowFullScreen
            className="w-full h-full"
            />
        </WindowContent>
      </Window>
      )}

      {showGISOSPrototype && (
      <Window id="gis_os_prototype" ref={GISOSPrototypeRef} className="w-200 aspect-7/5 left-1/2 top-1/2 -translate-1/2" onClose={() => closeWindow("gis_os_prototype", setShowGISOSPrototype)}>
        <WindowTitle>Prototype — GIS OS</WindowTitle>
        <WindowContent className="p-0">
          <iframe
            src="https://embed.figma.com/proto/I4CSylVpVDpCe15J0NYQ74/UP%E2%81%B4%C2%B2-%C2%B7-Product-Vision?node-id=269-290&viewport=77%2C474%2C0.0725146234035492&scaling=contain&content-scaling=fixed&embed-host=smallepic&hide_ui=1&footer=false&theme=system"
            allowFullScreen
            className="w-full h-full"
          />
        </WindowContent>
      </Window>
      )}

      {showCandis && (
      <Window id="candis" ref={candisRef} className="w-125 left-1/2 top-1/2 -translate-1/2" onClose={() => closeWindow("candis", setShowCandis)}>
        <WindowTitle>Candis</WindowTitle>
        <WindowContent>
          <p className="text-sm text-muted-foreground">2017–2019</p>
          <p className="font-serif text-xl mb-2">I was a design team of one, hands-on from research to frontend at <a href="https://www.candis.io/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground font-bold bg-secondary hover:bg-accent" onClick={() => track("link_open", { id: "candis_site", url: "https://www.candis.io/" })}>Candis</a>.</p>
          <p className="mb-2">As a single person design team, I was responsible for user experience across the portfolio of products at Candis. Practically speaking, I conducted user research, produced design concepts and prototypes, documented epics and user stories, and contributed UI enhancements to the React codebase.</p>
          <p>I also led the initiative to scale design to meet the needs of a growing engineering team through the development of a design system that served as the style guide and component library for current and future Candis products.</p>
        </WindowContent>
      </Window>
      )}

      {showUrbanSportsClub && (
      <Window id="urban_sports_club" ref={urbanSportsClubRef} className="w-125 left-1/2 top-1/2 -translate-1/2" onClose={() => closeWindow("urban_sports_club", setShowUrbanSportsClub)}>
        <WindowTitle>Urban Sports Club</WindowTitle>
        <WindowContent>
          <p className="text-sm text-muted-foreground">2015</p>
          <p className="font-serif text-xl mb-2">I helped lay the technical and product foundations for European expansion at <a href="https://urbansportsclub.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground font-bold bg-secondary hover:bg-accent" onClick={() => track("link_open", { id: "urban_sports_club_site", url: "https://urbansportsclub.com/" })}>Urban Sports Club</a>.</p>
          <p className="mb-2">I played a key technical leadership and product design role, responsible for the digital transformation of key technical infrastructure and the venue check-in experience. My achievements were instrumental to the ambitious expansion of the flat-rate sports membership from Berlin into over 88 cities and 8,000 sporting venues.</p>
          <p>My key achievement was leading the delivery team, where I designed the REST API specification and mobile app experiences. Within three months, we replaced the existing manual membership card and log sheet processes with an API and mobile apps enabling members to check-in with their iOS and Android devices.</p>
        </WindowContent>
      </Window>
      )}

      {showSynthesiser && (
      <Window id="synthesiser" ref={synthesiserRef} className="w-96 left-1/2 top-1/2 -translate-1/2" onClose={() => closeWindow("synthesiser", setShowSynthesiser)}>
        <WindowTitle>Synthesiser</WindowTitle>
        <WindowContent>
          <p className="font-serif text-xl mb-2">Generate a Minto Pyramid synthesis of any content.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">v0</Badge>
            <Badge variant="secondary">Cursor</Badge>
            <Badge variant="secondary">Next.js</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">React Flow</Badge>
            <Badge variant="secondary">OpenAI</Badge>
            <Badge variant="secondary">Vercel</Badge>
          </div>
          <Button asChild className="w-full">
            <a href="https://synthesiser.smallepic.com/" target="_blank" rel="noopener" onClick={() => track("link_open", { id: "synthesiser", url: "https://synthesiser.smallepic.com/" })}>
              Check Out Synthesiser
            </a>
          </Button>
        </WindowContent>
      </Window>
      )}

      {showPodscriber && (
      <Window id="podscriber" ref={podscriberRef} className="w-96 left-1/2 top-1/2 -translate-1/2" onClose={() => closeWindow("podscriber", setShowPodscriber)}>
        <WindowTitle>Podscriber</WindowTitle>
        <WindowContent>
          <Image src="/podscriber.gif" alt="Podscriber" width={480} height={1040} className="w-1/2 h-auto mx-auto mb-4" />
          <p className="font-serif text-xl mb-2">Transcribe podcast episodes and send them to your read-it-later queue.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">v0</Badge>
            <Badge variant="secondary">Cursor</Badge>
            <Badge variant="secondary">Next.js</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">Deepgram</Badge>
            <Badge variant="secondary">Reader</Badge>
            <Badge variant="secondary">Vercel</Badge>
          </div>
          <p className="mb-4">As someone who loves listening to podcasts whilst doing other things, capturing notes can be challenging.</p>
          <p className="mb-4">After trying a few different apps, I decided to build a simple podcast transcriber to streamline my workflow from listening to synthesizing notes.</p>
          <p className="mb-4">Instead of pausing and transcribing by hand, I just drop in an Apple Podcasts URL, and it generates a transcript for me. It’s integrated with Readwise Reader, so I can highlight key insights and have everything synced to my Obsidian notes.</p>
          <Button asChild className="w-full">
            <a href="https://podscriber.smallepic.com/" target="_blank" rel="noopener" onClick={() => track("link_open", { id: "podscriber", url: "https://podscriber.smallepic.com/" })}>
              Check Out Podscriber
            </a>
          </Button>
        </WindowContent>
      </Window>
      )}

      {showMermaidViewer && (
      <Window id="mermaid_viewer" ref={mermaidViewerRef} className="w-96 left-1/2 top-1/2 -translate-1/2" onClose={() => closeWindow("mermaid_viewer", setShowMermaidViewer)}>
        <WindowTitle>Mermaid Viewer</WindowTitle>
        <WindowContent>
          <Image src="/mermaid-viewer.png" alt="Mermaid Viewer" width={400} height={300} className="w-full h-auto mb-4" />
          <p className="font-serif text-xl mb-4">A lightweight, mobile-friendly way to view and edit Mermaid diagrams.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">v0</Badge>
            <Badge variant="secondary">Cursor</Badge>
            <Badge variant="secondary">Next.js</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">Mermaid.js</Badge>
            <Badge variant="secondary">Vercel</Badge>
          </div>
          <p className="mb-4"><strong>Mermaid Viewer</strong> was born out of the need for a simple, mobile-friendly viewer for the mountains of Mermaid diagrams coming out of my ChatGPT sessions.</p>
          <p className="mb-4">As a tool for creating diagrams and visualisations using plain text, <a href="https://mermaid.js.org/" className="underline" onClick={() => track("link_open", { id: "mermaidjs", url: "https://mermaid.js.org/" })}>Mermaid</a> is ideally suited for transforming the outputs of large language models (LLMs) into structured formats.</p>
          <Button asChild className="w-full">
            <a href="https://mermaid.smallepic.com/" target="_blank" rel="noopener" onClick={() => track("link_open", { id: "mermaid_viewer", url: "https://mermaid.smallepic.com/" })}>
              Check Out Mermaid Viewer
            </a>
          </Button>
        </WindowContent>
      </Window>
      )}

      {showFilmsAndConversations && (
      <Window id="films_and_conversations" ref={filmsAndConversationsRef} className="w-96 left-1/2 top-1/2 -translate-1/2" onClose={() => closeWindow("films_and_conversations", setShowFilmsAndConversations)}>
        <WindowTitle>Films & Conversations</WindowTitle>
        <WindowContent>
          <p className="font-serif text-xl mb-2">A monthly film club bringing together people, documentaries, and discussions.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">Jekyll</Badge>
            <Badge variant="secondary">Github Pages</Badge>
          </div>
          <Button asChild className="w-full">
            <a href="http://filmsandconversations.com/" target="_blank" rel="noopener" onClick={() => track("link_open", { id: "films_and_conversations", url: "http://filmsandconversations.com/" })}>
              Check Out Films & Conversations
            </a>
          </Button>
        </WindowContent>
      </Window>
      )}

      {showBooksAndConversations && (
      <Window id="books_and_conversations" ref={booksAndConversationsRef} className="w-96 left-1/2 top-1/2 -translate-1/2" onClose={() => closeWindow("books_and_conversations", setShowBooksAndConversations)}>
        <WindowTitle>Books & Conversations</WindowTitle>
        <WindowContent>
          <p className="font-serif text-lg mb-2">Roundtable discussions with good friends and great books.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">Jekyll</Badge>
            <Badge variant="secondary">Github Pages</Badge>
          </div>
          <Button asChild className="w-full">
            <a href="http://booksandconversations.com/" target="_blank" rel="noopener" onClick={() => track("link_open", { id: "books_and_conversations", url: "http://booksandconversations.com/" })}>
              Check Out Books & Conversations
            </a>
          </Button>
        </WindowContent>
      </Window>
      )}
    </div>
  );
}
