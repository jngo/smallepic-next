export const WINDOW_KEYS = [
  "about",
  "johnNgo",
  "experience",
  "exploration",
  "mermaidViewer",
  "podscriber",
  "synthesiser",
  "filmsAndConversations",
  "booksAndConversations",
  "mckinseyAndCompany",
  "up42",
  "documentationHubCaseStudy",
  "catalogSearchPrototype",
  "catalogSearchCaseStudy",
  "marketingWebsiteCaseStudy",
  "gisosPrototype",
  "candis",
  "urbanSportsClub",
] as const

export type WindowKey = (typeof WINDOW_KEYS)[number]
export type WindowsState = Record<WindowKey, boolean>

interface WindowRouteNode {
  segment: string
  parent?: WindowKey
}

const WINDOW_ROUTE_NODES: Record<WindowKey, WindowRouteNode> = {
  about: { segment: "about" },
  johnNgo: { segment: "john-ngo", parent: "about" },
  experience: { segment: "experience" },
  exploration: { segment: "exploration" },
  mermaidViewer: { segment: "mermaid-viewer", parent: "exploration" },
  podscriber: { segment: "podscriber", parent: "exploration" },
  synthesiser: { segment: "synthesiser", parent: "exploration" },
  filmsAndConversations: { segment: "films-and-conversations", parent: "exploration" },
  booksAndConversations: { segment: "books-and-conversations", parent: "exploration" },
  mckinseyAndCompany: { segment: "mckinsey-and-company", parent: "experience" },
  up42: { segment: "up42", parent: "experience" },
  documentationHubCaseStudy: { segment: "documentation-hub-case-study", parent: "up42" },
  catalogSearchPrototype: { segment: "catalog-search-prototype", parent: "up42" },
  catalogSearchCaseStudy: { segment: "catalog-search-case-study", parent: "up42" },
  marketingWebsiteCaseStudy: { segment: "marketing-website-case-study", parent: "up42" },
  gisosPrototype: { segment: "gis-os-prototype", parent: "up42" },
  candis: { segment: "candis", parent: "experience" },
  urbanSportsClub: { segment: "urban-sports-club", parent: "experience" },
}

const windowChainCache = new Map<WindowKey, WindowKey[]>()

export const getWindowChain = (key: WindowKey): WindowKey[] => {
  const cached = windowChainCache.get(key)
  if (cached) return cached

  const parent = WINDOW_ROUTE_NODES[key].parent
  const chain = parent ? [...getWindowChain(parent), key] : [key]
  windowChainCache.set(key, chain)
  return chain
}

export const getWindowPathSegments = (key: WindowKey): string[] =>
  getWindowChain(key).map((chainKey) => WINDOW_ROUTE_NODES[chainKey].segment)

export const getCanonicalPathForWindow = (key: WindowKey): string =>
  `/${getWindowPathSegments(key).join("/")}`

const pathToWindowKey = new Map<string, WindowKey>(
  WINDOW_KEYS.map((key) => [getWindowPathSegments(key).join("/"), key]),
)

const normalizePathSegments = (segments: string[]): string[] =>
  segments.map((segment) => segment.trim().toLowerCase()).filter(Boolean)

export interface ResolvedWindowPath {
  key: WindowKey
  chain: WindowKey[]
  pathSegments: string[]
  canonicalPath: string
}

export const resolveWindowPathSegments = (pathSegments: string[]): ResolvedWindowPath | null => {
  const normalizedSegments = normalizePathSegments(pathSegments)
  if (normalizedSegments.length === 0) return null

  const key = pathToWindowKey.get(normalizedSegments.join("/"))
  if (!key) return null

  return {
    key,
    chain: getWindowChain(key),
    pathSegments: normalizedSegments,
    canonicalPath: `/${normalizedSegments.join("/")}`,
  }
}

export const getWindowAndDescendantWindowKeys = (key: WindowKey): WindowKey[] =>
  WINDOW_KEYS.filter((candidate) => getWindowChain(candidate).includes(key))

export const getAllWindowPathSegments = (): string[][] =>
  WINDOW_KEYS.map((windowKey) => getWindowPathSegments(windowKey))

export const DEFAULT_WINDOWS_STATE: WindowsState = {
  about: true,
  johnNgo: false,
  experience: true,
  exploration: true,
  mermaidViewer: false,
  podscriber: false,
  synthesiser: false,
  filmsAndConversations: false,
  booksAndConversations: false,
  mckinseyAndCompany: false,
  up42: false,
  documentationHubCaseStudy: false,
  catalogSearchPrototype: false,
  catalogSearchCaseStudy: false,
  marketingWebsiteCaseStudy: false,
  gisosPrototype: false,
  candis: false,
  urbanSportsClub: false,
}

export const buildWindowsStateFromChain = (chain: WindowKey[]): WindowsState => {
  const state: WindowsState = { ...DEFAULT_WINDOWS_STATE }
  for (const key of WINDOW_KEYS) {
    state[key] = false
  }
  chain.forEach((key) => {
    state[key] = true
  })
  return state
}
