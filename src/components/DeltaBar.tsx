import type { MetricDirection } from '@/data'
import { site } from '@/data'

import { toDeltaGeometry } from './deltaGeometry'

type DeltaBarProps = {
  baseline?: number
  current?: number
  direction: MetricDirection
  label: string
}

/*
 * Meaning is carried by segment length, vertical position, the was/now text
 * labels and the sr-only sentence. Colour is the last channel, never the only
 * one.
 *
 * Widths are inline styles on purpose: Tailwind scans source text, so a class
 * built at runtime would never be generated.
 */
export function DeltaBar({ baseline, current, direction, label }: DeltaBarProps) {
  if (baseline === undefined || current === undefined) return null

  const geometry = toDeltaGeometry(baseline, current, direction)
  if (!geometry) return null

  const { was, now, change, up, down } = site.labels.metric
  const description = change
    .replace('{label}', label)
    .replace('{direction}', direction === 'down' ? down : up)
    .replace('{baseline}', String(baseline))
    .replace('{current}', String(current))

  return (
    <div className="mt-2">
      <div aria-hidden="true" className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="t-label w-7">{was}</span>
          <span
            className="t-delta-baseline block h-0.5 bg-rule"
            style={{ width: `${geometry.baselinePercent}%` }}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="t-label w-7">{now}</span>
          <span
            className="t-delta-current block h-0.5 bg-accent"
            style={{ width: `${geometry.currentPercent}%` }}
          />
        </div>
      </div>
      <span className="sr-only">{description}</span>
    </div>
  )
}
