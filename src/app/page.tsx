import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Hero Section */}
      <header className="mb-16">
        <h1 className="text-4xl font-bold mb-6">
          Hi, I’m John.
        </h1>
        <p className="text-xl mb-8 leading-relaxed">
          Designer by practice, engineer by training, researcher at heart. I tackle complex product challenges by combining technical depth with user-centered design, turning ambiguity into actionable insights and shipped solutions.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="font-bold mb-2">Experience</h2>
        <ul>
          <li className="flex items-center gap-4 border-t py-1">
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
      </section>

      <section className="mb-16">
        <h2 className="font-bold mb-2">Random</h2>
        <ul>
          <li className="flex items-center gap-4 border-t py-1">
            <span><a href="https://synthesiser.smallepic.com" className="text-muted-foreground font-bold hover:bg-muted">Synthesiser</a></span>
            <span className="grow">Generate a Minto Pyramid synthesis of any content.</span>
          </li>
          <li className="flex items-center gap-4 border-t py-1">
            <span><a href="https://podscriber.smallepic.com/" className="text-muted-foreground font-bold hover:bg-muted">Podscriber</a></span>
            <span className="grow">Instant transcribe podcast episodes and send them to your read-it-later queue.</span>
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
      </section>

      <footer className="mt-16">
        <h2 className="font-bold mb-2">Reach Out</h2>
        <p>Send me an <a href="mailto:john@smallepic.com" className="text-muted-foreground font-bold hover:bg-muted">email</a>, or find me on <a href="https://www.linkedin.com/in/jngo/" className="text-muted-foreground font-bold hover:bg-muted">LinkedIn</a>, <a href="https://github.com/jngo" className="text-muted-foreground font-bold hover:bg-muted">GitHub</a>, or <a href="https://twitter.com/jngo" className="text-muted-foreground font-bold hover:bg-muted  ">Twitter</a>.</p>
      </footer>
    </div>
  );
}
