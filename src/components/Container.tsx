import type { PropsWithChildren } from 'react'

/*
 * Full bleed with percentage gutters, matching the Systems Atlas mock, which
 * uses `padding: Xpx 4%` on every band and sets no max width. Line length is
 * held by the measure caps on the text blocks instead.
 */
export function Container({ children }: PropsWithChildren) {
  return <div className="w-full px-[4%]">{children}</div>
}
