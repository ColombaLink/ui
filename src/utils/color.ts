const colors = {
  accent: {
    versions: ['main', 'light'] as const,
    states: ['default', 'active', 'border', 'contrast', 'hover'] as const,
  },
  bg: {
    versions: ['1dp', '2dp', '3dp', '0dp'] as const,
    states: ['default', 'border'] as const,
  },
  text: {
    versions: ['primary', 'secondary'] as const,
    states: ['default', 'hover', 'active'] as const,
  },
  overlay: {
    versions: [],
    states: [],
  },
}

type AccentVersion = typeof colors.accent.versions[number]
type AccentState = typeof colors.accent.states[number]
type BgVersion = typeof colors.bg.versions[number]
type BgState = typeof colors.bg.states[number]
type TextVersion = typeof colors.text.versions[number]
type TextState = typeof colors.text.states[number]

type Accents = `accent-${AccentVersion}-${AccentState}`
type Bgs = `bg-${BgVersion}-${BgState}`
type Texts = `text-${TextVersion}-${TextState}`
type Overlays = `overlay-default-default`

const versions = {
  accent: new Set(colors.accent.versions),
  bg: new Set(colors.bg.versions),
  text: new Set(colors.text.versions),
  overlay: new Set(),
}

const defaultVariant = {
  accent: colors.accent.versions[0],
  bg: colors.bg.versions[0],
  text: colors.text.versions[0],
}

type ColorFn = {
  (name: 'accent', a?: AccentVersion, b?: AccentState): string
  (name: 'accent', a?: AccentState, b?: AccentVersion): string
  (name: 'bg', a?: BgVersion, b?: BgState): string
  (name: 'bg', a?: BgState, b?: BgVersion): string
  (name: 'text', a?: TextVersion, b?: TextState): string
  (name: 'text', a?: TextState, b?: TextVersion): string
  (name: 'overlay', a?: undefined, b?: undefined): string
  (name: Accents | Bgs | Texts | Overlays, a?: undefined, b?: undefined): string
  (name: string, a?: undefined, b?: undefined): string
}

export const color: ColorFn = (name, a, b) => {
  if (name?.includes('-')) {
    ;[name, a, b] = name.split('-')
  }
  if (name in versions) {
    if (!a) {
      return `var(--${name}-${defaultVariant[name] || 'default'}-default)`
    }
    if (name in versions && versions[name].has(a)) {
      return `var(--${name}-${a}-${b || 'default'})`
    }
    return `var(--${name}-${b || defaultVariant[name] || 'default'}-${
      a || 'default'
    })`
  }
  return name
}

color('text')

// const _ = {
//   accent: 'rgba(61,83,231,1)',
//   'accent-active': 'rgba(54,73,203,1)',
//   'accent:border': 'rgba(61,83,231,1)',
//   'accent-hover': 'rgba(56,76,213,1)',
//   'accent-contrast': 'rgba(255,255,255,1)',

//   accent2: 'rgba(131,145,237,0.12)',
//   'accent2-active': 'rgba(131,145,237,0.20)',
//   'accent2:border': 'rgba(131,145,237,0.20)',
//   'accent2-hover': 'rgba(131,145,237,0.16)',
//   'accent2-contrast': 'rgba(131,145,237,1)',

//   bg: 'rgba(255,255,255,1)',
//   'bg:border': 'rgba(15,16,19,0.08)',

//   bg2: 'rgba(247,247,248,1)',
//   'bg2-border': 'rgba(15,16,19,0.08)',

//   bg-2dp: 'rgba(255,255,255,1)',
//   'bg2dp-border': 'rgba(15,16,19,0.08)',

//   bg3dp: 'rgba(255,255,255,1)',
//   'bg3dp-border': 'rgba(15,16,19,0.08)',

//   text: 'rgba(15,16,19, 0.87)',
//   'text-active': 'var(--accent)',
//   'text-hover': 'var(--accent)',

//   text2: 'rgba(15,16,19, 0.60)',
//   'text2-active': 'var(--accent)',
//   'text2-hover': 'var(--accent)',

//   overlay: 'rgba(15,16,19, 0.24)',
// } as const

// const _ = {
//   accent: 'rgba(61,83,231,1)',
//   'accent-active': 'rgba(54,73,203,1)',
//   'accent-border': 'rgba(61,83,231,1)',
//   'accent-hover': 'rgba(56,76,213,1)',
//   'accent-contrast': 'rgba(255,255,255,1)',

//   accent2: 'rgba(131,145,237,0.12)',
//   'accent2-active': 'rgba(131,145,237,0.20)',
//   'accent2-border': 'rgba(131,145,237,0.20)',
//   'accent2-hover': 'rgba(131,145,237,0.16)',
//   'accent2-contrast': 'rgba(131,145,237,1)',

//   bg: 'rgba(255,255,255,1)',
//   'bg-border': 'rgba(15,16,19,0.08)',

//   bg2: 'rgba(247,247,248,1)',
//   'bg2-border': 'rgba(15,16,19,0.08)',

//   bg2dp: 'rgba(255,255,255,1)',
//   'bg2dp-border': 'rgba(15,16,19,0.08)',

//   bg3dp: 'rgba(255,255,255,1)',
//   'bg3dp-border': 'rgba(15,16,19,0.08)',

//   text: 'rgba(15,16,19, 0.87)',
//   'text-active': 'var(--accent)',
//   'text-hover': 'var(--accent)',

//   text2: 'rgba(15,16,19, 0.60)',
//   'text2-active': 'var(--accent)',
//   'text2-hover': 'var(--accent)',

//   overlay: 'rgba(15,16,19, 0.24)',
// } as const

const _ = {
  accent: 'rgba(61,83,231,1)',
  'accent--active': 'rgba(54,73,203,1)',
  'accent--border': 'rgba(61,83,231,1)',
  'accent--hover': 'rgba(56,76,213,1)',
  'accent--contrast': 'rgba(255,255,255,1)',

  'accent-2': 'rgba(131,145,237,0.12)',
  'accent-2--active': 'rgba(131,145,237,0.20)',
  'accent-2--border': 'rgba(131,145,237,0.20)',
  'accent-2--hover': 'rgba(131,145,237,0.16)',
  'accent-2--contrast': 'rgba(131,145,237,1)',

  bg: 'rgba(255,255,255,1)',
  'bg--border': 'rgba(15,16,19,0.08)',

  'bg-2': 'rgba(247,247,248,1)',
  'bg-2--border': 'rgba(15,16,19,0.08)',

  'bg-2dp': 'rgba(255,255,255,1)',
  'bg-2dp--border': 'rgba(15,16,19,0.08)',

  'bg-3dp': 'rgba(255,255,255,1)',
  'bg-3dp--border': 'rgba(15,16,19,0.08)',

  text: 'rgba(15,16,19, 0.87)',
  'text--active': 'var(--accent)',
  'text--hover': 'var(--accent)',

  'text-2': 'rgba(15,16,19, 0.60)',
  'text-2--active': 'var(--accent)',
  'text-2--hover': 'var(--accent)',

  overlay: 'rgba(15,16,19, 0.24)',
} as const

type Bla = keyof typeof _

const colorFn = (name: Bla) => null

colorFn('')
