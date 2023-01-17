import { baseTheme } from './baseTheme'
import { getDarkMode, setDarkMode } from '~/hooks/useDarkMode'
import { prefersDarkMode } from '~/utils/prefersDarkMode'

export const values = {}
export const vars = {}
export let currentTheme
export const updateTheme = (theme = currentTheme) => {
  currentTheme = theme
  const { colors, light = {} } = theme
  const toRgba = (arr) => (arr.length === 3 ? `rgb(${arr})` : `rgba(${arr})`)
  const alpha = ([r, g, b], a) => [r, g, b, a]
  const names = new Set([...Object.keys(colors), ...Object.keys(light)])

  names.forEach((name) => {
    const {
      m: main,
      a: active,
      h: hover,
      c: contrast,
      b: border,
    } = colors[name] || baseTheme.colors[name] || {}
    const {
      m: lMain,
      a: lActive,
      h: lHover,
      c: lContrast,
      b: lBorder,
    } = light[name] || baseTheme.light[name] || {}

    values[name] = main
    values[`${name}:active`] = active || main
    values[`${name}:hover`] = hover || main
    values[`${name}:contrast`] = contrast || main
    values[`${name}:border`] = border || main
    const lightName = `light${name}`
    values[lightName] = lMain || alpha(main, 0.08)
    values[`${lightName}:active`] = lActive || alpha(main, 0.16)
    values[`${lightName}:hover`] = lHover || alpha(main, 0.12)
    values[`${lightName}:contrast`] = lContrast || main
    values[`${lightName}:border`] = lBorder || alpha(main, 0.16)
  })

  let cnt = 0

  console.log(process.env)

  for (const name in values) {
    const varName =
      process.env.NODE_ENV === 'dev'
        ? `--${name.replace(':', '_')}`
        : `--${cnt++}`
    document.body.style.setProperty(varName, toRgba(values[name]))
    vars[name] = `var(${varName})`
  }
  return vars
}

export const initTheme = () => {
  updateTheme(baseTheme)
  const darkMode = getDarkMode()

  if (darkMode === true || (darkMode !== false && prefersDarkMode())) {
    setDarkMode(true, true)
  }

  return vars
}
