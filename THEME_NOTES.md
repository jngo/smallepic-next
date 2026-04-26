# Omarchy Retro 82 Theme Notes

## Source
- Theme repository: https://github.com/OldJobobo/omarchy-retro-82-theme
- Primary palette source: `colors.toml` (plus tonal hints in `retro80.yaml` and UI intent in `gtk.css`).

## Core palette extracted
- Background: `#00172e`
- Foreground: `#f6dcac`
- Primary highlight (amber): `#faa968`
- Teal/cyan support: `#028391`, `#3f8f8a`, `#8cbfb8`
- Error/destructive: `#f85525`
- Elevated dark surfaces: derived from the same navy/teal tonal ramp (`#01204e`, `#134e5a`)

## shadcn token mapping decisions
- Dark mode is the faithful mapping and uses the navy + cream + amber + teal balance as the base identity.
- Light mode is conservatively derived (cream background + navy foreground + same accent family) because Omarchy Retro 82 is effectively dark-first.
- Updated global tokens in `src/app/globals.css` for:
  - `--background`, `--foreground`
  - `--card`, `--popover`
  - `--primary`, `--secondary`, `--muted`, `--accent`
  - `--destructive`
  - `--border`, `--input`, `--ring`
  - `--chart-*`
  - `--sidebar-*`

## Manual component touches
- Replaced hard-coded destructive foreground `text-white` with `text-destructive-foreground` in:
  - `src/components/ui/button.tsx`
  - `src/components/ui/badge.tsx`

No layout or structure changes were made; styling remains token-driven.
