import { useClient, useSchema } from '@based/react'
import React, { FC, useState } from 'react'
import { useContextMenu } from '~/hooks'
import {
  Checkbox,
  MoreIcon,
  Text,
  border,
  color,
  ScrollArea,
  DragDropIcon,
  Thumbnail,
  AddIcon,
  capitalize,
  Badge,
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
import { alwaysIgnore, templates } from '../templates'

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

const Field = ({ field, fields, isDragging = false }) => {
  const { meta, type } = fields[field]
  const template = meta?.format || type
  const { icon, color: iconColor } = templates[template] || {}

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
      <Thumbnail icon={icon} color={iconColor} size={32} />
      <Text weight={600} style={{ marginLeft: 12, marginRight: 5 }}>
        {capitalize(meta?.name || field)}
      </Text>
      <Text color="text2">- {field}</Text>
      <Badge outline ghost style={{ marginLeft: 12 }}>
        {type}
      </Badge>
    </div>
  )
}

const Fields = ({ fields, onChange }) => {
  const [draggingField, setDraggingField] = useState<UniqueIdentifier>()
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const keys = Object.keys(fields).sort((a, b) => {
    return fields[a].meta?.index < fields[b].meta?.index ? -1 : 1
  })

  const onDragStart = ({ active }) => {
    setDraggingField(active.id)
  }

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const sorted = arrayMove(
        keys,
        keys.indexOf(active.id as string),
        keys.indexOf(over.id as string)
      )
      sorted.forEach((field, index) => {
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
      <SortableContext items={keys} strategy={verticalListSortingStrategy}>
        {keys.map((field) => {
          if (alwaysIgnore.has(field)) {
            return null
          }
          return (
            <Draggable key={field} id={field}>
              <Field field={field} fields={fields} />
            </Draggable>
          )
        })}
      </SortableContext>
      {createPortal(
        <DragOverlay>
          {draggingField ? (
            <Field isDragging field={draggingField} fields={fields} />
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
  const { schema, loading } = useSchema()
  const client = useClient()

  if (loading) {
    return null
  }

  const { meta = {}, fields } =
    type === 'root' ? schema.rootType : schema.types[type] || {}
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
        // checked={system}
        // onChange={(v) => showSystemFields(v)}
      />
      <Fields
        fields={fields}
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

  // return type ? (
  //   <TypeSelected prefix={prefix} type={type} db={db} />
  // ) : (
  //   <NoType prefix={prefix} />
  // )
}
