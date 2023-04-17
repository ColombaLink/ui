import { useQuery } from '@based/react'
import { useSchema } from '~'
import { View } from '../types'

// add target in the queries

export const useViews = (): {
  default: View[]
  custom?: View[]
  loading: boolean
} => {
  const { data, loading } = useQuery('based:observe-views')

  const views: {
    default: View[]
    custom?: View[]
    loading: boolean
  } = data ?? { default: [], custom: [], loading: true }

  const { schema, loading: loadingSchema } = useSchema() // TODO: add multi schema option (using origns)

  if (!loading && !loadingSchema) {
    views.loading = false
    const types = Object.keys(schema.types)
    if (!views.default) {
      views.default = []
    }
    if (views.default.length < types.length) {
      const viewTypes = new Set(views.default.map(({ id }) => id))

      for (const type of types) {
        const typeFields = schema.types[type]

        // Sort options
        // Add fields
        // Include target in the views

        const viewValue = {
          addQuery: {
            // parents: '$target',
            parents: 'root',
          },
          types: [type],
          headers: Object.keys(typeFields.fields).map((fieldName) => {
            return {
              key: fieldName,
              label: fieldName[0].toUpperCase() + fieldName.slice(1),
            }
          }),
          id: type,
          query: {
            $id: 'root',
            // $id: '$target',
            data: {
              $all: true,
              $list: {
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
            },
          },
          label: type,
        }
        if (!viewTypes.has(type)) {
          views.default.push(viewValue)
        }
      }
    }
  } else {
    views.loading = true
  }
  return views
}
