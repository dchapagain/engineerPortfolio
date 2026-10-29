import { getFeaturedMetrics, site } from '@/data'

import { Container } from './Container'
import { MetricBlock } from './MetricBlock'

/** The measured outcomes the hero leads with, drawn from the case studies. */
export function ReadoutBand() {
  const metrics = getFeaturedMetrics()
  if (metrics.length === 0) return null

  // Both literals appear in source, so Tailwind generates each one.
  const columns = metrics.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'

  return (
    <div className="t-band-sm t-inverted">
      <Container>
        <div className="t-label">{site.sections.readout.plate}</div>
        <div className={`mt-5 grid gap-6 ${columns}`}>
          {metrics.map((metric) => (
            <div key={metric.id} className="border-l-2 border-rule pl-4">
              <MetricBlock metric={metric} size="lead" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
