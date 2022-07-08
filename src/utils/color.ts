import { isCapitalised } from '~/utils/isCapitalised'
import type { Color } from '~/types'

export const color = (name: Color, alpha?: number) => {
  if (name && isCapitalised(name[0])) {
    if (alpha === undefined) {
      return `rgba(var(--${name}))`
    }
    return `rgba(var(--${name}-rgb),${alpha})`
  }
  return name
}

const accentVersions = ['main', 'light'] as const
type AccentVersion = typeof accentVersions[number]
type AccentState = 'hover' | 'active' | 'text' | 'border'

const bgVersions = ['1dp', '2dp', '3dp', '4dp'] as const
type BgVersion = typeof bgVersions[number]
type BgState = 'text' | 'border'

const textVersions = ['primary', 'secondary'] as const
type TextVersion = typeof textVersions[number]
type TextState = 'hover' | 'active'

const colors = {
  accent: new Set(accentVersions),
  bg: new Set(bgVersions),
  text: new Set(textVersions),
}

const defaultVariant = {
  accent: accentVersions[0],
  bg: bgVersions[0],
  text: textVersions[0],
}

type ColorFn = {
  (name: 'accent', a?: AccentVersion, b?: AccentState): string
  (name: 'accent', a?: AccentState, b?: AccentVersion): string
  (name: 'bg', a?: BgVersion, b?: BgState): string
  (name: 'bg', a?: BgState, b?: BgVersion): string
  (name: 'text', a?: TextVersion, b?: TextState): string
  (name: 'text', a?: TextState, b?: TextVersion): string
}

export const __color__: ColorFn = (name, a, b) => {
  if (name in colors) {
    if (!a) {
      return `var(--${name}-${defaultVariant[name]}-default)`
    }
    if (colors[name].has(a)) {
      return `var(--${name}-${a}-${b || 'default'})`
    }
    return `var(--${name}-${b || defaultVariant[name]}-${a})`
  }
  return name
}
