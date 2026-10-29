import { Card, Container, PlateHeader } from '@/components'
import { SECTION_IDS, site } from '@/data'

const TITLE_ID = `${SECTION_IDS.experience}-title`

export function Experience() {
  const experience = site.sections.experience

  return (
    <section id={SECTION_IDS.experience} aria-labelledby={TITLE_ID} className="py-16">
      <Container>
        <PlateHeader plate={experience.plate} title={experience.title} titleId={TITLE_ID} />
        <p className="t-muted mt-3">{experience.description}</p>

        <div className="mt-8 grid gap-4">
          {site.experiences.map((entry) => (
            <Card key={entry.company + entry.role}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-medium">{entry.company}</h3>
                  <div className="t-card-meta text-muted">{entry.role}</div>
                </div>
                <div className="t-label">{entry.period}</div>
              </div>

              <ul className="t-card-meta mt-3 list-disc space-y-1 pl-5 text-muted">
                {entry.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
