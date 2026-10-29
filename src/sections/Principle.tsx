import { Container } from '@/components'
import { site } from '@/data'

/*
 * Carries the same treatment as the other two small bands: inverted ground,
 * shared height. The plate label and the display face are what mark it as a
 * statement rather than an exhibit.
 */
export function Principle() {
  const principle = site.sections.principle

  return (
    <section className="t-band-sm t-inverted">
      <Container>
        <div className="t-label">{principle.plate}</div>
        <p className="t-section mt-4 max-w-[24ch]">{principle.statement}</p>
      </Container>
    </section>
  )
}
