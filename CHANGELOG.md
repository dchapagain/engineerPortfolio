# Changelog

All notable changes to this project are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- `FIG. 02 / MEASURED OUTCOMES` readout band between the hero and the work plate, leading with real case study metrics
- Metrics can be held in content as `pending` while awaiting a figure; nothing renders them until the figure is filled in, so an unfinished number cannot reach the page
- Change bars on metrics whose claim entails a baseline, with the before/after conveyed by length, position, text and an sr-only sentence rather than colour
- Retrieval architecture case study for the assistant that runs on this page, written around the closed token vocabulary
- Suggested starter questions in the chat panel, shown until the first question is asked
- Hero button that opens and closes the assistant, reporting its state through `aria-expanded`
- Unit tests for the chat link-token resolver, the change bar geometry, and the hero metric lookup
- schema.org JSON-LD graph in the document head (Person, WebSite, ProfilePage), derived from `site.ts` so the structured data cannot drift from the page. The served HTML is an empty root div, so this is the only machine readable description of the site for crawlers that do not run JavaScript
- `robots.txt`, allowing every crawler including the ones behind generative answers
- `apple-touch-icon.png`, `theme-color` for both schemes, `author`, `og:site_name`, `og:locale`, `og:image:type`, `og:image:width`, `og:image:height`, `og:image:alt`, `twitter:image:alt`, and `robots` with `max-image-preview:large`
- `site.meta` holds the canonical origin and the share card's path, alt text and dimensions; the plugin derives every absolute URL from it, so no URL is hand-written into `index.html`
- Build-time prerendering: `npm run build` renders the page into `dist/index.html`, so the served document carries the content instead of an empty root div. The body went from 0 to 4,170 characters of text, and the document from 1.84 kB to 7.4 kB gzip. Still a static file, so hosting is unchanged. The prerendered markup and the client-rendered DOM were compared character for character and match

### Changed

- Share card redrawn in the new palette and type, and published as `og-image-v2.png`. Social platforms cache share images by URL, so the new path is what retires the old indigo card without waiting on anyone's cache. It carries no figures on purpose: a share image outlives the case study a number came from, and a stale metric on a cached card cannot be corrected from here
- Favicon keeps the `DC` initials but is redrawn in the site's identity: emphasis green ground, paper letters set in DM Mono to match the wordmark, square cornered like every other control. It was an indigo rounded tile in Arial. Ships as `favicon.png` at 32 and `apple-touch-icon.png` at 180; the SVG is gone, since the letterforms would have fallen back to a system face wherever the webfont could not load
- Dropped the hero entrance animation. Prerendering means the page arrives already painted, so fading it in hides content that is on screen, and an `opacity: 0` entrance is a single point of failure: `animation-fill-mode: both` holds the start frame until the animation is scheduled, so a throttled or backgrounded tab showed an invisible page for as long as that took
- Repositioned as Product Engineer with applied AI, across web, mobile and Android via React Native
- Redesigned around a technical plate language: blueprint hero, hairline rules instead of bordered cards, Fraunces display with DM Mono labels and metrics, on a warm green and terracotta palette
- Case studies are now ledger records with a metric column and Problem / Approach / Role behind a disclosure, rather than six labelled sections shown at once
- Self-hosted Fraunces, DM Sans and DM Mono as woff2 subsets, replacing the render-blocking Google Fonts stylesheet
- Chat widget split into an eager dock and a lazy panel, moving Framer Motion out of the initial bundle: initial JS drops from 98.01 kB to 59.95 kB gzip
- `SocialLinks` renders each link once and hides the label with a utility, taking the DOM from 20 anchors to 7 for 4 destinations
- First visit now follows `prefers-color-scheme`, and the stored theme is written only on an explicit toggle
- `MAX_INPUT_CHARACTERS` moved into `chatApi.ts` and asserted before the request
- All chat copy, including aria labels, moved into `src/data/site.ts`
- Layout is full bleed with 4% gutters and no max width, matching the Systems Atlas mock; line length is held by measure caps on the text blocks instead
- Nav links are set in medium weight, carry a destination tooltip, and underline in the accent on hover
- Hero paragraph matches the mock at 17px/1.67 in full ink, rather than 16px in muted
- Skills became a compact band matching the measured-outcomes rhythm: one continuous marquee of the grouped stack as square icon tiles with Mac-dock magnification (1.3 on the hovered tile, 1.15 on each neighbour), paused on hover or focus, and a plain wrapped list under `prefers-reduced-motion`
- The three small bands (measured outcomes, stack, design rule) now share one height, 13rem, so the large and small alternation reads as a rhythm; they previously ran 208, 179 and 233 pixels
- Every control is square cornered, and buttons, icon actions, inputs and chat suggestions all take the nav's hover language (accent colour, underline, colour transition). The filled button shifts its fill rather than its label, since recolouring text on a dark fill would fail contrast
- Every control carries a concise tooltip, defaulted from the accessible name on icon-only controls; the skip link is the deliberate exception, since it is hidden until focused
- Wordmark set larger with wider tracking and an accent hover. Its glyph is now inline SVG carrying the favicon's geometry, in the theme's own colours, rather than a CSS rotated square whose border read a fifth heavier than the real mark
- Stack tiles drift on a staggered loop, like things floating on water, with the hover magnification moved to a wrapper so the two transforms no longer overwrite each other; the stack is now a real list for screen readers
- `--muted` darkened from `74 106 92` to `63 91 78`: it cleared AA by only 3% on the work band and carries most of the 11px label text
- Stack entries carry brand glyphs from `react-icons`, with `lucide-react` standing in where a practice has no brand mark
- The stack band is lazy loaded behind a same-height fallback and prefetched when the browser goes idle, keeping its glyphs off the critical path
- Social links moved from `react-icons` to `lucide-react`, which also suits the line-art set better. This was the change that made the lazy split pay: `react-icons/si` is one 4.9 MB module that bundlers cannot split, so a single eager import was holding every brand glyph in the initial chunk. Initial JS is now 59.02 kB gzip, below the 60.21 kB from before any stack icons existed
- Selected work trimmed to three records, dropping the testing and observability study whose metrics were engineering-internal rather than product outcomes; that role is still covered under Experience
- Plate and figure numbering made coherent: plates number the major sections (01 hero, 02 work, 03 experience, 04 contact) and figures number the exhibits between them (01 the system drawing, 02 measured outcomes, 03 stack)
- Bands now alternate large and small with no two neighbours sharing a background: page, inverted, band, inverted, page, inverted, band, inverted. The footer takes the inverted ground too, so the alternation carries to the bottom edge and the page closes on a fill rather than trailing off into paper
- The three small bands share one theme as well as one height: measured outcomes and the stack now take the inverted ground the design rule already had. `.t-inverted` redefines the palette tokens within its scope rather than recolouring each child, so `text-muted`, `border-rule` and `text-accent-text` keep working and resolve against the dark ground; the stack tiles became outlines so they inherit it too

### Fixed

- Dark mode rendered near-white text on pale fills wherever a solid surface took its foreground from the general ink token; every fill now has a paired `--on-*` token
- Hero animation ignored `prefers-reduced-motion`
- Skip link targeted the work section, skipping past the `h1`
- Sections were not exposed as named regions, and the primary nav was unnamed
- `aria-controls` on the chat launcher referenced a panel that is never in the DOM at the same time
- Theme toggle's accessible name did not contain its visible label
- Chat panel's `<header>` registered a second banner landmark while open, since `role="dialog"` overrides the section semantics that would otherwise scope it
- Closing the chat could leave focus on `<body>` when it had been opened without a focused trigger; it now falls back to the launcher
- Section links were unreachable on small screens; a menu button beside the theme toggle now opens them as a dropdown, and the wordmark stays in full
- Hero figure was drawn in a viewBox 10 units shorter than the outer ring, clipping its lower edges, and the node labels sat on top of the hexagon lines
- Hero figure's lower node labels sat below and outside their nodes rather than beside them; each label now shares its node's baseline, anchored to its inner edge so it clears the outer ring
- Anchor targets were cropped by the sticky header, which covered the top of every section a nav link jumped to
- A filled child inside an inverted band kept the paper surface tokens, which painted the inverted foreground onto a light ground; `.t-inverted` now rescopes `--bg`, `--surface` and `--band` to the band's own fill
- Chat launcher covered the last footer link once the page was scrolled to the end
- Scrolling the chat panel chained through to the page behind it once the message log reached either end
- Mobile menu stayed open when clicking outside it
- Chat panel flickered the FIG. 01 plate on open. It docks over that plate and the two paint the same `--surface` ground, so the entrance cross-fade showed the plate's hexagon and labels through the panel for the length of the ramp and then dropped them. The panel is now opaque from the first frame and the slide carries the entrance
- Closing the chat put focus on `<body>` instead of the control that opened it, whenever the lazy panel chunk was already warm (hovering the launcher is enough). The panel focuses its textarea from a passive effect, and a child's passive effects run before the parent's, so the dock recorded that textarea as the opener and then focused a detached node. The dock now captures in the layout phase and refuses an opener that has left the document
- `.DS_Store` was published at the web root, since Vite copies `public/` verbatim
- `getInitialTheme` read `window.matchMedia` in a `useState` initializer, which has no window during the prerender pass

### Removed

- Hero highlight pills and the Snapshot card, which restated the Skills section two screens above it
- Per-case-study "Discuss this project" buttons, reducing seven paths to contact down to four
- Duplicate `IconLink` and `IconButton` modules, now one `IconAction`
- Dead `--type-scale` token and the redundant `.text-muted` utility override

---

## [0.4.0] - 2026-09-07

### Added

- Vitest test setup (jsdom, Testing Library) with unit tests for the HTTP layer's error classification and JSON parsing (#27)
- `Test` job in the CI quality matrix, running alongside lint, format, and typecheck on every pull request (#27)

### Changed

- Updated the GitHub profile link to the renamed `dchapagain` handle (#27)
- Rewrote the README around the two modules worth reading, and documented the test suite (#28)
- `tsconfig.node.json` now typechecks `vitest.config.ts` (#27)
- Refreshed the resume PDF (#28)

---

## [0.3.1] - 2026-07-08

### Changed

- Pinned Node to `24.6.0` across `.nvmrc`, `package.json` engines, and CI (via `node-version-file`) (#26)

---

## [0.3.0] - 2026-07-08

### Added

- SEO/social metadata: meta description, Open Graph, and Twitter Card tags, plus favicon and OG image, injected at build time from site data (#22)
- Prod build fails fast when `VITE_DOMAIN_URL` is unset, preventing a broken chat deploy (#23)

### Changed

- Chat replies link via a closed token vocabulary (`#section`, `site:key`) resolved from site data; unknown targets render as plain text (#25)
- Stopped tracking `.env.prod`; added `.env.example` to document required env vars (#22)

---

## [0.2.1] - 2026-05-04

### Fixed

- Enforce a maximum length on the chat input (#21)

---

## [0.2.0] - 2026-04-30

### Added

- Chat widget backed by a typed HTTP client with retry/timeout handling and API integration (#17)

### Fixed

- Production domain resolution (#20)

---

## [0.1.0] - 2026-02-02

### Added

- Initial MVP: hero, projects (case studies), skills, experience, and contact sections
- Resume PDF download
- Dark/light theme toggle
- Reusable UI components, centralized site data, and a WCAG-AA accessibility pass
- Project tooling: quality checks (lint/format/typecheck), licenses, and README

[Unreleased]: https://github.com/dchapagain/engineerPortfolio/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/dchapagain/engineerPortfolio/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/dchapagain/engineerPortfolio/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/dchapagain/engineerPortfolio/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/dchapagain/engineerPortfolio/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/dchapagain/engineerPortfolio/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/dchapagain/engineerPortfolio/releases/tag/v0.1.0
