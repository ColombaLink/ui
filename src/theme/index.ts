import { baseTheme } from './baseTheme'
import { darkTheme } from './darkTheme'
import { getDarkMode, setDarkMode } from '~/hooks/useDarkMode'
import { prefersDarkMode } from '~/utils/prefersDarkMode'

export const updateTheme = (theme) => {
  const vars = {}
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

  for (const name in vars) {
    const varName = `--${name
      .replace(/^light/, 'l_')
      .replace(':active', '_a')
      .replace(':hover', '_h')
      .replace(':contrast', '_c')
      .replace(':border', '_b')}`

    document.body.style.setProperty(varName, toRgba(vars[name]))
    vars[name] = `var(${varName})`
  }
  return vars
}

export const initTheme = () => {
  const vars = updateTheme(baseTheme)
  const darkMode = getDarkMode()

  if (darkMode === true) {
    setDarkMode(true, true)
  } else if (darkMode !== false && prefersDarkMode()) {
    setDarkMode(true, true)
  }

  return vars
}
