export type ViewQuery = any

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

export type ViewComponent = {
  component: string
  forEach?: string
  props: { [key: string]: any }
  function: {
    name: string
    payload?: any
    type: 'query' | 'function' | 'channel'
  }
}

export type ContentConfig = {
  type: 'content'
  query: ViewQuery
  label: string
  addQuery: any
  target?: { [key: string]: any }
  types: string[]
  headers: { label?: string; key: string }[]
}

export type ComponentConfig = {
  type: 'components'
  view: 'grid' | 'list'
  target?: { [key: string]: any }
  components: (ViewComponent[] | ViewComponent)[]
}

export type View<T = ComponentConfig | ContentConfig> = {
  id?: string
  name: string
  config: T
  category: string
  hidden: boolean
}
