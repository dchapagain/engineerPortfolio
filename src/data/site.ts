import { LINK_LABELS, SECTION_IDS } from './constants'
import type { SiteContent } from './types'

const NAME = 'Deepak Chapagain'

// Derived once here so components never re-derive it. Pure, so it stays safe
// for the Node-context import in vite/html-meta-plugin.ts.
const FIRST_NAME = NAME.trim().split(/\s+/)[0] ?? NAME

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
  name: NAME,
  firstName: FIRST_NAME,
  wordmark: `${FIRST_NAME} / Engineer`,
  role: 'Product Engineer',

  // Feeds the meta description via vite/html-meta-plugin.ts, so it stays a
  // full sentence rather than the shorter hero headline.
  tagline:
    'Product engineer building web and mobile products in React and React Native, with applied AI running in production.',

  meta: {
    url: 'https://deepakchapagain.com',
    ogImage: {
      // Versioned: public/ is not fingerprinted, and platforms cache share
      // images by URL for weeks.
      path: '/og-image-v2.png',
      alt: 'Deepak Chapagain, Product Engineer. Web, mobile, applied AI. Beside a blueprint of interface, systems and decisions arranged around a central user need.',
      width: 1200,
      height: 630,
    },
  },

  ctas: {
    primary: {
      label: 'Examine the work',
      href: `#${SECTION_IDS.work}`,
      title: 'Jump to the case studies',
    },
  },

  social,

  sections: {
    hero: {
      plate: 'PLATE 01',
      eyebrow: ['PRODUCT ENGINEERING', 'REACT · NATIVE · AI'],
      headline: ['Complex', 'underneath.', 'Simple on screen.'],
      headlineAccentIndex: 1,
      substance:
        'I build the systems behind effortless experiences. Web and mobile engineering since 2019, and a retrieval assistant running in production on this page.',
      caption: 'BUILT FOR REAL CONSTRAINTS / NOT JUST DEMOS',
      featuredMetricIds: ['webview-conversion', 'retail-overfetch'],
      chatCta: { label: 'Ask the assistant', title: 'Ask about my work' },
      figure: {
        label: 'FIG. 01',
        title: 'THE PRODUCT SYSTEM',
        footer: 'MODEL / CONSEQUENCES',
        scale: 'NOT TO SCALE',
        description:
          'Blueprint of interface, systems and decisions arranged around a central user need.',
        nodes: ['interface', 'systems', 'decisions'],
        center: ['USER', 'NEED'],
      },
    },
    readout: {
      plate: 'FIG. 02 / MEASURED OUTCOMES',
    },
    work: {
      plate: 'PLATE 02 / SELECTED WORK',
      title: 'Systems you can inspect.',
      description: 'Problem, approach, and the number that moved.',
    },
    // Plates are the major sections, figures are the exhibits between them.
    skills: {
      plate: 'FIG. 03 /',
      title: 'Stack',
    },
    experience: {
      plate: 'PLATE 03 / EXPERIENCE',
      title: 'Where the work happened.',
      description: 'Recent roles and impact areas.',
    },
    contact: {
      plate: 'PLATE 04 / CONTACT',
      title: 'Start a conversation.',
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
        submitTitle: 'Opens your email client',
        note: 'This form opens your email client.',
      },
    },
    principle: {
      plate: 'DESIGN RULE 001',
      statement: 'Make failure behavior as intentional as the success path.',
    },
  },

  labels: {
    skipToContent: 'Skip to content',
    primaryNav: 'Primary',
    footerNav: 'Footer',
    menu: { open: 'Open menu', close: 'Close menu' },
    caseStudy: {
      problem: 'Problem',
      approach: 'Approach',
      role: 'My Role',
      open: 'Problem / approach / role',
      close: 'Hide detail',
    },
    metric: {
      was: 'was',
      now: 'now',
      up: 'up',
      down: 'down',
      change: '{label}, {direction} from {baseline} to {current}',
    },
  },

  chat: {
    greeting: `Hi, I'm ${FIRST_NAME}. Ask me about my work.`,
    heading: `Chat with ${FIRST_NAME}`,
    subtitle: 'Answers grounded in my resume and case studies',
    placeholder: 'Ask me a question...',
    hint: 'Enter to send, Shift+Enter for new line',
    openLabel: `Open chat with ${FIRST_NAME}`,
    closeLabel: `Close chat with ${FIRST_NAME}`,
    sendLabel: 'Send message',
    logLabel: 'Chat messages',
    inputLabel: 'Ask a question',
    typingLabel: `${FIRST_NAME} typing`,
    suggestionsLabel: 'Try',
    suggestionTitle: 'Ask this question',
    suggestions: [
      'What did you ship at Tractor Supply?',
      'How does this assistant work?',
      'Where have you used React Native?',
    ],
  },

  // `icon` keys resolve against techIconMap in src/components/icons.ts.
  skills: [
    {
      group: 'Frontend',
      items: [
        { name: 'React', icon: 'react' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'Redux/RTK', icon: 'redux' },
        { name: 'Accessibility (WCAG)', icon: 'accessibility' },
      ],
    },
    {
      group: 'Mobile',
      items: [
        { name: 'React Native', icon: 'react' },
        { name: 'Android platform', icon: 'android' },
        { name: 'Native modules', icon: 'nativeModules' },
        { name: 'Kotlin', icon: 'kotlin' },
        { name: 'App performance', icon: 'performance' },
      ],
    },
    {
      group: 'Applied AI',
      items: [
        { name: 'RAG', icon: 'rag' },
        { name: 'Prompt safety', icon: 'promptSafety' },
        { name: 'Cloudflare Workers', icon: 'cloudflare' },
        { name: 'Embeddings', icon: 'embeddings' },
      ],
    },
    {
      group: 'API & Data',
      items: [
        { name: 'GraphQL', icon: 'graphql' },
        { name: 'REST', icon: 'rest' },
        { name: 'JWT auth patterns', icon: 'jwt' },
      ],
    },
    {
      group: 'Quality',
      items: [
        { name: 'Jest', icon: 'jest' },
        { name: 'React Testing Library', icon: 'testingLibrary' },
        { name: 'CI checks', icon: 'ci' },
      ],
    },
    {
      group: 'Observability',
      items: [
        { name: 'Dynatrace', icon: 'dynatrace' },
        { name: 'Splunk', icon: 'splunk' },
        { name: 'Crashlytics', icon: 'crashlytics' },
        { name: 'Quantum Metric', icon: 'analytics' },
      ],
    },
  ],

  footer: {
    copyright: '© {year} • {site.name}. All rights reserved.',
    links: ['resume', 'github', 'linkedin', 'email'],
  },

  // Case studies, ordered by the strength of the outcome they carry.
  projects: [
    {
      plate: '01 / mobile auth',
      title: 'Secure WebView integration.',
      context: 'Retail mobile app',
      headline:
        'A JWT handshake and session lifecycle that let a third party fraud check run inside the app without costing conversion.',
      problem:
        'Login reliability and fraud checks required a secure in-app WebView flow with consistent authentication and session handling.',
      approaches: [
        'Implemented JWT-based WebView handshake and session lifecycle controls.',
        'Integrated third-party fraud solution while maintaining a smooth UX across devices.',
      ],
      metrics: [
        {
          id: 'webview-approval',
          label: 'Checkout approval rate',
          /*
           * Held here until the figure and scope are taken from the resume,
           * which is the source of truth for it. Nothing renders while
           * `pending` is set. To publish it: fill in `value`, delete `pending`,
           * and add the id back to sections.hero.featuredMetricIds.
           */
          value: '',
          direction: 'up',
          pending: true,
        },
        {
          id: 'webview-conversion',
          label: 'Checkout conversion',
          value: '1.45 PP',
          direction: 'up',
        },
        {
          id: 'webview-login-errors',
          label: 'Login errors',
          value: '10%',
          direction: 'down',
          baseline: 100,
          current: 90,
        },
      ],
      pipeline: ['handshake', 'session', 'fraud check'],
      tech: ['React Native', 'JWT', 'Security', 'WebView'],
      role: 'Owned integration design and implementation; partnered with security stakeholders.',
    },
    {
      plate: '02 / retrieval architecture',
      title: 'Grounded AI, built as software.',
      context: 'This site, RAG on Cloudflare Workers',
      headline:
        'The model cannot author a URL. Replies reference destinations through a closed token vocabulary resolved on the client, so the reply path is injection resistant by construction.',
      problem:
        'A resume assistant that can link anywhere is a prompt injection surface, and a model that writes its own URLs cannot be bounded by review.',
      approaches: [
        'Replies emit approved tokens only; anything unrecognized renders as plain text, so the link set is bounded by the site data rather than by model output.',
        'Retrieval, serverless inference, and response caching run as ordinary versioned software with validated boundaries.',
      ],
      metrics: [],
      pipeline: ['ingest', 'retrieve', 'respond'],
      tech: ['RAG', 'Cloudflare Workers', 'Prompt safety', 'TypeScript'],
      role: 'Designed and built the retrieval service and the client contract it answers to.',
      live: 'live on this page',
    },
    {
      plate: '03 / data layer',
      title: 'Retail app modernization.',
      context: 'Tractor Supply Company (Consultant)',
      headline:
        'Moved key surfaces off over-fetching REST calls and onto query patterns shaped to what the screen actually renders.',
      problem:
        'REST-driven screens were over-fetching data, increasing payload size and slowing UI responsiveness on mid-tier devices.',
      approaches: [
        'Migrated key surfaces from REST to GraphQL and designed query patterns to reduce unnecessary fields.',
        'Improved UI rendering paths and added guardrails to catch regressions early.',
      ],
      metrics: [
        {
          id: 'retail-overfetch',
          label: 'API over-fetching',
          value: '40%',
          direction: 'down',
          baseline: 100,
          current: 60,
        },
        {
          id: 'retail-p90',
          label: 'p90 render time',
          value: '120ms',
          direction: 'down',
        },
      ],
      pipeline: ['query', 'shape', 'render'],
      tech: ['React', 'TypeScript', 'GraphQL', 'Performance'],
      role: 'Led front-end delivery; collaborated with backend and QA on release readiness.',
    },
  ],

  experiences: [
    {
      company: 'Tractor Supply Company (Consultant)',
      role: 'Technology Analyst',
      period: 'Sep 2024 - Present',
      current: true,
      points: [
        'Led front-end initiatives on a retail app with measurable performance and reliability outcomes.',
        'Owned the Android side of a React Native surface, including native modules and platform specific behavior.',
      ],
    },
    {
      company: 'Southern California Edison',
      role: 'Software Engineer',
      period: 'Previously',
      current: false,
      points: [
        'Delivered React features and modernization work; improved maintainability and testing standards.',
        'Implemented dashboards and monitoring to reduce incident volume.',
      ],
    },
  ],
} as const satisfies SiteContent
