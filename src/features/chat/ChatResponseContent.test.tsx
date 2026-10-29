import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { site } from '@/data'

import { ChatResponseContent } from './ChatResponseContent'

/*
 * The backend is model-generated and must never be able to author a URL. These
 * cases pin the closed token vocabulary: approved tokens resolve, and anything
 * else degrades to plain text with no anchor at all.
 */
describe('ChatResponseContent link tokens', () => {
  it('resolves a section token to a same-page anchor', () => {
    render(<ChatResponseContent text="See [my work](#work)." onNavigation={vi.fn()} />)

    const link = screen.getByRole('link', { name: 'my work' })
    expect(link).toHaveAttribute('href', '#work')
    expect(link).not.toHaveAttribute('target')
  })

  it('resolves a site token to the address held in site data', () => {
    render(<ChatResponseContent text="[GitHub](site:github)" onNavigation={vi.fn()} />)

    const link = screen.getByRole('link', { name: 'GitHub' })
    expect(link).toHaveAttribute('href', site.social.github.href)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('calls onNavigation when a same-page link is followed', async () => {
    const onNavigation = vi.fn()
    render(<ChatResponseContent text="[Contact](#contact)" onNavigation={onNavigation} />)

    screen.getByRole('link', { name: 'Contact' }).click()

    expect(onNavigation).toHaveBeenCalledTimes(1)
  })

  it.each([
    ['an unknown section', '[Nope](#nope)', 'Nope'],
    ['an unknown site key', '[Nope](site:unknown)', 'Nope'],
    ['a javascript scheme', '[Click](javascript:alert(1))', 'Click'],
    ['an arbitrary external URL', '[Site](https://evil.example)', 'Site'],
    ['a protocol relative URL', '[Site](//evil.example)', 'Site'],
  ])('renders %s as plain text with no anchor', (_name, input, label) => {
    render(<ChatResponseContent text={input} onNavigation={vi.fn()} />)

    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.getByText(label, { exact: false })).toBeInTheDocument()
  })

  it('keeps the text around a rejected token intact', () => {
    render(
      <ChatResponseContent
        text="before [Site](https://evil.example) after"
        onNavigation={vi.fn()}
      />,
    )

    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.getByText(/before Site after/)).toBeInTheDocument()
  })

  it('maps a legacy cached URL back onto its token', () => {
    render(
      <ChatResponseContent
        text="[Contact](https://www.deepakchapagain.com/#contact)"
        onNavigation={vi.fn()}
      />,
    )

    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact')
  })
})
