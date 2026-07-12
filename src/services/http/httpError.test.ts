import { describe, expect, it } from 'vitest'

import { HttpError, isRetryableHttpError } from './httpError'

describe('isRetryableHttpError', () => {
  it('treats non-HttpError values as retryable', () => {
    expect(isRetryableHttpError(new Error('not an HttpError'))).toBe(true)
    expect(isRetryableHttpError('nope')).toBe(true)
    expect(isRetryableHttpError(undefined)).toBe(true)
  })

  it('retries when explicitly marked retryable, even on a client status', () => {
    const error = new HttpError({ message: 'error message', retryable: true, status: 400 })
    expect(isRetryableHttpError(error)).toBe(true)
  })

  it('retries when there is no status (network-level failure)', () => {
    expect(isRetryableHttpError(new HttpError({ message: 'network down' }))).toBe(true)
  })

  it.each([408, 429, 500, 503])('retries on status %i', (status) => {
    expect(isRetryableHttpError(new HttpError({ message: 'server error', status }))).toBe(true)
  })

  it.each([400, 401, 404, 422])('does not retry on client status %i', (status) => {
    expect(isRetryableHttpError(new HttpError({ message: 'client error', status }))).toBe(false)
  })
})
