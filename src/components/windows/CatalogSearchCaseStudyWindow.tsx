"use client"

import { memo } from "react";
import Image from "next/image";
import { Window, WindowTitle, WindowContent } from "@/components/ui/window";
import { WindowRef } from "@/components/ui/window";

interface CatalogSearchCaseStudyWindowProps {
  onClose: () => void;
  windowRef: React.RefObject<WindowRef | null>;
}

function CatalogSearchCaseStudyWindow({ onClose, windowRef }: CatalogSearchCaseStudyWindowProps) {
  return (
    <Window id="catalog_search_case_study" ref={windowRef} className="w-200 left-1/2 top-1/2 -translate-1/2 @container" onClose={onClose}>
      <WindowTitle>Case Study — Catalog Search</WindowTitle>
      <WindowContent className="p-8 @3xl:p-12">
        <p className="text-sm text-center text-muted-foreground">Case Study</p>
        <h1 className="font-serif text-2xl text-center mb-12">Helping customers find needles in a 100,000,000,000 km² haystack.</h1>
        <p className="text-center mb-4"><em>Led a small cross-disciplinary team through a design thinking process to ship Catalog Search—an interface for exploring and discovering satellite imagery across massive geospatial catalogs on the UP42 platform.</em></p>
        <hr className="w-8 border-0.5 color-border mx-auto my-12" />
        <p className="mb-4"><a href="https://www.up42.com/">UP42</a> is a developer platform and marketplace offering a wide range of geospatial data and analytics.</p>
        <p className="mb-4">A core aspect of the platform is enabling customers to construct workflows that take satellite imagery, apply processing algorithms, and extract insights from that data. You can think of it like a <a href="https://zapier.com/">Zapier</a> or <a href="https://support.apple.com/guide/shortcuts/welcome/ios">Shortcuts</a> for geospatial data and processing.</p>
        <p className="mb-4">Now that the infrastructure was in place for developers to construct and execute workflows at scale, we turned our attention towards improving the experience around exploration and discoverability of the massive volumes of available satellite imagery.</p>
        <p className="mb-4">Our most valuable data provider offers over 100 billion square kilometres of satellite imagery dating back to 1986, and the only way to see what was available was to specify your search parameters in code, execute a dry run of your workflow, and repeat until you found (or didn&apos;t find) what you were looking for.</p>
        <p className="mb-4">A time consuming and repetitive process one customer described as &ldquo;shooting in the dark&rdquo;.</p>
        <hr className="w-8 border-0.5 color-border mx-auto my-12" />
        <h2 className="font-serif text-lg text-center my-12">Process</h2>
        <p className="mb-4">With a tight two month deadline and a core team of product designer, backend engineer, and frontend engineer, we adapted a design thinking process that leaned on initial research for prioritising features for the minimum viable product.</p>
        <p className="mb-4">This maximised the engineering time available during the exploration phase to uncover the technical constraints that would influence what we could deliver.</p>
        <figure className="-mx-8 @3xl:-mx-12 my-12">
          <Image src="/catalog-search-process.png" alt="Adapted design thinking process spanning Understand, Explore, and Materialise." width={1516} height={640} className="w-full h-auto" />
          <figcaption className="text-muted-foreground text-center mx-8 @3xl:mx-12 mt-2">Adapted design thinking process spanning Understand, Explore, and Materialise.</figcaption>
        </figure>
        <h3 className="font-serif text-base text-center my-12">Tools</h3>
        <ul className="list-disc list-outside marker:text-input mb-4">
          <li><strong>BigQuery:</strong> Data analytics</li>
          <li><strong>Looker:</strong> Data analytics and reporting</li>
          <li><strong>Productboard:</strong> Customer feedback</li>
          <li><strong>Google Meet:</strong> User interviews and usability testing</li>
          <li><strong>Otter:</strong> Audio transcription and notes</li>
          <li><strong>Miro:</strong> Whiteboarding, diagramming, and note taking</li>
          <li><strong>Figma:</strong> Design and prototyping</li>
        </ul>
        <hr className="w-8 border-0.5 color-border mx-auto my-12" />
        <h2 className="font-serif text-lg text-center my-12">Understand</h2>
        <h3 className="font-serif text-base text-center my-12">Customer Feedback</h3>
        <p className="mb-4">The customer feedback was clear—customers wanted a better way to search and preview available imagery.</p>
        <p className="mb-4">They needed an interface for navigating the vast imagery catalogs (and eventually any geospatial data) that most satellite, aerial, or drone imagery providers already have.</p>
        <ul className="list-disc list-outside marker:text-input mb-4">
          <li>&ldquo;Unified cataloging system and open search is high on our list.&rdquo;</li>
          <li>&ldquo;Needs basic search &amp; discovery tools for imagery in terms of availability over an area, cloud cover, dates, etc…&rdquo;</li>
          <li>&ldquo;They want a map that shows the coverage of the Pléiades and SPOT archives—major problem that customers have is that they can&apos;t find imagery over the area they are looking for.&rdquo;</li>
        </ul>
        <h3 className="font-serif text-base text-center my-12">Competitive Analysis</h3>
        <p className="mb-4">Next, we looked at the competitive landscape of other imagery providers, revealing that most follow familiar user interface patterns that we could adopt without reinventing the wheel.</p>
        <p className="mb-4">The challenge would be scaling the experience horizontally across multiple imagery catalogs, as well as vertically to accommodate a variety of geospatial data types.</p>
        <ul className="list-disc list-outside marker:text-input mb-4">
          <li>BlackSky</li>
          <li>EOS Land Viewer</li>
          <li>Land Info Worldwide Mapping</li>
          <li>Airbus OneAtlas</li>
          <li>Sobloo</li>
          <li>United States Geological Survey</li>
        </ul>
        <h3 className="font-serif text-base text-center my-12">User Interviews</h3>
        <p className="mb-4">With a clear understanding of our customer needs in mind, our user interviews were focused less on identifying the core problem, and more on understanding customers&apos; pain points and which features would best address their use cases.</p>
        <ul className="list-disc list-outside marker:text-input mb-4">
          <li>&ldquo;Can test data query images be viewed through the API? E.g. want to be able to show a previewed low-resolution image to customer prior to them making a purchase.&rdquo;</li>
          <li>&ldquo;Being able to look on a map and see the availability of imagery in a given area is important. Doesn&apos;t want to spend credits to query the catalog. Called it &lsquo;shooting in the dark&rsquo;.&rdquo;</li>
          <li>&ldquo;If you do a [dry run] and don&apos;t get results you want, you get stuck because you can&apos;t edit that [dry run]. It&apos;s a one time test that gets thrown away and you can&apos;t re-use it.&rdquo;</li>
        </ul>
        <h3 className="font-serif text-base text-center my-12">Analytics</h3>
        <p className="mb-4">While our vision was to surface all available imagery catalogs, we knew we needed to start with the OneAtlas Pléiades and SPOT catalogs first.</p>
        <p className="mb-4">Querying our data warehouse confirmed this assumption and answered the next question customers were already asking—that we would integrate the Sentinel Hub Sentinel-2 and Landsat-8 catalogs next.</p>
        <figure className="-mx-8 @3xl:-mx-12 my-12">
          <Image src="/catalog-search-analytics.png" alt="Analytics confirmed prioritising OneAtlas Pléiades and SPOT, then Sentinel Hub catalogs." width={1516} height={800} className="w-full h-auto" />
          <figcaption className="text-muted-foreground text-center mx-8 @3xl:mx-12 mt-2">Analytics confirmed prioritising OneAtlas Pléiades and SPOT, then Sentinel Hub catalogs.</figcaption>
        </figure>
        <h3 className="font-serif text-base text-center my-12">Story Mapping</h3>
        <p className="mb-4">For a project with a short deadline and small core team, storymapping enabled us to prioritise immediate customer value for the minimum viable product, while embracing the broader stakeholder product vision.</p>
        <p className="mb-4">With technical constraints changing almost daily, having a lightweight representation of the product was key to aligning stakeholders, focus engineering on key features, and draw boundaries for a design solution.</p>
        <figure className="-mx-8 @3xl:-mx-12 my-12">
          <Image src="/catalog-search-story-mapping.png" alt="Story map separating MVP affordances from backlog across search, select, and acquire." width={1600} height={349} className="w-full h-auto" />
          <figcaption className="text-muted-foreground text-center mx-8 @3xl:mx-12 mt-2">Story map separating MVP affordances from backlog across search, select, and acquire.</figcaption>
        </figure>
        <hr className="w-8 border-0.5 color-border mx-auto my-12" />
        <h2 className="font-serif text-lg text-center my-12">Explore</h2>
        <h3 className="font-serif text-base text-center my-12">Breadboarding</h3>
        <p className="mb-4">Enabling search and preview for a satellite imagery catalog has heavy dependencies on third party platforms and APIs; doing so for multiple catalogs from different providers would be an order of magnitude more challenging.</p>
        <p className="mb-4">During the exploration phase, engineering focused on investigating and clarifying the technical capabilities that would determine the boundaries for design to create the user experience.</p>
        <p className="mb-4">As boundaries began to emerge, we used a breadboard to identify the user interface components and their connections. This shorthand technique allowed us to quickly explore ideas and discuss their technical viability before committing to a path.</p>
        <figure className="-mx-8 @3xl:-mx-12 my-12">
          <Image src="/catalog-search-breadboarding.png" alt="Breadboard connecting map, search, filters, selection, metadata, and workflow parameters." width={1600} height={358} className="w-full h-auto" />
          <figcaption className="text-muted-foreground text-center mx-8 @3xl:mx-12 mt-2">Breadboard connecting map, search, filters, selection, metadata, and workflow parameters.</figcaption>
        </figure>
        <h3 className="font-serif text-base text-center my-12">UI Design &amp; Prototyping</h3>
        <p className="mb-4">With clarity over the technical boundaries and a good sense of the components and connections, it was time to flesh out the user experience and interface in higher fidelity.</p>
        <p className="mb-4">This exploration emphasised the following:</p>
        <ul className="list-disc list-outside marker:text-input mb-4">
          <li>Search, select, and acquire as key activities in the user journey.</li>
          <li>Adopt a &lsquo;shopping cart&rsquo; metaphor to convey a mental model for data selection.</li>
          <li>Lean on customer research to inform decisions regarding the user interface.</li>
        </ul>
        <figure className="-mx-8 @3xl:-mx-12 my-12">
          <Image src="/catalog-search-filters.png" alt="Date range and cloud cover filters informed by customer feedback and quantitative usage data." width={1324} height={576} className="w-full h-auto" />
          <figcaption className="text-muted-foreground text-center mx-8 @3xl:mx-12 mt-2">Customer feedback guided us towards date range and cloud cover as the most important options for narrowing search results.</figcaption>
        </figure>
        <figure className="-mx-8 @3xl:-mx-12 my-12">
          <Image src="/catalog-search-shopping-cart.png" alt="Shopping cart metaphor for selecting imagery before acquisition." width={1162} height={512} className="w-full h-auto" />
          <figcaption className="text-muted-foreground text-center mx-8 @3xl:mx-12 mt-2">A &lsquo;shopping cart&rsquo; metaphor was adopted to convey a mental model for how data selection works.</figcaption>
        </figure>
        <figure className="-mx-8 @3xl:-mx-12 my-12">
          <Image src="/catalog-search-metadata.png" alt="Popover for displaying image metadata." width={418} height={1009} className="w-full h-auto max-w-xs mx-auto" />
          <figcaption className="text-muted-foreground text-center mx-8 @3xl:mx-12 mt-2">Popover for displaying image metadata.</figcaption>
        </figure>
        <figure className="-mx-8 @3xl:-mx-12 my-12">
          <Image src="/catalog-search-workflow-popover.png" alt="Popover for finding and running a workflow with selected imagery." width={788} height={568} className="w-full h-auto" />
          <figcaption className="text-muted-foreground text-center mx-8 @3xl:mx-12 mt-2">Popover for quickly finding and running a workflow with selected imagery—a key feature for allowing customers to acquire data.</figcaption>
        </figure>
        <figure className="-mx-8 @3xl:-mx-12 my-12">
          <Image src="/catalog-search-replicate-params.png" alt="Interim solution for replicating search parameters or selected images." width={832} height={1041} className="w-full h-auto max-w-md mx-auto" />
          <figcaption className="text-muted-foreground text-center mx-8 @3xl:mx-12 mt-2">Given that workflow configuration was out of scope, a quick way to replicate search parameters or selected images was required as an interim solution.</figcaption>
        </figure>
        <hr className="w-8 border-0.5 color-border mx-auto my-12" />
        <h2 className="font-serif text-lg text-center my-12">Materialise</h2>
        <h3 className="font-serif text-base text-center my-12">Customer Feedback</h3>
        <p className="mb-4">As a result of parallelising design and engineering exploration, much of the backend and frontend code was already written, so the test phase was focused on cleaning up the code and polishing the user experience.</p>
        <p className="mb-4">This provided an opportunity to share an early BETA release to gather last minute feedback.</p>
        <ul className="list-disc list-outside marker:text-input mb-4">
          <li>&ldquo;I have seen the new UI and features of the platform, it looks great, specifically the search feature in the catalog is really helpful. I am satisfied with the current features and data sources available on the platform.&rdquo;</li>
          <li>&ldquo;thanks for sending the update - i just logged in and it looks great so far!&rdquo;</li>
        </ul>
        <h3 className="font-serif text-base text-center my-12">Reporting</h3>
        <p className="mb-4">Realtime dashboards were setup to monitor analytics for the search and acquisition phases of the customer journey.</p>
        <p className="mb-4">Search volume and geometry uploads provided awareness into general adoption for the search phase. For the acquire phase, job configuration and dry runs analytics provided insight into whether customers were able to acquire the data they were looking for.</p>
        <figure className="-mx-8 @3xl:-mx-12 my-12">
          <Image src="/catalog-search-reporting-dashboard.png" alt="A Looker dashboard for tracking adoption and use." width={1600} height={1362} className="w-full h-auto" />
          <figcaption className="text-muted-foreground text-center mx-8 @3xl:mx-12 mt-2">A Looker dashboard for tracking adoption and use.</figcaption>
        </figure>
        <h3 className="font-serif text-base text-center my-12">Usability Testing</h3>
        <p className="mb-4">For a feature that promised so much customer value, adoption and use was poor. This was partially due to releasing close to Christmas and with little documentation and onboarding.</p>
        <p className="mb-4">However, as we began to receive customer feedback and conduct usability tests, we uncovered a number of immediate issues to address and opportunities for areas of improvement that would inform our next iteration.</p>
        <figure className="-mx-8 @3xl:-mx-12 my-12">
          <Image src="/catalog-search-usability-miro.jpeg" alt="A Miro board for taking notes and synthesising findings from usability testing." width={1333} height={750} className="w-full h-auto" />
          <figcaption className="text-muted-foreground text-center mx-8 @3xl:mx-12 mt-2">A Miro board for taking notes and synthesising findings from usability testing.</figcaption>
        </figure>
      </WindowContent>
    </Window>
  );
}

export default memo(CatalogSearchCaseStudyWindow);
