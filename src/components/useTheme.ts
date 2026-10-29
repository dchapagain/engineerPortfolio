import { useCallback, useEffect, useState } from 'react'

import { THEME_TYPE } from '@/data/constants'

type Theme = (typeof THEME_TYPE)[keyof typeof THEME_TYPE]

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem('theme')
    if (stored === THEME_TYPE.light || stored === THEME_TYPE.dark) return stored
  } catch {
    // Ignore
  }

  return null
}

// Mirrors the bootstrap script in index.html. The two must agree or the first
// paint flashes the wrong theme.
function getInitialTheme(): Theme {
  const stored = readStoredTheme()
  if (stored) return stored

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEME_TYPE.dark
    : THEME_TYPE.light
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === THEME_TYPE.dark) root.classList.add(THEME_TYPE.dark)
    else root.classList.remove(THEME_TYPE.dark)
  }, [theme])

  /*
   * Storage is written only on an explicit choice. Persisting on mount would
   * pin whatever the OS happened to prefer on the first visit, after which the
   * site would stop following the OS forever.
   */
  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === THEME_TYPE.dark ? THEME_TYPE.light : THEME_TYPE.dark
      try {
        localStorage.setItem('theme', next)
      } catch {
        // Ignore
      }

      return next
    })
  }, [])

  return { theme, toggle }
}
