## Omarchy Miasma theme notes

### Source

- Source theme: `OldJobobo/omarchy-miasma-theme`
- Palette inputs taken from:
  - `colors.toml`
  - `colors.fish`

### Core palette mapping

- `background`: `#222222` -> `--background` in dark mode
- `foreground`: `#c2c2b0` -> `--foreground`, `--card-foreground`, `--popover-foreground`
- primary/accent olive: `#78824b` -> `--primary`
- muted green-brown surface family derived from background:
  - `--card`: `#2a2b27`
  - `--popover`: `#2a2b27`
  - `--secondary`: `#2f302c`
  - `--muted`: `#2b2c28`
  - `--accent`: `#34362c`
- border/input derived from comment/dim neutrals:
  - `--border`: `#4a4a43`
  - `--input`: `#3a3a34`
- warning/gold from terminal yellow: `#c9a554` -> `--ring`, `--chart-4`
- destructive/error mapped from terminal orange: `#b36d43` -> `--destructive`
- charts mapped from terminal palette:
  - `--chart-1`: `#5f875f`
  - `--chart-2`: `#78824b`
  - `--chart-3`: `#bb7744`
  - `--chart-4`: `#c9a554`
  - `--chart-5`: `#d7c483`

### Derived colors

- Omarchy Miasma appears dark-first, so dark mode is the faithful implementation.
- Light mode is conservatively derived by lifting the same olive/sand/brown relationships onto parchment-like surfaces:
  - `--background`: `#f3efe0`
  - `--card` / `--popover`: `#faf6e9`
  - `--secondary`: `#e5ddc6`
  - `--muted`: `#ede5d1`
  - `--accent`: `#dccda7`
- Added terminal-oriented custom variables for future use:
  - `--terminal-background`
  - `--terminal-foreground`
  - `--terminal-selection`
  - `--terminal-cursor`
  - `--terminal-comment`

### Manual component adjustments

- Kept the main visual shift in `src/app/globals.css`.
- Touched a small number of components to preserve semantic token usage:
  - `src/app/layout.tsx`: default root class set to `dark` so the Omarchy dark palette is what loads today.
  - `src/components/ui/button.tsx`
  - `src/components/ui/badge.tsx`
  - `src/components/ui/clock.tsx`
  - `src/components/ui/window.tsx`
- Replaced repeated inline link / desktop item styling with token-based utility classes in:
  - `src/components/windows/AboutWindow.tsx`
  - `src/components/windows/ExperienceWindow.tsx`
  - `src/components/windows/ExplorationWindow.tsx`
  - `src/components/windows/UP42Window.tsx`
  - `src/components/windows/McKinseyWindow.tsx`
  - `src/components/windows/CandisWindow.tsx`
  - `src/components/windows/UrbanSportsClubWindow.tsx`

### Known ambiguity

- The app currently does not expose a theme toggle, so light mode is implemented but not actively selectable through the UI.
