import { Table } from '~/components/Table'
import { Text } from '~/components/Text'
import React, { useRef } from 'react'
import { alwaysIgnore } from '~/components/Schema/templates'
import { Query } from './Query'
import { useQuery } from './useQuery'
import { useContextMenu, useLocation, useSchemaTypes } from '~/hooks'
import { AddIcon, MoreIcon, WarningIcon } from '~/icons'
import { Button } from '~/components/Button'
import { ContextItem } from '~/components/ContextMenu'
import { useDialog } from '~/components/Dialog'
import { useClient, useData } from '@based/react'
import { Callout } from '~/components/Callout'

const Menu = ({ views, currentView, deletable }) => {
  const client = useClient()
  const { prompt, confirm } = useDialog()
  return (
    <>
      <ContextItem
        onClick={async () => {
          const name = await prompt(`Enter a new name for this view`)
          if (name) {
            currentView.label = name
            await client.call('basedSetViews', views)
          }
        }}
      >
        Rename view
      </ContextItem>
      {deletable ? (
        <ContextItem
          onClick={async () => {
            const ok = await confirm(
              `Are you sure you want to delete '${currentView.label}?`
            )
            if (ok) {
              for (const i in views) {
                views[i] = views[i].filter((view) => view !== currentView)
              }
              await client.call('basedSetViews', views)
            }
          }}
        >
          Delete view
        </ContextItem>
      ) : null}
    </>
  )
}

// const CreateMenu = ({ prefix, types }) => {
//   const [, setLocation] = useLocation()
//   return (
//     <>
//       {Object.keys(types)
//         .sort()
//         .map((type) => {
//           return type === 'root' ? null : (
//             <ContextItem
//               key={type}
//               onClick={() => {
//                 setLocation(`${prefix}/create/${type}`)
//               }}
//             >
//               {type}
//             </ContextItem>
//           )
//         })}
//     </>
//   )
// }

const Header = ({ label, view, prefix }) => {
  const [, setLocation] = useLocation()
  // const { types } = useSchemaTypes()
  const createBtn = (
    <Button
      large
      icon={AddIcon}
      onClick={() => {
        // console.log('lable', label, 'view', view, 'prefix', prefix)
        setLocation(`${prefix}/create/${view}`)
      }}
      //  onClick={useContextMenu(CreateMenu, { prefix, types })}
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

  // const { confirm, prompt } = useDialog()
  // const client = useClient()
  const { data: views } = useData('basedObserveViews')
  let currentView, deletable

  const parse = () => {
    // TODO FIX the redirect!!
    for (const viewKey in views) {
      for (const v of views[viewKey]) {
        if (String(v.id) === view) {
          currentView = v
          deletable = viewKey !== 'default'
          return
        }
      }
    }
  }

  parse()

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
      <Text weight={700} size="22px" style={{ lineHeight: '32px' }}>
        {currentView?.label}
      </Text>
      <div style={{ padding: '0 16px' }}>
        <MoreIcon
          onClick={useContextMenu(Menu, { views, currentView, deletable })}
          style={{
            cursor: 'pointer',
          }}
        />
      </div>

      {/* old buttons place */}

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

  const { confirm, prompt } = useDialog()
  const client = useClient()

  const theTableRef = useRef(null)

  const { data: views } = useData('basedObserveViews')
  let currentView

  const parse = () => {
    // TODO FIX the redirect!!
    for (const viewKey in views) {
      for (const v of views[viewKey]) {
        if (String(v.id) === view) {
          currentView = v
          //  deletable = viewKey !== 'default'
          return
        }
      }
    }
  }

  parse()

  if (loading) return null

  const set = new Set()
  const indexed = []
  const other = new Set()
  const typeFilter = query?.filters?.find(
    ({ $field, $operator }) => $field === 'type' && $operator === '='
  )
  let includedTypes
  if (typeFilter?.$value) {
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

  // onAction for table selected items ... more actions will follow
  const onAction = (items, string) => {
    if (string === 'delete') {
      Promise.all(items.map((v) => client.delete({ $id: v.id }))).then(() => {
        console.info('DELETE TIMES 🥨')
      })
    }
  }

  console.log('fields 🪲', fields)
  console.log('fieldTypes 🪲', fieldTypes)
  console.log('view??', view)

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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flexGrow: 1 }}>
            {queryOverwrite ? null : (
              <Query
                types={types}
                fields={fields}
                fieldTypes={fieldTypes}
                query={query}
              />
            )}
          </div>
          <div style={{ display: 'flex', gap: 4, marginLeft: 16 }}>
            <Button
              style={{ maxHeight: 32, marginTop: 4 }}
              ghost
              onClick={async () => {
                //   const ok = await confirm(`Update '${currentView.label}'`)
                const ok = await confirm(
                  `Update '${currentView.label}'`,
                  <Callout
                    icon={<WarningIcon />}
                    color="orange"
                    label=" You are about to update the default view for all users."
                    labelColor="text"
                  />
                )
                if (ok) {
                  currentView.query = location.search.substring(1)
                  await client.call('basedSetViews', views)
                }
              }}
            >
              Update view
            </Button>
            <Button
              style={{ maxHeight: 32, marginTop: 4 }}
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
          </div>
        </div>
      </div>

      {/* {fields && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Text space="8px">
            Hey it looks like there are no items created yet.
          </Text>
          <Text space="20px">You can start by creating one.</Text>
          <Button
            large
            icon={AddIcon}
            onClick={() => {
              // console.log('lable', label, 'view', view, 'prefix', prefix)
              setLocation(`${prefix}/create/${view}`)
            }}
            //  onClick={useContextMenu(CreateMenu, { prefix, types })}
          >
            Create Item
          </Button>
        </div>
      )} */}

      <Table
        ref={theTableRef}
        key={fields.length}
        fields={fields}
        target={query.target}
        onAction={(items) => onAction(items, 'delete')}
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
