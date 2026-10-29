import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

// Module private: a non-component export here would trip react-refresh.
const ICON_ACTION_CLASS = [
  'inline-flex items-center justify-center gap-2 px-3 py-2',
  'border border-rule bg-surface text-fg',
  // Same hover language as the nav links.
  'underline-offset-4 transition-colors hover:border-accent-text hover:text-accent-text',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-fill',
  'ring-offset-2 ring-offset-bg',
].join(' ')

type IconLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string
  children: ReactNode
}

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  children: ReactNode
}

// title defaults to the label, so sighted users get the same short description
// that assistive tech already reads.
export function IconLink({ label, className = '', children, ...props }: IconLinkProps) {
  return (
    <a
      aria-label={label}
      title={props.title ?? label}
      className={`${ICON_ACTION_CLASS} ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}

export function IconButton({ label, className = '', children, ...props }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      title={props.title ?? label}
      className={`${ICON_ACTION_CLASS} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
