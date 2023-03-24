import { useQuery } from '@based/react'
import { useSchema } from '~/apps/Schema'
import { View } from '../types'

export const useViews = (): {
  default: View[]
  custom?: View[]
  loading: boolean
} => {
  const { data: views = { default: [], loading: true }, loading } = useQuery(
    'based:observe-views'
  )
  const { schema, loading: loadingSchema } = useSchema() // TODO: add multi schema option (using oriigns)

  if (!loading && !loadingSchema) {
    views.loading = false
    const types = Object.keys(schema.types)
    if (!views.default) {
      views.default = []
    }
    views.default = []
    if (views.default.length < types.length) {
      const viewTypes = new Set(views.default.map(({ id }) => id))
      for (const type of types) {
        if (!viewTypes.has(type)) {
          views.default.push({
            id: type,
            query: `filter=%5B%7B%22%24field%22%3A%22type%22%2C%22%24operator%22%3A%22%3D%22%2C%22%24value%22%3A%22${type}%22%7D%5D&target=root&field=descendants`,
            label: type,
          })
        }
      }
    }
  } else {
    views.loading = true
  }

  return views
}
