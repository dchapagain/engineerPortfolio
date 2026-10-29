import type { FormEvent } from 'react'

import { Button, Card, Container, PlateHeader, SocialLinks } from '@/components'
import { SECTION_IDS, site } from '@/data'

const links = Object.keys(site.sections.contact.actions).map(
  (key) => site.social[key as keyof typeof site.social],
)

const TITLE_ID = `${SECTION_IDS.contact}-title`

export function Contact() {
  const contact = site.sections.contact

  const onFormSubmission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name'))
    const message = String(data.get('message'))
    const subject = encodeURIComponent(`${contact.form.subjectPrefix} ${name}`)
    const body = encodeURIComponent(message)
    window.location.href = `${site.social.email.href}?subject=${subject}&body=${body}`
  }

  return (
    <section id={SECTION_IDS.contact} aria-labelledby={TITLE_ID} className="bg-band py-16">
      <Container>
        <PlateHeader plate={contact.plate} title={contact.title} titleId={TITLE_ID} />

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="t-muted max-w-[48ch]">{contact.description}</p>
            <SocialLinks items={links} className="mt-5 flex flex-wrap gap-3" />
          </div>

          <Card>
            <form onSubmit={onFormSubmission}>
              <label className="block" htmlFor="contact-name">
                <span className="t-label">{contact.form.nameLabel}</span>
                <input id="contact-name" name="name" required className="t-input" />
              </label>

              <label className="mt-4 block" htmlFor="contact-message">
                <span className="t-label">{contact.form.messageLabel}</span>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  className="t-input"
                />
              </label>

              <Button type="submit" title={contact.form.submitTitle} className="mt-5 w-full">
                {contact.form.submitLabel}
              </Button>

              <p className="t-label mt-3">{contact.form.note}</p>
            </form>
          </Card>
        </div>
      </Container>
    </section>
  )
}
