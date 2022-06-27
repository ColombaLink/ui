import type { Space } from '~/types'

export const spaceToPx = (space?: Space, defaultValue = 24) => {
  if (space) {
    return space === true ? defaultValue : parseInt(space as string)
  }
}
