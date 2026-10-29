import { describe, expect, it } from 'vitest'

import { getFeaturedMetrics, isPublishable } from './metrics'
import { site } from './site'
import type { Metric } from './types'

// Widened to Metric: the per-project literals do not all declare the
// optional fields, so the union has no baseline or current to read.
const allMetrics: readonly Metric[] = site.projects.flatMap((project) => [...project.metrics])

describe('isPublishable', () => {
  it('holds back a metric still awaiting its figure', () => {
    const metric: Metric = { id: 'x', label: 'X', value: '', direction: 'up', pending: true }

    expect(isPublishable(metric)).toBe(false)
  })

  it('holds back an empty value even when pending was not set', () => {
    const metric: Metric = { id: 'x', label: 'X', value: '   ', direction: 'up' }

    expect(isPublishable(metric)).toBe(false)
  })

  it('publishes a metric that carries a figure', () => {
    const metric: Metric = { id: 'x', label: 'X', value: '40%', direction: 'down' }

    expect(isPublishable(metric)).toBe(true)
  })
})

describe('getFeaturedMetrics', () => {
  it('returns publishable hero metrics in the order the hero declares', () => {
    const expected = site.sections.hero.featuredMetricIds.filter((id) =>
      allMetrics.some((metric) => metric.id === id && isPublishable(metric)),
    )

    expect(getFeaturedMetrics().map((metric) => metric.id)).toEqual(expected)
  })

  it('never features a metric that is not publishable', () => {
    // An unfinished number must not reach the page by being referenced here.
    expect(getFeaturedMetrics().every(isPublishable)).toBe(true)
  })
})

describe('case study metrics', () => {
  it('declares baseline and current together or not at all', () => {
    // A half filled pair renders no bar and reports no error, so pin it here.
    const halfFilled = allMetrics.filter(
      (metric) => (metric.baseline === undefined) !== (metric.current === undefined),
    )

    expect(halfFilled).toEqual([])
  })

  it('uses unique ids, since the hero looks metrics up by id', () => {
    const ids = allMetrics.map((metric) => metric.id)

    expect(new Set(ids).size).toBe(ids.length)
  })
})
