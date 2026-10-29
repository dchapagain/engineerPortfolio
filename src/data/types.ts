/*
 * Content model for src/data/site.ts.
 *
 * This file is pulled into the tsconfig.node.json program through
 * vite/html-meta-plugin.ts, where lib is ES2023 with no DOM. Keep it free of
 * DOM types and of any runtime import.
 */

export type MetricDirection = 'up' | 'down' | 'flat'

export type Metric = {
  id: string
  label: string
  /** Authored display string, without the direction glyph. */
  value: string
  direction: MetricDirection
  /*
   * Only set where the claim itself entails a baseline, which is what a stated
   * relative percentage does ("down 40%" is 100 to 60). Absolute figures such
   * as "120ms" have no implied starting point, so they carry no pair and draw
   * no bar. Inventing one would put a number on the site that is not on the
   * resume.
   */
  baseline?: number
  current?: number
  /*
   * Awaiting a figure from the resume. A pending metric is kept in the content
   * so the slot is not forgotten, but nothing renders it, so an unfinished
   * number cannot reach the page.
   */
  pending?: boolean
}

export type CaseStudy = {
  /** Plate index and subject, e.g. "01 / mobile auth". */
  plate: string
  title: string
  context: string
  /** The one line claim shown before the disclosure is opened. */
  headline: string
  problem: string
  approaches: readonly string[]
  metrics: readonly Metric[]
  /** Three step mini diagram shown under the headline. */
  pipeline: readonly string[]
  tech: readonly string[]
  role: string
  /** Badge text for work the visitor can use on this page. */
  live?: string
}

export type SocialLink = {
  label: string
  href: string
  external: boolean
  icon: string
}

export type SiteContent = {
  name: string
  firstName: string
  wordmark: string
  role: string
  tagline: string
  /*
   * Everything the build needs to write the document head. Consumed only by
   * vite/html-meta-plugin.ts, which runs in Node, so nothing here reaches a
   * component.
   */
  meta: {
    /*
     * Canonical origin, no trailing slash. This is the public site, not
     * VITE_DOMAIN_URL, which is the chat API host and is a different origin.
     */
    url: string
    /** Absolute path under public/, and the dimensions of the file there. */
    ogImage: { path: string; alt: string; width: number; height: number }
  }
  ctas: {
    primary: { label: string; href: string; title: string }
  }
  social: Record<string, SocialLink>
  sections: {
    hero: {
      plate: string
      eyebrow: readonly string[]
      headline: readonly string[]
      headlineAccentIndex: number
      substance: string
      caption: string
      featuredMetricIds: readonly string[]
      chatCta: { label: string; title: string }
      figure: {
        label: string
        title: string
        footer: string
        scale: string
        description: string
        nodes: readonly string[]
        center: readonly string[]
      }
    }
    readout: { plate: string }
    work: { plate: string; title: string; description: string }
    skills: { plate: string; title: string }
    experience: { plate: string; title: string; description: string }
    contact: {
      plate: string
      title: string
      description: string
      actions: Record<string, string>
      form: {
        nameLabel: string
        messageLabel: string
        subjectPrefix: string
        submitLabel: string
        submitTitle: string
        note: string
      }
    }
    principle: { plate: string; statement: string }
  }
  labels: {
    skipToContent: string
    primaryNav: string
    footerNav: string
    menu: { open: string; close: string }
    caseStudy: {
      problem: string
      approach: string
      role: string
      open: string
      close: string
    }
    metric: {
      was: string
      now: string
      up: string
      down: string
      change: string
    }
  }
  chat: {
    greeting: string
    heading: string
    subtitle: string
    placeholder: string
    hint: string
    openLabel: string
    closeLabel: string
    sendLabel: string
    logLabel: string
    inputLabel: string
    typingLabel: string
    suggestionsLabel: string
    suggestionTitle: string
    suggestions: readonly string[]
  }
  skills: readonly {
    group: string
    items: readonly { name: string; icon: string }[]
  }[]
  footer: { copyright: string; links: readonly string[] }
  projects: readonly CaseStudy[]
  experiences: readonly {
    company: string
    role: string
    period: string
    /*
     * Marks the employer that `worksFor` points at in the structured data.
     * Required rather than optional, so a new entry cannot quietly leave the
     * question unanswered.
     */
    current: boolean
    points: readonly string[]
  }[]
}
