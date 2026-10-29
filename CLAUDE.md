# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

A personal engineer portfolio: a single-page React site plus a chat widget backed by
an LLM. Deployed to Cloudflare Pages at `deepakchapagain.com`. The chat backend lives
in a separate repo (`resume_rag_assistant`, a Cloudflare Worker doing RAG over resume
content); this repo only holds the client.

**Design goal: simple, minimal, pragmatic.** Push back on additions that add ceremony
without adding evidence of judgment. This is a one-page site; it does not need a
component library, a state manager, or a router.

## Commands

```bash
npm ci                 # install (Node 24.6.0, see .nvmrc)
npm run dev            # vite dev server
npm run build          # tsc -b && vite build --mode prod
npm run preview        # preview the prod build

npm run quality        # lint + format:check + typecheck   <- run before every commit
npm run quality:fix    # format + lint:fix + typecheck
npm test               # vitest run
npm run test:watch     # vitest watch mode
```

Shorthands exist: `q`, `qf`, `tc`, `lf`.

**Always run `npm run quality` and `npm test` before proposing a commit.** CI runs
lint, format check, typecheck, and tests as parallel jobs on pull requests, plus
CodeQL. Commits run eslint and prettier over staged files via lint-staged, but not
typecheck or tests, so those are the ones that bite in CI if skipped locally.

## Environment

`VITE_DOMAIN_URL` is the chat API origin, and it is the only variable the app needs.

**Nothing sensitive belongs in these files.** Vite inlines every `VITE_`-prefixed
variable into the client bundle at build time, so the value ships to the browser and
is readable by anyone. Never put credentials, API keys, or tokens behind a `VITE_`
prefix. Secrets belong on the backend Worker, never here.

For local development, copy `.env.example` to `.env.local`, which Vite reads in every
mode. Production builds (`vite build --mode prod`) read `.env.prod`; on Cloudflare
Pages the variable is set in the dashboard instead, for Production and Preview.
Every `.env*` file except the examples is gitignored, and `.env.prod` was untracked
deliberately (#22). Keep it that way.

Production builds **fail hard** when the variable is unset (see `vite.config.ts`);
this is deliberate, because the old behavior silently fell back to a relative
`/api/query` and shipped a broken chat. Do not soften this into a warning or a
default.

## Architecture

```
src/
  components/        reusable UI primitives (Button, Card, IconLink, ThemeToggle)
  data/              site content and constants: SINGLE SOURCE OF TRUTH
  features/chat/     chat widget, API client, link-token rendering
  sections/          page sections (Hero, Work, Skills, Experience, Contact)
  services/http/     typed HTTP client: validation, timeout, retry, errors
  test/              test setup; specs are co-located as `*.test.ts`
  index.css          global styles and CSS custom-property design tokens
  entry-server.tsx   build-only render entry, loaded by the prerender plugin
vite/
  html-meta-plugin.ts  writes the document head at build time: title, description,
                       Open Graph, Twitter card, and the schema.org JSON-LD graph
  prerender-plugin.ts  renders the page into dist/index.html after the browser build
```

### `src/data/` is the content boundary

All user-facing copy, project case studies, experience entries, skills, and social
links live in `src/data/site.ts`. Components read from it; they never hardcode copy.
When asked to change wording on the site, edit `site.ts`, not the JSX.

`site.ts` is imported by `vite/html-meta-plugin.ts` at build time in a **Node
context**. It must therefore stay side-effect-free and free of browser-only APIs.
Do not import React, touch `window`, or read `localStorage` from it.

`site.meta` is the head's half of that contract: the canonical origin and the share
card's path, alt text and dimensions. No component reads it. The plugin derives every
absolute URL, the Open Graph and Twitter tags, and the JSON-LD graph from `site.ts`,
so the structured data cannot drift from the page it describes. Add a fact to
`site.ts` and it reaches the markup; never hand-write a URL or a claim into
`index.html`.

### `public/` is copied verbatim

Vite does not fingerprint `public/`, so anything cached hard by a third party needs
the version in its filename. The fonts carry `-v1`, and the share card is
`og-image-v2.png` because social platforms cache share images by URL for weeks: a new
card at the old path will not reach them. Bump the filename and `site.meta.ogImage`
together. Favicons keep stable names on purpose, since browsers probe for them.

### Prerendering

`npm run build` renders the page into `dist/index.html` after the browser build, so the
served document carries the content rather than an empty root div. Search crawlers run
the app and would reach the page either way; the crawlers behind generative answers
largely do not, and read only what the server returns. The output is still a static
file, so nothing about hosting changes.

`vite/prerender-plugin.ts` drives it and stays string only, which is what keeps React
types out of the Node program and leaves `site.ts` its no-DOM guard. The render itself
is `src/entry-server.tsx`, in the app's program where the DOM lib exists. Nothing in the
client graph imports it, so it never reaches a bundle.

Two rules follow, and both fail at build time or on screen rather than in a test:

1. **Nothing may touch `window` or `document` while rendering.** Effects are fine, they
   do not run during the pass. A `useState` initializer is not, which is why
   `getInitialTheme` carries a `typeof window` guard.
2. **Entrance animations belong on `#root`, not on a child.** The client re-renders
   rather than hydrating, so every child element is replaced, and a CSS animation on a
   replaced node starts over. `#root` is never replaced.

The client calls `createRoot().render()`, not `hydrateRoot()`. Hydration needs the server
and the first client render to agree, and here they cannot: the theme comes from
`localStorage` and `prefers-color-scheme`, which a static build cannot know. The single
visible consequence is that the theme toggle is prerendered in its light state and
corrects itself on mount.

The lazy stack band is deliberately left as its Suspense fallback. Rendering it costs
22 kB gzip of the document, two thirds of that the `aria-hidden` duplicate run behind
the marquee, to repeat 23 skill names that the JSON-LD graph already carries.

### `src/services/http/`

Small typed layer, split by responsibility: `httpClient` (orchestration),
`retry`, `parseJson`, `apiResponse.guard` (runtime envelope validation), `httpError`,
`timeout`. Responses are validated at runtime rather than trusted from a type
assertion, and fetch failures are normalized into user-safe messages via
`normalizeFetchError`.

These modules are pure, which is why they carry the unit tests. Keep new tests here
unless a change genuinely needs a rendered component.

### `src/features/chat/` and the link-token invariant

**The chat backend is model-generated and is never allowed to author a URL.**

Replies reference destinations through a fixed token vocabulary: sections as `#work`,
`#skills`, `#experience`, `#contact`; external destinations as `site:github`,
`site:linkedin`, `site:email`, `site:resume`. Tokens resolve client-side from
`SECTION_IDS` and `site.social`. Anything unrecognized renders as plain text.

This bounds the link set to the site's own data. **Do not add raw-URL rendering,
markdown link parsing, or `dangerouslySetInnerHTML` to the chat path.** If a new
destination is needed, add a token and resolve it from `src/data/`.

`MAX_INPUT_CHARACTERS` (480) in `chatApi.ts` aligns with the backend's KV and R2
caching constraints. It is not an arbitrary UI limit; changing it requires a matching
backend change.

## Conventions

**Writing style, in code comments, docs, and commit messages:** no em dashes or en
dashes. Use commas, colons, or separate sentences. This applies to generated prose in
markdown files too. Plain hyphens are fine.

Comments explain _why_, not _what_. The repo has a deliberate minimalism about
comments; do not annotate self-evident code.

**Git:** feature branches off `main`, short-lived, squash merge only. PR titles are
ticket-prefixed, e.g. `[PF-107] - Short imperative description`. One logical change
per PR; the history is intentionally readable.

`main` is integration, not production. Cloudflare's production branch is `release`,
and promoting `main` to `release` (a fast-forward, never a squash) is what deploys.
Every PR still gets a Cloudflare preview URL, so changes are viewable before they go
live.

**Changelog:** `CHANGELOG.md` follows Keep a Changelog and SemVer. Any user-visible
change gets an entry under `[Unreleased]` with the PR number, in the same PR as the
change. `[Unreleased]` therefore means merged into `main` but not yet promoted to
production. Version bumps and tags happen when a release is cut.

**Dependencies:** adding one needs a justification. Current set is deliberately small.
`lucide-react` covers every eagerly loaded icon, including the GitHub and LinkedIn marks
and the stand-ins for practices with no brand (accessibility, native modules, prompt
safety). It ships one file per icon, so it splits across chunks cleanly.

`react-icons` supplies product brand marks for the stack band only, and lives in
`src/components/techIcons.ts`, which **nothing in the eager graph may import**. That
boundary is load-bearing: `react-icons/si` is a single 4.9 MB module, so a bundler cannot
split it, and one eager import drags every surviving brand glyph into the initial bundle.
Keeping it to the lazy Skills chunk is worth about 12 kB gzip. For the same reason
`techIcons.ts` is not re-exported from `src/components/index.ts`, and `Skills` is not
re-exported from `src/sections/index.ts`.

**No hardcoded year counts:** never write a numeric count like "6+ years" into copy;
it goes stale and has to be updated every year. State the career start instead,
October 2019, and let the reader infer the span.

## The four-surface sync rule

The owner's professional details appear in four places. **The resume PDF is the source
of truth.** When any of these change, check all four:

1. `public/Deepak_Chapagain_Resume.pdf` (source of truth)
2. `src/data/site.ts` (experience entries, project case studies, social links)
3. `README.md` (About section)
4. The GitHub profile and LinkedIn (outside this repo, flag for manual update)

Titles, employers, date ranges, and every quoted metric must agree across all of them.
If a metric appears on the site, it must appear on the resume with the same number and
the same scope. When they conflict, the resume wins, and say so rather than guessing.
