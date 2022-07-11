const json = {
  default: {
    colors: {
      // main | active? | hover? | contrast? | border?
      accent: [
        [61, 83, 231],
        [54, 73, 203],
        [56, 76, 213],
        [255, 255, 255, 0.87],
      ],
      text: [
        [15, 16, 19, 0.87],
        [15, 16, 19, 0.87],
        [15, 16, 19, 0.87],
        [255, 255, 255, 0.87],
      ],
      text2: [
        [15, 16, 19, 0.6],
        [15, 16, 19, 0.6],
        [15, 16, 19, 0.6],
        [255, 255, 255, 0.87],
      ],
      babyblue: [
        [79, 175, 248],
        [79, 185, 248],
        [79, 175, 248, 0.1],
        [255, 255, 255, 0.87],
      ],
      reddish: [
        [237, 103, 98],
        [237, 103, 98],
        [237, 103, 98, 0.1],
        [255, 255, 255, 0.87],
      ],
      red: [
        [244, 67, 54],
        [205, 56, 45],
        [215, 59, 48, 0.1],
        [255, 255, 255, 0.87],
      ],
      yellow: [
        [227, 183, 81],
        [227, 183, 81],
        [227, 183, 81, 0.1],
        [255, 255, 255, 0.87],
      ],
      green: [
        [86, 187, 112],
        [86, 187, 112],
        [86, 187, 112, 0.1],
        [255, 255, 255, 0.87],
      ],
      teal: [
        [89, 196, 197],
        [89, 196, 197],
        [89, 196, 197, 0.1],
        [255, 255, 255, 0.87],
      ],
      purple: [
        [154, 82, 246],
        [154, 82, 246],
        [154, 82, 246, 0.1],
        [255, 255, 255, 0.87],
      ],
      mustard: [
        [197, 187, 68],
        [197, 187, 68],
        [197, 187, 68, 0.1],
        [255, 255, 255, 0.87],
      ],
      grey: [
        [50, 50, 50],
        [0, 0, 0],
        [33, 33, 33],
        [255, 255, 255, 0.87],
      ],
      background: [[255, 255, 255]],
      background2: [[247, 247, 248]],
      background2dp: [[255, 255, 255]],
      background3dp: [[255, 255, 255]],
      backdrop: [[15, 16, 19, 0.24]],
      border: [
        [15, 16, 19, 0.08],
        [61, 83, 231, 1],
        [15, 16, 19, 0.12],
      ],
    },
    light: {
      accent: [
        [131, 145, 237, 0.12],
        [131, 145, 237, 0.2],
        [131, 145, 237, 0.2],
        null,
        [131, 145, 237, 0.16],
      ],
      grey: [
        [246, 246, 246],
        [241, 241, 241],
        [241, 241, 241],
        [50, 50, 50],
      ],
    },
  },
  dark: {},
}

// parse theme
const vars = {}
export const parse = () => {
  const { colors, light = {} } = json.default
  const toRgba = (arr) => (arr.length === 3 ? `rgb(${arr})` : `rgba(${arr})`)
  const alpha = ([r, g, b], a) => [r, g, b, a]

  for (const name in colors) {
    const [main, active, hover, contrast, border] = colors[name]
    const [lMain, lActive, lHover, lContrast, lBorder] = light[name] || []

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

console.info('init theme')
parse()

export type cssColorString = 'inherit' | 'currentColor' | `var(${string})`
export type AccentColor = keyof typeof json.default.colors
export type BaseColor = `light${AccentColor}` | AccentColor
export type ColorVariant = 'active' | 'border' | 'hover' | 'contrast'
export type StateColor = `${BaseColor}:${ColorVariant}`
export type Color = BaseColor | StateColor | cssColorString

type ColorFn = {
  (name: Color, variant?: ColorVariant, light?: boolean): cssColorString | null
  (name: Color, light?: boolean, empty?: undefined): cssColorString | null
}

export const color: ColorFn = (name, variant, light): cssColorString | null => {
  if (typeof name === 'string') {
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
