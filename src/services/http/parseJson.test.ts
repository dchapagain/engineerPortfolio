import { describe, expect, it } from 'vitest'

import { parseJsonResponse } from './parseJson'

describe('parseJsonResponse', () => {
  it('returns all nulls for an empty body', async () => {
    const result = await parseJsonResponse(new Response(''))
    expect(result).toEqual({ data: null, rawText: null, parseError: null })
  })

  it('parses valid JSON and preserves the raw text', async () => {
    const result = await parseJsonResponse(new Response('{"key": "value"}'))
    expect(result).toEqual({
      data: { key: 'value' },
      rawText: '{"key": "value"}',
      parseError: null,
    })
  })

  it('reports a parse error for malformed JSON without throwing', async () => {
    const result = await parseJsonResponse(new Response('invalid json'))
    expect(result.data).toBeNull()
    expect(result.rawText).toBe('invalid json')
    expect(result.parseError).toBeInstanceOf(Error)
  })
})
