import { MessageCircle } from 'lucide-react'
import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef } from 'react'

import { site } from '@/data'

import { prefetchChatPanel } from './prefetchChatPanel'
import { useChatWidget } from './useChatWidget'
import { useVisualViewportInset } from './useVisualViewportInset'

// Named export, so map it rather than reshaping the module to a default.
const ChatPanel = lazy(() =>
  import('./ChatPanel').then((module) => ({ default: module.ChatPanel })),
)

const PANEL_SIZE = 'h-[min(70vh,34rem)] w-[min(calc(100vw-2rem),24rem)]'

// Layout phase: the panel autofocuses from a passive effect, and a child's
// passive effects run first, so a passive capture here records the textarea.
// useEffect without a DOM, or the prerender warns on a layout effect.
const useOpenerCapture = typeof document === 'undefined' ? useEffect : useLayoutEffect

type ChatDockProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

/*
 * Stays in the initial bundle so the launcher exists on first paint, and holds
 * the conversation state so closing the panel does not discard it. Framer
 * Motion is confined to ChatPanel, which is the point of the split.
 */
export function ChatDock({ isOpen, onOpenChange }: ChatDockProps) {
  const chat = useChatWidget()
  const launcherRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const { keyboardInset, viewportHeight } = useVisualViewportInset(isOpen)

  useOpenerCapture(() => {
    if (!isOpen) return

    // Ignore body: when the panel is opened without a focused trigger there is
    // nowhere meaningful to return to, and the launcher is the better target.
    const active = document.activeElement
    returnFocusRef.current =
      active instanceof HTMLElement && active !== document.body ? active : null
  }, [isOpen])

  const close = useCallback(() => {
    onOpenChange(false)

    // The launcher remounts in the same commit the panel unmounts, so the node
    // it needs to focus does not exist until after paint.
    window.requestAnimationFrame(() => {
      // A detached opener swallows focus and drops the reader on <body>.
      const opener = returnFocusRef.current
      const target = opener?.isConnected ? opener : launcherRef.current
      target?.focus()
    })
  }, [onOpenChange])

  const open = useCallback(() => onOpenChange(true), [onOpenChange])

  return (
    <div
      className="pointer-events-none fixed right-4 z-50"
      style={{ bottom: `calc(1rem + env(safe-area-inset-bottom, 0px) + ${keyboardInset}px)` }}
    >
      {isOpen ? (
        <Suspense fallback={<div className={`t-chat-panel pointer-events-auto ${PANEL_SIZE}`} />}>
          <ChatPanel chat={chat} onClose={close} viewportHeight={viewportHeight} />
        </Suspense>
      ) : (
        <div className="relative flex items-center justify-end">
          <div className="t-chat-ripple-layer" aria-hidden="true">
            <span className="t-chat-ripple-glow" />
            <span className="t-chat-ripple-ring" />
            <span className="t-chat-ripple-ring t-chat-ripple-ring-delay" />
          </div>

          <button
            ref={launcherRef}
            type="button"
            onClick={open}
            onPointerEnter={prefetchChatPanel}
            onFocus={prefetchChatPanel}
            className="t-chat-launcher pointer-events-auto relative z-10"
            aria-expanded={isOpen}
            aria-label={site.chat.openLabel}
            title={site.chat.openLabel}
          >
            <MessageCircle className="t-chat-bob h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
