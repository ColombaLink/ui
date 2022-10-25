import { Table } from '~/components/Table'
import { Text } from '~/components/Text'
import React from 'react'
import { alwaysIgnore } from '~/components/Schema/templates'
import { Query } from './Query'
import { useQuery } from './useQuery'
import { useContextMenu, useLocation, useSchemaTypes } from '~/hooks'
import { AddIcon, MoreIcon } from '~/icons'
import { Button } from '~/components/Button'
import { ContextItem } from '~/components/ContextMenu'

const Menu = () => {
  return (
    <>
      <ContextItem>Rename view</ContextItem>
      <ContextItem>Delete view</ContextItem>
    </>
  )
}

const CreateMenu = ({ prefix }) => {
  const { types } = useSchemaTypes()
  const [, setLocation] = useLocation()
  return (
    <>
      {Object.keys(types)
        .sort()
        .map((type) => {
          return type === 'root' ? null : (
            <ContextItem
              key={type}
              onClick={() => {
                setLocation(`${prefix}/create/${type}`)
              }}
            >
              {type}
            </ContextItem>
          )
        })}
    </>
  )
}

const Header = ({ type, prefix }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Text weight={600}>{type}</Text>
      <div style={{ flexGrow: 1, padding: '0 16px' }}>
        <MoreIcon
          onClick={useContextMenu(Menu)}
          style={{
            cursor: 'pointer',
          }}
        />
      </div>
      <Button icon={AddIcon} onClick={useContextMenu(CreateMenu, { prefix })}>
        Create Item
      </Button>
    </div>
  )
}

export const ContentMain = ({ prefix = '', type = null, style = null }) => {
  const { loading, types } = useSchemaTypes()
  const [, setLocation] = useLocation()
  const query = useQuery()

  if (loading) return null

  const set = new Set() //new Set(['type', 'id', 'name', 'children'])
  const indexed = []
  const other = new Set()
  const typeFilter = query?.filters?.find(
    ({ $field, $operator }) => $field === 'type' && $operator === '='
  )
  const includedTypes = typeFilter?.$value
    ? [typeFilter.$value]
    : Object.keys(types)
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

  const fields = Array.from(set) as string[]

  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          padding: '16px 24px',
        }}
      >
        <Header type={type} prefix={prefix} />
        <Query
          types={types}
          fields={fields}
          fieldTypes={fieldTypes}
          query={query}
        />
      </div>
      <Table
        key={fields.length}
        fields={fields}
        target={query.target}
        language="en"
        onClick={(item, field, fieldType) => {
          if (fieldType === 'references') {
            console.log(`?target=${item.id}&field=${field}&filter=%5B%5D`)
            setLocation(`?target=${item.id}&field=${field}&filter=%5B%5D`)
          } else {
            setLocation(`${prefix}/${item.id}/${field}`)
          }
        }}
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

          fields.forEach((field: string) => {
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
