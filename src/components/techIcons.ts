import {
  Accessibility,
  Activity,
  Binary,
  Blocks,
  Database,
  Gauge,
  KeyRound,
  ShieldCheck,
  Webhook,
} from 'lucide-react'
import {
  SiAndroid,
  SiCloudflare,
  SiDynatrace,
  SiFirebase,
  SiGithubactions,
  SiGraphql,
  SiJest,
  SiKotlin,
  SiReact,
  SiRedux,
  SiSplunk,
  SiTestinglibrary,
  SiTypescript,
} from 'react-icons/si'

import { asIcon } from './icons'

/*
 * Stack glyphs, kept out of icons.ts and out of the components barrel on
 * purpose: iconMap is imported eagerly, so anything sharing a module with it
 * lands in the initial bundle. These brand paths are around 12 kB gzip, and
 * they belong in the lazy Skills chunk instead.
 *
 * Brand marks come from react-icons; anything without a brand (a practice
 * rather than a product) takes a lucide glyph that stands for it.
 */
export const techIconMap = {
  react: asIcon(SiReact),
  typescript: asIcon(SiTypescript),
  redux: asIcon(SiRedux),
  accessibility: asIcon(Accessibility),
  android: asIcon(SiAndroid),
  kotlin: asIcon(SiKotlin),
  nativeModules: asIcon(Blocks),
  performance: asIcon(Gauge),
  rag: asIcon(Database),
  promptSafety: asIcon(ShieldCheck),
  cloudflare: asIcon(SiCloudflare),
  embeddings: asIcon(Binary),
  graphql: asIcon(SiGraphql),
  rest: asIcon(Webhook),
  jwt: asIcon(KeyRound),
  jest: asIcon(SiJest),
  testingLibrary: asIcon(SiTestinglibrary),
  ci: asIcon(SiGithubactions),
  dynatrace: asIcon(SiDynatrace),
  splunk: asIcon(SiSplunk),
  crashlytics: asIcon(SiFirebase),
  analytics: asIcon(Activity),
} as const

export type TechIconKey = keyof typeof techIconMap
