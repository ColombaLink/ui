import { Table } from '~/components/Table'
import { Text } from '~/components/Text'
import React, { FC, useState } from 'react'
import { alwaysIgnore } from '~/apps/Schema/templates'
import { Query } from './Query'
import { useContextMenu, useContextState } from '~/hooks'
import { AddIcon, MoreIcon, WarningIcon } from '~/icons'
import { Button } from '~/components/Button'
import { ContextItem } from '~/components/ContextMenu'
import { useDialog } from '~/components/Dialog'
import { useClient, useQuery } from '@based/react'
import { Callout } from '~/components/Callout'
import { useSchema } from '~/apps/Schema'
import { Style } from 'inlines'
import { useViews } from '../hooks/useViews'

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

const Header = ({ label }) => {
  const [, setViewType] = useContextState('viewType')
  const [view] = useContextState('view')
  const createBtn = (
    <Button
      large
      icon={AddIcon}
      onClick={() => {
        setViewType('create')
      }}
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

  const { data: views } = useQuery('based:observe-views')
  let currentView: {
    label?: string
  }
  let isDeletable: boolean

  const parse = () => {
    // TODO FIX the redirect / what os this?
    for (const viewKey in views) {
      for (const v of views[viewKey]) {
        if (String(v.id) === view) {
          currentView = v
          isDeletable = viewKey !== 'default'
          return
        }
      }
    }
  }

  parse()

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Text weight={700} size="22px" style={{ lineHeight: '32px' }}>
          {currentView?.label}
        </Text>
        <Button
          color="text"
          ghost
          icon={
            <MoreIcon
              onClick={useContextMenu(Menu, {
                views,
                currentView,
                deletable: isDeletable,
              })}
              style={{
                cursor: 'pointer',
              }}
            />
          }
        />
      </div>
      <div style={{ flexGrow: 1 }} />
      {createBtn}
    </div>
  )
}

export const ContentMain: FC<{
  style?: Style
}> = ({ style }) => {
  const target = 'root'

  const {
    loading,
    schema: { types },
  } = useSchema()

  // const { confirm, prompt } = useDialog()
  const client = useClient()

  const [isMultiref, setIsMultiref] = useState(false)

  const views = useViews()

  const currentView = views.currentView

  // /// THIS CHECKS IF THE FIELD IS A REFERENCE
  // useEffect(() => {
  //   // console.log('currentView changed', currentView)
  //   if (
  //     types[currentView?.id]?.fields[field].type === 'references' &&
  //     query.field !== 'descendants'
  //   ) {
  //     setIsMultiref(true)
  //   } else {
  //     setIsMultiref(false)
  //   }
  // }, [query.field])

  if (!currentView) {
    return <div>SELECT VIEW</div>
  }

  if (loading) return null

  const set = new Set()
  const indexed = []
  const other = new Set()

  // totallt wrong can be multiple types...
  const typeFilter = currentView.query.$find?.$filter?.find(
    ({ $field, $operator }) => $field === 'type' && $operator === '='
  )

  let includedTypes: string[]
  if (typeFilter?.$value) {
    if (typeFilter.$value in types) {
      includedTypes = Array.isArray(typeFilter.$value)
        ? typeFilter.$value
        : [typeFilter.$value]
    } else {
      return null
    }
  }

  if (!includedTypes) {
    includedTypes = Object.keys(types)
  }

  const fieldTypes = {}

  includedTypes.forEach((type) => {
    const { fields = {} } = types[type] || {}

    for (const field in fields) {
      if (!alwaysIgnore.has(field)) {
        const index = fields[field].meta?.index
        fieldTypes[field] = fields[field]?.type
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
      // @ts-ignore
      Promise.all(items.map((v) => client.delete({ $id: v.id }))).then(() => {
        console.info('DELETE TIMES 🥨')
      })
    }
  }

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
          padding: '24px 32px 16px',
        }}
      >
        <Header label={currentView.label} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flexGrow: 1 }}>
            <Query />
          </div>

          <div style={{ display: 'flex', gap: 4, marginLeft: 16 }}>
            <Button
              style={{ maxHeight: 32, marginTop: 4 }}
              ghost
              onClick={async () => {
                //   const ok = await confirm(`Update '${currentView.label}'`)
                // const ok = await confirm(
                //   `Update '${currentView.label}'`,
                //   <Callout
                //     icon={<WarningIcon />}
                //     color="red"
                //     label=" You are about to update the default view for all users."
                //     labelColor="text"
                //   />
                // )
                // if (ok) {
                //   currentView.query =
                //   await client.call('basedSetViews', views)
                // }
              }}
            >
              Update view LATER
            </Button>
            <Button
              style={{ maxHeight: 32, marginTop: 4 }}
              ghost
              onClick={async () => {
                // const label = (await prompt(
                //   'What would you like to call this view?'
                // )) as string
                // if (label) {
                //   if (!views.custom) {
                //     views.custom = []
                //   }
                //   const ids = new Set()
                //   views.custom.forEach(({ id }) => ids.add(id))
                //   views.default.forEach(({ id }) => ids.add(id))
                //   let id = 0
                //   while (ids.has(id)) {
                //     id++
                //   }
                //   views.custom.push({
                //     id: String(id),
                //     query: location.substring(1),
                //     label,
                //   })
                //   await client.call('basedSetViews', views)
                // }
              }}
            >
              Create new view LATER
            </Button>
          </div>
        </div>
      </div>

      {/* <Table
        key={fields.length}
        fields={fields}
        target={target}
        onAction={(items) => onAction(items, 'delete')}
        language="en"
        isMultiref={isMultiref}
        onClick={(item, field, fieldType) => {
          if (fieldType === 'references') {
            // route.setQuery({ target: item.id, field: field, filter: '%5B%5D' })
            setIsMultiref(true)
          } else {
            // route.setLocation(`${prefix}/${item.id}/${field}`)
            setIsMultiref(false)
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
              // make this better
              $find: currentView.query.$find,
            },
          }

          fields.forEach((field: string) => {
            q[field] = true
          })

          return q
        }}
      /> */}
    </div>
  )
}
