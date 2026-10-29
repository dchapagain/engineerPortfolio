/*
 * Deliberately not part of SECTION_IDS: ChatResponseContent builds the chat
 * link allowlist from Object.values(SECTION_IDS), so anything added there
 * becomes a destination the model can link to.
 */
export const MAIN_CONTENT_ID = 'main-content'

export const SECTION_IDS = {
  top: 'top',
  work: 'work',
  skills: 'skills',
  experience: 'experience',
  contact: 'contact',
} as const

export const LINK_LABELS = {
  resume: 'Resume',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  email: 'Email',
} as const

// `description` is the hover title, so it says where the link goes rather than
// repeating the label, which would add nothing to the accessible name.
export const NAV_ITEMS = [
  {
    label: 'Work',
    href: `#${SECTION_IDS.work}`,
    description: 'Case studies and the numbers that moved',
  },
  { label: 'Skills', href: `#${SECTION_IDS.skills}`, description: 'Tools and patterns I work in' },
  {
    label: 'Experience',
    href: `#${SECTION_IDS.experience}`,
    description: 'Recent roles and impact areas',
  },
  { label: 'Contact', href: `#${SECTION_IDS.contact}`, description: 'Get in touch by email' },
] as const

export const BUTTON_VARIANT = {
  primary: 'primary',
  secondary: 'secondary',
} as const

export const THEME_TYPE = {
  light: 'light',
  dark: 'dark',
} as const

export const THEME_LABELS = {
  light: 'Light',
  dark: 'Dark',
} as const
