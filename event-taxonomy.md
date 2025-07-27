# Event Taxonomy for smallepic Portfolio

## Overview

This document defines the event taxonomy for John Ngo's portfolio website (smallepic.com), a desktop-like interface showcasing professional experience and projects through draggable windows and menubar navigation.

## Event Categories

### 1. Navigation Events

#### `menubar_item_select`
**Description:** User selects an item from the top menubar
**Properties:**
- `menu_category` (enum): `"john_ngo"|"experience"|"random"|"contact"`
- `item_name` (string): Name of the selected menu item
- `item_type` (enum): `"main"|"submenu"`

**Examples:**
```javascript
track('menubar_item_select', {
  menu_category: 'experience',
  item_name: 'McKinsey & Company',
  item_type: 'submenu'
});
```

#### `external_link_select`
**Description:** User clicks an external link (email, LinkedIn, GitHub, Twitter, project links)
**Properties:**
- `link_type` (enum): `"email"|"linkedin"|"github"|"twitter"|"project"|"other"`
- `destination` (string): Target URL or identifier
- `source_context` (enum): `"menubar"|"window_content"|"button"`

### 2. Window Management Events

#### `window_open`
**Description:** A window is opened/shown
**Properties:**
- `window_type` (enum): `"about"|"experience"|"random"|"contact"|"project"|"company"`
- `window_id` (string): Specific window identifier
- `trigger_source` (enum): `"menubar"|"window_content"|"icon_click"|"list_click"`
- `default_view` (enum): `"icon"|"list"|"default"`

#### `window_close`
**Description:** A window is closed
**Properties:**
- `window_type` (enum): `"about"|"experience"|"random"|"contact"|"project"|"company"`
- `window_id` (string): Specific window identifier
- `session_duration_ms` (number): How long the window was open

#### `window_drag`
**Description:** User drags a window to reposition it
**Properties:**
- `window_type` (enum): `"about"|"experience"|"random"|"contact"|"project"|"company"`
- `window_id` (string): Specific window identifier
- `drag_distance_px` (number): Total distance dragged

#### `window_focus`
**Description:** A window is brought to the front/focused
**Properties:**
- `window_type` (enum): `"about"|"experience"|"random"|"contact"|"project"|"company"`
- `window_id` (string): Specific window identifier
- `focus_trigger` (enum): `"click"|"bring_to_front_api"|"open"`

### 3. Window View Events

#### `window_view_change`
**Description:** User switches between icon and list view in a window
**Properties:**
- `window_type` (enum): `"experience"|"random"`
- `window_id` (string): Specific window identifier
- `from_view` (enum): `"icon"|"list"`
- `to_view` (enum): `"icon"|"list"`

### 4. Project/Content Interaction Events

#### `project_view`
**Description:** User opens a project window
**Properties:**
- `project_type` (enum): `"synthesiser"|"podscriber"|"mermaid_viewer"|"films_conversations"|"books_conversations"`
- `access_method` (enum): `"icon_click"|"list_click"|"menubar"`
- `source_window` (string): Window from which project was accessed

#### `company_view`
**Description:** User opens a company/experience window
**Properties:**
- `company_name` (enum): `"mckinsey"|"up42"|"candis"|"urban_sports_club"`
- `access_method` (enum): `"icon_click"|"list_click"|"menubar"`
- `source_window` (string): Window from which company was accessed

#### `embedded_content_interact`
**Description:** User interacts with embedded content (YouTube videos, Figma prototypes)
**Properties:**
- `content_type` (enum): `"youtube_video"|"figma_prototype"|"figma_presentation"`
- `content_id` (string): Identifier for the specific content
- `interaction_type` (enum): `"play"|"pause"|"fullscreen"|"navigate"`
- `parent_window` (string): Window containing the embedded content

#### `button_click`
**Description:** User clicks action buttons (Check Out, external project links)
**Properties:**
- `button_type` (enum): `"check_out"|"external_link"|"action"`
- `button_text` (string): Text displayed on the button
- `destination` (string): Target URL or action
- `parent_context` (string): Window or section containing the button

### 5. Page/Session Events

#### `page_load`
**Description:** Initial page load and setup
**Properties:**
- `initial_windows_open` (array): List of windows open by default
- `viewport_width` (number): Browser viewport width
- `viewport_height` (number): Browser viewport height
- `user_agent` (string): Browser user agent (truncated for privacy)

#### `session_timeout`
**Description:** User session timeout or extended inactivity
**Properties:**
- `session_duration_ms` (number): Total session duration
- `windows_interacted` (array): List of windows that were opened during session
- `total_interactions` (number): Total number of tracked interactions

## Standard Properties

All events include these standard properties:

### Required Telemetry Envelope
- `_v` (number): Schema version (starts at 1)
- `event_id` (string): UUID for this event
- `event_ts` (string): ISO 8601 timestamp
- `user_id` (string): Anonymous user identifier
- `session_id` (string): Session identifier
- `event_index` (number): Monotonic counter for this session

### Context Properties
- `app_version` (string): Application version from package.json
- `page` (string): Always "/" for this SPA
- `referrer` (string): Document referrer
- `viewport_size` (string): "width x height"
- `user_agent` (string): Browser user agent (truncated)

### Performance Properties (when applicable)
- `duration_ms` (number): Time taken for operation
- `success` (boolean): Whether operation completed successfully

## Event Definitions

### High-Priority Events (Implement First)

1. **`window_open`** - Core interaction, tracks window usage patterns
2. **`menubar_item_select`** - Primary navigation method
3. **`external_link_select`** - Conversion/engagement tracking
4. **`project_view`** - Key content engagement
5. **`button_click`** - Action completion tracking

### Medium-Priority Events

6. **`window_view_change`** - UI preference tracking
7. **`company_view`** - Professional content engagement
8. **`window_close`** - Engagement duration tracking

### Low-Priority Events

9. **`window_drag`** - Advanced UI interaction
10. **`window_focus`** - Window management behavior
11. **`embedded_content_interact`** - Rich media engagement
12. **`session_timeout`** - Session analysis

## Implementation Notes

### Sampling Strategy
- All events tracked at 100% for this portfolio site (low traffic expected)
- Consider 10% sampling for `window_drag` and `window_focus` if volume becomes high

### Privacy Considerations
- No PII collected
- User agent truncated to browser family + version
- URLs and referrers sanitized of query parameters

### Performance Considerations
- Events debounced where appropriate (drag events: 100ms)
- Batch events on page unload
- Use `navigator.sendBeacon` for reliable delivery

### Testing Strategy
- E2E tests verify events fire with correct properties
- Debug mode shows all events in console during development
- Schema validation in CI/CD pipeline

## Schema Versions

### Version 1 (Initial)
- All events and properties as defined above
- Standard telemetry envelope
- Basic context properties

### Future Versions
- v2: Add A/B testing properties
- v3: Add performance timing details
- v4: Add accessibility interaction tracking

## Analytics Questions This Taxonomy Answers

1. **Which projects get the most engagement?**
   - Filter: `project_view` events, group by `project_type`

2. **How do users navigate the site?**
   - Funnel: `page_load` → `menubar_item_select` → `window_open` → `project_view`

3. **What's the preferred view mode?**
   - Filter: `window_view_change` events, analyze `to_view` distribution

4. **Which external links drive the most traffic out?**
   - Filter: `external_link_select`, group by `destination` and `link_type`

5. **How long do users engage with content?**
   - Calculate: `window_close.session_duration_ms` by `window_type`

6. **What's the window usage pattern?**
   - Analyze: `window_open` frequency and combinations

7. **Are users engaging with embedded content?**
   - Filter: `embedded_content_interact`, group by `content_type`