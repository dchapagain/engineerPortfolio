import type { MetricDirection } from '@/data'

export type DeltaGeometry = {
  baselinePercent: number
  currentPercent: number
  improved: boolean
}

/*
 * Both segments scale against the larger value, so the longer bar is always
 * exactly 100%. With no axis to label, relative length is the only honest
 * encoding of the comparison.
 *
 * Returns null wherever a bar would be meaningless or misleading; the caller
 * renders nothing in that case rather than drawing a stub.
 */
export function toDeltaGeometry(
  baseline: number,
  current: number,
  direction: MetricDirection,
): DeltaGeometry | null {
  if (!Number.isFinite(baseline) || !Number.isFinite(current)) return null
  if (baseline < 0 || current < 0) return null

  const largest = Math.max(baseline, current)
  if (largest === 0) return null

  return {
    baselinePercent: (baseline / largest) * 100,
    currentPercent: (current / largest) * 100,
    improved: direction === 'down' ? current < baseline : current > baseline,
  }
}
