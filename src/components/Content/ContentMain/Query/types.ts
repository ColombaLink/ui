export type Filter = {
  $operator?: string
  $value?: string | number
  $field?: string
  $and?: Filter
  $or?: Filter
}

export const isFilter = (filter: any): filter is Filter => {
  if (filter && typeof filter === 'object') {
    return true
  }
  return false
}
