export const parseTheme = (colors) => {
  for (const i in colors) {
    document.body.style.setProperty(`--${i.replace(':', '_')}`, colors[i])
  }
  return colors
}
