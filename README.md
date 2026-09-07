# Deepak Chapagain, Engineer Portfolio

A mobile-first portfolio site built with React + TypeScript + Vite. Selected work is framed as mini case studies: problem, approach, measurable impact.

**Live:** [deepakchapagain.com](https://deepakchapagain.com/) · **Resume:** [PDF](https://deepakchapagain.com/Deepak_Chapagain_Resume.pdf) · **LinkedIn:** [dchapagain](https://www.linkedin.com/in/dchapagain/) · **GitHub:** [dchapagain](https://github.com/dchapagain)

---

## Start here

If you are evaluating the code rather than the site, these two are worth reading:

- **[`src/services/http/`](./src/services/http)** is a small typed HTTP layer. Response envelopes are validated at runtime, timeout and retry compose, and fetch failures are normalized into user-safe messages. Split into single-purpose modules (`httpClient`, `retry`, `parseJson`, `apiResponse.guard`, `httpError`), which are also where the unit tests live.
- **[`src/features/chat/`](./src/features/chat)** is a chat widget backed by an LLM, where replies link through a closed token vocabulary rather than raw URLs. See [Chat link tokens](#chat-link-tokens) for the reasoning.

---

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · lucide-react (UI icons) · react-icons (brand glyphs)

**Tooling:** ESLint + Prettier, TypeScript project references (`tsc -b`), Vitest + Testing Library, eslint-plugin-jsx-a11y, @axe-core/react, Husky + lint-staged, GitHub Actions, CodeQL

---

## Quality gates

Pull requests run lint, format check, typecheck, and tests as parallel CI jobs, plus CodeQL analysis. Commits run eslint and prettier locally over staged files via lint-staged; typecheck and tests are enforced in CI, not on commit.

```bash
npm run quality        # lint + format:check + typecheck
npm run quality:fix    # format + lint:fix + typecheck
npm test               # run the test suite once
npm run test:watch     # watch mode
```

Unit tests cover the pure modules in `src/services/http`, where the non-obvious behavior lives: which failures are worth retrying, and JSON parsing that reports errors instead of throwing. Specs are co-located with their source as `*.test.ts`.

---

## Getting started

Node `24.6.0`, pinned in `.nvmrc`, `package.json` engines, and CI.

```bash
nvm use
npm ci
cp .env.example .env.local   # set VITE_DOMAIN_URL (the chat API origin)
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

**Environment:** `VITE_DOMAIN_URL` points at the chat API and is the only variable the app needs. `.env.local` covers local development; production builds (`--mode prod`) read `.env.prod`, and the deployed site takes the value from the Cloudflare Pages dashboard. Production builds fail loudly when it is unset rather than silently falling back to a relative path, which would ship a broken chat widget. See `vite.config.ts`.

Vite inlines `VITE_`-prefixed variables into the client bundle, so anything set here is public. No credentials or API keys belong in these files; secrets stay on the backend Worker.

---

## Structure

```txt
src/
  components/        # reusable UI primitives (Button, Card, IconLink, ThemeToggle)
  data/              # site content and constants, single source of truth
  features/chat/     # chat widget, API client, link-token rendering
  sections/          # page sections (Hero, Work, Skills, Experience, Contact)
  services/http/     # typed HTTP client: validation, timeout, retry, errors
  test/              # test setup (jest-dom matchers)
  index.css          # global styles and design tokens
vite/
  html-meta-plugin.ts  # injects title and description into index.html at build time
public/              # resume PDF, favicons, OG image
.github/workflows/   # CI: quality checks and CodeQL
```

**Common edits:**

- Content (hero, projects, experience, skills, social links): `src/data/site.ts`
- Site title and description: `src/data/site.ts`, injected into `index.html` at build time by a Vite plugin so there is one source of truth
- OG image and canonical URL: `index.html` (static asset references)
- Resume: `public/Deepak_Chapagain_Resume.pdf`

---

## Chat link tokens

The chat backend is model-generated, so it is never allowed to author a URL. It runs as a separate service, a Cloudflare Worker doing RAG over resume content: [resume_rag_assistant](https://github.com/dchapagain/resume_rag_assistant).

Replies reference destinations through a fixed token vocabulary. Sections resolve as `#work`, `#skills`, `#experience`, `#contact`; external destinations as `site:github`, `site:linkedin`, `site:email`, `site:resume`. Tokens resolve client-side from `src/data/` (`SECTION_IDS`, `site.social`), and anything unrecognized renders as plain text.

The set of links the widget can produce is therefore bounded by the site's own data, not by model output.

`MAX_INPUT_CHARACTERS` (480) in `src/features/chat/chatApi.ts` aligns with the backend's KV and R2 caching constraints. It is not an arbitrary UI limit.

---

## Versioning

Changes are tracked in [`CHANGELOG.md`](./CHANGELOG.md), following Keep a Changelog and Semantic Versioning. Merges to `main` deploy to production automatically; tags mark each released snapshot.

---

## About

Software engineer since 2019, building React and React Native products with pragmatic architecture, measurable outcomes, and quality guardrails. Specializing in native Android integration (Kotlin, TurboModules) and applied AI.

Currently at **Tractor Supply Company** (Brentwood, TN) as Technology Consultant I via Infosys Limited. Previously **Southern California Edison** and **Allstate Corporation**, both via Infosys.

**Contact:** [dchapagain.dev@gmail.com](mailto:dchapagain.dev@gmail.com). Email is best.

---

## License

- **Code:** MIT, see [`LICENSE.md`](./LICENSE.md)
- **Personal content** (resume, bio, project writeups, images): all rights reserved, see [`CONTENT_LICENSE.md`](./CONTENT_LICENSE.md)

If you fork this, please replace all personal content first.
