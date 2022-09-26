import { Table } from '~/components/Table'
import React from 'react'
import { useData, useSchema } from '@based/react'
import { alwaysIgnore } from '~/components/Schema/templates'
import { border } from '~/utils'
import { useLocation, useSchemaTypes } from '~/hooks'
import { Badge } from '~/components/Badge'
import { DeleteIcon } from '~/icons'
import { deepEqual, parseQuery } from '@saulx/utils'
import { Input } from '~/components/Input'

export const ContentMain = () => {
  const { loading, types } = useSchemaTypes()
  const [, setLocation] = useLocation()

  if (loading) return null

  const q = parseQuery(window.location.search.substring(1))
  const filters = q.filter ? JSON.parse(decodeURIComponent(q.filter)) : []
  const target = q.id ? String(q.id) : 'root'
  const field = q.field || 'descendants'

  const set = new Set(['type', 'id', 'name', 'children'])
  const indexed = []
  const other = new Set()
  const includedTypes = Object.keys(types)

  includedTypes.forEach((type) => {
    const { fields } = types[type]
    for (const field in fields) {
      if (!alwaysIgnore.has(field)) {
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
  })

  const addField = (field) => set.add(field)
  indexed.forEach((fields) => fields.forEach(addField))
  other.forEach(addField)

  const fields = Array.from(set)

  // if (!fields.length) {
  //   return null
  // }

  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', padding: 12 }}>
        <Badge
          style={{ margin: 4 }}
          iconRight={q.field ? DeleteIcon : null}
          onClick={
            q.field
              ? () => {
                  setLocation(`?field=0`)
                }
              : null
          }
        >
          IN: {field}
        </Badge>
        <Badge
          style={{ margin: 4 }}
          iconRight={q.id ? DeleteIcon : null}
          onClick={
            q.id
              ? () => {
                  setLocation(`?id=0`)
                }
              : null
          }
        >
          OF: {target}
        </Badge>
        <Input
          onChange={(value) => {
            console.log('onChange', value)
          }}
          suggest={(value) => {
            return fields.find((field) => field.startsWith(value))
          }}
        />
        {filters.map(({ $field, $operator, $value }, index) => (
          <Badge
            key={index}
            style={{ margin: 4 }}
            iconRight={DeleteIcon}
            onClick={() => {
              setLocation(
                `?filter=${encodeURIComponent(
                  JSON.stringify(filters.filter((_, i) => i !== index))
                )}`
              )
            }}
          >
            {index ? 'AND' : 'WHERE'} {$field} {$operator} {$value}
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
            const fieldType = types[type].fields[field].type
            if (fieldType === 'references') {
              setLocation(`?id=${id}&field=${field}&filter=${0}`)
            } else {
              const filter = {
                $field: field,
                $operator: '=',
                $value: value,
              }
              if (!filters.find((f) => deepEqual(f, filter))) {
                setLocation(
                  `?filter=${encodeURIComponent(
                    JSON.stringify([...filters, filter])
                  )}`
                )
              }
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
