import { THEME_LABELS, THEME_TYPE } from '@/data'

import { IconButton } from './IconAction'
import { iconMap } from './icons'
import { useTheme } from './useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === THEME_TYPE.dark
  const Icon = isDark ? iconMap.sun : iconMap.moon
  const target = isDark ? THEME_LABELS.light : THEME_LABELS.dark

  return (
    // The accessible name contains the visible word, per WCAG Label in Name.
    <IconButton label={`Switch to ${target} theme`} onClick={toggle} type="button" className="px-2">
      <Icon aria-hidden="true" focusable="false" size={18} />
      <span className="hidden text-sm sm:inline">{target}</span>
    </IconButton>
  )
}
