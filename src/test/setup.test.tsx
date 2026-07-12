import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

// Verifies the Vitest, jsdom, RTL, and jest-dom setup.
describe('test setup', () => {
  it('renders a component and finds it with jest-dom matchers', () => {
    render(<span>ok</span>)

    expect(screen.getByText('ok')).toBeInTheDocument()
  })
})
