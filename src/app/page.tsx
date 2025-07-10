import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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

      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Synthesiser</CardTitle>
            <CardDescription>Generate a Minto Pyramid synthesis of any content.</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Podscriber</CardTitle>
            <CardDescription>Transcribe and send podcasts to your read-it-later queue.</CardDescription>
          </CardHeader>
        </Card>
        <Dialog modal={false}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Mermaid Viewer</CardTitle>
                <CardDescription>A lightweight, mobile-friendly Mermaid diagram viewer.</CardDescription>
              </CardHeader>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Mermaid Viewer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
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
            </div>
          </DialogContent>
        </Dialog>
      </section>

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
      </section>

      <footer className="mt-16">
        <h2 className="font-bold mb-2">Reach Out</h2>
        <p>Send me an <a href="mailto:john@smallepic.com" className="text-muted-foreground font-bold hover:bg-muted">email</a>, or find me on <a href="https://www.linkedin.com/in/jngo/" className="text-muted-foreground font-bold hover:bg-muted">LinkedIn</a>, <a href="https://github.com/jngo" className="text-muted-foreground font-bold hover:bg-muted">GitHub</a>, or <a href="https://twitter.com/jngo" className="text-muted-foreground font-bold hover:bg-muted  ">Twitter</a>.</p>
      </footer>
    </div>
  );
}
