import React, { useRef, useState } from 'react'
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
} from '@dnd-kit/sortable'
import { alwaysIgnore, systemFields } from '../templates'
import { Draggable } from './Draggable'
import { Field } from './Field'
import { getObjectId } from './utils'

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

export const Fields = ({ includeSystemFields, type, fields, onChange }) => {
  const [draggingField, setDraggingField] = useState<UniqueIdentifier>()
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const objects = new Set()
  const overIdRef = useRef()
  const sortedFields = sortAndFlatten(fields)
  const onDragStart = ({ active }) => {
    setDraggingField(active.id)
  }

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const activePath = active.id.split('.')
      const objectId =
        overIdRef.current && getObjectId(overIdRef.current, objects)
      const overPath = objectId
        ? [...objectId.split('.'), 'properties', '$placeholder']
        : over.id.split('.')

      if (activePath.length !== overPath.length) {
        const activeKey = activePath[activePath.length - 1]
        const activeField = activePath.reduce(
          (fields, key) => fields[key],
          fields
        )
        const overFields = overPath
          .slice(0, -1)
          .reduce((fields, key) => fields[key], fields)
        if (activeKey in overFields) {
          console.error('Already has field!', activeKey, overFields)
        } else {
          overFields[activeKey] = { ...activeField }
          activeField.$delete = true
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

      onChange(fields)
    }
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
    const path = field.split('.')
    const { type, $delete } = path.reduce((fields, key) => fields[key], fields)
    if ($delete) {
      return false
    }
    if (type === 'object') {
      objects.add(field)
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
            <Draggable
              key={field}
              id={field}
              objects={objects}
              overIdRef={overIdRef}
            >
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
