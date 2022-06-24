import type { Space } from '~/types'

export const spaceToPx = (space?: Space) => {
  if (space) {
    return space === true ? 24 : Number(space)
  }
}
