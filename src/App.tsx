import { lazy, Suspense, useCallback, useEffect, useState } from 'react'

import { Footer, ReadoutBand } from '@/components'
import { MAIN_CONTENT_ID, site } from '@/data'
import { ChatDock } from '@/features/chat'
import { Contact, Experience, Hero, Nav, Principle, Work } from '@/sections'

/*
 * Lazy because the stack band carries every brand glyph, about 12 kB gzip,
 * and it sits well below the fold. Imported by path rather than through the
 * sections barrel, which would pull it back into the eager graph.
 */
const Skills = lazy(() =>
  import('@/sections/Skills').then((module) => ({ default: module.Skills })),
)

// Matches the band's own height so the swap causes no layout shift.
const SKILLS_FALLBACK = <div className="t-band-sm border-y border-rule bg-surface" />

export default function App() {
  /*
   * Lifted here rather than owned by the dock: App is what renders both the
   * hero button and the dock, and owning the flag is what lets the lazy panel
   * import be triggered from either one.
   */
  const [isChatOpen, setIsChatOpen] = useState(false)
  // Toggles rather than opens: the hero button is the panel's disclosure
  // control, so a second press on it has to put the panel away again.
  const toggleChat = useCallback(() => setIsChatOpen((open) => !open), [])

  // Off the critical path, but fetched long before anyone scrolls to it.
  useEffect(() => {
    const prefetch = () => void import('@/sections/Skills')

    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(prefetch)
      return () => window.cancelIdleCallback?.(handle)
    }

    const timer = window.setTimeout(prefetch, 1500)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-bg font-sans text-fg">
      <a
        href={`#${MAIN_CONTENT_ID}`}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-rule focus:bg-surface focus:px-3 focus:py-2"
      >
        {site.labels.skipToContent}
      </a>

      <Nav />

      <main id={MAIN_CONTENT_ID} tabIndex={-1}>
        <Hero isChatOpen={isChatOpen} onToggleChat={toggleChat} />
        <ReadoutBand />
        <Work />
        <Suspense fallback={SKILLS_FALLBACK}>
          <Skills />
        </Suspense>
        <Experience />
        <Principle />
        <Contact />
      </main>

      <Footer />
      <ChatDock isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
    </div>
  )
}
