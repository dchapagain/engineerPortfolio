import { describe, expect, it } from 'vitest'

import { toDeltaGeometry } from './deltaGeometry'

describe('toDeltaGeometry', () => {
  it('scales both segments against the larger value', () => {
    expect(toDeltaGeometry(100, 60, 'down')).toEqual({
      baselinePercent: 100,
      currentPercent: 60,
      improved: true,
    })
  })

  it('puts the larger segment at 100% when the metric grew', () => {
    const geometry = toDeltaGeometry(61, 85, 'up')

    expect(geometry?.currentPercent).toBe(100)
    expect(geometry?.baselinePercent).toBeCloseTo(71.76, 2)
    expect(geometry?.improved).toBe(true)
  })

  it('does not count an unchanged value as an improvement', () => {
    expect(toDeltaGeometry(50, 50, 'down')?.improved).toBe(false)
    expect(toDeltaGeometry(50, 50, 'up')?.improved).toBe(false)
  })

  it('reads direction when deciding whether the change was an improvement', () => {
    expect(toDeltaGeometry(100, 120, 'down')?.improved).toBe(false)
    expect(toDeltaGeometry(100, 120, 'up')?.improved).toBe(true)
  })

  it('handles a zero baseline without dividing by zero', () => {
    expect(toDeltaGeometry(0, 85, 'up')).toEqual({
      baselinePercent: 0,
      currentPercent: 100,
      improved: true,
    })
  })

  it('returns null when both values are zero, since the bar would mean nothing', () => {
    expect(toDeltaGeometry(0, 0, 'down')).toBeNull()
  })

  it('returns null for negative or non-finite input', () => {
    expect(toDeltaGeometry(-1, 10, 'down')).toBeNull()
    expect(toDeltaGeometry(10, -1, 'down')).toBeNull()
    expect(toDeltaGeometry(Number.NaN, 10, 'down')).toBeNull()
    expect(toDeltaGeometry(10, Number.POSITIVE_INFINITY, 'up')).toBeNull()
  })
})
