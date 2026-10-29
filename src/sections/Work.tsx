import { CaseStudyRecord, Container, PlateHeader } from '@/components'
import { SECTION_IDS, site } from '@/data'

const TITLE_ID = `${SECTION_IDS.work}-title`

export function Work() {
  const work = site.sections.work

  return (
    <section id={SECTION_IDS.work} aria-labelledby={TITLE_ID} className="bg-band py-16">
      <Container>
        <PlateHeader plate={work.plate} title={work.title} titleId={TITLE_ID} />
        <p className="t-muted mt-3">{work.description}</p>

        <div className="mt-10">
          {site.projects.map((project) => (
            <CaseStudyRecord key={project.title} project={project} />
          ))}
        </div>
      </Container>
    </section>
  )
}
