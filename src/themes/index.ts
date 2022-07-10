import { parse } from '../utils/color'
// import { colors as dark } from './dark'
// import { colors as light } from './light'

// export { dark, light }

export const themes = (theme?: 'dark' | 'light') => {
  // const themes = {
  //   light,
  //   dark,
  // }
  if (typeof window !== 'undefined') {
    const colorSchemeMedia = matchMedia('(prefers-color-scheme: dark)')
    let currentTheme

    const update = () => {
      const prefersDark = colorSchemeMedia.matches
      const newTheme =
        theme ||
        document.documentElement.getAttribute('data-theme') ||
        (prefersDark ? 'dark' : 'light')

      if (newTheme !== currentTheme) {
        currentTheme = newTheme
        // parse(themes[newTheme])
        parse()
      }
    }

    update()

    // watch html data-theme attr
    new MutationObserver(update).observe(document.documentElement, {
      attributes: true,
    })

    // watch media
    colorSchemeMedia.addEventListener('change', update)
  }
}
