import { baseTheme } from './baseTheme'
import { darkTheme } from './darkTheme'
import { getDarkMode, setDarkMode } from '~/hooks/useDarkMode'
import { prefersDarkMode } from '~/utils/prefersDarkMode'

const vars = {}
export const updateTheme = (theme) => {
  const { colors, light = {} } = theme
  const toRgba = (arr) => (arr.length === 3 ? `rgb(${arr})` : `rgba(${arr})`)
  const alpha = ([r, g, b], a) => [r, g, b, a]

  for (const name in colors) {
    const {
      m: main,
      a: active,
      h: hover,
      c: contrast,
      b: border,
    } = colors[name]
    const {
      m: lMain,
      a: lActive,
      h: lHover,
      c: lContrast,
      b: lBorder,
    } = light[name] || {}

    vars[name] = main
    vars[`${name}:active`] = active || main
    vars[`${name}:hover`] = hover || main
    vars[`${name}:contrast`] = contrast || main
    vars[`${name}:border`] = border || main

    const lightName = `light${name}`
    vars[lightName] = lMain || alpha(main, 0.16)
    vars[`${lightName}:active`] = lActive || alpha(main, 0.24)
    vars[`${lightName}:hover`] = lHover || alpha(main, 0.2)
    vars[`${lightName}:contrast`] = lContrast || main
    vars[`${lightName}:border`] = lBorder || alpha(main, 0.24)
  }

  let cnt = 0
  for (const name in vars) {
    const varName =
      process.env.NODE_ENV === 'dev'
        ? `--${name.replace(':', '_')}`
        : `--${cnt++}`
    document.body.style.setProperty(varName, toRgba(vars[name]))
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
