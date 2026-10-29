import { useEffect } from 'react'

/** Listens on window, so Escape works wherever focus sits. Memoize onDismiss. */
export function useDismissOnEscape(onDismiss: () => void): void {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      onDismiss()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onDismiss])
}
