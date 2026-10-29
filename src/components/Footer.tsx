import { site } from '@/data'

import { Container } from './Container'
import { SocialLinks } from './SocialLinks'

// Inverted like the three small bands, so the page closes on a fill.
export function Footer() {
  const footer = site.footer
  const links = footer.links.map((key) => site.social[key])
  const year = new Date().getFullYear()
  const copyright = footer.copyright
    .replace('{year}', String(year))
    .replace('{site.name}', site.name)

  return (
    <footer className="t-inverted py-10">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-label">{copyright}</p>

          {/* Reserves the corner the chat launcher sits in. */}
          <nav aria-label={site.labels.footerNav} className="pr-16">
            <SocialLinks items={links} />
          </nav>
        </div>
      </Container>
    </footer>
  )
}
