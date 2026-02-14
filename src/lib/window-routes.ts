export type WindowId =
  | "about"
  | "johnNgo"
  | "experience"
  | "mckinseyAndCompany"
  | "up42"
  | "documentationHubCaseStudy"
  | "catalogSearchCaseStudy"
  | "catalogSearchPrototype"
  | "marketingWebsiteCaseStudy"
  | "gisosPrototype"
  | "candis"
  | "urbanSportsClub"
  | "exploration"
  | "synthesiser"
  | "podscriber"
  | "mermaidViewer"
  | "filmsAndConversations"
  | "booksAndConversations";

interface WindowRouteEntry {
  windowId: WindowId;
  segments: string[];
}

export const WINDOW_ROUTE_ENTRIES: WindowRouteEntry[] = [
  { windowId: "about", segments: ["about"] },
  { windowId: "johnNgo", segments: ["about", "john-ngo"] },

  { windowId: "experience", segments: ["experience"] },
  { windowId: "mckinseyAndCompany", segments: ["experience", "mckinsey-and-company"] },
  { windowId: "up42", segments: ["experience", "up42"] },
  { windowId: "documentationHubCaseStudy", segments: ["experience", "up42", "documentation-hub-case-study"] },
  { windowId: "catalogSearchCaseStudy", segments: ["experience", "up42", "catalog-search-case-study"] },
  { windowId: "catalogSearchPrototype", segments: ["experience", "up42", "catalog-search-prototype"] },
  { windowId: "marketingWebsiteCaseStudy", segments: ["experience", "up42", "marketing-website-case-study"] },
  { windowId: "gisosPrototype", segments: ["experience", "up42", "gisos-prototype"] },
  { windowId: "candis", segments: ["experience", "candis"] },
  { windowId: "urbanSportsClub", segments: ["experience", "urban-sports-club"] },

  { windowId: "exploration", segments: ["exploration"] },
  { windowId: "synthesiser", segments: ["exploration", "synthesiser"] },
  { windowId: "podscriber", segments: ["exploration", "podscriber"] },
  { windowId: "mermaidViewer", segments: ["exploration", "mermaid-viewer"] },
  { windowId: "filmsAndConversations", segments: ["exploration", "films-and-conversations"] },
  { windowId: "booksAndConversations", segments: ["exploration", "books-and-conversations"] },
];

const pathToWindowId = new Map<string, WindowId>(
  WINDOW_ROUTE_ENTRIES.map(({ windowId, segments }) => [segments.join("/"), windowId]),
);

const windowIdToPath = new Map<WindowId, string>(
  WINDOW_ROUTE_ENTRIES.map(({ windowId, segments }) => [windowId, `/${segments.join("/")}`]),
);

export const getPathForWindow = (windowId: WindowId): string | null => {
  return windowIdToPath.get(windowId) ?? null;
};

export const getOpenWindowIdsForSegments = (segments: string[]): WindowId[] | null => {
  const openWindowIds: WindowId[] = [];

  for (let i = 1; i <= segments.length; i += 1) {
    const prefix = segments.slice(0, i).join("/");
    const windowId = pathToWindowId.get(prefix);

    if (!windowId) {
      return null;
    }

    openWindowIds.push(windowId);
  }

  return openWindowIds;
};
