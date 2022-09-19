import { Table } from '~/components/Table'
import React from 'react'
import { useData, useSchema } from '@based/react'
import { alwaysIgnore } from '~/components/Schema/templates'
import { border } from '~/utils'
import { useLocation } from '~/hooks'
import { Badge } from '~/components/Badge'
import { DeleteIcon } from '~/icons'
import { parseQuery } from '@saulx/utils'

export const ContentMain = () => {
  const { schema, loading } = useSchema()
  const [, setLocation] = useLocation()
  let query
  const q = parseQuery(window.location.search.substring(1))
  const filters = q.filter ? JSON.parse(decodeURIComponent(q.filter)) : []
  const target = q.id ? String(q.id) : 'root'
  const field = q.field || 'descendants'

  if (!loading) {
    const types = Object.keys(schema.types)
    types.push('root')
    query = types.reduce(
      (query, type) => {
        query[type] = {
          $find: {
            $traverse: field,
            $filter: [
              ...filters,
              {
                $field: 'type',
                $operator: '=',
                $value: type,
              },
            ],
          },
        }
        return query
      },
      { $id: target }
    )
  }

  const { data } = useData(query)
  const set = new Set(['type'])
  const indexed = []
  const other = new Set()

  for (const type in data) {
    const { fields } = type === 'root' ? schema.rootType : schema.types[type]
    for (const field in fields) {
      if (alwaysIgnore.has(field)) {
        continue
      }
      const index = fields[field].meta?.index
      if (index === undefined) {
        other.add(field)
      } else if (!(index in indexed)) {
        indexed[index] = new Set([field])
      } else {
        indexed[index].add(field)
      }
    }
  }

  const addField = (field) => set.add(field)
  indexed.forEach((fields) => fields.forEach(addField))
  other.forEach(addField)

  const fields = Array.from(set)

  if (!fields.length) {
    return null
  }

  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', padding: 8 }}>
        {filters.map(({ $field, $operator, $value }, index) => (
          <Badge
            key={index}
            style={{ margin: 8 }}
            iconRight={DeleteIcon}
            onClick={() => {
              setLocation(
                `?filter=${encodeURIComponent(
                  JSON.stringify(filters.filter((_, i) => i !== index))
                )}`
              )
            }}
          >
            {$field} {$operator} {$value}
          </Badge>
        ))}
      </div>
      <Table
        key={fields.length}
        fields={fields}
        target={target}
        language="en"
        onClick={(field, value, { type, id }) => {
          if (value !== undefined) {
            const fieldType =
              type === 'root'
                ? schema.rootType.fields[field].type
                : schema.types[type].fields[field].type
            if (fieldType === 'references') {
              setLocation(`?id=${id}&field=${field}`)
            } else {
              setLocation(
                `?filter=${encodeURIComponent(
                  JSON.stringify([
                    ...filters,
                    {
                      $field: field,
                      $operator: '=',
                      $value: value,
                    },
                  ])
                )}`
              )
            }
          }
        }}
        query={($offset, $limit, $field, $order) => {
          const query = {
            $list: {
              $offset,
              $limit,
              $sort: {
                $field,
                $order,
              },
              $find: {
                $traverse: field,
                $filter: filters,
              },
            },
          }
          fields.forEach((field) => {
            query[field] = true
          })
          return query
        }}
      />
    </div>
  )
}
