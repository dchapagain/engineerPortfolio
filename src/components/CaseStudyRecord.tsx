import type { CaseStudy } from '@/data'
import { isPublishable, site } from '@/data'

import { MetricBlock } from './MetricBlock'

export function CaseStudyRecord({ project }: { project: CaseStudy }) {
  const labels = site.labels.caseStudy
  const metrics = project.metrics.filter(isPublishable)

  return (
    // 11rem holds the widest lead metric ("1.45 PP" at text-metric) on one line.
    <article className="border-t border-rule py-8 first:border-t-0 first:pt-0 md:grid md:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] md:gap-10">
      <div className="mb-6 space-y-5 md:mb-0">
        {metrics.map((metric, index) => (
          <MetricBlock key={metric.id} metric={metric} size={index === 0 ? 'lead' : 'supporting'} />
        ))}
        {project.live ? (
          <span className="inline-block bg-accent-fill px-2 py-1 font-mono text-[11px] text-on-accent">
            {project.live}
          </span>
        ) : null}
      </div>

      <div>
        <div className="t-label">{project.plate}</div>
        <h3 className="t-record-title mt-1">{project.title}</h3>
        <div className="t-muted mt-1">{project.context}</div>

        <p className="t-card-meta mt-3 max-w-[62ch] text-muted">{project.headline}</p>

        <ol className="mt-4 flex flex-wrap items-center gap-2">
          {project.pipeline.map((step, index) => (
            <li key={step} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-muted">
                  →
                </span>
              ) : null}
              <span className="t-pip">{step}</span>
            </li>
          ))}
        </ol>

        <details className="group mt-4">
          <summary className="t-summary">
            <span aria-hidden="true" className="mr-2 group-open:hidden">
              +
            </span>
            <span aria-hidden="true" className="mr-2 hidden group-open:inline">
              −
            </span>
            <span className="group-open:hidden">{labels.open}</span>
            <span className="hidden group-open:inline">{labels.close}</span>
          </summary>

          <div className="mt-4 space-y-4 border-l-2 border-rule pl-4">
            <div>
              <div className="t-label">{labels.problem}</div>
              <p className="t-card-meta mt-1 max-w-[62ch] text-muted">{project.problem}</p>
            </div>
            <div>
              <div className="t-label">{labels.approach}</div>
              <ul className="t-card-meta mt-1 max-w-[62ch] list-disc space-y-1 pl-5 text-muted">
                {project.approaches.map((approach) => (
                  <li key={approach}>{approach}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="t-label">{labels.role}</div>
              <p className="t-card-meta mt-1 max-w-[62ch] text-muted">{project.role}</p>
            </div>
          </div>
        </details>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <li key={item} className="t-tech">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
