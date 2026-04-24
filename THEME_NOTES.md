# THEME_NOTES

## Source theme
- Omarchy Miasma theme by OldJobobo:
  - https://github.com/OldJobobo/omarchy-miasma-theme
  - Primary palette reference: `colors.toml`

## Core palette extracted from Omarchy Miasma
- Background: `#222222`
- Foreground: `#c2c2b0`
- Primary/Accent Olive: `#78824b`
- Supporting earthy accents: `#b36d43`, `#bb7744`, `#c9a554`
- Border/neutral: `#666666`
- Terminal set also includes: `#685742`, `#5f875f`, `#d7c483`

## shadcn token mapping decisions
- Dark mode is the faithful Miasma translation.
  - `--background`, `--foreground` directly map to Miasma base values.
  - `--primary` maps to Miasma accent (`#78824b`) and `--ring` maps to warm highlight (`#c9a554`).
  - `--accent` maps to the warmer Miasma orange (`#bb7744`) for hover and active surfaces.
  - `--border`/`--input` map to `#666666` to preserve a terminal-like, low-glare frame.
- Light mode is a conservative derived theme.
  - Kept structure and contrast behavior while deriving lighter paper-like surfaces from the same hue family.
  - Preserved earthy green/orange accents so branding remains consistent between modes.

## Derived colors (not directly present in source palette)
- Light surfaces and contrast companions, e.g. `#f5f1e6`, `#fcf8ed`, `#e8e1cf`, `#2a2720`.
- Dark supporting surfaces, e.g. `#2a2a2a`, `#313327`, `#2e2e2e`, chosen to keep separation between background/card/muted layers.

## Manual component touches (minimal)
- Updated destructive variants in shadcn `Button` and `Badge` from `text-white` to semantic `text-destructive-foreground` so they follow token changes automatically.
- No layout/spacing/structure changes were made.
