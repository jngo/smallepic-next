# THEME_NOTES

## Source

- Theme basis: **Omarchy Lumon Theme** by OldJobobo.
- Repository: https://github.com/OldJobobo/omarchy-lumon-theme
- Primary palette references used:
  - `colors.toml`
  - `colors.css`
  - `walker.css` (for surface layering + muted/border cues)

## Token mapping decisions (shadcn semantic variables)

### Core dark mapping (faithful Lumon)

- `--background`: `#1b2d40` (Lumon base navy)
- `--foreground`: `#d6e2ee`
- `--card`: `#102231` (derived surface tone from walker panel stack)
- `--popover`: `#0c1822` (deeper surface from walker panel)
- `--primary`: `#6fb8e3` (Lumon accent blue)
- `--accent`: `#4d9ed3` (selection/highlight blue)
- `--muted`: `#112a3c`
- `--muted-foreground`: `#89a1b8`
- `--border`: `#4a6b80` (ANSI bright black)
- `--input`: `#304860` (border/dim intermediate tone)
- `--ring`: `#f2fcff` (bright cyan-white edge)

### Light mapping (conservative derived companion)

Omarchy Lumon is effectively dark-first, so the light theme is intentionally conservative:

- keeps the same hue family (blue-gray, institutional cyan accents)
- uses higher luminance surfaces for readability
- preserves semantic contrast for shadcn defaults

Notable derived choices:

- `--background`: `#f3f8fc`
- `--foreground`: `#1b2d40`
- `--primary`: `#4d86b0`
- `--accent`: `#6fb8e3`
- `--border`: `#b1d8ee`

### Other semantic groups

- `--chart-*` mapped to Lumon ANSI gradient (`color1`..`color6` family).
- `--sidebar-*` aligned to same surface/contrast system as page/card/popover.
- Radius system left unchanged (square corners) to preserve existing UI language.

## Components touched manually

- No component-level hard-coded restyling was required.
- Only global theme tokens were updated in `src/app/globals.css`.
- Existing shadcn semantic classes (`bg-background`, `text-foreground`, etc.) were preserved.

## Ambiguities / tradeoffs

- Lumon does not provide a first-class light theme; this repo supplies only dark-centric tokens.
- `--destructive` was mapped to a theme-cohesive blue-tinted warning/error surrogate in dark mode and a muted red in light mode to retain semantic intent and accessibility.
