import { baseTheme } from '~/theme/baseTheme'
import { initTheme } from '~/theme'
import { hash, hashObjectIgnoreKeyOrder } from '@saulx/hash'

const vars = initTheme()

export type cssColorString = 'inherit' | 'currentColor' | `var(${string})`
export type AccentColor = keyof typeof baseTheme.colors
export type BaseColor = `light${AccentColor}` | AccentColor
export type ColorVariant = 'active' | 'border' | 'hover' | 'contrast'
export type StateColor = `${BaseColor}:${ColorVariant}`
export type Color = BaseColor | StateColor | cssColorString

type ColorFn = {
  (name: Color, variant?: ColorVariant, light?: boolean):
    | cssColorString
    | undefined
  (name: Color, light?: boolean, empty?: undefined): cssColorString | undefined
}

export const color: ColorFn = (
  name,
  variant,
  light
): cssColorString | undefined => {
  if (typeof name === 'string') {
    if (name === 'inherit' || name === 'currentColor' || /^var\(/.test(name)) {
      return name as cssColorString
    }
    if (variant === true) {
      variant = undefined
      light = true
    }
    if (name in vars) {
      if (variant) {
        return color(`${name}:${variant}` as Color, undefined, light)
      }
      const key = light && !name.startsWith('light') ? `light${name}` : name
      return vars[key]
    }
    if (name.includes(':')) {
      return color(
        name.substring(0, name.indexOf(':')) as Color,
        undefined,
        light
      )
    }
  }
  return undefined
}

const colors = Object.keys(baseTheme.colors).filter(
  (name) =>
    !(
      name.startsWith('text') ||
      name.startsWith('background') ||
      name.startsWith('border') ||
      name.startsWith('grey')
    )
)

export const colorByIndex = (index, variant, light) =>
  color(colorNameByIndex(index), variant, light)

export const colorNameByIndex = (index): Color =>
  colors[index % colors.length] as AccentColor

const availableHashColors: Color[] = [
  'babyblue',
  'sailorblue',
  'reddish',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'pink',
  'purple',
  'mustard',
]
const hashColorCache: { [key: string]: Color } = {}
export const hashColor = (value: any) => {
  if (!value) value = ''
  const h =
    typeof value === 'object' ? hashObjectIgnoreKeyOrder(value) : hash(value)
  if (!hashColorCache[h]) {
    const color =
      availableHashColors[
        Object.keys(hashColorCache).length % availableHashColors.length
      ]
    hashColorCache[h] = color
  }
  return hashColorCache[h]
}
