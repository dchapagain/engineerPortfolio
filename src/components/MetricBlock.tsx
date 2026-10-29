import type { Metric } from '@/data'
import { site } from '@/data'

import { DeltaBar } from './DeltaBar'

const GLYPH = { up: '↑', down: '↓', flat: '·' } as const

type MetricBlockProps = {
  metric: Metric
  size: 'lead' | 'supporting'
}

export function MetricBlock({ metric, size }: MetricBlockProps) {
  const { up, down } = site.labels.metric

  return (
    <div>
      <div className={size === 'lead' ? 't-metric' : 't-metric-sm'}>
        <span aria-hidden="true">{GLYPH[metric.direction]}</span>
        <span className="sr-only">{metric.direction === 'down' ? down : up} </span>
        {metric.value}
      </div>
      <div className="t-label mt-2">{metric.label}</div>
      <DeltaBar
        baseline={metric.baseline}
        current={metric.current}
        direction={metric.direction}
        label={metric.label}
      />
    </div>
  )
}
