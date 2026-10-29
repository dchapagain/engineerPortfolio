import { Button, ButtonLink, Container, SocialLinks } from '@/components'
import { BUTTON_VARIANT, SECTION_IDS, site } from '@/data'
import { prefetchChatPanel } from '@/features/chat'

import { HeroFigure } from './HeroFigure'

const HERO_TITLE_ID = `${SECTION_IDS.top}-title`

type HeroProps = {
  isChatOpen: boolean
  onToggleChat: () => void
}

export function Hero({ isChatOpen, onToggleChat }: HeroProps) {
  const hero = site.sections.hero

  return (
    <section id={SECTION_IDS.top} aria-labelledby={HERO_TITLE_ID} className="relative">
      <div aria-hidden="true" className="t-blueprint pointer-events-none absolute inset-0" />

      <Container>
        <div className="relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {hero.eyebrow.map((item) => (
                <span key={item} className="t-label">
                  {item}
                </span>
              ))}
            </div>

            <h1 id={HERO_TITLE_ID} className="t-hero mt-8">
              {hero.headline.map((line, index) => (
                <span key={line} className="block">
                  {index === hero.headlineAccentIndex ? (
                    <em className="font-normal text-accent">{line}</em>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            <p className="t-lede mt-7 max-w-[52ch]">{hero.substance}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href={site.ctas.primary.href} title={site.ctas.primary.title}>
                {site.ctas.primary.label}
                <span aria-hidden="true">→</span>
              </ButtonLink>
              <Button
                variant={BUTTON_VARIANT.secondary}
                type="button"
                title={hero.chatCta.title}
                onClick={onToggleChat}
                onPointerEnter={prefetchChatPanel}
                onFocus={prefetchChatPanel}
                aria-haspopup="dialog"
                aria-expanded={isChatOpen}
              >
                {hero.chatCta.label}
              </Button>
            </div>

            <p className="t-label mt-5 max-w-[26ch] leading-5">{hero.caption}</p>

            <SocialLinks
              items={[site.social.resume, site.social.linkedin]}
              className="mt-8 flex flex-wrap gap-3"
            />
          </div>

          <HeroFigure />
        </div>
      </Container>
    </section>
  )
}
