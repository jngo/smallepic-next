"use client"

import Image from "next/image";
import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface DocumentationHubCaseStudyWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

export default function DocumentationHubCaseStudyWindow({ onClose, windowRef }: DocumentationHubCaseStudyWindowProps) {
  return (
    <Window id="documentation_hub_case_study" ref={windowRef} className="w-200 left-1/2 top-1/2 -translate-1/2 @container" onClose={onClose}>
      <WindowTitle>Case Study — Documentation Hub</WindowTitle>
      <WindowContent className="p-8 @3xl:p-12">
        <p className="text-sm text-center text-muted-foreground">Case Study</p>
        <h1 className="font-serif text-2xl text-center mb-12">I led a cross-disciplinary team in rethinking the documentation experience, building a foundation that bridged the gap between product and documentation.</h1>
        <p className="text-center mb-4"><em>Led the design thinking approach behind the reimagining of UP42&apos;s documentation experience, enabling a small cross-disciplinary team to understand customer problems, explore solutions, and deliver a foundation for shortening the distance between the user interface and documentation.</em></p>
        <hr className="w-8 border-0.5 color-border mx-auto my-12" />
        <figure className="my-12">
          <Image src="/old-new-documentation-hub.png" alt="The old and new documentation hub." width={800} height={600} className="w-full h-auto" />
          <figcaption className="text-muted-foreground text-center mt-2">The old and new documentation hub.</figcaption>
        </figure>
        <p className="mb-4">For a platform bringing geospatial data and analytics to developers, a great developer experience—and by extension, documentation—was essential to fulfilling that promise.</p>
        <p className="mb-4">Two years after launch, our documentation had grown to over 100 pages spread across multiple sites: the API, SDK, and other technical references all lived separately. Developers were beginning to feel the strain of a fragmented experience that slowed them down and obscured the platform&apos;s broader capabilities.</p>
        <p className="mb-4">While the marketing website had undergone a redesign and the product had evolved significantly, the documentation had stagnated and no longer felt representative of a developer-focused product.</p>
        <figure className="aspect-16/9 my-12">
          <iframe src="https://www.youtube.com/embed/XpdvVltqWtc" allowFullScreen className="w-full h-full"></iframe>
          <figcaption className="text-muted-foreground text-center mt-2">This case study has been adapted from the presentation I gave when we launched the Documentation Hub.</figcaption>
        </figure>
        <hr className="w-8 border-0.5 color-border mx-auto my-12" />
        <h2 className="font-serif text-lg text-center my-12">Understanding the Problems</h2>
        <h3 className="font-serif text-base text-center my-12">Design Process</h3>
        <p className="mb-4">Kicking things off, I adopted the <a href="https://designthinking.ideo.com/">design thinking</a> framework, a hands-on, user-centric approach to solving complex problems popularised by David Kelley and Tim Brown of IDEO.</p>
        <figure className="my-12">
          <Image src="/design-thinking-framework.png" alt="Framed our approach around IDEO's design thinking framework, guiding the team from research to implementation." width={800} height={600} className="w-full h-auto" />
          <figcaption className="text-muted-foreground text-center mt-2">Framed our approach around IDEO&apos;s design thinking framework, guiding the team from research to implementation.</figcaption>
        </figure>
        <p className="mb-4">To build a shared understanding of developers and their pain points, I gathered insights through:</p>
        <ul className="list-disc list-outside marker:text-input mb-4">
          <li><strong>Customer Feedback:</strong> I pored though customer feedback collected since launch.</li>
          <li><strong>User Interviews:</strong> I reviewed notes from recent research evaluating our developer experience.</li>
          <li><strong>Workshop:</strong> I ran a cross-functional workshop with engineering, support, marketing, data science, and business development to gather ideas and perspectives.</li>
        </ul>
        <h3 className="font-serif text-base text-center my-12">Opportunities</h3>
        <p className="mb-4">From this research, I distilled a set of goals, questions, and improvements:</p>
        <ul className="list-disc list-outside marker:text-input mb-4">
          <li>
            <h4 className="font-sans font-bold text-base inline">Goals</h4>
            <ul className="list-disc list-outsite ml-4">
              <li>Let developers start interacting with the API immediately.</li>
              <li>Make the documentation hub a core part of the developer journey.</li>
              <li>Create the most engaging developer experience in the geospatial community.</li>
            </ul>
          </li>
          <li>
            <h4 className="font-sans font-bold text-base inline">Questions</h4>
            <ul className="list-disc list-outsite ml-4">
              <li>How does the platform fit into my existing workflow or infrastructure?</li>
              <li>Where can I find clear documentation for marketplace blocks?</li>
              <li>How does the documentation adapt to my level of expertise?</li>
            </ul>
          </li>
          <li>
            <h4 className="font-sans font-bold text-base inline">Improvements</h4>
            <ul className="list-disc list-outsite ml-4">
              <li>Lack of an interactive playground for immediate experimentation.</li>
              <li>Disorganised information architecture that hindered exploration.</li>
              <li>Messaging and visuals misaligned with a developer-first product.</li>
            </ul>
          </li>
        </ul>
        <hr className="w-8 border-0.5 color-border mx-auto my-12" />
        <h2 className="font-serif text-lg text-center my-12">Redefining the Experience</h2>
        <h3 className="font-serif text-base text-center my-12">Information Architecture</h3>
        <p className="mb-4">With a clearer picture of the opportunities, my first step was to redesign the information architecture: how content was organised and discovered.</p>
        <p className="mb-4">I began with a content audit across all touchpoints: the existing documentation, SDK microsite, YouTube tutorials, and marketing pages. This inventory became the backbone of our content strategy.</p>
        <figure className="my-12">
          <Image src="/content-inventory.png" alt="The content inventory that would become the backbone of our content strategy." width={800} height={600} className="w-full h-auto" />
          <figcaption className="text-muted-foreground text-center mt-2">The content inventory that would become the backbone of our content strategy.</figcaption>
        </figure>
        <p className="mb-4">From there, I designed a new sitemap around four pillars:</p>
        <ul className="list-disc list-outsite marker:text-input mb-4">
          <li><strong>Getting Started:</strong> Fundamentals of the platform covering the catalog, projects, workflows, and jobs.</li>
          <li><strong>Block Reference:</strong> Specifications for every block&apos;s inputs, outputs, and parameters.</li>
          <li><strong>Developers:</strong> API reference, Python SDK, and integration guides.</li>
          <li><strong>Accounts &amp; Credits:</strong> Administrative content including account management, pricing, and compliance.</li>
        </ul>
        <figure className="my-12">
          <Image src="/new-sitemap.png" alt="The new sitemap clarified purpose and navigation, organising content under four intuitive pillars." width={800} height={600} className="w-full h-auto" />
          <figcaption className="text-muted-foreground text-center mt-2">The new sitemap clarified purpose and navigation, organising content under four intuitive pillars.</figcaption>
        </figure>
        <h3 className="font-serif text-base text-center my-12">Content Types</h3>
        <p className="mb-4">To better serve developers, I adopted three content types from Daniele Procida&apos;s <a href="https://documentation.divio.com/">Documentation System</a>:</p>
        <ul className="list-disc list-outsite marker:text-input mb-4">
          <li><strong>References:</strong> Information-oriented explanations of how features or parts of the platform work, typically mirroring the structure of what they describe.</li>
          <li><strong>Guides:</strong> Goal-oriented walkthroughs for real use cases, assuming some prior knowledge.</li>
          <li><strong>Tutorials:</strong> Learning-oriented, task-specific introductions that build confidence and quick wins.</li>
        </ul>
        <h3 className="font-serif text-base text-center my-12">Navigation Pages</h3>
        <p className="mb-4">With over 100 pages of content, findability was critical. Drawing on Jared Spool&apos;s concept of _information scent_, I introduced distinct <a href="https://aycl.uie.com/virtual_seminars/the_scent_of_a_web_page_the_five_types_of_navigation_pages">navigation page</a> types:</p>
        <ul className="list-disc list-outsite marker:text-input mb-4">
          <li><strong>Galleries:</strong> Lists of related links, the most common failure point on content-rich websites.</li>
          <li><strong>Departments:</strong> Groups of related galleries to help developers narrow their search.</li>
          <li><strong>Home:</strong> The orienting layer that helped developers identify where to start.</li>
        </ul>
        <figure className="my-12">
          <Image src="/sitemap-visualization.png" alt="Visualising the sitemap helped validate navigation flows and ensure findability across user journeys." width={800} height={600} className="w-full h-auto" />
          <figcaption className="text-muted-foreground text-center mt-2">Visualising the sitemap helped validate navigation flows and ensure findability across user journeys.</figcaption>
        </figure>
        <h3 className="font-serif text-base text-center my-12">Atomic Design</h3>
        <p className="mb-4">With the structure in place, our visual designer, Adam, explored visual directions.</p>
        <p className="mb-4">My focus was on interaction design and translating those directions into a modular component system, rooted in <a href="https://atomicdesign.bradfrost.com/">Atomic Design</a> principles, that we could combine to compose any required layout.</p>
        <h4 className="font-sans font-bold text-base">Atoms</h4>
        <p className="mb-4">I picked out colour, icon, and typography tokens from the design system, that had evolved from our product and marketing website, to form the primitives for building components.</p>
        <p className="mb-4">I selected colour, icon, and typography tokens from the design system, evolved from our product and marketing website, to form the primitives for building components.</p>
        <figure className="my-12">
          <Image src="/product-palette-iconography.png" alt="Reusing our product palette and iconography extended visual continuity across product, marketing, and documentation." width={800} height={600} className="w-full h-auto" />
          <figcaption className="text-muted-foreground text-center mt-2">Reusing our product palette and iconography extended visual continuity across product, marketing, and documentation.</figcaption>
        </figure>
        <figure className="my-12">
          <Image src="/type-styles.png" alt="Selecting a concise set of type styles ensured clarity, hierarchy, and consistency across all documentation layouts." width={800} height={600} className="w-full h-auto" />
          <figcaption className="text-muted-foreground text-center mt-2">Selecting a concise set of type styles ensured clarity, hierarchy, and consistency across all documentation layouts.</figcaption>
        </figure>
        <h4 className="font-sans font-bold text-base">Molecules</h4>
        <p className="mb-4">I combined these atoms into reusable components to define the tone and rhythm of content. Headings, captions, and links combined to form headers and lists. Icons, covers, and images were added to construct cards.</p>
        <figure className="my-12">
          <Image src="/atomic-components.png" alt="Combining atomic elements into reusable components laid the groundwork for scalable, systematic page layouts." width={800} height={600} className="w-full h-auto" />
          <figcaption className="text-muted-foreground text-center mt-2">Combining atomic elements into reusable components laid the groundwork for scalable, systematic page layouts.</figcaption>
        </figure>
        <h4 className="font-sans font-bold text-base">Organisms</h4>
        <p className="mb-4">These molecules then combined into flexible page sections used across galleries, departments, and the homepage.</p>
        <figure className="my-12">
          <video 
            loop 
            muted 
            playsInline
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => e.currentTarget.pause()}
          >
            <source src="/atomic-design-organisms.mp4" type="video/mp4" />
          </video>
          <figcaption className="text-muted-foreground text-center mt-2">Patterns defined as organisms made it possible to compose diverse page types without bespoke design work.</figcaption>
        </figure>
        <hr className="w-8 border-0.5 color-border mx-auto my-12" />
        <h2 className="font-serif text-lg text-center my-12">Delivering on the Promise</h2>
        <h3 className="font-serif text-base text-center my-12">Technology Stack</h3>
        <p className="mb-4">A core objective was minimising friction in the editorial workflow, allowing anyone on the editorial team to contribute easily, while keeping the stack simple, extensible, and maintainable by our frontend team.</p>
        <h4 className="font-sans font-bold text-base">Jamstack &amp; Gatsby</h4>
        <p className="mb-4">With these criteria, <a href="https://github.com/afuh">Axel</a>, our frontend engineer, proposed a <a href="https://jamstack.org/">Jamstack</a> architecture using Gatsby and MDX.</p>
        <p className="mb-4"><a href="https://www.gatsbyjs.com/">Gatsby</a> offered fast performance, modern tooling, and a low-maintenance deployment pipeline. Within a day, Axel had a themed boilerplate running, allowing me to begin structuring and populating the new site.</p>
        <p className="mb-4">Content lived as <a href="https://www.markdownguide.org/">Markdown</a> files, and with <a href="https://mdxjs.com/">MDX</a> React components could be embedded directly within pages, giving editors further fine-grained control over layout.</p>
        <h4 className="font-sans font-bold text-base">DocSearch by Algolia</h4>
        <p className="mb-4">For search, we integrated <a href="https://www.algolia.com/">Algolia&apos;s</a> DocSearch, a solution tailored for documentation websites. It handled crawling, indexing, and ranking, providing a fast, relevant search experience with minimal setup.</p>
        <h3 className="font-serif text-base text-center my-12">Content Strategy</h3>
        <p className="mb-4">Because we already had 120+ pages of documentation, the strategy focused on migrating and improving existing content rather than creating new material.</p>
        <h4 className="font-sans font-bold text-base">Migration</h4>
        <ul className="list-disc list-outsite marker:text-input mb-4">
          <li><strong>Site Map:</strong> All existing content was relocated under the new information architecture.</li>
          <li><strong>Links:</strong> Every URL changed, requiring updates and redirects.</li>
          <li><strong>Formatting:</strong> Content was converted from reStructuredText to Markdown.</li>
        </ul>
        <h4 className="font-sans font-bold text-base">Content Editing</h4>
        <p className="mb-4">Once content was migrated, Teodora and Seulgi, our support engineers, reviewed every page, refining formatting, code samples, and structure.</p>
        <h4 className="font-sans font-bold text-base">Screenshots</h4>
        <p className="mb-4">Adam refreshed over 170 screenshots to match the latest UI. We also established visual guidelines to keep screenshots useful without requiring frequent updates.</p>
        <figure className="my-12">
          <Image src="/updated-screenshots.png" alt="Updated screenshots aligned visual cues with the product." width={800} height={600} className="w-full h-auto" />
          <figcaption className="text-muted-foreground text-center mt-2">Updated screenshots aligned visual cues with the product.</figcaption>
        </figure>
        <hr className="w-8 border-0.5 color-border mx-auto my-12" />
        <h2 className="font-serif text-lg text-center my-12">The Groundwork for a Better Developer Experience</h2>
        <h3 className="font-serif text-base text-center my-12">Shortening the distance to documentation</h3>
        <p className="mb-4">One of our product principles was <em>shortening the distance between intent and insight</em>. In this context—whether measured in clicks, time, or context switching—it meant reducing friction between the user interface and documentation.</p>
        <p className="mb-4">With the new foundation in place, I explored ways to bring documentation closer to developers.</p>
        <h3 className="font-serif text-base text-center my-12"><code>Ctrl+P</code> (Quick Open)</h3>
        <p className="mb-4">Inspired by code editors like VS Code and Sublime Text, I introduced a <code>ctrl+p</code> shortcut that surfaced documentation search directly in the product, enabling quick access to any topic.</p>
        <figure className="mb-4">
          <video 
            loop 
            muted 
            playsInline
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => e.currentTarget.pause()}
          >
            <source src="/quick-open.mp4" type="video/mp4" />
          </video>
          <figcaption className="text-muted-foreground text-center mt-2">Embedded search brought documentation closer to the workflow.</figcaption>
        </figure>
        <h3 className="font-serif text-base text-center my-12">Embedded Documentation</h3>
        <figure className="my-12">
          <video 
            loop 
            muted 
            playsInline
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => e.currentTarget.pause()}
          >
            <source src="/popovers.mp4" type="video/mp4" />
          </video>
          <figcaption className="text-muted-foreground text-center mt-2">Contextual popovers illustrated how immediate guidance could reduce support dependency and task interruptions.</figcaption>
        </figure>
        <p className="mb-4">A year earlier, I had introduced contextual popovers linking to documentation. While helpful, they still forced you into a new tab.</p>
        <figure className="my-12">
          <video 
            loop 
            muted 
            playsInline
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => e.currentTarget.pause()}
          >
            <source src="/embedded-documentation.mp4" type="video/mp4" />
          </video>
          <figcaption className="text-muted-foreground text-center mt-2">Embedded documentation showed how side-by-side context eliminated tab switching and reinforced learning in-flow.</figcaption>
        </figure>
        <p>To remove that disruption, I explored embedding documentation directly inside the product, allowing side-by-side reference without breaking flow.</p>
      </WindowContent>
    </Window>
  );
}
