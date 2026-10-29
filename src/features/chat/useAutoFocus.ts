import type { RefObject } from 'react'
import { useEffect, useRef } from 'react'

/** Focuses on mount. The panel only mounts when open, so there is no gate. */
export function useAutoFocus<T extends HTMLElement>(): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return ref
}
