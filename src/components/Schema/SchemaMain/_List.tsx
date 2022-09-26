import React, { FC, useEffect, useState } from 'react'
import { styled } from 'inlines'
import { capitalize, Checkbox } from '~'
import { alwaysIgnore, systemFields } from '../templates'
import ListItem from './ListItem'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'

import { CSS } from '@dnd-kit/utilities'
import { createPortal } from 'react-dom'
import { useClient, useSchema } from '@based/react'
import type { FieldSchema } from '../types.js'

const SortableItem: FC<{ id: string }> = ({ id, children }) => {
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
      }}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}

const TypeList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

const FieldsWrapper = styled('div', {
  marginTop: 36,
})

const FieldItem: FC<{
  field: FieldSchema
  name: string
  isDragging?: boolean
  schemaType?: string
}> = ({ field, name, isDragging, schemaType }) => {
  const isSystemField = systemFields.has(name)
  // const style = getFieldStyle(field, name)
  const title = capitalize(field.meta?.name || name) // || (style.field ? style.name : name)
  // fix object in here and ignore children / parents
  const isBidirectional =
    // @ts-ignore
    field.bidirectional || name === 'children' || name === 'parents'

  return (
    <ListItem
      isDragging={isDragging}
      isBidirectional={isBidirectional}
      // icon={style.icon}
      // color={style.color}
      name={title}
      fieldName={name}
      fieldType={field.type}
      schemaType={schemaType}
      style={{
        marginBottom: 16,
        borderRadius: 4,
        opacity: isSystemField ? 0.5 : 1,
      }}
    />
  )
}

export const List: FC<{
  fields: { [key: string]: Field }
  type: string
  db: string
}> = ({ fields, type, db }) => {
  const fieldData: [string, any][] = []
  const { schema } = useSchema()
  const client = useClient()
  const [system, showSystemFields] = useState(false)

  for (const f in fields) {
    if (alwaysIgnore.has(f)) {
      continue
    }

    fieldData.push([f, fields[f]])
  }

  fieldData.sort((a, b) => {
    if (a[1].meta?.index === undefined) {
      return 1
    }

    if (b[1].meta?.index === undefined) {
      return -1
    }

    if (a[1].meta.index === b[1].meta.index) {
      return 0
    }

    return a[1].meta.index < b[1].meta.index ? -1 : 1
  })

  const sorted = fieldData.map((f) => f[0])
  const [items, setItems] = useState(sorted)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    setItems(sorted)
    // eslint-disable-next-line
  }, [schema.sha, fields])

  if (!fields) {
    return null
  }

  return (
    <FieldsWrapper>
      <TypeList>
        <div style={{ userSelect: 'none', cursor: 'pointer' }}>
          <Checkbox
            style={{
              marginBottom: 24,
            }}
            label="Show system fields"
            checked={system}
            onChange={(v) => showSystemFields(v)}
          />
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((name) => {
              if (!system && systemFields.has(name)) {
                return null
              }
              const field = fields[name]
              if (!field) {
                return null
              }
              return (
                <SortableItem key={name} id={name}>
                  <FieldItem field={field} name={name} schemaType={type} />
                </SortableItem>
              )
            })}
          </SortableContext>
          {createPortal(
            <DragOverlay>
              {activeId ? (
                <FieldItem
                  field={fields[activeId]}
                  name={activeId}
                  schemaType={type}
                  isDragging
                />
              ) : null}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </TypeList>
    </FieldsWrapper>
  )

  function handleDragStart(event: DragEndEvent) {
    const { active } = event
    setActiveId(active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    if (event.active && event.over && event.active.id !== event.over.id) {
      // setItems((items) => {
      const oldIndex = items.indexOf(event.active.id as string)
      const newIndex = items.indexOf(event.over.id as string)
      const updatedItems = arrayMove(items, oldIndex, newIndex)
      const fields = updatedItems.reduce((obj, name, index) => {
        const current = schema.types[type].fields[name]
        // @ts-ignore
        obj[name] = {
          ...current,
          meta: {
            ...current.meta,
            index,
          },
        }
        return obj
      }, {})
      setItems(updatedItems)
      client
        .updateSchema({
          schema: { types: { [type]: { fields } } },
          db,
        })
        .catch((e) => console.error('error updating schema', e))
    }
    setActiveId(null)
  }
}
