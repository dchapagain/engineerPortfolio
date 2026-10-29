import type { CSSProperties } from 'react'
import { Fragment } from 'react'

import { Container } from '@/components'
import type { TechIconKey } from '@/components/techIcons'
import { techIconMap } from '@/components/techIcons'
import { SECTION_IDS, site } from '@/data'

const TITLE_ID = `${SECTION_IDS.skills}-title`

/*
 * The run is rendered twice so the track can translate by exactly one run and
 * loop without a seam. Only the first copy is exposed, since the second is
 * duplicate text.
 */
function StackRun({ duplicate = false }: { duplicate?: boolean }) {
  let index = 0

  return (
    <ul className="t-marquee-run" aria-hidden={duplicate || undefined}>
      {site.skills.map((skill) => (
        <Fragment key={skill.group}>
          <li className="t-label whitespace-nowrap">{skill.group}</li>
          {skill.items.map((item) => {
            const Icon = techIconMap[item.icon as TechIconKey]
            // Drives the per-tile animation offset.
            const style = { '--i': index++ } as CSSProperties

            return (
              <li
                key={`${skill.group}-${item.name}`}
                className="t-dock-slot"
                style={style}
                title={item.name}
              >
                <span className="t-dock-tile">
                  <Icon aria-hidden="true" focusable="false" size={22} />
                  <span className="sr-only">{item.name}</span>
                </span>
              </li>
            )
          })}
        </Fragment>
      ))}
    </ul>
  )
}

export function Skills() {
  const skills = site.sections.skills

  return (
    <section id={SECTION_IDS.skills} aria-labelledby={TITLE_ID} className="t-band-sm t-inverted">
      <Container>
        <div className="flex items-baseline gap-2">
          <span className="t-label">{skills.plate}</span>
          <h2 id={TITLE_ID} className="t-label">
            {skills.title}
          </h2>
        </div>
      </Container>

      {/* Full bleed: the track should run edge to edge, not inside the gutters. */}
      <div className="t-marquee mt-4">
        <div className="t-marquee-track">
          <StackRun />
          <StackRun duplicate />
        </div>
      </div>
    </section>
  )
}
