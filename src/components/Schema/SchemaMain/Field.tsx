import { useClient } from '@based/react'
import React, { FC } from 'react'
import { useContextMenu } from '~/hooks'
import {
  MoreIcon,
  Text,
  border,
  color,
  DragDropIcon,
  Thumbnail,
  Badge,
  Button,
  useDialog,
  ContextItem,
  ChevronDownIcon,
  ContextDivider,
  AddIcon,
} from '~'

import { FieldTemplates, systemFields, templates } from '../templates'
import { FieldModal } from '../FieldModal'
import { useLocation } from 'wouter'
import { SelectFieldTypeModal } from '../SelectFieldTypeModal'
import { getDepth } from './utils'
import { useSchema } from '~/hooks/useSchema'

const stopPropagation = (e) => e.stopPropagation()

const EditMenu: FC<{
  type: string
  field: string
  template: FieldTemplates
  isObject: boolean
  path: string[]
}> = ({ type, field, template, isObject, path }) => {
  const { schema } = useSchema()
  const client = useClient()
  const { confirm } = useDialog()
  const [location, setLocation] = useLocation()
  const { open } = useDialog()

  // console.log('client', client)

  return (
    <>
      <ContextItem
        onClick={() => {
          open(<FieldModal type={type} field={field} template={template} />)
        }}
      >
        Settings
      </ContextItem>
      {isObject ? (
        <ContextItem
          onClick={() => {
            let isField = true
            const filteredPath = path.filter((field) => {
              if (isField) {
                isField = false
                return true
              }
              if (field === 'properties') {
                isField = true
              }
              return false
            })
            setLocation(`${location}/${filteredPath.join('/')}`)
          }}
        >
          Configure Object
        </ContextItem>
      ) : null}
      <ContextDivider />
      <ContextItem
        onClick={async () => {
          if (
            await confirm(
              `Are you sure you want to remove the field ${field} from ${schema.types[type].meta.name}?`
            )
          ) {
            const path = field.split('.')
            const currentFields = schema.types[type].fields
            const fields = {}
            let from = currentFields
            let dest = fields
            let i = 0
            const l = path.length

            while (i < l) {
              const key = path[i++]
              dest[key] = { ...from[key] }
              dest = dest[key]
              from = from[key]
            }

            // @ts-ignore
            dest.$delete = true

            await client.call('basedUpdateSchema', {
              types: {
                [type]: {
                  fields,
                },
              },
            })
            // await client.removeField(type, field.split('.'))
          }
        }}
      >
        Delete
      </ContextItem>
    </>
  )
}

const AddObjectFieldButton = ({ type, path }) => {
  console.log('the type to be added???', type)
  const openSelectField = useContextMenu(
    SelectFieldTypeModal,
    {
      type,
      path,
    },
    { width: 924, placement: 'right' }
  )
  return (
    <Button
      onPointerDown={stopPropagation}
      onClick={openSelectField}
      ghost
      icon={AddIcon}
    >
      Add field
    </Button>
  )
}
export const Field = ({
  type,
  field,
  fields,
  isDragging = false,
  toggleExpand = null,
  collapsed = false,
}) => {
  const path = field.split('.')
  const fieldSchema = path.reduce((fields, key) => fields[key], fields)
  const { meta, type: fieldType } = fieldSchema
  const template = meta?.format || fieldType
  const { icon, color: iconColor } = templates[template] || {}
  const nestedType = (fieldSchema.items || fieldSchema.values)?.type
  const isObject = fieldType === 'object' || nestedType === 'object'
  const lastIndex = path.length - 1
  const objectPath = isObject
    ? fieldType === 'record'
      ? [...path, 'values', 'properties']
      : fieldType === 'array'
      ? [...path, 'items', 'properties']
      : [...path, 'properties']
    : path

  const openEditMenu = useContextMenu(
    EditMenu,
    {
      type,
      field,
      template,
      isObject,
      path,
    },
    { position: 'left' }
  )

  // console.log(path, getDepth(path))

  return (
    // require extra div for smooth animation of nested props
    <div>
      <div
        style={{
          height: 50,
          opacity: systemFields.has(field) ? 0.5 : 1,
          borderRadius: 8,
          border: border(1),
          paddingLeft: 16,
          paddingRight: 16,
          marginLeft: getDepth(path) * 24,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: color('background2dp'),
          cursor: isDragging ? 'grabbing' : 'grab',
          position: 'relative',
        }}
      >
        {isObject ? (
          <ChevronDownIcon
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => toggleExpand?.(field)}
            style={{
              transform: isDragging || collapsed ? 'rotate(-90deg)' : null,
              cursor: 'pointer',
              position: 'absolute',
              left: -30,
              top: 16,
            }}
          />
        ) : null}
        <DragDropIcon style={{ marginRight: 12, flexShrink: 0 }} />
        <Thumbnail
          outline
          icon={icon}
          color={iconColor}
          size={32}
          style={{ flexShrink: 0 }}
        />
        <Text weight={600} style={{ marginLeft: 12, marginRight: 5 }}>
          {meta?.name}
        </Text>
        <Text color="text2" weight={400}>
          - {path[lastIndex]}
        </Text>
        <Badge color="text" style={{ marginLeft: 12 }}>
          {fieldType}
        </Badge>
        {nestedType ? (
          <Badge color="text" style={{ marginLeft: 12 }}>
            {nestedType}
          </Badge>
        ) : null}
        <div style={{ flexGrow: 1, width: 16 }} />
        {isObject ? (
          <AddObjectFieldButton type={type} path={objectPath} />
        ) : null}
        <MoreIcon
          onPointerDown={stopPropagation}
          style={{ marginLeft: 16, flexShrink: 0, cursor: 'pointer' }}
          onClick={openEditMenu}
        />
      </div>
    </div>
  )
}
