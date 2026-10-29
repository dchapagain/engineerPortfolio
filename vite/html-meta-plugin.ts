import type { Plugin } from 'vite'

// Node-context import: site.ts must stay side-effect-free and free of
// browser-only APIs, since this file imports it directly at build time.
import { site } from '../src/data/site'

const { url, ogImage } = site.meta
const PAGE_URL = `${url}/`
const OG_IMAGE_URL = `${url}${ogImage.path}`
const TITLE = `${site.name} - ${site.role}`

function escapeHtmlAttribute(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

/*
 * JSON-LD is a script body, not an attribute, so HTML entity escaping would
 * corrupt it. Escaping `<` is what prevents a value from closing the script
 * element early, and it stays valid JSON.
 */
function serializeJsonLd(value: unknown): string {
  return (
    JSON.stringify(value, null, 2)
      .replaceAll('<', '\\u003c')
      // Line up continuation lines under the script tag's own indent, so view
      // source reads as cleanly as the rest of the document.
      .replaceAll('\n', '\n      ')
  )
}

/*
 * The served HTML is an empty root div, so this graph is the only machine
 * readable description of who the site is about. Search crawlers render the
 * app and see the rest; the crawlers behind generative answers largely do not,
 * and read what the server returns.
 *
 * Everything here is derived from site.ts rather than written out, so the
 * structured data cannot drift from the page it describes.
 */
function buildJsonLd() {
  const personId = `${url}/#person`
  const websiteId = `${url}/#website`

  const socials = Object.values(site.social)
  const profiles = socials.map((link) => link.href).filter((href) => href.startsWith('https://'))
  const email = socials.find((link) => link.href.startsWith('mailto:'))?.href.slice(7)
  const employer = site.experiences.find((entry) => entry.current)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: site.name,
        url: PAGE_URL,
        jobTitle: site.role,
        description: site.tagline,
        image: OG_IMAGE_URL,
        ...(email ? { email } : {}),
        sameAs: profiles,
        knowsAbout: site.skills.flatMap((group) => group.items.map((item) => item.name)),
        ...(employer ? { worksFor: { '@type': 'Organization', name: employer.company } } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: PAGE_URL,
        name: TITLE,
        inLanguage: 'en',
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${url}/#webpage`,
        url: PAGE_URL,
        name: TITLE,
        description: site.tagline,
        inLanguage: 'en',
        isPartOf: { '@id': websiteId },
        about: { '@id': personId },
        mainEntity: { '@id': personId },
        primaryImageOfPage: OG_IMAGE_URL,
      },
    ],
  }
}

export function htmlMetaPlugin(): Plugin {
  const replacements: Record<string, string> = {
    '{{SITE_TITLE}}': escapeHtmlAttribute(TITLE),
    '{{SITE_NAME}}': escapeHtmlAttribute(site.name),
    '{{SITE_DESCRIPTION}}': escapeHtmlAttribute(site.tagline),
    '{{PAGE_URL}}': escapeHtmlAttribute(PAGE_URL),
    '{{OG_IMAGE}}': escapeHtmlAttribute(OG_IMAGE_URL),
    '{{OG_IMAGE_ALT}}': escapeHtmlAttribute(ogImage.alt),
    '{{OG_IMAGE_WIDTH}}': String(ogImage.width),
    '{{OG_IMAGE_HEIGHT}}': String(ogImage.height),
    '{{JSON_LD}}': serializeJsonLd(buildJsonLd()),
  }

  return {
    name: 'html-meta',
    transformIndexHtml(html) {
      return Object.entries(replacements).reduce(
        (result, [token, value]) => result.replaceAll(token, value),
        html,
      )
    },
  }
}
