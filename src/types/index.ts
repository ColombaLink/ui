import { SVGProps, SyntheticEvent } from 'react'

export type Size =
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '18'
  | '20'
  | '24'
  | '32'
  | 11
  | 12
  | 13
  | 14
  | 15
  | 18
  | 20
  | 24
  | 32

export type Weight = '400' | '500' | '600' | '700' | 400 | 500 | 600 | 700

// TODO useful?
export type Space =
  | '4'
  | '8'
  | '12'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'
  | 4
  | 8
  | 12
  | 16
  | 20
  | 24
  | 28
  | 32

type CSSColorValue = `${
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | '#'}${string}`

export type Color =
  | 'Blue500'
  | 'Blue200'
  | 'WhiteWhite100'
  | 'GreyscaleGrey100'
  | 'TextPrimary'
  | 'TextSecondary'
  | 'TextDisabled'
  | 'TextInverted'
  | 'PrimaryMain'
  | 'PrimaryMainHover'
  | 'PrimaryMainSelected'
  | 'PrimaryMainContrast'
  | 'PrimaryMainContrastSecondary'
  | 'PrimaryLight'
  | 'PrimaryLightHover'
  | 'PrimaryLightSelected'
  | 'PrimaryLightContrast'
  | 'PrimaryLightContrastSecondary'
  | 'PrimaryMainOutline'
  | 'PrimaryLightOutline'
  | 'ActionMain'
  | 'ActionMainHover'
  | 'ActionMainSelected'
  | 'ActionMainContrast'
  | 'ActionMainContrastSecondary'
  | 'ActionLight'
  | 'ActionLightHover'
  | 'ActionLightSelected'
  | 'ActionLightContrast'
  | 'ActionLightContrastSecondary'
  | 'ActionMainOutline'
  | 'ActionLightOutline'
  | 'OtherDisabledContent'
  | 'OtherDisabledBackground'
  | 'OtherDisabledOutline'
  | 'OtherForeground'
  | 'OtherForegroundInverted'
  | 'OtherDivider'
  | 'OtherOverlay'
  | 'OtherInputBorderDefault'
  | 'OtherInputBorderHover'
  | 'OtherInputBorderActive'
  | 'ErrorMain'
  | 'ErrorMainHover'
  | 'ErrorMainSelected'
  | 'ErrorMainContrast'
  | 'ErrorMainContrastSecondary'
  | 'ErrorLight'
  | 'ErrorLightHover'
  | 'ErrorLightSelected'
  | 'ErrorLightContrast'
  | 'ErrorLightContrastSecondary'
  | 'ErrorMainOutline'
  | 'ErrorLightOutline'
  | 'Background0dp'
  | 'Background1dp'
  | 'Background2dp'
  | 'Background3dp'
  | 'CalloutMain'
  | 'AccentRed'
  | 'AccentRedLight'
  | 'AccentOrange'
  | 'AccentOrangeLight'
  | 'AccentYellow'
  | 'AccentYellowLight'
  | 'AccentMustard'
  | 'AccentMustardLight'
  | 'AccentForestgreen'
  | 'AccentForestgreenLight'
  | 'AccentGreen'
  | 'AccentGreenLight'
  | 'AccentTeal'
  | 'AccentTealLight'
  | 'AccentBabyblue'
  | 'AccentBabyblueLight'
  | 'AccentSailorblue'
  | 'AccentSailorblueLight'
  | 'AccentDarkpurple'
  | 'AccentDarkpurpleLight'
  | 'AccentPurple'
  | 'AccentPurpleLight'
  | 'AccentBrightpurple'
  | 'AccentBrightpurpleLight'
  | 'AccentPink'
  | 'AccentPinkLight'
  | (CSSColorValue & {})

export type Icon = SVGProps<SVGSVGElement> & {
  color?: Color
  size?: number
}

export type PropsEventHandler<E = SyntheticEvent, P = any> = (
  e?: E,
  props?: P
) => void | Promise<void> | boolean | Promise<boolean>
