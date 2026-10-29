import { useEffect, useRef, useState } from 'react'

import { Container, IconButton, iconMap, ThemeToggle } from '@/components'
import { NAV_ITEMS, SECTION_IDS, site } from '@/data'

// One nav element serves both breakpoints: a dropdown below md, an inline row
// above it. Two would put a duplicate navigation landmark in the document.
const PRIMARY_NAV_ID = 'primary-nav'

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const MenuIcon = isMenuOpen ? iconMap.close : iconMap.menu

  useEffect(() => {
    if (!isMenuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    // pointerdown rather than click: the menu should close as the press lands,
    // and the dropdown lives inside the header, so contains() covers it.
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setIsMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [isMenuOpen])

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-rule bg-bg/85 backdrop-blur"
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          {/* DM Mono tops out at 500, so presence comes from size and tracking. */}
          <a
            href={`#${SECTION_IDS.top}`}
            title={site.name}
            className="group flex shrink-0 items-center gap-3 font-mono text-sm font-medium uppercase tracking-[0.08em] transition-colors hover:text-accent-text"
          >
            {/* Wordmark glyph, same diamond the share card's header carries. */}
            <svg
              viewBox="0 0 64 64"
              aria-hidden="true"
              focusable="false"
              className="h-7 w-7 shrink-0 text-emphasis transition-colors group-hover:text-accent-text"
            >
              <path
                d="M32 11L53 32L32 53L11 32Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="9"
              />
            </svg>
            {site.wordmark}
          </a>

          <nav
            id={PRIMARY_NAV_ID}
            aria-label={site.labels.primaryNav}
            className={`${isMenuOpen ? 'flex' : 'hidden'} absolute inset-x-0 top-16 flex-col gap-1 border-b border-rule bg-bg px-[4%] py-3 shadow-soft md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:px-0 md:py-0 md:shadow-none`}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                title={item.description}
                onClick={() => setIsMenuOpen(false)}
                className="t-label t-hover-link py-2 font-medium md:py-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />

            <IconButton
              type="button"
              label={isMenuOpen ? site.labels.menu.close : site.labels.menu.open}
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls={PRIMARY_NAV_ID}
              className="px-2 md:hidden"
            >
              <MenuIcon aria-hidden="true" focusable="false" size={18} />
            </IconButton>

            <span className="t-label hidden lg:inline">{site.sections.hero.plate}</span>
          </div>
        </div>
      </Container>
    </header>
  )
}
