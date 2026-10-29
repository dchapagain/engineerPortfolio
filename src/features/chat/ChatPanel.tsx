import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { SendHorizontal, X } from 'lucide-react'
import type { FormEventHandler } from 'react'
import { useId } from 'react'

import { site } from '@/data'

import { MAX_INPUT_CHARACTERS } from './chatApi'
import { ChatResponseContent } from './ChatResponseContent'
import { useAutoFocus } from './useAutoFocus'
import type { useChatWidget } from './useChatWidget'
import { useDismissOnEscape } from './useDismissOnEscape'
import { useScrollAnchor } from './useScrollAnchor'

function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

type ChatPanelProps = {
  chat: ReturnType<typeof useChatWidget>
  onClose: () => void
  viewportHeight: number | null
}

export function ChatPanel({ chat, onClose, viewportHeight }: ChatPanelProps) {
  const { canSend, draft, isSending, messages, sendQuestion, setDraft, submitDraft } = chat
  const copy = site.chat
  const shouldReduceMotion = useReducedMotion()

  const headingId = useId()
  const panelId = useId()
  const textAreaRef = useAutoFocus<HTMLTextAreaElement>()
  const log = useScrollAnchor<HTMLDivElement>(
    `${messages.length}:${isSending}`,
    !shouldReduceMotion,
  )

  useDismissOnEscape(onClose)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    void submitDraft()
  }

  const messageDuration = shouldReduceMotion ? 0.06 : 0.18
  const showSuggestions = messages.length === 1 && !isSending

  return (
    <motion.section
      id={panelId}
      role="dialog"
      aria-modal="false"
      aria-labelledby={headingId}
      className="t-chat-panel pointer-events-auto h-[min(70vh,34rem)] w-[min(calc(100vw-2rem),24rem)]"
      style={
        viewportHeight
          ? { height: `${Math.min(544, Math.max(320, viewportHeight - 112))}px` }
          : undefined
      }
      // No opacity: the panel docks over the FIG. 01 plate on the same
      // --surface ground, so a cross-fade showed the plate through it.
      initial={shouldReduceMotion ? false : { y: 16, scale: 0.985 }}
      animate={{ y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 360, damping: 34, mass: 0.86 }}
    >
      {/*
        A div, not a header: role="dialog" overrides the section's implicit
        semantics, so a <header> here is no longer scoped and axe counts it as
        a second banner landmark alongside the page header.
      */}
      <div className="flex items-center justify-between border-b border-rule px-4 py-3">
        <div>
          <h2 id={headingId} className="text-sm font-medium text-fg">
            {copy.heading}
          </h2>
          <p className="t-label mt-1">{copy.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="t-chat-icon-btn"
          aria-label={copy.closeLabel}
          title={copy.closeLabel}
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div
        ref={log.ref}
        role="log"
        aria-label={copy.logLabel}
        onScroll={log.onScroll}
        // overscroll-contain stops a scroll that reaches either end of the log
        // from chaining through to the page behind the panel.
        className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-3 py-3"
      >
        <AnimatePresence initial={false}>
          {messages.map((message) => {
            const isUser = message.role === 'user'

            return (
              <motion.article
                key={message.id}
                layout={!shouldReduceMotion}
                className={`t-chat-message ${isUser ? 't-chat-message-user' : 't-chat-message-assistant'}`}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.99 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: messageDuration, ease: 'easeOut' }}
              >
                <ChatResponseContent text={message.text} onNavigation={onClose} />
                <p className={`mt-1 text-[11px] ${isUser ? 'text-on-accent/85' : 'text-muted'}`}>
                  {formatTime(message.timestamp)}
                </p>
              </motion.article>
            )
          })}
        </AnimatePresence>

        {isSending ? (
          <div className="mr-auto flex max-w-[85%] items-end gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center border border-rule bg-fg/5 text-[10px] font-medium text-muted">
              {site.firstName[0]}
            </span>

            <div
              className="inline-flex items-center gap-1 border border-rule bg-bg px-3 py-2"
              aria-label={copy.typingLabel}
            >
              {[0, 0.14, 0.28].map((delay) => (
                <motion.span
                  key={delay}
                  className="inline-block h-2 w-2 bg-muted/80"
                  animate={
                    shouldReduceMotion
                      ? { opacity: 0.7 }
                      : { opacity: [0.3, 1, 0.3], y: [0, -2, 0] }
                  }
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: 0.9,
                          repeat: Number.POSITIVE_INFINITY,
                          delay,
                          ease: 'easeInOut',
                        }
                  }
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {showSuggestions ? (
        <div className="border-t border-rule px-3 pb-1 pt-3">
          <div className="t-label">{copy.suggestionsLabel}</div>
          <div className="mt-2 grid gap-2">
            {copy.suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="t-chat-suggestion"
                title={copy.suggestionTitle}
                onClick={() => void sendQuestion(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="border-t border-rule p-3">
        <label htmlFor={`${panelId}-input`} className="sr-only">
          {copy.inputLabel}
        </label>
        <div className="flex items-end gap-2">
          <textarea
            id={`${panelId}-input`}
            ref={textAreaRef}
            rows={1}
            maxLength={MAX_INPUT_CHARACTERS}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                void submitDraft()
              }
            }}
            placeholder={copy.placeholder}
            className="t-input mt-0 max-h-28 min-h-[42px] resize-none"
          />

          <button
            type="submit"
            disabled={!canSend}
            className="t-chat-send"
            aria-label={copy.sendLabel}
            title={copy.sendLabel}
          >
            <SendHorizontal className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="t-label">{copy.hint}</p>
          <p className="t-label">
            {draft.length}/{MAX_INPUT_CHARACTERS}
          </p>
        </div>
      </form>
    </motion.section>
  )
}
