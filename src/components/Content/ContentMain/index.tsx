import { Table } from '~/components/Table'
import React from 'react'
import { alwaysIgnore } from '~/components/Schema/templates'
import { Query } from './Query'
import { useQuery } from './useQuery'
import { useSchemaTypes } from '~/hooks'

export const ContentMain = ({ style }) => {
  const { loading, types } = useSchemaTypes()
  const query = useQuery()

  if (loading) return null

  const set = new Set(['type', 'id', 'name', 'children'])
  const indexed = []
  const other = new Set()
  const includedTypes = Object.keys(types)
  const fieldTypes = {}

  includedTypes.forEach((type) => {
    const { fields } = types[type]
    for (const field in fields) {
      if (!alwaysIgnore.has(field)) {
        const index = fields[field].meta?.index
        fieldTypes[field] = fields[field].type
        if (index === undefined) {
          other.add(field)
        } else if (!(index in indexed)) {
          indexed[index] = new Set([field])
        } else {
          indexed[index].add(field)
        }
      }
    }
  })

  const addField = (field) => set.add(field)
  indexed.forEach((fields) => fields.forEach(addField))
  other.forEach(addField)

  const fields = Array.from(set)

  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <Query
        types={types}
        fields={fields}
        fieldTypes={fieldTypes}
        query={query}
      />
      <Table
        key={fields.length}
        fields={fields}
        target={query.target}
        language="en"
        query={($offset, $limit, $field, $order) => {
          const q = {
            $list: {
              $offset,
              $limit,
              $sort: {
                $field,
                $order,
              },
              $find: {
                $traverse: query.field,
                $filter: query.filters.filter(
                  ({ $field, $operator, $value }) => {
                    if (!$field || !$operator) {
                      return false
                    }
                    if (!$value) {
                      if ($operator !== 'exists' && $operator !== 'notExists') {
                        return false
                      }
                    }
                    return true
                  }
                ),
              },
            },
          }

          fields.forEach((field) => {
            q[field] = true
          })

          // q.$all = true

          // console.log(JSON.stringify(q, null, 2))

          return q
        }}
      />
    </div>
  )
}
