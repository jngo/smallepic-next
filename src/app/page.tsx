"use client"

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Window, WindowRef } from "@/components/ui/window";
import { BriefcaseBusiness, Clapperboard, FolderOpen, Heart, LibraryBig, Mail, Network, Podcast, ScanText} from "lucide-react";

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
    <div className="container relative mx-auto px-4 py-16 max-w-4xl">
      {showWelcome && (
      <Window ref={welcomeRef} title="Welcome" className="w-1/2" onClose={() => setShowWelcome(false)}>
        <h1 className="text-4xl font-bold mb-6">
          Hi, I’m John.
        </h1>
        <p className="text-xl leading-relaxed">
          Designer by practice, engineer by training, researcher at heart. I tackle complex product challenges by combining technical depth with user-centered design, turning ambiguity into actionable insights and shipped solutions.
        </p>
      </Window>
      )}

      <Window title="Menu" className="w-53">
        <button onClick={() => showWindow(setShowWelcome, welcomeRef)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
          <Heart strokeWidth={0.8} className="size-12"/>
          <span>Welcome</span>
        </button>
        <button onClick={() => showWindow(setShowExperience, experienceRef)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
          <BriefcaseBusiness strokeWidth={0.8} className="size-12"/>
          <span>Experience</span>
        </button>
        <button onClick={() => showWindow(setShowRandom, randomRef)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
          <FolderOpen strokeWidth={0.8} className="size-12"/>
          <span>Random</span>
        </button>
        <button onClick={() => showWindow(setShowContact, contactRef)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
          <Mail strokeWidth={0.8} className="size-12"/>
          <span>Contact</span>
        </button>
      </Window>

      <Window title="Experience" className="w-101">
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
      </Window>

      {showExperience && (
      <Window ref={experienceRef} title="Experience" className="w-full" onClose={() => setShowExperience(false)}>
        <ul>
          <li className="flex items-center gap-4 py-1">
            <span><a href="https://www.mckinsey.com/" className="text-muted-foreground font-bold hover:bg-muted">McKinsey & Company</a></span>
            <span className="grow">Leading design across digital transformation initiatives.</span>
            <span className="w-1/8 text-right text-muted-foreground">2021–Present</span>
          </li>
          <li className="flex items-center gap-4 border-t py-1">
            <span><a href="https://up42.com/" className="text-muted-foreground font-bold hover:bg-muted">UP42</a></span>
            <span className="grow">Established design practice and launched several keystone projects.</span>
            <span className="w-1/8 text-right text-muted-foreground">2019–2021</span>
          </li>
          <li className="flex items-center gap-4 border-t py-1">
            <span><a href="https://www.candis.io/" className="text-muted-foreground font-bold hover:bg-muted">Candis</a></span>
            <span className="grow">Design team of one, hands-on end-to-end from research to frontend.</span>
            <span className="w-1/8 text-right text-muted-foreground">2017–2019</span>
          </li>
          <li className="flex items-center gap-4 border-t py-1">
            <span><a href="https://urbansportsclub.com/" className="text-muted-foreground font-bold hover:bg-muted">Urban Sports Club</a></span>
            <span className="grow">Laid the technical and product foundations for European expansion.</span>
            <span className="w-1/8 text-right text-muted-foreground">2015</span>
          </li>
        </ul>
      </Window>
      )}

      <Window title="Random" className="w-125" onClose={() => setShowRandom(false)}>
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
      </Window>

      {showRandom && (
      <Window ref={randomRef} title="Random" className="w-full" onClose={() => setShowRandom(false)}>
        <ul>
          <li className="flex items-center gap-4 py-1">
            <span><a href="https://synthesiser.smallepic.com" className="text-muted-foreground font-bold hover:bg-muted">Synthesiser</a></span>
            <span className="grow">Generate a Minto Pyramid synthesis of any content.</span>
          </li>
          <li className="flex items-center gap-4 border-t py-1">
            <span><a href="https://podscriber.smallepic.com/" className="text-muted-foreground font-bold hover:bg-muted">Podscriber</a></span>
            <span className="grow">Transcribe podcast episodes and send them to your read-it-later queue.</span>
          </li>
          <li className="flex items-center gap-4 border-t py-1">
            <span><a href="https://mermaid.smallepic.com/" className="text-muted-foreground font-bold hover:bg-muted">Mermaid Viewer</a></span>
            <span className="grow">A lightweight, mobile-friendly Mermaid diagram viewer.</span>
          </li>
          <li className="flex items-center gap-4 border-t py-1">
            <span><a href="http://filmsandconversations.com/" className="text-muted-foreground font-bold hover:bg-muted">Films & Conversations</a></span>
            <span className="grow">A monthly film club bringing together people, documentaries, and discussions.</span>
          </li>
          <li className="flex items-center gap-4 border-t py-1">
            <span><a href="http://booksandconversations.com/" className="text-muted-foreground font-bold hover:bg-muted">Books & Conversations</a></span>
            <span className="grow">Roundtable discussions with good friends and great books.</span>
          </li>
        </ul>
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
            <li><strong>Product Vision</strong><br />Collaborating with leaders and colleagues to create a narrative and concrete vision as an inspirational "north star" for teams to rally behind.</li>
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
