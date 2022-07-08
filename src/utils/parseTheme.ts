export const parseTheme = (colors) => {
  for (const i in colors) {
    document.body.style.setProperty(`--${i}`, colors[i])
  }
  return colors
}
