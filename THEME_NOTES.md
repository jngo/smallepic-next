# Theme notes

## Source

This theme adapts the Omarchy Retro 82 / Retro-80 palette from:

- https://github.com/OldJobobo/omarchy-retro-82-theme
- `colors.toml`
- `retro80.yaml`
- `alacritty.toml`
- `kitty.conf`

## Token mapping

The Omarchy theme is dark-first. The dark mode in `src/app/globals.css` maps the source palette directly into shadcn/Tailwind CSS variables:

- `#00172E` -> `--background`
- `#F6DCAC` -> `--foreground`
- `#01204E` -> `--card`, `--popover`, `--sidebar`
- `#0A3A45` -> `--secondary`, `--muted`
- `#A7C9C6` -> `--muted-foreground`
- `#FAA968` -> `--primary`, `--ring`, `--chart-1`
- `#176B73` -> `--accent`
- `#134E5A` -> `--border`, `--input`
- `#F85525` -> `--destructive`
- Terminal/editor accents (`#028391`, `#E97B3C`, `#8CBFB8`, `#3F8F8A`) -> chart colors

## Derived colors

The source theme is dark-only, so the light mode is derived conservatively:

- `#FFF1DA` is used as the light background.
- `#00172E` remains the primary text color for strong contrast.
- `#F6DCAC`, `#A7C9C6`, `#5F8F96`, and `#134E5A` are reused for surfaces, muted states, borders, and primary actions.
- Light destructive uses a darker derivative, `#9D341A`, so destructive text and controls preserve accessible contrast on the light background.

## Manual component changes

Most styling remains token-driven through existing shadcn semantics. The only component-level changes replace hard-coded destructive foreground text with `text-destructive-foreground` in shared UI primitives:

- `src/components/ui/button.tsx`
- `src/components/ui/badge.tsx`
