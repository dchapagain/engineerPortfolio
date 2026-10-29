import { useEffect, useState } from 'react'

type ViewportInset = {
  keyboardInset: number
  viewportHeight: number | null
}

/*
 * Keeps the dock above an on-screen keyboard. Lives in the always-mounted dock,
 * which is why this one still takes an enabled flag.
 */
export function useVisualViewportInset(enabled: boolean): ViewportInset {
  const [keyboardInset, setKeyboardInset] = useState(0)
  const [viewportHeight, setViewportHeight] = useState<number | null>(null)

  useEffect(() => {
    if (!enabled) return

    const viewport = window.visualViewport
    if (!viewport) return

    const syncViewport = () => {
      setKeyboardInset(Math.max(0, window.innerHeight - (viewport.height + viewport.offsetTop)))
      setViewportHeight(viewport.height)
    }

    syncViewport()
    viewport.addEventListener('resize', syncViewport)
    viewport.addEventListener('scroll', syncViewport)

    return () => {
      viewport.removeEventListener('resize', syncViewport)
      viewport.removeEventListener('scroll', syncViewport)
      setKeyboardInset(0)
      setViewportHeight(null)
    }
  }, [enabled])

  return { keyboardInset, viewportHeight }
}
