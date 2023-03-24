import { useQuery } from '@based/react'
import { useSchema, useContextState } from '~'
import { View } from '../types'

export const useViews = (): {
  default: View[]
  custom?: View[]
  currentView?: View
  loading: boolean
} => {
  const [view] = useContextState('view')
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
        const viewValue = {
          id: type,
          query: {
            $find: {
              $traverse: 'descendants',
              $filter: [
                {
                  $field: 'type',
                  $operator: '=',
                  $value: type,
                },
              ],
            },
          },
          label: type,
        }
        if (view === type) {
          views.currentView = viewValue
        }
        if (!viewTypes.has(type)) {
          views.default.push(viewValue)
        }
      }
    }

    if (view && views.custom && !views.currentView) {
      for (const viewValue of views.custom) {
        if (viewValue.id === view) {
          views.currentView = viewValue
          break
        }
      }
    }
  } else {
    views.loading = true
  }
  return views
}
