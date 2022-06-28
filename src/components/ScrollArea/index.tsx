import { styled } from 'inlines'
import { color } from '~/utils'

const scrollbarColor = color('TextPrimary', 0.2)
const transparentAreaColor = color('Background1dp')

export const scrollAreaStyle = {
  // firefox
  scrollbarColor: 'transparent transparent',
  '&::-webkit-scrollbar': {
    visibility: 'hidden',
  },
  // the rest
  '&:hover': {
    // firefox
    scrollbarColor: `${scrollbarColor} transparent`,
    scrollbarWidth: 'thin',
    // the rest
    '&::-webkit-scrollbar': {
      visibility: 'visible',
      position: 'absolute',
    },
    '&::-webkit-scrollbar:vertical': {
      width: '10px',
      marginLeft: '-10px',
    },
    '&::-webkit-scrollbar:horizontal': {
      height: '10px',
      // marginTop: '-10px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: scrollbarColor,
      border: `2px solid ${transparentAreaColor}`,
      borderRadius: '6px',
    },
    '&::-webkit-scrollbar-thumb:vertical': {
      minHeight: '32px',
    },
  },
}

export const ScrollArea = styled('div', {
  overflow: 'auto',
  ...scrollAreaStyle,
})
