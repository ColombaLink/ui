import { useClient } from '@based/react'
import React, { FC, Fragment, useState } from 'react'
import { useContextMenu, useLocation, useSchemaTypes } from '~/hooks'
import { Checkbox, MoreIcon, Text, ScrollArea, Link, ContextItem } from '~'
import { Fields } from './Fields'
import { ChevronLeftIcon, ChevronRightIcon } from '~/icons'
import { border } from '~/utils'
import { useDialog } from '~/components/Dialog'

const EditMenu = ({ type, path }) => {
  const { types } = useSchemaTypes()
  const { confirm } = useDialog()
  const client = useClient()
  return (
    <ContextItem
      onClick={async () => {
        if (path.length) {
        } else if (
          await confirm(
            `Are you sure you want to remove ${types[type].meta?.name || type}?`
          )
        ) {
          await client.call('basedUpdateSchema', {
            types: {
              [type]: {
                $delete: true,
              },
            },
          })
        }
      }}
    >
      Delete
    </ContextItem>
  )
}

const BackButton = () => {
  const [location] = useLocation()
  return (
    <Link
      href={location.split('/').slice(0, -1).join('/')}
      style={{ paddingRight: 8 }}
    >
      <ChevronLeftIcon />
    </Link>
  )
}

const Header = ({ back = null, children, type, path }) => {
  const openEditMenu = useContextMenu(EditMenu, {
    type,
    path,
  })

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {back ? <BackButton /> : null}
      <Text
        size="18px"
        weight="700"
        style={{
          userSelect: 'none',
          // textTransform: 'capitalize',
        }}
      >
        {children}
      </Text>
      <MoreIcon
        onClick={openEditMenu}
        style={{
          cursor: 'pointer',
          marginLeft: 16,
        }}
      />
    </div>
  )
}

const Footer = ({ type, prefix, name }) => {
  const [location] = useLocation()
  const path = location.substring(prefix.length + type.length + 2).split('/')

  return (
    <div
      style={{
        borderTop: border(1),
        padding: '16px 32px ',
        height: 56,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Link href={`${prefix}/${type}`}>
        <Text color="text2">{name}</Text>
      </Link>
      {path.map((field, index) => {
        return (
          <Fragment key={index}>
            <ChevronRightIcon style={{ flexShrink: 0, margin: 4 }} />
            <Link
              href={`${prefix}/${type}/${path.slice(0, index + 1).join('/')}`}
            >
              <Text>{field}</Text>
            </Link>
          </Fragment>
        )
      })}
    </div>
  )
}

const getMeta = (fields, path) => {
  let obj
  let isNested
  path.reduce((fields, key) => {
    const { type, properties, items } = fields[key]
    if (type) {
      if (isNested) {
        isNested = false
      } else {
        obj = fields[key]
        if (properties || items) {
          isNested = true
        }
      }
    }
    return fields[key]
  }, fields)
  return obj.meta
}

export const SchemaMain: FC<{
  type: string
  db: string
  path?: string[]
  prefix?: string
}> = ({ type, db = 'default', path = [], prefix = '' }) => {
  const { loading, types } = useSchemaTypes()
  const [includeSystemFields, toggleSystemFields] = useState(false)
  const client = useClient()

  if (loading) {
    return null
  }

  const { meta = {}, fields } = types[type] || {}
  const { name } = meta

  if (!fields) {
    return null
  }

  const typeName = name || type
  let header, footer
  if (path.length) {
    header = (
      <Header back type={type} path={path}>
        {getMeta(fields, path)?.name || path[path.length - 1]}
      </Header>
    )
    footer = <Footer type={type} prefix={prefix} name={typeName} />
  } else {
    header = (
      <Header type={type} path={path}>
        {typeName}
      </Header>
    )
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <ScrollArea
        style={{
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 24,
          paddingBottom: 64,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {header}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{ maxWidth: 660, flexGrow: 1, margin: '0 48px' }}>
            <Checkbox
              style={{ marginTop: 36, marginBottom: 24, width: '100%' }}
              label="Show system fields"
              checked={includeSystemFields}
              onChange={toggleSystemFields}
            />
            <div>
              <Fields
                type={type}
                fields={path.reduce((fields, key) => fields[key], fields)}
                includeSystemFields={includeSystemFields}
                onChange={(val) => {
                  const update = {}
                  let from = fields
                  let dest = update
                  let i = 0
                  const l = path.length

                  while (i < l) {
                    const key = path[i++]
                    dest[key] = { ...from[key] }
                    dest = dest[key]
                    from = from[key]
                  }

                  Object.assign(dest, val)

                  return client
                    .call('basedUpdateSchema', {
                      types: {
                        [type]: {
                          fields: update,
                        },
                      },
                      db,
                    })
                    .catch((e) => console.error('error updating schema', e))
                }}
              />
            </div>
          </div>
        </div>
      </ScrollArea>
      {footer}
    </div>
  )
}
