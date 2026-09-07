import { LINK_LABELS, SECTION_IDS } from './constants'

const social = {
  resume: {
    label: LINK_LABELS.resume,
    href: '/Deepak_Chapagain_Resume.pdf',
    external: true,
    icon: 'download',
  },
  github: {
    label: LINK_LABELS.github,
    href: 'https://github.com/dchapagain',
    external: true,
    icon: 'github',
  },
  linkedin: {
    label: LINK_LABELS.linkedin,
    href: 'https://www.linkedin.com/in/dchapagain/',
    external: true,
    icon: 'linkedin',
  },
  email: {
    label: LINK_LABELS.email,
    href: 'mailto:dchapagain.dev@gmail.com',
    external: false,
    icon: 'mail',
  },
} as const

// Single source of truth for all user-facing site content and data.
export const site = {
  name: 'Deepak Chapagain',
  role: 'Software Engineer',
  location: 'Nashville, TN',
  tagline:
    'I build performant, accessible React and React Native products with pragmatic architecture and measurable impacts.',
  ctas: {
    primary: { label: 'View Work', href: `#${SECTION_IDS.work}` },
    secondary: { label: 'Resume', href: social.resume.href, icon: social.resume },
  },

  social,

  highlights: [
    'React / TypeScript / React Native / Node / Kotlin / Java',
    'REST / GraphQL / Secure auth pattern',
    'Testing culture / Observability',
  ],

  sections: {
    hero: {
      body: 'I ship production-grade UI with strong performance, accessibility, and quality guardrails - built for teams that move fast without breaking things.',
      snapshot: {
        title: 'Snapshot',
        items: [
          { label: 'Focus', value: 'Front-end + Mobile' },
          { label: 'Strength', value: 'Performance + Quality' },
          { label: 'API', value: 'REST + GraphQL + Auth' },
          { label: 'Workflow', value: 'CI + Observability' },
        ],
      },
    },
    work: {
      title: 'Featured Work',
      description:
        'Selected projects framed as mini case studies - problem, approach, and measurable impact.',
    },
    skills: {
      title: 'Skills',
      description: 'Tools and patterns I use to ship reliable software.',
    },
    experience: {
      title: 'Experience',
      description: 'Recent roles and impact areas.',
    },
    contact: {
      title: 'Contact',
      description: 'Want to discuss a role, a contract, or a collaboration? Email works best.',
      actions: {
        email: LINK_LABELS.email,
        github: LINK_LABELS.github,
        linkedin: LINK_LABELS.linkedin,
      },
      form: {
        nameLabel: 'Name',
        messageLabel: 'Message',
        subjectPrefix: 'Portfolio inquiry from',
        submitLabel: 'Send via email',
        note: 'This form opens your email client.',
      },
    },
  },

  labels: {
    skipToContent: 'Skip to content',
    footerNav: 'Footer',
    caseStudy: {
      problem: 'Problem',
      approach: 'Approach',
      tech: 'Tech',
      role: 'My Role',
    },
  },

  skills: [
    { group: 'Frontend', items: ['React', 'TypeScript', 'Redux/RTK', 'Accessibility (WCAG)'] },
    { group: 'Mobile', items: ['React Native', 'Kotlin', 'WebView', 'App performance'] },
    { group: 'API & Data', items: ['GraphQL', 'REST', 'JWT auth patterns'] },
    { group: 'Quality', items: ['Jest', 'React Testing Library', 'CI checks'] },
    { group: 'Observability', items: ['Dynatrace', 'Splunk', 'Crashlytics', 'Quantum Metric'] },
  ],

  footer: {
    copyright: '© {year} • {site.name}. All rights reserved.',
    links: ['resume', 'github', 'linkedin', 'email'],
  },

  // case studies: measurable outcomes and clear impact is important
  projects: [
    {
      title: 'Retail App Modernization',
      context: 'Tractor Supply Company (Consultant)',
      problem:
        'REST-driven screens were over-fetching data, increasing payload size and slowing UI responsiveness on mid-tier devices.',
      approaches: [
        'Migrated key surfaces from REST to GraphQL and designed query patterns to reduce unnecessary fields.',
        'Improved UI rendering paths and added guardrails to catch regressions early.',
      ],
      impacts: [
        { label: 'Over-fetching', value: '↓ 40%' },
        { label: 'p90 render time', value: '↓ 120ms' },
      ],
      tech: ['React', 'TypeScript', 'GraphQL', 'Performance'],
      role: 'Led front-end delivery; collaborated with backend and QA on release readiness.',
      cta: { label: 'Discuss this project', href: `#${SECTION_IDS.contact}` },
    },
    {
      title: 'Secure WebView Integration',
      context: 'Retail Mobile App',
      problem:
        'Login reliability and fraud checks required a secure in-app WebView flow with consistent authentication and session handling.',
      approaches: [
        'Implemented JWT-based WebView handshake and session lifecycle controls.',
        'Integrated third-party fraud solution while maintaining a smooth UX across devices.',
      ],
      impacts: [
        { label: 'Login errors', value: '↓ 10%' },
        { label: 'Conversion', value: '↑ 1.45 PP' },
      ],
      tech: ['React Native', 'JWT', 'Security', 'WebView'],
      role: 'Owned integration design and implementation; partnered with security stakeholders.',
      cta: { label: 'Discuss this project', href: `#${SECTION_IDS.contact}` },
    },
    {
      title: 'Testing & Observability Uplift',
      context: 'Southern California Edison',
      problem:
        'Legacy patterns and limited test coverage increased defect risk and slowed delivery.',
      approaches: [
        'Refactored class components to hooks and consolidated state patterns to improve maintainability.',
        'Established Jest + RTL conventions and dashboards for proactive monitoring.',
      ],
      impacts: [
        { label: 'Unit coverage', value: '↑ to 85%' },
        { label: 'Bundle size', value: '↓ 9%' },
      ],
      tech: ['React', 'Jest', 'RTL', 'Monitoring'],
      role: 'Drove quality standards; mentored teammates on testing patterns.',
      cta: { label: 'Discuss this project', href: `#${SECTION_IDS.contact}` },
    },
  ],

  experiences: [
    {
      company: 'Tractor Supply Company (Consultant)',
      role: 'Technology Analyst',
      period: 'Sep 2024 – Present',
      points: [
        'Led front-end initiatives on a retail app with measurable performance and reliability outcomes.',
        'Partnered cross-functionally to ship features with strong quality and monitoring.',
      ],
    },
    {
      company: 'Southern California Edison',
      role: 'Software Engineer',
      period: 'Previously',
      points: [
        'Delivered React features and modernization work; improved maintainability and testing standards.',
        'Implemented dashboards and monitoring to reduce incident volume.',
      ],
    },
  ],
} as const
