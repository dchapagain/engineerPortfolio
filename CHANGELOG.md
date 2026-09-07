# Changelog

All notable changes to this project are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

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

[Unreleased]: https://github.com/dchapagain/engineerPortfolio/compare/v0.3.1...HEAD
[0.3.1]: https://github.com/dchapagain/engineerPortfolio/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/dchapagain/engineerPortfolio/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/dchapagain/engineerPortfolio/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/dchapagain/engineerPortfolio/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/dchapagain/engineerPortfolio/releases/tag/v0.1.0
