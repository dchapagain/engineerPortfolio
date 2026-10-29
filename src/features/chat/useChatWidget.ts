import { useCallback, useMemo, useState } from 'react'

import { site } from '@/data'

import { requestChatReply, toChatErrorMessage } from './chatApi'
import type { ChatMessage } from './types'

function createMessage(role: ChatMessage['role'], text: string): ChatMessage {
  return {
    id: `${role}-${crypto.randomUUID()}`,
    role,
    text,
    timestamp: new Date().toISOString(),
  }
}

/*
 * Owned by ChatDock rather than the lazy panel: the panel unmounts on close,
 * which would take the conversation with it.
 */
export function useChatWidget() {
  const [draft, setDraft] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createMessage('assistant', site.chat.greeting),
  ])

  const canSend = useMemo(() => draft.trim().length > 0 && !isSending, [draft, isSending])

  const sendQuestion = useCallback(
    async (question: string) => {
      const nextQuestion = question.trim()

      if (!nextQuestion || isSending) {
        return
      }

      setIsSending(true)
      setMessages((current) => [...current, createMessage('user', nextQuestion)])

      try {
        const answer = await requestChatReply(nextQuestion)
        setMessages((current) => [...current, createMessage('assistant', answer)])
      } catch (error) {
        const message = toChatErrorMessage(error)
        setMessages((current) => [...current, createMessage('assistant', message)])
      } finally {
        setIsSending(false)
      }
    },
    [isSending],
  )

  const submitDraft = useCallback(() => {
    const nextQuestion = draft.trim()
    if (!nextQuestion) return

    setDraft('')

    return sendQuestion(nextQuestion)
  }, [draft, sendQuestion])

  return {
    canSend,
    draft,
    isSending,
    messages,
    sendQuestion,
    setDraft,
    submitDraft,
  }
}
