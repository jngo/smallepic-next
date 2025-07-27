"use client"

import { useState, useRef } from "react";
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
import { analytics, trackNavigation } from "@/lib/analytics";

export default function Home() {
  const [showAbout, setShowAbout] = useState(true);
  const [showExperience, setShowExperience] = useState(true);
  const [showRandom, setShowRandom] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const [showMermaidViewer, setShowMermaidViewer] = useState(false);
  const [showPodscriber, setShowPodscriber] = useState(false);
  const [showSynthesiser, setShowSynthesiser] = useState(false);
  const [showFilmsAndConversations, setShowFilmsAndConversations] = useState(false);
  const [showBooksAndConversations, setShowBooksAndConversations] = useState(false);
  const [showMcKinseyAndCompany, setShowMcKinseyAndCompany] = useState(false);
  const [showUP42, setShowUP42] = useState(false);
  const [showDocumentationHub, setShowDocumentationHub] = useState(false);
  const [showCatalogSearchPrototype, setShowCatalogSearchPrototype] = useState(false);
  const [showCatalogSearchPresentation, setShowCatalogSearchPresentation] = useState(false);
  const [showGISOS, setShowGISOS] = useState(false);
  const [showCandis, setShowCandis] = useState(false);
  const [showUrbanSportsClub, setShowUrbanSportsClub] = useState(false);

  // Refs for each window
  const aboutRef = useRef<WindowRef>(null);
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
  const documentationHubRef = useRef<WindowRef>(null);
  const catalogSearchPrototypeRef = useRef<WindowRef>(null);
  const catalogSearchPresentationRef = useRef<WindowRef>(null);
  const GISOSRef = useRef<WindowRef>(null);
  const candisRef = useRef<WindowRef>(null);
  const urbanSportsClubRef = useRef<WindowRef>(null);

  // Helper function to show window and bring to front
  const showWindow = (
    setShow: (show: boolean) => void, 
    ref: React.RefObject<WindowRef | null>,
    windowId: string,
    windowType: 'about' | 'experience' | 'random' | 'contact' | 'project' | 'company',
    triggerSource: 'menubar' | 'window_content' | 'icon_click' | 'list_click' = 'menubar'
  ) => {
    setShow(true);
    
    // Track window open event
    analytics.trackWindowOpen({
      window_type: windowType,
      window_id: windowId,
      trigger_source: triggerSource,
    });
    
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
            <MenubarItem onClick={() => {
              trackNavigation('john_ngo', 'About', 'main');
              showWindow(setShowAbout, aboutRef, 'about', 'about');
            }}>About</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Experience</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => {
              trackNavigation('experience', 'View All', 'main');
              showWindow(setShowExperience, experienceRef, 'experience', 'experience');
            }}>View All</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => {
              trackNavigation('experience', 'McKinsey & Company', 'submenu');
              analytics.trackCompanyView({
                company_name: 'mckinsey',
                access_method: 'menubar',
                source_window: 'menubar'
              });
              showWindow(setShowMcKinseyAndCompany, mckinseyAndCompanyRef, 'mckinsey', 'company');
            }}>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>McKinsey & Company</span>
            </MenubarItem>
            <MenubarItem onClick={() => {
              trackNavigation('experience', 'UP42', 'submenu');
              analytics.trackCompanyView({
                company_name: 'up42',
                access_method: 'menubar',
                source_window: 'menubar'
              });
              showWindow(setShowUP42, up42Ref, 'up42', 'company');
            }}>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>UP42</span>
            </MenubarItem>
            <MenubarItem onClick={() => {
              trackNavigation('experience', 'Candis', 'submenu');
              analytics.trackCompanyView({
                company_name: 'candis',
                access_method: 'menubar',
                source_window: 'menubar'
              });
              showWindow(setShowCandis, candisRef, 'candis', 'company');
            }}>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>Candis</span>
            </MenubarItem>
            <MenubarItem onClick={() => {
              trackNavigation('experience', 'Urban Sports Club', 'submenu');
              analytics.trackCompanyView({
                company_name: 'urban_sports_club',
                access_method: 'menubar',
                source_window: 'menubar'
              });
              showWindow(setShowUrbanSportsClub, urbanSportsClubRef, 'urban_sports_club', 'company');
            }}>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span>Urban Sports Club</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Random</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => {
              trackNavigation('random', 'View All', 'main');
              showWindow(setShowRandom, randomRef, 'random', 'random');
            }}>View All</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => {
              trackNavigation('random', 'Synthesiser', 'submenu');
              analytics.trackProjectView({
                project_type: 'synthesiser',
                access_method: 'menubar',
                source_window: 'menubar'
              });
              showWindow(setShowSynthesiser, synthesiserRef, 'synthesiser', 'project');
            }}>
              <Network className="mr-2 h-4 w-4" />
              <span>Synthesiser</span>
            </MenubarItem>
            <MenubarItem onClick={() => {
              trackNavigation('random', 'Podscriber', 'submenu');
              analytics.trackProjectView({
                project_type: 'podscriber',
                access_method: 'menubar',
                source_window: 'menubar'
              });
              showWindow(setShowPodscriber, podscriberRef, 'podscriber', 'project');
            }}>
              <Podcast className="mr-2 h-4 w-4" />
              <span>Podscriber</span>
            </MenubarItem>
            <MenubarItem onClick={() => {
              trackNavigation('random', 'Mermaid Viewer', 'submenu');
              analytics.trackProjectView({
                project_type: 'mermaid_viewer',
                access_method: 'menubar',
                source_window: 'menubar'
              });
              showWindow(setShowMermaidViewer, mermaidViewerRef, 'mermaid_viewer', 'project');
            }}>
              <ScanText className="mr-2 h-4 w-4" />
              <span>Mermaid Viewer</span>
            </MenubarItem>
            <MenubarItem onClick={() => {
              trackNavigation('random', 'Films & Conversations', 'submenu');
              analytics.trackProjectView({
                project_type: 'films_conversations',
                access_method: 'menubar',
                source_window: 'menubar'
              });
              showWindow(setShowFilmsAndConversations, filmsAndConversationsRef, 'films_conversations', 'project');
            }}>
              <Clapperboard className="mr-2 h-4 w-4" />
              <span>Films & Conversations</span>
            </MenubarItem>
            <MenubarItem onClick={() => {
              trackNavigation('random', 'Books & Conversations', 'submenu');
              analytics.trackProjectView({
                project_type: 'books_conversations',
                access_method: 'menubar',
                source_window: 'menubar'
              });
              showWindow(setShowBooksAndConversations, booksAndConversationsRef, 'books_conversations', 'project');
            }}>
              <LibraryBig className="mr-2 h-4 w-4" />
              <span>Books & Conversations</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Contact</MenubarTrigger>
          <MenubarContent>
            <MenubarItem asChild>
              <a href="mailto:john@smallepic.com" onClick={() => {
                trackNavigation('contact', 'Email', 'main');
                analytics.trackExternalLinkSelect({
                  link_type: 'email',
                  destination: 'john@smallepic.com',
                  source_context: 'menubar'
                });
              }}>
                <Mail className="mr-2 h-4 w-4" />
                Email
              </a>
            </MenubarItem>
            <MenubarItem asChild>
              <a href="https://www.linkedin.com/in/jngo/" onClick={() => {
                trackNavigation('contact', 'LinkedIn', 'main');
                analytics.trackExternalLinkSelect({
                  link_type: 'linkedin',
                  destination: 'https://www.linkedin.com/in/jngo/',
                  source_context: 'menubar'
                });
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide mr-2 h-4 w-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
            </MenubarItem>
            <MenubarItem asChild>
              <a href="https://github.com/jngo" onClick={() => {
                trackNavigation('contact', 'GitHub', 'main');
                analytics.trackExternalLinkSelect({
                  link_type: 'github',
                  destination: 'https://github.com/jngo',
                  source_context: 'menubar'
                });
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide mr-2 h-4 w-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                GitHub
              </a>
            </MenubarItem>
            <MenubarItem asChild>
              <a href="https://twitter.com/jngo" onClick={() => {
                trackNavigation('contact', 'Twitter', 'main');
                analytics.trackExternalLinkSelect({
                  link_type: 'twitter',
                  destination: 'https://twitter.com/jngo',
                  source_context: 'menubar'
                });
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide mr-2 h-4 w-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                Twitter
              </a>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <Clock className="ml-auto pr-2" />
      </Menubar>


      {showRandom && (
        <Window ref={randomRef} defaultView="list" className="w-210 left-4 top-14" onClose={() => {
          analytics.trackWindowClose({
            window_type: 'random',
            window_id: 'random'
          });
          setShowRandom(false);
        }}>
        <WindowTitle>Random</WindowTitle>

        <WindowContent view="icon">
          <button onClick={() => {
            analytics.trackProjectView({
              project_type: 'synthesiser',
              access_method: 'icon_click',
              source_window: 'random'
            });
            showWindow(setShowSynthesiser, synthesiserRef, 'synthesiser', 'project', 'icon_click');
          }} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <Network strokeWidth={0.8} className="size-12"/>
            <span>synthesiser.html</span>
          </button>
          <button onClick={() => {
            analytics.trackProjectView({
              project_type: 'podscriber',
              access_method: 'icon_click',
              source_window: 'random'
            });
            showWindow(setShowPodscriber, podscriberRef, 'podscriber', 'project', 'icon_click');
          }} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <Podcast strokeWidth={0.8} className="size-12"/>
            <span>podscriber.html</span>
          </button>
          <button onClick={() => {
            analytics.trackProjectView({
              project_type: 'mermaid_viewer',
              access_method: 'icon_click',
              source_window: 'random'
            });
            showWindow(setShowMermaidViewer, mermaidViewerRef, 'mermaid_viewer', 'project', 'icon_click');
          }} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <ScanText strokeWidth={0.8} className="size-12"/>
            <span>mermaid-viewer.html</span>
          </button>
          <button onClick={() => {
            analytics.trackProjectView({
              project_type: 'films_conversations',
              access_method: 'icon_click',
              source_window: 'random'
            });
            showWindow(setShowFilmsAndConversations, filmsAndConversationsRef, 'films_conversations', 'project', 'icon_click');
          }} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <Clapperboard strokeWidth={0.8} className="size-12"/>
            <span>films-and-conversations.html</span>
          </button>
          <button onClick={() => {
            analytics.trackProjectView({
              project_type: 'books_conversations',
              access_method: 'icon_click',
              source_window: 'random'
            });
            showWindow(setShowBooksAndConversations, booksAndConversationsRef, 'books_conversations', 'project', 'icon_click');
          }} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <LibraryBig strokeWidth={0.8} className="size-12"/>
            <span>books-and-conversations.html</span>
          </button>
        </WindowContent>

        <WindowContent view="list" className="@container">
          <ul>
            <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 pb-1">
              <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={() => {
                analytics.trackProjectView({
                  project_type: 'synthesiser',
                  access_method: 'list_click',
                  source_window: 'random'
                });
                showWindow(setShowSynthesiser, synthesiserRef, 'synthesiser', 'project', 'list_click');
              }} className="text-muted-foreground font-bold hover:bg-muted">Synthesiser</button></span>
              <span className="grow">Generate a Minto Pyramid synthesis of any content.</span>
            </li>
            <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t py-1">
              <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={() => {
                analytics.trackProjectView({
                  project_type: 'podscriber',
                  access_method: 'list_click',
                  source_window: 'random'
                });
                showWindow(setShowPodscriber, podscriberRef, 'podscriber', 'project', 'list_click');
              }} className="text-muted-foreground font-bold hover:bg-muted">Podscriber</button></span>
              <span className="grow">Transcribe podcast episodes and send them to your read-it-later queue.</span>
            </li>
            <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t py-1">
              <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={() => {
                analytics.trackProjectView({
                  project_type: 'mermaid_viewer',
                  access_method: 'list_click',
                  source_window: 'random'
                });
                showWindow(setShowMermaidViewer, mermaidViewerRef, 'mermaid_viewer', 'project', 'list_click');
              }} className="text-muted-foreground font-bold hover:bg-muted">Mermaid Viewer</button></span>
              <span className="grow">A lightweight, mobile-friendly Mermaid diagram viewer.</span>
            </li>
            <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t py-1">
              <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={() => {
                analytics.trackProjectView({
                  project_type: 'films_conversations',
                  access_method: 'list_click',
                  source_window: 'random'
                });
                showWindow(setShowFilmsAndConversations, filmsAndConversationsRef, 'films_conversations', 'project', 'list_click');
              }} className="text-muted-foreground font-bold hover:bg-muted">Films & Conversations</button></span>
              <span className="flex-grow">A film club bringing together people, documentaries, and discussions.</span>
            </li>
            <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t pt-1">
              <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={() => {
                analytics.trackProjectView({
                  project_type: 'books_conversations',
                  access_method: 'list_click',
                  source_window: 'random'
                });
                showWindow(setShowBooksAndConversations, booksAndConversationsRef, 'books_conversations', 'project', 'list_click');
              }} className="text-muted-foreground font-bold hover:bg-muted">Books & Conversations</button></span>
              <span className="grow">Roundtable discussions with good friends and great books.</span>
            </li>
          </ul>
        </WindowContent>
      </Window>
      )}

      {showExperience && (
      <Window ref={experienceRef} defaultView="icon" className="w-210 left-16 top-30" onClose={() => {
        analytics.trackWindowClose({
          window_type: 'experience',
          window_id: 'experience'
        });
        setShowExperience(false);
      }}>
        <WindowTitle>Experience</WindowTitle>

        <WindowContent view="icon">
          <button onClick={() => {
            analytics.trackCompanyView({
              company_name: 'mckinsey',
              access_method: 'icon_click',
              source_window: 'experience'
            });
            showWindow(setShowMcKinseyAndCompany, mckinseyAndCompanyRef, 'mckinsey', 'company', 'icon_click');
          }} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
            <FileText strokeWidth={0.8} className="size-12"/>
            <span>mckinsey-and-company.html</span>
          </button>
          <button onClick={() => {
            analytics.trackCompanyView({
              company_name: 'up42',
              access_method: 'icon_click',
              source_window: 'experience'
            });
            showWindow(setShowUP42, up42Ref, 'up42', 'company', 'icon_click');
          }} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
            <Folder strokeWidth={0.8} className="size-12"/>
            <span>up42</span>
          </button>
          <button onClick={() => {
            analytics.trackCompanyView({
              company_name: 'candis',
              access_method: 'icon_click',
              source_window: 'experience'
            });
            showWindow(setShowCandis, candisRef, 'candis', 'company', 'icon_click');
          }} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
            <FileText strokeWidth={0.8} className="size-12"/>
            <span>candis.html</span>
          </button>
          <button onClick={() => {
            analytics.trackCompanyView({
              company_name: 'urban_sports_club',
              access_method: 'icon_click',
              source_window: 'experience'
            });
            showWindow(setShowUrbanSportsClub, urbanSportsClubRef, 'urban_sports_club', 'company', 'icon_click');
          }} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-24 inline-flex flex-col items-center">
            <FileText strokeWidth={0.8} className="size-12"/>
            <span>urban-sports-club.html</span>
          </button>
        </WindowContent>

        <WindowContent view="list" className="@container">
          <ul>
            <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 pb-1">
              <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={() => {
                analytics.trackCompanyView({
                  company_name: 'mckinsey',
                  access_method: 'list_click',
                  source_window: 'experience'
                });
                showWindow(setShowMcKinseyAndCompany, mckinseyAndCompanyRef, 'mckinsey', 'company', 'list_click');
              }} className="text-muted-foreground font-bold hover:bg-muted">McKinsey & Company</button></span>
              <span className="flex-grow">Leading design across digital transformation initiatives.</span>
              <span className="flex-none order-first @3xl:order-last @3xl:text-right text-sm @3xl:text-base text-muted-foreground">2021–Present</span>
            </li>
            <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t py-1">
              <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={() => {
                analytics.trackCompanyView({
                  company_name: 'up42',
                  access_method: 'list_click',
                  source_window: 'experience'
                });
                showWindow(setShowUP42, up42Ref, 'up42', 'company', 'list_click');
              }} className="text-muted-foreground font-bold hover:bg-muted">UP42</button></span>
              <span className="flex-grow">Established design practice and launched several keystone projects.</span>
              <span className="flex-none order-first @3xl:order-last @3xl:text-right text-sm @3xl:text-base text-muted-foreground">2019–2021</span>
            </li>
            <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t py-1">
              <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={() => {
                analytics.trackCompanyView({
                  company_name: 'candis',
                  access_method: 'list_click',
                  source_window: 'experience'
                });
                showWindow(setShowCandis, candisRef, 'candis', 'company', 'list_click');
              }} className="text-muted-foreground font-bold hover:bg-muted">Candis</button></span>
              <span className="grow">Design team of one, hands-on from research to frontend.</span>
              <span className="flex-none order-first @3xl:order-last @3xl:text-right text-sm @3xl:text-base text-muted-foreground">2017–2019</span>
            </li>
            <li className="flex flex-col @3xl:flex-row @3xl:items-center @3xl:gap-4 border-t pt-1">
              <span className="flex-none font-serif @3xl:font-sans text-lg @3xl:text-base"><button onClick={() => {
                analytics.trackCompanyView({
                  company_name: 'urban_sports_club',
                  access_method: 'list_click',
                  source_window: 'experience'
                });
                showWindow(setShowUrbanSportsClub, urbanSportsClubRef, 'urban_sports_club', 'company', 'list_click');
              }} className="text-muted-foreground font-bold hover:bg-muted">Urban Sports Club</button></span>
              <span className="grow">Laid the technical and product foundations for European expansion.</span>
              <span className="flex-none order-first @3xl:order-last @3xl:text-right text-sm @3xl:text-base text-muted-foreground">2015</span>
            </li>
          </ul>
        </WindowContent>
      </Window>
      )}

      {showAbout && (
        <Window ref={aboutRef} className="w-125 left-1/2 top-1/2 -translate-1/2" onClose={() => {
          analytics.trackWindowClose({
            window_type: 'about',
            window_id: 'about'
          });
          setShowAbout(false);
        }}>
        <WindowTitle>About</WindowTitle>
        <WindowContent>
          <h1 className="text-4xl font-bold mt-6 mb-6">
            Hi, I’m John.
          </h1>
          <p className="text-xl leading-relaxed">
            Designer by practice, engineer by training, researcher at heart. I tackle complex product challenges by combining technical depth with user-centered design, turning ambiguity into actionable insights and shipped solutions.
          </p>
        </WindowContent>
      </Window>
      )}

      {showContact && (
        <Window ref={contactRef} className="w-1/2 left-1/2 top-1/2 -translate-1/2" onClose={() => setShowContact(false)}>
        <WindowTitle>Reach Out</WindowTitle>
        <WindowContent>
          <p>Send me an <a href="mailto:john@smallepic.com" className="text-muted-foreground font-bold hover:bg-muted">email</a>, or find me on <a href="https://www.linkedin.com/in/jngo/" className="text-muted-foreground font-bold hover:bg-muted">LinkedIn</a>, <a href="https://github.com/jngo" className="text-muted-foreground font-bold hover:bg-muted">GitHub</a>, or <a href="https://twitter.com/jngo" className="text-muted-foreground font-bold hover:bg-muted  ">Twitter</a>.</p>
        </WindowContent>
      </Window>
      )}

      {showMcKinseyAndCompany && (
      <Window ref={mckinseyAndCompanyRef} className="w-125 left-1/2 top-1/2 -translate-1/2" onClose={() => setShowMcKinseyAndCompany(false)}>
        <WindowTitle>McKinsey & Company</WindowTitle>
        <WindowContent>
          <p className="text-sm text-muted-foreground">2021–Present</p>
          <p className="font-serif text-xl mb-4">I’m currently leading design across digital transformation initiatives at <a href="https://www.mckinsey.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground font-bold hover:bg-muted">McKinsey & Company</a>.</p>
          <p>Leading a design team of three for a flagship product experience serving the daily visual graphics needs for management consultants across the Firm. I balance strategic leadership with hands-on design execution, bridging user experience and technical implementation across multiple initiatives.</p>
        </WindowContent>
      </Window>
      )}

      {showUP42 && (
      <Window ref={up42Ref} className="w-125 left-1/2 top-1/2 -translate-1/2" onClose={() => setShowUP42(false)}>
        <WindowTitle>UP42</WindowTitle>
        <WindowContent>
          <p className="text-sm text-muted-foreground">2019–2021</p>
          <p className="font-serif text-xl mb-4">I established design practice and launched several keystone projects at <a href="https://www.up42.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground font-bold hover:bg-muted">UP42</a>.</p>
          <p className="mb-4">As the first design hire within the Airbus Defence and Space subsidiary, I established design practice within the organisation.</p>
          <p className="mb-4">I was responsible for establishing a culture of continuous research through a combination of quantitative (SQL, BigQuery, etc.) and qualitative (user interviews, usability testing, etc.) techniques—to ensure decisions were made with the best data and insights at hand.</p>
          <p className="mb-4">I also worked closely with the frontend team to establish the foundations of our design system, through the design and implementation of token and component libraries.</p>
          <button onClick={() => {
            showWindow(setShowDocumentationHub, documentationHubRef, 'documentation_hub', 'project', 'window_content');
          }} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <FileVideo strokeWidth={0.8} className="size-12"/>
            <span>documentation-hub.mp4</span>
          </button>
          <a href="https://up42.com/blog/rethinking-our-documentation-experience" target="_blank" rel="noopener noreferrer" className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <FileSymlink strokeWidth={0.8} className="size-12"/>
            <span>documentation-experience.url</span>
          </a>
          <button onClick={() => {
            showWindow(setShowCatalogSearchPresentation, catalogSearchPresentationRef, 'catalog_search_presentation', 'project', 'window_content');
          }} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <FileChartPie strokeWidth={0.8} className="size-12"/>
            <span>catalog-search-case-study.figma</span>
          </button>
          <button onClick={() => {
            showWindow(setShowCatalogSearchPrototype, catalogSearchPrototypeRef, 'catalog_search_prototype', 'project', 'window_content');
          }} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <FileBox strokeWidth={0.8} className="size-12"/>
            <span>catalog-search-prototype.figma</span>
          </button>
          <button onClick={() => {
            showWindow(setShowGISOS, GISOSRef, 'gisos', 'project', 'window_content');
          }} className="text-xs/4 text-muted-foreground font-bold hover:bg-muted p-2 w-28 inline-flex flex-col items-center">
            <FileBox strokeWidth={0.8} className="size-12"/>
            <span>gis-os.figma</span>
          </button>
        </WindowContent>
      </Window>
      )}

      {showDocumentationHub && (
      <Window ref={documentationHubRef} className="w-200 aspect-16/9 left-1/2 top-1/2 -translate-1/2" onClose={() => setShowDocumentationHub(false)}>
        <WindowTitle>Documentation Hub</WindowTitle>
        <WindowContent className="p-0">
          <iframe
            src="https://www.youtube.com/embed/XpdvVltqWtc"
            allowFullScreen
            className="w-full h-full">
          </iframe>
        </WindowContent>
      </Window>
      )}

      {showCatalogSearchPresentation && (
        <Window ref={catalogSearchPresentationRef} className="w-200 aspect-7/5 left-1/2 top-1/2 -translate-1/2" onClose={() => setShowCatalogSearchPresentation(false)}>
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
      <Window ref={catalogSearchPrototypeRef} className="w-200 aspect-7/5 left-1/2 top-1/2 -translate-1/2" onClose={() => setShowCatalogSearchPrototype(false)}>
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

      {showGISOS && (
      <Window ref={GISOSRef} className="w-200 aspect-7/5 left-1/2 top-1/2 -translate-1/2" onClose={() => setShowGISOS(false)}>
        <WindowTitle>GIS OS</WindowTitle>
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
      <Window ref={candisRef} className="w-125 left-1/2 top-1/2 -translate-1/2" onClose={() => setShowCandis(false)}>
        <WindowTitle>Candis</WindowTitle>
        <WindowContent>
          <p className="text-sm text-muted-foreground">2017–2019</p>
          <p className="font-serif text-xl mb-2">I was a design team of one, hands-on from research to frontend at <a href="https://www.candis.io/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground font-bold hover:bg-muted">Candis</a>.</p>
          <p className="mb-2">As a single person design team, I was responsible for user experience across the portfolio of products at Candis. Practically speaking, I conducted user research, produced design concepts and prototypes, documented epics and user stories, and contributed UI enhancements to the React codebase.</p>
          <p>I also led the initiative to scale design to meet the needs of a growing engineering team through the development of a design system that served as the style guide and component library for current and future Candis products.</p>
        </WindowContent>
      </Window>
      )}

      {showUrbanSportsClub && (
      <Window ref={urbanSportsClubRef} className="w-125 left-1/2 top-1/2 -translate-1/2" onClose={() => setShowUrbanSportsClub(false)}>
        <WindowTitle>Urban Sports Club</WindowTitle>
        <WindowContent>
          <p className="text-sm text-muted-foreground">2015</p>
          <p className="font-serif text-xl mb-2">I helped lay the technical and product foundations for European expansion at <a href="https://urbansportsclub.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground font-bold hover:bg-muted">Urban Sports Club</a>.</p>
          <p className="mb-2">I played a key technical leadership and product design role, responsible for the digital transformation of key technical infrastructure and the venue check-in experience. My achievements were instrumental to the ambitious expansion of the flat-rate sports membership from Berlin into over 88 cities and 8,000 sporting venues.</p>
          <p>My key achievement was leading the delivery team, where I designed the REST API specification and mobile app experiences. Within three months, we replaced the existing manual membership card and log sheet processes with an API and mobile apps enabling members to check-in with their iOS and Android devices.</p>
        </WindowContent>
      </Window>
      )}

      {showSynthesiser && (
      <Window ref={synthesiserRef} className="w-96 left-1/2 top-1/2 -translate-1/2" onClose={() => setShowSynthesiser(false)}>
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
            <a href="https://synthesiser.smallepic.com/" target="_blank" rel="noopener" onClick={() => {
              analytics.trackButtonClick({
                button_type: 'check_out',
                button_text: 'Check Out Synthesiser',
                destination: 'https://synthesiser.smallepic.com/',
                parent_context: 'synthesiser_window'
              });
              analytics.trackExternalLinkSelect({
                link_type: 'project',
                destination: 'https://synthesiser.smallepic.com/',
                source_context: 'window_content'
              });
            }}>
              Check Out Synthesiser
            </a>
          </Button>
        </WindowContent>
      </Window>
      )}

      {showPodscriber && (
      <Window ref={podscriberRef} className="w-96 left-1/2 top-1/2 -translate-1/2" onClose={() => setShowPodscriber(false)}>
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
            <a href="https://podscriber.smallepic.com/" target="_blank" rel="noopener" onClick={() => {
              analytics.trackButtonClick({
                button_type: 'check_out',
                button_text: 'Check Out Podscriber',
                destination: 'https://podscriber.smallepic.com/',
                parent_context: 'podscriber_window'
              });
              analytics.trackExternalLinkSelect({
                link_type: 'project',
                destination: 'https://podscriber.smallepic.com/',
                source_context: 'window_content'
              });
            }}>
              Check Out Podscriber
            </a>
          </Button>
        </WindowContent>
      </Window>
      )}

      {showMermaidViewer && (
      <Window ref={mermaidViewerRef} className="w-96 left-1/2 top-1/2 -translate-1/2" onClose={() => setShowMermaidViewer(false)}>
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
          <p className="mb-4">As a tool for creating diagrams and visualisations using plain text, <a href="https://mermaid.js.org/" className="underline">Mermaid</a> is ideally suited for transforming the outputs of large language models (LLMs) into structured formats.</p>
          <Button asChild className="w-full">
            <a href="https://mermaid.smallepic.com/" target="_blank" rel="noopener">
              Check Out Mermaid Viewer
            </a>
          </Button>
        </WindowContent>
      </Window>
      )}

      {showFilmsAndConversations && (
      <Window ref={filmsAndConversationsRef} className="w-96 left-1/2 top-1/2 -translate-1/2" onClose={() => setShowFilmsAndConversations(false)}>
        <WindowTitle>Films & Conversations</WindowTitle>
        <WindowContent>
          <p className="font-serif text-xl mb-2">A monthly film club bringing together people, documentaries, and discussions.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">Jekyll</Badge>
            <Badge variant="secondary">Github Pages</Badge>
          </div>
          <Button asChild className="w-full">
            <a href="http://filmsandconversations.com/" target="_blank" rel="noopener">
              Check Out Films & Conversations
            </a>
          </Button>
        </WindowContent>
      </Window>
      )}

      {showBooksAndConversations && (
      <Window ref={booksAndConversationsRef} className="w-96 left-1/2 top-1/2 -translate-1/2" onClose={() => setShowBooksAndConversations(false)}>
        <WindowTitle>Books & Conversations</WindowTitle>
        <WindowContent>
          <p className="font-serif text-lg mb-2">Roundtable discussions with good friends and great books.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">Jekyll</Badge>
            <Badge variant="secondary">Github Pages</Badge>
          </div>
          <Button asChild className="w-full">
            <a href="http://booksandconversations.com/" target="_blank" rel="noopener">
              Check Out Books & Conversations
            </a>
          </Button>
        </WindowContent>
      </Window>
      )}
    </div>
  );
}
