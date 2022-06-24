import { styled } from 'inlines'
import { color } from '~/utils'

export const ScrollArea = styled('div', {
  overflow: 'auto',
  // firefox
  scrollbarColor: 'transparent transparent',
  '&::-webkit-scrollbar': {
    visibility: 'hidden',
  },
  // the rest
  '&:hover': {
    // firefox
    scrollbarColor: `${color('TextPrimary', 0.4)} transparent`,
    scrollbarWidth: 'thin',
    // the rest
    '&::-webkit-scrollbar': {
      visibility: 'visible',
      position: 'absolute',
      width: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      minHeight: '32px',
      backgroundColor: color('TextPrimary', 0.4),
      border: `2px solid ${color('Background1dp')}`,
      borderRadius: '6px',
    },
  },
})
