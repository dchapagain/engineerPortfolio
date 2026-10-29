import { Download, Github, Linkedin, Mail, Menu, Moon, Sun, X } from 'lucide-react'
import { ComponentType, SVGProps } from 'react'

export type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>

// The two libraries type their components differently; this keeps the maps
// readable instead of repeating a cast on every entry.
export const asIcon = (component: unknown) => component as IconComponent

export const iconMap = {
  download: asIcon(Download),
  mail: asIcon(Mail),
  sun: asIcon(Sun),
  moon: asIcon(Moon),
  menu: asIcon(Menu),
  close: asIcon(X),
  github: asIcon(Github),
  linkedin: asIcon(Linkedin),
} as const

export type IconKey = keyof typeof iconMap
