"use client"

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Window, WindowRef } from "@/components/ui/window";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { BriefcaseBusiness, Clapperboard, LibraryBig, Mail, Network, Podcast, ScanText, Grid3X3, List } from "lucide-react";
import Clock from "@/components/ui/clock";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showExperience, setShowExperience] = useState(true);
  const [showRandom, setShowRandom] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showMermaidViewer, setShowMermaidViewer] = useState(false);
  const [showPodscriber, setShowPodscriber] = useState(false);
  const [showSynthesiser, setShowSynthesiser] = useState(false);
  const [showFilmsAndConversations, setShowFilmsAndConversations] = useState(false);
  const [showBooksAndConversations, setShowBooksAndConversations] = useState(false);
  const [showMcKinseyAndCompany, setShowMcKinseyAndCompany] = useState(false);
  const [showUP42, setShowUP42] = useState(false);
  const [showCandis, setShowCandis] = useState(false);
  const [showUrbanSportsClub, setShowUrbanSportsClub] = useState(false);

  // View mode states for toggleable windows
  const [experienceViewMode, setExperienceViewMode] = useState<'icon' | 'list'>('icon');
  const [randomViewMode, setRandomViewMode] = useState<'icon' | 'list'>('icon');

  // Refs for each window
  const welcomeRef = useRef<WindowRef>(null);
  const experienceRef = useRef<WindowRef>(null);
  const randomRef = useRef<WindowRef>(null);
  const contactRef = useRef<WindowRef>(null);
  const mermaidViewerRef = useRef<WindowRef>(null);
  const podscriberRef = useRef<WindowRef>(null);
  const synthesiserRef = useRef<WindowRef>(null);
  const filmsAndConversationsRef = useRef<WindowRef>(null);
  const booksAndConversationsRef = useRef<WindowRef>(null);
  const mckinseyAndCompanyRef = useRef<WindowRef>(null);
  const up42Ref = useRef<WindowRef>(null);
  const candisRef = useRef<WindowRef>(null);
  const urbanSportsClubRef = useRef<WindowRef>(null);

  // Helper function to show window and bring to front
  const showWindow = (setShow: (show: boolean) => void, ref: React.RefObject<WindowRef | null>) => {
    setShow(true);
    // Use setTimeout to ensure the window is rendered before bringing to front
    setTimeout(() => {
      ref.current?.bringToFront();
    }, 0);
  };

  return (
    <div className="w-svw h-svh relative overflow-clip">
      <Menubar className="fixed top-0 left-0 right-0 z-50 rounded-none border-x-0 border-t-0 border-b flex items-center">
        <MenubarMenu>
          <MenubarTrigger className="font-bold">John Ngo</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => showWindow(setShowWelcome, welcomeRef)}>About this Site</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Experience</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => showWindow(setShowExperience, experienceRef)}>View All</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => showWindow(setShowMcKinseyAndCompany, mckinseyAndCompanyRef)}>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>McKinsey & Company</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow(setShowUP42, up42Ref)}>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>UP42</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow(setShowCandis, candisRef)}>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>Candis</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow(setShowUrbanSportsClub, urbanSportsClubRef)}>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>Urban Sports Club</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Random</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => showWindow(setShowRandom, randomRef)}>View All</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => showWindow(setShowSynthesiser, synthesiserRef)}>
              <Network className="mr-2 h-4 w-4" />
              <span>Synthesiser</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow(setShowPodscriber, podscriberRef)}>
              <Podcast className="mr-2 h-4 w-4" />
              <span>Podscriber</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow(setShowMermaidViewer, mermaidViewerRef)}>
              <ScanText className="mr-2 h-4 w-4" />
              <span>Mermaid Viewer</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow(setShowFilmsAndConversations, filmsAndConversationsRef)}>
              <Clapperboard className="mr-2 h-4 w-4" />
              <span>Films & Conversations</span>
            </MenubarItem>
            <MenubarItem onClick={() => showWindow(setShowBooksAndConversations, booksAndConversationsRef)}>
              <LibraryBig className="mr-2 h-4 w-4" />
              <span>Books & Conversations</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Contact</MenubarTrigger>
          <MenubarContent>
            <MenubarItem asChild>
              <a href="mailto:john@smallepic.com">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </a>
            </MenubarItem>
            <MenubarItem asChild>
              <a href="https://www.linkedin.com/in/jngo/">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide mr-2 h-4 w-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
            </MenubarItem>
            <MenubarItem asChild>
              <a href="https://github.com/jngo">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide mr-2 h-4 w-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                GitHub
              </a>
            </MenubarItem>
            <MenubarItem asChild>
              <a href="https://twitter.com/jngo">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide mr-2 h-4 w-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                Twitter
              </a>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <Clock className="ml-auto pr-2" />
      </Menubar>


      {showWelcome && (
      <Window ref={welcomeRef} title="Welcome" className="w-125" onClose={() => setShowWelcome(false)}>
        <h1 className="text-4xl font-bold mb-6">
          Hi, I’m John.
        </h1>
        <p className="text-xl leading-relaxed">
          Designer by practice, engineer by training, researcher at heart. I tackle complex product challenges by combining technical depth with user-centered design, turning ambiguity into actionable insights and shipped solutions.
        </p>
      </Window>
      )}

      {showExperience && (
      <Window ref={experienceRef} title="Experience" className={experienceViewMode === 'icon' ? 'w-101' : 'w-208'} onClose={() => setShowExperience(false)}>
        <div className="flex justify-end mb-2 gap-1">
          <Button 
            variant={experienceViewMode === 'icon' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setExperienceViewMode('icon')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button 
            variant={experienceViewMode === 'list' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setExperienceViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        
        {experienceViewMode === 'icon' ? (
          <div>
            <button onClick={() => showWindow(setShowMcKinseyAndCompany, mckinseyAndCompanyRef)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
              <BriefcaseBusiness strokeWidth={0.8} className="size-12"/>
              <span>McKinsey & Company</span>
            </button>
            <button onClick={() => showWindow(setShowUP42, up42Ref)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
              <BriefcaseBusiness strokeWidth={0.8} className="size-12"/>
              <span>UP42</span>
            </button>
            <button onClick={() => showWindow(setShowCandis, candisRef)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
              <BriefcaseBusiness strokeWidth={0.8} className="size-12"/>
              <span>Candis</span>
            </button>
            <button onClick={() => showWindow(setShowUrbanSportsClub, urbanSportsClubRef)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
              <BriefcaseBusiness strokeWidth={0.8} className="size-12"/>
              <span>Urban Sports Club</span>
            </button>
          </div>
        ) : (
          <ul>
            <li className="flex items-center gap-4 py-1">
              <span><button onClick={() => showWindow(setShowMcKinseyAndCompany, mckinseyAndCompanyRef)} className="text-muted-foreground font-bold hover:bg-muted">McKinsey & Company</button></span>
              <span className="grow">Leading design across digital transformation initiatives.</span>
              <span className="w-1/8 text-right text-muted-foreground">2021–Present</span>
            </li>
            <li className="flex items-center gap-4 border-t py-1">
              <span><button onClick={() => showWindow(setShowUP42, up42Ref)} className="text-muted-foreground font-bold hover:bg-muted">UP42</button></span>
              <span className="grow">Established design practice and launched several keystone projects.</span>
              <span className="w-1/8 text-right text-muted-foreground">2019–2021</span>
            </li>
            <li className="flex items-center gap-4 border-t py-1">
              <span><button onClick={() => showWindow(setShowCandis, candisRef)} className="text-muted-foreground font-bold hover:bg-muted">Candis</button></span>
              <span className="grow">Design team of one, hands-on end-to-end from research to frontend.</span>
              <span className="w-1/8 text-right text-muted-foreground">2017–2019</span>
            </li>
            <li className="flex items-center gap-4 border-t py-1">
              <span><button onClick={() => showWindow(setShowUrbanSportsClub, urbanSportsClubRef)} className="text-muted-foreground font-bold hover:bg-muted">Urban Sports Club</button></span>
              <span className="grow">Laid the technical and product foundations for European expansion.</span>
              <span className="w-1/8 text-right text-muted-foreground">2015</span>
            </li>
          </ul>
        )}
      </Window>
      )}

      {showRandom && (
      <Window ref={randomRef} title="Random" className={randomViewMode === 'icon' ? 'w-125' : 'w-208'} onClose={() => setShowRandom(false)}>
        <div className="flex justify-end mb-2 gap-1">
          <Button 
            variant={randomViewMode === 'icon' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setRandomViewMode('icon')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button 
            variant={randomViewMode === 'list' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setRandomViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        
        {randomViewMode === 'icon' ? (
          <div>
            <button onClick={() => showWindow(setShowSynthesiser, synthesiserRef)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
              <Network strokeWidth={0.8} className="size-12"/>
              <span>Synthesiser</span>
            </button>
            <button onClick={() => showWindow(setShowPodscriber, podscriberRef)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
              <Podcast strokeWidth={0.8} className="size-12"/>
              <span>Podscriber</span>
            </button>
            <button onClick={() => showWindow(setShowMermaidViewer, mermaidViewerRef)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
              <ScanText strokeWidth={0.8} className="size-12"/>
              <span>Mermaid Viewer</span>
            </button>
            <button onClick={() => showWindow(setShowFilmsAndConversations, filmsAndConversationsRef)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
              <Clapperboard strokeWidth={0.8} className="size-12"/>
              <span>Films & Conversations</span>
            </button>
            <button onClick={() => showWindow(setShowBooksAndConversations, booksAndConversationsRef)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
              <LibraryBig strokeWidth={0.8} className="size-12"/>
              <span>Books & Conversations</span>
            </button>
          </div>
        ) : (
          <ul>
            <li className="flex items-center gap-4 py-1">
              <span><button onClick={() => showWindow(setShowSynthesiser, synthesiserRef)} className="text-muted-foreground font-bold hover:bg-muted">Synthesiser</button></span>
              <span className="grow">Generate a Minto Pyramid synthesis of any content.</span>
            </li>
            <li className="flex items-center gap-4 border-t py-1">
              <span><button onClick={() => showWindow(setShowPodscriber, podscriberRef)} className="text-muted-foreground font-bold hover:bg-muted">Podscriber</button></span>
              <span className="grow">Transcribe podcast episodes and send them to your read-it-later queue.</span>
            </li>
            <li className="flex items-center gap-4 border-t py-1">
              <span><button onClick={() => showWindow(setShowMermaidViewer, mermaidViewerRef)} className="text-muted-foreground font-bold hover:bg-muted">Mermaid Viewer</button></span>
              <span className="grow">A lightweight, mobile-friendly Mermaid diagram viewer.</span>
            </li>
            <li className="flex items-center gap-4 border-t py-1">
              <span><button onClick={() => showWindow(setShowFilmsAndConversations, filmsAndConversationsRef)} className="text-muted-foreground font-bold hover:bg-muted">Films & Conversations</button></span>
              <span className="grow">A monthly film club bringing together people, documentaries, and discussions.</span>
            </li>
            <li className="flex items-center gap-4 border-t py-1">
              <span><button onClick={() => showWindow(setShowBooksAndConversations, booksAndConversationsRef)} className="text-muted-foreground font-bold hover:bg-muted">Books & Conversations</button></span>
              <span className="grow">Roundtable discussions with good friends and great books.</span>
            </li>
          </ul>
        )}
      </Window>
      )}

      {showContact && (
      <Window ref={contactRef} title="Reach Out" className="w-1/2" onClose={() => setShowContact(false)}>
        <p>Send me an <a href="mailto:john@smallepic.com" className="text-muted-foreground font-bold hover:bg-muted">email</a>, or find me on <a href="https://www.linkedin.com/in/jngo/" className="text-muted-foreground font-bold hover:bg-muted">LinkedIn</a>, <a href="https://github.com/jngo" className="text-muted-foreground font-bold hover:bg-muted">GitHub</a>, or <a href="https://twitter.com/jngo" className="text-muted-foreground font-bold hover:bg-muted  ">Twitter</a>.</p>
      </Window>
      )}

      {showMcKinseyAndCompany && (
        <Window ref={mckinseyAndCompanyRef} title="McKinsey & Company" onClose={() => setShowMcKinseyAndCompany(false)}>
          <p className="font-serif text-lg mb-2">Leading design across digital transformation initiatives.</p>
          <p className="mb-2">Working within a Service Design & Innovation team with a portfolio of transformation initiatives, my role involves: evangelizing the work of the design team with stakeholders, collaborating cross-functionally on complex projects to ensure the voice of design is heard, and coaching team members through guidance and a vision for success.</p>
        </Window>
      )}

      {showUP42 && (
        <Window ref={up42Ref} title="UP42" className="w-3/4" onClose={() => setShowUP42(false)}>
          <p className="font-serif text-lg mb-2">Established design practice and launched several keystone projects.</p>
          <p className="mb-2">As the first design hire within the Airbus Defence and Space subsidiary, I established design practice within the organisation.</p>
          <p className="mb-2">I was responsible for establishing a culture of continuous research through a combination of quantitative (SQL, BigQuery, etc.) and qualitative (user interviews, usability testing, etc.) techniques—to ensure decisions were made with the best data and insights at hand.</p>
          <p className="mb-2">I also worked closely with the frontend team to establish the foundations of our design system, through the design and implementation of token and component libraries.</p>
          <h2 className="mb-2">Highlights</h2>
          <ul className="space-y-2">
            <li><strong>Product Vision</strong><br />Collaborating with leaders and colleagues to create a narrative and concrete vision as an inspirational ‘north star’ for teams to rally behind.</li>
            <li><strong>Documentation Hub</strong><br />A rethinking of our documentation as the foundation for delivering a great developer experience.</li>
            <li><strong>Catalog Search</strong><br />A technically ambitious project to provide real-time visibility into available satellite imagery from multiple providers.</li>
            <li><strong>Geospatial Solutions Marketplace</strong><br />Facilitation of a design sprint exploring the opportunities for a lucrative, yet potentially high risk venture into a new market.</li>
            <li><strong>Marketing Website</strong><br />A holistic redesign of the marketing website driven by a research led understanding of customers.</li>
            <li><strong>Research Operations</strong><br />Working closely with sales, marketing, and business intelligence to implement a research stack for gathering, aggregating, and disseminating customer research and insights.</li>
          </ul>
        </Window>
      )}

      {showCandis && (
        <Window ref={candisRef} title="Candis" onClose={() => setShowCandis(false)}>
          <p className="font-serif text-lg mb-2">Design team of one, hands-on end-to-end from research to frontend.</p>
          <p className="mb-2">As a single person design team, I was responsible for user experience across the portfolio of products at Candis. Practically speaking, I conducted user research, produced design concepts and prototypes, documented epics and user stories, and contributed UI enhancements to the React codebase.</p>
          <p className="mb-2">I also led the initiative to scale design to meet the needs of a growing engineering team through the development of a design system that served as the style guide and component library for current and future Candis products.</p>
        </Window>
      )}

      {showUrbanSportsClub && (
        <Window ref={urbanSportsClubRef} title="Urban Sports Club" onClose={() => setShowUrbanSportsClub(false)}>
          <p className="font-serif text-lg mb-2">I helped lay the technical and product foundations for European expansion at <a href="https://urbansportsclub.com/" className="text-muted-foreground font-bold hover:bg-muted">Urban Sports Club</a>.</p>
          <p className="mb-2">I played a key technical leadership and product design role, responsible for the digital transformation of key technical infrastructure and the venue check-in experience. My achievements were instrumental to the ambitious expansion of the flat-rate sports membership from Berlin into over 88 cities and 8,000 sporting venues.</p>
          <p className="mb-2">My key achievement was leading the delivery team, where I designed the REST API specification and mobile app experiences. Within three months, we replaced the existing manual membership card and log sheet processes with an API and mobile apps enabling members to check-in with their iOS and Android devices.</p>
        </Window>
      )}

      {showSynthesiser && (
        <Window ref={synthesiserRef} title="Synthesiser" onClose={() => setShowSynthesiser(false)}>
          <p className="font-serif text-lg mb-2">Generate a Minto Pyramid synthesis of any content.</p>
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
            <a href="https://synthesiser.smallepic.com/">
              Try Synthesiser
            </a>
          </Button>
        </Window>
      )}

      {showPodscriber && (
        <Window ref={podscriberRef} title="Podscriber" onClose={() => setShowPodscriber(false)}>
          <p className="font-serif text-lg mb-2">Transcribe podcast episodes and send them to your read-it-later queue.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">v0</Badge>
            <Badge variant="secondary">Cursor</Badge>
            <Badge variant="secondary">Next.js</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">Deepgram</Badge>
            <Badge variant="secondary">Reader</Badge>
            <Badge variant="secondary">Vercel</Badge>
          </div>
          <Button asChild className="w-full">
            <a href="https://podscriber.smallepic.com/">
              Try Podscriber
            </a>
          </Button>
        </Window>
      )}

      {showMermaidViewer && (
        <Window ref={mermaidViewerRef} title="Mermaid Viewer" onClose={() => setShowMermaidViewer(false)}>
          <p className="font-serif text-lg mb-2">A lightweight, mobile-friendly Mermaid diagram viewer for viewing and editing Mermaid diagrams.</p>
          <p><strong>Mermaid Viewer</strong> was born out of the need for a simple, mobile-friendly viewer for the mountains of Mermaid diagrams coming out of my ChatGPT sessions.</p>
          <p>As a tool for creating diagrams and visualisations using plain text, <a href="https://mermaid.js.org/" className="underline">Mermaid</a> is ideally suited for transforming the outputs of large language models (LLMs) into structured formats.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">v0</Badge>
            <Badge variant="secondary">Cursor</Badge>
            <Badge variant="secondary">Next.js</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">Mermaid.js</Badge>
            <Badge variant="secondary">Vercel</Badge>
          </div>
          <Button asChild className="w-full">
            <a href="https://mermaid.smallepic.com/">
              Try Mermaid Viewer
            </a>
          </Button>
        </Window>
      )}

      {showFilmsAndConversations && (
        <Window ref={filmsAndConversationsRef} title="Films & Conversations" onClose={() => setShowFilmsAndConversations(false)}>
          <p className="font-serif text-lg mb-2">A monthly film club bringing together people, documentaries, and discussions.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">Jekyll</Badge>
            <Badge variant="secondary">Github Pages</Badge>
          </div>
          <Button asChild className="w-full">
            <a href="http://filmsandconversations.com/">
              Check Out Films & Conversations
            </a>
          </Button>
        </Window>
      )}

      {showBooksAndConversations && (
        <Window ref={booksAndConversationsRef} title="Books & Conversations" onClose={() => setShowBooksAndConversations(false)}>
          <p className="font-serif text-lg mb-2">Roundtable discussions with good friends and great books.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">Jekyll</Badge>
            <Badge variant="secondary">Github Pages</Badge>
          </div>
          <Button asChild className="w-full">
            <a href="http://booksandconversations.com/">
              Check Out Books & Conversations
            </a>
          </Button>
        </Window>
      )}
    </div>
  );
}
