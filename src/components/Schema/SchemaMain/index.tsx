import { useClient, useSchema } from '@based/react'
import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react'
import { useContextMenu, useSchemaTypes } from '~/hooks'
import {
  Checkbox,
  MoreIcon,
  Text,
  border,
  color,
  ScrollArea,
  DragDropIcon,
  Thumbnail,
  capitalize,
  Badge,
  Button,
  useDialog,
  ContextItem,
  getName,
  ChevronDownIcon,
  Link,
} from '~'
import { createPortal } from 'react-dom'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  UniqueIdentifier,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'

import { CSS } from '@dnd-kit/utilities'
import { alwaysIgnore, systemFields, templates } from '../templates'
import { FieldModal } from '../FieldModal'
import { useLocation } from 'wouter'

const Header = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Text
        size="18px"
        weight="700"
        style={{
          userSelect: 'none',
          textTransform: 'capitalize',
        }}
      >
        {children}
      </Text>
      <MoreIcon
        style={{
          marginLeft: 16,
        }}
      />
    </div>
  )
}

const Draggable: FC<{ id: string }> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    index,
    over,
    overIndex,
    items,
    ...props
  } = useSortable({ id })

  const indexRef = useRef<number>()
  const jumpedRef = useRef<boolean>()
  const style: CSSProperties = {
    height: 50,
    // opacity: isDragging ? 0.5 : 1,
    // visibility: isDragging ? 'hidden' : 'visible',
    transform: CSS.Transform.toString(transform),
    transition: transition,
    marginBottom: 12,
  }

  if (jumpedRef.current) {
    style.transform = null
    jumpedRef.current = null
  }

  jumpedRef.current =
    indexRef.current - index > 1 || index - indexRef.current > 1

  indexRef.current = index

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {isDragging ? (
        <div
          style={{
            marginTop: 24,
            height: 2,
            backgroundColor: color('accent'),
          }}
        />
      ) : (
        children
      )}
    </div>
  )
}

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

const Field = ({ type, field, fields, isDragging = false }) => {
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
          opacity: systemFields.has(field) ? 0.5 : 1,
          borderRadius: 4,
          border: border(1),
          paddingTop: 8,
          paddingBottom: 8,
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

const sortAndFlatten = (fields) => {
  const sortedFields = Object.keys(fields).sort((a, b) => {
    const indexA = fields[a].meta?.index
    const indexB = fields[b].meta?.index
    if (indexA === undefined) {
      if (indexB === undefined) {
        return a < b ? -1 : 1
      }
      return 1
    }
    return indexA < indexB ? -1 : 1
  })

  for (let i = sortedFields.length - 1; i >= 0; i--) {
    const key = sortedFields[i]
    if (fields[key].type === 'object') {
      const nested = sortAndFlatten(fields[key].properties)
      nested.forEach((nestedKey, index) => {
        nested[index] = `${key}.properties.${nestedKey}`
      })
      sortedFields.splice(i + 1, 0, ...nested)
    }
  }

  return sortedFields
}

const Fields = ({ includeSystemFields, type, fields, onChange }) => {
  const [draggingField, setDraggingField] = useState<UniqueIdentifier>()
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const sortedFields = sortAndFlatten(fields)

  const onDragStart = ({ active }) => {
    setDraggingField(active.id)
  }

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const activePath = active.id.split('.')
      const overPath = over.id.split('.')

      if (activePath.length !== overPath.length) {
        const activeKey = activePath[activePath.length - 1]
        const activeField = activePath.reduce(
          (fields, key) => fields[key],
          fields
        )
        // .$delete = true
        const overFields = overPath
          .slice(0, -1)
          .reduce((fields, key) => fields[key], fields)
        if (activeKey in overFields) {
          console.error('Already has field!', activeKey, overFields)
        } else {
          overFields[activeKey] = { ...activeField }
          // activeField.$delete = true
        }
      }

      const resortedFields = arrayMove(
        sortedFields,
        sortedFields.indexOf(active.id as string),
        sortedFields.indexOf(over.id as string)
      )

      resortedFields.forEach((field, index) => {
        const path = field.split('.')
        const targetFields = path.reduce((fields, key) => fields[key], fields)

        if ('meta' in targetFields) {
          targetFields.meta.index = index
        } else {
          targetFields.meta = { index }
        }
      })

      // onChange(fields)
    }
    console.log('-------------')
    setDraggingField(null)
  }

  const filtered = sortedFields.filter((field) => {
    if (alwaysIgnore.has(field)) {
      return false
    }
    if (!includeSystemFields && systemFields.has(field)) {
      return false
    }
    if (draggingField && field.startsWith(`${draggingField}.`)) {
      return false
    }
    return true
  })

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={filtered} strategy={verticalListSortingStrategy}>
        {filtered.map((field) => {
          return (
            <Draggable key={field} id={field}>
              <Field
                type={type}
                field={field}
                fields={fields}
                isDragging={field === draggingField}
              />
            </Draggable>
          )
        })}
      </SortableContext>
      {createPortal(
        <DragOverlay>
          {draggingField ? (
            <Field
              isDragging
              type={type}
              field={draggingField}
              fields={fields}
            />
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}

export const SchemaMain: FC<{
  type: string
  db: string
  path?: string[]
}> = ({ type, db = 'default', path = [] }) => {
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

  return (
    <ScrollArea
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 24,
        paddingBottom: 64,
      }}
    >
      <Header>{name || type}</Header>
      <Checkbox
        style={{ marginTop: 36, marginBottom: 24 }}
        label="Show system fields"
        checked={includeSystemFields}
        onChange={toggleSystemFields}
      />
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
            .updateSchema({
              schema: {
                types: {
                  [type]: {
                    fields: update,
                  },
                },
              },
              db,
            })
            .catch((e) => console.error('error updating schema', e))
        }}
      />
    </ScrollArea>
  )
}
