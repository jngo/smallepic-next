# Omarchy Lumon Theme Notes

Source theme: [OldJobobo/omarchy-lumon-theme](https://github.com/OldJobobo/omarchy-lumon-theme), specifically `colors.toml`, `colors.css`, `gtk.css`, and terminal palettes such as `kitty.conf` and `alacritty.toml`.

## Token mapping

- `--background`: Lumon navy `#1b2d40` in dark mode.
- `--foreground`: Lumon pale blue `#d6e2ee`.
- `--card` / `--popover`: the navy base plus a slightly lifted dark surface for cards.
- `--primary`: Lumon accent cyan `#6fb8e3`.
- `--accent`: selection blue `#4d9ed3`.
- `--secondary`, `--muted`, `--input`: blue-gray terminal steps from `color8` and derived navy mixes.
- `--border`: translucent foreground in dark mode, matching GTK's `alpha(@foreground, 0.1)` border treatment.
- `--ring`: cursor / active edge white-blue `#f2fcff`.
- `--destructive`: Lumon ANSI `color1` `#4d86b0`; the source theme uses this blue as its red/error slot, paired with cursor text `#071018` for accessible contrast.
- `--chart-*`: the terminal ANSI progression from `color1` through `color5`.
- `--sidebar-*`: mirrors the same background, accent, border, and foreground decisions for shadcn sidebar tokens.

## Light mode

The Omarchy Lumon palette is dark-first. Light mode is a conservative derivation using the same blue family: bright icy backgrounds, dark navy foregrounds, Lumon navy primary, cyan accents, and blue-gray borders. This preserves contrast while keeping the theme reversible through global tokens.

## Manual component touches

- `src/components/ui/button.tsx`: changed destructive text from a hard-coded white utility to `text-destructive-foreground`.
- `src/components/ui/badge.tsx`: changed destructive text from a hard-coded white utility to `text-destructive-foreground`.
- `src/components/ui/menubar.tsx`: raised dropdown content above desktop windows so menu surfaces remain readable.
- `src/app/layout.tsx`: applies the existing `.dark` class at the document root so the faithful Lumon mapping is the default presentation.
