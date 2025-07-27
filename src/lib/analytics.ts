import { track } from '@vercel/analytics';
import { v4 as uuidv4 } from 'uuid';

// Types for event properties
export interface BaseEventProperties {
  _v: number;
  event_id: string;
  event_ts: string;
  user_id: string;
  session_id: string;
  event_index: number;
  app_version: string;
  page: string;
  referrer: string;
  viewport_size: string;
  user_agent: string;
}

export interface MenubarItemSelectProperties {
  menu_category: 'john_ngo' | 'experience' | 'random' | 'contact';
  item_name: string;
  item_type: 'main' | 'submenu';
}

export interface ExternalLinkSelectProperties {
  link_type: 'email' | 'linkedin' | 'github' | 'twitter' | 'project' | 'other';
  destination: string;
  source_context: 'menubar' | 'window_content' | 'button';
}

export interface WindowOpenProperties {
  window_type: 'about' | 'experience' | 'random' | 'contact' | 'project' | 'company';
  window_id: string;
  trigger_source: 'menubar' | 'window_content' | 'icon_click' | 'list_click';
  default_view?: 'icon' | 'list' | 'default';
}

export interface WindowCloseProperties {
  window_type: 'about' | 'experience' | 'random' | 'contact' | 'project' | 'company';
  window_id: string;
  session_duration_ms: number;
}

export interface WindowDragProperties {
  window_type: 'about' | 'experience' | 'random' | 'contact' | 'project' | 'company';
  window_id: string;
  drag_distance_px: number;
}

export interface WindowFocusProperties {
  window_type: 'about' | 'experience' | 'random' | 'contact' | 'project' | 'company';
  window_id: string;
  focus_trigger: 'click' | 'bring_to_front_api' | 'open';
}

export interface WindowViewChangeProperties {
  window_type: 'experience' | 'random';
  window_id: string;
  from_view: 'icon' | 'list';
  to_view: 'icon' | 'list';
}

export interface ProjectViewProperties {
  project_type: 'synthesiser' | 'podscriber' | 'mermaid_viewer' | 'films_conversations' | 'books_conversations';
  access_method: 'icon_click' | 'list_click' | 'menubar';
  source_window: string;
}

export interface CompanyViewProperties {
  company_name: 'mckinsey' | 'up42' | 'candis' | 'urban_sports_club';
  access_method: 'icon_click' | 'list_click' | 'menubar';
  source_window: string;
}

export interface EmbeddedContentInteractProperties {
  content_type: 'youtube_video' | 'figma_prototype' | 'figma_presentation';
  content_id: string;
  interaction_type: 'play' | 'pause' | 'fullscreen' | 'navigate';
  parent_window: string;
}

export interface ButtonClickProperties {
  button_type: 'check_out' | 'external_link' | 'action';
  button_text: string;
  destination: string;
  parent_context: string;
}

export interface PageLoadProperties {
  initial_windows_open: string; // Comma-separated list
  viewport_width: number;
  viewport_height: number;
  user_agent: string;
}

export interface SessionTimeoutProperties {
  session_duration_ms: number;
  windows_interacted: string; // Comma-separated list
  total_interactions: number;
}

// Analytics state management
class AnalyticsManager {
  private userId: string;
  private sessionId: string;
  private eventIndex: number = 0;
  private sessionStartTime: number;
  private windowOpenTimes: Map<string, number> = new Map();
  private windowsInteracted: Set<string> = new Set();

  constructor() {
    this.userId = this.getOrCreateUserId();
    this.sessionId = this.getOrCreateSessionId();
    this.sessionStartTime = Date.now();
  }

  private getOrCreateUserId(): string {
    if (typeof window === 'undefined') return 'server-user';
    
    const stored = localStorage.getItem('analytics_user_id');
    if (stored) return stored;
    
    const newId = uuidv4();
    localStorage.setItem('analytics_user_id', newId);
    return newId;
  }

  private getOrCreateSessionId(): string {
    if (typeof window === 'undefined') return 'server-session';
    
    const stored = sessionStorage.getItem('analytics_session_id');
    if (stored) return stored;
    
    const newId = uuidv4();
    sessionStorage.setItem('analytics_session_id', newId);
    return newId;
  }

  private getBaseProperties(): BaseEventProperties {
    return {
      _v: 1,
      event_id: uuidv4(),
      event_ts: new Date().toISOString(),
      user_id: this.userId,
      session_id: this.sessionId,
      event_index: this.eventIndex++,
      app_version: process.env.npm_package_version || '0.1.0',
      page: '/',
      referrer: typeof document !== 'undefined' ? document.referrer || '' : '',
      viewport_size: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '0x0',
      user_agent: typeof navigator !== 'undefined' ? this.truncateUserAgent(navigator.userAgent) : 'Unknown',
    };
  }

  private truncateUserAgent(userAgent: string): string {
    // Extract browser family and version for privacy
    const match = userAgent.match(/(Chrome|Firefox|Safari|Edge)\/[\d.]+/);
    return match ? match[0] : 'Unknown';
  }

  private isClient(): boolean {
    return typeof window !== 'undefined';
  }

  // Window session tracking
  recordWindowOpen(windowId: string): void {
    this.windowOpenTimes.set(windowId, Date.now());
    this.windowsInteracted.add(windowId);
  }

  getWindowSessionDuration(windowId: string): number {
    const openTime = this.windowOpenTimes.get(windowId);
    if (!openTime) return 0;
    return Date.now() - openTime;
  }

  // Event tracking methods
  trackMenubarItemSelect(properties: MenubarItemSelectProperties): void {
    if (!this.isClient()) return;
    
    track('menubar_item_select', {
      ...this.getBaseProperties(),
      ...properties,
    });
  }

  trackExternalLinkSelect(properties: ExternalLinkSelectProperties): void {
    if (!this.isClient()) return;
    
    track('external_link_select', {
      ...this.getBaseProperties(),
      ...properties,
    });
  }

  trackWindowOpen(properties: WindowOpenProperties): void {
    if (!this.isClient()) return;
    
    this.recordWindowOpen(properties.window_id);
    track('window_open', {
      ...this.getBaseProperties(),
      ...properties,
    });
  }

  trackWindowClose(properties: Omit<WindowCloseProperties, 'session_duration_ms'>): void {
    if (!this.isClient()) return;
    
    const sessionDuration = this.getWindowSessionDuration(properties.window_id);
    this.windowOpenTimes.delete(properties.window_id);
    
    track('window_close', {
      ...this.getBaseProperties(),
      ...properties,
      session_duration_ms: sessionDuration,
    });
  }

  trackWindowDrag(properties: WindowDragProperties): void {
    if (!this.isClient()) return;
    
    track('window_drag', {
      ...this.getBaseProperties(),
      ...properties,
    });
  }

  trackWindowFocus(properties: WindowFocusProperties): void {
    if (!this.isClient()) return;
    
    track('window_focus', {
      ...this.getBaseProperties(),
      ...properties,
    });
  }

  trackWindowViewChange(properties: WindowViewChangeProperties): void {
    if (!this.isClient()) return;
    
    track('window_view_change', {
      ...this.getBaseProperties(),
      ...properties,
    });
  }

  trackProjectView(properties: ProjectViewProperties): void {
    if (!this.isClient()) return;
    
    track('project_view', {
      ...this.getBaseProperties(),
      ...properties,
    });
  }

  trackCompanyView(properties: CompanyViewProperties): void {
    if (!this.isClient()) return;
    
    track('company_view', {
      ...this.getBaseProperties(),
      ...properties,
    });
  }

  trackEmbeddedContentInteract(properties: EmbeddedContentInteractProperties): void {
    if (!this.isClient()) return;
    
    track('embedded_content_interact', {
      ...this.getBaseProperties(),
      ...properties,
    });
  }

  trackButtonClick(properties: ButtonClickProperties): void {
    if (!this.isClient()) return;
    
    track('button_click', {
      ...this.getBaseProperties(),
      ...properties,
    });
  }

  trackPageLoad(properties: Omit<PageLoadProperties, 'viewport_width' | 'viewport_height' | 'user_agent'>): void {
    if (!this.isClient()) return;
    
    track('page_load', {
      ...this.getBaseProperties(),
      ...properties,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      user_agent: this.truncateUserAgent(navigator.userAgent),
    });
  }

  trackSessionTimeout(): void {
    if (!this.isClient()) return;
    
    const sessionDuration = Date.now() - this.sessionStartTime;
    track('session_timeout', {
      ...this.getBaseProperties(),
      session_duration_ms: sessionDuration,
      windows_interacted: Array.from(this.windowsInteracted).join(','),
      total_interactions: this.eventIndex,
    });
  }
}

// Export singleton instance
export const analytics = new AnalyticsManager();

// Utility functions for common tracking patterns
export const trackWindowAction = (
  action: 'open' | 'close',
  windowType: WindowOpenProperties['window_type'],
  windowId: string,
  additionalProps: Partial<WindowOpenProperties> = {}
) => {
  if (action === 'open') {
    analytics.trackWindowOpen({
      window_type: windowType,
      window_id: windowId,
      trigger_source: 'menubar',
      ...additionalProps,
    } as WindowOpenProperties);
  } else {
    analytics.trackWindowClose({
      window_type: windowType,
      window_id: windowId,
    });
  }
};

export const trackNavigation = (
  menuCategory: MenubarItemSelectProperties['menu_category'],
  itemName: string,
  itemType: MenubarItemSelectProperties['item_type'] = 'main'
) => {
  analytics.trackMenubarItemSelect({
    menu_category: menuCategory,
    item_name: itemName,
    item_type: itemType,
  });
};

// Initialize session tracking
if (typeof window !== 'undefined') {
  // Track page load
  window.addEventListener('load', () => {
    analytics.trackPageLoad({
      initial_windows_open: 'about,experience,random', // Default windows
    });
  });

  // Track session end
  window.addEventListener('beforeunload', () => {
    analytics.trackSessionTimeout();
  });

  // Track visibility changes for session management
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Page is hidden, could track as session pause
    } else {
      // Page is visible again, could track as session resume
    }
  });
}