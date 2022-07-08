import { styled } from 'inlines'
import { color } from '~/utils'

const scrollbarColor = color('TextPrimary', 0.2)
const transparentAreaColor = color('bg')

export const scrollAreaStyle = {
  scrollbarGutter: 'stable',
  // firefox
  scrollbarColor: 'transparent transparent',
  '&::-webkit-scrollbar': {
    visibility: 'hidden',
    position: 'absolute',
  },
  // the rest
  '&::-webkit-scrollbar:vertical': {
    width: '10px',
    marginLeft: '-10px',
  },
  '&::-webkit-scrollbar:horizontal': {
    height: '10px',
    marginTop: '-10px',
  },
  '&:hover': {
    // firefox
    scrollbarColor: `${scrollbarColor} transparent`,
    scrollbarWidth: 'thin',
    // the rest
    '&::-webkit-scrollbar': {
      visibility: 'visible',
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
