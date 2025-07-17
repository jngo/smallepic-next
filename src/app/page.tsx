"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Window } from "@/components/ui/window";
import { BriefcaseBusiness, Clapperboard, FolderOpen, Heart, LibraryBig, Mail, Network, Podcast, ScanText} from "lucide-react";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showExperience, setShowExperience] = useState(false);
  const [showRandom, setShowRandom] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showMermaidViewer, setShowMermaidViewer] = useState(false);
  const [showPodscriber, setShowPodscriber] = useState(false);
  const [showSynthesiser, setShowSynthesiser] = useState(false);
  const [showFilmsAndConversations, setShowFilmsAndConversations] = useState(false);
  const [showBooksAndConversations, setShowBooksAndConversations] = useState(false);

  return (
    <div className="container relative mx-auto px-4 py-16 max-w-4xl">
      {showWelcome && (
      <Window title="Welcome" className="w-1/2" onClose={() => setShowWelcome(false)}>
        <h1 className="text-4xl font-bold mb-6">
          Hi, I'm John.
        </h1>
        <p className="text-xl leading-relaxed">
          Designer by practice, engineer by training, researcher at heart. I tackle complex product challenges by combining technical depth with user-centered design, turning ambiguity into actionable insights and shipped solutions.
        </p>
      </Window>
      )}

      <Window title="Menu" className="w-1/4">
        <button onClick={() => setShowWelcome(true)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
          <Heart strokeWidth={0.8} className="size-12"/>
          <span>Welcome</span>
        </button>
        <button onClick={() => setShowExperience(true)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
          <BriefcaseBusiness strokeWidth={0.8} className="size-12"/>
          <span>Experience</span>
        </button>
        <button onClick={() => setShowRandom(true)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
          <FolderOpen strokeWidth={0.8} className="size-12"/>
          <span>Random</span>
        </button>
        <button onClick={() => setShowContact(true)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
          <Mail strokeWidth={0.8} className="size-12"/>
          <span>Contact</span>
        </button>
      </Window>

      {showExperience && (
      <Window title="Experience" className="w-full" onClose={() => setShowExperience(false)}>
        <ul>
          <li className="flex items-center gap-4 py-1">
            <span><a href="https://www.mckinsey.com/" className="text-muted-foreground font-bold hover:bg-muted">McKinsey & Company</a></span>
            <span className="grow">Leading design across digital transformation initiatives.</span>
            <span className="w-1/8 text-right text-muted-foreground">2021–Present</span>
          </li>
          <li className="flex items-center gap-4 border-t py-1">
            <span><a href="https://up42.com/" className="text-muted-foreground font-bold hover:bg-muted">UP42</a></span>
            <span className="grow">Established two-person design practice and launched several keystone projects.</span>
            <span className="w-1/8 text-right text-muted-foreground">2019–2021</span>
          </li>
          <li className="flex items-center gap-4 border-t py-1">
            <span><a href="https://www.candis.io/" className="text-muted-foreground font-bold hover:bg-muted">Candis</a></span>
            <span className="grow">Design team of one, hands-on across end-to-end from research to React.js.</span>
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

      <Window title="Random" className="w-5/8" onClose={() => setShowRandom(false)}>
        <button onClick={() => setShowSynthesiser(true)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
          <Network strokeWidth={0.8} className="size-12"/>
          <span>Synthesiser</span>
        </button>
        <button onClick={() => setShowPodscriber(true)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
          <Podcast strokeWidth={0.8} className="size-12"/>
          <span>Podscriber</span>
        </button>
        <button onClick={() => setShowMermaidViewer(true)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
          <ScanText strokeWidth={0.8} className="size-12"/>
          <span>Mermaid Viewer</span>
        </button>
        <button onClick={() => setShowFilmsAndConversations(true)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
          <Clapperboard strokeWidth={0.8} className="size-12"/>
          <span>Films & Conversations</span>
        </button>
        <button onClick={() => setShowBooksAndConversations(true)} className="text-sm/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
          <LibraryBig strokeWidth={0.8} className="size-12"/>
          <span>Books & Conversations</span>
        </button>
      </Window>

      {showRandom && (
      <Window title="Random" className="w-full" onClose={() => setShowRandom(false)}>
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
      <Window title="Reach Out" className="w-1/2" onClose={() => setShowContact(false)}>
        <p>Send me an <a href="mailto:john@smallepic.com" className="text-muted-foreground font-bold hover:bg-muted">email</a>, or find me on <a href="https://www.linkedin.com/in/jngo/" className="text-muted-foreground font-bold hover:bg-muted">LinkedIn</a>, <a href="https://github.com/jngo" className="text-muted-foreground font-bold hover:bg-muted">GitHub</a>, or <a href="https://twitter.com/jngo" className="text-muted-foreground font-bold hover:bg-muted  ">Twitter</a>.</p>
      </Window>
      )}

      {showSynthesiser && (
        <Window title="Synthesiser" onClose={() => setShowSynthesiser(false)}>
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
        <Window title="Podscriber" onClose={() => setShowPodscriber(false)}>
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
        <Window title="Mermaid Viewer" onClose={() => setShowMermaidViewer(false)}>
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
        <Window title="Films & Conversations" onClose={() => setShowFilmsAndConversations(false)}>
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
        <Window title="Books & Conversations" onClose={() => setShowBooksAndConversations(false)}>
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
