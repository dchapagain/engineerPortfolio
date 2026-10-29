import { httpRequest, isHttpError } from '@/services/http'

import type { ChatQueryRequest, ChatQueryResponseData } from './types'

const DEFAULT_CHAT_API_URL = '/api/query'

const DOMAIN_URL = import.meta.env.VITE_DOMAIN_URL?.replace(/\/+$/, '') ?? ''
const CHAT_ENDPOINT = `${DOMAIN_URL}${DEFAULT_CHAT_API_URL}`

/*
 * Aligns with the backend's KV and R2 caching constraints, so it is a protocol
 * limit rather than a UI preference. Changing it requires a backend change.
 */
export const MAX_INPUT_CHARACTERS = 480

export async function requestChatReply(question: string): Promise<string> {
  if (question.length > MAX_INPUT_CHARACTERS) {
    throw new Error(`Questions are limited to ${MAX_INPUT_CHARACTERS} characters.`)
  }

  const response = await httpRequest<ChatQueryResponseData, ChatQueryRequest>({
    url: CHAT_ENDPOINT,
    method: 'POST',
    body: { question },
    timeoutMs: 20_000,
    retry: {
      retries: 1,
      delayMs: 600,
    },
  })

  if (!response.ok) {
    throw new Error(response.error?.details ?? response.message)
  }

  const answer = response.data?.answer?.trim()

  if (!answer) {
    throw new Error("I couldn't generate a response just now.")
  }

  return answer
}

export function toChatErrorMessage(error: unknown): string {
  if (isHttpError(error)) {
    if (error.code === 'TIMEOUT') {
      return 'I took too long to respond. Please try again.'
    }

    if (error.code === 'NETWORK_ERROR') {
      return "I'm having trouble reaching the network. Please check your connection and retry."
    }

    return error.message
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return "I'm unable to respond right now. Please try again."
}
