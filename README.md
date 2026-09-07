# Deepak Chapagain - Engineer Portfolio

A mobile-first portfolio site built with **React + TypeScript + Vite**, shipping a RAG chat assistant, a typed HTTP layer, and build-time SEO.

**Live:** [deepakchapagain.com](https://deepakchapagain.com/)  
**Resume:** [Deepak_Chapagain_Resume.pdf](https://deepakchapagain.com/Deepak_Chapagain_Resume.pdf)

---

## Tech stack

- **React 18 + TypeScript**
- **Vite** (with a custom build-time HTML meta plugin)
- **Tailwind CSS**
- **Animations:** Framer Motion
- **Icons:** lucide-react + react-icons
- **Code quality:** ESLint + Prettier + TypeScript project references (`tsc -b`)
- **Testing:** Vitest + Testing Library (jsdom)
- **A11y tooling:** eslint-plugin-jsx-a11y + `@axe-core/react`
- **Security:** CodeQL analysis (GitHub Actions)
- **Git hooks:** Husky + lint-staged

---

## Architecture

**Content is data-driven.** User-facing copy and links live in `src/data/site.ts`, so sections, the footer, and social links all render from one source of truth. Section ids and labels live in `src/data/constants.ts`.

**Typed HTTP layer (`src/services/http`).** A small client wraps `fetch` with an `AbortSignal` timeout, retry with backoff on retryable failures, and JSON parsing that never throws. Responses are validated at runtime against a typed envelope before reaching feature code, so malformed payloads fail predictably instead of leaking `undefined`.

**Chat assistant (`src/features/chat`).** A floating widget posts questions to a [RAG backend](https://github.com/dchapagain/resume_rag_assistant) (a separate service at `VITE_DOMAIN_URL` + `/api/query`) through the HTTP layer. The model never authors URLs: it emits tokens from a closed vocabulary (`#work`, `site:github`, ...) that the client resolves against `site.ts`, and anything else renders as plain text. Input is capped (`MAX_INPUT_CHARACTERS`) to match the backend cache-key limit; the backend stays the authority on validation and rate limiting.

**Build-time SEO (`vite/html-meta-plugin.ts`).** Title and description are injected into `index.html` at build time from `site.ts`, HTML-escaped, so the shipped markup carries real meta, Open Graph, and Twitter tags without duplicating copy.

**Fail-loud config (`vite.config.ts`).** A production build throws if `VITE_DOMAIN_URL` is unset, so a misconfigured deploy fails the build instead of shipping a chat widget that calls the wrong origin.

---

## Local development

Requires Node `24.6.0` (pinned in `.nvmrc`; run `nvm use`) and npm.

```bash
npm ci
cp .env.example .env.local   # set VITE_DOMAIN_URL (chat API origin)
npm run dev
```

Build and preview a production bundle with `npm run build && npm run preview`.

---

## Project structure

```txt
src/
  components/     reusable UI primitives (Button, Card, SocialLinks, ThemeToggle, ...)
  data/           site content and constants (single source of truth)
  sections/       page sections (hero, work, skills, experience, contact)
  features/chat/  chat widget, hook, API client, link-token renderer
  services/http/  typed fetch client: timeout, retry, response-envelope guards
  test/           test setup (jest-dom matchers); specs sit beside their source
  index.css       global styles and design tokens
vite/
  html-meta-plugin.ts   injects SEO meta into index.html at build time
public/           resume PDF, favicon, OG image
.github/workflows/      CI: quality gate + CodeQL
```

---

## Quality gate

CI runs on every PR: lint, format, typecheck, and tests (matrix), plus CodeQL analysis. Run the same checks locally:

```bash
npm run quality        # lint + format:check + typecheck
npm run quality:fix    # auto-fix, then typecheck
npm test               # run the test suite once
npm run test:watch     # watch mode
```

Aliases: `q` (quality), `qf` (quality:fix), `tc` (typecheck), `lf` (lint:fix).

Unit tests cover the pure modules in `src/services/http`, where the tricky behavior lives: which failures are retryable, and JSON parsing that reports errors instead of throwing. Specs are co-located with their source as `*.test.ts`.

---

## Versioning

Changes are tracked in [`CHANGELOG.md`](./CHANGELOG.md) (Keep a Changelog, Semantic Versioning). Merges to `main` deploy to production automatically; tags label each released snapshot.

---

## License

- **Code:** MIT (see `LICENSE.md`)
- **Personal content (resume, bio/project writeups, images/logo):** All rights reserved (see `CONTENT_LICENSE.md`)

If you publish a fork or derivative, please **remove or replace all personal content** first.

---

## Contact

- Email: dchapagain.dev@gmail.com
- LinkedIn: [linkedin.com/in/dchapagain](https://www.linkedin.com/in/dchapagain/)
- GitHub: [github.com/dchapagain](https://github.com/dchapagain)
