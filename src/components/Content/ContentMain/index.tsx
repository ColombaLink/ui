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
import { useDialog } from '~/components/Dialog'
import { useClient, useData } from '@based/react'

const Menu = () => {
  return (
    <>
      <ContextItem>Rename view</ContextItem>
      <ContextItem>Delete view</ContextItem>
    </>
  )
}

const CreateMenu = ({ prefix, types }) => {
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

const Header = ({ label, view, prefix }) => {
  const { types } = useSchemaTypes()
  const createBtn = (
    <Button
      icon={AddIcon}
      onClick={useContextMenu(CreateMenu, { prefix, types })}
    >
      Create Item
    </Button>
  )
  if (label) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Text weight={600}>{label}</Text>
        <div style={{ flexGrow: 1 }} />
        {createBtn}
      </div>
    )
  }

  const { confirm, prompt } = useDialog()
  const client = useClient()
  const { data: views } = useData('basedObserveViews')
  let viewKey
  let viewLabel

  const parse = () => {
    // TODO FIX the redirect!!
    view = Number(view)
    for (viewKey in views) {
      for (const v of views[viewKey]) {
        if (v.id === view) {
          viewLabel = v.label
          return
        }
      }
    }
  }

  parse()

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Text weight={600}>{viewLabel}</Text>
      {/* <div style={{ padding: '0 16px' }}>
        <MoreIcon
          onClick={useContextMenu(Menu)}
          style={{
            cursor: 'pointer',
          }}
        />
      </div> */}
      <Button
        ghost
        onClick={async () => {
          const ok = await confirm(`This will update '${viewLabel}'`)
          if (ok) {
            views[viewKey][view].query = location.search.substring(1)
            await client.call('basedSetViews', views)
          }
        }}
      >
        Update view
      </Button>
      <Button
        ghost
        onClick={async () => {
          const label = (await prompt(
            'What would you like to call this view?'
          )) as string
          if (label) {
            if (!views.custom) {
              views.custom = []
            }
            const ids = new Set()
            views.custom.forEach(({ id }) => ids.add(id))
            views.default.forEach(({ id }) => ids.add(id))
            let id = 0
            while (ids.has(id)) {
              id++
            }
            views.custom.push({
              id,
              query: location.search.substring(1),
              label,
            })
            await client.call('basedSetViews', views)
          }
        }}
      >
        Create new view
      </Button>
      <div style={{ flexGrow: 1 }} />
      {createBtn}
    </div>
  )
}

export const ContentMain = ({
  prefix = '',
  view = null,
  style = null,
  query: queryOverwrite = undefined,
  label = null,
}) => {
  const { loading, types } = useSchemaTypes()
  const [, setLocation] = useLocation()
  const query = useQuery(queryOverwrite)

  if (loading) return null

  const set = new Set() //new Set(['type', 'id', 'name', 'children'])
  const indexed = []
  const other = new Set()
  const typeFilter = query?.filters?.find(
    ({ $field, $operator }) => $field === 'type' && $operator === '='
  )
  let includedTypes
  if (typeFilter) {
    if (typeFilter.$value in types) {
      includedTypes = [typeFilter.$value]
    } else {
      return null
    }
  }

  if (!includedTypes) {
    includedTypes = Object.keys(types)
  }

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
        <Header label={label} view={view} prefix={prefix} />
        {queryOverwrite ? null : (
          <Query
            types={types}
            fields={fields}
            fieldTypes={fieldTypes}
            query={query}
          />
        )}
      </div>
      <Table
        key={fields.length}
        fields={fields}
        target={query.target}
        language="en"
        onClick={(item, field, fieldType) => {
          if (fieldType === 'references') {
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

          return q
        }}
      />
    </div>
  )
}
