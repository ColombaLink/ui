import { useClient, useSchema } from '@based/react'
import React, { FC } from 'react'
import { useContextMenu } from '~/hooks'
import {
  MoreIcon,
  Text,
  border,
  color,
  DragDropIcon,
  Thumbnail,
  capitalize,
  Badge,
  Button,
  useDialog,
  ContextItem,
  getName,
  ChevronDownIcon,
} from '~'

import { systemFields, templates } from '../templates'
import { FieldModal } from '../FieldModal'
import { useLocation } from 'wouter'

const stopPropagation = (e) => e.stopPropagation()

const EditMenu: FC<{
  type: string
  field: string
}> = ({ type, field }) => {
  const { schema } = useSchema()
  const client = useClient()
  const { confirm } = useDialog()

  return (
    <ContextItem
      // @ts-ignore
      onClick={async () => {
        if (
          await confirm(
            `Are you sure you want to remove the field ${field} from ${getName(
              schema,
              type
            )}?`
          )
        ) {
          await client.removeField(type, field.split('.'))
        }
      }}
    >
      Delete
    </ContextItem>
  )
}

export const Field = ({ type, field, fields, isDragging = false }) => {
  const [location, setLocation] = useLocation()
  const path = field.split('.')
  const fieldSchema = path.reduce((fields, key) => fields[key], fields)
  const { meta, type: fieldType } = fieldSchema
  const template = meta?.format || fieldType
  const { icon, color: iconColor } = templates[template] || {}
  const { open } = useDialog()
  const openEditMenu = useContextMenu(
    EditMenu,
    {
      type,
      field,
    },
    { position: 'left' }
  )

  const isArray = fieldType === 'array'
  const isObject = fieldType === 'object'
  const Icon = isObject && isDragging ? ChevronDownIcon : DragDropIcon

  return (
    // require extra div for smooth animation of nested props
    <div>
      <div
        style={{
          height: 50,
          opacity: systemFields.has(field) ? 0.5 : 1,
          borderRadius: 4,
          border: border(1),
          // paddingTop: 8,
          // paddingBottom: 8,
          paddingLeft: 16,
          paddingRight: 16,
          marginLeft: (path.length - 1) * 12,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: color('background2dp'),
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <Icon style={{ marginRight: 12, flexShrink: 0 }} />
        <Thumbnail
          icon={icon}
          color={iconColor}
          size={32}
          style={{ flexShrink: 0 }}
        />
        <Text weight={600} style={{ marginLeft: 12, marginRight: 5 }}>
          {capitalize(meta?.name || field)}
        </Text>
        <Text color="text2">- {field}</Text>
        <Badge color="text" style={{ marginLeft: 12 }}>
          {fieldType}
        </Badge>
        {isArray ? (
          <Badge color="text" style={{ marginLeft: 12 }}>
            {fieldSchema.items.type}
          </Badge>
        ) : null}
        <div style={{ flexGrow: 1, width: 16 }} />
        {isObject ? (
          <Button
            onPointerDown={stopPropagation}
            onClick={() => {
              setLocation(`${location}/${path.join('/')}/properties`)
            }}
            ghost
          >
            Configure
          </Button>
        ) : null}
        <Button
          onPointerDown={stopPropagation}
          onClick={() => {
            open(<FieldModal type={type} field={field} template={template} />)
          }}
          ghost
        >
          Settings
        </Button>
        <MoreIcon
          onPointerDown={stopPropagation}
          style={{ marginLeft: 16, flexShrink: 0, cursor: 'pointer' }}
          onClick={openEditMenu}
        />
      </div>
    </div>
  )
}
