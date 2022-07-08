import { toRGBA } from './toRGBA'

export const parseTheme = (theme) => {
  for (const i in theme.colors) {
    const color = toRGBA(theme.colors[i])
    theme.colors[i] = color
    document.body.style.setProperty(`--${i}`, color.join(','))
    document.body.style.setProperty(`--${i}-rgb`, color.slice(0, 3).join(','))
  }
  return theme
}
