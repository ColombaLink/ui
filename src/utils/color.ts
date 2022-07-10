// TODO put this somewehere else
import { rgbaToArr } from '../components/ColorPicker/utils'

const accentColors = {
  accent: 'rgba(61,83,231,1)',
  'accent:active': 'rgba(54,73,203,1)',
  'accent:border': 'rgba(61,83,231,1)',
  'accent:hover': 'rgba(56,76,213,1)',
  'accent:contrast': 'rgba(255,255,255,1)',

  text: 'rgba(15,16,19,0.87)',
  'text:active': 'rgba(15,16,19,0.87)',
  'text:border': 'rgba(15,16,19,0.87)',
  'text:hover': 'rgba(15,16,19,0.87)',
  'text:contrast': 'rgba(255,255,255,1)',

  text2: 'rgba(15,16,19,0.60)',
  'text2:active': 'rgba(15,16,19,0.60)',
  'text2:border': 'rgba(15,16,19,0.60)',
  'text2:hover': 'rgba(15,16,19,0.60)',
  'text2:contrast': 'rgba(255,255,255,1)',

  babyblue: 'rgba(79,175,248,1)',
  'babyblue:active': 'rgba(79,185,248, 1)',
  'babyblue:border': 'rgba(79,175,248,1)',
  'babyblue:hover': 'rgba(79,175,248, 0.10)',
  'babyblue:contrast': 'rgba(255,255,255,1)',

  reddish: 'rgba(237,103,98,1)',
  'reddish:active': 'rgba(237,103,98, 1)',
  'reddish:border': '#ed6762',
  'reddish:hover': 'rgba(237,103,98, 0.1)',
  'reddish:contrast': 'rgba(255,255,255,1)',

  red: 'rgba(244,67,54,1)',
  'red:active': 'rgba(205,56,45,1)',
  'red:border': 'rgba(244,67,54,1)',
  'red:hover': 'rgba(215,59,48,0.1)',
  'red:contrast': 'rgba(255,255,255,1)',

  yellow: 'rgba(227,183,81,1)',
  'yellow:active': 'rgba(227,183,81, 1)',
  'yellow:border': 'rgba(227,183,81,1)',
  'yellow:hover': 'rgba(227,183,81, 0.1)',
  'yellow:contrast': 'rgba(255,255,255,1)',

  green: 'rgba(86,187,112,1)',
  'green:active': 'rgba(86,187,112, 1)',
  'green:border': 'rgba(86,187,112,1)',
  'green:hover': 'rgba(86,187,112, 0.1)',
  'green:contrast': 'rgba(255,255,255,1)',

  teal: 'rgba(89,196,197,1)',
  'teal:active': 'rgba(89,196,197, 1)',
  'teal:border': 'rgba(89,196,197,1)',
  'teal:hover': 'rgba(89,196,197, 0.1)',
  'teal:contrast': 'rgba(255,255,255,1)',

  purple: 'rgba(154,82,246,1)',
  'purple:active': 'rgba(154,82,246, 1)',
  'purple:border': 'rgba(154,82,246,1)',
  'purple:hover': 'rgba(154,82,246, 0.10)',
  'purple:contrast': 'rgba(255,255,255, 0.87)',

  mustard: 'rgba(197,187,68,1)',
  'mustard:active': 'rgba(197,187,68, 1)',
  'mustard:border': 'rgba(197,187,68,1)',
  'mustard:hover': 'rgba(197,187,68, 0.1)',
  'mustard:contrast': 'rgba(255,255,255, 0.87)',

  grey: 'rgba(50,50,50,1.0)',
  'grey:active': 'rgba(0,0,0,1.0)',
  'grey:hover': 'rgba(33,33,33,1.0)',
  'grey:contrast': 'rgba(255,255,255,1.0)',
}

const systemColors = {
  background: 'rgba(255,255,255,1)',
  background2: 'rgba(247,247,248,1)',
  background2dp: 'rgba(255,255,255,1)',
  background3dp: 'rgba(255,255,255,1)',
  backdrop: 'rgba(15,16,19,0.24)',
  border: 'rgba(15,16,19, 0.08)',
  'border:hover': 'rgba(15,16,19, 0.12)',
  'border:active': 'rgba(61,83,231, 1)',
  'text-disabled': 'rgba(15,16,19, 0.38)',
}

// add some light version of all accent colors
const lightColors = {
  accent: 'rgba(131,145,237,0.12)',
  'accent:active': 'rgba(131,145,237,0.20)',
  'accent:border': 'rgba(131,145,237,0.20)',
  'accent:hover': 'rgba(131,145,237,0.16)',
  'accent:contrast': 'var(--accent)',

  grey: 'rgba(246,246,246,1.0)',
  'grey:active': 'rgba(241,241,241,1.0)',
  'grey:hover': 'rgba(241,241,241,1.0)',
  'grey:contrast': 'rgba(50,50,50,1.0)',
}

// lets add some light colors
for (const name in accentColors) {
  let lightVersion
  if (name in lightColors) {
    lightVersion = lightColors[name]
  } else if (name.endsWith(':contrast')) {
    lightVersion = `var(--${name.substring(0, name.indexOf(':'))})`
  } else {
    const [r, g, b] = rgbaToArr(accentColors[name])
    let a
    if (name.endsWith(':active')) {
      a = 0.24
    } else if (name.endsWith(':border')) {
      a = 0.24
    } else if (name.endsWith(':hover')) {
      a = 0.2
    } else {
      a = 0.16
    }

    lightVersion = `rgba(${r},${g},${b},${a})`
  }
  accentColors[`light${name}`] = lightVersion
}

export const colors = {
  ...accentColors,
  ...systemColors,
}

type cssColorString = 'inherit' | 'currentColor' | `var(${string})`

export type AccentColor = keyof typeof accentColors
export type LightColor = `light${AccentColor}`
export type Color =
  | keyof typeof systemColors
  | AccentColor
  | LightColor
  | cssColorString
export type ColorVariant = 'active' | 'border' | 'hover' | 'contrast'

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
    if (name in colors) {
      if (variant) {
        return color(`${name}:${variant}` as Color, null, light)
      }
      const v = name.replace(':', '_')
      return light && !name.startsWith('light')
        ? `var(--light${v})`
        : `var(--${v})`
    }
    if (name.includes(':')) {
      return color(name.substring(0, name.indexOf(':')) as Color, null, light)
    }
  }
  return null
}
