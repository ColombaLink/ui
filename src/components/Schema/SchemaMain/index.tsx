import { useClient, useSchema } from '@based/react'
import React, { FC, useState } from 'react'
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
  } = useSortable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{
        visibility: isDragging ? 'hidden' : 'visible',
        transform: CSS.Transform.toString(transform),
        transition,
        marginBottom: 16,
      }}
      {...attributes}
      {...listeners}
    >
      {children}
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
          await client.removeField(type, field)
        }
      }}
    >
      Delete
    </ContextItem>
  )
}

const Field = ({ type, field, fields, isDragging = false }) => {
  const { meta, type: fieldType } = fields[field]
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

  return (
    <div
      style={{
        borderRadius: 4,
        border: border(1),
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: color('background2dp'),
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <DragDropIcon style={{ marginRight: 12, flexShrink: 0 }} />
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
      <Badge outline ghost style={{ marginLeft: 12 }}>
        {fieldType}
      </Badge>
      <div style={{ flexGrow: 1, width: 16 }} />
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
  )
}

const Fields = ({ includeSystemFields, type, fields, onChange }) => {
  const [draggingField, setDraggingField] = useState<UniqueIdentifier>()
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const sortedFields = Object.keys(fields).sort((a, b) => {
    return fields[a].meta?.index < fields[b].meta?.index ? -1 : 1
  })

  const onDragStart = ({ active }) => {
    setDraggingField(active.id)
  }

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const resortedFields = arrayMove(
        sortedFields,
        sortedFields.indexOf(active.id as string),
        sortedFields.indexOf(over.id as string)
      )
      resortedFields.forEach((field, index) => {
        if ('meta' in fields[field]) {
          fields[field].meta.index = index
        } else {
          fields[field].meta = { index }
        }
      })
      onChange(fields)
    }
    setDraggingField(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={sortedFields}
        strategy={verticalListSortingStrategy}
      >
        {sortedFields.map((field) => {
          if (alwaysIgnore.has(field)) {
            return null
          }
          // if (!includeSystemFields && systemFields.has(field)) {
          //   return null
          // }
          return (
            <Draggable key={field} id={field}>
              <Field type={type} field={field} fields={fields} />
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
  prefix: string
  type: string
  db: string
}> = ({ prefix = '', type, db = 'default' }) => {
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
        fields={fields}
        includeSystemFields={includeSystemFields}
        onChange={(fields) =>
          client
            .updateSchema({
              schema: { types: { [type]: { fields } } },
              db,
            })
            .catch((e) => console.error('error updating schema', e))
        }
      />
    </ScrollArea>
  )
}
