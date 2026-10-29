import type { PropsWithChildren } from 'react'

export function Card({ className = '', children }: PropsWithChildren<{ className?: string }>) {
  return <div className={`border border-rule bg-surface p-5 ${className}`}>{children}</div>
}
