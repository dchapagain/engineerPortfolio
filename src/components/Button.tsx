import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import { BUTTON_VARIANT } from '@/data'

type Variant = keyof typeof BUTTON_VARIANT

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  variant?: Variant
  children: ReactNode
}

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  children: ReactNode
}

// Square corners and the nav's underline-on-hover, so every control reads the
// same way.
const base =
  'inline-flex items-center justify-center gap-3 px-4 py-3 text-sm font-medium ' +
  'underline-offset-4 transition hover:underline ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-fill ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

/*
 * Solid fills take their foreground from the paired token, never from text-fg.
 * The filled variant shifts fill rather than text on hover, since recolouring
 * the label on a dark fill would fail contrast.
 */
const variants: Record<Variant, string> = {
  [BUTTON_VARIANT.primary]:
    'bg-emphasis text-on-emphasis hover:bg-accent-fill hover:text-on-accent',
  [BUTTON_VARIANT.secondary]:
    'border border-emphasis bg-transparent text-fg hover:border-accent-text hover:text-accent-text',
}

export function ButtonLink({
  variant = BUTTON_VARIANT.primary,
  className = '',
  children,
  ...props
}: AnchorProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  )
}

export function Button({
  variant = BUTTON_VARIANT.primary,
  className = '',
  children,
  ...props
}: NativeButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
