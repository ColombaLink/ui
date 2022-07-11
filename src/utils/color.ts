import { baseTheme } from '~/theme/baseTheme'
import { initTheme } from '~/theme'

const vars = initTheme()

export type cssColorString = 'inherit' | 'currentColor' | `var(${string})`
export type AccentColor = keyof typeof baseTheme.colors
export type BaseColor = `light${AccentColor}` | AccentColor
export type ColorVariant = 'active' | 'border' | 'hover' | 'contrast'
export type StateColor = `${BaseColor}:${ColorVariant}`
export type Color = BaseColor | StateColor | cssColorString

type ColorFn = {
  (name: Color, variant?: ColorVariant, light?: boolean): cssColorString | null
  (name: Color, light?: boolean, empty?: undefined): cssColorString | null
}

export const color: ColorFn = (name, variant, light): cssColorString | null => {
  if (name) {
    if (name === 'inherit' || name === 'currentColor' || /^var\(/.test(name)) {
      return name as cssColorString
    }
    if (variant === true) {
      variant = null
      light = true
    }
    if (name in vars) {
      if (variant) {
        return color(`${name}:${variant}` as Color, null, light)
      }
      const key = light && !name.startsWith('light') ? `light${name}` : name
      return vars[key]
    }
    if (name.includes(':')) {
      return color(name.substring(0, name.indexOf(':')) as Color, null, light)
    }
  }
  return null
}
