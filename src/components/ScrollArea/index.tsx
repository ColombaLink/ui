import { styled } from 'inlines'
import { color } from '~/utils'

const scrollbarColor = color('border')
const transparentAreaColor = color('background')

export const scrollAreaStyle = {
  scrollbarGutter: 'stable',
  overflow: 'overlay',
  // firefox
  scrollbarColor: 'transparent transparent',
  '&::-webkit-scrollbar': {
    visibility: 'hidden',
  },
  // the rest
  '&::-webkit-scrollbar:vertical': {
    width: '8px',
  },
  '&::-webkit-scrollbar:horizontal': {
    height: '8px',
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
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:vertical': {
      borderRight: `2px solid ${transparentAreaColor}`,
      minHeight: '32px',
    },
    '&::-webkit-scrollbar-thumb:horizontal': {
      borderBottom: `2px solid ${transparentAreaColor}`,
      minWidth: '32px',
    },
  },
}

export const ScrollArea = styled('div', scrollAreaStyle)

// export const ScrollArea = styled('div', {
//   overflow: 'auto',
//   overflowY: 'overlay',
//   ...scrollAreaStyle,
// })
