# Portfolio — Phase 1: Foundation & Design System

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

This is the foundation layer only: layout, navigation, footer, theming,
and the reusable component/design system that later phases (asymmetrical
grid, GitHub integration, 3D configurator) will build on top of.

## Design direction — "Calibration"

Instead of a default AI-portfolio look, this system borrows from lab
instruments and technical drawings: tick-mark rules, mono-set labels,
a cool paper/ink palette, and a single signal-orange accent.

| Token      | Light      | Dark       | Use                              |
|------------|------------|------------|-----------------------------------|
| `paper`    | `#EEF0EC`  | `#101316`  | page background                  |
| `ink`      | `#14181C`  | `#E7E5DD`  | primary text                      |
| `signal`   | `#FF4D1C`  | same       | accent — links, active states     |
| `amber`    | `#FFB000`  | same       | secondary accent, used sparingly  |
| `line`     | `#D7D9D2`  | `#262B30`  | hairlines, ticks                  |
| `steel`    | `#5C6470`  | `#9AA0A6`  | muted text                        |

Type system: **Archivo** (display, 700–900) for headings, **Public Sans**
for body copy, **IBM Plex Mono** for labels, nav indices, and anything
data-like (commit hashes, coordinates, status text) — this pairing is
intentional because later phases surface GitHub/commit data and 3D
coordinates that read naturally in mono.

Signature element: the **tick-rule** motif (a repeating dashed line)
threads through the nav and footer, and the theme toggle is a two-position
switch labeled `DAY` / `NGT` instead of a sun/moon icon.

## Folder structure

```
src/
 ├── app/              # routes, root layout, global styles entry
 ├── components/
 │   ├── layout/        # Navbar, Footer
 │   ├── theme/          # ThemeProvider, ThemeToggle
 │   └── ui/             # Button, Badge, Container, SectionHeading
 ├── hooks/             # use-mounted, use-active-section
 ├── lib/               # utils (cn helper)
 ├── data/              # site.ts — single source of truth for nav/social copy
 ├── types/             # shared TS interfaces
 └── styles/            # globals.css — design tokens + base layer
```

Components are intentionally small and composable so Phase 2's grid and
project cards, Phase 3's GitHub widgets, and Phase 4's 3D configurator
can all consume `Container`, `Button`, `Badge`, and the color/type tokens
without re-deriving spacing or color decisions.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

> Note: `next/font/google` fetches Archivo, Public Sans, and IBM Plex Mono
> at build time, so an internet connection is required for `npm run build`
> / `npm run dev` to compile fonts.

## What's next (Phase 2+)

- Asymmetrical project grid inside `app/page.tsx`'s `#work` section
- GitHub integration (contribution graph, repo cards) as a new
  `components/github/` module, with data fetched server-side
- 3D configurator as a client component under `components/configurator/`,
  likely with `three.js` / `@react-three/fiber`
- Replace placeholder copy in `data/site.ts` with real content
