import type { RefObject, UIEventHandler } from 'react'
import { useEffect, useRef, useState } from 'react'

const NEAR_BOTTOM_PX = 48

type ScrollAnchor<T extends HTMLElement> = {
  ref: RefObject<T>
  onScroll: UIEventHandler<T>
}

/*
 * Follows new content only while the reader is already at the bottom, so
 * scrolling back to re-read is not yanked away by the next message.
 */
export function useScrollAnchor<T extends HTMLElement>(
  trigger: unknown,
  smooth: boolean,
): ScrollAnchor<T> {
  const ref = useRef<T>(null)
  const [isNearBottom, setIsNearBottom] = useState(true)

  useEffect(() => {
    if (!isNearBottom) return

    const node = ref.current
    if (!node) return

    node.scrollTo({ top: node.scrollHeight, behavior: smooth ? 'smooth' : 'auto' })
  }, [isNearBottom, smooth, trigger])

  const onScroll: UIEventHandler<T> = (event) => {
    const target = event.currentTarget
    const distanceFromBottom = target.scrollHeight - target.scrollTop - target.clientHeight
    setIsNearBottom(distanceFromBottom < NEAR_BOTTOM_PX)
  }

  return { ref, onScroll }
}
