# Analytics Implementation Guide

## Overview

This document describes the implementation of custom event tracking for the smallepic portfolio using Vercel Web Analytics. The implementation follows a comprehensive event taxonomy designed to capture user interactions across the desktop-like interface.

## Files Created/Modified

### New Files
- `src/lib/analytics.ts` - Core analytics library with TypeScript interfaces and tracking methods
- `event-taxonomy.md` - Complete event taxonomy specification
- `analytics-implementation.md` - This implementation guide

### Modified Files
- `src/app/page.tsx` - Added analytics tracking to all user interactions
- `src/components/ui/window.tsx` - Added view change tracking
- `package.json` - Added uuid dependency

## Analytics Architecture

### Core Components

1. **AnalyticsManager Class** (`src/lib/analytics.ts`)
   - Singleton pattern for consistent state management
   - Handles user ID and session ID generation
   - Manages window session tracking
   - Provides typed interfaces for all events

2. **Event Taxonomy** (`event-taxonomy.md`)
   - 12 distinct event types covering all user interactions
   - Follows object_action naming convention
   - Includes standard telemetry envelope
   - Prioritized implementation roadmap

3. **Integration Points** (`src/app/page.tsx`)
   - Menubar navigation tracking
   - Window management (open/close/focus)
   - Project and company view tracking
   - External link tracking
   - Button click tracking

## Implemented Events

### High Priority (✅ Implemented)
1. **`window_open`** - Tracks when windows are opened
2. **`menubar_item_select`** - Tracks menubar navigation
3. **`external_link_select`** - Tracks external link clicks
4. **`project_view`** - Tracks project window access
5. **`button_click`** - Tracks action button clicks

### Medium Priority (✅ Implemented)
6. **`window_view_change`** - Tracks icon/list view toggles
7. **`company_view`** - Tracks company/experience window access
8. **`window_close`** - Tracks window close with session duration

### Low Priority (🚧 Partially Implemented)
9. **`window_drag`** - Window repositioning (framework ready)
10. **`window_focus`** - Window focus changes (framework ready)
11. **`embedded_content_interact`** - Rich media interactions (framework ready)
12. **`session_timeout`** - Session analysis (implemented)

## Key Features

### TypeScript Integration
- Fully typed interfaces for all event properties
- Compile-time validation of event parameters
- IntelliSense support for event tracking

### Server-Side Rendering Compatible
- Guards against localStorage/sessionStorage access during SSR
- Graceful fallbacks for server-side execution
- No hydration errors

### Privacy-First Design
- No PII collection
- Truncated user agent strings
- Anonymous user identification
- Query parameter sanitization

### Performance Optimized
- Client-side only execution
- Debounced drag events (ready for implementation)
- Efficient session management
- Minimal bundle impact

## Usage Examples

### Basic Event Tracking
```typescript
import { analytics } from '@/lib/analytics';

// Track menubar navigation
analytics.trackMenubarItemSelect({
  menu_category: 'experience',
  item_name: 'McKinsey & Company',
  item_type: 'submenu'
});

// Track window opening
analytics.trackWindowOpen({
  window_type: 'project',
  window_id: 'synthesiser',
  trigger_source: 'menubar'
});
```

### External Link Tracking
```typescript
// Track external link clicks
analytics.trackExternalLinkSelect({
  link_type: 'project',
  destination: 'https://synthesiser.smallepic.com/',
  source_context: 'window_content'
});
```

### Button Click Tracking
```typescript
// Track action buttons
analytics.trackButtonClick({
  button_type: 'check_out',
  button_text: 'Check Out Synthesiser',
  destination: 'https://synthesiser.smallepic.com/',
  parent_context: 'synthesiser_window'
});
```

## Event Properties Schema

### Standard Telemetry Envelope (All Events)
```typescript
{
  _v: 1,                    // Schema version
  event_id: "uuid",         // Unique event identifier
  event_ts: "ISO 8601",     // Event timestamp
  user_id: "uuid",          // Anonymous user ID
  session_id: "uuid",       // Session identifier
  event_index: 42,          // Monotonic counter
  app_version: "0.1.0",     // Application version
  page: "/",                // Page path
  referrer: "string",       // Document referrer
  viewport_size: "1920x1080", // Browser viewport
  user_agent: "Chrome/91.0"   // Truncated UA
}
```

### Event-Specific Properties
Each event type has its own interface with strongly typed properties. See `src/lib/analytics.ts` for complete definitions.

## Analytics Dashboard Queries

### Key Metrics to Track

1. **Project Engagement**
   ```sql
   SELECT project_type, COUNT(*) as views
   FROM events 
   WHERE name = 'project_view'
   GROUP BY project_type
   ORDER BY views DESC
   ```

2. **Navigation Patterns**
   ```sql
   SELECT menu_category, item_name, COUNT(*) as clicks
   FROM events 
   WHERE name = 'menubar_item_select'
   GROUP BY menu_category, item_name
   ```

3. **External Link Performance**
   ```sql
   SELECT link_type, destination, COUNT(*) as clicks
   FROM events 
   WHERE name = 'external_link_select'
   GROUP BY link_type, destination
   ```

4. **Window Usage Patterns**
   ```sql
   SELECT window_type, 
          COUNT(*) as opens,
          AVG(session_duration_ms) as avg_duration
   FROM events 
   WHERE name IN ('window_open', 'window_close')
   GROUP BY window_type
   ```

## Testing

### Development Testing
1. Start development server: `npm run dev`
2. Open browser console
3. Navigate through the interface
4. Verify events appear in Vercel Analytics dashboard

### Event Validation
- All events include required telemetry envelope
- TypeScript compilation ensures property validity
- Runtime guards prevent server-side execution

## Deployment

### Production Considerations
1. Verify Vercel Analytics is enabled for the project
2. Check that `@vercel/analytics` is in production dependencies
3. Monitor event volume in Vercel dashboard
4. Set up alerts for unusual patterns

### Performance Monitoring
- Events are tracked client-side only
- No impact on server-side rendering
- Minimal JavaScript bundle increase (~5KB)

## Future Enhancements

### Phase 2 Features
1. **Enhanced Window Tracking**
   - Drag distance and patterns
   - Focus duration analysis
   - Multi-window usage patterns

2. **Rich Media Analytics**
   - YouTube video engagement
   - Figma prototype interactions
   - Embedded content performance

3. **A/B Testing Integration**
   - Feature flag tracking
   - Experiment attribution
   - Conversion funnel analysis

### Advanced Analytics
1. **User Journey Analysis**
   - Session replay capabilities
   - Funnel visualization
   - Cohort analysis

2. **Performance Correlation**
   - Load time impact on engagement
   - Device-specific behavior patterns
   - Geographic usage analysis

## Maintenance

### Regular Tasks
1. **Monthly Review**
   - Analyze top events and patterns
   - Review event taxonomy for new requirements
   - Check for any tracking errors

2. **Quarterly Updates**
   - Update event taxonomy based on new features
   - Review privacy compliance
   - Optimize high-volume events

### Troubleshooting
- Check browser console for tracking errors
- Verify events appear in Vercel Analytics dashboard
- Ensure client-side only execution
- Validate event property types

## Support

For questions or issues with the analytics implementation:
1. Review this documentation
2. Check the event taxonomy specification
3. Examine TypeScript interfaces in `src/lib/analytics.ts`
4. Test in development environment with console logging

The analytics system is designed to be maintainable, scalable, and privacy-compliant while providing comprehensive insights into user behavior on the smallepic portfolio.