import { site } from './site'
import type { Metric } from './types'

type ProjectMetricId = (typeof site.projects)[number]['metrics'][number]['id']

/*
 * Annotating with the derived union is the check: a hero id that does not name
 * a real case study metric is a type error here rather than an empty render.
 */
const FEATURED_IDS: readonly ProjectMetricId[] = site.sections.hero.featuredMetricIds

// reduce rather than flatMap: the per-project metric tuples have different
// literal types, which flatMap's overloads will not unify.
const ALL_METRICS: readonly Metric[] = site.projects.reduce<Metric[]>(
  (all, project) => [...all, ...project.metrics],
  [],
)

/**
 * A metric awaiting its figure is held in site.ts but never shown, so an
 * unfinished number cannot reach the page by being referenced somewhere.
 */
export function isPublishable(metric: Metric): boolean {
  return !metric.pending && metric.value.trim().length > 0
}

/** Hero metrics, in the order the hero declares rather than project order. */
export function getFeaturedMetrics(): readonly Metric[] {
  return FEATURED_IDS.map((id) => ALL_METRICS.find((metric) => metric.id === id)).filter(
    (metric): metric is Metric => metric !== undefined && isPublishable(metric),
  )
}
