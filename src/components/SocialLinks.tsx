import { IconLink } from './IconAction'
import type { IconKey } from './icons'
import { iconMap } from './icons'

type LinkItem = {
  label: string
  href: string
  external: boolean
  icon: IconKey
}

type Props = {
  items: readonly LinkItem[]
  iconSize?: number
  className?: string
}

/*
 * One element per link. The label is hidden with a utility rather than by
 * rendering a second copy of every link, which is what put 20 anchors in the
 * DOM for 4 destinations.
 */
export function SocialLinks({ items, iconSize = 18, className = 'flex flex-wrap gap-3' }: Props) {
  return (
    <div className={className}>
      {items.map((item) => {
        const Icon = iconMap[item.icon]
        const external = Boolean(item.external)

        return (
          <IconLink
            key={item.label}
            label={item.label}
            href={item.href}
            target={external ? '_blank' : '_self'}
            rel={external ? 'noopener noreferrer' : undefined}
            className="px-2 sm:px-3"
          >
            <Icon aria-hidden="true" focusable="false" size={iconSize} />
            <span className="hidden text-sm sm:inline">{item.label}</span>
          </IconLink>
        )
      })}
    </div>
  )
}
