export { colors } from '../utils/color'
// export const colors = {
//   'accent-main-active': 'rgba(54,73,203,1)',
//   'accent-main-border': 'rgba(61,83,231,1)',
//   'accent-main-default': 'rgba(61,83,231,1)',
//   'accent-main-hover': 'rgba(56,76,213,1)',
//   'accent-main-contrast': 'rgba(255,255,255,1)',

//   'accent-light-active': 'rgba(131,145,237,0.20)',
//   'accent-light-border': 'rgba(131,145,237,0.20)',
//   'accent-light-default': 'rgba(131,145,237,0.12)',
//   'accent-light-hover': 'rgba(131,145,237,0.16)',
//   'accent-light-contrast': 'rgba(131,145,237,1)',

//   'bg-0dp-default': 'rgba(247,247,248,1)',
//   'bg-0dp-border': 'rgba(15,16,19,0.08)',

//   'bg-1dp-default': 'rgba(255,255,255,1)',
//   'bg-1dp-border': 'rgba(15,16,19,0.08)',

//   'bg-2dp-default': 'rgba(255,255,255,1)',
//   'bg-2dp-border': 'rgba(15,16,19,0.08)',

//   'bg-3dp-default': 'rgba(255,255,255,1)',
//   'bg-3dp-border': 'rgba(15,16,19,0.08)',

//   'text-primary-default': 'rgba(15,16,19, 0.87)',
//   'text-primary-active': 'var(--accent-main-default)',
//   'text-primary-hover': 'var(--accent-main-default)',

//   'text-secondary-default': 'rgba(15,16,19, 0.60)',
//   'text-secondary-active': 'var(--accent-main-default)',
//   'text-secondary-hover': 'var(--accent-main-default)',
// }

export const theme = {
  colors: {
    // new variables

    //babyblue
    babyblue: '#4faff8',
    babyblueActive: 'rgba(79,185,248, 1)',
    babyblueAccent: 'rgba(79,175,248, 0.20)',
    babyblueHover: 'rgba(79,175,248, 0.10)',
    babyblueForeground: 'rgba(15,16,19, 0.87)',

    //BlueSailor
    BlueSailor: '#5584f7',
    BlueSailorActive: 'rgba(85,132,247, 1)',
    BlueSailorAccent: 'rgba(85,132,247, 0.20)',
    BlueSailorHover: 'rgba(85,132,247, 0.10)',
    BlueSailorForeground: 'rgba(15,16,19, 0.87)',

    //Pink
    Pink: '#eb45b5',
    PinkActive: 'rgba(235,69,181, 1)',
    PinkAccent: 'rgba(235,69,181, 0.20)',
    PinkHover: 'rgba(235,69,181, 0.1)',
    PinkForeground: 'rgba(15,16,19, 0.87)',

    //PurpleBright
    PurpleBright: '#c74af6',
    PurpleBrightActive: 'rgba(199,74,246, 1)',
    PurpleBrightAccent: 'rgba(199,74,246, 0.20)',
    PurpleBrightHover: 'rgba(199,74,246, 0.1)',
    PurpleBrightForeground: 'rgba(15,16,19, 0.87)',

    //Purple
    Purple: '#9a52f6',
    PurpleActive: 'rgba(154,82,246, 1)',
    PurpleAccent: 'rgba(154,82,246, 0.20)',
    PurpleHover: 'rgba(154,82,246, 0.10)',
    PurpleForeground: 'rgba(15,16,19, 0.87)',

    //PurpleDark
    PurpleDark: '#7359f6',
    PurpleDarkActive: 'rgba(115,89,246, 1)',
    PurpleDarkAccent: 'rgba(115,89,246, 0.20)',
    PurpleDarkHover: 'rgba(115,89,246, 0.1)',
    PurpleDarkForeground: 'rgba(15,16,19, 0.87)',

    //GreenForest
    GreenForest: '#97c241',
    GreenForestActive: 'rgba(151,194,65, 1)',
    GreenForestAccent: 'rgba(151,194,65, 0.20)',
    GreenForestHover: 'rgba(151,194,65, 0.1)',
    GreenForestForeground: 'rgba(15,16,19, 0.87)',

    //Green
    Green: '#56bb70',
    GreenActive: 'rgba(86,187,112, 1)',
    GreenAccent: 'rgba(86,187,112, 0.20)',
    GreenHover: 'rgba(86,187,112, 0.1)',
    GreenForeground: 'rgba(15,16,19, 0.87)',

    //Teal
    Teal: '#59c4c5',
    TealActive: 'rgba(89,196,197, 1)',
    TealAccent: 'rgba(89,196,197, 0.20)',
    TealHover: 'rgba(89,196,197, 0.1)',
    TealForeground: 'rgba(15,16,19, 0.87)',

    //Mustard
    Mustard: '#c5bb44',
    MustardActive: 'rgba(197,187,68, 1)',
    MustardAccent: 'rgba(197,187,68, 0.20)',
    MustardHover: 'rgba(197,187,68, 0.1)',
    MustardForeground: 'rgba(15,16,19, 0.87)',

    //Yellow
    Yellow: '#e3b751',
    YellowActive: 'rgba(227,183,81, 1)',
    YellowAccent: 'rgba(227,183,81, 0.20)',
    YellowHover: 'rgba(227,183,81, 0.1)',
    YellowForeground: 'rgba(15,16,19, 0.87)',

    //Orange
    Orange: '#ec946a',
    OrangeActive: 'rgba(236,148,106, 1)',
    OrangeAccent: 'rgba(236,148,106, 0.20)',
    OrangeHover: 'rgba(236,148,106, 0.1)',
    OrangeForeground: 'rgba(15,16,19, 0.87)',

    //Reddish
    Reddish: '#ed6762',
    ReddishActive: 'rgba(237,103,98, 1)',
    ReddishAccent: 'rgba(237,103,98, 0.20)',
    ReddishHover: 'rgba(237,103,98, 0.1)',
    ReddishForeground: 'rgba(15,16,19, 0.87)',

    //Red formerly known as Error
    Red: '#F44336',
    RedActive: '#CD382D',
    RedAccent: 'rgba(244,67,54, 0.08)',
    RedHover: 'rgba(215,59,48,0.1)',
    RedForeground: 'rgba(15,16,19, 0.87)',

    //Redlight
    Redlight: 'rgba(244,67,54, 0.16)',
    RedlightActive: '#ffe9e7',
    RedlightAccent: 'rgba(244,67,54, 0.08)',
    RedlightHover: '#ffe9e7',
    RedlightForeground: 'rgba(15,16,19, 0.87)',

    //Greydark
    Greydark: '#323232',
    GreydarkActive: '#000000',
    GreydarkAccent: 'rgba(15,16,19, 0.04)',
    GreydarkHover: '#212121',
    GreydarkForeground: '#ffffff',

    //Greylight
    Greylight: '#f6f6f6',
    GreylightActive: '#f1f1f1',
    GreylightAccent: '#f1f1f1',
    GreylightHover: '#f1f1f1',
    GreylightForeground: '#323232',

    Background0dp: '#F7F7F8',
    Background1dp: '#FFFFFF',
    Background2dp: '#FFFFFF',
    Background3dp: '#FFFFFF',
    Blue200: '#8391ED',
    Blue500: '#3D53E7',
    CalloutMain: '#EDEFF0',
    GreyscaleGrey100: '#0f1013',
    OtherDisabledBackground: 'rgba(15,16,19, 0.12)',
    OtherDisabledContent: 'rgba(15,16,19, 0.26)',
    OtherDisabledOutline: 'rgba(15,16,19, 0.12)',
    OtherDivider: 'rgba(15,16,19, 0.08)',
    BorderColor: 'rgba(15,16,19, 0.08)',
    OtherForeground: '#ffffff',
    OtherForegroundInverted: '#0f1013',
    OtherInputBorderActive: 'rgba(61,83,231, 1)',
    OtherInputBorderDefault: 'rgba(15,16,19, 0.08)',
    OtherInputBorderHover: 'rgba(15,16,19, 0.12)',
    OtherOverlay: 'rgba(15,16,19, 0.24)',
    PrimaryLightAccent: 'rgba(131,145,237, 0.12)',
    PrimaryLightHover: 'rgba(131,145,237, 0.16)',
    PrimaryLightSelected: 'rgba(131,145,237, 0.20)',
    PrimaryLightContrast: '#8391ED',
    PrimaryLightContrastSecondary: 'rgba(131,145,237, 0.60)',
    PrimaryLightOutline: 'rgba(131,145,237, 0.20)',
    PrimaryMain: '#3D53E7',
    PrimaryMainContrast: 'rgba(255,255,255, 1)',
    PrimaryMainContrastSecondary: 'rgba(255,255,255, 0.60)',
    PrimaryMainHover: '#384CD5',
    PrimaryMainOutline: '#3D53E7',
    PrimaryMainSelected: '#3649CB',
    TextDisabled: 'rgba(15,16,19, 0.38)',
    TextInverted: '#ffffff',
    TextPrimary: 'rgba(15,16,19, 0.87)',
    TextSecondary: 'rgba(15,16,19, 0.60)',
    WhiteWhite100: '#ffffff',
    Transparent: 'rgba(0,0,0,0)',
  },
}
