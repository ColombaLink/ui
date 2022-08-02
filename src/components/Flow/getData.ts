import { DataPath } from '~/types'

export const getData = (data: object, path: DataPath): any => {
  let s = data
  for (let i = 0; i < path.length; i++) {
    if (typeof s !== 'object' || s === null) {
      return undefined
    }
    s = s[path[i]]
  }
  return s
}
