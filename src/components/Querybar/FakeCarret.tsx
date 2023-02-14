import { color } from '~'
import { styled } from 'inlines'

export const FakeCarret = styled('div', {
  width: 1,
  marginLeft: 1.5,
  marginRight: 1.5,
  marginTop: 2,
  height: 15,
  backgroundColor: color('accent'),
  '@keyframes': {
    '0%': { opacity: 0 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
  animationDuration: '1s',
  animationEffect: 'step-start',
  animationIterationCount: 'infinite',
})
